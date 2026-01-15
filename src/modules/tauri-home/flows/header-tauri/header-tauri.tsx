'use client';
import { FC } from 'react';
import { ActiveFile } from '../../feature/active-file/active-file';
import { CreateFile } from '../../feature/create-file/create-file';
import { HeaderControll } from '../../feature/header-control';
import { ResizeSidebar } from '../../feature/resize-sidebar/resize-sidebar';
import { WindowControll } from '../../feature/window-controll/window-controll';

type Props = {
  sizeFunc: () => void;
  size: boolean;
};

export const HeaderTauri: FC<Props> = ({ sizeFunc, size }) => {
  return (
    <div className='w-full h-10 bg-[#363636] flex justify-between items-center' data-tauri-drag-region>
      <div className='w-[355px] flex gap-[10px] px-[5px]'>
        <ResizeSidebar resizeFunc={sizeFunc} size={size} />
        <HeaderControll />
      </div>
      <div className='flex justify-start flex-1 px-5' data-tauri-drag-region>
        <CreateFile />
        <ActiveFile />
      </div>
      <WindowControll />
    </div>
  );
};
