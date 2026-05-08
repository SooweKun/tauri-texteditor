'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getVaults, setVaults } from './system-save';

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
  });
};
