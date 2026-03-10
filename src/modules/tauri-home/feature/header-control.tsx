import folderIco from '@/src/assets/folder-ico.svg';
import markIco from '@/src/assets/mark-ico.svg';
import searchIco from '@/src/assets/search-ico.svg';
import { Button } from '@/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { contentId } from '../store/sidebar-content';

const IcoArr = [
  { ico: folderIco, id: 1, desc: 'files' },
  { ico: searchIco, id: 2, desc: 'search' },
  { ico: markIco, id: 3, desc: 'mark' },
];

export const HeaderControll = () => {
  const [_, setContent] = useAtom(contentId);
  return (
    <>
      {IcoArr.map(({ ico, id, desc }) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <Button variant='ghost' className='w-8 h-8 p-0' onClick={() => setContent(desc)}>
              <Image src={ico} alt='nf' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>{desc}</TooltipContent>
        </Tooltip>
      ))}
    </>
  );
};
