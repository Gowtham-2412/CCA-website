import React, { useEffect, useState } from 'react';
import RnDCss from './RnD.module.css';
import rnd from '../../../Assets/Images/rnd.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RnDImg from '../../../Components/ImgLink/RnDImg';
import TiltedCard from '../../../Components/UI/TiltedCard';
import SpotlightCard from '../../../Components/UI/SpotlightCard';
import MemberCard from '../../../Components/UI/MemberCard';
import { Cpu, Microscope, Users, Quote } from 'lucide-react';

const RnD = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    });
  }, []);

  const [items] = useState(RnDImg);

  return (
    <div className={RnDCss.wrap}>
      <div className={RnDCss.container}>
        {/* Cell Hero */}
        <div className={RnDCss.detailWrap}>
          <div className={RnDCss.CellInfo} data-aos="fade-right">
            <h1 className={RnDCss.heading}>R&D Cell</h1>
            <h3 className={RnDCss.great}>Welcome to the Research & Development Cell of the Club</h3>

            <div className={RnDCss.quoteCard}>
              <Quote className={RnDCss.quoteIcon} size={28} />
              <p className={RnDCss.slogo}>
                "If we knew what it was we were doing, it would not be called research, would it?" - Albert Einstein
              </p>
              <p className={RnDCss.quoteSub}>
                From the dark ages to the modern digital era, ground-breaking discoveries stem from continuous inquiry.
                The R&D Cell flourishes where inquisitive minds and technical expertise work synergistically to monitor and propel research programs.
              </p>
            </div>
          </div>

          <div className={RnDCss.CellImg} data-aos="zoom-in">
            <TiltedCard maxTilt={8} scale={1.02}>
              <img src={rnd} alt="R&D Cell" className={RnDCss.img} />
            </TiltedCard>
          </div>
        </div>

        {/* FOCUS AREAS Bento Grid */}
        <div className={RnDCss.bentoSection}>
          <h2 className={RnDCss.sectionTitle} data-aos="fade-up">Research Domain & Workshops</h2>

          <div className={RnDCss.bentoGrid}>
            <SpotlightCard className={RnDCss.bentoCard} data-aos="fade-up">
              <div className={RnDCss.bentoHeader}>
                <div className={RnDCss.iconPill}>
                  <Microscope size={22} className="text-[#303030]" />
                </div>
                <h3>RESEARCH & DISCOVERY</h3>
              </div>
              <p>
                Empowering students to publish research papers, experiment with hardware prototyping, and solve real-world problems through scientific methods.
              </p>
            </SpotlightCard>

            <SpotlightCard className={RnDCss.bentoCard} data-aos="fade-up" data-aos-delay="100">
              <div className={RnDCss.bentoHeader}>
                <div className={RnDCss.iconPill}>
                  <Cpu size={22} className="text-[#303030]" />
                </div>
                <h3>INTERNET OF THINGS (IoT)</h3>
              </div>
              <p>
                Organizing hands-on workshops like Assisteque, where students assemble smart IoT devices using microcontrollers, sensors, and real-time data translation.
              </p>
            </SpotlightCard>
          </div>
        </div>

        {/* Members Section */}
        <div className={RnDCss.membersSection} data-aos="fade">
          <div className={RnDCss.membersHeader}>
            <Users size={28} className="text-[#303030] inline mr-2" />
            <h2 className="inline font-bold">Our Team Members</h2>
          </div>

          <div className={RnDCss.membersGrid}>
            {items.map((elem, index) => (
              <MemberCard
                key={index}
                name={elem.name || "R&D MEMBER"}
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

export default RnD;