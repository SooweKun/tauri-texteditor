import Link from 'next/link';

export const WebHeader = () => {
  const isRegistered = false;

  return (
    <div className='w-full h-[65px] px-[85px] flex items-center justify-between'>
      <div className='w-max px-2 flex gap-0 items-end'>
        <p className='text-[16px] text-white/80 tracking-[0.3em] font-light uppercase'>Tauri</p>
      </div>
      <div className='w-[600px] p-2 flex gap-6 text-white/80 tracking-[0.3em] font-light uppercase justify-center ml-[80px]'>
        <Link href='' className='hover:text-white'>
          profile
        </Link>
        <Link href='' className='hover:text-white'>
          cloud st
        </Link>
        <Link href='' className='hover:text-white'>
          settings
        </Link>
        <Link href='' className='hover:text-white'>
          dock
        </Link>
      </div>
      <div className='flex gap-[8px] text-white items-center'>
        {isRegistered ? (
          // <HeaderAvatar />
          <div />
        ) : (
          <>
            <Link href='/authorization' className='text-white/80 tracking-[0.3em] font-light uppercase'>
              sing in
            </Link>
            <span className='w-[0.5px] h-[31px] bg-white/80 rounded-2xl' />
            <Link href='/registration' className='text-white/80 tracking-[0.3em] font-light uppercase'>
              sing up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
