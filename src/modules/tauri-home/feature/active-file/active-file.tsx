import Close from '@/src/assets/close.svg';
import { addStarredFiles } from '@/src/components/hooks/system-hooks';
import { Button } from '@/src/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/src/components/ui/context-menu';
import type { BackendReault } from '@/src/modules/tauri-home/hooks/getfiles';
import { GetFiles } from '@/src/modules/tauri-home/hooks/getfiles';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { DeleteFile } from '../../hooks/delete-file';
import { ReadFile } from '../../hooks/read-file';
import { activeFile } from '../../store/active-files';

export const ActiveFile = () => {
  const { data } = GetFiles();
  const { mutate: mutateDelete } = DeleteFile();
  const { mutate: mutateStarred } = addStarredFiles();
  const { mutate: mutateRead } = ReadFile();
  console.log(data, 'active file');
  const [file, setFile] = useAtom(activeFile);

  // потом сделать переиспользуемым саму контекстую менюшку

  return (
    <div
      className='max-w-[1300px] flex items-end gap-1.5 overflow-x-auto'
      data-tauri-drag-region
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {data &&
        data.map(({ name, path }: BackendReault) => (
          <ContextMenu key={name}>
            <ContextMenuTrigger>
              <Button
                variant='ghost'
                className={`${file === name ? 'bg-[#262626]' : ''} flex gap-6`}
                onClick={() => {
                  mutateRead(path);
                  setFile(name);
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
        ))}
    </div>
  );
};
