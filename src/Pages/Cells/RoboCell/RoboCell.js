import React, { useEffect, useState } from 'react';
import RoboCss from './RoboCell.module.css';
import robo from '../../../Assets/Images/robo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RoboCellImg from '../../../Components/ImgLink/RoboCellImg';
import TiltedCard from '../../../Components/UI/TiltedCard';
import SpotlightCard from '../../../Components/UI/SpotlightCard';
import MemberCard from '../../../Components/UI/MemberCard';
import { Cpu, Wrench, Trophy, Users, Quote } from 'lucide-react';

const RoboCell = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    });
  }, []);

  const [items] = useState(RoboCellImg);

  return (
    <div className={RoboCss.wrap}>
      <div className={RoboCss.container}>
        {/* Cell Hero */}
        <div className={RoboCss.detailWrap}>
          <div className={RoboCss.CellInfo} data-aos="fade-right">
            <h1 className={RoboCss.heading}>Robo-Cell</h1>
            <h3 className={RoboCss.great}>Welcome to the Robotics Cell of the Club</h3>

            <div className={RoboCss.quoteCard}>
              <Quote className={RoboCss.quoteIcon} size={28} />
              <p className={RoboCss.slogo}>
                "First they ignore you, then they laugh at you, then they fight you, then you win." - Mahatma Gandhi
              </p>
              <p className={RoboCss.quoteSub}>
                Automated machines mimicking human precision drive the latest frontier of engineering.
                Robo-Cell brings high-efficiency autonomous and manual robotics to life through intense research and construction.
              </p>
            </div>
          </div>

          <div className={RoboCss.CellImg} data-aos="zoom-in">
            <TiltedCard maxTilt={8} scale={1.02}>
              <img src={robo} alt="Robo-Cell" className={RoboCss.img} />
            </TiltedCard>
          </div>
        </div>

        {/* WORKSHOPS, ROBOCITY & AAROHAN WORKSHOPS Bento Grid */}
        <div className={RoboCss.bentoSection}>
          <h2 className={RoboCss.sectionTitle} data-aos="fade-up">Robotics Training & Competitions</h2>

          <div className={RoboCss.bentoGrid}>
            <SpotlightCard className={RoboCss.bentoCard} data-aos="fade-up">
              <div className={RoboCss.bentoHeader}>
                <div className={RoboCss.iconPill}>
                  <Wrench size={22} className="text-[#303030]" />
                </div>
                <h3>BEGINNER WORKSHOPS</h3>
              </div>
              <p>
                Workshops on mechanical and wired robots for beginners. Complete robotics kits are provided, and participants learn hands-on assembly, circuitry, and control mechanics.
              </p>
            </SpotlightCard>

            <SpotlightCard className={RoboCss.bentoCard} data-aos="fade-up" data-aos-delay="100">
              <div className={RoboCss.bentoHeader}>
                <div className={RoboCss.iconPill}>
                  <Cpu size={22} className="text-[#303030]" />
                </div>
                <h3>ROBOCITY COMPETITION</h3>
              </div>
              <p>
                Stand-alone odd-semester events testing robotics prowess and practical application skills, enlightening first-year students on bot programming and arena navigation.
              </p>
            </SpotlightCard>

            <SpotlightCard className={`${RoboCss.bentoCard} ${RoboCss.fullWidthCard}`} data-aos="fade-up" data-aos-delay="200">
              <div className={RoboCss.bentoHeader}>
                <div className={RoboCss.iconPill}>
                  <Trophy size={22} className="text-[#303030]" />
                </div>
                <h3>AAROHAN ROBOTICS EVENTS</h3>
              </div>
              <p>
                Flagship autonomous and advanced wired/mechanical robotics events during Aarohan, challenging teams across obstacle courses, maze solvers, and custom bot battles.
              </p>
            </SpotlightCard>
          </div>
        </div>

        {/* Members Section */}
        <div className={RoboCss.membersSection} data-aos="fade">
          <div className={RoboCss.membersHeader}>
            <Users size={28} className="text-[#303030] inline mr-2" />
            <h2 className="inline font-bold">Our Team Members</h2>
          </div>

          <div className={RoboCss.membersGrid}>
            {items.map((elem, index) => (
              <MemberCard
                key={index}
                name={elem.name || "ROBO MEMBER"}
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

export default RoboCell;