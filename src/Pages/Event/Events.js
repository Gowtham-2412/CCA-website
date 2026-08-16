import React, { useMemo, useState } from 'react';
import { ChevronRight } from '../../Assets/Icons';
import './Events.css';
import '../Editorial.css';
import assisteque from '../../Assets/Images/assisteque.jpeg';
import parichay from '../../Assets/Images/parichay.jpeg';
import designworkshop from '../../Assets/Images/design workshop.jpeg';
import robozido from '../../Assets/Images/robozido.jpeg';
import youthparliament from '../../Assets/Images/youth parliament.jpeg';

const events = [
  { title: 'Parichay', category: 'Technical', cell: 'CCA Team', date: 'Annual advent', image: parichay, description: 'A first look at a year of ideas, events and opportunities to get involved with CCA.' },
  { title: 'Robozido', category: 'Workshop', cell: 'Robo-Cell', date: 'Odd semester', image: robozido, description: 'A practical introduction to autonomous and manual robotics for builders at every level.' },
  { title: 'Youth Parliament', category: 'Debate', cell: 'E-Cell', date: 'Ninth edition', image: youthparliament, description: 'A platform to examine ideas, articulate a position and defend it with intent.' },
  { title: 'Design Workshop', category: 'Creative', cell: 'WDCT', date: 'Annual workshop', image: designworkshop, description: 'A hands-on starting point for graphics, motion and digital visual craft.' },
  { title: 'Assisteque', category: 'Technical', cell: 'R&D Cell', date: 'Two-day workshop', image: assisteque, description: 'An introduction to Internet of Things systems through sensors, microcontrollers and code.' }
];

export default function Events() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const filters = ['All', ...new Set(events.map(event => event.cell))];
  const visibleEvents = useMemo(() => filter === 'All' ? events : events.filter(event => event.cell === filter), [filter]);
  return <main className="editorial-page events-page">
    <header className="events-page__hero"><p className="editorial-kicker">CCA / Event index</p><h1 className="editorial-title">Things worth showing up for.</h1><p className="editorial-lead">A running record of CCA workshops, conversations, competitions and campus experiments.</p></header>
    <nav className="events-page__filters" aria-label="Filter events">{filters.map(item => <button key={item} className={filter === item ? 'is-active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</nav>
    <section className="events-page__list" aria-live="polite">{visibleEvents.map((event, index) => <article className="event-item" key={event.title}>
      <span className="editorial-number">0{index + 1}</span><img src={event.image} alt="" className="image-dither" /><div className="event-item__content"><p className="editorial-meta">{event.category} / {event.cell}</p><h2>{event.title}</h2><p>{event.description}</p></div><div className="event-item__action"><span>{event.date}</span><button onClick={() => setSelected(event)} aria-label={`View ${event.title} details`}><img src={ChevronRight} alt="" /></button></div>
    </article>)}</section>
    {selected && <div className="event-dialog" role="dialog" aria-modal="true" aria-labelledby="event-dialog-title" onClick={() => setSelected(null)}><article onClick={event => event.stopPropagation()}><button className="event-dialog__close" onClick={() => setSelected(null)} aria-label="Close details">×</button><img src={selected.image} alt="" /><p className="editorial-kicker">{selected.category} / {selected.cell}</p><h2 id="event-dialog-title">{selected.title}</h2><p>{selected.description}</p><span className="editorial-meta">{selected.date}</span></article></div>}
  </main>;
}
