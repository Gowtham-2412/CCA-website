import React from 'react';
import CellProfile from '../CellProfile';
import core from '../../../Assets/Images/core-img.png';
import members from '../../../Components/ImgLink/CoreImg';
import '../CellProfile.css';

export default function CoreCell() {
  return <CellProfile number="01" title="Core Cell" eyebrow="The club's operational centre" image={core} logo="/logos/core.png"
    statement="The people who turn intent into action—bringing the cells, partners and campus together throughout the year."
    modules={[{ title: 'Direction', text: 'Planning the rhythm of CCA: from the first brief to the final detail.' }, { title: 'Operations', text: 'Coordinating people, places and deadlines so ambitious ideas can happen.' }, { title: 'Outreach', text: 'Building partnerships, sponsorships and the public presence behind every major initiative.' }]}
    members={members.map(member => ({ ...member, role: 'Core member' }))} />;
}
