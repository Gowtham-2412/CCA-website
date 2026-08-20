import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import AnimatedText from '../../Components/UI/AnimatedText';
import AnimatedSection from '../../Components/UI/AnimatedSection';
import TiltCard from '../../Components/UI/TiltCard';
import './OurCells.css';
import '../Editorial.css';

import core from '../../Assets/Images/core-cell.png';
import rnd from '../../Assets/Images/rnd.jpg';
import robo from '../../Assets/Images/robo-cell.jpg';
import ecell from '../../Assets/Images/e-cell.jpg';
import wdct from '../../Assets/Images/wdct.jpg';

const CELLS_DATA = [
  {
    id: '01',
    title: 'WDCT',
    category: 'Digital Creative Studio',
    role: 'Web Design & Creative Technology. Shaping how CCA is experienced online through bleeding-edge web platforms, interface craft, visual branding, and motion design.',
    path: '/wdct',
    image: wdct,
    logo: '/logos/wdct.png',
    glareColor: 'rgba(168, 85, 247, 0.25)',
  },
  {
    id: '02',
    title: 'Core Cell',
    category: 'Operations & Strategy',
    role: 'The operational centre of CCA. We steer initiatives, coordinate cross-cell execution, and build national partnerships.',
    path: '/core',
    image: core,
    logo: '/logos/core.png',
    glareColor: 'rgba(255, 255, 255, 0.22)',
  },
  {
    id: '03',
    title: 'E-Cell',
    category: 'Venture & Economics',
    role: 'Ideas with enterprise. Cultivating startup culture through hackathons, pitch arenas, case study conclaves, and venture mentorship.',
    path: '/ecell',
    image: ecell,
    logo: '/logos/ecell.png',
    glareColor: 'rgba(245, 158, 11, 0.25)',
  },
  {
    id: '04',
    title: 'R&D Cell',
    category: 'Hardware & IoT',
    role: 'Research made tangible. Translating theoretical models and engineering blueprints into functional prototypes and deployed tech.',
    path: '/rnd',
    image: rnd,
    logo: '/logos/rnd.png',
    glareColor: 'rgba(59, 130, 246, 0.25)',
  },
  {
    id: '05',
    title: 'Robo-Cell',
    category: 'Robotics & Automation',
    role: 'Machines with intent. Designing combat robots, autonomous line-trackers, rovers, and cutting-edge mechatronic systems.',
    path: '/robo',
    image: robo,
    logo: '/logos/robo.png',
    glareColor: 'rgba(239, 68, 68, 0.25)',
  },
];

export default function OurCells() {
  return (
    <main className="editorial-page cells-page">
      {/* ─── Hero Header ─── */}
      <header className="cells-page__hero">
        <div className="cells-hero__grid">
          <div className="cells-hero__left">
            <AnimatedSection direction="up" duration={0.6}>
              <p className="editorial-kicker">CCA / Five Specialized Wings</p>
            </AnimatedSection>

            <AnimatedText
              text="One collective, five ways to make."
              variant="words"
              tag="h1"
              className="editorial-title cells-hero__title"
              stagger={0.045}
              duration={0.7}
            />
          </div>

          <div className="cells-hero__right">
            <AnimatedSection direction="up" delay={0.2} duration={0.8}>
              <p className="editorial-lead cells-hero__lead">
                Each cell brings a distinct technical capability, discipline, and creative perspective
                to the society. Together, they turn ambitious concepts into real-world systems.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.35} duration={0.7}>
              <div className="cells-hero__quick-nav">
                <span className="cells-hero__nav-label">Jump to wing</span>
                <div className="cells-hero__nav-pills">
                  {CELLS_DATA.map((cell) => (
                    <a
                      key={cell.id}
                      href={`#cell-${cell.id}`}
                      className="cells-hero__nav-pill"
                    >
                      {cell.title}
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </header>

      {/* ─── Interactive Cell Explorer Grid (Olympic Rings 3 on top, 2 below) ─── */}
      <section className="cells-explorer-grid">
        {CELLS_DATA.map((cell, index) => (
          <div
            key={cell.id}
            id={`cell-${cell.id}`}
            className={`cell-card-item cell-card-item--${cell.id}`}
          >
            <AnimatedSection direction="up" delay={index * 0.1} duration={0.7}>
              <Link
                to={cell.path}
                className="cell-explorer-card-link"
                data-cursor-text="EXPLORE"
              >
                <TiltCard
                  className="cell-explorer-card"
                  maxTilt={8}
                  glareColor={cell.glareColor}
                >
                  {/* Photo Layer */}
                  <div className="cell-card__bg">
                    <img
                      src={cell.image}
                      alt={`${cell.title} Visual`}
                      className="cell-card__bg-img"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="cell-card__overlay" />

                  {/* Foreground Content */}
                  <div className="cell-card__content">
                    {/* Top Row: Badge + Logo */}
                    <div className="cell-card__top">
                      <div className="cell-card__logo-wrap">
                        <img
                          src={cell.logo}
                          alt={`${cell.title} logo`}
                          className="cell-card__logo-img"
                        />
                      </div>
                    </div>

                    {/* Bottom Row: Text & Tags & CTA */}
                    <div className="cell-card__bottom">
                      <span className="cell-card__category">
                        {cell.category}
                      </span>
                      <h2 className="cell-card__title">{cell.title}</h2>
                      <p className="cell-card__role">{cell.role}</p>

                      <div className="cell-card__action">
                        <span className="cell-card__action-text">
                          Explore Division
                        </span>
                        <div className="cell-card__action-arrow">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </AnimatedSection>
          </div>
        ))}
      </section>

      {/* ─── Bottom Navigation & Context Row ─── */}
      <AnimatedSection direction="up" duration={0.8} delay={0.2}>
        <section className="cells-bottom-cta">
          <h3 className="cells-bottom-cta__heading">Looking for the bigger picture?</h3>
          <p className="cells-bottom-cta__desc">
            Discover the 20+ year legacy behind CCA or find our flagship competitions and workshops.
          </p>
          <div className="cells-bottom-cta__buttons">
            <Link to="/about-us" className="cells-cta-btn cells-cta-btn--primary">
              Our Story <ArrowUpRight size={14} />
            </Link>
            <Link to="/events" className="cells-cta-btn cells-cta-btn--secondary">
              Browse Events <ArrowUpRight size={14} />
            </Link>
            <Link to="/our-team" className="cells-cta-btn cells-cta-btn--secondary">
              Meet Team <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
