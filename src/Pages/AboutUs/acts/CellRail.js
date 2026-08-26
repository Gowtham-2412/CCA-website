import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { CELLS } from '../aboutContent';
import { CINEMA, PLAIN } from '../motion';

/**
 * Act 3 — The Cell Rail. New in this rebuild.
 *
 * Vertical scroll drives horizontal travel across the five cells. It's the
 * act that most reads as "film" rather than "web page", and it gives the page a
 * real payoff: five doors into the cell routes instead of another block of prose.
 *
 * Content is mirrored from CELLS_DATA in Our-Cells/OurCells.js, so the two pages
 * describe the cells identically.
 *
 * Asset note: a horizontal rail composites every panel simultaneously, so it
 * uses the five cell photos (~852 KB for all five). The 13 MB chapter JPEGs are
 * deliberately kept out of this act entirely.
 *
 * Below 900px the pin is dropped for a native swipe with scroll-snap — pinned
 * horizontal scroll fights touch scrolling and reliably feels broken on a phone.
 */
export default function CellRail() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(CINEMA, () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      // The exact distance the track must travel to bring its right edge flush
      // with the viewport's right edge. Function-based + invalidateOnRefresh so
      // it survives resize and late image decode.
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      // On a very wide viewport every panel may already fit, leaving nothing to
      // travel. Pinning for zero distance would trap the reader in a dead
      // section, so leave the rail as a static row instead.
      if (distance() === 0) return;

      const horizontal = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          // 1px of scroll per 1px of horizontal travel. The heading sits above
          // the track and is already on screen when the pin engages, so no
          // lead-in padding is needed here.
          end: () => '+=' + distance(),
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Panels lift slightly as they cross the centre of the viewport.
      // containerAnimation maps these triggers onto the horizontal tween above,
      // so start/end read as horizontal positions within the track. Hold the
      // tween in a variable rather than looking it up — a lookup could resolve
      // to the wrong tween once other tweens touch this element.
      gsap.utils.toArray('.cell-panel', root).forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 38 },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: 'left right',
              end: 'center center',
              scrub: true,
            },
          }
        );
      });
    });

    // Mobile / tablet: native swipe with entrance animations.
    mm.add(PLAIN, () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;
      gsap.set(track, { x: 0 });

      // Header fades up.
      const header = root.querySelector('.rail__header');
      if (header) {
        gsap.fromTo(
          header.children,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: header, start: 'top 80%' },
          }
        );
      }

      // Each cell panel slides up as it enters the viewport.
      gsap.utils.toArray('.cell-panel', root).forEach((panel, i) => {
        gsap.fromTo(
          panel,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            delay: i * 0.06,
            ease: 'power2.out',
            scrollTrigger: { trigger: panel, start: 'top 88%' },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="rail">
      <header className="rail__header">
        <span className="rail__kicker">The Collective</span>
        <h2 className="rail__heading">Five cells. One body.</h2>
      </header>

      <div className="rail__viewport">
        <div ref={trackRef} className="rail__track">
          {CELLS.map((cell) => (
            <article className="cell-panel" key={cell.id}>
              <Link to={cell.path} className="cell-panel__link" data-cursor-text="EXPLORE">
                <div className="cell-panel__media">
                  <img src={cell.image} alt={cell.title} loading="lazy" decoding="async" />
                </div>

                <div className="cell-panel__body">
                  <span className="cell-panel__id">{cell.id}</span>
                  <h3 className="cell-panel__title">{cell.title}</h3>
                  <span className="cell-panel__category">{cell.category}</span>
                  <p className="cell-panel__role">{cell.role}</p>
                  <span className="cell-panel__cta">
                    Enter <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
