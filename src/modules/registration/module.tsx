import { RegisterForm } from './flows/register-form';

export const RegistrationModule = () => {
  return (
    <div className='flex flex-col justify-center items-center max-w-[386px] w-full max-h-[450px] h-full min-w-[200px]'>
      <h1 className='text-white font-rubik text-[20px] z-10'>create an account</h1>
      <p className='w-full h-[76px] text-[#686868] font-rubik z-10 mt-[42px] text-[16px] text-left leading-5'>
        The Obsidian account allows you to save data to cloud storage for access on the website. You do not need to create an account to download
        and use the app.
      </p>
      <div className='w-1 h-1 animate-grow bg-[#F861FA]/85 absolute blur-2xl' />
      <RegisterForm />
    </div>
  );
};
