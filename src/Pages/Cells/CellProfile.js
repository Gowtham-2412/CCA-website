import React from 'react';
import { Link } from 'react-router-dom';
import MemberCard from '../../Components/UI/MemberCard';
import '../Editorial.css';
import './CellProfile.css';

export default function CellProfile({
  number = '01',
  title = 'WDCT',
  fullName,
  eyebrow = 'DIGITAL CREATIVE STUDIO',
  statement = 'Interface craft, visual branding, and motion for the collective. We turn complex systems into refined digital artifacts.',
  footerTag,
  image,
  logo,
  modules = [],
  members = [],
}) {
  const formattedNumber = String(number).padStart(2, '0');
  const displayFullName = fullName || title;
  const displayFooterTag =
    footerTag || `${displayFullName} — HOW CCA IS EXPERIENCED ONLINE.`;

  return (
    <main className="cell-profile-page">
      {/* ─── Hero Section: Dark Cinematic Header with Ambient Illustration & Concentric Glass Emblem ─── */}
      <header className="cell-hero-dark">
        {/* Background Artwork with Dimmed Gradient Scrim */}
        <div className="cell-hero-dark__bg" aria-hidden="true">
          {image && (
            <img
              src={image}
              alt=""
              className="cell-hero-dark__bg-img"
            />
          )}
          <div className="cell-hero-dark__scrim" />
        </div>

        <div className="cell-hero-dark__container">
          <div className="cell-hero-dark__main">
            {/* Left Content Area */}
            <div className="cell-hero-dark__content">
              <div className="cell-hero-dark__kicker">
                <span className="cell-hero-dark__kicker-num">
                  CELL {formattedNumber} / OF 05
                </span>
                <span className="cell-hero-dark__kicker-dot">·</span>
                <span className="cell-hero-dark__kicker-tag">{eyebrow}</span>
              </div>

              <h1 className="cell-hero-dark__title">{title}</h1>

              <div className="cell-hero-dark__subtitle">{displayFullName}</div>

              <p className="cell-hero-dark__statement">{statement}</p>
            </div>

            {/* Right Emblem Area: Concentric Glass Orb & Emblem */}
            <div className="cell-hero-dark__emblem-area">
              <div className="cell-hero-dark__emblem-outer">
                <div className="cell-hero-dark__emblem-ring" aria-hidden="true" />
                <div className="cell-hero-dark__emblem-inner">
                  {logo && (
                    <img
                      className="cell-hero-dark__logo"
                      src={logo}
                      alt={`${title} emblem`}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Metadata & All Cells Navigation */}
          <div className="cell-hero-dark__bottom">
            <span className="cell-hero-dark__bottom-tag">{displayFooterTag}</span>
            <Link
              to="/our-cells"
              className="cell-hero-dark__bottom-link"
              data-cursor-text="CELLS"
            >
              + ALL CELLS
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Body Sections: Light Editorial Theme ─── */}
      <div className="cell-profile-body">
        {/* Core Capabilities / Responsibilities */}
        <section
          className="cell-profile__work"
          aria-labelledby={`${number}-work`}
        >
          <div className="cell-profile__work-title">
            <p className="editorial-kicker">
              CORE CAPABILITIES / {formattedNumber}
            </p>
            <h2 id={`${number}-work`} className="editorial-section-title">
              What we set in motion.
            </h2>
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

        {/* The People / Team Roster */}
        <section
          className="cell-profile__people"
          aria-labelledby={`${number}-people`}
        >
          <div className="cell-profile__people-head">
            <div>
              <p className="editorial-kicker">The people</p>
              <h2 id={`${number}-people`} className="editorial-section-title">
                Meet the cell.
              </h2>
            </div>
          </div>
          <div className="cell-profile__roster">
            {members.map((member, index) => (
              <MemberCard
                key={`${member.name}-${index}`}
                {...member}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
