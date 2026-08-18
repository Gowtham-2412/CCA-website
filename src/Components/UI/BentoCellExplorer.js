import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ExternalLink, Cpu, Code, TrendingUp, Compass, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import roboImg from '../../Assets/Images/robo-cell.jpg';
import wdctImg from '../../Assets/Images/wdct.jpg';
import ecellImg from '../../Assets/Images/e-cell.jpg';
import rndImg from '../../Assets/Images/rnd.jpg';
import coreImg from '../../Assets/Images/core-cell.png';

const cellsData = [
  {
    id: 'robo',
    name: 'Robo-Cell',
    title: 'Robotics & Hardware Labs',
    icon: Cpu,
    tag: 'Autonomous & Mechanical',
    description:
      'Pioneering hardware intelligence, autonomous rover engineering, combat bots, and IoT robotics through practical fabrication.',
    link: '/robo',
    image: roboImg,
    stats: '15+ Combat Bots Built',
    skills: ['ROS', 'Embedded C', 'PCB Design', 'SolidWorks', 'Sensor Fusion'],
  },
  {
    id: 'wdct',
    name: 'WDCT',
    title: 'Web, Design & Creative Tech',
    icon: Code,
    tag: 'Digital Craft & 3D Web',
    description:
      'The digital architects behind CCA’s visual universe, interactive spatial web applications, design systems, and brand motion.',
    link: '/wdct',
    image: wdctImg,
    stats: '50+ Apps & Web Projects',
    skills: ['WebGL / Three.js', 'React / Next', 'UI/UX Craft', 'Motion', 'Branding'],
  },
  {
    id: 'ecell',
    name: 'E-Cell',
    title: 'Entrepreneurship & Strategy',
    icon: TrendingUp,
    tag: 'Venture & Management',
    description:
      'Cultivating startup founders, strategic business acumen, national case-study champions, and high-impact guest speaker series.',
    link: '/ecell',
    image: ecellImg,
    stats: '10+ Startups Incubated',
    skills: ['Venture Strategy', 'Case Analysis', 'Public Policy', 'Fundraising'],
  },
  {
    id: 'rnd',
    name: 'R&D Cell',
    title: 'Research & Deep Tech',
    icon: Compass,
    tag: 'Intelligence & Research',
    description:
      'Exploring frontiers in Applied Artificial Intelligence, Computer Vision, Edge Computing, and peer-reviewed technical publications.',
    link: '/rnd',
    image: rndImg,
    stats: '20+ Research Papers',
    skills: ['Deep Learning', 'Edge AI', 'Computer Vision', 'IoT Systems'],
  },
  {
    id: 'core',
    name: 'Core Cell',
    title: 'Operations & Execution',
    icon: Shield,
    tag: 'Leadership & Logistics',
    description:
      'The driving force orchestrating Eastern India’s 2nd largest techno-management fest Aarohan, club governance, and industry ties.',
    link: '/core',
    image: coreImg,
    stats: '3000+ Fest Footfall',
    skills: ['Event Orchestration', 'Public Relations', 'Logistics', 'Finance'],
  },
];

export default function BentoCellExplorer() {
  const [activeCell, setActiveCell] = useState(cellsData[0]);

  return (
    <div className="w-full bg-[#181818] rounded-2xl md:rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 text-white shadow-2xl overflow-hidden relative">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fc4778]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <span className="font-mono text-xs text-[#fc4778] tracking-widest uppercase font-semibold">
            Interactive Ecosystem
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-1 font-['PP_Frama',sans-serif]">
            The Five Pillars of CCA
          </h3>
        </div>
        <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-xs">
          Select or hover over any cell to inspect its mission and capabilities.
        </p>
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-6 relative z-10">
        {/* Left Column: Cell selector list */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          {cellsData.map((cell) => {
            const Icon = cell.icon;
            const isActive = activeCell.id === cell.id;

            return (
              <button
                key={cell.id}
                onClick={() => setActiveCell(cell)}
                onMouseEnter={() => setActiveCell(cell)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl transition-all duration-300 flex items-center justify-between group relative overflow-hidden border ${
                  isActive
                    ? 'bg-white/10 border-[#fc4778]/60 shadow-lg'
                    : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.07] hover:border-white/20'
                }`}
                data-cursor-text="INSPECT"
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#fc4778]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3.5 pl-1.5">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive ? 'bg-[#fc4778] text-white' : 'bg-white/10 text-neutral-300 group-hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg text-white group-hover:text-[#fc4778] transition-colors">
                      {cell.name}
                    </h4>
                    <p className="text-xs font-mono text-neutral-400">{cell.tag}</p>
                  </div>
                </div>

                <ChevronRight
                  size={18}
                  className={`text-neutral-400 transition-transform duration-300 ${
                    isActive ? 'translate-x-1 text-[#fc4778]' : 'group-hover:translate-x-1'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Preview Showcase */}
        <div className="lg:col-span-7 bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCell.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col h-full justify-between gap-6"
            >
              {/* Top info */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#fc4778]/20 border border-[#fc4778]/40 text-[#fc4778] rounded-full text-xs font-mono font-medium">
                    {activeCell.stats}
                  </span>
                  <Link
                    to={activeCell.link}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white transition-colors uppercase tracking-wider"
                    data-cursor-text="VISIT"
                  >
                    Cell Page <ExternalLink size={13} className="text-[#fc4778]" />
                  </Link>
                </div>

                <h4 className="text-2xl sm:text-3xl font-semibold text-white font-['PP_Frama',sans-serif]">
                  {activeCell.title}
                </h4>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mt-2.5">
                  {activeCell.description}
                </p>
              </div>

              {/* Image Preview with overlay */}
              <div className="relative w-full h-44 sm:h-56 rounded-xl overflow-hidden border border-white/10 group">
                <img
                  src={activeCell.image}
                  alt={activeCell.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                  {activeCell.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/15 text-neutral-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
