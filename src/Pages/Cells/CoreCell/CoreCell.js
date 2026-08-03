import React, { useEffect, useState } from 'react';
import CoreCss from './CoreCell.module.css';
import core from '../../../Assets/Images/core-img.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CoreImg from '../../../Components/ImgLink/CoreImg';
import TiltedCard from '../../../Components/UI/TiltedCard';
import SpotlightCard from '../../../Components/UI/SpotlightCard';
import MemberCard from '../../../Components/UI/MemberCard';
import { Target, Shield, Users, Quote } from 'lucide-react';

const CoreCell = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    });
  }, []);

  const [items] = useState(CoreImg);

  return (
    <div className={CoreCss.wrap}>
      <div className={CoreCss.container}>
        {/* Cell Hero */}
        <div className={CoreCss.detailWrap}>
          <div className={CoreCss.CellInfo} data-aos="fade-right">
            <h1 className={CoreCss.heading}>Core Cell</h1>
            <h3 className={CoreCss.great}>Welcome to the Core Cell of the Club</h3>

            <div className={CoreCss.quoteCard}>
              <Quote className={CoreCss.quoteIcon} size={28} />
              <p className={CoreCss.slogo}>
                "Management is doing things right; Leadership is doing right things." - Peter Drucker
              </p>
              <p className={CoreCss.quoteSub}>
                Motivating and leading is a task well known by these robust minds. Engaged throughout the year behind the scenes,
                the Core Cell excels in coordinating across all cells to achieve excellence.
              </p>
            </div>
          </div>

          <div className={CoreCss.CellImg} data-aos="zoom-in">
            <TiltedCard maxTilt={8} scale={1.02}>
              <img src={core} alt="Core Cell" className={CoreCss.img} />
            </TiltedCard>
          </div>
        </div>

        {/* AIM & RESPONSIBILITIES Bento Grid */}
        <div className={CoreCss.bentoSection}>
          <h2 className={CoreCss.sectionTitle} data-aos="fade-up">Core Functionality</h2>

          <div className={CoreCss.bentoGrid}>
            <SpotlightCard className={CoreCss.bentoCard} data-aos="fade-up">
              <div className={CoreCss.bentoHeader}>
                <div className={CoreCss.iconPill}>
                  <Target size={22} className="text-[#303030]" />
                </div>
                <h3>OUR AIM</h3>
              </div>
              <p>
                Our aim is to carry out the smooth functioning of the club. Filled with disciplined individuals,
                we extract the best performance from everyone involved in club activities.
              </p>
            </SpotlightCard>

            <SpotlightCard className={CoreCss.bentoCard} data-aos="fade-up" data-aos-delay="100">
              <div className={CoreCss.bentoHeader}>
                <div className={CoreCss.iconPill}>
                  <Shield size={22} className="text-[#303030]" />
                </div>
                <h3>KEY RESPONSIBILITIES</h3>
              </div>
              <ul className={CoreCss.respList}>
                <li><span className={CoreCss.numBullet}>1</span> Overseeing all overall activities and operations of the club.</li>
                <li><span className={CoreCss.numBullet}>2</span> Arranging and conducting technical and management workshops year-round.</li>
                <li><span className={CoreCss.numBullet}>3</span> Securing sponsorships and monetary aid for NITD's annual techno-management fest 'AAROHAN'.</li>
                <li><span className={CoreCss.numBullet}>4</span> Spearheading outreach, logistics, and publicity across platforms.</li>
              </ul>
            </SpotlightCard>
          </div>
        </div>

        {/* Members Section */}
        <div className={CoreCss.membersSection} data-aos="fade">
          <div className={CoreCss.membersHeader}>
            <Users size={28} className="text-[#303030] inline mr-2" />
            <h2 className="inline font-bold">Our Team Members</h2>
          </div>

          <div className={CoreCss.membersGrid}>
            {items.map((elem, index) => (
              <MemberCard
                key={index}
                name={elem.name || "CORE MEMBER"}
                role="Senior Member"
                image={elem.image}
                accentColor="#8EC15C"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreCell;