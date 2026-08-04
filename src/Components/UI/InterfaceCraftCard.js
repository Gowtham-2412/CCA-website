import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Code2, Cpu, Lightbulb, Compass, Activity, CheckCircle2, Sparkles, X } from 'lucide-react';

export default function InterfaceCraftCard({ cell = {}, isFeatured = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'core': return Shield;
      case 'wdct': return Code2;
      case 'robo': return Cpu;
      case 'ecell': return Lightbulb;
      case 'rnd': return Compass;
      default: return Activity;
    }
  };

  const IconComp = getIcon(cell.type || 'core');

  return (
    <>
      <motion.div
        ref={cardRef}
        layout
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
        className={`relative rounded-xl bg-white p-6 shadow-lg border border-black/10 cursor-pointer overflow-hidden flex flex-col justify-between group transition-shadow duration-500 ${
          isFeatured ? 'lg:col-span-2 min-h-[420px]' : 'col-span-1 min-h-[390px]'
        }`}
      >
        {/* Aceternity Interface Craft Radial Mouse Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(142, 193, 92, 0.22), transparent 40%)`
          }}
        />

        {/* Top Bar: Icon, Pill & Status Dot */}
        <div className="relative z-10 flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-[#303030] text-white flex items-center justify-center shadow-md group-hover:bg-[#8EC15C] transition-colors duration-300">
              <IconComp size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D6D6D] block">
                {cell.subtitle}
              </span>
              <h3 className="text-2xl font-extrabold text-[#303030] tracking-tight group-hover:text-black transition-colors">
                {cell.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#f2efe4] px-3 py-1.5 rounded-full border border-black/5">
            <span className="w-2 h-2 rounded-full bg-[#8EC15C] animate-pulse" />
            <span className="text-[11px] font-bold text-[#303030] uppercase tracking-wider">Active</span>
          </div>
        </div>

        {/* Interface Craft Interactive Visual Area */}
        <div className="relative z-10 w-full h-[210px] rounded-lg overflow-hidden mb-4 border border-black/5 shadow-inner group">
          <img
            src={cell.img}
            alt={cell.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Interface Craft Widget Overlay */}
          <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-filter backdrop-blur-md p-3 rounded-xl border border-white/40 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#303030]">
              <Sparkles size={14} className="text-[#8EC15C]" />
              <span>{cell.statLabel || "Cell Operations Hub"}</span>
            </div>
            <span className="text-xs font-bold text-[#8EC15C] bg-[#8EC15C]/10 px-2 py-0.5 rounded-md">
              {cell.statValue || "100% Ready"}
            </span>
          </div>
        </div>

        {/* Bottom Bar: Description & Action Callout */}
        <div className="relative z-10 flex items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <p className="text-sm text-[#4a4a4a] leading-relaxed line-clamp-2 max-w-[75%] font-medium">
            {cell.desc}
          </p>

          <a
            href={cell.herf}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#303030] text-white text-xs font-bold hover:bg-black transition-all shadow-md group-hover:scale-105"
          >
            <span>Explore</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </motion.div>

      {/* Interface Craft Animated Expand Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-black/10 relative overflow-hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-black hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#8EC15C] text-white flex items-center justify-center shadow-md">
                  <IconComp size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6D6D6D]">{cell.subtitle}</span>
                  <h2 className="text-3xl font-extrabold text-[#303030]">{cell.title}</h2>
                </div>
              </div>

              <img src={cell.img} alt={cell.title} className="w-full h-[240px] object-cover rounded-2xl mb-5 shadow-md" />

              <p className="text-base text-[#4a4a4a] leading-relaxed mb-6 font-medium">
                {cell.desc}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <CheckCircle2 size={16} className="text-[#8EC15C]" />
                  <span>Official Cell of CCA NIT Durgapur</span>
                </div>

                <a
                  href={cell.herf}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#303030] text-white font-bold text-sm hover:bg-black transition-all shadow-lg"
                >
                  <span>Go to {cell.title} Page</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
