'use client';
import { userAtom } from '@/src/store/user';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { AuthFormType } from '../flows/authorization-form';

export const useAuth = () => {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  return useMutation({
    mutationKey: ['auth'],
    mutationFn: async (data: AuthFormType) => {
      const { data: back } = await axios.post('http://89.108.76.172/api/v1/auth/login', data);
      return back;
    },

    onSuccess: (back) => {
      console.log(back, 'auth back resault');

      setUser((prev) => ({
        ...prev,
        email: back.user.email,
        id: back.user.id,
        username: back.user.username,
      }));
      router.push('/');
    },
    onError: (error) => {
      console.error('Authorization error:', error);
    },
  });
};
