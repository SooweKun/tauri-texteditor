import { useCurrentVault } from '@/src/components/hooks/system-hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';

export const useCreateFile = () => {
  const queryClient = useQueryClient();
  const { data: path } = useCurrentVault();

  return useMutation({
    mutationKey: ['createFile'],
    mutationFn: async () => {
      const pathtostore = `${path}`;
      try {
        console.log('ПЫТАЮСЬ СОЗДАТЬ ФАЙЛ ПО ПУТИ:', path);
        await invoke('create_file', { path: pathtostore });
      } catch (err) {
        console.log('ошибка', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
    onError: (err) => {
      toast.error('ошибка создания файла', {
        description: err.message,
      });
    },
  });
};
