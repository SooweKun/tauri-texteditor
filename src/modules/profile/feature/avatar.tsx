import AvatarTest from '@/src/assets/test-avatar.jpg';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import Image from 'next/image';

export const Avatar = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className='w-[65px] h-[65px] rounded-full p-0.5 border-2 border-[#5D5D5D] hover:border-[#AE0389] cursor-pointer'>
          <Image src={AvatarTest} alt='nf' className='w-full h-full rounded-full' />
        </div>
      </TooltipTrigger>
      <TooltipContent side='bottom'>
        <p>test</p>
      </TooltipContent>
    </Tooltip>
  );
};
