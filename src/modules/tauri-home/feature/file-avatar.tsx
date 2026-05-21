import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import Close from '@/src/assets/close.svg';
import { addStarredFiles } from '@/src/components/hooks/system-hooks';
import { Button } from '@/src/components/ui/button';
import { activeFile } from '@/src/modules/tauri-home/store/active-files';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { FC } from 'react';
import { DeleteFile } from '../hooks/delete-file';
import { ReadFile } from '../hooks/read-file';

type Props = {
  name: string;
  path: string;
};

export const FileAvatar: FC<Props> = ({ name, path }) => {
  const { mutate: mutateRead } = ReadFile();
  const { mutate: mutateDelete } = DeleteFile();
  const { mutate: mutateStarred } = addStarredFiles();
  const [file, setFile] = useAtom(activeFile);

  const test = () => {
    console.log('click');
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button
          className={`
            w-full justify-between transition-colors bg-transparent text-white h-[30px] text-[16px]
            hover:bg-[#D9D9D9]/30 
            focus:bg-[#D9D9D9]/30
            ${file === name ? 'bg-[#D9D9D9]/30' : ''}
          `}
          key={name}
          onClick={() => {
            setFile(name);
            mutateRead(path);
            console.log(path, 'path file');
          }}>
          {name}
          {file === name && (
            <Image
              src={Close}
              alt='nf'
              className='w-2 h-2'
              onClick={(e) => {
                setFile(null);
                e.stopPropagation();
              }}
            />
          )}
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent className='w-48 bg-[#363636]/90'>
        <ContextMenuGroup>
          <ContextMenuItem className='text-green-400'>
            Download as
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem className='text-yellow-500' onClick={() => mutateStarred({ name, path })}>
            Starred
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem className='text-red-400' onClick={() => mutateDelete(path)}>
            Delete
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
};
