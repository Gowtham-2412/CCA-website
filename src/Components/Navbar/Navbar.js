import { logo } from '../../Assets/Images';
import { dark, ChevronRight } from '../../Assets/Icons';
import { navLinks } from '../../Utility/Constant';
import { useState } from 'react';

const Navbar = () => {
  let [open, setOpen] = useState(false);
  return (
    <header
      className={`padding-x mt-[1px] ${
        open ? 'overflow-visible' : 'overflow-hidden'
      }  z-10 h-[71px] w-full `}
    >
      <nav className="flex justify-between items-center max-container transition-all">
        <a href="./">
          <img
            src={logo}
            alt="Nike"
            width={89}
            height={35}
            className="max-sm:mx-0:"
          />
        </a>
        <ul
          className={` link-style1 top-0 max-lg:pl-15  lg:opacity-100 max-lg:visibility-hidden max-lg:border-2 max-lg:drop-shadow-xl ${
            open ? 'right-[0%] ' : 'right-[-100%]'
          } ${open ? 'z-10' : 'z-[-1]'}`}
          id="header"
        >
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="group/item flex flex-nowarp justify-between max-lg:px-5 max-lg:mt-2 max-lg:py-3 max-lg:first:mt-16 max-lg:last:mb-8 max-lg:hover:border-3 hover:-translate-y-1 max-lg:hover:bg-[#eef2e4] max-2xl:hover:cursor-pointer"
            >
              <a
                href={item.href}
                className="font-inter font-semibold leading-normal text-lg text-nav-black max-lg:hover:drop-shadow-lg max-lg:hover:font-bold "
                style={{ textDecoration: 'none' }}
                id="link"
              >
                {item.label}
              </a>
              <img
                src={ChevronRight}
                alt="right"
                width={15}
                height={15}
                className="opacity-0 group-hover/item:opacity-100 ml-1"
              />
            </li>
          ))}
        </ul>
        <div className="flex items-end">
          <ul className="flex flex-nowarp items-center ">
            <li className="mr-4">
              <img src={dark} alt="dark to light" width={35} height={35} />
            </li>
            <li
              className="hidden max-lg:block cursor-pointer text-3xl max-lg:z-10 -translate-y-1 duration-700 rotate-180 "
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
