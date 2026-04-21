import { WebHeaderLayout } from '@/src/components/layouts/web-header-layout';
import { Animate } from './feature/animate';

export const WebHomeModule = () => {
  return (
    <WebHeaderLayout>
      <div className='text-white flex-1 flex justify-center items-center'>
        <Animate />
      </div>
    </WebHeaderLayout>
  );
};
