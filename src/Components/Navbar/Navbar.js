import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logo, ccawb } from '../../Assets/Images';
import { ArrowUpRight, X } from 'lucide-react';
import './Nav.css';

const FULLSCREEN_LINKS = [
  { label: 'Home', href: '/', num: '01' },
  { label: 'About Us', href: '/about-us', num: '02' },
  { label: 'Our Cells', href: '/our-cells', num: '03' },
  { label: 'Aarohan', href: '/aarohan', num: '04' },
  { label: 'Events', href: '/events', num: '05' },
  { label: 'Our Team', href: '/our-team', num: '06' },
  { label: 'Hall of Fame', href: '/hall', num: '07' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const isAarohanPage = location.pathname === '/aarohan';
  const isAboutPage = location.pathname === '/about-us';
  const isDarkPage = isAarohanPage || isAboutPage;

  // Auto-close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when fullscreen menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  // Smooth Hide on Scroll Down / Immediate Reveal on Small Scroll Up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (open) {
        setNavVisible(true);
        return;
      }

      setIsScrolled(currentScrollY > 30);

      // Near the very top of the page: always visible
      if (currentScrollY <= 40) {
        setNavVisible(true);
      } else if (currentScrollY < lastScrollY.current - 1.5) {
        // Immediate smooth reveal as soon as any small upward scroll is triggered
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        // Scrolling DOWN -> smoothly hide
        setNavVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [open]);

  // Framer Motion Animation Variants
  const menuVariants = {
    initial: {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      opacity: 0,
    },
    animate: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const listContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { y: 35, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <>
      {/* ─── Main Floating Navbar Header ─── */}
      <header
        className={`cca-navbar fixed top-2 sm:top-4 left-0 right-0 z-[110] w-full flex justify-center px-1.5 sm:px-4 md:px-6 pointer-events-none transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          navVisible ? 'translate-y-0' : '-translate-y-[135%]'
        }`}
      >
        <div
          className={`cca-nav-shell pointer-events-auto w-[96%] sm:w-[92%] md:max-w-[1240px] px-3.5 sm:px-7 md:px-8 flex items-center justify-between h-[56px] sm:h-[68px] rounded-2xl md:rounded-full transition-all duration-300 ${
            open
              ? 'bg-transparent border-transparent'
              : isDarkPage
              ? isScrolled
                ? 'bg-[#0d0d0d]/85 backdrop-blur-xl border border-transparent shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
                : 'bg-[#0d0d0d]/40 backdrop-blur-md border border-transparent shadow-md'
              : isScrolled
              ? 'bg-[#F1F1F1]/88 backdrop-blur-xl border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
              : 'bg-[#F1F1F1]/70 backdrop-blur-md border border-black/6 shadow-sm'
          }`}
        >
          {/* Brand Logo - Enlarged & Crisp */}
          <Link
            to="/"
            className="flex items-center shrink-0 z-[120] group py-1"
            onClick={() => setOpen(false)}
            data-cursor-text="CCA"
          >
            <img
              src={open || isDarkPage ? ccawb : logo}
              alt="CCA Logo"
              className="h-12 sm:h-14 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Right Action: Animated Fullscreen Menu Toggle */}
          <div className="flex items-center gap-3 z-[120]">
            <button
              onClick={() => setOpen(!open)}
              className={`cca-nav-toggle flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                open
                  ? 'bg-white text-black hover:bg-neutral-200 shadow-xl'
                  : isDarkPage
                  ? 'bg-white/10 text-white border border-transparent hover:bg-white/20 backdrop-blur-md'
                  : 'bg-black/5 text-[#1b1b1b] border border-black/10 hover:bg-black/10 backdrop-blur-md'
              }`}
              data-cursor-text={open ? 'CLOSE' : 'MENU'}
              aria-label={open ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              <span>{open ? 'CLOSE' : 'MENU'}</span>
              <div className="relative w-4 h-4 flex items-center justify-center">
                {open ? (
                  <X size={16} className="transition-transform rotate-0 hover:rotate-90 duration-300" />
                ) : (
                  <div className="flex flex-col justify-between w-3.5 h-2.5">
                    <span
                      className={`block w-full h-[2px] rounded-full transition-all ${
                        isDarkPage ? 'bg-white' : 'bg-[#1b1b1b]'
                      }`}
                    />
                    <span
                      className={`block w-2/3 h-[2px] rounded-full ml-auto transition-all ${
                        isDarkPage ? 'bg-white' : 'bg-[#1b1b1b]'
                      }`}
                    />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Awwwards-Inspired Fullscreen Overlay Menu ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="fullscreen-nav"
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="cca-fullscreen-menu fixed inset-0 z-[100] w-full h-full bg-[#090909] text-white flex flex-col justify-between overflow-y-auto"
          >
            {/* Ambient Dynamic Background Glows */}
            <div className="absolute top-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full bg-radial from-[#b8d474]/8 via-transparent to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-radial from-[#fc4778]/8 via-transparent to-transparent blur-3xl pointer-events-none" />

            {/* Menu Body Content (Left Directory + Right Kinetic Particle Sphere) */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-24 sm:pt-28 pb-12 flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 z-10 my-auto">
              
              {/* Left: Navigation Directory Links */}
              <div className="w-full lg:flex-1 flex flex-col justify-center items-start text-left">
                <motion.nav
                  variants={listContainerVariants}
                  initial="initial"
                  animate="animate"
                  className="flex flex-col items-start gap-6 sm:gap-2.5 w-full"
                >
                  {FULLSCREEN_LINKS.map((link, idx) => {
                    const isHovered = hoveredIndex === idx;
                    const isAnyHovered = hoveredIndex !== null;
                    const isDimmed = isAnyHovered && !isHovered;

                    return (
                      <motion.div
                        key={link.href}
                        variants={itemVariants}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`group relative py-0.5 sm:py-1 transition-all duration-300 ease-out ${
                          isDimmed ? 'opacity-25 blur-[0.5px] scale-[0.98]' : 'opacity-100 scale-100'
                        }`}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setOpen(false)}
                          className="flex items-baseline gap-3 sm:gap-6 text-left group-hover:translate-x-3 sm:group-hover:translate-x-5 transition-transform duration-300 ease-out"
                          data-cursor-text="VISIT"
                        >
                          {/* Index Number */}
                          <span className="font-mono text-xs sm:text-base md:text-lg text-neutral-500 group-hover:text-[#b8d474] transition-colors">
                            {link.num}
                          </span>

                          {/* Title with larger font size & hover effect */}
                          <span className="font-['PP_Frama',sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-neutral-200 group-hover:text-white transition-all duration-300 leading-none">
                            {link.label}
                          </span>

                          {/* Arrow Marker */}
                          <ArrowUpRight
                            size={28}
                            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:-translate-y-1 text-[#b8d474] transition-all duration-300 hidden sm:inline-block"
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>
              </div>

              {/* Right: Interactive 3D Magnetic Kinetic Particle Sphere (Desktop Only) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, x: 25 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:flex items-center justify-center relative w-[420px] xl:w-[500px] h-[420px] xl:h-[500px] select-none pointer-events-none"
              >
                <KineticSphere isAnyHovered={hoveredIndex !== null} />
              </motion.div>
            </div>

            {/* Bottom Footer Info */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-6 pt-2 text-left z-10 border-t border-white/5 flex items-center justify-between">
              <span className="font-mono text-[11px] text-neutral-500 tracking-widest uppercase">
                Centre for Cognitive Activities · NIT Durgapur
              </span>
              <span className="hidden sm:inline-block font-mono text-[11px] text-neutral-600 uppercase">
                EST. 2003
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Interactive 3D Magnetic Kinetic Particle Sphere Canvas ─── */
function KineticSphere({ isAnyHovered }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({
    lastX: null,
    lastY: null,
    vx: 0,
    vy: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = (canvas.offsetWidth || 480) * (window.devicePixelRatio || 1));
    let height = (canvas.height = (canvas.offsetHeight || 480) * (window.devicePixelRatio || 1));
    const radius = Math.min(width, height) * 0.44;

    // Generate 3D Fibonacci sphere points
    const numPoints = 160;
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      points.push({ x: x * radius, y: y * radius, z: z * radius });
    }

    let rotX = 0;
    let rotY = 0;

    const handleMouseMove = (e) => {
      if (mouseRef.current.lastX !== null && mouseRef.current.lastY !== null) {
        const dx = e.clientX - mouseRef.current.lastX;
        const dy = e.clientY - mouseRef.current.lastY;
        mouseRef.current.vx += dx * 0.0007;
        mouseRef.current.vy += dy * 0.0007;
      }
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = (canvas.offsetWidth || 480) * (window.devicePixelRatio || 1);
      height = canvas.height = (canvas.offsetHeight || 480) * (window.devicePixelRatio || 1);
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      // Rotate strictly based on mouse velocity with inertia & friction
      rotY += mouseRef.current.vx;
      rotX += mouseRef.current.vy;

      // Damping friction (smoothly eases to a complete halt when mouse stops)
      mouseRef.current.vx *= 0.94;
      mouseRef.current.vy *= 0.94;

      ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const projected = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotate Y
        let x1 = p.x * cosY + p.z * sinY;
        let z1 = -p.x * sinY + p.z * cosY;

        // Rotate X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        const fov = radius * 2.4;
        const scale = fov / (fov + z2);
        const x2d = x1 * scale + width / 2;
        const y2d = y2 * scale + height / 2;
        const alpha = Math.max(0.12, Math.min(0.95, (z2 + radius) / (2 * radius)));

        projected.push({ x: x2d, y: y2d, z: z2, scale, alpha });
      }

      // Draw connecting constellation lines
      ctx.lineWidth = 0.85;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 42 * ((p1.scale + p2.scale) / 2);
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * Math.min(p1.alpha, p2.alpha) * 0.35;
            ctx.strokeStyle = isAnyHovered
              ? `rgba(184, 212, 116, ${lineAlpha})`
              : `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const dotSize = Math.max(1, p.scale * 2.3);

        ctx.fillStyle = isAnyHovered
          ? `rgba(184, 212, 116, ${p.alpha})`
          : `rgba(255, 255, 255, ${p.alpha * 0.85})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
        ctx.fill();

        if (p.z > radius * 0.2) {
          ctx.fillStyle = isAnyHovered
            ? `rgba(184, 212, 116, ${p.alpha * 0.3})`
            : `rgba(252, 71, 120, ${p.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotSize * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isAnyHovered]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 m-auto w-[280px] xl:w-[340px] h-[280px] xl:h-[340px] rounded-full bg-radial from-[#b8d474]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain relative z-10"
      />
    </div>
  );
}