'use client';
import { FC } from 'react';
import { ProfileBtn } from '../../feature/profile-btn/profile-btn';
import { SidebarFiles } from '../../feature/sidebar-files/sidebar-files';
import { ValueBtn } from '../../feature/value-btn/value-btn';

type Props = {
  size: boolean;
};

// отрефакторить эту хуйню, честно лень щас на компачи разбирать
export const SideBar: FC<Props> = ({ size }) => {
  return (
    <div className='flex gap-1.5  h-full'>
      <div className='w-[45px] bg-[#262626] rounded-tr-sm rounded-br-sm '></div>
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
