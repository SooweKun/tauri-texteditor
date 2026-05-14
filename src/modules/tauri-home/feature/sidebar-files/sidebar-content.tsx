import { addCurrentVault } from '@/src/components/hooks/system-hooks';
import { systemData } from '@/src/components/hooks/system-save';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { OpenChest } from '../../flows/chest';
import { contentId } from '../../store/sidebar-content';
import { SideBarFiles } from '../sidebar-files';
import { SideBarSearch } from '../sidebar-search';

type Props = {
  data: systemData[] | undefined;
  open: boolean;
};

const Content = [
  {
    content: <SideBarFiles />,
    id: 'files',
  },
  {
    content: <SideBarSearch />,
    id: 'search',
  },
];

export const SidebarContent: FC<Props> = ({ data, open }) => {
  const [currentContentId, _] = useAtom(contentId);
  const { mutate } = addCurrentVault();

  return (
    // нувно добавлять функцию поиска и заменять массив который мы видим чичас похожая функция есть в cloud-store
    <div className='w-full bg-[#262626] rounded-sm flex-1 p-5 flex flex-col gap-4 relative'>
      {Content.map(({ content, id }) => {
        if (id === currentContentId) return <div key={id}>{content}</div>;
      })}
      {open && (
        <div className='w-[260px] h-max rounded-[5px] border-2 border-[FFFFFF]/30 absolute bottom-[10px] right-[10px] flex flex-col gap-1 p-2'>
          {data &&
            data.map(({ name, path }) => (
              <div
                onClick={() => mutate(path)}
                className='cursor-pointer w-full h-[25px] hover:bg-[#a8a4a4] rounded-[3px] pl-2 pb-1 border-b-2 border-[FFFFFF]/30'
                key={name}>
                <p>{name}</p>
              </div>
            ))}
          <OpenChest />
        </div>
      )}
    </div>
  );
};
