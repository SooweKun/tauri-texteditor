'use client';
import { addVaults } from '@/src/components/hooks/system-hooks';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';
import { useForm } from 'react-hook-form';

export const UnboardForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { mutate } = addVaults();

  const selectFolder = async () => {
    try {
      const select = await open({
        directory: true,
        multiple: false,
        title: 'Выберите папку для хранилища',
      });

      if (select) {
        setValue('path', select);
      }

      console.log(select, 'select');
    } catch (err) {
      console.log(err, 'ошибка выбора папки');
    }
  };

  const Submit = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        console.log('запрос выполнен успешно');

        invoke('finish_unboarding').catch((err) => console.error('Ошибка переключения окон:', err));
      },
      onError: (err) => {
        console.log(err, 'ошибка запроса');
      },
    });
    console.log(data, 'data');
  };

  return (
    <form className='flex flex-col w-full gap-[15px]' onSubmit={handleSubmit(Submit)}>
      <div className='flex flex-col gap-[7px]'>
        <h1>Имя хранилища</h1>
        <Input placeholder='Имя хранилища' className='w-[250px]' {...register('name')} />
      </div>
      <div className='flex flex-col gap-[7px]'>
        <h1>Путь до хранилища</h1>
        <Input placeholder='Обзор' className='w-[200px]' type='' {...register('path')} onClick={selectFolder} readOnly />
      </div>
      <Button className='bg-[#AE0389] text-white mt-[25px] cursor-pointer' type='submit'>
        Создать
      </Button>
    </form>
  );
};
