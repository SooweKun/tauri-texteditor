import { useStarredFiles } from '@/src/components/hooks/system-hooks';
import { FileAvatar } from './file-avatar';

export const SidebarStarred = () => {
  const { data } = useStarredFiles();

  console.log(data, 'data starred');

  return (
    <div className='flex flex-col gap-[5px]'>{data && data?.map(({ name, path }) => <FileAvatar name={name} path={path} key={path} />)}</div>
  );
};
