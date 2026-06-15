'use client';
import { userAtom } from '@/src/store/user';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { RegisterFormType } from '../flows/register-form';

export const useRegister = () => {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: RegisterFormType) => {
      const { data: back } = await axios.post('http://89.108.76.172/api/v1/auth/registration', data);
      return back;
    },

    onSuccess: (back) => {
      console.log(back, 'register back resault');

      setUser((prev) => ({
        ...prev,
        email: back.user.email,
        id: back.user.id,
        username: back.user.username,
      }));

      const flowId = back.verification_flow_id;
      router.push(`/verification?flow_id=${flowId}`);
    },
    onError: (error) => {
      console.error('Registration error:', error);
    },
  });
};
