import React from 'react';
import './Footer.css';
import instagramicon from '../../Assets/Icons/instagram.svg';
import facebookicon from '../../Assets/Icons/facebook.svg';
import twittericon from '../../Assets/Icons/twitter.svg';
import linkedinicon from '../../Assets/Icons/linkedin.svg';



const Footer = () => {
  return (
    <footer className="Footer">
        <div className="socialmedia-icons">
        <p className='footer-p'>Follow us:</p>
        <a href="https://www.instagram.com/cca.nitd/" target="_blank">
         <img src={instagramicon} alt="Instagram" className="icon" />
         </a>
         <a href="https://www.facebook.com/ccanitd.in" target="_blank">
          <img src={facebookicon} alt="Facebook" className="icon" />
          </a>
          <a href="https://twitter.com/aarohan_nitdgp" target="_blank">
          <img src={twittericon} alt="Twitter" className="icon" />
          </a>
          <a href="https://www.linkedin.com/company/center-for-cognitive-activities-nit-durgapur/" target="_blank">
          <img src={linkedinicon} alt="LinkedIn" className="icon" />
          </a>
      </div>
    </footer>
  );
};

export default Footer;
