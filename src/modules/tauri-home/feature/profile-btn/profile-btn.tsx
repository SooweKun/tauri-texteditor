import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';

export const ProfileBtn = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className='w-full h-[45px] shrink-0 bg-[#262626] rounded-sm flex justify-between items-center border-[#1a1a1a] hover:border-4 cursor-pointer px-[15px]'>
          <div className='flex gap-[10px] items-center'>
            <div className='w-[30px] h-[30px] bg-[#D9D9D9] rounded-full' />
            <h1 className='text-[12px]'>test@mail.com</h1>
          </div>
          <p>N</p>
        </div>
      </TooltipTrigger>
      <TooltipContent side='right'>profile</TooltipContent>
    </Tooltip>
  );
};
