'use client';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import { skipToken, useQuery } from '@tanstack/react-query';
import { basicSetup } from 'codemirror';
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

  useEffect(() => {
    view.current = new EditorView({
      doc: content as string,
      extensions: [basicSetup, markdown(), EditorView.theme({ '&': { height: '100%', fontSize: '18px' } })],
      parent: editorRef.current!,
    });

    return () => view.current?.destroy();
  }, [content]);

  return <div ref={editorRef} />;
};
