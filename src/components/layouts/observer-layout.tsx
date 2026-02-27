'use client';
import { HeaderTauri } from '@/src/modules/tauri-home/flows/header-tauri/header-tauri';
import { SideBar } from '@/src/modules/tauri-home/flows/sidebar-tauri/side-bar';
import { useState } from 'react';

export const ObserverLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [size, setSize] = useState(true);

  const sizeFunc = () => {
    setSize((prev) => !prev);
  };

  return (
    <div className='w-full bg-[#363636] h-screen flex flex-col'>
      <HeaderTauri sizeFunc={sizeFunc} size={size} />
      <div className='w-full flex-1 min-h-0 flex gap-1.5'>
        <SideBar size={size} />
        <div className='w-full h-full bg-[#1a1a1a] rounded-t-sm flex '>{children}</div>
      </div>
    </div>
  );
};
