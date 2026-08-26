import { useEffect, useState } from 'react';
import { CINEMA } from './motion';

/**
 * useTamedVideo — keep the 93 MB hero video without paying for it up front.
 *
 * `src/Assets/Videos/Aarohan.mp4` is 93 MB and the previous build mounted it as
 * `<video muted autoPlay loop playsInline src={arhnvd} />` with no poster and no
 * preload hint, on a page that also loads ~45 MB of gallery JPEGs. The file
 * itself is staying byte-for-byte; this hook changes only how it's fetched.
 *
 * Three separate wins, and it's worth being precise about which does what,
 * because they're often conflated:
 *
 *   · **Poster.** `poster={ARHN1}` (366 KB, already imported for the gallery)
 *     paints the hero immediately instead of leaving a black box until the
 *     first video frame arrives.
 *
 *   · **Deferred src.** This is the real fix for first load. `autoplay` largely
 *     overrides `preload="metadata"` — a browser told to autoplay will fetch
 *     enough data to start playing regardless of the hint. So instead of
 *     relying on the hint, `src` is not attached until the browser reports
 *     idle. The poster, fonts, and hero copy get the network to themselves for
 *     the first moment. `preload="metadata"` is still set, since it does apply
 *     when autoplay is refused (power-save, some mobile browsers).
 *
 *   · **Pause when offscreen.** This is the biggest saving over the life of the
 *     page, and it costs nothing visually. `.aarohan`'s background scrubs from
 *     transparent to opaque #0d0d0d across the hero's first 70%, and the video
 *     sits behind it at `z-index: -1` — so past the hero the video is *fully
 *     occluded*. It was decoding and buffering 93 MB that could not be seen for
 *     the entire rest of the page. Pausing stops the browser buffering the
 *     tail, which is where most of those bytes are.
 *
 * On PLAIN (phones, reduced motion) `src` is never attached at all. A 93 MB
 * autoplaying background on cellular is not a defensible default.
 *
 * @param {React.RefObject<HTMLVideoElement>} videoRef The <video> element.
 * @param {React.RefObject<HTMLElement>} heroRef       Section whose visibility gates playback.
 * @param {string} videoSrc                           The imported video URL.
 * @returns {{src: string|null, enabled: boolean}}     `src` to spread onto the element.
 */
export default function useTamedVideo(videoRef, heroRef, videoSrc) {
  const [enabled, setEnabled] = useState(false);
  const [src, setSrc] = useState(null);

  // ── Tier ──
  // Tracked live rather than sampled once, so resizing across the breakpoint
  // actually detaches the video instead of leaving it running.
  useEffect(() => {
    const mql = window.matchMedia(CINEMA);
    const sync = () => setEnabled(mql.matches);

    sync();

    // addListener is the deprecated form, still needed for Safari < 14.
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', sync);
      return () => mql.removeEventListener('change', sync);
    }
    mql.addListener(sync);
    return () => mql.removeListener(sync);
  }, []);

  // ── Deferred src ──
  useEffect(() => {
    if (!enabled) {
      setSrc(null);
      return undefined;
    }

    const start = () => setSrc(videoSrc);

    // Each branch returns the cleanup that matches how it scheduled, so we can
    // never cancel with the wrong API.
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, [enabled, videoSrc]);

  // ── Pause when the hero is offscreen ──
  useEffect(() => {
    if (!enabled || !src) return undefined;

    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return undefined;

    // The hero is observed, not the video: the video is position:fixed and
    // covers the viewport, so it would always report itself as intersecting.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rejects if autoplay is refused. Nothing to recover — the
          // poster stays up, which is a fine outcome.
          const attempt = video.play();
          if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0 }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, [enabled, src, videoRef, heroRef]);

  return { src, enabled };
}
