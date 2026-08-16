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
  const [navHovered, setNavHovered] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width <= 1024;

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = 'auto';
      return;
    }
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open, isMobile]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const blurSpringConfig = { damping: 32, stiffness: 220 };
  const blurXSpring = useSpring(cursorX, blurSpringConfig);
  const blurYSpring = useSpring(cursorY, blurSpringConfig);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, cursorX, cursorY]);

  return (
    <header
      className={`navbar fixed top-0 left-0 z-[100] w-full h-[64px] sm:h-[85px] md:h-[92px] ${
        open ? 'overflow-visible' : 'overflow-hidden'
      }`}
    >
      {!isMobile && (
        <>
          <motion.div
            className="cursor pointer-events-none fixed top-0 left-0 z-[110]"
            animate={{ scale: navHovered ? 2.5 : 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            style={{ x: cursorXSpring, y: cursorYSpring }}
          />
          <motion.div
            className="cursor_blur pointer-events-none fixed top-0 left-0 z-[105]"
            animate={{
              scale: navHovered ? 1.35 : 1,
              opacity: navHovered ? 0.85 : 0.5,
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            style={{ x: blurXSpring, y: blurYSpring }}
          />
        </>
      )}

      <nav className="w-full h-full px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-between">
        <a href="./" className="flex items-center shrink-0 z-20">
          {isAboutUsPage || isAarohanPage ? (
            <img
              src={ccawb1}
              alt="Logo"
              width={180}
              height={90}
              className="h-9 sm:h-16 md:h-20 lg:h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <img
              src={logo}
              alt="Logo"
              width={160}
              height={70}
              className="h-9 sm:h-16 md:h-20 lg:h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
        </a>

        <div className="flex items-center gap-4 sm:gap-8">
          <ul
            id="header"
            className={`link-style1 flex items-center gap-8 max-lg:flex-col max-lg:justify-center ${
              open ? 'menu-open' : ''
            }`}
          >
            {navLinks.map((item) => (
              <li
                key={item.label}
                className="group/item flex items-center max-lg:justify-center max-lg:w-full max-lg:px-6 max-lg:py-4 max-lg:hover:bg-[#eef2e4] hover:cursor-pointer"
              >
                <Link
                  to={item.href}
                  onMouseEnter={() => setNavHovered(true)}
                  onMouseLeave={() => setNavHovered(false)}
                  onClick={() => setOpen(false)}
                  className={`lg:effect lg:overflow-hidden font-semibold leading-normal text-lg max-lg:text-[#303030] ${
                    isAboutUsPage || isAarohanPage
                      ? 'lg:text-white'
                      : 'lg:text-[#303030]'
                  } max-sm:text-[1.8em] max-lg:text-[1.5rem]`}
                  style={{ textDecoration: 'none' }}
                >
                  {item.label}
                </Link>
                <img
                  src={ChevronRight}
                  alt=""
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
              className={`${isAboutUsPage || isAarohanPage ? 'whiteIcon' : ''} ${
                open ? 'open' : 'menu'
              }`}
              onClick={() => setOpen(!open)}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;