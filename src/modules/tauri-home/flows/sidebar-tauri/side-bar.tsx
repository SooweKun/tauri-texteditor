'use client';
import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../../components/ui/tooltip';

// отрефакторить эту хуйню, честно лень щас на компачи разбирать
export const SideBar = () => {
  const [size, setSize] = useState(true);

  return (
    <div className='flex gap-1.5'>
      <div className='w-[45px] bg-[#262626] rounded-tr-sm rounded-br-sm'></div>
      <div className={`${size ? 'w-[320px]' : 'w-[45px]'} flex flex-col gap-1 pb-1 relative`}>
        <div className='w-full bg-[#262626] rounded-sm h-full'></div>
        <div className='w-full h-[45px] bg-[#262626] rounded-sm'></div>
        <div className='w-full h-[45px] bg-[#262626] rounded-sm'></div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' className='rounded-sm absolute top-2 right-[-50]' onClick={() => setSize((prev) => !prev)}>
              -
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>resize side bar</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
