export const Animate = () => {
  return (
    <div
      className='relative size-[600px] rounded-full bg-black flex justify-center items-center
                   animate-moon-glow overflow-hidden'>
      <p className='relative text-[20px] text-white/80 tracking-[0.3em] font-light uppercase'>Tauri</p>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_125%,rgba(88,28,135,0.5)_0%,transparent_70%)]' />
      <div className='absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none' />
    </div>
  );
};
