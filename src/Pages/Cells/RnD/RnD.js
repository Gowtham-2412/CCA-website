import React from 'react';
import CellProfile from '../CellProfile';
import rnd from '../../../Assets/Images/rnd.png';
import members from '../../../Components/ImgLink/RnDImg';
import '../CellProfile.css';

export default function RnD() {
  return <CellProfile number="03" title="R&D Cell" eyebrow="Curiosity, made practical" image={rnd} logo="/logos/rnd.png"
    statement="A working lab for students who would rather prototype, measure and learn than settle for a first answer."
    modules={[{ title: 'Investigate', text: 'Research-led projects that turn unfamiliar questions into things we can test.' }, { title: 'Prototype', text: 'Hands-on systems, devices and experiments built to make abstract thinking tangible.' }, { title: 'Share knowledge', text: 'Workshops and peer learning that let more people enter the world of research.' }]}
    members={members.map(member => ({ ...member, role: 'R&D member' }))} />;
}
