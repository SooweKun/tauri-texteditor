/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/src/components/ui/input';
import { useForm } from 'react-hook-form';
import { useSearch } from '../hooks/search-file';

export const SideBarSearch = () => {
  const { register, handleSubmit } = useForm();
  const { mutate, data } = useSearch();

  const Rs = (data: any) => {
    mutate(data);
  };

  return (
    <div className='flex flex-col gap-[10px]'>
      <form className='flex flex-col gap-[15px]' onChange={handleSubmit(Rs)}>
        <Input className='h-[25px] w-full' placeholder='поиск файлов' {...register('name')} />
        <div className='w-full h-[2px] bg-[#616161] rounded-2xl' />
      </form>
    </div>
  );
};
