import { vaultStore } from '@/src/components/store/vaults';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { useAtomValue } from 'jotai';

export const useCreateFile = () => {
  const queryClient = useQueryClient();
  const pathtostore = useAtomValue(vaultStore);

  return useMutation({
    mutationKey: ['createFile'],
    mutationFn: async (data: string) => {
      const path = `${pathtostore}/${data}.md`;
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
