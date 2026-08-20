import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const quickLinks = [
  ['About', '/about-us'],
  ['Events', '/events'],
  ['Our Team', '/our-team'],
  ['Cells', '/our-cells'],
  ['Aarohan', '/aarohan'],
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
            <h4>Pages</h4>
            {quickLinks.map(([label, path]) => (
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
        <span>
          CCA © {new Date().getFullYear()}
        </span>
        <span>Made with ❤️ by WDCT</span>
      </div>
    </footer>
  );
}
