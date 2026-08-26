import React, { useMemo, useState } from 'react';
import ImgLib from '../../Components/ImgLink/ImageLib';
import MemberCard from '../../Components/UI/MemberCard';
import './Hall.css';
import '../Editorial.css';

const batches = ['Batch 2023', 'Batch 2022', 'Batch 2021', 'Batch 2020'];

export default function Hall() {
  const [batch, setBatch] = useState(batches[0]);
  const people = useMemo(() => ImgLib.filter(person => person.category === batch), [batch]);
  return (
    <main className="editorial-page hall-page">
      <header className="hall-page__hero">
        <div className="editorial-header">
          <div className="editorial-header__left">
            <p className="editorial-kicker">CCA / Archive</p>
            <h1 className="editorial-title">Hall of fame.</h1>
          </div>
          <div className="editorial-header__right">
            <p className="editorial-lead">A continuing record of the people who helped shape CCA and left a signal for the next cohort.</p>
          </div>
        </div>
      </header>
      <section className="hall-page__archive">
        <nav aria-label="Choose a graduating batch">
          {batches.map((item, index) => (
            <button
              key={item}
              className={batch === item ? 'is-active' : ''}
              onClick={() => setBatch(item)}
            >
              <span>0{index + 1}</span>{item.replace('Batch ', '')}
            </button>
          ))}
        </nav>
        <div className="hall-page__batch">
          <p className="editorial-kicker">Selected archive</p>
          <h2>{batch.replace('Batch ', '')}</h2>
          <p>Graduating Cohort / CCA</p>
        </div>
        <div className="hall-page__roster">
          {people.map((person, index) => (
            <MemberCard key={`${person.name}-${index}`} {...person} role="" />
          ))}
        </div>
      </section>
    </main>
  );
}
