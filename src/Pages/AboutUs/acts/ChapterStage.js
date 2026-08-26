import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitLines from '../SplitLines';
import { CHAPTERS } from '../aboutContent';
import { CINEMA, PLAIN } from '../motion';

/**
 * Act 2 — The Chapter Stage. The main upgrade of this rebuild.
 *
 * Before: four sections that scrolled past, each with a one-shot entrance tween.
 * Scroll triggered them but never drove them, and scrolling back up did nothing.
 *
 * Now: ONE pinned stage that four scenes move through. Scroll is the playhead —
 * every beat scrubs forward and backward.
 *
 * Per scene: media dollies in, headline rises line-by-line out of its masks,
 * body and detail follow, then it crossfades out as the next arrives.
 *
 * ── What keeps this affordable ──
 *
 * autoAlpha, not opacity. Two of these four images are 13 MB. autoAlpha sets
 * visibility:hidden at zero, and hidden layers aren't composited — so the
 * compositor holds ~2 full-viewport textures instead of 4. With plain opacity
 * this act would be four live layers the whole time and would not hold 60fps.
 *
 * ── Why the timeline uses absolute positions ──
 *
 * Every tween is placed at an explicit time (`t`, `t + SEG`, ...) rather than
 * chained with relative offsets like '<'. Relative offsets resolve against the
 * previously *added* animation, which includes zero-duration callbacks, so a
 * single reordering silently shifts the beats. Absolute positions make each
 * scene's segment independent and readable: scene i owns [i, i+1).
 */

const SEG = 1;      // timeline units per scene; maps to 100vh of scroll
const FADE = 0.4;   // crossfade length
const EXIT = 0.35;  // copy exit length

export default function ChapterStage() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(CINEMA, () => {
      const root = rootRef.current;
      if (!root) return;

      const scenes = gsap.utils.toArray('.scene', root);
      const progress = root.querySelector('.stage__progress-fill');
      if (scenes.length === 0) return;

      // Initial state: scene 0 on and readable, the rest off with copy hidden
      // behind its masks. Every media layer starts scaled up so that scene 0
      // dollies too — not just the ones that crossfade in.
      scenes.forEach((scene, i) => {
        const isFirst = i === 0;
        gsap.set(scene, { autoAlpha: isFirst ? 1 : 0 });
        gsap.set(scene.querySelector('.scene__media'), { scale: 1.14 });
        gsap.set(scene.querySelectorAll('.split-line__inner'), {
          yPercent: isFirst ? 0 : 110,
        });
        gsap.set(scene.querySelectorAll('.scene__fade'), {
          autoAlpha: isFirst ? 1 : 0,
          y: isFirst ? 0 : 24,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => '+=' + scenes.length * 100 + '%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          // will-change is scoped to the pinned window via a class, so the
          // layers aren't promoted for the whole page lifetime. autoAlpha does
          // the heavy lifting of keeping inactive scenes off the compositor.
          onToggle: (self) => root.classList.toggle('is-live', self.isActive),
          onUpdate: (self) => {
            if (progress) gsap.set(progress, { scaleX: self.progress });
          },
        },
      });

      scenes.forEach((scene, i) => {
        const t = i * SEG;
        const media = scene.querySelector('.scene__media');
        const lines = scene.querySelectorAll('.split-line__inner');
        const fades = scene.querySelectorAll('.scene__fade');

        // Continuous dolly across the scene's whole segment — the frame is
        // never completely static while a scene is on screen.
        tl.to(media, { scale: 1, duration: SEG }, t);

        // ── Enter (scene 0 is already on at t=0) ──
        if (i > 0) {
          tl.to(scene, { autoAlpha: 1, duration: FADE }, t)
            .to(scenes[i - 1], { autoAlpha: 0, duration: FADE }, t)
            // Headline rises out of its masks, line by line.
            .to(lines, { yPercent: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, t + 0.1)
            .to(fades, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.07 }, t + 0.15);
        }

        // ── Exit: copy sinks back behind the masks just before the crossfade,
        // so text leaves the frame before the image dissolves. Skipped for the
        // last scene, which stays up as the act ends. ──
        if (i < scenes.length - 1) {
          const exitAt = t + SEG - EXIT;
          tl.to(lines, { yPercent: -110, duration: EXIT, stagger: 0.05 }, exitAt)
            .to(fades, { autoAlpha: 0, y: -20, duration: EXIT * 0.85 }, exitAt);
        }
      });
    });

    // Mobile / tablet: a vertical stack with staggered entrance animations.
    // No pin, no crossfade — each scene reveals as user scrolls past it.
    mm.add(PLAIN, () => {
      const root = rootRef.current;
      if (!root) return;
      root.classList.remove('is-live');

      const scenes = gsap.utils.toArray('.scene', root);

      scenes.forEach((scene) => {
        const media = scene.querySelector('.scene__media');
        const lines = scene.querySelectorAll('.split-line__inner');
        const fades = scene.querySelectorAll('.scene__fade');

        // Start visible but positioned for entrance.
        gsap.set(scene, { autoAlpha: 1 });

        // Media dolly-in as user scrolls past.
        gsap.fromTo(
          media,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: scene,
              start: 'top 90%',
              end: 'center 50%',
              scrub: 0.5,
            },
          }
        );

        // Headline lines rise out of masks.
        gsap.fromTo(
          lines,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: { trigger: scene, start: 'top 75%' },
          }
        );

        // Body copy and details fade up.
        gsap.fromTo(
          fades,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: scene, start: 'top 65%' },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="stage">
      <div className="stage__viewport">
        {CHAPTERS.map((chapter, i) => (
          <article className="scene" key={chapter.step} aria-label={chapter.label}>
            <div className="scene__media">
              {/* Chapter 1 is the first heavy image in view — load it eagerly.
                  The rest are warmed by useDecodedImages during Act 0. */}
              <img
                src={chapter.image}
                alt={chapter.label}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>

            <div className="scene__scrim" aria-hidden="true" />

            <div className="scene__copy">
              <span className="scene__step scene__fade">
                <span className="scene__step-num">{chapter.step}</span>
                <span className="scene__step-label">{chapter.label}</span>
              </span>

              <SplitLines text={chapter.title} tag="h2" className="scene__title" />

              <p className="scene__body scene__fade">{chapter.body}</p>
              <p className="scene__detail scene__fade">{chapter.detail}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="stage__progress" aria-hidden="true">
        <span className="stage__progress-fill" />
      </div>
    </section>
  );
}
