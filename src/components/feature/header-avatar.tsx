'use client';
import { userAtom } from '@/src/store/user';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';

export const HeaderAvatar = () => {
  const [value, _] = useAtom(userAtom);
  console.log(value, 'user data in header');

  return (
    <>
      {value.avatar ? (
        <Link href='/profile'>
          <Image
            src={value.avatar}
            alt='nf'
            width={35}
            height={35}
            className='rounded-full size-[35px] hover:shadow-[#31B07F] shadow-[0_0_15px] hover:border border-[#31B07F] cursor-pointer'
          />
        </Link>
      ) : (
        <div className='rounded-full bg-[#404040] size-[35px] hover:shadow-[#f861fa] hover:shadow-[0_0_15px] hover:border border-[#f861fa] cursor-pointer' />
      )}
      <Link href='profile' className='h-[35px] flex flex-col justify-between items-start '>
        <h1 className='text-[14px] cursor-pointer'>{value.username}</h1>
        <p className='text-[12px] text-[#f861fa] hover:underline underline-offset-4 cursor-pointer'>{value.email}</p>
      </Link>
    </>
  );
};
