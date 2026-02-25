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
        <div className='flex flex-col gap-2 p-2 bg-amber-300 rounded-[15px] absolute top-[50px]'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type='text' {...register('name')} />
            <button type='submit' className='bg-amber-950 p-2'>
              submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
