import React from 'react';

/**
 * SplitLines — renders text as masked lines for a parent-driven reveal.
 *
 * Components/UI/AnimatedText.js already splits text and animates it, and it is
 * the right tool anywhere a self-contained ScrollTrigger is wanted (Acts 4 and
 * 5 use it). It can't be used inside Act 2, because it builds its own
 * ScrollTrigger — and Act 2's copy has to be driven by the pinned stage's
 * master timeline instead, so scrubbing backwards plays it in reverse.
 *
 * So this deliberately animates nothing. It only emits the markup:
 *
 *   .split-line          overflow: hidden  — the mask
 *     .split-line__inner                   — the parent animates this
 *
 * The parent selects `.split-line__inner` and tweens yPercent 100 → 0, so each
 * line rises out from behind its own mask edge.
 *
 * Split on \n rather than measuring wrapped lines: the breaks in aboutContent.js
 * are authored, so the reveal rhythm is intentional instead of a side effect of
 * the viewport width.
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
        <span className="split-line" key={i}>
          <span className="split-line__inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
