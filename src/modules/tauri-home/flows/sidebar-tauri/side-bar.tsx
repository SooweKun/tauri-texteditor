import { useVaults } from '@/src/components/hooks/system-hooks';
import { vaultStore } from '@/src/components/store/vaults';
import { useAtomValue } from 'jotai';
import { FC, useState } from 'react';
import { ProfileBtn } from '../../feature/profile-btn/profile-btn';
import { SidebarControl } from '../../feature/sidebar-control';
import { SidebarContent } from '../../feature/sidebar-files/sidebar-content';
import { ValueBtn } from '../../feature/value-btn/value-btn';

type Props = {
  size: boolean;
};

export const SideBar: FC<Props> = ({ size }) => {
  const { data } = useVaults();
  const [open, setOpen] = useState(false);
  const path = useAtomValue(vaultStore);

  console.log(path, 'актуальное хранилище');

  const changeSet = () => {
    setOpen((prev) => !prev);
  }; // потом убрать это и придумать как без этого отображение делать

  return (
    <div className='flex gap-1.5 h-full'>
      <div className='w-[45px] bg-[#262626] rounded-tr-sm rounded-br-sm flex flex-col gap-[10px] items-center py-[10px]'>
        <SidebarControl />
      </div>
      {size && (
        <div className='flex flex-col gap-1 pb-1 relative w-[320px]'>
          <SidebarContent data={data} open={open} />
          <ValueBtn changeSet={changeSet} />
          <ProfileBtn />
        </div>
      )}
    </div>
  );
};
