import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type RegFlowResponse = {
  flow_id: string;
};

export const useRegFlowId = () => {
  return useQuery({
    queryKey: ['reg-flow-id'],
    queryFn: async () => {
      const { data } = await axios.get<RegFlowResponse>('http://89.108.76.172/api/v1/auth/registration/flow');
      console.log(data, 'register-flow-id');

      return data;
    },
  });
};
