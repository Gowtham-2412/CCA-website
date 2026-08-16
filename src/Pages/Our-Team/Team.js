import React from 'react';
import ImgLib from '../../Components/ImgLink/ImageLib';
import MemberCard from '../../Components/UI/MemberCard';
import './Team.css';
import '../Editorial.css';
import adviser from '../../Assets/Images/Gojo.jpeg';

const advisers = [{ name: 'Dr. G. Praphul Chandra', role: 'Faculty adviser', image: adviser }];
const groups = [
  { id: '01', title: 'Faculty advisers', lead: 'The guides who help the collective stay ambitious and grounded.', people: advisers },
  { id: '02', title: 'Office bearers', lead: 'The people carrying the day-to-day direction of CCA.', people: ImgLib.slice(21, 31).map(person => ({ ...person, role: 'Office bearer' })) },
  { id: '03', title: 'Senior members', lead: 'Experience, perspective and a shared willingness to pass it on.', people: ImgLib.slice(32).map(person => ({ ...person, role: 'Senior member' })) }
];

export default function Team() {
  return <main className="editorial-page team-page">
    <header className="team-page__hero"><p className="editorial-kicker">CCA / People directory</p><h1 className="editorial-title">The minds moving CCA.</h1><p className="editorial-lead">A collective of builders, organisers, researchers and designers working across the year.</p></header>
    <nav className="team-page__index" aria-label="Team sections">{groups.map(group => <a href={`#${group.id}`} key={group.id}><span>{group.id}</span>{group.title}</a>)}</nav>
    {groups.map(group => <section className="team-page__group" id={group.id} key={group.id}><header><p className="editorial-number">{group.id}</p><h2>{group.title}</h2><p>{group.lead}</p></header><div className="team-page__roster">{group.people.map((person, index) => <MemberCard {...person} key={`${person.name}-${index}`} />)}</div></section>)}
  </main>;
}
