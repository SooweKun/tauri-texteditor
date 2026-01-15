import folderIco from '@/src/assets/folder-ico.svg';
import markIco from '@/src/assets/mark-ico.svg';
import searchIco from '@/src/assets/search-ico.svg';
import { Button } from '@/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import Image from 'next/image';

const IcoArr = [
  { ico: folderIco, id: 1, desc: 'open folder' },
  { ico: searchIco, id: 2, desc: 'search' },
  { ico: markIco, id: 3, desc: 'mark' },
];

export const HeaderControll = () => {
  return (
    <>
      {IcoArr.map(({ ico, id, desc }) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <Button variant='ghost' className='w-8 h-8 p-0'>
              <Image src={ico} alt='nf' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>{desc}</TooltipContent>
        </Tooltip>
      ))}
    </>
  );
};
