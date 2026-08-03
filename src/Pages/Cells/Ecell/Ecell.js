import React, { useEffect, useState } from 'react';
import EcellCss from './Ecell.module.css';
import ecell from '../../../Assets/Images/e-cell.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EcellImg from '../../../Components/ImgLink/EcellImg';
import TiltedCard from '../../../Components/UI/TiltedCard';
import SpotlightCard from '../../../Components/UI/SpotlightCard';
import MemberCard from '../../../Components/UI/MemberCard';
import { Target, Rocket, CalendarCheck, Users, Quote } from 'lucide-react';

const Ecell = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    });
  }, []);

  const [items] = useState(EcellImg);

  return (
    <div className={EcellCss.wrap}>
      <div className={EcellCss.container}>
        {/* Cell Hero */}
        <div className={EcellCss.detailWrap}>
          <div className={EcellCss.CellInfo} data-aos="fade-right">
            <h1 className={EcellCss.heading}>E-Cell</h1>
            <h3 className={EcellCss.great}>Welcome to the Entrepreneurship Cell of the Club</h3>

            <div className={EcellCss.quoteCard}>
              <Quote className={EcellCss.quoteIcon} size={28} />
              <p className={EcellCss.slogo}>
                "Logic will get you from A to B. Imagination will get you everywhere else." - Albert Einstein
              </p>
              <p className={EcellCss.quoteSub}>
                Imagination is the fuel for all great technological and business revolutions.
                At E-Cell, we foster the spirit of enterprise, startup vision, and creative disruption.
              </p>
            </div>
          </div>

          <div className={EcellCss.CellImg} data-aos="zoom-in">
            <TiltedCard maxTilt={8} scale={1.02}>
              <img src={ecell} alt="E-Cell" className={EcellCss.img} />
            </TiltedCard>
          </div>
        </div>

        {/* AIM, OBJECTIVES & ACTIVITIES Bento Grid */}
        <div className={EcellCss.bentoSection}>
          <h2 className={EcellCss.sectionTitle} data-aos="fade-up">Cell Initiatives</h2>

          <div className={EcellCss.bentoGrid}>
            <SpotlightCard className={EcellCss.bentoCard} data-aos="fade-up">
              <div className={EcellCss.bentoHeader}>
                <div className={EcellCss.iconPill}>
                  <Target size={22} className="text-[#303030]" />
                </div>
                <h3>OUR AIM</h3>
              </div>
              <p>
                We strive to nourish the spirit of entrepreneurship among students and faculty, inspire members to tackle
                real-world business challenges, and assist them in launching and running ventures with incubation support.
              </p>
            </SpotlightCard>

            <SpotlightCard className={EcellCss.bentoCard} data-aos="fade-up" data-aos-delay="100">
              <div className={EcellCss.bentoHeader}>
                <div className={EcellCss.iconPill}>
                  <Rocket size={22} className="text-[#303030]" />
                </div>
                <h3>OBJECTIVES</h3>
              </div>
              <p>
                Developing leadership qualities, motivating feasible business plans, bridging the gap between industry and academia,
                and building a robust network of founders, investors, and industry executives.
              </p>
            </SpotlightCard>

            <SpotlightCard className={`${EcellCss.bentoCard} ${EcellCss.fullWidthCard}`} data-aos="fade-up" data-aos-delay="200">
              <div className={EcellCss.bentoHeader}>
                <div className={EcellCss.iconPill}>
                  <CalendarCheck size={22} className="text-[#303030]" />
                </div>
                <h3>KEY ACTIVITIES & EVENTS</h3>
              </div>
              <ul className={EcellCss.respList}>
                <li>Inviting eminent entrepreneurs and NITD alumni for guest lectures and fireside chats.</li>
                <li>Organizing inter-college business plan competitions judged by CEOs and venture capitalists.</li>
                <li>Hosting Youth Parliament and flagship business events during Aarohan.</li>
              </ul>
            </SpotlightCard>
          </div>
        </div>

        {/* Members Section */}
        <div className={EcellCss.membersSection} data-aos="fade">
          <div className={EcellCss.membersHeader}>
            <Users size={28} className="text-[#303030] inline mr-2" />
            <h2 className="inline font-bold">Our Team Members</h2>
          </div>

          <div className={EcellCss.membersGrid}>
            {items.map((elem, index) => (
              <MemberCard
                key={index}
                name={elem.name || "E-CELL MEMBER"}
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

export default Ecell;