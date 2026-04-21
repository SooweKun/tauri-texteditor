import { FC } from 'react';
import { WebHeader } from './web-header';

type Children = {
  children: React.ReactNode;
};

export const WebHeaderLayout: FC<Children> = ({ children }) => {
  return (
    <div className='flex flex-col w-full h-full'>
      <WebHeader />
      {children}
    </div>
  );
};
