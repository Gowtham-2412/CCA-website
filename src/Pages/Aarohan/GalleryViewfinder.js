import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './Aarohan.module.css';
import { FRAMES } from './galleryFrames';

/**
 * GalleryViewfinder — the Aarohan photo gallery as a viewfinder plus a contact
 * sheet: one large active frame, seven thumbnails, prev/next, arrow keys.
 *
 * ── Why this replaced the pinned stacking deck ──
 *
 * The deck put all seven cards at `position: absolute` in one box and gave each
 * `will-change: transform, opacity` while live, which promotes seven full-stage
 * compositor layers of decoded multi-megapixel bitmaps *simultaneously*. Once
 * the GPU runs out of budget it discards and re-rasters tiles mid-scrub, which
 * is what read as the gallery sticking and jumping. The pin added a second,
 * separate problem: this project has no smooth-scroll layer, so swapping the
 * section to `position: fixed` at pin engage/release is inherently a one-frame
 * discontinuity that `anticipatePin` can soften but not remove.
 *
 * The same conclusion is already recorded in ../AboutUs/acts/CellRail.js: "a
 * horizontal rail composites every panel simultaneously, so it uses the five
 * cell photos (~852 KB for all five). The 13 MB chapter JPEGs are deliberately
 * kept out of this act entirely."
 *
 * ── The performance contract, restated ──
 *
 *   · Exactly ONE full-size <img> is mounted at a time. Six of the seven large
 *     bitmaps simply do not exist as far as the compositor is concerned.
 *   · Nothing here is coupled to scroll. There is no pin, no scrub, no
 *     ScrollTrigger, and no GSAP — so scrolling past the gallery cannot cost a
 *     frame, which is the entire point.
 *   · The only transform/opacity work is a one-shot fade per frame change,
 *     gated on decode so it fades the photo rather than an empty box.
 *   · The contact strip has its own small assets. A 90px thumbnail sourced from
 *     a 14.9 MB original would still decode all 14.9 MB — see galleryFrames.js.
 *
 * ── Tiering ──
 *
 * There isn't any, and that is the win. The deck needed a CINEMA/PLAIN split
 * because a pinned deck cannot work on a phone; a viewfinder is the same
 * component everywhere, so the whole tier of conditional gallery CSS is gone.
 * Reduced motion is handled for free: the fade is a CSS animation, and
 * Editorial.css (imported on every route by Footer.js) already collapses
 * animation-duration to .01ms under prefers-reduced-motion.
 *
 * @param {React.RefObject<HTMLElement>} counterRef The section header's badge, written imperatively.
 */

const TOTAL = FRAMES.length;
const pad = (n) => String(n).padStart(2, '0');
const wrap = (i) => ((i % TOTAL) + TOTAL) % TOTAL;

