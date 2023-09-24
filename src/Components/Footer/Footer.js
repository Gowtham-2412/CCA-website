import React from 'react';
import Footercss from './Footer.module.css';
import instagramicon from '../../Assets/Icons/instagram.svg';
import facebookicon from '../../Assets/Icons/facebook.svg';
import twittericon from '../../Assets/Icons/twitter.svg';
import linkedinicon from '../../Assets/Icons/linkedin.svg';



const Footer = () => {
  return (
    <footer className={Footercss.Footer}>
        <div className={Footercss.socialmediaicons}>
        <p className={Footercss.footerp}>Follow us:</p>
        <a href="https://www.instagram.com/cca.nitd/" target="_blank">
         <img src={instagramicon} alt="Instagram" className={Footercss.icon} />
         </a>
         <a href="https://www.facebook.com/ccanitd.in" target="_blank">
          <img src={facebookicon} alt="Facebook" className={Footercss.icon} />
          </a>
          <a href="https://twitter.com/aarohan_nitdgp" target="_blank">
          <img src={twittericon} alt="Twitter" className={Footercss.icon} />
          </a>
          <a href="https://www.linkedin.com/company/center-for-cognitive-activities-nit-durgapur/" target="_blank">
          <img src={linkedinicon} alt="LinkedIn" className={Footercss.icon} />
          </a>
      </div>
    </footer>
  );
};

export default Footer;
