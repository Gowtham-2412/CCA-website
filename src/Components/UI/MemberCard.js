import React from 'react';
export default function MemberCard({
  name = 'Member Name',
  role = 'Senior Member',
  image,
  accentColor = '#fc4778'
}) {
  return (
    <article className="member-card">
        <div className="member-card__image">
          {image ? (
            <img
              src={image}
              alt={name}
              className="member-card__photo"
            />
          ) : (
            <div className="member-card__empty"><span>CCA</span><small>Photo unavailable</small></div>
          )}
        </div>
        <div className="member-card__body">
          <h3 title={name}>{name}</h3>
          <p style={{ color: accentColor }}>{role}</p>
        </div>
    </article>
  );
}
