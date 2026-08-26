import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor — Inverting contrast cursor with mix-blend-mode difference.
 * Automatically adapts and inverts on dark and light backgrounds seamlessly.
 */
export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { damping: 40, stiffness: 1000, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target.closest('[data-cursor-text], a, button, input, [role="button"]');
      if (target) {
        const text = target.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
          setCursorVariant('text');
        } else {
          setCursorText('');
          setCursorVariant('pointer');
        }
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'transparent',
      border: '1.5px solid #ffffff',
      scale: 1,
    },
    pointer: {
      width: 52,
      height: 52,
      backgroundColor: '#ffffff',
      border: 'none',
      scale: 1.12,
    },
    text: {
      width: 80,
      height: 80,
      backgroundColor: '#ffffff',
      border: 'none',
      scale: 1,
    },
  };

  return (
    <>
      {/* Outer Follower Ring / Interactive Lens */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999] flex items-center justify-center rounded-full mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[10px] font-bold uppercase tracking-widest text-black select-none text-center px-1 font-mono leading-tight"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      {cursorVariant === 'default' && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[99999] w-2 h-2 rounded-full bg-white mix-blend-difference"
          style={{
            x: dotX,
            y: dotY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </>
  );
}
