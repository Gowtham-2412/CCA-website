import React, { useEffect, useState, useRef } from 'react';
import Teamcss from './Team.module.css';
import ImgLib from '../../Components/ImgLink/ImageLib';
import MemberCard from '../../Components/UI/MemberCard';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { GraduationCap, Award, UserCheck } from 'lucide-react';

const Team = () => {
  const [items] = useState(ImgLib);

  const FacLib = [
    {
      id: 1,
      image: require("../../Assets/Images/Gojo.jpeg"),
      name: "Dr. G. Praphul Chandra",
      category: "Faculty Adviser",
      role: "Faculty Adviser"
    },
    {
      id: 2,
      image: require("../../Assets/Images/Gojo.jpeg"),
      name: "Dr. Faculty Member 2",
      category: "Faculty Adviser",
      role: "Faculty Adviser"
    },
    {
      id: 3,
      image: require("../../Assets/Images/Gojo.jpeg"),
      name: "Dr. Faculty Member 3",
      category: "Faculty Adviser",
      role: "Faculty Adviser"
    },
  ];

  useEffect(() => {
    Aos.init({
      duration: 600,
      easing: 'ease-in-out-cubic',
    });
  }, []);

  const facultyRef = useRef(null);
  const officeRef = useRef(null);
  const seniorRef = useRef(null);
  const [activeTab, setActiveTab] = useState('faculty');

  const scrollToSection = (elementRef, tabName) => {
    setActiveTab(tabName);
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={Teamcss.pageWrapper}>
      {/* Header Section */}
      <div className={Teamcss.headerSection} data-aos="fade">
        <h1 className={Teamcss.mainHeading}>Our Team</h1>
        <p className={Teamcss.leadPara}>
          The passionate minds and dedicated leaders driving CCA forward across technical innovation, event execution, and strategic management.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className={Teamcss.tabContainer} data-aos="fade">
        <button
          className={`${Teamcss.tabBtn} ${activeTab === 'faculty' ? Teamcss.activeTabBtn : ''}`}
          onClick={() => scrollToSection(facultyRef, 'faculty')}
        >
          <GraduationCap size={16} className="inline mr-2" />
          Faculty Advisers
        </button>
        <button
          className={`${Teamcss.tabBtn} ${activeTab === 'office' ? Teamcss.activeTabBtn : ''}`}
          onClick={() => scrollToSection(officeRef, 'office')}
        >
          <Award size={16} className="inline mr-2" />
          Office Bearers
        </button>
        <button
          className={`${Teamcss.tabBtn} ${activeTab === 'senior' ? Teamcss.activeTabBtn : ''}`}
          onClick={() => scrollToSection(seniorRef, 'senior')}
        >
          <UserCheck size={16} className="inline mr-2" />
          Senior Members
        </button>
      </div>

      {/* Faculty Section */}
      <div ref={facultyRef} className={Teamcss.sectionWrapper}>
        <div className={Teamcss.sectionHeader} data-aos="fade-up">
          <h2>Faculty Advisers</h2>
        </div>
        <div className={Teamcss.membersGrid} data-aos="fade-up">
          {FacLib.map((elem) => (
            <MemberCard
              key={elem.id}
              name={elem.name}
              role={elem.role}
              image={elem.image}
              accentColor="#8EC15C"
            />
          ))}
        </div>
      </div>

      {/* Office Bearers Section */}
      <div ref={officeRef} className={Teamcss.sectionWrapper}>
        <div className={Teamcss.sectionHeader} data-aos="fade-up">
          <h2>Office Bearers</h2>
        </div>
        <div className={Teamcss.membersGrid} data-aos="fade-up">
          {items.slice(21, 31).map((elem, index) => (
            <MemberCard
              key={index}
              name={elem.name || `OFFICE BEARER ${index + 1}`}
              role="Office Bearer"
              image={elem.image}
              accentColor="#8EC15C"
            />
          ))}
        </div>
      </div>

      {/* Senior Members Section */}
      <div ref={seniorRef} className={Teamcss.sectionWrapper}>
        <div className={Teamcss.sectionHeader} data-aos="fade-up">
          <h2>Senior Members</h2>
        </div>
        <div className={Teamcss.membersGrid} data-aos="fade-up">
          {items.slice(32).map((elem, index) => (
            <MemberCard
              key={index}
              name={elem.name || `SENIOR MEMBER ${index + 1}`}
              role="Senior Member"
              image={elem.image}
              accentColor="#8EC15C"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;