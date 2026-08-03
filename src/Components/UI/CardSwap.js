import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CardSwap({
  images = [],
  autoSwap = true,
  swapInterval = 3500
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoSwap || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, swapInterval);
    return () => clearInterval(timer);
  }, [autoSwap, images.length, swapInterval]);

  const handleCardClick = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full max-w-[650px] h-[400px] mx-auto flex items-center justify-center py-6 cursor-pointer select-none" onClick={handleCardClick}>
      {images.map((imgSrc, i) => {
        // Calculate relative position from current index
        const position = (i - index + images.length) % images.length;
        
        // Show top 3 cards in the stack
        if (position > 2) return null;

        const zIndex = images.length - position;
        const scale = 1 - position * 0.06;
        const yOffset = position * 22;
        const xOffset = position * 14;
        const opacity = 1 - position * 0.2;
        const rotate = position === 0 ? 0 : position % 2 === 1 ? 3 : -3;

        return (
          <motion.div
            key={i}
            className="absolute w-[88%] sm:w-[500px] h-[340px] bg-white p-3 rounded-2xl shadow-xl border border-black/10 overflow-hidden"
            initial={false}
            animate={{
              scale,
              y: yOffset,
              x: xOffset,
              rotate,
              opacity,
              zIndex
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 24
            }}
          >
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src={imgSrc}
                alt={`Aarohan Highlight ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#b8d474]">
                  Aarohan Photo Showcase • {i + 1} of {images.length}
                </span>
                <p className="text-sm font-medium opacity-90 mt-0.5">
                  Click to swap photo
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
