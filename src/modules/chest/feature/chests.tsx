import { FC } from 'react';

type SystemData = {
  name: string;
  path: string;
};

type Props = {
  data: SystemData[] | undefined;
};

export const Chests: FC<Props> = ({ data }) => {
  return (
    <div className='w-full h-[375px] flex p-[25px] flex-wrap border border-b-[#4A4A4A]'>
      {data &&
        data.map(({ name, path }) => (
          <div
            className='w-[300px] h-[50px] bg-[#262626] border-2 border-[#4A4A4A] rounded-[10px] cursor-pointer p-[2px] pl-[15px] hover:shadow-grow1'
            key={path}>
            <h1 className='text-[14px]'>{name}</h1>
            <p className='text-[12px]'>{path}</p>
          </div>
        ))}
    </div>
  );
};
