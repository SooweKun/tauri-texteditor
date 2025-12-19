'use client';
import { ActiveFile } from '../../feature/active-file/active-file';
import { CreateFile } from '../../feature/create-file/create-file';
import { WindowControll } from '../../feature/window-controll/window-controll';

export const HeaderTauri = () => {
  return (
    <div className='w-full h-10 bg-[#363636] flex justify-between items-center' data-tauri-drag-region>
      <div className='w-[370px]'></div>
      <div className='flex justify-start flex-1 px-5' data-tauri-drag-region>
        <CreateFile />
        <ActiveFile />
      </div>
      <WindowControll />
    </div>
  );
};
