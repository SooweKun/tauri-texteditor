import { Avatar } from './feature/avatar';
import { Banner } from './feature/banner';
import { Chart } from './feature/chart';

export const ProfileModule = () => {
  return (
    <div className='w-[1000px] flex flex-col gap-[80px]'>
      <div className='w-full h-max relative items-end justify-start flex'>
        <Banner />
        <div className='flex gap-[10px] absolute left-[75px] bottom-[-50px] items-end'>
          <Avatar />
          <div className='flex flex-col'>
            <h1 className='text-[18px]'>Nickname</h1>
            <p className='text-[14px] text-[#AE0389]'>test@mail.ru</p>
          </div>
        </div>
      </div>
      <div className='w-full h-max flex gap-[20px] justify-center'>
        <div className='w-[700px] h-[280px] rounded-[10px] bg-a' />
        <Chart />
      </div>
    </div>
  );
};
