import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import './AboutUs.css';

import carouselimg1 from '../../Assets/Images/carouselimg1.JPG';
import carouselimg2 from '../../Assets/Images/carouselimg2.JPG';
import robozido from '../../Assets/Images/robozido.jpeg';
import arhn1 from '../../Assets/Images/ARHN1.jpeg';
import arhn3 from '../../Assets/Images/ARHN3.jpeg';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────────────
   Story content — rewritten for cinematic tone
   ─────────────────────────────────────────────────── */
const CHAPTERS = [
  {
    step: '01',
    label: 'The Origin — 2003',
    title: 'It started with a question nobody was asking.',
    body: 'What happens when you give students a workshop, a deadline, and zero bureaucracy? CCA was forged at NIT Durgapur by a handful of builders who believed the best engineering happens outside lecture halls — through fabrication, code, and relentless public demonstration.',
    detail: 'NIT Durgapur\'s first central cognitive & technical society.',
    image: carouselimg1,
  },
  {
    step: '02',
    label: 'The Workshop — Daily Reality',
    title: 'A living laboratory of restless prototypes.',
    body: 'From autonomous rovers and embedded IoT rigs to 3D web platforms and product strategy — our members build functional, ambitious work every day. There is always room for a first attempt and an audacious breakthrough.',
    detail: 'Robotics fabrication · Software development · Design systems.',
    image: robozido,
  },
  {
    step: '03',
    label: 'The Festival — Aarohan',
    title: 'Eastern India\'s benchmark technical festival.',
    body: 'Every year, the collective orchestrates Aarohan — uniting thousands of students nationwide across hackathons, robotics wars, case-study conclaves, policy deliberations, and keynote sessions that redefine the campus calendar.',
    detail: '3,000+ national footfall · Competitive arenas · Industry keynotes.',
    image: arhn1,
  },
  {
    step: '04',
    label: 'The Continuity — Legacy',
    title: 'Knowledge that compounds across generations.',
    body: 'Every cohort leaves behind documented repositories, physical robots, and an unbroken chain of direct peer mentorship. No gatekeeping — first-year beginners work shoulder-to-shoulder with senior project leads from day one.',
    detail: '20+ years of continuous student governance.',
    image: carouselimg2,
  },
];

const STATS = [
  { end: 20, suffix: '+', label: 'Years of Legacy', desc: 'Established 2003, NIT Durgapur\'s premier cognitive body.' },
  { end: 100, suffix: '+', label: 'Annual Initiatives', desc: 'Workshops, robotics competitions, conclaves, hackathons.' },
  { end: 3000, suffix: '+', label: 'Fest Footfall', desc: 'National participants gathering annually for Aarohan.' },
];

/* ───────────────────────────────────────────────────
   Component
   ─────────────────────────────────────────────────── */
