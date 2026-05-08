'use client';
import { useVaults } from '@/src/components/hooks/system-hooks';
import { Chests } from './feature/chests';
import { NewChest } from './feature/new-chest';

export const ChestModule = () => {
  const { data } = useVaults();
  console.log('mount Chest Module');

  console.log(data, 'значение');

  if (data) {
    console.log(data, 'значение');
  }

  return (
    <div className='flex flex-col w-full h-full gap-0'>
      <Chests data={data} />
      <NewChest />
    </div>
  );
};
