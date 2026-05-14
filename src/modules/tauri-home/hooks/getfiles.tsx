import { useCurrentVault } from '@/src/components/hooks/system-hooks';
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export type BackendReault = {
  path: string;
  name: string;
};

export const GetFiles = () => {
  const { data: path } = useCurrentVault();
  return useQuery({
    queryKey: ['files', path],
    queryFn: async () => {
      const data = await invoke<BackendReault[]>('get_files', { path: path });
      console.log(data, 'data in hook');

      return data;
    },
    enabled: !!path,
  });
};
