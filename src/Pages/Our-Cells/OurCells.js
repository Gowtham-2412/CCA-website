import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from '../../Assets/Icons';
import './OurCells.css';
import '../Editorial.css';
import core from '../../Assets/Images/core-cell.png';
import rnd from '../../Assets/Images/rnd.jpg';
import robo from '../../Assets/Images/robo-cell.jpg';
import ecell from '../../Assets/Images/e-cell.jpg';
import wdct from '../../Assets/Images/wdct.jpg';

const cells = [
  { id: '01', title: 'Core Cell', role: 'The operational centre', path: '/core', image: core, logo: '/logos/core.png' },
  { id: '02', title: 'E-Cell', role: 'Ideas with enterprise', path: '/ecell', image: ecell, logo: '/logos/ecell.png' },
  { id: '03', title: 'R&D Cell', role: 'Research made tangible', path: '/rnd', image: rnd, logo: '/logos/rnd.png' },
  { id: '04', title: 'Robo-Cell', role: 'Machines with intent', path: '/robo', image: robo, logo: '/logos/robo.png' },
  { id: '05', title: 'WDCT', role: 'The digital creative studio', path: '/wdct', image: wdct, logo: '/logos/wdct.png' }
];

export default function OurCells() {
  const [activeCell, setActiveCell] = useState(cells[0]);
  return <main className="editorial-page cells-page">
    <header className="cells-page__hero"><p className="editorial-kicker">CCA / Five cells</p><h1 className="editorial-title">One collective, five ways to make.</h1><p className="editorial-lead">Each cell brings a different capability to CCA. Together, they turn ideas into things people can experience.</p></header>
    <section className="cells-page__system" onMouseLeave={() => setActiveCell(cells[0])}>
      <div className="cells-page__image"><img className="image-dither" src={activeCell.image} alt="" /><img className="cells-page__logo" src={activeCell.logo} alt={`${activeCell.title} logo`} /><p>{activeCell.id}<br />{activeCell.role}</p></div>
      <div className="cells-page__links">{cells.map(cell => <Link to={cell.path} key={cell.id} onMouseEnter={() => setActiveCell(cell)} onFocus={() => setActiveCell(cell)}><span>{cell.id}</span><strong>{cell.title}</strong><img src={ChevronRight} alt="" /></Link>)}</div>
    </section>
  </main>;
}
