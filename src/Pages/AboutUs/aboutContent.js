/**
 * About page content.
 *
 * All copy lives here so the act components stay purely structural.
 *
 * CELLS mirrors CELLS_DATA in ../Our-Cells/OurCells.js (ids, titles, categories,
 * roles, paths) so the two pages never drift. The photo assets are the same five
 * used there — deliberately, since Act 3 composites all five panels at once and
 * the heavy chapter JPGs must stay out of it.
 */

import carouselimg1 from '../../Assets/Images/carouselimg1.JPG';
import carouselimg2 from '../../Assets/Images/carouselimg2.JPG';
import designworkshop from '../../Assets/Images/design workshop.jpeg';
import arhn1 from '../../Assets/Images/ARHN1.jpeg';
import arhn3 from '../../Assets/Images/ARHN3.jpeg';

import coreCell from '../../Assets/Images/core-cell.png';
import rndCell from '../../Assets/Images/rnd.jpg';
import roboCell from '../../Assets/Images/robo-cell.jpg';
import eCell from '../../Assets/Images/e-cell.jpg';
import wdctCell from '../../Assets/Images/wdct.jpg';

/* Act 1 — the image revealed through the iris. */
export const IRIS_IMAGE = arhn3;

/* Act 2 — the four scenes that pass through the pinned stage.
   `title` is split per line by SplitLines, so keep the \n breaks intentional. */
export const CHAPTERS = [
  {
    step: '01',
    label: 'The Origin — 2003',
    title: 'It started with a question\nnobody was asking.',
    body: 'What happens when you give students a workshop, a deadline, and zero bureaucracy? CCA was forged at NIT Durgapur by a handful of builders who believed the best engineering happens outside lecture halls — through fabrication, code, and relentless public demonstration.',
    detail: "NIT Durgapur's first central cognitive & technical society.",
    image: carouselimg1,
  },
  {
    step: '02',
    label: 'The Workshops — Hands-On Craft',
    title: 'A living laboratory of\nideas and execution.',
    body: 'From interactive web design and UI/UX masterclasses to IoT systems, product research, and autonomous engineering — our hands-on workshops empower students to build functional, ambitious projects from day one.',
    detail: 'Design workshops · Software development · Hardware labs.',
    image: designworkshop,
  },
  {
    step: '03',
    label: 'The Festival — Aarohan',
    title: "Eastern India's benchmark\ntechnical festival.",
    body: 'Every year, the collective orchestrates Aarohan — uniting thousands of students nationwide across hackathons, robotics wars, case-study conclaves, policy deliberations, and keynote sessions that redefine the campus calendar.',
    detail: '3,000+ national footfall · Competitive arenas · Industry keynotes.',
    image: arhn1,
  },
  {
    step: '04',
    label: 'The Continuity — Legacy',
    title: 'Knowledge that compounds\nacross generations.',
    body: 'Every cohort leaves behind documented repositories, physical robots, and an unbroken chain of direct peer mentorship. No gatekeeping — first-year beginners work shoulder-to-shoulder with senior project leads from day one.',
    detail: '20+ years of continuous student governance.',
    image: carouselimg2,
  },
];

/* The two 13 MB JPGs plus the rest of Act 2's media. Decoded during Act 0 so
   they never land mid-stage and invalidate a pin measurement. */
export const HEAVY_IMAGES = [IRIS_IMAGE, ...CHAPTERS.map((c) => c.image)];

/* Act 3 — horizontal rail. */
export const CELLS = [
  {
    id: '01',
    title: 'WDCT',
    category: 'Digital Creative Studio',
    role: 'Shaping how CCA is experienced online through bleeding-edge web platforms, interface craft, visual branding, and motion design.',
    path: '/wdct',
    image: wdctCell,
  },
  {
    id: '02',
    title: 'Core Cell',
    category: 'Operations & Strategy',
    role: 'The operational centre of CCA. We steer initiatives, coordinate cross-cell execution, and build national partnerships.',
    path: '/core',
    image: coreCell,
  },
  {
    id: '03',
    title: 'E-Cell',
    category: 'Venture & Economics',
    role: 'Ideas with enterprise. Cultivating startup culture through hackathons, pitch arenas, case study conclaves, and venture mentorship.',
    path: '/ecell',
    image: eCell,
  },
  {
    id: '04',
    title: 'R&D Cell',
    category: 'Hardware & IoT',
    role: 'Research made tangible. Translating theoretical models and engineering blueprints into functional prototypes and deployed tech.',
    path: '/rnd',
    image: rndCell,
  },
  {
    id: '05',
    title: 'Robo-Cell',
    category: 'Robotics & Automation',
    role: 'Machines with intent. Designing combat robots, autonomous line-trackers, rovers, and cutting-edge mechatronic systems.',
    path: '/robo',
    image: roboCell,
  },
];

/* Act 4 — scrubbed counters. */
export const STATS = [
  { end: 20, suffix: '+', label: 'Years of Legacy', desc: "Established 2003, NIT Durgapur's premier cognitive body." },
  { end: 100, suffix: '+', label: 'Annual Initiatives', desc: 'Workshops, robotics competitions, conclaves, hackathons.' },
  { end: 3000, suffix: '+', label: 'Fest Footfall', desc: 'National participants gathering annually for Aarohan.' },
];

/* Act 5 — outbound links. `cursor` feeds data-cursor-text (Components/UI/CustomCursor.js). */
export const FINALE_LINKS = [
  { to: '/our-team', label: 'Our Team', cursor: 'TEAM' },
  { to: '/our-cells', label: 'Our Cells', cursor: 'CELLS' },
  { to: '/events', label: 'Events', cursor: 'EVENTS' },
];
