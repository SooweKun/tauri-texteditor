import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

export const NewChest = () => {
  return (
    <div className='h-[375px] w-full flex flex-col'>
      <div className='h-[55px] w-full flex justify-start items-center pl-[50px]'>
        <h1 className='text-[16px]'>Создайте новое локальное хранилище</h1>
      </div>
      <div className='px-[65px] flex flex-col py-[10px] w-full gap-[15px]'>
        <div className='flex w-[330px] justify-between'>
          <div className='flex flex-col gap-[2px]'>
            <h1 className='text-white text-[14px]'>Имя хранилища</h1>
            <p className='text-[10px] text-[#717171] pl-[5px]'>Укажите имя нового хранилища</p>
          </div>
          <Input className='w-[150px] text-[12px]' placeholder='Имя хранилища' />
        </div>
        <div className='flex w-[330px] justify-between'>
          <div className='flex flex-col gap-[2px]'>
            <h1 className='text-white text-[14px]'>Расположение</h1>
            <p className='text-[10px] text-[#717171] pl-[5px]'>Укажите расположение нового хранилища</p>
          </div>
          <Input className='w-[80px] text-[12px]' placeholder='Обзор' />
        </div>
        <div className='w-full flex justify-center mt-[30px]'>
          <Button className='w-[200px] h-[30px] bg-[#AE0389] text-white border-none cursor-pointer hover-none'>Создать</Button>
        </div>
      </div>
    </div>
  );
};
