import React from 'react'
import EcellCss from './Ecell.module.css'
import ecell from '../../../Assets/Images/e-cell.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import instagram from '../../../Assets/Icons/instagram.svg';
import linkedin from '../../../Assets/Icons/linkedin.svg';
import EcellImg from '../../../Components/ImgLink/EcellImg';

const Ecell = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    })
  }, [])

  const [items, setItem] = useState(EcellImg);

  return (
    <div className={EcellCss.wrap}>
      <div className='cell-detail'>
        <div className={EcellCss.detailWrap}>
          <div className={EcellCss.CellInfo} data-AOS="fade-up">
            <h1 className={EcellCss.heading} data-AOS="fade-right">Entrepreneurship Cell</h1>
            <h3 className={EcellCss.great}>Welcome To The Entrepreneurship Cell Of The Club</h3>
            <hr className={EcellCss.line} />
            <p className={EcellCss.slogo}>"Logic will get you from A to B. Imagination will get you everywhere else." - Albert Einstein.
              Rules and norms are there, meant to be followed, for the smooth pliability of social wagons. And then there is imagination. Imagination is a strange thing. It is wild, it is silly. It is the fuel to all great revolutionaries that have taken place in the history of the world.</p>
          </div>
          <div className={EcellCss.CellImg}>
            <img src={ecell} alt="" className={EcellCss.img} data-AOS="zoom-in" />
          </div>
        </div>
        <div className={EcellCss.CellWork} >
          <h1 data-AOS="fade-up">AIM</h1>
          <p data-AOS="fade-up">We at Entrepreneurship and Innovation Cell, NIT Durgapur, are a bunch of people who believe in the potent power of imagination and dreams. We strive to nourish the spirit of entrepreneurship among our members from the student community and faculty, inspire and encourage them to take on entrepreneurial challenges, and assist them in their efforts to launch and run business. We will also try to foster technical innovation within our campus, and would help them in proper incubations of the same.</p>
          <h1 data-AOS="fade-up">OBJECTIVE</h1>
          <p data-AOS="fade-up">
            Inculcating the spirit of entrepreneurship in students. Developing leadership qualities among students. Motivating the students to come up with feasible and practical business plans. Helping bridge the gap between the industry and academics. Developing a strong network of entrepreneurs, venture capitalists, corporate executives, EXECUTIVE professionals and individuals who are directly or indirectly related to Entrepreneurship. To help NITD students and alumni leverage from this network.</p>
          <h1 data-AOS="fade-up">ACTIVITIES</h1>
          <p data-AOS="fade-up">
            Inviting eminent entrepreneurs and NITD alumni from various industry to deliver lectures on entrepreneurship. Organizing inter college business plan competitions and have the CEOs of reputed organizations and entrepreneurs judging the event. Organizing brainstorming sessions to foster entrepreneurship and technical innovation Organizing a series of events related to entrepreneurship, business, economics and technical innovation in techno-management fest ‘Aarohan’, of our college.

          </p>
        </div>
        <div className={EcellCss.Heading} data-aos='fade'>
          <h1>Our Members</h1>
        </div>
        <main id={EcellCss.cardcontainer}>
          {items.map((elem) => {
            const { name, image } = elem;

            return (
              <div className={EcellCss.Cardbody} data-aos='fade-up'>
                <img src={image} alt={name}></img>
                {console.log(image)}
                <div className={EcellCss.cardcontent}>
                  <h1>SOMEONE NAME</h1>
                  <p>SENIOR Member</p>
                </div>
                <div className={EcellCss.cardback}>
                </div>
                <div className={EcellCss.cardsocial}>
                  <a href='#'><img className={EcellCss.socialicon} src={instagram}></img></a>
                  <a href='#'><img className={EcellCss.socialicon} src={linkedin}></img></a>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  )
}

export default Ecell