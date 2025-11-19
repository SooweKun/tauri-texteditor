'use client';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { invoke } from '@tauri-apps/api/core';
import { useForm } from 'react-hook-form';

export const TauriHomeModule = () => {
  const handleCreateFile = async (data: any) => {
    const filePath = `C:/Users/apext/program/tauri-texteditor/tmp/${data.createFile}.md`;
    try {
      await invoke('create_file', { path: filePath });
    } catch {
      console.log('ошибка');
    }
  };

  const DeleteCreateFile = async (data: any) => {
    console.log(data.deleteFile);
    const filePath = `C:/Users/apext/program/tauri-texteditor/tmp/${data.deleteFile}.md`;
    try {
      await invoke('delete_file', { path: filePath });
    } catch {
      console.log('ошибка');
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className='text-white flex flex-col w-full justify-center items-center'>
      <form onSubmit={handleSubmit(handleCreateFile)} className='flex gap-2'>
        <Input placeholder='название файла' className='w-100' {...register('createFile')} />
        <Button className='cursor-pointer' variant={'ghost'} type='submit'>
          +
        </Button>
      </form>
      <form onSubmit={handleSubmit(DeleteCreateFile)} className='flex gap-2'>
        <Input placeholder='название файла' className='w-100' {...register('deleteFile')} />
        <Button className='cursor-pointer' variant={'ghost'} type='submit'>
          -
        </Button>
      </form>
    </div>
  );
};
