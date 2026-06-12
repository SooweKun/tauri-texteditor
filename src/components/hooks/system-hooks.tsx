'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getCurrentVault, getStarredFiles, getVaults, setCurrentVault, setStarredFiles, setVaults } from './system-save';

export const useVaults = () => {
  return useQuery({
    queryKey: ['vaults'],
    queryFn: getVaults,
  });
};

export const addVaults = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addVaults'],
    mutationFn: setVaults,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vaults'] });
    },
    onError: (err) => {
      toast.error('ошибка добавления хранилища', {
        description: err.message,
      });
    },
  });
};

export const useCurrentVault = () => {
  return useQuery({
    queryKey: ['currentVault'],
    queryFn: getCurrentVault,
  });
};

export const addCurrentVault = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['setCurrentVault'],
    mutationFn: setCurrentVault,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentVault'] });
    },
    onError: (err) => {
      toast.error('ошибка добавления нынешнего хранилища', {
        description: err.message,
      });
    },
  });
};

export const useStarredFiles = () => {
  return useQuery({
    queryKey: ['StarredFiles'],
    queryFn: getStarredFiles,
  });
};

export const addStarredFiles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['StarredFiles'],
    mutationFn: setStarredFiles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['StarredFiles'] });
      console.log('log in starred hook');
    },
    onError: (err) => {
      toast.error('ошибка добавления заметок', {
        description: err.message,
      });
    },
  });
};
