import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import { Button } from '@/src/components/ui/button';
import { FC } from 'react';

type Props = {
    resizeFunc: () => void
}

export const ResizeSidebar: FC<Props> = ({resizeFunc}) => {
    return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' className='rounded-sm absolute top-2 right-[-50]' onClick={resizeFunc}>
              -
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>resize side bar</TooltipContent>
        </Tooltip>
    )
}