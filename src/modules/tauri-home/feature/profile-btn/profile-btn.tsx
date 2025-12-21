import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import { FC } from 'react';

type Props = {
  size: boolean;
};

export const ProfileBtn: FC<Props> = ({ size }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`w-full h-[45px] shrink-0 bg-[#262626] rounded-sm flex justify-between items-center border-[#1a1a1a] hover:border-4 cursor-pointer
                 ${size ? 'px-[15px]' : 'px-0 justify-center items-center'}
                `}>
          <div className='flex gap-[10px] items-center'>
            <div className='w-[30px] h-[30px] bg-[#D9D9D9] rounded-full' />
            {size && <h1 className='text-[12px]'>test@mail.com</h1>}
          </div>
          {size && <p>N</p>}
        </div>
      </TooltipTrigger>
      <TooltipContent side='right'>profile</TooltipContent>
    </Tooltip>
  );
};
