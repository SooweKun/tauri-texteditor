/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateFile } from '../../hooks/create-file';

export const CreateFile = () => {
  const { mutate } = useCreateFile();
  const [value, setValue] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    // убрать потом
    mutate(data.name);
  };

  return (
    <div className='w-max h-max flex flex-col gap-5 relative'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={() => setValue((prev) => !prev)} variant='ghost'>
            +
          </Button>
        </TooltipTrigger>
        <TooltipContent side='bottom'>
          <p>create new file</p>
        </TooltipContent>
      </Tooltip>
      {value && (
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2 p-2 rounded-[15px] absolute  top-[40px]'>
          <input type='text' {...register('name')} className='bg-[#FFFFFF]/30 rounded-[5px] h-[30px] pl-1.5' />
          <button type='submit' className='bg-[#D9D9D9]/30 p-2 h-[30px] rounded-[5px] flex justify-center items-center'>
            create
          </button>
        </form>
      )}
    </div>
  );
};