export default function AboutUs() {
  const stageDoorRef = useRef(null);
  const revealRef = useRef(null);
  const revealMaskRef = useRef(null);
  const storyRef = useRef(null);
  const statsRef = useRef(null);
  const finaleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ═══════════════════════════════════════════
         ACT 0 — Stage Door title fade-out on scroll
         ═══════════════════════════════════════════ */
      const door = stageDoorRef.current;
      if (door) {
        const title = door.querySelector('.stage-door__title');
        const hint = door.querySelector('.stage-door__scroll-hint');

        gsap.to(title, {
          scale: 0.6,
          opacity: 0,
          filter: 'blur(12px)',
          ease: 'none',
          scrollTrigger: {
            trigger: door,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        gsap.to(hint, {
          opacity: 0,
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: door,
            start: '30% top',
            end: '60% top',
            scrub: true,
          },
        });
      }

      /* ═══════════════════════════════════════════
         ACT 1 — Iris / Circle Reveal
         clip-path on the scene container expands
         from circle(0%) → circle(150%), revealing
         the content and background behind it.
         ═══════════════════════════════════════════ */
      const revealSection = revealRef.current;
      const scene = revealMaskRef.current;
      if (revealSection && scene) {
        // Pin the reveal section and scrub the iris open
        ScrollTrigger.create({
          trigger: revealSection,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
        });

        gsap.fromTo(
          scene,
          { clipPath: 'circle(0% at 50% 50%)' },
          {
            clipPath: 'circle(150% at 50% 50%)',
            ease: 'none',
            scrollTrigger: {
              trigger: revealSection,
              start: 'top top',
              end: '+=100%',
              scrub: 0.5,
            },
          }
        );

        // Fade in the text content slightly after mask starts opening
        const revealText = scene.querySelectorAll('.reveal-stage__kicker, .reveal-stage__heading, .reveal-stage__sub');
        gsap.fromTo(
          revealText,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: revealSection,
              start: '15% top',
              end: '55% top',
              scrub: 0.5,
            },
          }
        );
      }

      /* ═══════════════════════════════════════════
         ACT 2 — Story Chapter Animations
         ═══════════════════════════════════════════ */
      const story = storyRef.current;
      if (story) {
        // Chapter 1 — Fullbleed parallax bg
        const ch1Bg = story.querySelector('.chapter--fullbleed .chapter__bg');
        if (ch1Bg) {
          gsap.fromTo(ch1Bg, { y: '-10%' }, {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: ch1Bg.closest('.chapter'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        // All chapter text blocks — fade in up
        const chapterTexts = story.querySelectorAll('.chapter__text, .chapter__text-half > div');
        chapterTexts.forEach((el) => {
          gsap.fromTo(
            el.children,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // Split chapter images — parallax
        const splitImages = story.querySelectorAll('.chapter__image-half img');
        splitImages.forEach((img) => {
          gsap.fromTo(img, { y: '-8%', scale: 1.1 }, {
            y: '8%',
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.chapter'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

        // Fullbleed chapter 3 bg parallax
        const ch3Bg = story.querySelectorAll('.chapter--fullbleed')[1]?.querySelector('.chapter__bg');
        if (ch3Bg) {
          gsap.fromTo(ch3Bg, { y: '-10%' }, {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: ch3Bg.closest('.chapter'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }

      /* ═══════════════════════════════════════════
         STATS — Animated number counters
         ═══════════════════════════════════════════ */
      const statsSection = statsRef.current;
      if (statsSection) {
        const counters = statsSection.querySelectorAll('.stat-item__number');
        counters.forEach((el) => {
          const target = parseInt(el.dataset.target, 10);
          const obj = { val: 0 };

          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toLocaleString() + (el.dataset.suffix || '');
            },
          });
        });

        // Fade-in labels
        const statItems = statsSection.querySelectorAll('.stat-item');
        statItems.forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      /* ═══════════════════════════════════════════
         ACT 3 — Finale fade-in
         ═══════════════════════════════════════════ */
      const finale = finaleRef.current;
      if (finale) {
        gsap.fromTo(
          finale.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: finale,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="cinematic-about">
      {/* ═══ ACT 0 — THE STAGE DOOR ═══ */}
      <section ref={stageDoorRef} className="stage-door">
        <h1 className="stage-door__title">ABOUT US</h1>
        <div className="stage-door__scroll-hint">
          <span className="stage-door__scroll-text">Scroll to explore</span>
          <div className="stage-door__scroll-line" />
        </div>
      </section>

      {/* ═══ ACT 1 — THE GRAND REVEAL ═══ */}
      <section ref={revealRef} className="reveal-stage">
        {/* The scene — content + background clipped by GSAP */}
        <div ref={revealMaskRef} className="reveal-stage__scene" style={{ clipPath: 'circle(0% at 50% 50%)' }}>
          <div className="reveal-stage__bg-image">
            <img src={arhn3} alt="CCA Assembly" />
          </div>

          <div className="reveal-stage__content">
            <span className="reveal-stage__kicker">Since 2003 · NIT Durgapur</span>
            <h2 className="reveal-stage__heading">
              Where curiosity becomes craft.
            </h2>
            <p className="reveal-stage__sub">
              CCA is the place where technical instinct, creative energy, and
              organisational ambition collide — producing work that travels far
              beyond the classroom walls.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ ACT 2 — THE STORY UNFOLDS ═══ */}
      <div ref={storyRef} className="story-flow">

        {/* Chapter 1 — Full-bleed parallax */}
        <article className="chapter chapter--fullbleed">
          <div className="chapter__bg">
            <img src={CHAPTERS[0].image} alt={CHAPTERS[0].label} />
          </div>
          <div className="chapter__overlay chapter__overlay--dark" />
          <div className="chapter__text chapter__text--centered">
            <div className="chapter__step">
              <span>{CHAPTERS[0].step}</span>
              <span>{CHAPTERS[0].label}</span>
            </div>
            <h2 className="chapter__title">{CHAPTERS[0].title}</h2>
            <p className="chapter__body">{CHAPTERS[0].body}</p>
            <p className="chapter__detail">{CHAPTERS[0].detail}</p>
          </div>
        </article>

        <div className="chapter-divider" />

        {/* Chapter 2 — Split layout: image left, text right */}
        <article className="chapter chapter--split">
          <div className="chapter__image-half">
            <img src={CHAPTERS[1].image} alt={CHAPTERS[1].label} />
          </div>
          <div className="chapter__text-half">
            <div>
              <div className="chapter__step">
                <span>{CHAPTERS[1].step}</span>
                <span>{CHAPTERS[1].label}</span>
              </div>
              <h2 className="chapter__title">{CHAPTERS[1].title}</h2>
              <p className="chapter__body">{CHAPTERS[1].body}</p>
              <p className="chapter__detail">{CHAPTERS[1].detail}</p>
            </div>
          </div>
        </article>

        <div className="chapter-divider" />

        {/* Chapter 3 — Full-bleed parallax (Aarohan) */}
        <article className="chapter chapter--fullbleed">
          <div className="chapter__bg">
            <img src={CHAPTERS[2].image} alt={CHAPTERS[2].label} />
          </div>
          <div className="chapter__overlay chapter__overlay--dark" />
          <div className="chapter__text chapter__text--centered">
            <div className="chapter__step">
              <span>{CHAPTERS[2].step}</span>
              <span>{CHAPTERS[2].label}</span>
            </div>
            <h2 className="chapter__title">{CHAPTERS[2].title}</h2>
            <p className="chapter__body">{CHAPTERS[2].body}</p>
            <p className="chapter__detail">{CHAPTERS[2].detail}</p>
          </div>
        </article>

        <div className="chapter-divider" />

        {/* Chapter 4 — Split layout: text left, image right */}
        <article className="chapter chapter--split">
          <div className="chapter__text-half" style={{ order: 0 }}>
            <div>
              <div className="chapter__step">
                <span>{CHAPTERS[3].step}</span>
                <span>{CHAPTERS[3].label}</span>
              </div>
              <h2 className="chapter__title">{CHAPTERS[3].title}</h2>
              <p className="chapter__body">{CHAPTERS[3].body}</p>
              <p className="chapter__detail">{CHAPTERS[3].detail}</p>
            </div>
          </div>
          <div className="chapter__image-half" style={{ order: 1 }}>
            <img src={CHAPTERS[3].image} alt={CHAPTERS[3].label} />
          </div>
        </article>

        {/* ─── Stats ─── */}
        <section ref={statsRef} className="stats-section">
          <h3 className="stats-section__heading">The numbers behind the movement.</h3>
          <div className="stats-row">
            {STATS.map((s, i) => (
              <div key={i} className="stat-item">
                <span
                  className="stat-item__number"
                  data-target={s.end}
                  data-suffix={s.suffix}
                >
                  0{s.suffix}
                </span>
                <span className="stat-item__label">{s.label}</span>
                <span className="stat-item__desc">{s.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ═══ ACT 3 — THE FINALE ═══ */}
      <section ref={finaleRef} className="finale">
        <span className="finale__kicker">Continue the journey</span>
        <h2 className="finale__heading">The story is built in real time.</h2>
        <p className="finale__sub">
          Explore our annual festival, meet the people who build it,
          or dive into our specialised cells.
        </p>
        <nav className="finale__links">
          <Link to="/our-team" className="finale__link" data-cursor-text="TEAM">
            <span>Our Team</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link to="/our-cells" className="finale__link" data-cursor-text="CELLS">
            <span>Our Cells</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link to="/events" className="finale__link" data-cursor-text="EVENTS">
            <span>Events</span>
            <ArrowUpRight size={16} />
          </Link>
        </nav>
      </section>
    </main>
  );
}
