import Close from '@/src/assets/close.svg';
import { Button } from '@/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import type { BackendReault } from '@/src/modules/tauri-home/hooks/getfiles';
import { GetFiles } from '@/src/modules/tauri-home/hooks/getfiles';
import Image from 'next/image';
import { useState } from 'react';
import { DeleteFile } from '../../hooks/delete-file';

export const ActiveFile = () => {
  const { data } = GetFiles();
  const { mutate } = DeleteFile();
  console.log(data, 'active file');
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className='w-full flex gap-1.5' data-tauri-drag-region>
      {data &&
        data.map(({ name, path }: BackendReault) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                className='focus:bg-[#262626] flex gap-6'
                onClick={() => {
                  setActive(name);
                  console.log(path, 'path file');
                }}>
                {name}
                {active === name && <Image src={Close} alt='nf' className='w-2 h-2' onClick={() => mutate(path)} />}
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
