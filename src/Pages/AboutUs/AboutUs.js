import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import TitleCard from './acts/TitleCard';
import IrisReveal from './acts/IrisReveal';
import ChapterStage from './acts/ChapterStage';
import CellRail from './acts/CellRail';
import StatsScrub from './acts/StatsScrub';
import Finale from './acts/Finale';

import useDecodedImages from './useDecodedImages';
import { HEAVY_IMAGES } from './aboutContent';
import { CINEMA } from './motion';
import './AboutUs.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Don't let a mobile URL bar showing/hiding count as a resize. Without this,
 * every address-bar transition triggers a full ScrollTrigger refresh, which
 * re-measures the pinned acts mid-scroll.
 *
 * Note this is a global GSAP setting, not a page-scoped one — it applies once
 * this module is imported. That's intended: it's the right default everywhere,
 * and Pages/Aarohan/Aarohan.js pins too.
 */
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * About Us — a scroll-driven film in six acts.
 *
 *   0  Title Card     sticky   opening titles; also the window in which the
 *                              heavy chapter images are decoded
 *   1  Iris           pinned   clip-path aperture opens onto the collective
 *   2  Chapter Stage  pinned   four scenes pass through one stage
 *   3  Cell Rail      pinned   vertical scroll drives horizontal travel
 *   4  Stats          —        scrubbed counters
 *   5  Finale         —        dissolves into the site footer
 *
 * Act 0 holds its frame with CSS `position: sticky` rather than a GSAP pin.
 * Same effect, but there's no pin spacer to measure — one less thing that can
 * go stale when a 13 MB image finishes decoding.
 *
 * Each act owns its own gsap.matchMedia() context, matching how
 * Pages/Aarohan/Aarohan.js organises independent ScrollTriggers. matchMedia
 * also means every act reverts itself cleanly when the viewport crosses the
 * 900px boundary, instead of leaving orphaned pin spacers behind.
 *
 * ── Notes for whoever touches this next ──
 *
 * This page carries ~27 MB of images (two chapter JPEGs are 13 MB each) and
 * runs with no smooth-scroll library. Both were deliberate calls. What keeps it
 * at 60fps anyway:
 *
 *   · Every media wrapper has explicit dimensions in CSS, so a late decode can
 *     never shift layout and invalidate a pin measurement.
 *   · useDecodedImages warms the heavy images during Act 0.
 *   · Scrubbed properties are transform/opacity only — the sole exception is
 *     the Act 1 clip-path, which is the signature shot.
 *   · Act 2 crossfades with autoAlpha (not opacity) so the compositor holds ~2
 *     full-viewport textures instead of 4.
 *
 * Adding a blur, box-shadow, or filter to anything scrubbed here will undo it.
 *
 * The motion tiers live in motion.js and are mirrored exactly by one media
 * query in AboutUs.css. If you change one, change both.
 */
export default function AboutUs() {
  const pageRef = useRef(null);
  const barsRef = useRef([]);

  // Decode the heavy images while Act 0 is still on screen, then refresh pins.
  useDecodedImages(HEAVY_IMAGES);

  /**
   * Letterbox bars close as the titles recede and open again at the finale, so
   * the film is framed for exactly as long as the cinematic acts run.
   *
   * These live here rather than inside an act because they're the orchestrator's
   * own DOM and they span two acts. scaleY is used instead of height so the bars
   * composite rather than trigger layout on every scrubbed frame.
   *
   * The close is scrubbed; the open is a plain toggled tween. That asymmetry is
   * deliberate: a second *scrubbed* tween on the same property would have to
   * declare its own start value, and a scrubbed tween sits at its start state
   * whenever the playhead is before it — so at scroll 0 the finale tween would
   * be fighting the title tween for the same transform. A toggle only touches
   * scaleY when the finale is actually crossed, and `overwrite: 'auto'` cleanly
   * takes control from the scrub at that moment.
   */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(CINEMA, () => {
      const bars = barsRef.current.filter(Boolean);
      const page = pageRef.current;
      if (bars.length === 0 || !page) return;

      const titleCard = page.querySelector('.title-card');
      const finale = page.querySelector('.finale');

      if (titleCard) {
        gsap.fromTo(
          bars,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: titleCard,
              start: 'top top',
              end: '55% top',
              scrub: 0.8,
            },
          }
        );
      }

      if (finale) {
        const open = (to) => () =>
          gsap.to(bars, { scaleY: to, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });

        ScrollTrigger.create({
          trigger: finale,
          start: 'top 75%',
          onEnter: open(0),
          onLeaveBack: open(1),
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <main ref={pageRef} className="cinematic-about">
      {/* Letterbox bars — the film frame. Fixed, purely decorative. */}
      <div
        ref={(el) => {
          barsRef.current[0] = el;
        }}
        className="cine-bar cine-bar--top"
        aria-hidden="true"
      />
      <div
        ref={(el) => {
          barsRef.current[1] = el;
        }}
        className="cine-bar cine-bar--bottom"
        aria-hidden="true"
      />

      <TitleCard />
      <IrisReveal />
      <ChapterStage />
      <CellRail />
      <StatsScrub />
      <Finale pageRef={pageRef} />
    </main>
  );
}
