/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HeaderAvatar } from '../feature/header-avatar';

export const WebHeader = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const regComplete = Cookies.get('reg_complete');
    if (regComplete === 'true') {
      setIsRegistered(true);
    }
  }, []);

  return (
    <div className='w-full h-[65px] py-[10px] px-[85px] flex items-center justify-between'>
      <div className='w-max px-2 flex gap-0 items-end'>
        <Link href='/' className='text-[16px] text-white/80 tracking-[0.3em] font-light uppercase'>
          Tauri
        </Link>
      </div>
      <div className='flex gap-[8px] text-white items-center'>
        {!isMounted ? (
          <div className='w-[120px] h-[31px]' />
        ) : isRegistered ? (
          <HeaderAvatar />
        ) : (
          <>
            <Link href='/authorization' className='text-white/80 tracking-[0.3em] font-light uppercase'>
              sign in
            </Link>
            <span className='w-[0.5px] h-[31px] bg-white/80 rounded-2xl' />
            <Link href='/registration' className='text-white/80 tracking-[0.3em] font-light uppercase'>
              sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
