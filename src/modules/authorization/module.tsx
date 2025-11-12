import Link from 'next/link';
import { AuthForm } from './flows/authorization-form';

export const AuthorizationModule = () => {
  return (
    <div className='flex flex-col justify-center items-center max-w-[386px] w-full max-h-[450px] h-full min-w-[200px]'>
      <h1 className='text-white font-rubik  text-[20px] z-10'>sing in to your app</h1>
      <div className='w-1 h-1 animate-grow bg-[#F861FA]/85 absolute blur-2xl' />
      <AuthForm />
      <p className='mt-[25px] text-sm text-white font-rubik flex gap-2'>
        Don`t have an account ?
        <Link href='/authorization' className='text-[#AE0389] cursor-pointer'>
          Create account
        </Link>
      </p>
    </div>
  );
};
