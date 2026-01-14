'use client';
import NewDateFileIco from '@/src/assets/calendar-ico.svg';
import ChartIco from '@/src/assets/chart-ico.svg';
import DevtoolsIco from '@/src/assets/devtools-ico.svg';
import NewFolderIco from '@/src/assets/new-folder-ico.svg';
import PlaginsIco from '@/src/assets/plagins-ico.svg';
import { Button } from '@/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import Image from 'next/image';
import { FC } from 'react';
import { ActiveFile } from '../../feature/active-file/active-file';
import { CreateFile } from '../../feature/create-file/create-file';
import { ResizeSidebar } from '../../feature/resize-sidebar/resize-sidebar';
import { WindowControll } from '../../feature/window-controll/window-controll';

const IcoArr = [
  { ico: ChartIco, id: 1 },
  { ico: NewFolderIco, id: 2 },
  { ico: DevtoolsIco, id: 3 },
  { ico: NewDateFileIco, id: 4 },
  { ico: PlaginsIco, id: 5 },
];

type Props = {
  sizeFunc: () => void;
};

export const HeaderTauri: FC<Props> = ({ sizeFunc }) => {
  return (
    <div className='w-full h-10 bg-[#363636] flex justify-between items-center' data-tauri-drag-region>
      <div className='w-[355px] flex gap-[10px] px-[5px]'>
        <ResizeSidebar resizeFunc={sizeFunc} />
        {IcoArr.map(({ ico, id }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <Button variant='ghost' className='w-8 h-8 p-0'>
                <Image src={ico} alt='nf' />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='bottom'>chart</TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className='flex justify-start flex-1 px-5' data-tauri-drag-region>
        <CreateFile />
        <ActiveFile />
      </div>
      <WindowControll />
    </div>
  );
};
