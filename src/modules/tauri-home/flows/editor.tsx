'use client';
import { history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { drawSelection, EditorView, keymap } from '@codemirror/view';
import { skipToken, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);

  const { data: content } = useQuery({
    queryKey: ['fileContent'],
    queryFn: skipToken,
    enabled: false,
  });

  console.log(content, 'content');

  const myTheme = EditorView.theme({
    '&': {
      height: '100%', // Или '100%'
      width: '900px',
      fontSize: '16px',
    },
    '.cm-content': {
      fontFamily: 'Menlo, Monaco, Lucida Console, monospace',
      padding: '10px 0',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: 'white',
    },
    // Убираем дефолтную синюю обводку при фокусе
    '&.cm-focused': { outline: 'none' },
    // Стили для самого текста внутри
    '.cm-line': { padding: '0 10px' },
  });

  const extensions = [
    history(), // Undo/Redo
    drawSelection(), // Красивое выделение
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    markdown(), // Поддержка Markdown
    bracketMatching(), // Подсветка парных скобок
    indentOnInput(), // Авто-отступ при вводе
    EditorView.lineWrapping, // Автоматический перенос длинных строк
    myTheme, // Твои стили
    keymap.of([
      ...historyKeymap,
      indentWithTab, // Tab работает как отступ, а не прыжок по кнопкам
    ]),
  ];

  const state = EditorState.create({
    doc: content as string,
    extensions,
  });

  useEffect(() => {
    view.current = new EditorView({
      state,
      parent: editorRef.current!,
    });

    return () => view.current?.destroy();
  }, [content]);

  return (
    <div className='size-full flex justify-start items-center flex-col'>
      <h1 className='text-xl'>{content?.name}</h1>
      <div ref={editorRef} />
    </div>
  );
};
