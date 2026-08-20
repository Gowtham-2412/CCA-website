import React, { useRef, useEffect, useLayoutEffect } from 'react';
import styles from './Aarohan.module.css';
import './Aarohan.css';
import {
  WdctCornar, decathalon, GOR, OSH, MEC,
  conjecture, inspiratie, redode, techmela, acsc,
  ARHN1, ARHN2, ARHN3, ARHN4, ARHN5, ARHN6, ARHN7, ARHN8,
} from '../../Assets/Images';
import { arhnvd } from '../../Assets/Videos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from '../../Components/UI/SpotlightCard';
import { Trophy, Users, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const galleryImages = [
  { src: ARHN1, caption: 'Grand Inauguration' },
  { src: ARHN2, caption: 'Robotics Arena' },
  { src: ARHN3, caption: 'Cultural Nights' },
  { src: ARHN4, caption: 'Hackathon' },
  { src: ARHN5, caption: 'Inspiratie Talks' },
  { src: ARHN6, caption: 'Decathlon Battle' },
  { src: ARHN8, caption: 'Closing Ceremony' },
];

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

/* ─── Component ─── */
const Aarohan = () => {
  const mainRef = useRef(null);
  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const gallerySectionRef = useRef(null);
  const galleryStageRef = useRef(null);
  const cardsRef = useRef([]);
  const counterRef = useRef(null);
  const aboutRef = useRef(null);
  const eventsGridRef = useRef(null);

  /* Hero → light background transition */
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        backgroundColor: '#0d0d0d',
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: 'top -20%',
          end: 'top -70%',
          scrub: 1.5,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* Title glitch animation */
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(el,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power3.inOut' }
    )
    .to(el, { x: -4, duration: 0.05, yoyo: true, repeat: 5, ease: 'steps(1)' }, '-=0.2')
    .to(el, { x: 0, duration: 0.1 });

    return () => tl.kill();
  }, []);

  /* Lead text fade in */
  useEffect(() => {
    const el = leadRef.current;
    if (!el) return;

    gsap.fromTo(el,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: 'power3.out' }
    );
  }, []);

  /* About section parallax */
  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const elements = el.querySelectorAll('.arhn-about-animate');
      gsap.fromTo(elements,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  /* Pinned Stacking Gallery Animation */
  useLayoutEffect(() => {
    const section = gallerySectionRef.current;
    const stage = galleryStageRef.current;
    if (!section || !stage) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;
      const stepOffset = isMobile ? 18 : 24;

      // Set initial positions:
      // Card 0 is active at center (y: 0), Cards 1..N-1 are positioned offscreen below
      gsap.set(cards[0], {
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 1,
      });

      cards.forEach((card, i) => {
        if (i > 0) {
          gsap.set(card, {
            yPercent: 120,
            scale: 0.98,
            filter: 'blur(0px)',
            opacity: 1,
            zIndex: i + 1,
          });
        }
      });

      const totalTransitions = cards.length - 1; // 6 transitions for 7 cards

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: 'top top',
          end: () => `+=${totalTransitions * 175}vh`,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (counterRef.current) {
              const activeIndex = Math.min(
                cards.length,
                Math.floor(self.progress * totalTransitions) + 1
              );
              counterRef.current.innerText = `FRAME 0${activeIndex} / 0${cards.length}`;
            }
          },
        },
      });

      // Animate cards sequentially with slow, gentle opacity fade (no black darkening)
      for (let i = 1; i < cards.length; i++) {
        const currentCard = cards[i];
        const timePos = (i - 1) * 1.4;

        // Current card i rises up from below to y: 0
        tl.to(
          currentCard,
          {
            yPercent: 0,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            opacity: 1,
            duration: 1.2,
            ease: 'power2.inOut',
          },
          timePos
        );

        // All previous cards (0 to i-1) shift up slightly, blur gently, and slowly fade opacity without turning black
        for (let j = 0; j < i; j++) {
          const depth = i - j; // how many cards are on top of card j
          const targetY = -depth * stepOffset;
          const blurVal = Math.min(3.5, depth * 0.7);
          const opacityVal = Math.max(0.65, 1 - depth * 0.06);
          const scaleVal = Math.max(0.92, 1 - depth * 0.015);

          tl.to(
            cards[j],
            {
              y: targetY,
              filter: `blur(${blurVal}px)`,
              opacity: opacityVal,
              scale: scaleVal,
              duration: 1.2,
              ease: 'power2.inOut',
            },
            timePos
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  /* Events grid stagger */
  useEffect(() => {
    const el = eventsGridRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll(`.${styles.eventCard}`);
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.main}>
      {/* Video Background */}
      <div className={styles.back}>
        <video muted autoPlay loop playsInline src={arhnvd} />
        <div className={styles.videoOverlay} />
      </div>

      <div className={styles.aarohan} ref={mainRef}>
        {/* ═══ Hero ═══ */}
        <div className={styles.header}>
          <h1 ref={titleRef} className={styles.festTitle}>
            AAROHAN
          </h1>
          <p className={styles.festSubtitle}>
            NIT Durgapur's Annual Techno-Management Festival
          </p>
          <p ref={leadRef} className={styles.heroLead}>
            Aarohan means to conquer greater heights. As the annual Techno-Management festival of NIT Durgapur,
            it dares youth to elevate their limits and defy standard boundaries. Celebrate technology, innovation, and perfection.
          </p>

          {/* Stats */}
          <div className={styles.statsBar}>
            <SpotlightCard className={styles.statCard} spotlightColor="rgba(184, 212, 116, 0.25)">
              <Trophy size={24} className="text-[#b8d474] mb-1" />
              <div className={styles.statVal}>30+</div>
              <div className={styles.statLab}>Flagship Events</div>
            </SpotlightCard>
            <SpotlightCard className={styles.statCard} spotlightColor="rgba(184, 212, 116, 0.25)">
              <Users size={24} className="text-[#b8d474] mb-1" />
              <div className={styles.statVal}>3000+</div>
              <div className={styles.statLab}>Footfall</div>
            </SpotlightCard>
            <SpotlightCard className={styles.statCard} spotlightColor="rgba(184, 212, 116, 0.25)">
              <Award size={24} className="text-[#b8d474] mb-1" />
              <div className={styles.statVal}>₹5 Lakhs+</div>
              <div className={styles.statLab}>Prize Pool</div>
            </SpotlightCard>
          </div>
        </div>

        {/* ═══ Marquee Strip ═══ */}
        <div className={styles.marqueeWrap} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={styles.marqueeItem}>
                {item} <span className={styles.marqueeDot}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* ═══ About Section ═══ */}
        <section className={styles.aboutSection} ref={aboutRef}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <span className="arhn-about-animate" style={{ display: 'block', fontFamily: "'SupplyMono', monospace", fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#b8d474', marginBottom: '1rem' }}>
                The Festival
              </span>
              <h2 className={`${styles.aboutHeading} arhn-about-animate`}>
                Where innovation meets ambition.
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

        {/* ═══ Pinned Stacking Photo Gallery ═══ */}
        <section className={styles.gallerySection} ref={gallerySectionRef}>
          <div className={styles.gallerySectionHeader}>
            <div className={styles.galleryBadgeRow}>
              <span className={styles.galleryCategory}>MOMENTS</span>
              <span className={styles.galleryCounter} ref={counterRef}>
                FRAME 01 / 0{galleryImages.length}
              </span>
            </div>
            <h3 className={styles.gallerySectionTitle}>Aarohan in frames.</h3>
            <p className={styles.gallerySectionLead}>
              A visual chronicle of national competitions, arenas, keynote stages, and celebratory nights.
            </p>
          </div>

          <div className={styles.galleryStage} ref={galleryStageRef}>
            {galleryImages.map((img, i) => (
              <div
                className={styles.galleryCard}
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                style={{ zIndex: i + 1 }}
              >
                {/* Full Bleed Card Media & Captions */}
                <div className={styles.galleryCardImgWrap}>
                  <img src={img.src} alt={img.caption} />
                  <div className={styles.galleryOverlay} />
                  <div className={styles.galleryCardContent}>
                    <span className={styles.galleryContentTag}>MOMENT 0{i + 1} / 0{galleryImages.length}</span>
                    <h4 className={styles.gallerySlideTitle}>{img.caption}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Events Grid ═══ */}
        <section className={styles.eventsSection}>
          <div className={styles.eventsSectionHeader}>
            <span style={{ fontFamily: "'SupplyMono', monospace", fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#b8d474' }}>
              Our Events
            </span>
            <h3 className={styles.eventsSectionTitle}>Events in Aarohan</h3>
          </div>
          <div className={styles.eventsGrid} ref={eventsGridRef}>
            {festEvents.map((evt, idx) => (
              <SpotlightCard key={idx} className={styles.eventCard} spotlightColor="rgba(184, 212, 116, 0.15)">
                <div className={styles.eventCardImgWrap}>
                  <img src={evt.img} alt={evt.title} />
                </div>
                <div className={styles.eventCardContent}>
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