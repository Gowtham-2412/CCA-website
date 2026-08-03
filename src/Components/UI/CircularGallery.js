import React, { useState, useEffect, useRef } from 'react';

// A simple utility for conditional class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const CircularGallery = React.forwardRef(
  ({ items = [], className, radius = 520, autoRotateSpeed = 0.08, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef(null);
    const animationFrameRef = useRef(null);
    const containerRef = useRef(null);

    // Combine external ref and internal containerRef
    const setRefs = (node) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Wheel event handler: scroll ONLY rotates the gallery without scrolling the document body
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleWheel = (e) => {
        e.preventDefault();
        setIsScrolling(true);

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Rotate gallery proportionally to wheel delta
        setRotation((prev) => prev + e.deltaY * 0.18);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      container.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        container.removeEventListener('wheel', handleWheel);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    // Effect for ambient auto-rotation when not wheel-scrolling
    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) {
          setRotation((prev) => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, autoRotateSpeed]);

    if (!items || items.length === 0) return null;

    const anglePerItem = 360 / items.length;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const effectiveRadius = isMobile ? Math.min(radius, 330) : radius;

    return (
      <div
        ref={setRefs}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full h-[460px] sm:h-[580px] flex items-center justify-center overflow-hidden my-4 sm:my-6 select-none touch-none",
          className
        )}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isScrolling ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            // Smooth opacity scaling: 1.0 at front down to 0.35 at the back
            const opacity = Math.max(0.35, 1 - (normalizedAngle / 180) * 0.65);

            return (
              <div
                key={item.photo?.url || i}
                role="group"
                aria-label={item.common}
                className="absolute w-[220px] sm:w-[290px] h-[300px] sm:h-[380px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${effectiveRadius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: isMobile ? '-110px' : '-145px',
                  marginTop: isMobile ? '-150px' : '-190px',
                  opacity: opacity,
                  transition: 'opacity 0.3s linear',
                  backfaceVisibility: 'visible'
                }}
              >
                <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-white/20 bg-slate-900/80 backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white text-left">
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight">{item.common}</h2>
                    <em className="text-xs sm:text-sm italic text-[#b8d474] block mt-0.5">{item.binomial}</em>
                    <p className="text-[11px] mt-1.5 opacity-80 font-medium">Photo by: {item.photo.by}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export default CircularGallery;
export { CircularGallery };
