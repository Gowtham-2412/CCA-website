import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { CINEMA, PLAIN } from './motion';

/**
 * Character-scramble decode, hand-rolled.
 *
 * GSAP ships this as ScrambleTextPlugin, but that's a Club GreenSock plugin and
 * package.json only has the free `gsap` core plus ScrollTrigger — same reason
 * this page can't use SplitText either.
 *
 * ── Two problems worth knowing about ──
 *
 * 1. Layout stability. A naive scramble swaps glyphs in place. Even holding the
 *    character count constant, 'PP Frama' is proportional, so 'AAROHAN' and
 *    '▓▒A░█▚▞' are different widths — a word can get wider, wrap differently,
 *    and change the heading's line count. That shifts everything below it, which
 *    on this page means invalidating the pinned gallery's measurement mid-scroll.
 *
 *    Fixed structurally rather than by picking careful glyphs: the markup
 *    carries two copies of the text. A `__ghost` copy stays in normal flow with
 *    `visibility: hidden` and holds the box open at the final text's exact size;
 *    the `__live` copy is absolutely positioned on top and can be any width it
 *    likes without moving a single pixel of layout.
 *
 * 2. Determinism. Re-rolling random glyphs every frame looks like static, and
 *    worse, scrubbing backwards would retrace a different path each time. So the
 *    glyph for a given (index, tick) is a pure hash — scrub down and back up and
 *    you see the same decode in reverse.
 */

/* Deliberately uppercase + block glyphs: at heading size these read as a
   terminal decoding, and they're closer in width to the real text than
   lowercase or punctuation would be. */
const GLYPHS = '▚▞▙▟█▓▒░ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&$@*+=<>/\\|';

/* How much of the scroll range is spent resolving. The remainder is a settle
   window where the text just sits finished, so the reveal doesn't complete on
   the exact frame the section leaves the trigger range. */
const RESOLVE_BY = 0.75;

/* Glyph re-roll rate across the full progress range. Low enough to read as
   discrete flicker rather than noise. */
const TICKS = 90;

/* Space, newline, and non-breaking space. Compared by codepoint because U+00A0
   is indistinguishable from a plain space in source. */
const WHITESPACE = new Set([0x20, 0x0a, 0xa0]);

/**
 * The decoded string at a given progress. Pure — same inputs, same output.
 *
 * @param {string} text     Final text.
 * @param {number} progress 0 → fully scrambled, 1 → fully resolved.
 * @returns {string} Always exactly as many characters as `text`.
 */
export function scrambleAt(text, progress) {
  const chars = Array.from(text);
  const n = chars.length;
  if (n === 0) return text;

  const p = Math.min(1, Math.max(0, progress));
  const cursor = (p / RESOLVE_BY) * n;
  const tick = Math.floor(p * TICKS);

  let out = '';
  for (let i = 0; i < n; i++) {
    const ch = chars[i];

    // Whitespace is never scrambled, so word boundaries — and therefore where
    // lines break — stay put for the whole animation.
    if (WHITESPACE.has(ch.codePointAt(0))) {
      out += ch;
      continue;
    }

    if (i < cursor) {
      out += ch;
      continue;
    }

    // Knuth multiplicative hash on (index, tick). >>> 0 keeps it unsigned so
    // the modulo can't come back negative.
    const h = (i * 2654435761 + tick * 40503) >>> 0;
    out += GLYPHS[h % GLYPHS.length];
  }

  return out;
}

/**
 * Wire a heading's `.arhn-scramble__live` layer to a scrubbed decode.
 *
 * Scrubbed rather than fired once, so scrolling back up re-scrambles it. The
 * previous build's reveals all used `toggleActions: 'play none none none'` and
 * froze on the way back up.
 *
 * @param {React.RefObject<HTMLElement>} ref    The heading element.
 * @param {string} text                         Final text (must match the DOM).
 * @param {{start?: string, end?: string}} opts ScrollTrigger range.
 */
export default function useScramble(ref, text, opts = {}) {
  const { start = 'top 85%', end = 'top 45%' } = opts;

  useLayoutEffect(() => {
    const heading = ref.current;
    if (!heading) return;

    const live = heading.querySelector('.arhn-scramble__live');
    if (!live) return;

    const mm = gsap.matchMedia();

    mm.add(CINEMA, () => {
      const proxy = { p: 0 };

      gsap.to(proxy, {
        p: 1,
        ease: 'none',
        onUpdate: () => {
          live.textContent = scrambleAt(text, proxy.p);
        },
        scrollTrigger: { trigger: heading, start, end, scrub: 0.6 },
      });
    });

    // Mobile / tablet / reduced-motion tier.
    // If reduced motion is requested, show final text immediately.
    // Otherwise, decode smoothly on scroll into view.
    mm.add(PLAIN, () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        live.textContent = text;
        return;
      }

      const proxy = { p: 0 };
      gsap.to(proxy, {
        p: 1,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => {
          live.textContent = scrambleAt(text, proxy.p);
        },
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => mm.revert();
  }, [ref, text, start, end]);
}
