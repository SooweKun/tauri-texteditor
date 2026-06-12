import { useCurrentVault } from '@/src/components/hooks/system-hooks';
import { useMutation } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { BackendReault } from './getfiles';

export const useSearch = () => {
  const { data: path } = useCurrentVault();

  return useMutation({
    mutationKey: ['file_search'],
    mutationFn: (name) => {
      const data = invoke<BackendReault>('search_file', { path: path, name: name });
      console.log(data, 'useSerch data');

      return data;
    },
    // onError: (err) => {
    //   toast.error('ошибка поиска файла', {
    //     description: err.message,
    //   });
    // },
  });
};
