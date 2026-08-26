import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { FINALE_LINKS } from '../aboutContent';
import { CINEMA, PLAIN } from '../motion';

/**
 * Act 5 — The Finale.
 *
 * Closing shot. The page background scrubs from the cinematic near-black
 * (#0a0a0a) to #1b1b1b across this act, which is exactly the site footer's
 * background (Components/Footer/Footer.css) — so the film doesn't end on a hard
 * seam against the footer, it dissolves into it.
 *
 * Takes the page root as a prop rather than reaching for it, since the
 * background being animated belongs to the orchestrator, not to this act.
 */
export default function Finale({ pageRef }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(CINEMA, () => {
      const root = rootRef.current;
      if (!root) return;

      gsap.fromTo(
        root.children,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 80%' },
        }
      );

      // Dissolve into the footer.
      if (pageRef?.current) {
        gsap.to(pageRef.current, {
          backgroundColor: '#1b1b1b',
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 70%',
            end: 'bottom bottom',
            scrub: 1,
          },
        });
      }
    });

    // Mobile / tablet: staggered entrance, dissolve into footer.
    mm.add(PLAIN, () => {
      const root = rootRef.current;
      if (!root) return;

      gsap.fromTo(
        root.children,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 80%' },
        }
      );

      // Dissolve into footer on mobile too.
      if (pageRef?.current) {
        gsap.to(pageRef.current, {
          backgroundColor: '#1b1b1b',
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 70%',
            end: 'bottom bottom',
            scrub: 1,
          },
        });
      }
    });

    return () => mm.revert();
  }, [pageRef]);

  return (
    <section ref={rootRef} className="finale">
      <span className="finale__kicker">Continue the journey</span>
      <h2 className="finale__heading">The story is built in real time.</h2>
      <p className="finale__sub">
        Explore our annual festival, meet the people who build it, or dive into our
        specialised cells.
      </p>

      <nav className="finale__links" aria-label="Continue exploring">
        {FINALE_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="finale__link"
            data-cursor-text={link.cursor}
          >
            <span>{link.label}</span>
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </nav>
    </section>
  );
}
