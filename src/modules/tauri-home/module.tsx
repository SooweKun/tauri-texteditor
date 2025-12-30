import { ObserverLayout } from '@/src/components/layouts/observer-layout';
import { Editor } from './flows/editor';

export const TauriHomeModule = () => {
  return (
    <ObserverLayout>
      <div className='text-white flex w-full '>
        <Editor />
      </div>
    </ObserverLayout>
  );
};
