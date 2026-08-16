import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../Pages/Editorial.css';
import './Footer.css';

const links = [['Instagram', 'https://www.instagram.com/cca.nitd/'], ['LinkedIn', 'https://www.linkedin.com/company/center-for-cognitive-activities-nit-durgapur/'], ['Facebook', 'https://www.facebook.com/ccanitd.in']];

export default function Footer() {
  const { pathname } = useLocation();
  if (pathname === '/aarohan') return null;
  return <footer className="site-footer"><div className="site-footer__top"><p className="editorial-kicker">Centre for Cognitive Activities / NIT Durgapur</p><h2>Keep the signal moving.</h2><div>{links.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}</div></div><div className="site-footer__bottom"><span>CCA © {new Date().getFullYear()}</span><span>Made by WDCT</span></div></footer>;
}
