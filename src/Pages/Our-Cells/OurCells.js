import React, { useEffect } from 'react';
import CellsCss from './OurCells.module.css';
import coreimg from '../../Assets/Images/core-cell.png';
import rndimg from '../../Assets/Images/rnd.jpg';
import robocellimg from '../../Assets/Images/robo-cell.jpg';
import ecellimg from '../../Assets/Images/e-cell.jpg';
import wdctimg from '../../Assets/Images/wdct.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import InterfaceCraftDeck from '../../Components/UI/InterfaceCraftDeck';

export default function OurCells() {
  const cellData = [
    {
      herf: "/ecell",
      title: "E-Cell",
      subtitle: "Innovation",
      desc: "Nurtures entrepreneurial mindsets, business plan competitions, and Youth Parliament.",
      img: ecellimg
    },
    {
      herf: "/rnd",
      title: "R&D Cell",
      subtitle: "Research",
      desc: "Explores cutting-edge technologies, IoT workshops, and scientific research initiatives.",
      img: rndimg
    },
    {
      herf: "/wdct",
      title: "WDCT",
      subtitle: "Web & Design",
      desc: "Powers the web platforms, UI/UX designs, motion graphics, and digital identity of CCA.",
      img: wdctimg
    },
    {
      herf: "/robo",
      title: "Robo-Cell",
      subtitle: "Robotics",
      desc: "Drives autonomous robotics workshops, mechanical bot design, and Robocity events.",
      img: robocellimg
    },
    {
      herf: "/core",
      title: "Core Cell",
      subtitle: "Operations",
      desc: "Oversees club activities, arranges sponsorships, and leads the overall organization of CCA.",
      img: coreimg
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    });
  }, []);

  return (
    <div className={CellsCss.ourcellspage}>
      <div className={CellsCss.headerSection} data-aos="fade-down">
        <h1 className={CellsCss.mainheading}>Our Cells</h1>
        <p className={CellsCss.para}>
          CCA is structured into five distinct cells working synergistically.
          Together, they cover every technical, creative, and managerial dimension needed for organizational excellence.
        </p>
      </div>

      {/* Interface Craft Fanned Cards Deck */}
      <div data-aos="fade-up">
        <InterfaceCraftDeck cells={cellData} />
      </div>
    </div>
  );
}
