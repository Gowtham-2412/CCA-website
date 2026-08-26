import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Real CCA Assets
import carouselimg1 from '../Assets/Images/carouselimg1.JPG';
import robozido from '../Assets/Images/robozido.jpeg';
import designworkshop from '../Assets/Images/design workshop.jpeg';
import arhn1 from '../Assets/Images/ARHN1.jpeg';

const SHOWCASE_CARDS = [
  {
    num: '01',
    category: 'Community & Culture',
    title: 'Find your people.',
    text: 'A collaborative space for students who learn fastest by building real things together outside the traditional classroom.',
    image: carouselimg1,
    link: '/about-us',
    linkText: 'Our Story',
  },
  {
    num: '02',
    category: 'Hardware & Fabrication',
    title: 'Make it real.',
    text: 'Move from initial sketches and circuit schematics to functional autonomous bots, competitive rovers, and physical hardware.',
    image: robozido,
    link: '/our-cells',
    linkText: 'Robo-Cell',
  },
  {
    num: '03',
    category: 'Design & Spatial Web',
    title: 'Cross the usual lines.',
    text: 'Deep research meets interactive web engineering, generative visual craft, and venture strategy for real-world impact.',
    image: designworkshop,
    link: '/our-cells',
    linkText: 'WDCT Lab',
  },
  {
    num: '04',
    category: 'National Fest & Legacy',
    title: 'Leave a lasting signal.',
    text: 'Organizing Aarohan, Eastern India’s major techno-management fest, and passing down institutional knowledge to the next cohort.',
    image: arhn1,
    link: '/aarohan',
    linkText: 'Aarohan Fest',
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.97,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function CardsSection() {
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex =
    ((page % SHOWCASE_CARDS.length) + SHOWCASE_CARDS.length) % SHOWCASE_CARDS.length;
  const currentCard = SHOWCASE_CARDS[activeIndex];

  const paginate = useCallback((newDirection) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  // Keyboard arrow listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -80 || offset.x < -60) {
      paginate(1);
    } else if (swipe > 80 || offset.x > 60) {
      paginate(-1);
    }
  };

  return (
    <section
      id="cards-section"
      className="relative w-full py-5 sm:py-12 lg:py-16 bg-[#f1f1f1] text-[#1b1b1b] overflow-hidden border-t border-black/10 select-none"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-8 lg:px-12 flex flex-col gap-3 sm:gap-6">
        {/* ─── Top Header & Desktop Controls ─── */}
        <div className="flex items-end justify-between gap-4 border-b border-black/10 pb-3 sm:pb-5">
          <div>
            <h2 className="text-lg sm:text-3xl md:text-4xl font-bold tracking-tight font-['PP_Frama',sans-serif] text-[#1b1b1b] leading-tight">
              A place to make, learn and move forward.
            </h2>
          </div>

          {/* Desktop Navigation Controls */}
          <div className="hidden sm:flex items-center gap-3 self-end">
            <span className="font-mono text-xs text-neutral-500">
              Swipe or keys
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full bg-[#1b1b1b] text-white flex items-center justify-center shadow-md hover:bg-black hover:scale-105 active:scale-90 transition-all focus:outline-none cursor-pointer border border-black/10"
                aria-label="Previous card"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full bg-[#1b1b1b] text-white flex items-center justify-center shadow-md hover:bg-black hover:scale-105 active:scale-90 transition-all focus:outline-none cursor-pointer border border-black/10"
                aria-label="Next card"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ─── Interactive Swipeable / Draggable Stage ─── */}
        <div className="relative w-full flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="w-full rounded-2xl md:rounded-3xl bg-white border border-black/10 shadow-xl overflow-hidden flex flex-col lg:flex-row cursor-grab active:cursor-grabbing group touch-pan-y"
            >
              {/* Left Content Side */}
              <div className="w-full lg:w-[48%] p-4 sm:p-7 lg:p-10 flex flex-col justify-between order-2 lg:order-1 relative z-10 bg-white">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-3">
                    <span className="font-mono text-[10px] sm:text-xs text-[#666666] uppercase tracking-widest font-semibold">
                      {currentCard.category}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#1b1b1b] tracking-tight font-['PP_Frama',sans-serif] mt-0.5 leading-snug">
                    {currentCard.title}
                  </h3>

                  <p className="text-[#4a4a4a] text-xs sm:text-sm lg:text-base leading-relaxed mt-1.5 sm:mt-3 font-normal line-clamp-3 sm:line-clamp-none">
                    {currentCard.text}
                  </p>
                </div>

                <div className="pt-3 sm:pt-5 border-t border-black/10 mt-3 sm:mt-5 flex items-center justify-between">
                  <Link
                    to={currentCard.link}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#1b1b1b] hover:text-black font-semibold transition-colors group/link bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1.5 rounded-full border border-black/5"
                  >
                    <span>{currentCard.linkText}</span>
                    <ArrowUpRight
                      size={14}
                      className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                    />
                  </Link>
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                    CCA NITD
                  </span>
                </div>
              </div>

              {/* Right Image Side */}
              <div className="w-full lg:w-[52%] h-[155px] sm:h-[240px] md:h-[280px] lg:h-auto min-h-[155px] lg:min-h-[380px] relative overflow-hidden order-1 lg:order-2 bg-[#eae7dc]">
                <img
                  src={currentCard.image}
                  alt={currentCard.title}
                  draggable={false}
                  className="w-full h-full object-cover object-center filter contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Bottom Controls & Progress Bar (Always visible on mobile & desktop) ─── */}
        <div className="flex items-center justify-between gap-4 pt-1">
          {/* Progress Line */}
          <div className="flex-1 h-[3px] bg-black/10 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-[#1b1b1b] rounded-full"
              initial={false}
              animate={{
                width: `${((activeIndex + 1) / SHOWCASE_CARDS.length) * 100}%`,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          {/* Counter */}
          <div className="font-mono text-[11px] sm:text-xs text-neutral-600 tracking-widest uppercase font-semibold">
            0{activeIndex + 1} / 0{SHOWCASE_CARDS.length}
          </div>

          {/* Mobile Navigation Buttons (Visible right alongside card on mobile) */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={() => paginate(-1)}
              className="w-9 h-9 rounded-full bg-[#1b1b1b] text-white flex items-center justify-center shadow-md hover:bg-black active:scale-90 transition-all focus:outline-none cursor-pointer border border-black/10"
              aria-label="Previous card"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-9 h-9 rounded-full bg-[#1b1b1b] text-white flex items-center justify-center shadow-md hover:bg-black active:scale-90 transition-all focus:outline-none cursor-pointer border border-black/10"
              aria-label="Next card"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
