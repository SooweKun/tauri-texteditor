import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

// 1. Переиспользуемый компонент GlowingCard
interface GlowingCardProps {
  ico: StaticImageData;
  title: string;
  description: string;
  gradientFrom: string;
  gradientVia?: string;
  gradientTo: string;
}

export const Tile: FC<GlowingCardProps> = ({ ico, title, description, gradientFrom, gradientVia, gradientTo }) => {
  const gradientClasses = `${gradientFrom} ${gradientVia || ''} ${gradientTo}`;

  return (
    <div className='relative group w-full max-w-sm rounded-[24px]'>
      <div
        className={`absolute -inset-1.5 rounded-[24px] bg-gradient-to-tr ${gradientClasses} opacity-30 blur-2xl transition-all duration-500 group-hover:opacity-70 group-hover:blur-3xl`}
        aria-hidden='true'
      />
      <div className={`relative h-full w-full rounded-[24px] p-[1.5px] bg-gradient-to-tr ${gradientClasses} transition-all duration-300`}>
        <div className='h-[250px] w-full rounded-[22.5px] bg-[#121212] p-8 flex flex-col justify-between items-start transition-colors duration-300 group-hover:bg-[#151516] cursor-pointer'>
          <div className='flex items-center justify-center text-zinc-400 font-mono text-sm h-10 select-none'>
            <Image src={ico} alt='nf' className='size-[25px]' />
          </div>
          <div className='space-y-2.5'>
            <h3 className='text-white font-bold text-lg tracking-tight select-none'>{title}</h3>
            <p className='text-zinc-400 text-sm leading-relaxed font-normal select-none line-clamp-2'>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
