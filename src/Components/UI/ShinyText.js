import React from 'react';

export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = '',
  style = {}
}) {
  return (
    <span
      className={`inline-block bg-clip-text ${disabled ? '' : 'animate-shiny'} ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, currentColor 0%, #ffffff 50%, currentColor 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: `${speed}s`,
        ...style
      }}
    >
      {text}
    </span>
  );
}
