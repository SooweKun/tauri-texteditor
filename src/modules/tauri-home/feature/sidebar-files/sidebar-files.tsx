import Close from '@/src/assets/close.svg';
import { Button } from '@/src/components/ui/button';
import { GetFiles, type BackendReault } from '@/src/modules/tauri-home/hooks/getfiles';
import Image from 'next/image';
import { useState } from 'react';
import { DeleteFile } from '../../hooks/delete-file';

export const SidebarFiles = () => {
  const { data } = GetFiles();
  const { mutate } = DeleteFile();
  console.log(data, 'active file');
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className='w-full bg-[#262626] rounded-sm flex-1 p-5 flex flex-col gap-1'>
      {data &&
        data.map(({ name, path }: BackendReault) => (
          <Button
            className={`
            w-full justify-between transition-colors bg-transparent text-white h-[30px] text-[16px]
            hover:bg-[#D9D9D9]/30 
            focus:bg-[#D9D9D9]/30
            ${active === name ? 'bg-[#D9D9D9]/30' : ''}
          `}
            key={name}
            onClick={() => {
              setActive(name);
              console.log(path, 'path file');
            }}>
            {name}
            {active === name && <Image src={Close} alt='nf' className='w-2 h-2' onClick={() => mutate(path)} />}
          </Button>
        ))}
    </div>
  );
};
