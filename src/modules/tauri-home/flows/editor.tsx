'use client';
import { history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { drawSelection, EditorView, keymap } from '@codemirror/view';
import { skipToken, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { BackendReadResault } from '../hooks/read-file';

export const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);

  const { data } = useQuery<BackendReadResault>({
    queryKey: ['fileContent'],
    queryFn: skipToken,
    enabled: false,
    staleTime: Infinity,
  });

  console.log(data, 'content');

  const myTheme = EditorView.theme({
    // вынести в отдельный файл все стили
    '&': {
      height: '100%',
      width: '100%',
      fontSize: '16px',
    },
    '.cm-content': {
      fontFamily: 'Menlo, Monaco, Lucida Console, monospace',
      padding: '10px 0',
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
    bracketMatching(), // Подсветка парных скобок
    indentOnInput(), // Авто-отступ при вводе
    EditorView.lineWrapping, // Автоматический перенос длинных строк
    myTheme,
    keymap.of([
      ...historyKeymap,
      indentWithTab, // Tab работает как отступ, а не прыжок по кнопкам
    ]),
  ];

  //отрефакторить эти два эффекта нахуй

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: '',
      extensions,
    });

    view.current = new EditorView({
      state,
      parent: editorRef.current!,
    });

    return () => view.current?.destroy();
  }, []);

  useEffect(() => {
    if (view.current && data?.content !== undefined) {
      const currentDoc = view.current.state.doc.toString();

      if (data.content !== currentDoc) {
        view.current.dispatch({
          changes: {
            from: 0,
            to: currentDoc.length,
            insert: data.content,
          },
        });
      }
    }
  }, [data?.content]);

  return (
    <div className='size-full flex justify-start items-center flex-col pt-[15px]'>
      <div className='max-w-[900px]'>
        <div className='w-full flex justify-start'>
          <h1 className='text-[18px] font-bold'>{data && data.name}</h1>
        </div>
        <div ref={editorRef} />
      </div>
    </div>
  );
};
