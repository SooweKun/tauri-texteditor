import { useMutation } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { BackendReault } from './getfiles';

export const useSearch = () => {
  return useMutation({
    mutationKey: ['file_search'],
    mutationFn: (name, path) => {
      const data = invoke<BackendReault[]>('search_file', { path: path, name: name });
      return data;
    },
  });
};
