'use client';
import { history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { bracketMatching, defaultHighlightStyle, HighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { drawSelection, EditorView, keymap } from '@codemirror/view';
import { styleTags, tags as t, Tag } from '@lezer/highlight';
import { skipToken, useQuery } from '@tanstack/react-query';
import CodeMirror from '@uiw/react-codemirror';
import { livePreviewExtension } from 'cm6-livepreview-lib';
import { BackendReadResault } from '../hooks/read-file';
import { useSaveFile } from '../hooks/save-file';

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
  const { data } = useQuery<BackendReadResault>({
    queryKey: ['fileContent'],
    queryFn: skipToken,
    enabled: false,
    staleTime: Infinity,
  });

  const { mutate } = useSaveFile();

  console.log(data, 'content');

  return (
    <div className='size-full flex justify-start items-center flex-col pt-[15px]'>
      <div className='max-w-[900px] w-full'>
        <div className='w-full flex justify-start'>
          <h1 className='text-[20px] font-bold text-[#C09FE9]'>{data && data.name}</h1>
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
