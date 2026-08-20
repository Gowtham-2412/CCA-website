import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor — Refined, minimalist editorial cursor.
 * Uses clean monochrome ink contrast and subtle spring physics.
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
      width: 28,
      height: 28,
      backgroundColor: 'transparent',
      border: '1px solid rgba(27, 27, 27, 0.35)',
      scale: 1,
    },
    pointer: {
      width: 44,
      height: 44,
      backgroundColor: 'rgba(27, 27, 27, 0.08)',
      border: '1px solid rgba(27, 27, 27, 0.8)',
      scale: 1.1,
    },
    text: {
      width: 78,
      height: 78,
      backgroundColor: '#1b1b1b',
      border: 'none',
      scale: 1,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
    },
  };

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full"
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
            className="text-[9px] font-bold uppercase tracking-widest text-white select-none text-center px-1 font-mono"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      {cursorVariant === 'default' && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-[#1b1b1b]"
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
