import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Aarohan.module.css';
import { CINEMA } from './motion';

/**
 * HudFrame — a fixed instrument overlay: corner brackets, a REC indicator, a
 * running timecode, and a frame counter fed by the pinned gallery.
 *
 * This is the piece that makes the page feel *instrumented* rather than merely
 * animated. It's also the cheapest effect here — four small corner elements and
 * two text nodes, none of which move.
 *
 * ── Z-index ──
 * Sits at 90 (see .hud in Aarohan.module.css): below the navbar's z-[110] and
 * its fullscreen menu's z-[100], above page content. Getting this wrong would
 * tint the navigation, which is the bug the About page's film grain had at
 * z-index 9999.
 *
 * ── Timecode ──
 * Derived from page scroll progress, not wall-clock. It's a readout of where you
 * are in the page, so scrolling back up counts back down. A wall-clock timer
 * would just be a clock, which tells the reader nothing.
 *
 * `frameRef` is owned by the parent and also handed to the gallery timeline, so
 * the counter here and the one in the gallery header stay in lockstep without
 * this component knowing anything about the gallery.
 *
 * Entirely decorative: aria-hidden, pointer-events: none.
 *
 * @param {React.RefObject<HTMLElement>} frameRef Written to by the gallery's onUpdate.
 * @param {number} totalFrames                    Gallery card count, for the initial readout.
 */
export default function HudFrame() {
  const rootRef = useRef(null);
  const timeRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add(CINEMA, () => {
      // Fade the whole panel in once the reader has actually started, so it
      // doesn't compete with the hero title on arrival.
      gsap.fromTo(
        root,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: document.body, start: '80px top', toggleActions: 'play none none none', once: true },
        }
      );

      const time = timeRef.current;
      if (!time) return;

      // Page-wide progress → MM:SS. Mapped to a nominal 4-minute runtime purely
      // so the digits move at a legible rate.
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const total = Math.round(self.progress * 240);
          const mins = String(Math.floor(total / 60)).padStart(2, '0');
          const secs = String(total % 60).padStart(2, '0');
          time.textContent = `00:${mins}:${secs}`;
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className={styles.hud} ref={rootRef} aria-hidden="true">
      <span className={`${styles.hudCorner} ${styles.hudCornerTl}`} />
      <span className={`${styles.hudCorner} ${styles.hudCornerTr}`} />
      <span className={`${styles.hudCorner} ${styles.hudCornerBl}`} />
      <span className={`${styles.hudCorner} ${styles.hudCornerBr}`} />

      <div className={styles.hudReadoutTop}>
        <span className={styles.hudRec}>
          <span className={styles.hudRecDot} />
          REC
        </span>
      </div>

      <div className={styles.hudReadoutBottom}>
        <span className={styles.hudMeta}>AAROHAN / NIT DURGAPUR</span>
        <span className={styles.hudTime} ref={timeRef}>
          00:00:00
        </span>
      </div>
    </div>
  );
}
