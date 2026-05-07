import { UnboardForm } from './feature/unboard-form';

export const UnboardModule = () => {
  return (
    <div className='px-[57px] py-[103px] flex gap-[20px] w-full h-full flex-col justify-center items-center'>
      <div className='w-full'>
        <h1 className='text-white text-center font-rubik text-[20px] z-10'>создайте свое первое хранилище</h1>
        <p className='w-full h-[76px] text-[#686868] font-rubik z-10 mt-[42px] text-[16px] text-left leading-5'>
          Создайте свое первое хранилище Arima для файлов, удобная настройка, синхронизация данных и много других удобных функций.
        </p>
      </div>
      <div className='w-1 h-1 animate-grow bg-[#F861FA]/85 absolute blur-2xl' />
      <UnboardForm />
    </div>
  );
};
