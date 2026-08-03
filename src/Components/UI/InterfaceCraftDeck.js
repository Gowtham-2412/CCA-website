import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function InterfaceCraftDeck({ cells = [] }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Colors matching the exact screenshot style
  const cardStyles = [
    { bg: 'bg-[#ea580c]', text: 'text-white', innerBg: 'bg-black/20' },  // Vibrant Orange
    { bg: 'bg-[#e5e7eb]', text: 'text-[#1f2937]', innerBg: 'bg-black/10' }, // Silver Gray
    { bg: 'bg-[#2563eb]', text: 'text-white', innerBg: 'bg-black/20' },  // Blue
    { bg: 'bg-[#9333ea]', text: 'text-white', innerBg: 'bg-black/20' },  // Purple
    { bg: 'bg-[#18181b]', text: 'text-white', innerBg: 'bg-white/10' }   // Sleek Dark Onyx
  ];

  const rotations = [-12, -6, -1, 5, 10];

  return (
    <div className="w-full max-w-[1250px] mx-auto py-8 sm:py-12 px-4 flex flex-col items-center">
      {/* Desktop/Tablet: Fanned Cards Deck Showcase */}
      <div className="hidden md:flex relative w-full h-[480px] items-center justify-center select-none my-4">
        <div className="flex items-center justify-center -space-x-20 lg:-space-x-28">
          {cells.map((cell, idx) => {
            const isHovered = hoveredIdx === idx;
            const style = cardStyles[idx % cardStyles.length];
            const defaultRotation = rotations[idx % rotations.length];

            return (
              <motion.a
                key={idx}
                href={cell.herf}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                initial={{ rotate: defaultRotation, y: 0, scale: 1 }}
                animate={{
                  rotate: isHovered ? 0 : defaultRotation,
                  y: isHovered ? -38 : 0,
                  scale: isHovered ? 1.08 : 1,
                  zIndex: isHovered ? 40 : idx + 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 22
                }}
                className={`relative w-[280px] lg:w-[310px] h-[410px] lg:h-[430px] rounded-xl p-5 ${style.bg} ${style.text} shadow-2xl border border-white/20 cursor-pointer flex flex-col justify-between overflow-hidden group shrink-0 transition-shadow duration-300`}
                style={{
                  boxShadow: isHovered
                    ? '0 28px 56px -12px rgba(0, 0, 0, 0.42)'
                    : '0 12px 32px -10px rgba(0, 0, 0, 0.28)'
                }}
              >
                {/* Upper Inner Screen / Image Window */}
                <div className={`w-full h-[58%] rounded-lg overflow-hidden relative ${style.innerBg} border border-white/10 shadow-inner`}>
                  <img
                    src={cell.img}
                    alt={cell.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>

                {/* Lower Card Label */}
                <div className="flex-1 flex flex-col justify-between pt-3 pb-1 px-1">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-85 block mb-0.5">
                      {cell.subtitle}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight">
                      {cell.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold opacity-90 group-hover:opacity-100">
                      Explore Cell
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Mobile Touch Carousel View (<768px) */}
      <div className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-4 py-4 px-2 no-scrollbar">
        {cells.map((cell, idx) => {
          const style = cardStyles[idx % cardStyles.length];

          return (
            <a
              key={idx}
              href={cell.herf}
              className={`snap-center shrink-0 w-[270px] h-[380px] rounded-xl p-5 ${style.bg} ${style.text} shadow-xl border border-white/20 flex flex-col justify-between overflow-hidden relative`}
            >
              <div className={`w-full h-[55%] rounded-lg overflow-hidden relative ${style.innerBg} border border-white/10`}>
                <img
                  src={cell.img}
                  alt={cell.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between pt-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-85 block mb-0.5">
                    {cell.subtitle}
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight">
                    {cell.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-semibold">Explore Cell</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Interactive Legend / Quick Selector */}
      <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
        {cells.map((cell, idx) => (
          <button
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => window.location.href = cell.herf}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
              hoveredIdx === idx
                ? 'bg-[#303030] text-white shadow-lg scale-105'
                : 'bg-white text-[#303030] border border-black/10 hover:bg-slate-50'
            }`}
          >
            {cell.title}
          </button>
        ))}
      </div>
    </div>
  );
}
