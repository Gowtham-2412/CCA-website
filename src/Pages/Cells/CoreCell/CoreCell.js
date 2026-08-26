import React from 'react';
import CellProfile from '../CellProfile';
import core from '../../../Assets/Images/core-img.png';
import members from '../../../Components/ImgLink/CoreImg';
import '../CellProfile.css';

export default function CoreCell() {
  return (
    <CellProfile
      number="02"
      title="CORE CELL"
      fullName="OPERATIONS & CENTRAL MANAGEMENT"
      eyebrow="OPERATIONAL CENTRE"
      statement="The people who turn intent into action—bringing the cells, partners and campus together throughout the year."
      footerTag="CORE CELL — THE OPERATIONAL BACKBONE OF CCA."
      image={core}
      logo="/logos/core.png"
      modules={[
        {
          title: 'Direction',
          text: 'Planning the rhythm of CCA: from the first brief to the final detail.',
        },
        {
          title: 'Operations',
          text: 'Coordinating people, places and deadlines so ambitious ideas can happen.',
        },
        {
          title: 'Outreach',
          text: 'Building partnerships, sponsorships and the public presence behind every major initiative.',
        },
      ]}
      members={members.map((member) => ({ ...member, role: 'Core member' }))}
    />
  );
}
