/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { useForm } from 'react-hook-form';
import { ReadFile } from '../hooks/read-file';
import { useSearch } from '../hooks/search-file';

export const SideBarSearch = () => {
  const { register, handleSubmit } = useForm();
  const { mutate, data: back } = useSearch();
  const { mutate: mutateRead } = ReadFile();

  console.log(back, 'serch data');

  const Rs = (data: any) => {
    mutate(data.name);
  };

  return (
    <div className='flex flex-col gap-[10px]'>
      <form className='flex flex-col gap-[15px]' onChange={handleSubmit(Rs)}>
        <Input className='h-[25px] w-full' placeholder='поиск файлов' {...register('name')} />
        <div className='w-full h-[2px] bg-[#616161] rounded-2xl' />
      </form>
      <div className='flex flex-col gap-[5px]'>
        {back && (
          <Button
            className='w-full flex justify-start hover:bg-[#6b6b6b] cursor-pointer bg-transparent text-white text-[16px]'
            onClick={() => {
              mutateRead(back.path);
            }}>
            {back.name}
          </Button>
        )}
      </div>
    </div>
  );
};
