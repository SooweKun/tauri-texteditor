import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

type Props = {
  path: string | undefined;
  content: string;
};

export const useSaveFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['savefile'],
    mutationFn: async ({ path, content }: Props) => {
      try {
        await invoke('save_file', { path: path, content: content });
      } catch (err) {
        console.log(err, 'err of save file');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};
