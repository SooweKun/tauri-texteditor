import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export const useCreateFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createFile'],
    mutationFn: async (data: string) => {
      const path = `C:/Users/Sowe/program/tauri-texteditor/tmp/${data}.md`;
      try {
        await invoke('create_file', { path: path });
      } catch (err) {
        console.log('ошибка', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};
