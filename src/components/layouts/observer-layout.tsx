import { Header } from '../flows/header';
import { SideBar } from './side-bar';

export const ObserverLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='w-full bg-[#363636] h-screen flex flex-col'>
      <Header />
      <div className='w-full grow flex gap-1.5'>
        <SideBar />
        <div className='w-full h-full bg-[#1a1a1a] rounded-t-sm flex justify-center items-center'>{children}</div>
      </div>
    </div>
  );
};
