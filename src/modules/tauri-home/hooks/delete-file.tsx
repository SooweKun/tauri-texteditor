import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export const DeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteFile'],
    mutationFn: async (data: string) => {
      console.log(data, 'delete-file');
      // const filePath = `C:/Users/Sowe/program/tauri-texteditor/tmp/${data}.md`;
      try {
        await invoke('delete_file', { path: data });
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};
