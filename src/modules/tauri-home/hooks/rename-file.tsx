/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export const useRename = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['rename-file'],
    mutationFn: async ({ oldPath, newName, fileKey }: { oldPath: string; newName: string; fileKey: string | null }) => {
      const newPath = await invoke<string>('rename_file', { oldPath, newName });
      return { newPath, newName, fileKey };
    },
    onSuccess: ({ newPath, newName, fileKey }) => {
      // старый content
      const oldData = queryClient.getQueryData<any>(['fileContent', fileKey]);

      if (oldData) {
        // создаем кэш для нового имени файла
        queryClient.setQueryData(['fileContent', newName], {
          ...oldData,
          name: newName,
          path: newPath,
        });

        // удаляем старый кэш
        queryClient.removeQueries({ queryKey: ['fileContent', fileKey] });
      }

      // инвалидация
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};
