import { WebHeaderLayout } from '@/src/components/layouts/web-header-layout';
import { Animate } from './feature/animate';

export const WebHomeModule = () => {
  return (
    <WebHeaderLayout>
      <div className='text-white  flex flex-col '>
        <div className='flex w-full h-screen justify-center items-center'>
          <Animate />
        </div>
        <div className='w-full bg-black h-[900px]'></div>
      </div>
    </WebHeaderLayout>
  );
};
