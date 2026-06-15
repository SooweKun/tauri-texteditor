import { AnimatePresence, motion } from 'motion/react';

interface AnimateProps {
  isInsideAnimate: boolean;
  setIsInsideAnimate: (inside: boolean) => void;
  isOverText: boolean;
  setIsOverText: (over: boolean) => void;
}

export const Animate = ({ setIsInsideAnimate, isOverText, setIsOverText }: AnimateProps) => {
  return (
    <div
      onMouseEnter={() => setIsInsideAnimate(true)}
      onMouseLeave={() => {
        setIsInsideAnimate(false);
        setIsOverText(false);
      }}
      className='relative size-[600px] rounded-full bg-black flex justify-center items-center
                 animate-moon-glow overflow-hidden cursor-none'>
      <div
        onMouseEnter={() => setIsOverText(true)}
        onMouseLeave={() => setIsOverText(false)}
        className='relative z-10 select-none px-12 py-8 cursor-none'>
        <AnimatePresence mode='wait'>
          {isOverText ? (
            <motion.p
              key='arima'
              initial={{ opacity: 0, y: 12, scale: 0.9, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1.4, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, scale: 0.9, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className='will-change-transform transform-gpu text-[20px] text-white tracking-[0.3em] font-light uppercase pointer-events-none origin-center'>
              Arima
            </motion.p>
          ) : (
            <motion.p
              key='tauri'
              initial={{ opacity: 0, y: 12, scale: 0.9, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, scale: 0.9, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className='will-change-transform transform-gpu text-[20px] text-white/80 tracking-[0.3em] font-light uppercase pointer-events-none origin-center'>
              Tauri
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_125%,rgba(88,28,135,0.5)_0%,transparent_70%)] pointer-events-none' />
      <div className='absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none' />
    </div>
  );
};
