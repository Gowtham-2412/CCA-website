import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
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
  { src: ARHN7, caption: 'Case Study Pitch' },
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
  const galleryViewportRef = useRef(null);
  const galleryTrackRef = useRef(null);
  const aboutRef = useRef(null);
  const eventsGridRef = useRef(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

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

  /* Horizontal gallery scroll */
  useLayoutEffect(() => {
    const track = galleryTrackRef.current;
    if (!track || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - track.parentElement.offsetWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: track.parentElement,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Staggered clip-path reveals
      const imgs = track.querySelectorAll('img');
      imgs.forEach((img, i) => {
        gsap.fromTo(img,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: img, start: 'left 90%', scrub: false, containerAnimation: gsap.getById?.('gallery-scroll') },
            delay: i * 0.08,
          }
        );
      });
    }, track.parentElement);

    return () => ctx.revert();
  }, []);

  /* Mobile gallery scroll tracking */
  useEffect(() => {
    const viewport = galleryViewportRef.current;
    if (!viewport || window.innerWidth >= 768) return;

    const handleScroll = () => {
      const scrollLeft = viewport.scrollLeft;
      const slideWidth = viewport.offsetWidth * 0.8;
      const newIndex = Math.min(
        galleryImages.length - 1,
        Math.max(0, Math.round(scrollLeft / slideWidth))
      );
      setActiveGalleryIndex(newIndex);
    };

    viewport.addEventListener('scroll', handleScroll, { passive: true });
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToGallerySlide = (index) => {
    const viewport = galleryViewportRef.current;
    if (!viewport) return;
    const slides = viewport.querySelectorAll(`.${styles.gallerySlide}`);
    if (slides[index]) {
      slides[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveGalleryIndex(index);
    }
  };

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

        {/* ═══ Horizontal Photo Gallery ═══ */}
        <section className={styles.gallerySection}>
          <div className={styles.gallerySectionHeader}>
            <span style={{ fontFamily: "'SupplyMono', monospace", fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#b8d474' }}>
              Moments
            </span>
            <h3 className={styles.gallerySectionTitle}>Aarohan in frames.</h3>
          </div>
          <div className={styles.galleryViewport} ref={galleryViewportRef}>
            <div className={styles.galleryTrack} ref={galleryTrackRef}>
              {galleryImages.map((img, i) => (
                <div className={styles.gallerySlide} key={i}>
                  <img src={img.src} alt={img.caption} />
                  <span className={styles.galleryCaption}>{img.caption}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Interactive Pagination Dots */}
          <div className={styles.galleryDots} aria-label="Gallery navigation">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                className={`${styles.galleryDot} ${activeGalleryIndex === i ? styles.galleryDotActive : ''}`}
                onClick={() => scrollToGallerySlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
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