// Navbar.jsx
import React, { useState } from 'react';
import { logo } from '../../Assets/Images';
import { dark, ChevronRight } from '../../Assets/Icons';
import { navLinks } from '../../Utility/Constant';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);


  return (
    <header
      className={`navbar  ${open ? 'overflow-visible' : 'overflow-hidden'
        } z-10 h-[80px] w-full`}
    >
      <nav className="max-container mx-[0rem] min-w-full flex justify-between items-center transition-all">
        <a href="./" className="max-sm:mx-0 pl-4 pr-6">
          <img src={logo} alt="Nike" width={89} height={35} />
        </a>
        <ul
          className={`link-style1 top-0 max-lg:pl-15 lg:opacity-100 max-lg:visibility-hidden max-lg:border-2 max-lg:drop-shadow-xl max-sm:grid max-sm:place-content-center linear duration-700 max-sm:gap-4 max-lg:mb-13px
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
                className="lg:effect lg:overflow-hidden font-inter font-semibold leading-normal text-lg text-nav-black max-lg:hover:drop-shadow-lg max-lg:hover:font-bold max-sm:text-[1.8em] max-lg:text-[1.5rem]"
                style={{ textDecoration: 'none', color: '#4A4A4A' }}
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
            <li
              className="hidden max-lg:block cursor-pointer text-3xl max-lg:z-10 -translate-y-1 duration-700 rotate-180"
              onClick={() => setOpen(!open)}
            >
              <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
