import React, { useState, useEffect } from 'react';
import AboutCss from './AboutUs.module.css';
import 'animate.css';
import img1 from '../../Assets/Images/carouselimg1.JPG';
import img2 from '../../Assets/Images/carouselimg2.JPG';
import img3 from '../../Assets/Images/carouselimg3.jpeg';

const images = [img1, img2, img3];

export default function AboutUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className='d-lg-block'>
        <div className={`${AboutCss.pagecontainer} ${AboutCss.carouselContainer}`}>
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                style={{ opacity: index === activeIndex ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
              >
                <img src={image} className={AboutCss.carouselImage} alt="CCA Campus" />
                <div className={`${AboutCss.content}`}>
                  <h5 className={`${AboutCss.mainh}`}>About CCA!</h5>
                  <p className={AboutCss.abtpara}>
                    CCA, Centre for Cognitive Activities, is the focal point where convergence of all technical and scientific
                    endeavors of the students materializes. This club is the revolution which bridges the gap between
                    knowledge and application. Bulk of the extracurricular activities held in the college all year round are
                    organized by the CCA, with the objective of probing the dark recesses of the human mind so that the grey
                    cells are stimulated to create, conceptualize, and evolve, triggering a rebellion of the new age mind against
                    baseless conventions and meek acceptance.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='d-none d-lg-none'>
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
              style={{ opacity: index === activeIndex ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
            >
              <img src={image} className={AboutCss.image} alt="CCA Campus" />
            </div>
          ))}
        </div>
        <div>
          <h5 className={`${AboutCss.mainh}`}>About CCA!</h5>
          <p className={AboutCss.abtpara}>
            CCA, Centre for Cognitive Activities, is the focal point where convergence of all technical and scientific
            endeavors of the students materializes. This club is the revolution which bridges the gap between
            knowledge and application. Bulk of the extracurricular activities held in the college all year round are
            organized by the CCA, with the objective of probing the dark recesses of the human mind so that the grey
            cells are stimulated to create, conceptualize, and evolve, triggering a rebellion of the new age mind against
            baseless conventions and meek acceptance.
          </p>
        </div>
      </div>
    </div>
  );
}
