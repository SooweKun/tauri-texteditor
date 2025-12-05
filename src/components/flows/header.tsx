'use client';
import close from '@/src/assets/close.svg';
import rollDown from '@/src/assets/roll-down.svg';
import rollUp from '@/src/assets/roll-up.svg';
import { getCurrentWindow } from '@tauri-apps/api/window';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import type { BackendReault } from './getfiles';
import { GetFiles } from './getfiles';

export const Header = () => {
  const appWindow = getCurrentWindow();

  const { data } = GetFiles();

  return (
    <div className='w-full h-10 bg-[#363636] flex justify-between items-center' data-tauri-drag-region>
      <div className='w-[370px]'></div>
      <div className='flex justify-start flex-1 px-5' data-tauri-drag-region>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost'>+</Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            <p>create new file</p>
          </TooltipContent>
        </Tooltip>
        <div className='w-full flex gap-1.5' data-tauri-drag-region>
          {data &&
            data.map(({ name, path }: BackendReault) => (
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <Button variant='ghost'>{name}</Button>
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                  <p>{path}</p>
                </TooltipContent>
              </Tooltip>
            ))}
        </div>
      </div>
      <div className='w-max flex gap-2 items-center'>
        <Button variant='ghost' onClick={() => appWindow.minimize()}>
          <Image src={rollDown} alt='nf' />
        </Button>
        <Button variant='ghost' onClick={() => appWindow.toggleMaximize()}>
          <Image src={rollUp} alt='nf' />
        </Button>
        <Button variant='ghost' onClick={() => appWindow.close()}>
          <Image src={close} alt='nf' />
        </Button>
      </div>
    </div>
  );
};
