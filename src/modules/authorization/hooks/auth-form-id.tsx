import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type AuthFlowResponse = {
  flow_id: string;
};

export const useAuthFlowId = () => {
  return useQuery({
    queryKey: ['auth-flow-id'],
    queryFn: async () => {
      const { data } = await axios.get<AuthFlowResponse>('http://89.108.76.172/api/v1/auth/login/flow');
      console.log(data, 'auth-flow-id');

      return data;
    },
  });
};
