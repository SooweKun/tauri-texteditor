import { Avatar } from './avatar';

export const UserInfo = () => {
  return (
    <div className='flex gap-2.5'>
      <Avatar />
      <div className='font-rubik flex flex-col h-full justify-end'>
        <h1 className='text-[16px]'>Nickname</h1>
        <p className='text-[#5D5D5D] text-sm underline-offset-5 underline cursor-pointer'>example@mail.ru</p>
      </div>
    </div>
  );
};
