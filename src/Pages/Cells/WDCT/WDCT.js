import React, { useEffect, useState } from 'react';
import WdctCss from './WDCT.module.css';
import wdct from '../../../Assets/Images/wdct.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import WDCTImg from '../../../Components/ImgLink/WDCTImg';
import TiltedCard from '../../../Components/UI/TiltedCard';
import SpotlightCard from '../../../Components/UI/SpotlightCard';
import MemberCard from '../../../Components/UI/MemberCard';
import { Code2, Palette, Users, Quote } from 'lucide-react';

const WDCT = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    });
  }, []);

  const [items] = useState(WDCTImg);

  return (
    <div className={WdctCss.wrap}>
      <div className={WdctCss.container}>
        {/* Cell Hero */}
        <div className={WdctCss.detailWrap}>
          <div className={WdctCss.CellInfo} data-aos="fade-right">
            <h1 className={WdctCss.heading}>WDCT</h1>
            <h3 className={WdctCss.great}>Welcome to the Web, Design & Creative Team</h3>

            <div className={WdctCss.quoteCard}>
              <Quote className={WdctCss.quoteIcon} size={28} />
              <p className={WdctCss.slogo}>
                "A congregation of enthusiastic technocrats, managing the digital and creative frontiers of CCA."
              </p>
              <p className={WdctCss.quoteSub}>
                From designing websites for high-capacity fests to organizing design and dev workshops for beginners,
                WDCT nurtures the creative spurt and technical excellence across the campus.
              </p>
            </div>
          </div>

          <div className={WdctCss.CellImg} data-aos="zoom-in">
            <TiltedCard maxTilt={8} scale={1.02}>
              <img src={wdct} alt="WDCT" className={WdctCss.img} />
            </TiltedCard>
          </div>
        </div>

        {/* WEB DEV & DESIGN TEAM Bento Grid */}
        <div className={WdctCss.bentoSection}>
          <h2 className={WdctCss.sectionTitle} data-aos="fade-up">Core Technical Wings</h2>

          <div className={WdctCss.bentoGrid}>
            <SpotlightCard className={WdctCss.bentoCard} data-aos="fade-up">
              <div className={WdctCss.bentoHeader}>
                <div className={WdctCss.iconPill}>
                  <Code2 size={22} className="text-[#303030]" />
                </div>
                <h3>WEB DEVELOPMENT TEAM</h3>
              </div>
              <p>
                Responsible for the development and architecture of all CCA websites, the official Aarohan portal, and interactive online events that engage over 3,000 global participants.
              </p>
            </SpotlightCard>

            <SpotlightCard className={WdctCss.bentoCard} data-aos="fade-up" data-aos-delay="100">
              <div className={WdctCss.bentoHeader}>
                <div className={WdctCss.iconPill}>
                  <Palette size={22} className="text-[#303030]" />
                </div>
                <h3>DESIGN & CREATIVE TEAM</h3>
              </div>
              <p>
                Entrusted with developing the visual language, sponsorship brochures, banners, motion graphics, flyers, and offline media for CCA and Aarohan - NIT Durgapur.
              </p>
            </SpotlightCard>
          </div>
        </div>

        {/* Members Section */}
        <div className={WdctCss.membersSection} data-aos="fade">
          <div className={WdctCss.membersHeader}>
            <Users size={28} className="text-[#303030] inline mr-2" />
            <h2 className="inline font-bold">Our Team Members</h2>
          </div>

          <div className={WdctCss.membersGrid}>
            {items.map((elem, index) => (
              <MemberCard
                key={index}
                name={elem.name || "WDCT MEMBER"}
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

export default WDCT;