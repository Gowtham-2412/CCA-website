import { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedText — reusable scroll-triggered text reveal.
 *
 * Props
 * ─────
 * @param {string}  text        The text to render.
 * @param {string}  variant     "words" | "chars" | "lines"  (default "words")
 * @param {string}  tag         HTML tag for the wrapper       (default "p")
 * @param {string}  className   Extra class names.
 * @param {number}  stagger     Seconds between each unit      (default 0.045)
 * @param {number}  duration    Animation duration in seconds   (default 0.7)
 * @param {string}  triggerStart ScrollTrigger start value      (default "top 88%")
 * @param {boolean} once        If true, plays only once        (default true)
 * @param {object}  style       Inline styles for wrapper.
 */
export default function AnimatedText({
  text,
  variant = 'words',
  tag: Tag = 'p',
  className = '',
  stagger = 0.045,
  duration = 0.7,
  triggerStart = 'top 88%',
  once = true,
  style,
}) {
  const wrapRef = useRef(null);

  const units = useMemo(() => {
    if (variant === 'chars') return text.split('');
    if (variant === 'lines') return text.split('\n');
    return text.split(/\s+/);
  }, [text, variant]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const spans = el.querySelectorAll('.anim-unit');

    gsap.set(spans, { y: 40, opacity: 0 });

    const tween = gsap.to(spans, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [units, duration, stagger, triggerStart, once]);

  return (
    <Tag ref={wrapRef} className={className} style={{ ...style, overflow: 'clip', paddingBottom: '0.12em' }}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="anim-unit"
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity',
            fontFamily: 'inherit',
          }}
        >
          {unit}
          {variant === 'words' && i < units.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}
