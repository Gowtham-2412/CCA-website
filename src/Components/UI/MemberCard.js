import React from 'react';
import TiltedCard from './TiltedCard';
import instagramIcon from '../../Assets/Icons/instagram.svg';
import linkedinIcon from '../../Assets/Icons/linkedin.svg';
import { User } from 'lucide-react';

export default function MemberCard({
  name = 'Member Name',
  role = 'Senior Member',
  image,
  accentColor = '#8EC15C',
  instagram = '#',
  linkedin = '#'
}) {
  return (
    <TiltedCard maxTilt={14} scale={1.06} className="w-[270px] m-3">
      <div className="bg-white rounded-2xl p-3.5 shadow-md border border-slate-200/80 hover:border-[#8EC15C] hover:ring-2 hover:ring-[#8EC15C]/30 hover:shadow-2xl hover:shadow-[#8EC15C]/20 transition-all duration-300 flex flex-col group overflow-hidden cursor-pointer">
        {/* Large Prominent Image Showcase */}
        <div className="relative w-full h-[260px] rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-inner mb-3">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
              <User size={56} className="mb-2 text-slate-300 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs font-medium text-slate-400">Photo Unavailable</span>
            </div>
          )}

          {/* Glowing Accent Indicator Line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* Member Details */}
        <div className="px-1 text-center flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base text-[#303030] tracking-tight mb-0.5 truncate w-full group-hover:text-[#8EC15C] transition-colors duration-200" title={name}>
              {name}
            </h3>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3" style={{ color: accentColor }}>
              {role}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2.5 border-t border-slate-100 w-full justify-center">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#e84e1b] hover:text-white transition-all duration-200 hover:scale-115 hover:shadow-md"
              title="Instagram"
            >
              <img src={instagramIcon} alt="Instagram" className="w-4 h-4" />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#0a66c2] hover:text-white transition-all duration-200 hover:scale-115 hover:shadow-md"
              title="LinkedIn"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </TiltedCard>
  );
}
