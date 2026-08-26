import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * useDecodedImages — force heavy images through decode before they matter.
 *
 * Why this exists: the About page ships ~27 MB of JPEGs (two of the chapter
 * images are 13 MB each). If one of those decodes while a pinned, scrubbed
 * section is on screen, the main thread stalls mid-animation. Worse, a late
 * decode that changes layout invalidates every pin measurement below it.
 *
 * Act 0 holds ~150vh of scroll before any heavy image is visible. That window
 * is the decode budget. We kick off loading immediately, await decode() off the
 * critical path, then refresh ScrollTrigger once so all pins measure against
 * final layout.
 *
 * Layout stability is still enforced in CSS (every media wrapper has explicit
 * dimensions) — this hook is the second line of defence, not the only one.
 *
 * @param {string[]} sources Image URLs to warm.
 */
export default function useDecodedImages(sources) {
  useEffect(() => {
    if (!sources || sources.length === 0) return;

    let cancelled = false;

    const warm = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = src;

        // decode() is the reliable signal that the bitmap is ready to paint.
        // It rejects if the image is detached or unsupported, so always fall
        // through to resolve — a failed warm-up must never block the refresh.
        if (typeof img.decode === 'function') {
          img.decode().then(resolve, resolve);
        } else {
          img.onload = resolve;
          img.onerror = resolve;
        }
      });

    Promise.all(sources.map(warm)).then(() => {
      if (cancelled) return;
      // Everything is decoded and laid out — re-measure every pin.
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
    };
  }, [sources]);
}
