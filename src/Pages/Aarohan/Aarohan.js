import React, { useRef, useLayoutEffect } from 'react';
import styles from './Aarohan.module.css';
import './Aarohan.css';
import {
  WdctCornar, decathalon, GOR, OSH, MEC,
  conjecture, inspiratie, redode, techmela, acsc,
  ARHN1, ARHN3,
} from '../../Assets/Images';
import { arhnvd } from '../../Assets/Videos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from '../../Components/UI/SpotlightCard';
import { Trophy, Users, Award } from 'lucide-react';

import BootSequence from './BootSequence';
import HudFrame from './HudFrame';
import GlitchText from './GlitchText';
import SplitLines from './SplitLines';
import GalleryViewfinder from './GalleryViewfinder';
import useDecodedImages from './useDecodedImages';
import useScramble from './useScramble';
import useTamedVideo from './useTamedVideo';
import { FRAMES, WARM_ON_ARRIVAL } from './galleryFrames';
import { CINEMA, PLAIN } from './motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Aarohan — NIT Durgapur's techno-management fest, with an arcade motion pass.
 *
 * Five sections: Hero → Marquee → About → Gallery → Events.
 *
 * ── Performance contract ──
 *
 * The hero video is 93 MB and the gallery photos are ~45 MB of JPEGs, four of
 * them unprocessed camera originals (ARHN6 is 14.9 MB, ARHN4 13.0 MB, ARHN5
 * 9.2 MB, ARHN2 6.8 MB). The assets are staying as they are, so the discipline
 * has to live here:
 *
 *   · useTamedVideo defers the video's src past first paint and pauses it once
 *     the hero leaves — past the hero it is fully occluded by .aarohan's own
 *     opaque background, so it was buffering bytes nobody could see.
 *   · The gallery mounts exactly one full-size image at a time. See
 *     GalleryViewfinder.js for why the previous pinned deck could not: it
 *     promoted seven full-stage compositor layers of multi-megapixel bitmaps at
 *     once, and re-rastering those mid-scrub is what made the page stutter.
 *   · useDecodedImages warms only the gallery thumbnails plus the first frame,
 *     sequentially. It used to force all seven full-size images through decode
 *     in a single Promise.all, which was a large synchronous memory spike.
 *   · Everything scrubbed animates transform or opacity. No `filter` is applied
 *     to a gallery photo anywhere — a per-frame filter on a full-bleed 14.9 MB
 *     image is the most expensive thing this page could do. The gallery's
 *     chromatic aberration is done with offset border layers instead.
 *   · will-change is never declared statically on a gallery image.
 *
 * ── Tiering ──
 *
 * Every effect is inside gsap.matchMedia() with the CINEMA/PLAIN queries from
 * motion.js. PLAIN (phones, or prefers-reduced-motion) gets no boot screen, no
 * glitch, no scanlines, no video — a plain vertical page.
 *
 * The gallery is deliberately outside that split. It is the same component at
 * every width, because nothing about it is coupled to scroll: no pin, no scrub,
 * no ScrollTrigger. That is what removed the stutter, and it also removed a
 * whole tier of conditional CSS.
 *
 * Note ScrollTrigger.config({ ignoreMobileResize: true }) is already set once in
 * Pages/AboutUs/AboutUs.js, and App.js imports every route eagerly, so it
 * applies here too. Deliberately not duplicated.
 */

/* ─── Data ─── */
/* Gallery frames live in galleryFrames.js — same content/component split as
   ../AboutUs/aboutContent.js. */

const festEvents = [
  { title: 'WDCT Corner', img: WdctCornar, desc: 'The only creativity is one\'s own. The creative mind begins where regular logic ends.' },
  { title: 'Decathlon', img: decathalon, desc: 'Gear up and place yourself in tactical shoes as Team Aavishkar brings Decathlon.' },
  { title: 'Conjecture', img: conjecture, desc: 'Does your mind wander off from reality wondering about crazy outcomes? An adventurous riddle hunt awaits.' },
  { title: 'Game of Recruitment', img: GOR, desc: 'Test your analytical skills in intense group discussions and a mind-numbing mock interview.' },
  { title: 'Inspiratie', img: inspiratie, desc: 'Interact with eminent leaders, entrepreneurs, and visionary guest speakers live.' },
  { title: 'Case Study Comp', img: acsc, desc: 'Showcase your business acumen and analytical skills in solving real-world case studies.' },
  { title: 'Techmela', img: techmela, desc: 'Explore innovation that changes the world through high-impact hardware and software prototypes.' },
  { title: 'On Spot Hackathon', img: OSH, desc: 'Showcase your rapid prototyping and coding skills to build functional solutions live.' },
  { title: 'Maidan-E-Creative', img: MEC, desc: 'A week full of imagination bringing digital creations alive in Adobe Illustrator and Photoshop.' },
  { title: 'Red Odyssey', img: redode, desc: 'Embark on a Mars quest expedition by designing a rover to conquer rugged terrain obstacles.' },
];

