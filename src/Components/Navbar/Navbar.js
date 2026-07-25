// Navbar.jsx
import React, { useState } from 'react';
import { logo, ccawb, ccawb1 } from '../../Assets/Images';
import { dark, ChevronRight } from '../../Assets/Icons';
import { navLinks } from '../../Utility/Constant';
import { Link, useLocation } from 'react-router-dom';
import useWindowDimensions from './useWindowDimensions';
import gsap from 'gsap';
import { color, motion } from "framer-motion";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';
import Navcss from './Nav.css';
import AboutCss from '../../Pages/AboutUs/AboutUs.module.css';

gsap.registerPlugin(ScrollTrigger)

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isLargeScreen = window.innerWidth > 991;
  const isAboutUsPage = location.pathname === '/about-us';
  const isAarohanPage = location.pathname === '/aarohan';
  const { height, width } = useWindowDimensions();
  if (width <= 1024) {
    open ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
  }

  const [MousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  console.log(MousePosition);

  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    }
  }, []);


  const variants = {
    default: {
      x: MousePosition.x - 12,
      y: MousePosition.y - 12
    },
    text: {
      height: 80,
      width: 80,
      x: MousePosition.x - 40,
      y: MousePosition.y - 40,
      backgroundColor: "#150900",
      mixBlendMode: "difference"
    }

  }

  const variants2 = {
    default: {
      x: MousePosition.x - 150,
      y: MousePosition.y - 150
    },
    text: {
      height: 80,
      width: 80,
      x: MousePosition.x - 40,
      y: MousePosition.y - 40,
      backgroundColor: "#e2cb004b",
      mixBlendMode: "difference"
    }

  }

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");


  const [color, changeColor] = useState(null);

  return (
    <header
      className={`navbar absolute lg:bg-opacity-[0.65] ${open ? 'overflow-visible' : 'overflow-hidden'
        } z-10 h-[80px] w-full`}
    >

      <motion.div
        className='cursor'
        style={{ visibility: width <= 1024 ? 'hidden' : 'visible' }}
        variants={variants}
        animate={cursorVariant}
      >
      </motion.div>
      <motion.div
        className='cursor_blur'
        style={{ visibility: width <= 1024 ? 'hidden' : 'visible' }}
        variants={variants2}
        animate={cursorVariant}
      >

      </motion.div>
      <nav className="max-container mx-[0rem] min-w-full flex justify-between lg:pb-4 items-center transition-all">
        <a href="./" className="max-sm:mx-0 pl-4 pr-6">
          {(isAboutUsPage || isAarohanPage) ? (
            <img src={ccawb1} alt="Nike" width={100} height={50} />
          ) : (
            <img src={logo} alt="Nike" width={89} height={35} />
          )}
        </a>
        <ul
          className={`link-style1 top-0 max-lg:pl-15 lg:opacity-100 max-lg:visibility-hidden max-lg:border-2 max-lg:drop-shadow-xl max-sm:grid max-sm:place-content-center linear duration-0 max-sm:gap-4 max-lg:mb-13px
            ${open ? 'right-0' : 'right-[-100%]'} ${open ? 'z-10' : 'z-[9]'}`}
          id="header"
        >
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="group/item  flex flex-nowarp justify-between max-lg:px-5 max-lg:mt-2 max-lg:py-3 max-lg:first:mt-16 max-lg:last:mb-8 max-lg:hover:border-3 max-lg:hover:-translate-y-1 max-lg:hover:bg-[#eef2e4] max-2xl:hover:cursor-pointer lg:hover:scale-100"
              onClick={() => setOpen(!open)}
            >
              <Link
                to={item.href}
                onMouseEnter={textEnter} onMouseLeave={textLeave}
                onClick={() => changeColor(`${item.color}`)}
                className={`lg:effect lg:overflow-hidden font-inter font-semibold leading-normal text-lg ${(isAboutUsPage || isAarohanPage) ? `${AboutCss.textnav}` : ''} max-lg:hover:drop-shadow-lg max-lg:hover:font-bold max-sm:text-[1.8em] max-lg:text-[1.5rem]`}
                style={{ textDecoration: 'none', color: color }}
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
        <div className="flex items-end">
          <ul className="flex flex-nowarp items-center ">
            <li className="mx-4">
              <img src={dark} alt="dark to light" width={35} height={35} />
            </li>
            <div id="navicon" className={` ${(isAboutUsPage || isAarohanPage) ? 'whiteIcon' : ''} ${open ? 'open' : 'menu'}`}

              onClick={() => setOpen(!open)} name={open ? 'open' : 'menu'}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
