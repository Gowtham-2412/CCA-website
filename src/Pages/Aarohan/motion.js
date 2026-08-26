/**
 * Shared media queries for the Aarohan page's motion tiers.
 *
 * Used with gsap.matchMedia() everywhere on this page, so every effect agrees
 * on exactly when the page is allowed to pin, scrub, glitch, and scanline.
 * matchMedia() also reverts each context automatically when a breakpoint stops
 * matching, which is what keeps a desktop → mobile resize from leaving an
 * orphaned pin spacer behind (a real bug in the previous build, which sampled
 * `window.innerWidth < 640` once at mount and never again).
 *
 * CINEMA — the full arcade: pinning, scrubbing, boot sequence, RGB-split
 *          glitch, scanlines, wireframe parallax, the background video.
 * PLAIN  — a normal vertical page. No pins, no glitch, no video, all copy
 *          visible at rest.
 *
 * PLAIN covers two very different users for the same reason: someone on a phone
 * (pinned scroll fights native touch scrolling, and a 93 MB autoplay video is
 * indefensible on cellular) and someone who asked the OS for less motion — for
 * whom the glitch and scanline effects are not decoration but a hazard. Both
 * want the page to just be a page.
 *
 * The two queries are exact complements, so every viewport matches exactly one.
 * Deliberately identical to Pages/AboutUs/motion.js: the two pages were tiered
 * separately (see the plan) so that page's unverified rebuild couldn't regress,
 * but the breakpoint itself must not drift. Aarohan.module.css mirrors these
 * strings character-for-character in its own media queries — change one,
 * change all.
 */

export const CINEMA = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

export const PLAIN = '(max-width: 899px), (prefers-reduced-motion: reduce)';
