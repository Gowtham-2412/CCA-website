import React from 'react';
import CellProfile from '../CellProfile';
import ecell from '../../../Assets/Images/e-cell.png';
import members from '../../../Components/ImgLink/EcellImg';
import '../CellProfile.css';

export default function Ecell() {
  return (
    <CellProfile
      number="03"
      title="E-CELL"
      fullName="ENTREPRENEURSHIP & VENTURE INITIATIVES"
      eyebrow="VENTURE & ENTERPRISE HUB"
      statement="A place to test ideas, develop instincts and make a thoughtful leap from campus projects to real ventures."
      footerTag="ENTREPRENEURSHIP CELL — FOSTERING INNOVATION & FOUNDERS."
      image={ecell}
      logo="/logos/ecell.png"
      modules={[
        {
          title: 'Start small',
          text: 'Conversations, workshops and first experiments for students learning how value is created.',
        },
        {
          title: 'Think commercially',
          text: 'Business challenges that sharpen research, communication, strategy and conviction.',
        },
        {
          title: 'Build networks',
          text: 'A bridge between student founders, alumni, industry voices and potential collaborators.',
        },
      ]}
      members={members.map((member) => ({ ...member, role: 'E-Cell member' }))}
    />
  );
}
