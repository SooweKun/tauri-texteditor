import ChartIco from '@/src/assets/chart-ico.svg';
import Close from '@/src/assets/close.svg';
import DevtoolsIco from '@/src/assets/devtools-ico.svg';
import NewFolderIco from '@/src/assets/new-folder-ico.svg';
import { Button } from '@/src/components/ui/button';
import { activeFile } from '@/src/modules/tauri-home/store/active-files';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { BackendReault, GetFiles } from '../hooks/getfiles';
import { ReadFile } from '../hooks/read-file';

const IcoArr = [
  { ico: ChartIco, id: 1 },
  { ico: NewFolderIco, id: 2 },
  { ico: DevtoolsIco, id: 3 },
];

export const SideBarFiles = () => {
  const { mutate: mutateRead } = ReadFile();
  const [file, setFile] = useAtom(activeFile);
  const { data } = GetFiles();
  console.log(data, 'active file');

  return (
    <>
      <div className='w-full flex items-center gap-2'>
        {IcoArr.map(({ ico, id }) => (
          <Button className='p-2 h-max bg-transparent hover:bg-[#D9D9D9]/30' key={id}>
            <Image src={ico} alt='nf' />
          </Button>
        ))}
      </div>
      <div className='flex-1 flex flex-col gap-1 w-full'>
        {data &&
          data.map(({ name, path }: BackendReault) => (
            <Button
              className={`
            w-full justify-between transition-colors bg-transparent text-white h-[30px] text-[16px]
            hover:bg-[#D9D9D9]/30 
            focus:bg-[#D9D9D9]/30
            ${file === name ? 'bg-[#D9D9D9]/30' : ''}
          `}
              key={name}
              onClick={() => {
                setFile(name);
                mutateRead(path);
                console.log(path, 'path file');
              }}>
              {name}
              {file === name && (
                <Image
                  src={Close}
                  alt='nf'
                  className='w-2 h-2'
                  onClick={(e) => {
                    setFile(null);
                    e.stopPropagation();
                  }}
                />
              )}
            </Button>
          ))}
      </div>
    </>
  );
};
