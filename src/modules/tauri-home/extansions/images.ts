import { syntaxTree } from '@codemirror/language';
import { EditorState, Extension, Range, RangeSet, StateField } from '@codemirror/state';
import { Decoration, DecorationSet, EditorView, WidgetType } from '@codemirror/view';

interface ImageWidgetParams {
  url: string;
}

// Вспомогательная функция для перевода файла в Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
  });
};

// Виджет для отрисовки картинки
class ImageWidget extends WidgetType {
  readonly url;

  constructor({ url }: ImageWidgetParams) {
    super();
    this.url = url;
  }

  eq(imageWidget: ImageWidget) {
    return imageWidget.url === this.url;
  }

  toDOM() {
    const container = document.createElement('div');
    const backdrop = container.appendChild(document.createElement('div'));
    const figure = backdrop.appendChild(document.createElement('figure'));
    const image = figure.appendChild(document.createElement('img'));

    container.setAttribute('aria-hidden', 'true');
    container.className = 'cm-image-container';
    backdrop.className = 'cm-image-backdrop';
    figure.className = 'cm-image-figure';
    image.className = 'cm-image-img';
    image.src = this.url;

    container.style.paddingBottom = '0.5rem';
    container.style.paddingTop = '0.5rem';

    backdrop.style.borderRadius = 'var(--ink-internal-border-radius, 8px)';
    backdrop.style.display = 'flex';
    backdrop.style.alignItems = 'center';
    backdrop.style.justifyContent = 'center';
    backdrop.style.overflow = 'hidden';
    backdrop.style.maxWidth = '100%';

    figure.style.margin = '0';

    image.style.display = 'block';
    image.style.maxHeight = 'var(--ink-internal-block-max-height, 400px)';
    image.style.maxWidth = '100%';
    image.style.width = '100%';
    image.style.height = 'auto';
    image.style.objectFit = 'contain';

    return container;
  }
}

export const images = (): Extension => {
  const imageRegex = /!\[.*?\]\((?<url>.*?)\)/;

  const imageWidget = (imageWidgetParams: ImageWidgetParams) => new ImageWidget(imageWidgetParams);

  // Рендерер: ищет картинки и проверяет положение курсора
  const decorate = (state: EditorState) => {
    const widgets: Range<Decoration>[] = [];
    const selection = state.selection.main;

    syntaxTree(state).iterate({
      enter: ({ type, from, to }) => {
        if (type.name === 'Image') {
          const text = state.doc.sliceString(from, to);
          const result = imageRegex.exec(text);

          if (result && result.groups && result.groups.url) {
            const url = result.groups.url;
            const line = state.doc.lineAt(from);

            // Проверяем, находится ли курсор пользователя на этой же строке
            const isCursorOnLine = selection.from >= line.from && selection.to <= line.to;

            if (isCursorOnLine) {
              // РЕЖИМ РЕДАКТИРОВАНИЯ (Курсор на строке): Показываем текст разметки + картинку над ним
              widgets.push(
                Decoration.widget({
                  widget: imageWidget({ url }),
                  side: -1,
                  block: true,
                }).range(line.from),
              );
            } else {
              // РЕЖИМ ПРОСМОТРА (Курсор ушел): Полностью скрываем Markdown-код картинки
              widgets.push(
                Decoration.replace({
                  widget: imageWidget({ url }),
                  block: true,
                }).range(from, to),
              );
            }
          }
        }
      },
    });

    return widgets.length > 0 ? RangeSet.of(widgets) : Decoration.none;
  };

  const imagesTheme = EditorView.baseTheme({
    '.cm-image-backdrop': {
      backgroundColor: 'var(--ink-internal-block-background-color, #202020)',
    },
  });

  const imagesField = StateField.define<DecorationSet>({
    create(state) {
      return decorate(state);
    },
    update(images, transaction) {
      if (transaction.docChanged || transaction.selection || syntaxTree(transaction.state) !== syntaxTree(transaction.startState)) {
        return decorate(transaction.state);
      }

      return images.map(transaction.changes);
    },
    provide(field) {
      return EditorView.decorations.from(field);
    },
  });

  // Обработчик вставки картинок из буфера и драг-энд-дропа
  const imagePasteDropHandler = EditorView.domEventHandlers({
    paste(event, view) {
      const files = event.clipboardData?.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      if (file.type.startsWith('image/')) {
        event.preventDefault();

        const fileName =
          file.name === 'image.png' || file.name === 'blob' ? `Pasted image ${new Date().toISOString().replace(/[:.]/g, '-')}.png` : file.name;

        const selection = view.state.selection.main;
        const from = selection.from;

        const line = view.state.doc.lineAt(from);
        const isAtStartOfLine = from === line.from;

        // Формируем текст так, чтобы картинка была строго на новой строке,
        // а после неё стоял перенос строки (\n)
        const insertText = isAtStartOfLine ? `![Uploading ${fileName}...]()\n` : `\n![Uploading ${fileName}...]()\n`;

        const placeholder = `![Uploading ${fileName}...]()`;

        // Вставляем текст картинки и СРАЗУ переносим курсор на строку ниже (в самый конец insertText)
        view.dispatch({
          changes: { from, to: selection.to, insert: insertText },
          selection: { anchor: from + insertText.length },
        });

        fileToBase64(file)
          .then((base64Url) => {
            const docText = view.state.doc.toString();
            const index = docText.indexOf(placeholder);

            if (index !== -1) {
              view.dispatch({
                changes: {
                  from: index,
                  to: index + placeholder.length,
                  insert: `![${fileName}](${base64Url})`,
                },
              });
            }
          })
          .catch((err) => {
            console.error('[Images] Paste failed:', err);
          });
      }
    },
    drop(event, view) {
      const files = event.dataTransfer?.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      if (file.type.startsWith('image/')) {
        event.preventDefault();

        const coords = { x: event.clientX, y: event.clientY };
        const pos = view.posAtCoords(coords);
        if (pos === null) return;

        const line = view.state.doc.lineAt(pos);
        const isAtStartOfLine = pos === line.from;

        const insertText = isAtStartOfLine ? `![Uploading ${file.name}...]()\n` : `\n![Uploading ${file.name}...]()\n`;

        const placeholder = `![Uploading ${file.name}...]()`;

        // Сбрасываем файл и сразу уводим курсор на строку ниже картинки
        view.dispatch({
          changes: { from: pos, to: pos, insert: insertText },
          selection: { anchor: pos + insertText.length },
        });

        fileToBase64(file)
          .then((base64Url) => {
            const docText = view.state.doc.toString();
            const index = docText.indexOf(placeholder);

            if (index !== -1) {
              view.dispatch({
                changes: {
                  from: index,
                  to: index + placeholder.length,
                  insert: `![${file.name}](${base64Url})`,
                },
              });
            }
          })
          .catch((err) => {
            console.error('[Images] Drop failed:', err);
          });
      }
    },
  });

  return [imagesTheme, imagesField, imagePasteDropHandler];
};
