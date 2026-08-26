import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../Pages/Editorial.css';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  ['Instagram', 'https://www.instagram.com/cca.nitd/'],
  ['LinkedIn', 'https://www.linkedin.com/company/center-for-cognitive-activities-nit-durgapur/'],
  ['Facebook', 'https://www.facebook.com/ccanitd.in'],
];

const mainLinks = [
  ['Home', '/'],
  ['About Us', '/about-us'],
  ['Our Cells', '/our-cells'],
  ['Aarohan', '/aarohan'],
  ['Events', '/events'],
  ['Our Team', '/our-team'],
  ['Hall of Fame', '/hall'],
];

const cellLinks = [
  ['WDCT', '/wdct'],
  ['Core Cell', '/core'],
  ['E-Cell', '/ecell'],
  ['R&D Cell', '/rnd'],
  ['Robo-Cell', '/robo'],
];

export default function Footer() {
  const { pathname } = useLocation();
  const isAarohan = pathname === '/aarohan';
  const footerRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    gsap.set(el, { y: 50, opacity: 0 });

    const tween = gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      ref={footerRef}
      className={`site-footer ${isAarohan ? 'site-footer--aarohan' : ''}`}
    >
      {/* Gradient edge */}
      <div className="site-footer__gradient-edge" aria-hidden="true" />

      {/* Top section */}
      <div className="site-footer__top">
        {/* Headline */}
        <div className="site-footer__headline" ref={headlineRef}>
          <h2>Centre for Cognitive Activities.</h2>
        </div>

        {/* Navigation */}
        <nav className="site-footer__nav" aria-label="Footer navigation">
          <div className="site-footer__col">
            <h4>Navigation</h4>
            {mainLinks.map(([label, path]) => (
              <Link key={label} to={path}>
                {label}
              </Link>
            ))}
          </div>
          <div className="site-footer__col">
            <h4>Cells & Wings</h4>
            {cellLinks.map(([label, path]) => (
              <Link key={label} to={path}>
                {label}
              </Link>
            ))}
          </div>
          <div className="site-footer__col">
            <h4>Connect</h4>
            {socials.map(([label, url]) => (
              <a key={label} href={url} target="_blank" rel="noreferrer">
                {label} <span className="footer-arrow">↗</span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <span>CCA © {new Date().getFullYear()}</span>
        <span>Made with ❤️ by WDCT</span>
        <button
          onClick={scrollToTop}
          className="site-footer__top-btn"
          aria-label="Scroll to top"
        >
          <span>Back to top</span>
          <ArrowUp size={14} className="site-footer__top-icon" />
        </button>
      </div>
    </footer>
  );
}
