import React from 'react';

interface ColumnConfig {
  height: string;
  color: string;
}

export const PurpleColumnsHero: React.FC = () => {
  const columns: ColumnConfig[] = [
    { height: 'h-[82%]', color: 'from-[#A855F7]/80 via-[#7C3AED]/30 to-transparent' },
    { height: 'h-[66%]', color: 'from-[#A855F7]/80 via-[#7C3AED]/30 to-transparent' },
    { height: 'h-[50%]', color: 'from-[#C084FC]/75 via-[#7C3AED]/30 to-transparent' },
    { height: 'h-[34%]', color: 'from-[#C084FC]/75 via-[#7C3AED]/30 to-transparent' },
    { height: 'h-[20%]', color: 'from-[#7C3AED]/55 via-[#4C1D95]/15 to-transparent' },
    { height: 'h-[34%]', color: 'from-[#C084FC]/75 via-[#7C3AED]/30 to-transparent' },
    { height: 'h-[50%]', color: 'from-[#C084FC]/75 via-[#7C3AED]/30 to-transparent' },
    { height: 'h-[66%]', color: 'from-[#A855F7]/80 via-[#7C3AED]/30 to-transparent' },
    { height: 'h-[82%]', color: 'from-[#A855F7]/80 via-[#7C3AED]/30 to-transparent' },
  ];

  return (
    <section className='relative w-full min-h-[640px] bg-black overflow-hidden flex flex-col justify-center items-center py-24 px-6'>
      <div
        className='absolute inset-x-0 bottom-0 h-[85%] flex items-end justify-between gap-[3px] px-1 sm:px-2 pointer-events-none select-none z-0'
        aria-hidden='true'>
        {columns.map((col, idx) => (
          <div key={idx} className={`flex-1 ${col.height} bg-gradient-to-t ${col.color} transition-all duration-700`} />
        ))}
      </div>
      <div
        className='absolute bottom-0 inset-x-0 h-[120px] bg-gradient-to-t from-[#A855F7]/25 via-[#7C3AED]/5 to-transparent blur-2xl pointer-events-none z-0'
        aria-hidden='true'
      />
      <div className='relative z-10 flex flex-col items-center text-center max-w-3xl'>
        <span className='px-3.5 py-1.5 text-xs font-semibold tracking-wider text-purple-400 bg-purple-950/30 border border-purple-900/45 rounded-full mb-6 select-none uppercase'>
          Зажигайте искру идей.
        </span>
        <h1 className='text-white font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.12] mb-6 drop-shadow-md select-none'>
          Создавайте будущее <br className='hidden sm:inline' />с вашим цифровым интерфейсом
        </h1>
        <p className='text-zinc-400 text-sm md:text-base max-w-md md:max-w-xl mb-8 leading-relaxed select-none'>
          От личных заметок и ведения дневника до создания баз знаний и управления проектами
        </p>
        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <button className='h-11 px-6 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-100 active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg cursor-pointer'>
            Скачать
          </button>
        </div>
      </div>
    </section>
  );
};
