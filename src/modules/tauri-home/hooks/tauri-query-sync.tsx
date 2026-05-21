import { useQueryClient } from '@tanstack/react-query';
import { listen } from '@tauri-apps/api/event';
import { useEffect } from 'react';

export const useTauriQuerySync = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Создаем подписку
    const unlisten = listen('refresh-vaults', () => {
      console.log('Событие получено: обновляю vaults в главном окне');
      queryClient.invalidateQueries({ queryKey: ['vaults'] });
    });

    // Обязательно отписываемся при размонтировании
    return () => {
      unlisten.then((f) => f());
    };
  }, [queryClient]);
};
