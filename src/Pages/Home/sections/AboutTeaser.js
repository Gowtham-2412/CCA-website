import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../../../Components/UI/AnimatedText';
import AnimatedSection from '../../../Components/UI/AnimatedSection';
import { ABOUT_TEASER, STATS } from '../homeContent';

gsap.registerPlugin(ScrollTrigger);

/**
 * Home section 1 — the dark contrast band.
 *
 * The only inverted surface between the hero and the footer. It carries the
 * three STATS numbers as proof and hands off to /about-us for the full story.
 *
 * The counters are scrubbed rather than fired once, the same way
 * ../../AboutUs/acts/StatsScrub.js does it — scrolling back up counts them down
 * again, so scroll stays the playhead instead of leaving dead final values.
 *
 * Unlike StatsScrub this gates on prefers-reduced-motion ONLY, not on width.
 * That file's CINEMA tier requires min-width:900px because a pinned horizontal
 * rail fights native touch scrolling and blows the frame budget on a phone. A
 * counting number does neither, so width-gating here would kill the effect on
 * tablets for no reason.
 */
export default function AboutTeaser() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    const numbers = () =>
      rootRef.current ? rootRef.current.querySelectorAll('.home-stat__number') : [];

    const format = (value, suffix) => Math.round(value).toLocaleString() + suffix;

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      numbers().forEach((numberEl) => {
        const target = Number(numberEl.dataset.target);
        const suffix = numberEl.dataset.suffix || '';
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          ease: 'none',
          onUpdate: () => {
            numberEl.textContent = format(counter.value, suffix);
          },
          scrollTrigger: {
            trigger: numberEl.closest('.home-stat'),
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.8,
          },
        });
      });
    });

    // Reduced motion: final values, immediately, no tween.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      numbers().forEach((numberEl) => {
        numberEl.textContent = format(
          Number(numberEl.dataset.target),
          numberEl.dataset.suffix || ''
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="home-section home-about">
      <div className="home-section__inner">
        <AnimatedSection direction="up" duration={0.6}>
          <p className="editorial-kicker">{ABOUT_TEASER.kicker}</p>
        </AnimatedSection>

        <AnimatedText
          text={ABOUT_TEASER.heading}
          variant="words"
          tag="h2"
          className="home-section__title"
          stagger={0.045}
          duration={0.7}
        />

        <AnimatedSection direction="up" delay={0.15} duration={0.8}>
          <p className="home-about__lead">{ABOUT_TEASER.lead}</p>
        </AnimatedSection>

        <div className="home-about__stats">
          {STATS.map((stat) => (
            <div className="home-stat" key={stat.label}>
              <span
                className="home-stat__number"
                data-target={stat.end}
                data-suffix={stat.suffix}
              >
                {/* Server-side value: the scrubbed tween overwrites this on
                    scroll, and the reduced-motion branch overwrites it on mount.
                    Rendering the target (not 0) means the number is still
                    correct if GSAP never runs at all. */}
                {stat.end.toLocaleString()}
                {stat.suffix}
              </span>
              <span className="home-stat__label">{stat.label}</span>
              <span className="home-stat__desc">{stat.desc}</span>
            </div>
          ))}
        </div>

        <AnimatedSection direction="up" duration={0.7} className="home-about__action">
          <Link
            to={ABOUT_TEASER.linkTo}
            className="home-about__link"
            data-cursor-text={ABOUT_TEASER.cursor}
          >
            <span>{ABOUT_TEASER.linkLabel}</span>
            <ArrowUpRight size={15} className="home-about__link-arrow" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
