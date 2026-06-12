/* eslint-disable react-hooks/set-state-in-effect */
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const CONFIG = {
  bgOpacityNormal: 0.04,
  bgOpacityText: 0.01,
  blurNormal: '2px',
  blurText: '1px',
  borderOpacityNormal: 0.15,
  borderOpacityText: 0.25,
  sizeNormal: 45,
  sizeText: 130,
};

interface CustomCursorProps {
  isInsideAnimate: boolean;
  isOverText: boolean;
}

function CustomCursor({ isInsideAnimate, isOverText }: CustomCursorProps) {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  const getAnimationState = () => {
    if (!isInsideAnimate) {
      return {
        scale: 0,
        opacity: 0,
        width: 10,
        height: 10,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        backdropFilter: 'blur(0px)',
        borderColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 0,
      };
    }

    if (isOverText) {
      return {
        scale: 1,
        opacity: 1,
        width: CONFIG.sizeText,
        height: CONFIG.sizeText,
        backgroundColor: `rgba(255, 255, 255, ${CONFIG.bgOpacityText})`,
        backdropFilter: `blur(${CONFIG.blurText})`,
        borderColor: `rgba(255, 255, 255, ${CONFIG.borderOpacityText})`,
        borderWidth: 1,
      };
    }

    return {
      scale: 1,
      opacity: 1,
      width: CONFIG.sizeNormal,
      height: CONFIG.sizeNormal,
      backgroundColor: `rgba(255, 255, 255, ${CONFIG.bgOpacityNormal})`,
      backdropFilter: `blur(${CONFIG.blurNormal})`,
      borderColor: `rgba(255, 255, 255, ${CONFIG.borderOpacityNormal})`,
      borderWidth: 1,
    };
  };

  return createPortal(
    <motion.div
      className='fixed top-0 left-0 pointer-events-none z-50 rounded-full'
      animate={getAnimationState()}
      transition={{
        width: { type: 'spring', stiffness: 220, damping: 25 },
        height: { type: 'spring', stiffness: 220, damping: 25 },
        scale: { duration: 0.2 },
        opacity: { duration: 0.15 },
        backgroundColor: { duration: 0.25 },
        backdropFilter: { duration: 0.25 },
        borderColor: { duration: 0.25 },
      }}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />,
    document.body,
  );
}

export default CustomCursor;
