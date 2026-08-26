import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { CINEMA, PLAIN } from '../motion';
import { IRIS_IMAGE } from '../aboutContent';

/**
 * Act 1 — The Iris.
 *
 * Ports the clip-path circle reveal that already worked in the previous build,
 * with two changes:
 *
 *   1. Pin and reveal now share ONE ScrollTrigger instead of two that happened
 *      to declare identical start/end values. They can no longer drift apart.
 *   2. The image counter-dollies (1.35 → 1) as the aperture opens, so the reveal
 *      has depth instead of being a flat hole punched in the page.
 *
 * clip-path is the one scrubbed property on this page that isn't transform or
 * opacity. It's the signature shot and it's animated on a container rather than
 * on image pixels, so it composites acceptably — but it's the reason nothing
 * else in here animates anything expensive.
 */
export default function IrisReveal() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(CINEMA, () => {
      const root = rootRef.current;
      if (!root) return;

      const scene = root.querySelector('.iris__scene');
      const media = root.querySelector('.iris__media');
      const copy = root.querySelectorAll('.iris__reveal');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => '+=110%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        scene,
        { clipPath: 'circle(0% at 50% 50%)', WebkitClipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(150% at 50% 50%)',
          WebkitClipPath: 'circle(150% at 50% 50%)',
          ease: 'none',
          duration: 1,
        },
        0
      )
        .fromTo(media, { scale: 1.35 }, { scale: 1, ease: 'none', duration: 1.2 }, 0)
        .fromTo(
          copy,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.45, ease: 'power2.out' },
          0.3
        );
    });

    // Mobile / tablet: no aperture pin, but the scene still has life.
    mm.add(PLAIN, () => {
      const root = rootRef.current;
      if (!root) return;
      gsap.set(root.querySelector('.iris__scene'), {
        clipPath: 'none',
        WebkitClipPath: 'none',
      });

      // Image scales in gently as user scrolls into view.
      gsap.fromTo(
        root.querySelector('.iris__media'),
        { scale: 1.12 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 85%',
            end: 'center 40%',
            scrub: 0.6,
          },
        }
      );

      // Copy elements fade and rise in on scroll.
      gsap.fromTo(
        root.querySelectorAll('.iris__reveal'),
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 70%' },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="iris">
      <div className="iris__scene">
        <div className="iris__media">
          <img src={IRIS_IMAGE} alt="The CCA collective assembled" />
        </div>

        <div className="iris__scrim" aria-hidden="true" />

        <div className="iris__content">
          <span className="iris__kicker iris__reveal">Since 2003 · NIT Durgapur</span>
          <h2 className="iris__heading iris__reveal">Where curiosity becomes craft.</h2>
          <p className="iris__sub iris__reveal">
            CCA is the place where technical instinct, creative energy, and organisational
            ambition collide — producing work that travels far beyond the classroom walls.
          </p>
        </div>
      </div>
    </section>
  );
}
