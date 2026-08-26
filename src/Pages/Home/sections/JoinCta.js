import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import AnimatedText from '../../../Components/UI/AnimatedText';
import AnimatedSection from '../../../Components/UI/AnimatedSection';
import { JOIN_CTA } from '../homeContent';

/**
 * Home section 3 — closing call to action.
 *
 * The last thing before the footer. Stays on paper deliberately: it separates
 * the dark about band from the dark footer so the two never touch.
 *
 * Visually parallel to the .cells-bottom-cta block on /our-cells. The two
 * duplicate a little styling; consolidating them into a shared
 * .editorial-cta-btn in Editorial.css would be the tidier end state, but that
 * means touching OurCells.css and is left as separate work.
 */
export default function JoinCta() {
  return (
    <section className="home-section home-join">
      <div className="home-section__inner">
        <AnimatedSection direction="up" duration={0.6}>
          <p className="editorial-kicker">{JOIN_CTA.kicker}</p>
        </AnimatedSection>

        <AnimatedText
          text={JOIN_CTA.heading}
          variant="words"
          tag="h2"
          className="home-section__title"
          stagger={0.045}
          duration={0.7}
        />

        <AnimatedSection direction="up" delay={0.15} duration={0.8}>
          <p className="home-join__lead">{JOIN_CTA.lead}</p>
        </AnimatedSection>

        <AnimatedSection
          className="home-join__buttons"
          direction="up"
          delay={0.25}
          duration={0.6}
          staggerChildren
          stagger={0.07}
        >
          {JOIN_CTA.buttons.map((button) => (
            <Link
              key={button.label}
              to={button.to}
              className={`home-join__btn ${
                button.primary ? 'home-join__btn--primary' : 'home-join__btn--ghost'
              }`}
              data-cursor-text={button.cursor}
            >
              <span>{button.label}</span>
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </AnimatedSection>

        <AnimatedSection
          className="home-join__socials"
          direction="up"
          delay={0.3}
          duration={0.6}
        >
          {JOIN_CTA.socials.map(([label, url]) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="home-join__social"
            >
              <span>{label}</span>
              <ArrowUpRight size={13} className="home-join__social-arrow" />
            </a>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
