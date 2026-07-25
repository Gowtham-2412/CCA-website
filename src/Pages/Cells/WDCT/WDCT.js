import React from 'react'
import WdctCss from './WDCT.module.css'
import wdct from '../../../Assets/Images/wdct.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import instagram from '../../../Assets/Icons/instagram.svg';
import linkedin from '../../../Assets/Icons/linkedin.svg';
import WDCTImg from '../../../Components/ImgLink/WDCTImg';


const WDCT = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    })
  }, [])

  const [items, setItem] = useState(WDCTImg);

  return (
    <div className={WdctCss.wrap}>
      <div className='cell-detail'>
        <div className={WdctCss.detailWrap}>
          <div className={WdctCss.CellInfo} data-AOS="fade-up">
            <h1 className={WdctCss.heading} data-AOS="fade-right">Web, Design & Creative Team</h1>
            <h3 className={WdctCss.great}>Welcome to the Technical Cell of the club</h3>
            <hr className={WdctCss.line} />
            <p className={WdctCss.slogo}>A congregation of enthusiastic techno-crats, we manage the technical aspects of the club, to keep it up and running in the cyber front. From designing websites for fests to organising workshops for amateurs, we nurture the creative spurt in the club.</p>
          </div>
          <div className={WdctCss.CellImg}>
            <img src={wdct} alt="" className={WdctCss.img} data-AOS="zoom-in" />
          </div>
        </div>
        <div className={WdctCss.CellWork} >
          <h1 data-AOS="fade-up">Web Development Team</h1>
          <p data-AOS="fade-up">This team is responsible for the development, design of the various websites associated with CCA, the Aarohan official website and various online publication and propaganda of the events of the club. It also devises interactive online events, which see about 3000 online participants, for Aarohan, the Annual Techno-Management Fest of CCA.</p>
          <h1 data-AOS="fade-up">Design Team</h1>
          <p data-AOS="fade-up">
            This creative team is entrusted with the development and designing of the various offline propaganda means for CCA as well as for Aarohan-The Annual Techno Management Fest of NIT Durgapur. It designs the sponsorship and talk show brochures for Aarohan, flyers, pamphlets, event posters and flexes for Aarohan.</p>
        </div>
        <div className={WdctCss.Heading} data-aos='fade'>
          <h1>Our Members</h1>
        </div>
        <main id={WdctCss.cardcontainer}>
          {items.map((elem) => {
            const { name, image } = elem;

            return (
              <div className={WdctCss.Cardbody} data-aos='fade-up'>
                <img src={image} alt={name}></img>
                {console.log(image)}
                <div className={WdctCss.cardcontent}>
                  <h1>SOMEONE NAME</h1>
                  <p>SENIOR Member</p>
                </div>
                <div className={WdctCss.cardback}>
                </div>
                <div className={WdctCss.cardsocial}>
                  <a href='#'><img className={WdctCss.socialicon} src={instagram}></img></a>
                  <a href='#'><img className={WdctCss.socialicon} src={linkedin}></img></a>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  )
}

export default WDCT