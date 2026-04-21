import Link from 'next/link';

export const WebHeader = () => {
  const isRegistered = false;

  return (
    <div className='w-full h-[65px] px-[85px] flex items-center justify-between'>
      <div className='w-max px-2 flex gap-0 items-end'>
        <p className='text-[16px] text-white'>Tauri-texteditor</p>
      </div>
      <div className='w-max p-2 flex gap-5'>
        <Link href=''>profile</Link>
        <Link href=''>cloud st</Link>
        <Link href=''>settings</Link>
        <Link href=''>dock</Link>
      </div>
      <div className='flex gap-[8px] text-white items-center'>
        {isRegistered ? (
          // <HeaderAvatar />
          <div />
        ) : (
          <>
            <Link href='/authorization'>sing in</Link>
            <span className='w-[0.5px] h-[31px] bg-white rounded-2xl' />
            <Link href='/registration'>sing up</Link>
          </>
        )}
      </div>
    </div>
  );
};
