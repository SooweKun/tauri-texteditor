import closeSidebar from '@/src/assets/close-sidebar.svg';
import openSidebar from '@/src/assets/open-sidebar.svg';
import { Button } from '@/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
  resizeFunc: () => void;
  size: boolean;
};

export const ResizeSidebar: FC<Props> = ({ resizeFunc, size }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='ghost' className='rounded-sm w-8 h-8 p-0' onClick={resizeFunc}>
          <Image src={size ? openSidebar : closeSidebar} alt='nf' />
        </Button>
      </TooltipTrigger>
      <TooltipContent side='bottom'>resize side bar</TooltipContent>
    </Tooltip>
  );
};
