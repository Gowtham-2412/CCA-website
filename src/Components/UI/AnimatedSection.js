import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DIRS = {
  up:    { y:  60, x: 0 },
  down:  { y: -60, x: 0 },
  left:  { y:  0,  x:  80 },
  right: { y:  0,  x: -80 },
  none:  { y:  0,  x: 0 },
};

/**
 * AnimatedSection — scroll-triggered entrance for any children.
 *
 * Props
 * ─────
 * @param {React.ReactNode} children
 * @param {string}  direction    "up" | "down" | "left" | "right" | "none"  (default "up")
 * @param {number}  delay        Delay in seconds         (default 0)
 * @param {number}  duration     Animation duration        (default 0.8)
 * @param {string}  triggerStart ScrollTrigger start value (default "top 90%")
 * @param {boolean} staggerChildren  If true, animates each direct child with stagger (default false)
 * @param {number}  stagger      Stagger amount in seconds (default 0.1)
 * @param {string}  className    Extra class names.
 * @param {object}  style        Inline styles.
 * @param {string}  tag          HTML tag for the wrapper  (default "div")
 */
export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  triggerStart = 'top 90%',
  staggerChildren = false,
  stagger = 0.1,
  className = '',
  style,
  tag: Tag = 'div',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { x, y } = DIRS[direction] || DIRS.up;

    const targets = staggerChildren ? el.children : el;

    gsap.set(targets, { y, x, opacity: 0 });

    const tween = gsap.to(targets, {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      delay,
      stagger: staggerChildren ? stagger : 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, delay, duration, triggerStart, staggerChildren, stagger]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
