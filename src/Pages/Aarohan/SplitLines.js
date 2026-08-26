import React from 'react';

/**
 * SplitLines — renders text as masked lines for a parent-driven reveal.
 *
 * Deliberately animates nothing. It only emits the markup:
 *
 *   .arhn-line          overflow: hidden  — the mask
 *     .arhn-line__inner                   — the parent animates this
 *
 * The parent selects `.arhn-line__inner` and tweens yPercent 110 → 0, so each
 * line rises out from behind its own mask edge.
 *
 * Components/UI/AnimatedText.js already splits text and animates it, but it
 * builds its own ScrollTrigger with `toggleActions: 'play none none none'` and
 * never checks prefers-reduced-motion — it would both refuse to reverse on
 * scroll-up and quietly opt out of this page's motion policy. So the reveal is
 * driven by the page's own scrubbed timelines instead.
 *
 * Class names are prefixed `arhn-` rather than reusing AboutUs.css's
 * `.split-line`: that stylesheet is imported app-wide (App.js loads every route
 * eagerly), so an unprefixed name would silently inherit another page's styles
 * and break the moment that page changed.
 *
 * Split on \n rather than measuring wrapped lines: the breaks are authored, so
 * the reveal rhythm is intentional instead of a side effect of viewport width.
 *
 * @param {string} text      Newline-separated lines.
 * @param {string} tag       Wrapper element (default 'h2').
 * @param {string} className Class for the wrapper.
 */
export default function SplitLines({ text, tag: Tag = 'h2', className = '' }) {
  const lines = String(text).split('\n');

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span className="arhn-line" key={i}>
          <span className="arhn-line__inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
