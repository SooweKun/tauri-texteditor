import { useAtom } from 'jotai';
import { contentId } from '../../store/sidebar-content';
import { SideBarFiles } from '../sidebar-files';
import { SideBarSearch } from '../sidebar-search';

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

export const SidebarContent = () => {
  const [currentContentId, _] = useAtom(contentId);

  return (
    // нувно добавлять функцию поиска и заменять массив который мы видим чичас похожая функция есть в cloud-store
    <div className='w-full bg-[#262626] rounded-sm flex-1 p-5 flex flex-col gap-4'>
      {Content.map(({ content, id }) => {
        if (id === currentContentId) return <div key={id}>{content}</div>;
      })}
    </div>
  );
};
