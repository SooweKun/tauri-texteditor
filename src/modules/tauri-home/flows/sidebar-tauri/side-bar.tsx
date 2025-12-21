'use client';
import { useState } from 'react';
import { ProfileBtn } from '../../feature/profile-btn/profile-btn';
import { ResizeSidebar } from '../../feature/resize-sidebar/resize-sidebar';
import { SidebarFiles } from '../../feature/sidebar-files/sidebar-files';
import { ValueBtn } from '../../feature/value-btn/value-btn';

// отрефакторить эту хуйню, честно лень щас на компачи разбирать
export const SideBar = () => {
  const [size, setSize] = useState(true);

  const sizeFunc = () => {
    setSize((prev) => !prev);
  };

  return (
    <div className='flex gap-1.5  h-full'>
      <div className='w-[45px] bg-[#262626] rounded-tr-sm rounded-br-sm '></div>
      <div className={`${size ? 'w-[320px]' : 'w-[45px]'} flex flex-col gap-1 pb-1 relative`}>
        <SidebarFiles />
        <ValueBtn size={size} />
        <ProfileBtn size={size} />
        <ResizeSidebar resizeFunc={sizeFunc} />
      </div>
    </div>
  );
};
