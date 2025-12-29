import { useMutation } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export const ReadFile = () => {
  return useMutation({
    mutationKey: ['readFile'],
    mutationFn: async (path: string) => {
      try {
        const data = await invoke('read_file', { path: path });
        return data;
      } catch (err) {
        console.log('ошибка', err);
        throw err;
      }
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
