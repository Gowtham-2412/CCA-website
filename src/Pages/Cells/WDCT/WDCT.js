import React from 'react';
import CellProfile from '../CellProfile';
import wdct from '../../../Assets/Images/wdct.png';
import members from '../../../Components/ImgLink/WDCTImg';
import '../CellProfile.css';

export default function WDCT() {
  return (
    <CellProfile
      number="01"
      title="WDCT"
      fullName="WEB DESIGN & CREATIVE TECHNOLOGY"
      eyebrow="DIGITAL CREATIVE STUDIO"
      statement="Interface craft, visual branding, and motion for the collective. We turn complex systems into refined digital artifacts."
      footerTag="WEB DESIGN & CREATIVE TECHNOLOGY — HOW CCA IS EXPERIENCED ONLINE."
      image={wdct}
      logo="/logos/wdct.png"
      modules={[
        {
          title: 'Design systems',
          text: 'Visual identities, campaigns and stories that make complex ideas instantly recognisable.',
        },
        {
          title: 'Build experiences',
          text: 'Websites and interactive tools with a clear point of view and a reason to return.',
        },
        {
          title: 'Pass it on',
          text: 'Design and development workshops that make creativity more open across campus.',
        },
      ]}
      members={members.map((member) => ({ ...member, role: 'WDCT member' }))}
    />
  );
}
