import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CellStack({ cells = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!cells || cells.length === 0) return null;

  const nextCard = () => {
    setActiveIdx((prev) => (prev + 1) % cells.length);
  };

  const prevCard = () => {
    setActiveIdx((prev) => (prev - 1 + cells.length) % cells.length);
  };

  const activeCell = cells[activeIdx];

  return (
    <div className="w-full max-w-[1100px] mx-auto py-4">
      {/* Interactive Deck Selector Tabs */}
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {cells.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
              activeIdx === idx
                ? 'bg-[#303030] text-white shadow-md'
                : 'bg-white/80 text-[#303030] hover:bg-white border border-black/5'
            }`}
          >
            {cell.title}
          </button>
        ))}
      </div>

      {/* Main Stack Deck Showcase */}
      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-black/5 min-h-[460px]">
        
        {/* Left: Stack Cards Display */}
        <div className="relative w-full lg:w-1/2 h-[340px] flex items-center justify-center">
          {cells.map((cell, i) => {
            const offset = (i - activeIdx + cells.length) % cells.length;
            if (offset > 3 && offset < cells.length - 1) return null;

            const isTop = offset === 0;
            const zIndex = cells.length - (offset < 0 ? Math.abs(offset) : offset);
            const scale = 1 - Math.min(offset, 3) * 0.05;
            const x = offset * 24;
            const rotate = offset * 4;

            return (
              <motion.div
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`absolute w-[280px] sm:w-[320px] h-[320px] rounded-2xl overflow-hidden shadow-lg border border-white/20 cursor-pointer ${
                  isTop ? 'ring-2 ring-black/10' : ''
                }`}
                animate={{
                  scale,
                  x,
                  rotate,
                  zIndex,
                  opacity: offset > 3 ? 0 : 1 - offset * 0.15
                }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 22
                }}
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%), url(${cell.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-1">
                    {cell.subtitle}
                  </span>
                  <h4 className="text-xl">{cell.title}</h4>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Active Cell Information */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between h-full py-2">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#303030]/5 text-[#303030] mb-3">
              {activeCell.subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#303030] mb-3 leading-tight">
              {activeCell.title}
            </h2>
            <p className="text-base text-[#3F3F3F] leading-relaxed mb-6">
              {activeCell.desc}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {/* Nav Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevCard}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#303030] hover:bg-[#303030] hover:text-white transition-colors"
                title="Previous Cell"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextCard}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#303030] hover:bg-[#303030] hover:text-white transition-colors"
                title="Next Cell"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Direct Cell Link */}
            <a
              href={activeCell.herf}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#303030] text-white font-semibold text-sm hover:bg-black transition-colors shadow-md"
            >
              <span>Explore Cell</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
