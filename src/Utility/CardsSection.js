import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MoveRight } from 'lucide-react';

// Real CCA Assets
import carouselimg1 from '../Assets/Images/carouselimg1.JPG';
import robozido from '../Assets/Images/robozido.jpeg';
import designworkshop from '../Assets/Images/design workshop.jpeg';
import arhn1 from '../Assets/Images/ARHN1.jpeg';

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_CARDS = [
  {
    num: '01',
    category: 'Community & Culture',
    title: 'Find your people.',
    text: 'A collaborative space for students who learn fastest by building real things together outside the traditional classroom.',
    image: carouselimg1,
    link: '/about-us',
    linkText: 'Our Story',
  },
  {
    num: '02',
    category: 'Hardware & Fabrication',
    title: 'Make it real.',
    text: 'Move from initial sketches and circuit schematics to functional autonomous bots, competitive rovers, and physical hardware.',
    image: robozido,
    link: '/our-cells',
    linkText: 'Robo-Cell',
  },
  {
    num: '03',
    category: 'Design & Spatial Web',
    title: 'Cross the usual lines.',
    text: 'Deep research meets interactive web engineering, generative visual craft, and venture strategy for real-world impact.',
    image: designworkshop,
    link: '/our-cells',
    linkText: 'WDCT Lab',
  },
  {
    num: '04',
    category: 'National Fest & Legacy',
    title: 'Leave a lasting signal.',
    text: 'Organizing Aarohan, Eastern India’s major techno-management fest, and passing down institutional knowledge to the next cohort.',
    image: arhn1,
    link: '/aarohan',
    linkText: 'Aarohan Fest',
  },
];

export default function CardsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cards = track.querySelectorAll('.showcase-card');
      const totalCards = cards.length;

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + window.innerWidth * 0.15;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount() * 1.25}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) {
              gsap.set(progress, { scaleX: self.progress });
            }
            const curr = Math.min(
              totalCards - 1,
              Math.floor(self.progress * totalCards)
            );
            setActiveIndex(curr);
          },
        },
      });

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
      });

      cards.forEach((card) => {
        const img = card.querySelector('.showcase-card-img');

        if (img) {
          gsap.fromTo(
            img,
            { xPercent: 15, scale: 1.08 },
            {
              xPercent: -15,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        }

        gsap.fromTo(
          card,
          { scale: 0.94, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left center+=20%',
              end: 'center center-=20%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#f1f1f1] text-[#1b1b1b] flex flex-col justify-between py-8 sm:py-12 select-none border-t border-black/10"
    >
      {/* ─── Top Header & Active Step Indicator ─── */}
      <div className="px-6 sm:px-12 lg:px-20 flex items-end justify-between gap-6 z-10">
        <div>
          <span className="font-mono text-xs text-[#666666] tracking-[0.2em] uppercase block mb-1">
            Core Philosophy / 0{activeIndex + 1} of 0{SHOWCASE_CARDS.length}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight font-['PP_Frama',sans-serif] text-[#1b1b1b]">
            A place to make, learn and move forward.
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-3 font-mono text-xs text-neutral-500">
          <span>Scroll to explore</span>
          <MoveRight size={14} className="animate-pulse" />
        </div>
      </div>

      {/* ─── Pinned Horizontal Gallery Track ─── */}
      <div className="relative w-full flex-1 flex items-center overflow-visible my-auto">
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-10 pl-6 sm:pl-12 lg:pl-20 pr-32 will-change-transform"
        >
          {SHOWCASE_CARDS.map((card) => (
            <div
              key={card.num}
              className="showcase-card flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[52vw] max-w-[820px] h-[58vh] sm:h-[62vh] min-h-[380px] max-h-[540px] rounded-2xl md:rounded-3xl bg-white border border-black/10 shadow-xl overflow-hidden flex flex-col md:flex-row relative group transition-all duration-300 hover:border-black/25"
              data-cursor-text="INSPECT"
            >
              {/* Left Content Side */}
              <div className="w-full md:w-[50%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between order-2 md:order-1 relative z-10 bg-white">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-[#666666] uppercase tracking-widest">
                      {card.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#1b1b1b]">
                      {card.num}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1b1b1b] tracking-tight font-['PP_Frama',sans-serif] mt-1 leading-[1.05]">
                    {card.title}
                  </h3>

                  <p className="text-[#4a4a4a] text-xs sm:text-sm lg:text-base leading-relaxed mt-3 font-normal">
                    {card.text}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10 mt-4 flex items-center justify-between">
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#1b1b1b] hover:text-black font-semibold transition-colors group/link"
                    data-cursor-text="VISIT"
                  >
                    <span>{card.linkText}</span>
                    <ArrowUpRight
                      size={14}
                      className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                    />
                  </Link>
                  <span className="font-mono text-[10px] text-neutral-400 uppercase">
                    CCA NITD
                  </span>
                </div>
              </div>

              {/* Right Image Side with Parallax */}
              <div className="w-full md:w-[50%] h-[40%] md:h-full relative overflow-hidden order-1 md:order-2 bg-[#eae7dc]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="showcase-card-img w-full h-full object-cover filter contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Bottom Scrubbed Progress Bar ─── */}
      <div className="px-6 sm:px-12 lg:px-20 z-10 flex items-center justify-between gap-6">
        <div className="flex-1 h-[2px] bg-black/10 rounded-full overflow-hidden relative">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 bottom-0 w-full bg-[#1b1b1b] origin-left will-change-transform"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <div className="font-mono text-xs text-neutral-500 tracking-widest uppercase">
          0{activeIndex + 1} / 0{SHOWCASE_CARDS.length}
        </div>
      </div>
    </section>
  );
}
