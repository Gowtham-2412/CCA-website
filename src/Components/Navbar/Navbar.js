// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { logo, ccawb1 } from '../../Assets/Images';
import { ChevronRight } from '../../Assets/Icons';
import { navLinks } from '../../Utility/Constant';
import { Link, useLocation } from 'react-router-dom';
import useWindowDimensions from './useWindowDimensions';
import gsap from 'gsap';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Nav.css';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAboutUsPage = location.pathname === '/about-us';
  const isAarohanPage = location.pathname === '/aarohan';
  const { width } = useWindowDimensions();

  if (width <= 1024) {
    open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
  }

  // Optimized high-performance GPU motion values (Zero React Re-renders on mousemove)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fast, instant spring for primary cursor dot
  const springConfig = { damping: 26, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Smooth, fluid spring for background blur follower
  const blurSpringConfig = { damping: 32, stiffness: 220 };
  const blurXSpring = useSpring(cursorX, blurSpringConfig);
  const blurYSpring = useSpring(cursorY, blurSpringConfig);

  useEffect(() => {
    if (width <= 1024) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [width, cursorX, cursorY]);

  return (
    <header
      className={`navbar absolute lg:bg-opacity-[0.65] ${
        open ? 'overflow-visible' : 'overflow-hidden'
      } z-[100] h-[75px] sm:h-[85px] md:h-[92px] w-full flex items-center`}
    >
      {/* High-Performance Smooth GPU Mouse Followers */}
      {width > 1024 && (
        <>
          <motion.div
            className="cursor pointer-events-none fixed top-0 left-0 -mt-3 -ml-3 z-[110]"
            style={{
              x: cursorXSpring,
              y: cursorYSpring
            }}
          />
          <motion.div
            className="cursor_blur pointer-events-none fixed top-0 left-0 -mt-16 -ml-16 z-[105]"
            style={{
              x: blurXSpring,
              y: blurYSpring
            }}
          />
        </>
      )}

      <nav className="max-container mx-auto px-4 sm:px-6 w-full flex justify-between items-center transition-all">
        <a href="./" className="flex items-center pl-2 sm:pl-4 pr-4 shrink-0 z-20">
          {isAboutUsPage || isAarohanPage ? (
            <img src={ccawb1} alt="Logo" width={180} height={90} className="h-24 sm:h-28 md:h-32 w-auto object-contain transition-transform duration-300 hover:scale-105" />
          ) : (
            <img src={logo} alt="Logo" width={160} height={70} className="h-24 sm:h-28 md:h-32 w-auto object-contain transition-transform duration-300 hover:scale-105" />
          )}
        </a>
        <ul
          className={`link-style1 top-0 max-lg:pl-15 lg:opacity-100 max-lg:visibility-hidden max-lg:border-2 max-lg:drop-shadow-xl max-sm:grid max-sm:place-content-center linear duration-0 max-sm:gap-4 max-lg:mb-13px ${
            open ? 'right-0' : 'right-[-100%]'
          } ${open ? 'z-10' : 'z-[9]'}`}
          id="header"
        >
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="group/item flex flex-nowarp justify-between max-lg:px-5 max-lg:mt-2 max-lg:py-3 max-lg:first:mt-16 max-lg:last:mb-8 max-lg:hover:border-3 max-lg:hover:-translate-y-1 max-lg:hover:bg-[#eef2e4] max-2xl:hover:cursor-pointer lg:hover:scale-100"
              onClick={() => setOpen(!open)}
            >
              <Link
                to={item.href}
                className={`lg:effect lg:overflow-hidden font-inter font-semibold leading-normal text-lg max-lg:text-[#303030] ${
                  isAboutUsPage || isAarohanPage ? 'lg:text-white' : 'lg:text-[#303030]'
                } max-lg:hover:drop-shadow-lg max-lg:hover:font-bold max-sm:text-[1.8em] max-lg:text-[1.5rem]`}
                style={{ textDecoration: 'none' }}
                id="link"
              >
                {item.label}
              </Link>
              <img
                src={ChevronRight}
                alt="right"
                width={15}
                height={15}
                className="opacity-0 max-lg:group-hover/item:opacity-100 ml-1"
              />
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <div
            id="navicon"
            className={`${isAboutUsPage || isAarohanPage ? 'whiteIcon' : ''} ${open ? 'open' : 'menu'}`}
            onClick={() => setOpen(!open)}
            name={open ? 'open' : 'menu'}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
