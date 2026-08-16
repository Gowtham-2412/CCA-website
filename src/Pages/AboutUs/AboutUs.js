import React from 'react';
import './AboutUs.css';
import '../Editorial.css';
import carouselimg1 from '../../Assets/Images/carouselimg1.JPG';
import carouselimg2 from '../../Assets/Images/carouselimg2.JPG';
import parichay from '../../Assets/Images/parichay.jpeg';
import robozido from '../../Assets/Images/robozido.jpeg';
import designworkshop from '../../Assets/Images/design workshop.jpeg';
import assisteque from '../../Assets/Images/assisteque.jpeg';

const images = [carouselimg1, parichay, robozido, designworkshop, assisteque, carouselimg2];

export default function AboutUs() {
  return <main className="editorial-page about-page">
    <header className="about-page__hero">
      <p className="editorial-kicker">Since 2003 / NIT Durgapur</p>
      <h1 className="editorial-title">A place for minds in motion.</h1>
      <p className="editorial-lead">CCA is where technical curiosity, creative instinct and organisational energy meet. We bring students together to make work that travels beyond the classroom.</p>
    </header>
    <section className="about-page__gallery" aria-label="CCA in motion">
      {images.map((image, index) => <img className="image-dither" src={image} alt="CCA in action" key={index} />)}
      <div className="about-page__gallery-note">CCA / 2003—NOW<br />MADE WITH PEOPLE</div>
    </section>
    <section className="about-page__story">
      <p className="editorial-kicker">Our practice</p>
      <div><h2>We learn by putting ideas in public.</h2><p>CCA is the focal point where students turn knowledge into activity. Across research, robotics, entrepreneurship, design and operations, we create occasions to build, test, argue, lead and begin again.</p></div>
    </section>
    <section className="about-page__facts" aria-label="CCA facts">
      <p><span>01</span> Five cells, one shared momentum.</p><p><span>02</span> Technical, creative and managerial practice.</p><p><span>03</span> The people behind Aarohan and year-round campus work.</p>
    </section>
  </main>;
}
