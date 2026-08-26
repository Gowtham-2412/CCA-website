import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import AnimatedText from '../../../Components/UI/AnimatedText';
import AnimatedSection from '../../../Components/UI/AnimatedSection';
import { EVENTS, EVENTS_PREVIEW } from '../homeContent';

/**
 * Home section 2 — flagship events preview.
 *
 * Surfaces the first few of the same EVENTS the /events page lists, so nothing
 * here is a second copy of that data. Cards are deliberately minimal — image,
 * title, date. No cell tag: the full listing on /events is where the per-cell
 * breakdown and filtering belong.
 */
export default function EventsPreview() {
  const shown = EVENTS.slice(0, EVENTS_PREVIEW.count);

  return (
    <section className="home-section home-events">
      <div className="home-section__inner">
        <div className="home-section__head">
          <div>
            <AnimatedSection direction="up" duration={0.6}>
              <p className="editorial-kicker">{EVENTS_PREVIEW.kicker}</p>
            </AnimatedSection>

            <AnimatedText
              text={EVENTS_PREVIEW.heading}
              variant="words"
              tag="h2"
              className="home-section__title"
              stagger={0.045}
              duration={0.7}
            />
          </div>

          <AnimatedSection direction="up" delay={0.2} duration={0.6}>
            <Link
              to={EVENTS_PREVIEW.linkTo}
              className="home-section__action"
              data-cursor-text={EVENTS_PREVIEW.cursor}
            >
              <span>{EVENTS_PREVIEW.linkLabel}</span>
              <ArrowUpRight size={14} className="home-section__action-arrow" />
            </Link>
          </AnimatedSection>
        </div>

        <AnimatedSection
          className="home-events__grid"
          direction="up"
          duration={0.7}
          staggerChildren
          stagger={0.08}
        >
          {shown.map((event) => (
            <Link
              key={event.title}
              to={EVENTS_PREVIEW.linkTo}
              className="home-event"
              data-cursor-text={EVENTS_PREVIEW.cursor}
            >
              <div className="home-event__frame">
                <img
                  src={event.image}
                  alt={event.title}
                  className="home-event__img image-dither"
                  loading="lazy"
                />
              </div>
              <h3 className="home-event__title">{event.title}</h3>
              <span className="home-event__date">{event.date}</span>
            </Link>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
