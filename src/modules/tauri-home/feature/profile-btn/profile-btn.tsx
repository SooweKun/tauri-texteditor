import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import { FC } from 'react';

type Props = {
    size: boolean
}

export const ProfileBtn: FC<Props> = ({size}) => {
    return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={
                `w-full h-[45px] bg-[#262626] rounded-sm flex justify-between items-center px-[15px] hover:shadow-polinka hover:z-[0]
                 ${size 
                    ? 'w-[45px] justify-center rounded-full px-0 mx-auto' 
                    : 'w-full justify-between rounded-sm px-[15px]'
                }
                `}>
                <div className="flex gap-[10px] items-center">
                    <div className="w-[30px] h-[30px] bg-[#D9D9D9] rounded-full" />
                    {size && <h1 className="text-[12px]">test@mail.com</h1>}
                </div>
                {size && <p>N</p>}
            </div>
          </TooltipTrigger>
          <TooltipContent side='right'>resize side bar</TooltipContent>
        </Tooltip>
    )
}