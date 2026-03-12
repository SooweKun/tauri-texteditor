import { useMutation } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { BackendReault } from './getfiles';

export const useSearch = () => {
  return useMutation({
    mutationKey: ['file_search'],
    mutationFn: (name) => {
      const path = `C:/Users/Sowe/program/tauri-texteditor/tmp`;
      const data = invoke<BackendReault[]>('search_file', { path: path, name: name });
      console.log(data, 'useSerch data');

      return data;
    },
  });
};
