/**
 * Shared media queries for the About page's motion tiers.
 *
 * Used with gsap.matchMedia() in every act, so all acts agree on exactly when
 * the page is allowed to pin and scrub. matchMedia() also reverts each context
 * automatically when a breakpoint stops matching, which is what keeps a desktop
 * → mobile resize from leaving orphaned pin spacers behind.
 *
 * CINEMA — the full experience: pinning, scrubbing, parallax, horizontal scroll.
 * PLAIN  — a normal vertical article. No pins, no parallax, all copy visible.
 *
 * PLAIN covers two very different users for the same reason: someone on a phone
 * (pinned horizontal scroll fights native touch scrolling, and there isn't the
 * frame budget for it) and someone who asked the OS for less motion. Both want
 * the page to just be a page. The two queries are exact complements, so every
 * viewport matches exactly one.
 */

export const CINEMA = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

export const PLAIN = '(max-width: 899px), (prefers-reduced-motion: reduce)';
