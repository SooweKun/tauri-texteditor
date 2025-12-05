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
      const path = `C:/Users/apext/program/tauri-texteditor/tmp/`;
      const data = await invoke<BackendReault[]>('get_files', { path: path });

      return data;
    },
  });
};
