'use client';
import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import { ResizeSidebar } from '../../feature/resize-sidebar/resize-sidebar';
import { ProfileBtn } from '../../feature/profile-btn/profile-btn';

// отрефакторить эту хуйню, честно лень щас на компачи разбирать
export const SideBar = () => {
  const [size, setSize] = useState(true);

  const sizeFunc = () => {
    setSize(prev => !prev)
  }

  return (
    <div className='flex gap-1.5'>
      <div className='w-[45px] bg-[#262626] rounded-tr-sm rounded-br-sm'></div>
      <div className={`${size ? 'w-[320px]' : 'w-[45px]'} flex flex-col gap-1 pb-1 relative`}>
        <div className='w-full bg-[#262626] rounded-sm h-full'></div>
        <div className='w-full h-[45px] bg-[#262626] rounded-sm'></div>
        <ProfileBtn size={size} />
        <ResizeSidebar resizeFunc={sizeFunc} />
      </div>
    </div>
  );
};
