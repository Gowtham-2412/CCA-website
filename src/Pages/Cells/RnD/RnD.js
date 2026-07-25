import React from 'react'
import RnDCss from './RnD.module.css'
import rnd from '../../../Assets/Images/rnd.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import instagram from '../../../Assets/Icons/instagram.svg';
import linkedin from '../../../Assets/Icons/linkedin.svg';
import RnDImg from '../../../Components/ImgLink/RnDImg';

const RnD = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    })
  }, [])

  const [items, setItem] = useState(RnDImg);

  return (
    <div className={RnDCss.wrap}>
      <div className='cell-detail'>
        <div className={RnDCss.detailWrap}>
          <div className={RnDCss.CellInfo} data-AOS="fade-up">
            <h1 className={RnDCss.heading} data-AOS="fade-right">Research & Development Cell</h1>
            <h3 className={RnDCss.great}>Welcome To The Research, Developement and Innovation Cell Of The Club</h3>
            <hr className={RnDCss.line} />
            <p className={RnDCss.slogo}>"If we knew what it was we were doing, it would not be called research, would it? " - Albert Einstein.
              Write from the begining of the dark age alot of ground breaking discoveries were made by man. There is no field in which research is not done. Research and Development (R&D) flourishes where young minds and experienced faculties work synergistically. R&D Cell has been established to promote and monitor the research Programs of the institute.</p>
          </div>
          <div className={RnDCss.CellImg} >
            <img src={rnd} alt="" className={RnDCss.img} data-AOS="zoom-in" />
          </div>
        </div>
        <div className={RnDCss.Heading} data-aos='fade'>
          <h1>Our Members</h1>
        </div>
        <main id={RnDCss.cardcontainer}>
          {items.map((elem) => {
            const { name, image } = elem;

            return (
              <div className={RnDCss.Cardbody} data-aos='fade-up'>
                <img src={image} alt={name}></img>
                {console.log(image)}
                <div className={RnDCss.cardcontent}>
                  <h1>SOMEONE NAME</h1>
                  <p>SENIOR Member</p>
                </div>
                <div className={RnDCss.cardback}>
                </div>
                <div className={RnDCss.cardsocial}>
                  <a href='#'><img className={RnDCss.socialicon} src={instagram}></img></a>
                  <a href='#'><img className={RnDCss.socialicon} src={linkedin}></img></a>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  )
}

export default RnD