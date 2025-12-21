import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export type BackendReault = {
  path: string;
  name: string;
};

export const GetFiles = () => {
  return useQuery({
    queryKey: ['files'],
    queryFn: async () => {
      const path = `C:/Users/Sowe/program/tauri-texteditor/tmp`;
      const data = await invoke<BackendReault[]>('get_files', { path: path });
      console.log(data, 'data in hook');

      return data;
    },
  });
};
