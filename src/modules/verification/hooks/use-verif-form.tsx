import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type VerificationFormType = {
  flow_id: string;
  code: string;
};

type BackResultType = {
  errors?: {
    key: string;
  };
  status: string;
};

export const useVerificationForm = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['verification'],
    mutationFn: async (data: VerificationFormType) => {
      const { data: back } = await axios.post<BackResultType>('http://89.108.76.172/api/v1/auth/verification', data);
      console.log(back, 'verification back resault');
      return back;
    },
    onSuccess: (back: BackResultType) => {
      if (back.status === '200 OK') {
        Cookies.set('reg_complete', 'true', { expires: 7, path: '/' }); // кука на 7 дней
      }

      router.push('/');
      router.refresh(); // шоб вара проверила куки снова
    },
  });
};
