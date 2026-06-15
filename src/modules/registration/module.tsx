import Link from 'next/link';
import { RegisterForm } from './flows/register-form';

export const RegistrationModule = () => {
  return (
    <div className='flex flex-col justify-center items-center max-w-[386px] w-full max-h-[450px] h-full min-w-[200px]'>
      <h1 className='text-white font-rubik text-[20px] z-10'>создайте аккаунт</h1>
      <p className='w-full h-[76px] text-[#686868] font-rubik z-10 mt-[42px] text-[16px] text-left leading-5'>
        Аккаунт Arima позволяет сохранять данные в локальном хранилище. Вам не нужно создавать аккаунт для скачивания И используйте приложение.
      </p>
      <div className='w-1 h-1 animate-grow bg-[#F861FA]/85 absolute blur-2xl' />
      <RegisterForm />
      <p className='mt-[25px] text-sm text-white font-rubik flex gap-2'>
        Уже есть аккаунт ?
        <Link href='/authorization' className='text-[#AE0389] cursor-pointer'>
          авторизуйтесь.
        </Link>
      </p>
    </div>
  );
};
