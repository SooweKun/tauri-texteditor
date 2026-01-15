import NewDateFileIco from '@/src/assets/calendar-ico.svg';
import ChartIco from '@/src/assets/chart-ico.svg';
import DevtoolsIco from '@/src/assets/devtools-ico.svg';
import NewFolderIco from '@/src/assets/new-folder-ico.svg';
import PlaginsIco from '@/src/assets/plagins-ico.svg';
import { Button } from '@/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import Image from 'next/image';

const IcoArr = [
  { ico: NewDateFileIco, id: 1, desc: 'new date file' },
  { ico: DevtoolsIco, id: 2, desc: 'dev tools' },
  { ico: ChartIco, id: 3, desc: 'chart' },
  { ico: NewFolderIco, id: 4, desc: 'new folder' },
  { ico: PlaginsIco, id: 5, desc: 'plagins' },
];

export const SidebarControl = () => {
  return (
    <>
      {IcoArr.map(({ ico, id, desc }) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <Button className='w-8 h-8 p-0 bg-transparent hover:bg-[#D9D9D9]/30'>
              <Image src={ico} alt='nf' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='right'>{desc}</TooltipContent>
        </Tooltip>
      ))}
    </>
  );
};
