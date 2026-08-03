import React from 'react';
import TiltedCard from './TiltedCard';

export default function PhotoGalleryCard({ src, alt, caption }) {
  return (
    <TiltedCard maxTilt={5} scale={1.02} className="w-full">
      <div className="bg-white p-3.5 rounded-2xl shadow-md border border-black/5 hover:shadow-2xl transition-all duration-300 group">
        <div className="relative h-[380px] w-full overflow-hidden rounded-xl bg-slate-100">
          <img
            src={src}
            alt={alt || "Gallery Image"}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-sm font-medium tracking-wide">
              {caption || "Aarohan Fest Highlights"}
            </span>
          </div>
        </div>
      </div>
    </TiltedCard>
  );
}
