import React from 'react';
import MemberCard from '../../Components/UI/MemberCard';
import { ChevronRight } from '../../Assets/Icons';
import '../Editorial.css';
import './CellProfile.css';

export default function CellProfile({ number, title, eyebrow, statement, image, logo, modules, members }) {
  return (
    <main className="editorial-page cell-profile">
      <header className="cell-profile__hero">
        <div>
          <img className="cell-profile__logo" src={logo} alt={`${title} logo`} />
          <h1 className="editorial-title">{title}</h1>
        </div>
        <div className="cell-profile__intro">
          <p className="editorial-meta">{eyebrow}</p>
          <p>{statement}</p>
          <span className="cell-profile__marker">SCROLL TO EXPLORE <img src={ChevronRight} alt="" /></span>
        </div>
      </header>

      {/* <img className="cell-profile__image image-dither" src={image} alt={`${title} in action`} /> */}

      <section className="cell-profile__work" aria-labelledby={`${number}-work`}>
        <div className="cell-profile__work-title">
          <p className="editorial-kicker">Core Responsibilities</p>
          <h2 id={`${number}-work`} className="editorial-section-title">What we set in motion.</h2>
        </div>
        <div className="cell-profile__list">
          {modules.map((module, index) => (
            <article className="cell-profile__line" key={module.title}>
              <span className="editorial-number">0{index + 1}</span>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cell-profile__people" aria-labelledby={`${number}-people`}>
        <div className="cell-profile__people-head">
          <p className="editorial-kicker">The people</p>
          <h2 id={`${number}-people`} className="editorial-section-title">Meet the cell.</h2>
        </div>
        <div className="cell-profile__roster">
          {members.map((member, index) => <MemberCard key={`${member.name}-${index}`} {...member} />)}
        </div>
      </section>
    </main>
  );
}
