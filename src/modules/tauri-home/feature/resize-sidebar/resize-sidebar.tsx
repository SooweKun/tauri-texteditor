import { Button } from '@/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import { FC } from 'react';

type Props = {
  resizeFunc: () => void;
};

export const ResizeSidebar: FC<Props> = ({ resizeFunc }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='ghost' className='rounded-sm' onClick={resizeFunc}>
          -
        </Button>
      </TooltipTrigger>
      <TooltipContent side='bottom'>resize side bar</TooltipContent>
    </Tooltip>
  );
};
