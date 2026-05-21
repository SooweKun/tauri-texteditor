import ChartIco from '@/src/assets/chart-ico.svg';
import DevtoolsIco from '@/src/assets/devtools-ico.svg';
import NewFolderIco from '@/src/assets/new-folder-ico.svg';
import { Button } from '@/src/components/ui/button';
import Image from 'next/image';
import { BackendReault, GetFiles } from '../hooks/getfiles';
import { FileAvatar } from './file-avatar';

const IcoArr = [
  { ico: ChartIco, id: 1 },
  { ico: NewFolderIco, id: 2 },
  { ico: DevtoolsIco, id: 3 },
];

export const SideBarFiles = () => {
  const { data } = GetFiles();
  console.log(data, 'active file');

  return (
    <div className='flex flex-col gap-2'>
      <div className='w-full flex items-center gap-2'>
        {IcoArr.map(({ ico, id }) => (
          <Button className='p-2 h-max bg-transparent hover:bg-[#D9D9D9]/30' key={id}>
            <Image src={ico} alt='nf' />
          </Button>
        ))}
      </div>
      <div className='flex-1 flex flex-col gap-1 w-full'>
        {data && data.map(({ name, path }: BackendReault) => <FileAvatar key={path} name={name} path={path} />)}
      </div>
    </div>
  );
};
