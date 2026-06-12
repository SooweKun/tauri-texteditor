/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Мокаем Tauri invoke
vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn(),
}));

// Мокаем toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Мокаем хук useCurrentVault
vi.mock('@/src/components/hooks/system-hooks', () => ({
  useCurrentVault: vi.fn(),
}));

// Импортируем всё после моков
import { useCurrentVault } from '@/src/components/hooks/system-hooks';
import { useCreateFile } from '@/src/modules/tauri-home/hooks/create-file';
import { invoke } from '@tauri-apps/api/core';

describe('useCreateFile', () => {
  let queryClient: QueryClient;
  let mockPath: string;

  beforeEach(() => {
    vi.clearAllMocks();

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    mockPath = '/test/vault/path';
    (useCurrentVault as any).mockReturnValue({ data: mockPath });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

  it('должен успешно создать файл', async () => {
    (invoke as any).mockResolvedValue(undefined);

    const { result } = renderHook(() => useCreateFile(), { wrapper });
    result.current.mutate();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invoke).toHaveBeenCalledWith('create_file', {
      path: mockPath,
    });
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('должен обрабатывать ошибку при создании файла', async () => {
    const mockError = new Error('Файл уже существует');
    (invoke as any).mockRejectedValue(mockError);

    const { result } = renderHook(() => useCreateFile(), { wrapper });
    result.current.mutate();

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(invoke).toHaveBeenCalledWith('create_file', {
      path: mockPath,
    });
    expect(toast.error).toHaveBeenCalledWith('ошибка создания файла', {
      description: mockError.message,
    });
  });

  it('должен инвалидировать query "files" после успешного создания', async () => {
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    (invoke as any).mockResolvedValue(undefined);

    const { result } = renderHook(() => useCreateFile(), { wrapper });
    result.current.mutate();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['files'] });
  });
});
