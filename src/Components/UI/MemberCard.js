import React, { useState } from 'react';
import { instagram, instagramhover, linkedin, linkedinhover } from '../../Assets/Icons';

export default function MemberCard({
  name = 'Member Name',
  role = 'Senior Member',
  image,
  accentColor = '#fc4778',
  instagramUrl = 'https://instagram.com',
  linkedinUrl = 'https://linkedin.com',
}) {
  const [instaHovered, setInstaHovered] = useState(false);
  const [linkedHovered, setLinkedHovered] = useState(false);

  return (
    <article className="member-card group/card" data-cursor-text="MEMBER">
      <div className="member-card__image">
        {image ? (
          <img
            src={image}
            alt={name}
            className="member-card__photo"
          />
        ) : (
          <div className="member-card__empty">
            <span>CCA</span>
            <small>Photo unavailable</small>
          </div>
        )}

        {/* Ambient Dark Gradient on Hover */}
        <div className="member-card__overlay" />

        {/* Awwwards-style Floating Glass Social Dock */}
        <div className="member-card__social-dock">
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="member-card__social-btn member-card__social-btn--insta"
              aria-label={`${name}'s Instagram`}
              onMouseEnter={() => setInstaHovered(true)}
              onMouseLeave={() => setInstaHovered(false)}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={instaHovered ? instagramhover : instagram}
                alt="Instagram"
                className="member-card__social-icon"
              />
              <span className="member-card__tooltip">Instagram</span>
            </a>
          )}

          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="member-card__social-btn member-card__social-btn--linkedin"
              aria-label={`${name}'s LinkedIn`}
              onMouseEnter={() => setLinkedHovered(true)}
              onMouseLeave={() => setLinkedHovered(false)}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={linkedHovered ? linkedinhover : linkedin}
                alt="LinkedIn"
                className="member-card__social-icon"
              />
              <span className="member-card__tooltip">LinkedIn</span>
            </a>
          )}
        </div>
      </div>

      <div className="member-card__body">
        <h3 title={name} className="member-card__name">{name}</h3>
        {role && <p className="member-card__role" style={{ color: accentColor }}>{role}</p>}
      </div>
    </article>
  );
}
