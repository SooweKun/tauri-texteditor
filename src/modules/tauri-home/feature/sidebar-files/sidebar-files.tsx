import ChartIco from '@/src/assets/chart-ico.svg';
import Close from '@/src/assets/close.svg';
import DevtoolsIco from '@/src/assets/devtools-ico.svg';
import NewFolderIco from '@/src/assets/new-folder-ico.svg';
import { Button } from '@/src/components/ui/button';
import { GetFiles, type BackendReault } from '@/src/modules/tauri-home/hooks/getfiles';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { DeleteFile } from '../../hooks/delete-file';
import { ReadFile } from '../../hooks/read-file';
import { activeFile } from '../../store/active-files';

const IcoArr = [
  { ico: ChartIco, id: 1 },
  { ico: NewFolderIco, id: 2 },
  { ico: DevtoolsIco, id: 3 },
];

export const SidebarFiles = () => {
  const { data } = GetFiles();
  const { mutate } = DeleteFile();
  const { mutate: mutateRead } = ReadFile();
  console.log(data, 'active file');
  const [file, setFile] = useAtom(activeFile);

  return (
    // нувно добавлять функцию поиска и заменять массив который мы видим чичас похожая функция есть в cloud-store
    <div className='w-full bg-[#262626] rounded-sm flex-1 p-5 flex flex-col gap-4'>
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
    </div>
  );
};
