import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Maximize2 } from 'lucide-react';

export function Carousel({ items = [] }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full py-4">
      {/* Scrollable Cards Container */}
      <div
        ref={carouselRef}
        onScroll={checkScroll}
        className="flex w-full overflow-x-auto py-6 scrollbar-none scroll-smooth gap-6 px-4 md:px-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <div key={index} className="snap-center shrink-0">
            {item}
          </div>
        ))}
      </div>

      {/* Apple Carousel Scroll Navigation Buttons */}
      <div className="flex justify-end gap-3 px-4 md:px-8 mt-4">
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className="w-11 h-11 rounded-full bg-white/90 border border-slate-200 text-[#303030] flex items-center justify-center shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-all duration-200"
          title="Scroll Left"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className="w-11 h-11 rounded-full bg-white/90 border border-slate-200 text-[#303030] flex items-center justify-center shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-all duration-200"
          title="Scroll Right"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export function Card({ card, index }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        layout
        onClick={() => setOpen(true)}
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-[320px] sm:w-[370px] md:w-[410px] h-[400px] sm:h-[450px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-black/10 cursor-pointer group select-none shrink-0 bg-slate-900"
      >
        {/* Full Width & Full Height Image without Inner Container */}
        <img
          src={card.src}
          alt={card.title || `Aarohan Photo ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Floating Top-Right Expand Icon */}
        <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:bg-white group-hover:text-black transition-all">
          <Maximize2 size={15} />
        </div>

        {/* Bottom Left Photo Details Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end text-left pointer-events-none">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b8d474] mb-1">
            {card.category || `Moment #${index + 1}`}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
            {card.title || `Aarohan Highlight`}
          </h3>
        </div>
      </motion.div>

      {/* Expanded Modal View */}
      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[92vh] bg-slate-950 rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <X size={20} />
              </button>

              {/* Full Image Presentation */}
              <div className="w-full flex-1 min-h-[400px] max-h-[70vh] rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center p-2 mb-4 border border-white/10">
                <img
                  src={card.src}
                  alt={card.title || `Aarohan Photo ${index + 1}`}
                  className="max-w-full max-h-[65vh] object-contain rounded-xl"
                />
              </div>

              {/* Modal Details at Bottom Left */}
              <div className="text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b8d474]">
                  {card.category || "Aarohan Photo Showcase"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {card.title || `Aarohan Moment #${index + 1}`}
                </h2>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
