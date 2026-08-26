import React from 'react';
import CellProfile from '../CellProfile';
import robo from '../../../Assets/Images/robo.png';
import members from '../../../Components/ImgLink/RoboCellImg';
import '../CellProfile.css';

export default function RoboCell() {
  return (
    <CellProfile
      number="05"
      title="ROBO-CELL"
      fullName="ROBOTICS & HARDWARE ENGINEERING"
      eyebrow="ROBOTICS & INTELLIGENT SYSTEMS"
      statement="A hands-on culture of mechanisms, code and competition—where a rough idea becomes something that moves."
      footerTag="ROBOTICS CELL — CRAFTING MECHANISMS WITH INTENT."
      image={robo}
      logo="/logos/robo.png"
      modules={[
        {
          title: 'Learn by making',
          text: 'First builds that introduce circuitry, mechanics and control systems through doing.',
        },
        {
          title: 'Engineer together',
          text: 'Teams that iterate in public, test under pressure and solve problems at the workbench.',
        },
        {
          title: 'Take the arena',
          text: 'Competitions and live challenges that give every design a reason to perform.',
        },
      ]}
      members={members.map((member) => ({ ...member, role: 'Robo-Cell member' }))}
    />
  );
}
