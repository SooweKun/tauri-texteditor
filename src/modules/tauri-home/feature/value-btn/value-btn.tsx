import ValueIco from '@/src/assets/value-items.svg';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
  size: boolean;
};

export const ValueBtn: FC<Props> = ({ size }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`w-full h-[45px] shrink-0 bg-[#262626] rounded-sm flex gap-[10px] items-center border-[#1a1a1a] hover:border-4 cursor-pointer
                 ${size ? 'px-[15px]' : 'p-[7px]'}
                `}>
          <div className='flex items-center bg-[#D9D9D9]/30 flex-1 h-[28px] rounded-sm px-[10px] gap-[15px] items-center'>
            <Image src={ValueIco} alt='nf' className='w-[9px] h-[15px]' />
            {size && <h1 className='text-[12px]'>name... vault</h1>}
          </div>
          {size && <p className='border border-white rounded-full w-6 h-6 flex justify-center items-center text-[12px]'>?</p>}
        </div>
      </TooltipTrigger>
      <TooltipContent side='right'>values</TooltipContent>
    </Tooltip>
  );
};
