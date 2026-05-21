import { useStarredFiles } from '@/src/components/hooks/system-hooks';
import { Button } from '@/src/components/ui/button';
import { useSetAtom } from 'jotai';
import { ReadFile } from '../hooks/read-file';
import { activeFile } from '../store/active-files';

export const SidebarStarred = () => {
  const { mutate: mutateRead } = ReadFile();
  const { data } = useStarredFiles();
  const setActiveFile = useSetAtom(activeFile);

  console.log(data, 'data starred');

  return (
    <div className='flex flex-col gap-[5px]'>
      {data &&
        data?.map(({ name, path }) => (
          <Button
            key={path}
            className='w-full flex justify-start hover:bg-[#6b6b6b] cursor-pointer bg-transparent text-white text-[16px]'
            onClick={() => {
              mutateRead(path);
              setActiveFile(name);
            }}>
            {name}
          </Button>
        ))}
    </div>
  );
};
