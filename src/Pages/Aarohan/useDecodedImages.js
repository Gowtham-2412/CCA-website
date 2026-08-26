import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * useDecodedImages — force images through decode before they matter.
 *
 * Aarohan-local. ../AboutUs/useDecodedImages.js is a separate copy and still
 * uses the parallel strategy, which is correct there: that page's two heavy
 * chapter images feed a pinned act whose measurement genuinely depends on them.
 *
 * ── Why this one warms sequentially ──
 *
 * It used to be `Promise.all(sources.map(warm))` over all seven full-size
 * gallery JPEGs — 44 MB of camera originals, four of them 6.8-14.9 MB. Kicking
 * all seven decodes off at once is a single large memory spike, and on a
 * constrained device the browser responds by evicting bitmaps it has already
 * decoded, then re-decoding them when they are next painted. That re-decode is
 * one of the things that made the old pinned gallery stutter.
 *
 * Sequential warming costs slightly more wall-clock and produces no spike. It is
 * the right trade because nothing on screen is waiting on it: the gallery is
 * several viewports below the hero, and the viewfinder only ever needs one
 * full-size frame at a time.
 *
 * What gets passed in is now WARM_ON_ARRIVAL from galleryFrames.js — the seven
 * thumbnails plus frame 0, not every full-size photo. GalleryViewfinder handles
 * the rest on demand by preloading the active frame's neighbours.
 *
 * ── Why the refresh is debounced ──
 *
 * ScrollTrigger.refresh() re-measures every trigger on the page. Firing it while
 * the reader is mid-scroll is itself a visible jump — it was previously called
 * the instant the last decode resolved, which on a slow connection could easily
 * land mid-gesture. Waiting for a short gap in scroll activity makes it free.
 *
 * With the gallery pin gone there are no pinned triggers left on this route, so
 * this is now belt-and-braces rather than load-bearing. It stays because the
 * page still has scrubbed triggers whose start/end resolve against layout.
 *
 * @param {string[]} sources Image URLs to warm, in priority order. Must be a
 *                           stable reference — define the array at module scope,
 *                           not inline.
 */
export default function useDecodedImages(sources) {
  useEffect(() => {
    if (!sources || sources.length === 0) return undefined;

    let cancelled = false;
    let timer = null;

    const warm = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = src;

        // decode() is the reliable signal that the bitmap is ready to paint.
        // It rejects if the image is detached or unsupported, so always fall
        // through to resolve — a failed warm-up must never stall the queue.
        if (typeof img.decode === 'function') {
          img.decode().then(resolve, resolve);
        } else {
          img.onload = resolve;
          img.onerror = resolve;
        }
      });

    // Re-measure once the reader has been still for a moment. Any scroll resets
    // the wait, so this can only ever run during a lull.
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(refresh, 200);
    };

    function refresh() {
      window.removeEventListener('scroll', onScroll);
      if (!cancelled) ScrollTrigger.refresh();
    }

    (async () => {
      for (const src of sources) {
        if (cancelled) return;
        // Deliberately serial — see the note above on the memory spike.
        // eslint-disable-next-line no-await-in-loop
        await warm(src);
      }
      if (cancelled) return;

      window.addEventListener('scroll', onScroll, { passive: true });
      timer = setTimeout(refresh, 200);
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [sources]);
}