export default function GalleryViewfinder({ counterRef }) {
  const [active, setActive] = useState(0);
  const stripRef = useRef(null);

  const go = useCallback((next) => setActive(wrap(next)), []);

  /* ── Keep gallery counter badge in lockstep ──
     Written imperatively so lifting an index into a shared parent to re-render it
     would not cause needless re-renders. */
  useEffect(() => {
    const label = `FRAME ${pad(active + 1)} / ${pad(TOTAL)}`;
    if (counterRef?.current) counterRef.current.textContent = label;
  }, [active, counterRef]);

  /* ── Preload immediate neighbours ──
     Stepping is the common case, so both directions are warmed and served from
     cache. Bounded on purpose: warming all seven would recreate the memory
     spike this component exists to avoid. */
  useEffect(() => {
    [active - 1, active + 1].forEach((i) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = FRAMES[wrap(i)].full;
    });
  }, [active]);

  /* ── Keep the active thumbnail in view ──
     Writes the strip's own scrollLeft rather than calling scrollIntoView(),
     which walks up the ancestor chain and can scroll the *page*. On a gallery
     whose whole purpose is not surprising the reader's scroll position, that
     would be a poor trade. No-ops when the strip isn't overflowing. */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || strip.scrollWidth <= strip.clientWidth) return;

    const thumb = strip.children[active];
    if (!thumb) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    strip.scrollTo({
      left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2,
      behavior: reduced ? 'auto' : 'smooth',
    });
  }, [active]);

  /* Arrow keys, handled by bubbling from the thumbs and nav buttons rather than
     bound to the window. That means they only act once focus is inside the
     gallery — which is the correct scope. A global handler would steal ArrowUp/
     ArrowDown-adjacent expectations and break plain page scrolling for keyboard
     users who are only passing through. */
  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(active + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(active - 1);
    }
  };

  /* Adds the fade-in class straight to the DOM node instead of going through
     component state. The <img> is keyed on `active`, so React mounts a fresh
     element per frame and the class resets on its own — a `ready` state value
     would survive the remount and need explicitly clearing, and clearing it in
     an effect would flash opacity 1 → 0 → 1.

     Both paths are needed: onLoad covers an uncached frame, and .complete
     covers a cached one, where load can fire before React attaches the
     handler. */
  const markReady = (el) => {
    if (el) el.classList.add(styles.vfImageReady);
  };

  const frame = FRAMES[active];

  return (
    <div className={styles.viewfinder} onKeyDown={onKeyDown}>
      {/* Clicking the frame advances, which is the expected affordance for a
          viewfinder. Deliberately a plain div and not a button: it wraps the
          <img> that carries the accessible name, and every action it offers is
          already reachable from the real buttons below and the arrow keys. It
          is a redundant pointer convenience, not the only path. */}
      <div
        className={styles.vfStage}
        onClick={() => go(active + 1)}
        data-cursor-text="NEXT"
      >
        {/* width/height use the same conditional-spread idiom as the hero
            video's src in Aarohan.js — they only appear once galleryFrames.js
            has real dimensions from the resize script. The stage is a
            fixed-height box regardless, so layout is stable either way. */}
        <img
          key={active}
          ref={(el) => { if (el?.complete) markReady(el); }}
          onLoad={(event) => markReady(event.currentTarget)}
          className={styles.vfImage}
          src={frame.full}
          alt={frame.caption}
          decoding="async"
          {...(frame.w ? { width: frame.w, height: frame.h } : {})}
        />

        <div className={styles.galleryOverlay} />

        {/* Chromatic aberration on the frame, not the bitmap — two offset 1px
            borders. A filter here would be applied to the full-bleed photo. */}
        <span className={`${styles.galleryFringe} ${styles.galleryFringeRed}`} aria-hidden="true" />
        <span className={`${styles.galleryFringe} ${styles.galleryFringeCyan}`} aria-hidden="true" />

        <div className={styles.galleryCardContent}>
          <span className={styles.galleryContentTag}>
            MOMENT {pad(active + 1)} / {pad(TOTAL)}
          </span>
          <h4 className={styles.gallerySlideTitle}>{frame.caption}</h4>
        </div>
      </div>

      {/* ── Contact sheet ── */}
      <div className={styles.vfControls}>
        <button
          type="button"
          className={styles.vfNav}
          onClick={() => go(active - 1)}
          aria-label="Previous moment"
        >
          <ArrowLeft size={16} />
        </button>

        <div className={styles.vfStrip} ref={stripRef}>
          {FRAMES.map((f, i) => (
            <button
              type="button"
              key={f.caption}
              className={`${styles.vfThumb} ${i === active ? styles.vfThumbActive : ''}`}
              onClick={() => go(i)}
              aria-label={`${f.caption} — frame ${i + 1} of ${TOTAL}`}
              aria-current={i === active}
            >
              {/* alt="" because the button's aria-label already names it; a
                  duplicate would be read twice. */}
              <img src={f.thumb} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.vfNav}
          onClick={() => go(active + 1)}
          aria-label="Next moment"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      {/* The caption changes without any focus change, so it needs announcing.
          Visually hidden rather than display:none — the latter is not read. */}
      <p className={styles.vfLive} aria-live="polite">
        {`Frame ${active + 1} of ${TOTAL}: ${frame.caption}`}
      </p>
    </div>
  );
}
