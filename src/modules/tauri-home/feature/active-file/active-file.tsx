import Close from '@/src/assets/close.svg';
import { Button } from '@/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import type { BackendReault } from '@/src/modules/tauri-home/hooks/getfiles';
import { GetFiles } from '@/src/modules/tauri-home/hooks/getfiles';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { DeleteFile } from '../../hooks/delete-file';
import { ReadFile } from '../../hooks/read-file';
import { activeFile } from '../../store/active-files';

export const ActiveFile = () => {
  const { data } = GetFiles();
  const { mutate } = DeleteFile();
  const { mutate: mutateRead } = ReadFile();
  console.log(data, 'active file');
  const [file, setFile] = useAtom(activeFile);

  return (
    <div className='w-full flex items-end gap-1.5' data-tauri-drag-region>
      {data &&
        data.map(({ name, path }: BackendReault) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                className={`${file === name ? 'bg-[#262626]' : ''} flex gap-6`}
                onClick={() => {
                  mutateRead(path);
                  setFile(name);
                  console.log(path, 'path file');
                }}>
                {name}
                {file === name && <Image src={Close} alt='nf' className='w-2 h-2' onClick={() => mutate(path)} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>{path}</p>
            </TooltipContent>
          </Tooltip>
        ))}
    </div>
  );
};
