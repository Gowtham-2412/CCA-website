import React from 'react';
import Footercss from './Footer.module.css';
import { useLocation } from 'react-router-dom';


const Footer = () => {

  const location = useLocation();
  const isAboutUsPage = location.pathname === '/about-us';
  return (

    <footer className={`${Footercss.Footer} ${isAboutUsPage ? 'd-none' : ''}`}>
      <div className={Footercss.socialmediaicons}>
        <p className={Footercss.footerp}>Follow us:</p>
        <a href="https://www.instagram.com/cca.nitd/" target="_blank" rel="noreferrer">
          <div className={Footercss.insta}></div>
        </a>
        <a href="https://www.facebook.com/ccanitd.in" target="_blank" rel="noreferrer">
          <div className={Footercss.facebook}></div>
        </a>
        <a href="https://twitter.com/aarohan_nitdgp" target="_blank" rel="noreferrer">
          <div className={Footercss.twitter}></div>
        </a>
        <a href="https://www.linkedin.com/company/center-for-cognitive-activities-nit-durgapur/" target="_blank" rel="noreferrer">
          <div className={Footercss.linkedin}></div>
        </a>
      </div>
      <div>
        <p className={Footercss.rights}>Made with ♥️ by Web Design & Creative Team, CCA. 2023-24. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
