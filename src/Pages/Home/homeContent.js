/**
 * Home page content.
 *
 * All copy for the three sections below CardsSection lives here so the section
 * components stay purely structural — same split as ../AboutUs/aboutContent.js.
 *
 * This is also the one place the home page reaches for data that belongs to
 * another page. STATS and EVENTS are re-exported rather than copied: the numbers
 * shown in the about teaser are the same numbers the About page scrubs, and the
 * events shown in the preview are the same five the Events page lists. A third
 * copy of either would drift. If the shared-content-module refactor in
 * changes.md §8 ever happens, this file is the only import to repoint.
 *
 * (Importing from ../Event/Events costs nothing: App.js imports every page
 * eagerly — no React.lazy — so that module and its CSS are already evaluated on
 * every route, including this one.)
 */

export { STATS } from '../AboutUs/aboutContent';
export { events as EVENTS } from '../Event/Events';

/* Section 1 — the dark contrast band. */
export const ABOUT_TEASER = {
  kicker: 'CCA / Since 2003',
  heading: 'Twenty years of building in public.',
  lead: "Centre for Cognitive Activities is NIT Durgapur's technical society — five specialised cells, one workshop culture, and two decades of students who learned the subject by making things that actually run.",
  linkLabel: 'Read our story',
  linkTo: '/about-us',
  cursor: 'OUR STORY',
};

/* Section 2 — events preview. The heading deliberately differs from the Events
   page's own "Things worth showing up for." so the two don't read as duplicates. */
export const EVENTS_PREVIEW = {
  kicker: 'CCA / What we run',
  heading: 'What a year here looks like.',
  linkLabel: 'All events',
  linkTo: '/events',
  cursor: 'EVENTS',
  /* How many of EVENTS to surface. Four fills the 4-up grid exactly. */
  count: 4,
};

/* Section 3 — closing call to action. Socials mirror ../../Components/Footer/Footer.js. */
export const JOIN_CTA = {
  kicker: 'CCA / Get involved',
  heading: 'Come build something with us.',
  lead: 'Recruitment opens each odd semester. No prior experience required — first-years work alongside senior project leads from day one.',
  buttons: [
    { label: 'Our Team', to: '/our-team', cursor: 'TEAM', primary: true },
    { label: 'Browse Events', to: '/events', cursor: 'EVENTS' },
    { label: 'Our Story', to: '/about-us', cursor: 'ABOUT' },
  ],
  socials: [
    ['Instagram', 'https://www.instagram.com/cca.nitd/'],
    ['LinkedIn', 'https://www.linkedin.com/company/center-for-cognitive-activities-nit-durgapur/'],
    ['Facebook', 'https://www.facebook.com/ccanitd.in'],
  ],
};
