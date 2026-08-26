import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from '../../Assets/Icons';
import './Events.css';
import '../Editorial.css';
import assisteque from '../../Assets/Images/assisteque.jpeg';
import parichay from '../../Assets/Images/parichay.jpeg';
import designworkshop from '../../Assets/Images/design workshop.jpeg';
import robozido from '../../Assets/Images/robozido.jpeg';
import youthparliament from '../../Assets/Images/youth parliament.jpeg';
import AnimatedText from '../../Components/UI/AnimatedText';
import AnimatedSection from '../../Components/UI/AnimatedSection';

/* Exported so the home page's EventsPreview can surface the first few without
   keeping a second copy of this list. See ../Home/homeContent.js. */
export const events = [
  {
    title: 'Parichay',
    category: 'Technical',
    cell: 'Core-Cell',
    date: 'Annual advent',
    image: parichay,
    description:
      'A first look at a year of ideas, events and opportunities to get involved with CCA.',
  },
  {
    title: 'Robozido',
    category: 'Workshop',
    cell: 'Robo-Cell',
    date: 'Odd semester',
    image: robozido,
    description:
      'A practical introduction to autonomous and manual robotics for builders at every level.',
  },
  {
    title: 'Youth Parliament',
    category: 'Debate',
    cell: 'E-Cell',
    date: 'Ninth edition',
    image: youthparliament,
    description:
      'A platform to examine ideas, articulate a position and defend it with intent.',
  },
  {
    title: 'Design Workshop',
    category: 'Creative',
    cell: 'WDCT',
    date: 'Annual workshop',
    image: designworkshop,
    description:
      'A hands-on starting point for graphics, motion and digital visual craft.',
  },
  {
    title: 'Assisteque',
    category: 'Technical',
    cell: 'R&D Cell',
    date: 'Two-day workshop',
    image: assisteque,
    description:
      'An introduction to Internet of Things systems through sensors, microcontrollers and code.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.96, y: 15, transition: { duration: 0.2 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Events() {
  const [cellFilter, setCellFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const cellFilters = useMemo(
    () => ['All', ...new Set(events.map((e) => e.cell))],
    []
  );

  const visibleEvents = useMemo(() => {
    if (cellFilter === 'All') return events;
    return events.filter((e) => e.cell === cellFilter);
  }, [cellFilter]);

  return (
    <main className="editorial-page events-page">
      {/* ─── Header ─── */}
      <header className="events-page__hero">
        <div className="editorial-header">
          <div className="editorial-header__left">
            <AnimatedSection direction="up" duration={0.5}>
              <p className="editorial-kicker">CCA / Events</p>
            </AnimatedSection>
            <AnimatedText
              text="Things worth showing up for."
              variant="words"
              tag="h1"
              className="editorial-title"
              stagger={0.06}
              duration={0.7}
            />
          </div>
          <div className="editorial-header__right">
            <AnimatedSection direction="up" delay={0.25} duration={0.7}>
              <p className="editorial-lead">
                A running record of CCA workshops, conversations, competitions and campus experiments.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </header>

      {/* ─── Centered Pill Navigation for Cell Filter ─── */}
      <nav className="events-page__pill-nav" aria-label="Filter events by cell">
        {cellFilters.map((cell) => (
          <button
            key={cell}
            className={`events-page__pill-btn ${cellFilter === cell ? 'is-active' : ''}`}
            onClick={() => setCellFilter(cell)}
            data-cursor-text="FILTER"
          >
            {cell}
          </button>
        ))}
      </nav>

      {/* ─── Events List (Cards Clickable Everywhere) ─── */}
      <section className="events-page__list" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {visibleEvents.map((event, index) => (
            <motion.article
              className="event-item"
              key={event.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              onClick={() => setSelected(event)}
              data-cursor-text="OPEN"
            >
              <span className="editorial-number">0{index + 1}</span>
              <img src={event.image} alt="" className="image-dither" />
              <div className="event-item__content">
                <p className="editorial-meta">
                  {event.category} / {event.cell}
                </p>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
              </div>
              <div className="event-item__action">
                <span>{event.date}</span>
                <button
                  type="button"
                  aria-label={`View ${event.title} details`}
                  tabIndex={-1}
                >
                  <img src={ChevronRight} alt="" />
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>

        {visibleEvents.length === 0 && (
          <div className="events-page__empty">
            <p>No events found for this filter.</p>
            <button onClick={() => setCellFilter('All')}>Show all events</button>
          </div>
        )}
      </section>

      {/* ─── Detail Modal ─── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="event-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-dialog-title"
            onClick={() => setSelected(null)}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.article
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                className="event-dialog__close"
                onClick={() => setSelected(null)}
                aria-label="Close details"
              >
                ×
              </button>
              <img src={selected.image} alt="" />
              <p className="editorial-kicker">
                {selected.category} / {selected.cell}
              </p>
              <h2 id="event-dialog-title">{selected.title}</h2>
              <p>{selected.description}</p>
              <span className="editorial-meta">{selected.date}</span>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
