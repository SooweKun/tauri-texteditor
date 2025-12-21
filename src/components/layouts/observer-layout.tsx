import { HeaderTauri } from '@/src/modules/tauri-home/flows/header-tauri/header-tauri';
import { SideBar } from '../../modules/tauri-home/flows/sidebar-tauri/side-bar';

export const ObserverLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='w-full bg-[#363636] h-screen flex flex-col'>
      <HeaderTauri />
      <div className='w-full flex-1 min-h-0 flex gap-1.5'>
        <SideBar />
        <div className='w-full h-full bg-[#1a1a1a] rounded-t-sm flex justify-center items-center'>{children}</div>
      </div>
    </div>
  );
};
