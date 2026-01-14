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
import { ProfileBtn } from '../../feature/profile-btn/profile-btn';
import { SidebarFiles } from '../../feature/sidebar-files/sidebar-files';
import { ValueBtn } from '../../feature/value-btn/value-btn';

type Props = {
  size: boolean;
};

const IcoArr = [
  { ico: ChartIco, id: 1 },
  { ico: NewFolderIco, id: 2 },
  { ico: DevtoolsIco, id: 3 },
  { ico: NewDateFileIco, id: 4 },
  { ico: PlaginsIco, id: 5 },
];

// отрефакторить эту хуйню, честно лень щас на компачи разбирать
export const SideBar: FC<Props> = ({ size }) => {
  return (
    <div className='flex gap-1.5 h-full'>
      <div className='w-[45px] bg-[#262626] rounded-tr-sm rounded-br-sm flex flex-col gap-[10px] items-center py-[10px]'>
        {IcoArr.map(({ ico, id }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <Button className='w-8 h-8 p-0 bg-transparent hover:bg-[#D9D9D9]/30'>
                <Image src={ico} alt='nf' />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>chart</TooltipContent>
          </Tooltip>
        ))}
      </div>
      {size && (
        <div className='flex flex-col gap-1 pb-1 relative w-[320px]'>
          <SidebarFiles />
          <ValueBtn />
          <ProfileBtn />
        </div>
      )}
    </div>
  );
};
