export const ProfileBtn = () => {
  const handleOpenInWeb = async () => {
    const { openUrl } = await import('@tauri-apps/plugin-opener');
    await openUrl('http://localhost:3000/registration');
  };

  return (
    <div
      className='w-full h-[45px] shrink-0 bg-[#262626] rounded-sm flex justify-between items-center border-[#1a1a1a] hover:border-4 cursor-pointer px-[15px]'
      onClick={handleOpenInWeb}>
      {/* <div className='flex gap-[10px] items-center'>
          <div className='w-[30px] h-[30px] bg-[#D9D9D9] rounded-full' />
          <h1 className='text-[12px]'>test@mail.com</h1>
        </div>
        <p>N</p> */}
      <p className='text-[12px]'>Войти</p>
    </div>
  );
};
