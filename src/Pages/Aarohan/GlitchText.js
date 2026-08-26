import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Aarohan.module.css';
import { CINEMA, PLAIN } from './motion';

/**
 * GlitchText — RGB-split chromatic aberration, coupled to scroll velocity.
 *
 * Two colour-channel duplicates sit behind the real text with
 * `mix-blend-mode: screen`. Scrolling faster pushes them apart; stopping lets
 * them settle back together. That coupling is the whole point — a glitch on a
 * fixed loop is wallpaper, but one that responds to how hard you're scrolling
 * reads as the page reacting to you, which is what "engaging with technology"
 * should actually mean.
 *
 * ── Why real spans and not ::before/::after ──
 * The usual recipe duplicates the text with `content: attr(data-text)` on
 * pseudo-elements. Real elements are used instead so GSAP animates them
 * directly as transforms — no CSS custom property indirection, and no question
 * about whether a pseudo-element gets its own compositor layer.
 *
 * ── Why two effects on two different elements ──
 * Velocity drives `x` on the two colour *layers*. The periodic burst drives the
 * *wrapper*. They must not share a property on a shared element or they'd
 * overwrite each other every frame — this is the same class of bug as two
 * scrubbed tweens fighting for one transform.
 *
 * ── Flashing ──
 * WCAG 2.3.1 caps flashing at 3 per second. This deliberately never changes
 * opacity or luminance: layer opacity is constant and only position moves, so it
 * isn't a flash in the first place. On top of that, bursts are ~0.2s and
 * separated by a randomised 4–7s gap, and none of it runs under reduced motion
 * (CINEMA-gated here, and the colour layers are hidden outright in CSS on
 * PLAIN so there's no static colour fringe left behind).
 *
 * The base layer carries the real text and the two colour layers are
 * `aria-hidden`, so the accessible name is correct with no `aria-label` needed —
 * a screen reader hears the title once.
 *
 * @param {string} text      The text to render.
 * @param {string} className Optional extra class on the wrapper.
 */
export default function GlitchText({ text, className = '' }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add(CINEMA, () => {
      const layers = root.querySelectorAll(`.${styles.glitchLayer}`);
      if (layers.length < 2) return;

      const [red, cyan] = layers;

      // quickTo keeps one tween alive per property and retargets it, instead of
      // allocating a new tween on every scroll frame.
      const setRed = gsap.quickTo(red, 'x', { duration: 0.4, ease: 'power3' });
      const setCyan = gsap.quickTo(cyan, 'x', { duration: 0.4, ease: 'power3' });

      // ── Velocity coupling ──
      // Scoped to while the element is on screen so it costs nothing once the
      // title has scrolled away.
      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          // 2400 px/s maps to full separation; anything faster clamps.
          const v = Math.min(1, Math.abs(self.getVelocity()) / 2400);
          const split = v * 7;
          setRed(-split);
          setCyan(split);
        },
      });

      // ── Periodic burst ──
      // On the wrapper, so it can't collide with the velocity tweens above.
      // repeatRefresh re-evaluates the function-based values each cycle, which is
      // what makes the idle gap and jolt direction vary instead of looping
      // identically forever.
      gsap
        .timeline({ repeat: -1, repeatRefresh: true, delay: gsap.utils.random(2, 5) })
        .to(root, { x: () => gsap.utils.random(-5, 5), duration: 0.05, ease: 'steps(1)' })
        .to(root, { x: () => gsap.utils.random(-3, 3), duration: 0.05, ease: 'steps(1)' })
        .to(root, { x: 0, duration: 0.1, ease: 'power2.out' })
        // An empty tween is the idiomatic way to hold a repeating timeline idle
        // for a variable stretch.
        .to({}, { duration: () => gsap.utils.random(4, 7) });
    });

    mm.add(PLAIN, () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const layers = root.querySelectorAll(`.${styles.glitchLayer}`);
      if (layers.length < 2) return;

      const [red, cyan] = layers;
      const setRed = gsap.quickTo(red, 'x', { duration: 0.4, ease: 'power3' });
      const setCyan = gsap.quickTo(cyan, 'x', { duration: 0.4, ease: 'power3' });

      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = Math.min(1, Math.abs(self.getVelocity()) / 2400);
          const split = v * 5;
          setRed(-split);
          setCyan(split);
        },
      });

      gsap
        .timeline({ repeat: -1, repeatRefresh: true, delay: gsap.utils.random(2.5, 5) })
        .to(root, { x: () => gsap.utils.random(-3, 3), duration: 0.05, ease: 'steps(1)' })
        .to(root, { x: () => gsap.utils.random(-2, 2), duration: 0.05, ease: 'steps(1)' })
        .to(root, { x: 0, duration: 0.1, ease: 'power2.out' })
        .to({}, { duration: () => gsap.utils.random(4, 7) });
    });

    return () => mm.revert();
  }, []);

  return (
    <span className={`${styles.glitch} ${className}`} ref={rootRef}>
      <span className={`${styles.glitchLayer} ${styles.glitchRed}`} aria-hidden="true">
        {text}
      </span>
      <span className={`${styles.glitchLayer} ${styles.glitchCyan}`} aria-hidden="true">
        {text}
      </span>
      <span className={styles.glitchBase}>{text}</span>
    </span>
  );
}
