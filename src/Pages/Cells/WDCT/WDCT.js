import React from 'react';
import CellProfile from '../CellProfile';
import wdct from '../../../Assets/Images/wdct.png';
import members from '../../../Components/ImgLink/WDCTImg';
import '../CellProfile.css';

export default function WDCT() {
  return <CellProfile number="05" title="WDCT" eyebrow="The digital and creative studio" image={wdct} logo="/logos/wdct.png"
    statement="The team that shapes how CCA is seen, felt and used—from identity systems to the spaces people meet online."
    modules={[{ title: 'Design systems', text: 'Visual identities, campaigns and stories that make complex ideas instantly recognisable.' }, { title: 'Build experiences', text: 'Websites and interactive tools with a clear point of view and a reason to return.' }, { title: 'Pass it on', text: 'Design and development workshops that make creativity more open across campus.' }]}
    members={members.map(member => ({ ...member, role: 'WDCT member' }))} />;
}
