import React from 'react';
import ImgLib from '../../Components/ImgLink/ImageLib';
import MemberCard from '../../Components/UI/MemberCard';
import AnimatedText from '../../Components/UI/AnimatedText';
import AnimatedSection from '../../Components/UI/AnimatedSection';
import './Team.css';
import '../Editorial.css';
import adviser from '../../Assets/Images/Gojo.jpeg';

const advisers = [
  {
    name: 'Dr. G. Praphul Chandra',
    role: 'Faculty adviser',
    image: adviser,
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
  },
];

const groups = [
  {
    id: 'advisers',
    num: '01',
    title: 'Faculty advisers',
    lead: 'The guides who help the collective stay ambitious, grounded, and technically forward-looking.',
    people: advisers,
  },
  {
    id: 'office-bearers',
    num: '02',
    title: 'Office bearers',
    lead: 'The executive team carrying the day-to-day direction, operations, and public presence of CCA.',
    people: ImgLib.slice(21, 31).map((person) => ({
      ...person,
      role: 'Office bearer',
      instagramUrl: 'https://instagram.com',
      linkedinUrl: 'https://linkedin.com',
    })),
  },
  {
    id: 'senior-members',
    num: '03',
    title: 'Senior members',
    lead: 'Experience, technical perspective, and a shared dedication to mentoring the next generation.',
    people: ImgLib.slice(32).map((person) => ({
      ...person,
      role: 'Senior member',
      instagramUrl: 'https://instagram.com',
      linkedinUrl: 'https://linkedin.com',
    })),
  },
];

export default function Team() {
  return (
    <main className="editorial-page team-page">
      {/* ─── Hero Section ─── */}
      <header className="team-page__hero">
        <div className="editorial-header">
          <div className="editorial-header__left">
            <AnimatedSection direction="up" duration={0.6}>
              <p className="editorial-kicker">CCA / People directory</p>
            </AnimatedSection>

            <AnimatedText
              text="The minds moving CCA."
              variant="words"
              tag="h1"
              className="editorial-title"
              stagger={0.045}
              duration={0.7}
            />
          </div>

          <div className="editorial-header__right">
            <AnimatedSection direction="up" delay={0.2} duration={0.8}>
              <p className="editorial-lead">
                A collective of builders, organisers, researchers, and designers working across the year
                to push technical and creative boundaries.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </header>

      {/* ─── Quick Jump Navigation ─── */}
      <nav className="team-page__index" aria-label="Team sections">
        {groups.map((group) => (
          <a href={`#${group.id}`} key={group.id} className="team-page__index-link">
            {group.title}
          </a>
        ))}
      </nav>

      {/* ─── Team Sections with Sticky Headers ─── */}
      <div className="team-page__groups">
        {groups.map((group) => (
          <section className="team-page__group" id={group.id} key={group.id}>
            {/* Sticky Group Header */}
            <header className="team-page__group-header">
              <span className="editorial-kicker">{`${group.num} // Group`}</span>
              <h2>{group.title}</h2>
              <p>{group.lead}</p>
            </header>

            {/* Member Cards Grid */}
            <div className="team-page__roster">
              {group.people.map((person, index) => (
                <MemberCard {...person} key={`${person.name}-${index}`} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
