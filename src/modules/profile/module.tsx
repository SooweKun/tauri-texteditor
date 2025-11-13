import { Chart } from './feature/chart';
import { UserInfo } from './feature/user-info';

export const ProfileModule = () => {
  return (
    <div className='w-full max-w-3xl'>
      <div className='w-full flex justify-between pt-10'>
        <div className='flex flex-col gap-2.5'>
          <UserInfo />
          <div className='pl-2.5'>
            <p className='text-[#5D5D5D] text-sm cursor-pointer'>изменить ник</p>
            <p className='text-[#AE0389] text-sm underline underline-offset-4 cursor-pointer'>изменить адрес электронной почты</p>
          </div>
        </div>
        <Chart />
      </div>
    </div>
  );
};
