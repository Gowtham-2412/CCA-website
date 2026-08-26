import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Aarohan.module.css';
import { PLAIN } from './motion';

/**
 * BootSequence — a terminal cold-start that plays once, then gets out of the way.
 *
 * Four monospace lines type out over ~1.4s, then a scanline band wipes down and
 * the overlay leaves. It sets the register for the rest of the page: this fest
 * is technical, so the page boots rather than fades in.
 *
 * ── Three things that keep this from being obnoxious or dangerous ──
 *
 * 1. **Once per session.** Gated on sessionStorage, and the flag is written the
 *    moment we decide to run rather than on completion — so a navigation that
 *    interrupts the boot still won't replay it. Without this, every return to
 *    /aarohan would replay a full-screen black overlay, which is intolerable.
 *
 * 2. **A failsafe.** The overlay covers the page. If a tween never completes
 *    (a mid-boot tab suspend, a throttled timer), the reader would be staring
 *    at a black screen with no way out. A hard timeout force-finishes it
 *    regardless of animation state. Scroll is deliberately NOT locked, for the
 *    same reason — a stuck lock is worse than an ignorable overlay.
 *
 * 3. **Not rendered at all on PLAIN.** Phones and reduced-motion readers get the
 *    page directly. Checked at first render so the overlay never even mounts,
 *    rather than mounting and hiding.
 *
 * The whole thing is `aria-hidden` — the real hero copy is in the DOM behind it
 * the entire time, so assistive tech and search crawlers see the page normally
 * and never hear this.
 */

const LINES = [
  '> init aarohan_26 --mode=techno-management',
  '> load modules ................ OK',
  '> mount 30 events ............. OK',
  '> render ▓▓▓▓▓▓▓▓▓▓▓▓ 100%',
];

const SESSION_KEY = 'arhn:booted';
const FAILSAFE_MS = 3500;

/** True only when we should actually play. Reads storage defensively — Safari
 *  private mode throws on sessionStorage access rather than returning null. */
function shouldBoot() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia(PLAIN).matches) return false;
  try {
    return !window.sessionStorage.getItem(SESSION_KEY);
  } catch {
    return true;
  }
}

function markBooted() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    /* private mode — the boot just plays again next route. Not worth handling. */
  }
}

export default function BootSequence() {
  // Decided once, at first render, so the overlay never flashes in for a reader
  // who shouldn't see it.
  const [active, setActive] = useState(shouldBoot);
  const rootRef = useRef(null);
  const lineRefs = useRef([]);
  const wipeRef = useRef(null);

  useLayoutEffect(() => {
    if (!active) return undefined;

    markBooted();

    const root = rootRef.current;
    const wipe = wipeRef.current;
    const lines = lineRefs.current.filter(Boolean);
    if (!root || lines.length === 0) return undefined;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setActive(false);
    };

    const failsafe = setTimeout(finish, FAILSAFE_MS);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });

      lines.forEach((el, i) => {
        const text = LINES[i];
        const proxy = { n: 0 };

        tl.to(
          proxy,
          {
            n: text.length,
            duration: 0.28,
            ease: 'none',
            snap: { n: 1 },
            onUpdate: () => {
              el.textContent = text.slice(0, proxy.n);
            },
          },
          i * 0.26
        );
      });

      // Scanline band sweeps down, then the overlay drops out. scaleY/opacity
      // only — nothing here should cost a layout.
      if (wipe) {
        tl.fromTo(
          wipe,
          { scaleY: 0, transformOrigin: 'top' },
          { scaleY: 1, duration: 0.34, ease: 'power2.in' },
          '+=0.18'
        );
      }
      tl.to(root, { autoAlpha: 0, duration: 0.3, ease: 'power2.out' }, '-=0.08');
    }, root);

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className={styles.boot} ref={rootRef} aria-hidden="true">
      <div className={styles.bootInner}>
        {LINES.map((line, i) => (
          <div
            className={styles.bootLine}
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
          />
        ))}
        <span className={styles.bootCaret} />
      </div>
      <div className={styles.bootWipe} ref={wipeRef} />
    </div>
  );
}
