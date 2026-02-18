'use client';
import { history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { drawSelection, EditorView, keymap } from '@codemirror/view';
import { skipToken, useQuery } from '@tanstack/react-query';
import CodeMirror from '@uiw/react-codemirror';
import { livePreviewExtension } from 'cm6-livepreview-lib';
import { BackendReadResault } from '../hooks/read-file';

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
  keymap.of([
    ...historyKeymap,
    indentWithTab, // Tab работает как отступ, а не прыжок по кнопкам
  ]),
];

export const Editor = () => {
  const { data } = useQuery<BackendReadResault>({
    queryKey: ['fileContent'],
    queryFn: skipToken,
    enabled: false,
    staleTime: Infinity,
  });

  console.log(data, 'content');

  return (
    <div className='size-full flex justify-start items-center flex-col pt-[15px]'>
      <div className='max-w-[900px]'>
        <div className='w-full flex justify-start'>
          <h1 className='text-[18px] font-bold'>{data && data.name}</h1>
        </div>
        <CodeMirror
          value={data?.content || ''}
          extensions={extensions} // наши зависимости
          basicSetup={false} // отключаем базовые зависимости (пропс выше)
          theme={myTheme} // наша тема
          onChange={(value) => {
            // как напишу функцию сюда мутейт просто вставлю )
          }}
        />
      </div>
    </div>
  );
};
