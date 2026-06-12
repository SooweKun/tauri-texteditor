'use client';
import { history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { bracketMatching, defaultHighlightStyle, HighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { drawSelection, EditorView, keymap } from '@codemirror/view';
import { styleTags, tags as t, Tag } from '@lezer/highlight';
import { skipToken, useQuery } from '@tanstack/react-query';
import CodeMirror from '@uiw/react-codemirror';
import { livePreviewExtension } from 'cm6-livepreview-lib';
import { useAtom } from 'jotai';
import { BackendReadResault } from '../hooks/read-file';
import { useRename } from '../hooks/rename-file';
import { useSaveFile } from '../hooks/save-file';
import { activeFile } from '../store/active-files';

const markupTag = Tag.define();

const myHighlightStyle = HighlightStyle.define([
  { tag: t.heading1, color: '#C09FE9', fontWeight: 'bold', fontSize: '18px' }, // Заголовок
  { tag: t.emphasis, color: '#c678dd', fontStyle: 'italic' }, // Курсив
  { tag: t.strong, color: '#ffffff', fontWeight: 'bold' }, // Жирный

  { tag: t.processingInstruction, color: '#C09FE9' }, // спец символы
]);

const customMarkdown = markdown({
  base: markdownLanguage,
  extensions: [
    {
      props: [
        styleTags({
          HeaderMark: markupTag,
          EmphasisMark: markupTag,
          StrongMark: markupTag,
          ListMark: markupTag,
          QuoteMark: markupTag,
          LinkMark: markupTag,
        }),
      ],
    },
  ],
});

const myTheme = EditorView.theme({
  // вынести в отдельный файл все стили
  '&': {
    height: '100%',
    width: '100%',
    fontSize: '16px',
  },
  '.cm-content': {
    fontFamily: 'Menlo, Monaco, Lucida Console, monospace',
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: 'white',
  },
  '&.cm-focused': { outline: 'none' },
  '.cm-line': { padding: '0 10px' },
});

const extensions = [
  history(), // Undo/Redo
  drawSelection(), // Красивое выделение
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  markdown(), // Поддержка Markdown
  livePreviewExtension,
  bracketMatching(), // Подсветка парных скобок
  indentOnInput(), // Авто-отступ при вводе
  EditorView.lineWrapping, // Автоматический перенос длинных строк
  myTheme,
  customMarkdown,
  syntaxHighlighting(myHighlightStyle),
  keymap.of([
    ...historyKeymap,
    indentWithTab, // Tab работает как отступ, а не прыжок по кнопкам
  ]),
];

export const Editor = () => {
  const [file, setFile] = useAtom(activeFile); // убрать это отсюда нахуй
  const { data } = useQuery<BackendReadResault>({
    queryKey: ['fileContent', file],
    queryFn: skipToken,
    enabled: false,
    staleTime: Infinity,
  });

  const { mutate: renameFile } = useRename();
  const { mutate } = useSaveFile();
  console.log(file, 'file');

  return (
    <div className='size-full flex justify-start items-center flex-col pt-[15px] overflow-y-auto'>
      <div className={`max-w-[900px] w-full ${!file ? 'hidden' : 'block'}`}>
        <div className='w-full flex justify-start'>
          {/* <h1 className='text-[20px] font-bold text-[#C09FE9]'>{data && data.name}</h1> */}
          <input
            className='bg-[#1a1a1a] border-none text-[20px] font-bold text-[#C09FE9] w-max select-none'
            defaultValue={data && data.name}
            key={file}
            onBlur={(e) => {
              const newName = e.target.value;
              // Запускаем только если имя реально изменили
              if (newName && newName !== data?.name) {
                renameFile(
                  { oldPath: data!.path, newName, fileKey: file },
                  { onSuccess: () => setFile(newName) }, // Обновляем атом после успеха
                );
              }
            }}
          />
        </div>
        <CodeMirror
          value={data?.content || ''}
          extensions={extensions} // наши зависимости
          basicSetup={false} // отключаем базовые зависимости (пропс выше)
          theme={myTheme} // наша тема
          onChange={(value) => {
            mutate({ content: value, path: data?.path });
          }}
        />
      </div>
    </div>
  );
};
