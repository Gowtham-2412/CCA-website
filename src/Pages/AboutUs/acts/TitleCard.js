import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { CINEMA, PLAIN } from '../motion';

const TITLE = 'ABOUT US';

/**
 * Act 0 — The Title Card.
 *
 * Holds 150vh of scroll. Two jobs:
 *   1. Open the film — per-letter mask reveal on mount.
 *   2. Buy time — this is the window in which useDecodedImages warms the two
 *      13 MB chapter JPEGs, so nothing heavy decodes mid-pin later.
 *
 * On scroll the title dollies away (scale down + fade) while the letterbox bars
 * close in, handing off to the iris.
 */
export default function TitleCard() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(CINEMA, () => {
      const root = rootRef.current;
      if (!root) return;

      const letters = root.querySelectorAll('.title-card__letter');
      const hint = root.querySelector('.title-card__hint');
      const frame = root.querySelector('.title-card__frame');

      // ── Opening: letters rise out of their masks ──
      const intro = gsap.timeline({ delay: 0.15 });
      intro
        .fromTo(
          letters,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.1, stagger: 0.055, ease: 'power4.out' }
        )
        .fromTo(hint, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.4');

      // ── Scroll: the title recedes.
      // scale + autoAlpha only. Deliberately no blur filter here: this element
      // is the full viewport width, and scrubbing a filter on it costs a repaint
      // every frame. The scale-down alone reads as a dolly-out.
      gsap.to(frame, {
        scale: 0.72,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
        },
      });

      gsap.to(hint, {
        autoAlpha: 0,
        y: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '35% top',
          scrub: 0.6,
        },
      });
    });

    // Mobile / tablet / reduced-motion: lightweight entrance, no pin or scrub.
    mm.add(PLAIN, () => {
      const root = rootRef.current;
      if (!root) return;
      const letters = root.querySelectorAll('.title-card__letter');
      const hint = root.querySelector('.title-card__hint');

      // Letters still get the signature rise-in reveal, just faster.
      const intro = gsap.timeline({ delay: 0.1 });
      intro
        .fromTo(
          letters,
          { yPercent: 115 },
          { yPercent: 0, duration: 0.8, stagger: 0.04, ease: 'power3.out' }
        )
        .fromTo(
          hint,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );

      // Gentle fade-out on scroll so the title doesn't sit static.
      gsap.to(root.querySelector('.title-card__frame'), {
        autoAlpha: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '80% top',
          scrub: 0.5,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="title-card">
      {/* The hint lives inside the frame, not beside it: the frame is the
          sticky 100vh viewport, so anything positioned against the 150vh
          section instead would sit off-screen below the fold. */}
      <div className="title-card__frame">
        <h1 className="title-card__title" aria-label={TITLE}>
          {TITLE.split('').map((char, i) =>
            char === ' ' ? (
              <span className="title-card__space" key={i} aria-hidden="true" />
            ) : (
              <span className="title-card__mask" key={i} aria-hidden="true">
                <span className="title-card__letter">{char}</span>
              </span>
            )
          )}
        </h1>

        <div className="title-card__hint">
          <span className="title-card__hint-text">Scroll to begin</span>
          <span className="title-card__hint-line" />
        </div>
      </div>
    </section>
  );
}
