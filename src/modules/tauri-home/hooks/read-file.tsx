import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export type BackendReadResault = {
  name: string;
  content: string;
};

export const ReadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['readFile'],
    mutationFn: async (path: string) => {
      try {
        const data = await invoke<BackendReadResault>('read_file', { path: path });
        return data;
      } catch (err) {
        console.log('ошибка', err);
        throw err;
      }
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData<BackendReadResault>(['fileContent'], data);
    },
  });
};
