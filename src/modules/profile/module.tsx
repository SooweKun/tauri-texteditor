'use client'; // потом вынести за модуль логику что бы избежать гидрации и не делать его клиентским
import Resize from '@/src/assets/resize-test.svg';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import Image from 'next/image';
import { useState } from 'react';
import { Chart } from './feature/chart';
import { UserInfo } from './feature/user-info';

export const ProfileModule = () => {
  const [width, setWidth] = useState(true);

  const changeWidth = () => {
    setWidth((prev) => !prev);
  };

  return (
    <div className={`w-full ${width ? 'max-w-5xl' : 'max-w-3xl'} px-2 pt-6 gap-4 flex flex-col`}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image src={Resize} alt='nf' className='w-6 h-6 cursor-pointer' onClick={changeWidth} />
        </TooltipTrigger>
        <TooltipContent side='bottom'>
          <p>изменение ширины</p>
        </TooltipContent>
      </Tooltip>
      <div className='w-full flex justify-between'>
        <div className='flex flex-col gap-2.5'>
          <UserInfo />
          <div className='pl-2.5'>
            <p className='text-[#5D5D5D] text-sm cursor-pointer'>изменить ник</p>
            <p className='text-[#AE0389] text-sm underline underline-offset-4 cursor-pointer'>изменить адрес электронной почты</p>
          </div>
        </div>
        <Chart />
      </div>
    </div>
  );
};
