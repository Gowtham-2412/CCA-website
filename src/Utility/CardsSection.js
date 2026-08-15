import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageTrailCursor from './ImageTrailCursor';


gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    title: 'Higher Potential',
    text: 'Together we accomplish more. Even the most complex builds move with relentless quality.',
  },
  {
    title: 'Full Capacity',
    text: 'We scale effort to match your deadline without ever cutting corners.',
  },
  {
    title: 'True Collaboration',
    text: 'We plug into your existing team and workflow like an extension of it.',
  },
  {
    title: 'Deep Experience',
    text: "15+ years building for agencies who can't afford to miss.",
  },
];

const TRAIL_IMAGES = [
  "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/16245254/pexels-photo-16245254/free-photo-of-chatgpt-a-chatbot-for-your-website.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2333293/pexels-photo-2333293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/604684/pexels-photo-604684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3308588/pexels-photo-3308588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

export default function CardsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || !cards.length) return;

    let trigger;
    const ctx = gsap.context(() => {
      const startY = window.innerHeight * 0.6 + cards[0].offsetHeight;

      gsap.set(cards, {
        y: startY,
        rotateX: 25,
        transformPerspective: 1200,
        transformOrigin: 'center bottom',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${cards.length * window.innerHeight}`,
          scrub: 0.6,
          anticipatePin: 1,
          pin: true,
          invalidateOnRefresh: true,

          onInit: (self) => {
            trigger = self;
          },
        },
      });

      tl.to(
        header,
        {
          scale: 0.8,
          ease: 'power2.out',
          duration: 1,
        },
        0,
      );

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            y: 0,
            rotateX: 0,
            ease: 'power3.out',
            duration: 1,
          },
          i,
        );

        cards.slice(0, i).forEach((prev, j) => {
          const depth = i - j;

          tl.to(
            prev,
            {
              scale: 1 - depth * 0.05,
              y: -depth * 14,
              filter: `brightness(${1 - depth * 0.12})`,
              ease: 'power2.out',
              duration: 1,
            },
            i,
          );
        });
      });
    }, section);

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill(true);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f1f1f1]"
    >
      <ImageTrailCursor images={TRAIL_IMAGES} containerRef={sectionRef} />

      <div ref={headerRef} className="text-center px-6 z-0">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900">
          What CCA can do for you, and why
          <br />
          you can count on.
        </h2>
        <p className="mt-4 max-w-md mx-auto text-neutral-500">
          We step in on high-stakes projects where execution can't fail, from
          rebrands and marketing campaigns to product launches.
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[10]">
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute w-[320px] rounded-2xl bg-white shadow-xl p-8 pointer-events-auto will-change-transform"
          >
            <h3 className="text-xl font-medium text-neutral-900">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-500">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
