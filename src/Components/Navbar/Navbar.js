import React, { useState, useEffect } from 'react';
import { logo, ccawb1 } from '../../Assets/Images';
import { ChevronRight } from '../../Assets/Icons';
import { navLinks } from '../../Utility/Constant';
import { Link, useLocation } from 'react-router-dom';
import useWindowDimensions from './useWindowDimensions';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './Nav.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAarohanPage = location.pathname === '/aarohan';
  const [navHovered, setNavHovered] = useState(false);
  const { width } = useWindowDimensions();

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (width <= 1024) {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open, width]);

  // Optimized high-performance GPU motion values for cursor followers
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

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
    <>
      <header className="navbar fixed top-0 left-0 right-0 z-[100] w-full">
        {/* High-Performance Smooth GPU Mouse Followers for Desktop */}
        {width > 1024 && (
          <>
            <motion.div
              className="cursor pointer-events-none fixed top-0 left-0 z-[110]"
              animate={{
                scale: navHovered ? 2.5 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 28,
              }}
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
              }}
            />

            <motion.div
              className="cursor_blur pointer-events-none fixed top-0 left-0 z-[105]"
              animate={{
                scale: navHovered ? 1.35 : 1,
                opacity: navHovered ? 0.85 : 0.5,
              }}
              transition={{
                type: 'spring',
                stiffness: 250,
                damping: 25,
              }}
              style={{
                x: blurXSpring,
                y: blurYSpring,
              }}
            />
          </>
        )}

        <nav
          className={`nav-shell ${
            isAarohanPage ? 'nav-shell--aarohan' : ''
          } w-full px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between h-[58px] sm:h-[68px] md:h-[74px]`}
        >
          <Link to="/" className="flex items-center shrink-0 z-20" onClick={() => setOpen(false)}>
            <img
              src={isAarohanPage ? ccawb1 : logo}
              alt="CCA Logo"
              className="h-9 sm:h-11 md:h-13 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8 list-none m-0 p-0">
              {navLinks.map((item) => (
                <li key={item.label} className="list-none">
                  <Link
                    to={item.href}
                    onMouseEnter={() => setNavHovered(true)}
                    onMouseLeave={() => setNavHovered(false)}
                    className={`effect relative font-semibold text-[1.05rem] tracking-tight ${
                      isAarohanPage ? 'text-white' : 'text-[#303030]'
                    } hover:opacity-80 transition-opacity`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center z-[100]">
            <div
              id="navicon"
              className={`${isAarohanPage && !open ? 'whiteIcon' : ''} ${
                open ? 'open' : ''
              }`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
              role="button"
              tabIndex={0}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <div className="lg:hidden">
        {open && (
          <div
            className="nav-backdrop"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
        <ul
          className={`link-style1 ${
            open ? 'drawer-open' : 'drawer-closed'
          }`}
          id="mobile-header"
        >
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="group/item flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#e6e2d5] transition-colors"
            >
              <Link
                to={item.href}
                onClick={() => setOpen(false)}
                className="font-semibold text-xl text-[#303030] tracking-tight w-full flex items-center justify-between"
              >
                <span>{item.label}</span>
                <img
                  src={ChevronRight}
                  alt=""
                  width={16}
                  height={16}
                  className="opacity-40 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
