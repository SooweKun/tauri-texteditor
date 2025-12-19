import close from '@/src/assets/close.svg';
import rollDown from '@/src/assets/roll-down.svg';
import rollUp from '@/src/assets/roll-up.svg';
import { Button } from '@/src/components/ui/button';
import { getCurrentWindow } from '@tauri-apps/api/window';
import Image from 'next/image';

export const WindowControll = () => {
  const appWindow = getCurrentWindow();

  return (
    <div className='w-max flex gap-2 items-center'>
      <Button variant='ghost' onClick={() => appWindow.minimize()}>
        <Image src={rollDown} alt='nf' />
      </Button>
      <Button variant='ghost' onClick={() => appWindow.toggleMaximize()}>
        <Image src={rollUp} alt='nf' />
      </Button>
      <Button variant='ghost' onClick={() => appWindow.close()}>
        <Image src={close} alt='nf' />
      </Button>
    </div>
  );
};
