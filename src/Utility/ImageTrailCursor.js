// ImageTrailCursor.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ImageTrailCursor({ images, containerRef }) {
  const trailRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const container = containerRef.current;
    const trailLayer = trailRef.current;

    if (!container || !trailLayer || !images?.length) return;

    /* =========================================================
       CONFIG
    ========================================================= */

    const SPAWN_DIST = 55;
    const RENDER_LERP = 0.7; // fast smoothing — tracks cursor closely, kills jitter between samples

    const IN_DUR = 0.35;
    const DRIFT_DUR = 0.75;
    const OUT_DUR = 0.55;

    const DRIFT_AMOUNT = 22;

    let lastImgSrc = null;

    const target = { x: null, y: null };
    const render = { x: 0, y: 0 };
    let lastSpawn = { x: 0, y: 0 };
    let hasMoved = false;
    let rafId;

    /* =========================================================
       RANDOM IMAGE
    ========================================================= */

    const pickRandomImage = () => {
      if (images.length === 1) return images[0];
      let next;
      do {
        next = images[Math.floor(Math.random() * images.length)];
      } while (next === lastImgSrc);
      lastImgSrc = next;
      return next;
    };

    /* =========================================================
       GET MOUSE POSITION RELATIVE TO TRAIL
    ========================================================= */

    const getMousePosition = (e) => {
      const rect = trailLayer.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    /* =========================================================
       SPAWN IMAGE
    ========================================================= */

    const spawnAt = (x, y) => {
      const img = document.createElement('img');
      img.src = pickRandomImage();
      img.className =
        'absolute w-24 h-24 object-cover rounded-xl pointer-events-none will-change-transform';
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      trailLayer.appendChild(img);

      const centerX = trailLayer.clientWidth / 2;
      const centerY = trailLayer.clientHeight / 2;

      let dirX = x - centerX;
      let dirY = y - centerY;
      const magnitude = Math.hypot(dirX, dirY) || 1;
      dirX /= magnitude;
      dirY /= magnitude;

      const driftX = dirX * DRIFT_AMOUNT;
      const driftY = dirY * DRIFT_AMOUNT;

      const initialRotation = gsap.utils.random(-12, 12);
      const driftRotation = gsap.utils.random(-4, 4);

      gsap.set(img, {
        x: 0,
        y: 0,
        xPercent: -50,
        yPercent: -50,
        scale: 0.6,
        opacity: 0,
        rotation: initialRotation,
      });

      // Continuous motion instead of three disjointed segments:
      // overlapping start times ('<' / small negative offsets) let GSAP
      // carry velocity across the pop-in → drift → fade phases instead
      // of each one starting from a dead stop.
      gsap.timeline({
        onComplete: () => img.remove(),
      })
        .to(img, {
          opacity: 1,
          scale: 1,
          duration: IN_DUR,
          ease: 'power1.out',
        })
        .to(
          img,
          {
            x: driftX,
            y: driftY,
            rotation: `+=${driftRotation}`,
            opacity: 0.65,
            duration: DRIFT_DUR,
            ease: 'sine.inOut',
          },
          '-=0.05' // starts slightly before pop-in fully settles — removes the kink
        )
        .to(
          img,
          {
            x: driftX * 2.4,
            y: driftY * 2.4,
            scale: 0.9,
            opacity: 0,
            duration: OUT_DUR,
            ease: 'sine.in', // was power1.in — sine matches the drift's easing family, less abrupt handoff
          },
          '-=0.1'
        );
    };

    /* =========================================================
       MOUSE MOVE — updates target only, does not spawn directly
    ========================================================= */

    const onMouseMove = (e) => {
      const current = getMousePosition(e);
      target.x = current.x;
      target.y = current.y;

      if (!hasMoved) {
        render.x = lastSpawn.x = current.x;
        render.y = lastSpawn.y = current.y;
        hasMoved = true;
      }
    };

    /* =========================================================
       RAF LOOP — smooths render position toward target, then
       walks the smoothed path to decide spawn points
    ========================================================= */

    const tick = () => {
      if (hasMoved) {
        render.x += (target.x - render.x) * RENDER_LERP;
        render.y += (target.y - render.y) * RENDER_LERP;

        const dx = render.x - lastSpawn.x;
        const dy = render.y - lastSpawn.y;
        const distance = Math.hypot(dx, dy);

        if (distance >= SPAWN_DIST) {
          const steps = Math.floor(distance / SPAWN_DIST);
          for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            spawnAt(lastSpawn.x + dx * t, lastSpawn.y + dy * t);
          }
          lastSpawn = { x: render.x, y: render.y };
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    /* =========================================================
       EVENTS
    ========================================================= */

    container.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(tick);

    /* =========================================================
       CLEANUP
    ========================================================= */

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);

      Array.from(trailLayer.children).forEach((img) => {
        gsap.killTweensOf(img);
      });

      trailLayer.replaceChildren();
    };
  }, [containerRef, images]);

  return (
    <div
      ref={trailRef}
      className="absolute inset-0 z-[5] overflow-hidden pointer-events-none"
    />
  );
}