const marqueeItems = festEvents.map((e) => e.title);

/* Stats are data now rather than hardcoded markup, so the counters can be driven
   from `end` and formatted consistently. Prize pool counts 0→5 and formats as
   "₹5 Lakhs+", which is why prefix/suffix are separate from the number. */
const STATS = [
  { icon: Trophy, end: 30, prefix: '', suffix: '+', label: 'Flagship Events' },
  { icon: Users, end: 3000, prefix: '', suffix: '+', label: 'Footfall' },
  { icon: Award, end: 5, prefix: '₹', suffix: ' Lakhs+', label: 'Prize Pool' },
];

const formatStat = (value, prefix, suffix) =>
  prefix + Math.round(value).toLocaleString() + suffix;

/* Authored line breaks — SplitLines splits on \n, so the reveal rhythm is
   intentional rather than a side effect of viewport width. Each line is short
   enough not to wrap inside the 750px lead column. */
const HERO_LEAD = `Aarohan means to conquer greater heights. As the annual
Techno-Management festival of NIT Durgapur, it dares youth to
elevate their limits and defy standard boundaries. Celebrate
technology, innovation, and perfection.`;

const ABOUT_HEADING = 'Where innovation meets ambition.';
const GALLERY_HEADING = 'Aarohan in frames.';
const EVENTS_HEADING = 'Events in Aarohan';

