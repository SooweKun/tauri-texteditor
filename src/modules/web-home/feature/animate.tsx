export const Animate = () => {
  return (
    <div
      className='relative size-[600px] rounded-full bg-black flex justify-center items-center
                      shadow-[inset_0_-60px_100px_-30px_rgba(124,58,237,0.7),inset_0_-10px_30px_-5px_rgba(167,139,250,0.9)] 
                      overflow-hidden'>
      <p className='absolute text-[20px] text-shadow-sidebar-accent-foreground'>Tauri</p>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(88,28,135,0.4)_0%,transparent_70%)]' />
    </div>
  );
};
