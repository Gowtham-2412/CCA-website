import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitLines from '../SplitLines';
import { STATS } from '../aboutContent';
import { CINEMA, PLAIN } from '../motion';

/**
 * Act 4 — Stats.
 *
 * Ports the counter logic from the previous build with one change that matters:
 * the counters are scrubbed instead of fired once. Before, they used
 * `toggleActions: 'play none none none'` — count up once, then dead. Scrolling
 * back up left them frozen at their final value, which broke the illusion that
 * scroll is the playhead. Now they count up and back down with the scroll.
 *
 * Not pinned — after two pinned acts back to back, the page needs to breathe.
 *
 * The heading deliberately uses this page's own SplitLines helper rather than
 * Components/UI/AnimatedText. AnimatedText would be the natural reuse here, but
 * it doesn't check prefers-reduced-motion — it hides its words and animates them
 * unconditionally. Every other reveal on this page is gated behind the CINEMA
 * tier, and one component quietly opting out would break that guarantee for
 * reduced-motion readers. (AnimatedText is used across the other pages and is
 * left untouched; this is a local choice, not a criticism of it.)
 */
export default function StatsScrub() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(CINEMA, () => {
      const root = rootRef.current;
      if (!root) return;

      // Heading rises out of its mask.
      gsap.fromTo(
        root.querySelectorAll('.split-line__inner'),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 80%' },
        }
      );

      gsap.utils.toArray('.stat', root).forEach((stat, i) => {
        const numberEl = stat.querySelector('.stat__number');
        const target = Number(numberEl.dataset.target);
        const suffix = numberEl.dataset.suffix || '';
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          ease: 'none',
          onUpdate: () => {
            numberEl.textContent = Math.round(counter.value).toLocaleString() + suffix;
          },
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.8,
          },
        });

        gsap.fromTo(
          stat,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: stat, start: 'top 88%' },
          }
        );
      });
    });

    // Mobile / tablet: stats still count up and fade in, just triggered once.
    mm.add(PLAIN, () => {
      const root = rootRef.current;
      if (!root) return;

      // Heading lines rise in.
      gsap.fromTo(
        root.querySelectorAll('.split-line__inner'),
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 80%' },
        }
      );

      gsap.utils.toArray('.stat', root).forEach((stat, i) => {
        const numberEl = stat.querySelector('.stat__number');
        const target = Number(numberEl.dataset.target);
        const suffix = numberEl.dataset.suffix || '';
        const counter = { value: 0 };

        // Count up once on enter.
        gsap.to(counter, {
          value: target,
          duration: 1.5,
          delay: i * 0.15,
          ease: 'power2.out',
          onUpdate: () => {
            numberEl.textContent = Math.round(counter.value).toLocaleString() + suffix;
          },
          scrollTrigger: { trigger: stat, start: 'top 85%' },
        });

        // Card fades up.
        gsap.fromTo(
          stat,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: stat, start: 'top 88%' },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="stats">
      <SplitLines
        text={'The numbers behind\nthe movement.'}
        tag="h2"
        className="stats__heading"
      />

      <div className="stats__row">
        {STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="stat__number" data-target={stat.end} data-suffix={stat.suffix}>
              0{stat.suffix}
            </span>
            <span className="stat__label">{stat.label}</span>
            <span className="stat__desc">{stat.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