/* ─── Component ─── */
const Aarohan = () => {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const gridRef = useRef(null);
  const marqueeNudgeRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef(null);
  const counterRef = useRef(null);
  const aboutRef = useRef(null);
  const aboutHeadingRef = useRef(null);
  const galleryHeadingRef = useRef(null);
  const eventsHeadingRef = useRef(null);
  const eventsGridRef = useRef(null);

  /* Thumbnails plus the first frame only, warmed sequentially. The viewfinder
     handles the rest on demand. */
  useDecodedImages(WARM_ON_ARRIVAL);

  /* Poster + deferred src + pause-when-offscreen. Returns null src on PLAIN, so
     a phone never requests 93 MB. */
  const { src: videoSrc } = useTamedVideo(videoRef, heroRef, arhnvd);

  /* Section headings decode from noise, scrubbed so they re-scramble on the way
     back up. */
  useScramble(aboutHeadingRef, ABOUT_HEADING);
  useScramble(galleryHeadingRef, GALLERY_HEADING);
  useScramble(eventsHeadingRef, EVENTS_HEADING);

  /* ═══ Page-level motion ═══ */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(CINEMA, () => {
      /* ── Hero background goes opaque, hiding the video ──
         The CSS `transition: background-color` that used to be on .aarohan was
         removed: a CSS transition and a scrubbed tween competing for the same
         property is exactly what makes a scrub feel laggy and imprecise. */
      if (mainRef.current) {
        gsap.to(mainRef.current, {
          backgroundColor: '#0d0d0d',
          ease: 'none',
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top -20%',
            end: 'top -70%',
            scrub: 1.5,
          },
        });
      }

      /* ── Opening titles ──
         The title's clip-path wipe is a one-shot on mount, which is right for an
         entrance. Its *ongoing* glitch lives in GlitchText and is driven by
         scroll velocity. They animate different elements (this the h1, that the
         inner span) so they can't fight over a transform. */
      const intro = gsap.timeline({ delay: 0.15 });

      if (titleRef.current) {
        intro
          .fromTo(
            titleRef.current,
            { clipPath: 'inset(0 100% 0 0)', autoAlpha: 0 },
            { clipPath: 'inset(0 0% 0 0)', autoAlpha: 1, duration: 0.8, ease: 'power3.inOut' }
          );
      }

      if (heroRef.current) {
        intro.fromTo(
          heroRef.current.querySelectorAll('.arhn-line__inner'),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.85, stagger: 0.07, ease: 'power4.out' },
          '-=0.35'
        );
      }

      /* ── Stats: cards in, then the numbers count up ──
         Counting is part of the *entrance*, not a scroll scrub. These sit above
         the fold, so a scroll-scrubbed counter would already be part-way through
         its range on arrival — the reader would land on "1,800+" and only reach
         "3,000+" by scrolling down. An entrance also doesn't need to reverse.
         (The About page's stats are mid-page, which is why scrubbing is right
         there and wrong here.) */
      if (statsRef.current) {
        const statEls = gsap.utils.toArray(`.${styles.statVal}`, statsRef.current);

        /* React renders the final values, which is what a no-JS reader and a
           crawler should see. Zeroing them here is safe because useLayoutEffect
           runs before paint — the final values never flash on screen. */
        statEls.forEach((el) => {
          el.textContent = formatStat(0, el.dataset.prefix || '', el.dataset.suffix || '');
        });

        intro.fromTo(
          statsRef.current.children,
          { y: 26, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.09,
            ease: 'power3.out',
            /* Hand the transform back to CSS when the entrance finishes.
               Without this GSAP leaves `transform: translate(0,0)` inline, and an
               inline transform beats a stylesheet rule — so
               `.statCard:hover { transform: translateY(-4px) }` would silently
               stop working. (It was already broken this way before this pass.) */
            clearProps: 'transform',
          },
          '-=0.4'
        );

        /* A label rather than a relative offset: all three counters must start
           together, and '-=' inside a loop would stack each one earlier than the
           last. */
        intro.addLabel('counters');

        statEls.forEach((el) => {
          const target = Number(el.dataset.target);
          const prefix = el.dataset.prefix || '';
          const suffix = el.dataset.suffix || '';
          const counter = { value: 0 };

          intro.to(
            counter,
            {
              value: target,
              duration: 1.2,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = formatStat(counter.value, prefix, suffix);
              },
            },
            'counters'
          );
        });
      }

      /* ── Wireframe grid parallax ──
         A fixed layer of two CSS gradients. Transform only. */
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          y: 160,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        });
      }

      /* ── Marquee reacts to scroll ──
         The CSS keyframe animation stays on .marqueeTrack; GSAP nudges a
         *separate wrapper* element. Two transforms on two elements, so the
         infinite CSS animation and the scroll nudge never overwrite each other. */
      if (marqueeNudgeRef.current) {
        const nudge = gsap.quickTo(marqueeNudgeRef.current, 'x', {
          duration: 0.5,
          ease: 'power3',
        });

        ScrollTrigger.create({
          trigger: marqueeNudgeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            // Signed velocity, so scrolling up pushes the strip the other way.
            const v = gsap.utils.clamp(-1, 1, self.getVelocity() / 2400);
            nudge(v * -36);
          },
        });
      }

      /* ── About section ──
         'play none none reverse' rather than the previous
         'play none none none', which froze on the way back up. */
      if (aboutRef.current) {
        gsap.fromTo(
          aboutRef.current.querySelectorAll('.arhn-about-animate'),
          { y: 50, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      /* ── Events grid ── */
      if (eventsGridRef.current) {
        gsap.fromTo(
          eventsGridRef.current.querySelectorAll(`.${styles.eventCard}`),
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            // Same reason as the stat cards: give the transform back to CSS so
            // `.eventCard:hover { transform: translateY(-4px) }` still fires.
            clearProps: 'transform',
            scrollTrigger: {
              trigger: eventsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    /* Mobile / tablet / reduced-motion tier.
       If reduced motion is requested, render static.
       Otherwise, play sleek lightweight mobile animations. */
    mm.add(PLAIN, () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        const visible = { autoAlpha: 1, y: 0, yPercent: 0, clipPath: 'none' };
        if (titleRef.current) gsap.set(titleRef.current, visible);
        if (heroRef.current) gsap.set(heroRef.current.querySelectorAll('.arhn-line__inner'), { yPercent: 0 });
        if (statsRef.current) gsap.set(statsRef.current.children, { autoAlpha: 1, y: 0 });
        if (aboutRef.current) gsap.set(aboutRef.current.querySelectorAll('.arhn-about-animate'), { autoAlpha: 1, y: 0 });
        if (eventsGridRef.current) {
          gsap.set(eventsGridRef.current.querySelectorAll(`.${styles.eventCard}`), { autoAlpha: 1, y: 0 });
        }
        if (statsRef.current) {
          gsap.utils.toArray(`.${styles.statVal}`, statsRef.current).forEach((el) => {
            el.textContent = formatStat(
              Number(el.dataset.target),
              el.dataset.prefix || '',
              el.dataset.suffix || ''
            );
          });
        }
        return;
      }

      // ── Mobile / Tablet Opening Entrance ──
      const mobileIntro = gsap.timeline({ delay: 0.1 });

      if (titleRef.current) {
        mobileIntro.fromTo(
          titleRef.current,
          { clipPath: 'inset(0 100% 0 0)', autoAlpha: 0 },
          { clipPath: 'inset(0 0% 0 0)', autoAlpha: 1, duration: 0.75, ease: 'power3.inOut' }
        );
      }

      if (heroRef.current) {
        mobileIntro.fromTo(
          heroRef.current.querySelectorAll('.arhn-line__inner'),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out' },
          '-=0.3'
        );
      }

      // ── Mobile Stats Entrance & Count Up ──
      if (statsRef.current) {
        const statEls = gsap.utils.toArray(`.${styles.statVal}`, statsRef.current);
        statEls.forEach((el) => {
          el.textContent = formatStat(0, el.dataset.prefix || '', el.dataset.suffix || '');
        });

        mobileIntro.fromTo(
          statsRef.current.children,
          { y: 22, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'transform',
          },
          '-=0.35'
        );

        mobileIntro.addLabel('mobileCounters');

        statEls.forEach((el) => {
          const target = Number(el.dataset.target);
          const prefix = el.dataset.prefix || '';
          const suffix = el.dataset.suffix || '';
          const counter = { value: 0 };

          mobileIntro.to(
            counter,
            {
              value: target,
              duration: 1.1,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = formatStat(counter.value, prefix, suffix);
              },
            },
            'mobileCounters'
          );
        });
      }

      // ── Mobile Marquee Velocity Nudge ──
      if (marqueeNudgeRef.current) {
        const nudge = gsap.quickTo(marqueeNudgeRef.current, 'x', {
          duration: 0.45,
          ease: 'power3',
        });

        ScrollTrigger.create({
          trigger: marqueeNudgeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-1, 1, self.getVelocity() / 2400);
            nudge(v * -25);
          },
        });
      }

      // ── Mobile About Section Scroll Reveal ──
      if (aboutRef.current) {
        gsap.fromTo(
          aboutRef.current.querySelectorAll('.arhn-about-animate'),
          { y: 35, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: aboutRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // ── Mobile Events Grid Stagger Entrance ──
      if (eventsGridRef.current) {
        gsap.fromTo(
          eventsGridRef.current.querySelectorAll(`.${styles.eventCard}`),
          { y: 35, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.06,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: eventsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div className={styles.main}>
      {/* One-shot terminal cold-start. Renders null on PLAIN and after the
          first visit in a session. */}
      <BootSequence />

      {/* Fixed instrument overlay. */}
      <HudFrame />

      {/* Video Background & Mobile Poster */}
      <div className={styles.back}>
        <video
          ref={videoRef}
          muted
          autoPlay
          loop
          playsInline
          poster={ARHN3}
          preload="metadata"
          {...(videoSrc ? { src: videoSrc } : {})}
        />
        <div className={styles.videoOverlay} />
      </div>

      <div className={styles.aarohan} ref={mainRef}>
        {/* Wireframe grid — parallaxes with scroll. Decorative.
            Lives inside .aarohan, not beside it: .aarohan's background scrubs to
            opaque #0d0d0d, so a sibling behind it would be painted over. As a
            z-index:-1 child of a stacking context it paints after .aarohan's
            background but before its content, which is exactly where it belongs. */}
        <div className={styles.grid} ref={gridRef} aria-hidden="true" />

        {/* ═══ Hero ═══ */}
        <div className={styles.header} ref={heroRef}>
          <h1 ref={titleRef} className={styles.festTitle}>
            <GlitchText text="AAROHAN" />
          </h1>
          <p className={styles.festSubtitle}>
            NIT Durgapur's Annual Techno-Management Festival
          </p>
          <SplitLines
            text={HERO_LEAD}
            tag="p"
            className={styles.heroLead}
          />

          {/* Stats */}
          <div className={styles.statsBar} ref={statsRef}>
            {STATS.map(({ icon: Icon, end, prefix, suffix, label }) => (
              <SpotlightCard
                key={label}
                className={styles.statCard}
                spotlightColor="rgba(184, 212, 116, 0.25)"
              >
                <Icon size={24} className="text-[#b8d474] mb-1" />
                <div
                  className={styles.statVal}
                  data-target={end}
                  data-prefix={prefix}
                  data-suffix={suffix}
                >
                  {formatStat(end, prefix, suffix)}
                </div>
                <div className={styles.statLab}>{label}</div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* ═══ Marquee Strip ═══ */}
        <div className={styles.marqueeWrap} aria-hidden="true">
          {/* The nudge wrapper exists so GSAP has its own element to transform,
              leaving the infinite CSS animation on .marqueeTrack untouched. */}
          <div className={styles.marqueeNudge} ref={marqueeNudgeRef}>
            <div className={styles.marqueeTrack}>
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className={styles.marqueeItem}>
                  {item} <span className={styles.marqueeDot}>◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ About Section ═══ */}
        <section className={styles.aboutSection} ref={aboutRef}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <span className={`${styles.sectionKicker} arhn-about-animate`}>
                The Festival
              </span>
              <h2
                className={`${styles.aboutHeading} arhn-about-animate`}
                ref={aboutHeadingRef}
              >
                {/* Ghost holds the box at the final text's exact size; the live
                    layer is absolutely positioned and free to scramble to any
                    width without moving layout. */}
                <span className="arhn-scramble">
                  <span className="arhn-scramble__ghost">{ABOUT_HEADING}</span>
                  <span className="arhn-scramble__live">{ABOUT_HEADING}</span>
                </span>
              </h2>
              <p className={`${styles.aboutBody} arhn-about-animate`}>
                Born from the spirit of NIT Durgapur's Centre for Cognitive Activities, Aarohan is where
                engineering precision meets entrepreneurial vision. Over three days, students from across
                India compete, create, and collaborate across technical challenges, management simulations,
                and creative showcases.
              </p>
              <p className={`${styles.aboutBody} arhn-about-animate`}>
                From robotic duels to hackathons, from case study battles to design marathons — Aarohan
                is the proving ground for minds that refuse to stay inside the classroom.
              </p>
            </div>
            <div className={`${styles.aboutImages} arhn-about-animate`}>
              <img src={ARHN1} alt="Aarohan inauguration" className={styles.aboutImg1} />
              <img src={ARHN3} alt="Aarohan cultural night" className={styles.aboutImg2} />
            </div>
          </div>
        </section>

        {/* ═══ Photo Gallery ═══
            A viewfinder plus a contact sheet. Not pinned and not scroll-coupled
            — see GalleryViewfinder.js for why the previous pinned deck was the
            worst possible container for these particular assets. */}
        <section className={styles.gallerySection}>
          <div className={styles.gallerySectionHeader}>
            <div className={styles.galleryBadgeRow}>
              <span className={styles.galleryCategory}>MOMENTS</span>
              {/* Initial value only. The viewfinder owns the active index and
                  writes this node plus HudFrame's readout on every change, so
                  the two stay in lockstep. */}
              <span className={styles.galleryCounter} ref={counterRef}>
                FRAME 01 / {String(FRAMES.length).padStart(2, '0')}
              </span>
            </div>
            <h3 className={styles.gallerySectionTitle} ref={galleryHeadingRef}>
              <span className="arhn-scramble">
                <span className="arhn-scramble__ghost">{GALLERY_HEADING}</span>
                <span className="arhn-scramble__live">{GALLERY_HEADING}</span>
              </span>
            </h3>
            <p className={styles.gallerySectionLead}>
              A visual chronicle of national competitions, arenas, keynote stages, and celebratory nights.
            </p>
          </div>

          <GalleryViewfinder counterRef={counterRef} />
        </section>

        {/* ═══ Events Grid ═══ */}
        <section className={styles.eventsSection}>
          <div className={styles.eventsSectionHeader}>
            <span className={styles.sectionKicker}>Our Events</span>
            <h3 className={styles.eventsSectionTitle} ref={eventsHeadingRef}>
              <span className="arhn-scramble">
                <span className="arhn-scramble__ghost">{EVENTS_HEADING}</span>
                <span className="arhn-scramble__live">{EVENTS_HEADING}</span>
              </span>
            </h3>
          </div>
          <div className={styles.eventsGrid} ref={eventsGridRef}>
            {festEvents.map((evt) => (
              <SpotlightCard
                key={evt.title}
                className={styles.eventCard}
                spotlightColor="rgba(184, 212, 116, 0.15)"
              >
                {/* data-cursor-text sits on the existing inner elements rather
                    than a new wrapper: SpotlightCard doesn't spread unknown
                    props, and CustomCursor uses closest() so either one works. */}
                <div className={styles.eventCardImgWrap} data-cursor-text="EVENT">
                  <img src={evt.img} alt={evt.title} loading="lazy" decoding="async" />
                </div>
                <div className={styles.eventCardContent} data-cursor-text="EVENT">
                  <h4>{evt.title}</h4>
                  <p>{evt.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Aarohan;
