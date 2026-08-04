import React from 'react';
import styles from './AboutUs.module.css';
import carouselimg1 from '../../Assets/Images/carouselimg1.JPG';
import carouselimg2 from '../../Assets/Images/carouselimg2.JPG';
import carouselimg3 from '../../Assets/Images/carouselimg3.jpeg';
import parichay from '../../Assets/Images/parichay.jpeg';
import robozido from '../../Assets/Images/robozido.jpeg';
import designworkshop from '../../Assets/Images/design workshop.jpeg';
import assisteque from '../../Assets/Images/assisteque.jpeg';
import youthparliament from '../../Assets/Images/youth parliament.jpeg';

import {
  ARHN1,
  ARHN2,
  ARHN3,
  ARHN4,
  ARHN5,
  ARHN6,
  ARHN7,
  ARHN8,
  WdctCornar,
  decathalon,
  conjecture,
  GOR,
  inspiratie,
  techmela
} from '../../Assets/Images';

const row1 = [carouselimg1, ARHN1, parichay, ARHN2, robozido, ARHN3];
const row2 = [designworkshop, ARHN4, assisteque, ARHN5, youthparliament, ARHN6];
const row3 = [carouselimg2, ARHN7, carouselimg3, ARHN8, WdctCornar, decathalon];
const row4 = [conjecture, GOR, inspiratie, techmela, carouselimg1, ARHN2];

export default function AboutUs() {
  return (
    <div className={styles.container}>
      {/* Background Multi-Row Infinite Scrolling Image Strips */}
      <div className={styles.marqueeWrapper}>
        <div className={`${styles.row} ${styles.scrollLeft}`}>
          {[...row1, ...row1, ...row1].map((img, i) => (
            <img key={i} src={img} alt="CCA Event" className={styles.cardImg} />
          ))}
        </div>

        <div className={`${styles.row} ${styles.scrollRight}`}>
          {[...row2, ...row2, ...row2].map((img, i) => (
            <img key={i} src={img} alt="CCA Event" className={styles.cardImg} />
          ))}
        </div>

        <div className={`${styles.row} ${styles.scrollLeft}`}>
          {[...row3, ...row3, ...row3].map((img, i) => (
            <img key={i} src={img} alt="CCA Event" className={styles.cardImg} />
          ))}
        </div>

        <div className={`${styles.row} ${styles.scrollRight}`}>
          {[...row4, ...row4, ...row4].map((img, i) => (
            <img key={i} src={img} alt="CCA Event" className={styles.cardImg} />
          ))}
        </div>
      </div>

      {/* Dark Overlay */}
      <div className={styles.darkOverlay} />

      {/* Clean Uncontainerized Original Content */}
      <div className={styles.contentWrap}>
        <h1 className={styles.mainHeading}>About CCA!</h1>
        <p className={styles.abtPara}>
          CCA, Centre for Cognitive Activities, is the focal point where convergence of all technical and scientific
          endeavors of the students materializes. This club is the revolution which bridges the gap between
          knowledge and application. Bulk of the extracurricular activities held in the college all year round are
          organized by the CCA, with the objective of probing the dark recesses of the human mind so that the grey
          cells are stimulated to create, conceptualize, and evolve, triggering a rebellion of the new age mind against
          baseless conventions and meek acceptance.
        </p>
      </div>
    </div>
  );
}
