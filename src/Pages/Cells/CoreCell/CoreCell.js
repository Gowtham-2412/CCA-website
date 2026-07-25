import React from 'react'
import CoreCss from './CoreCell.module.css'
import core from '../../../Assets/Images/core-img.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import instagram from '../../../Assets/Icons/instagram.svg';
import linkedin from '../../../Assets/Icons/linkedin.svg';
import CoreImg from '../../../Components/ImgLink/CoreImg';

const CoreCell = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    })
  }, [])
  const [items, setItem] = useState(CoreImg);

  return (
    <div className={CoreCss.wrap}>
      <div className='cell-detail'>
        <div className={CoreCss.detailWrap}>
          <div className={CoreCss.CellInfo} data-AOS="fade-up">
            <h1 className={CoreCss.heading} data-AOS="fade-right">Core Cell</h1>
            <h3 className={CoreCss.great}>Welcome to the Core Cell of the Club</h3>
            <hr className={CoreCss.line} />
            <p className={CoreCss.slogo}>"Management is doing things right; Leadership is doing right things." -
              Peter Drucker. Motivating, along with leading is a task well known
              by these robust people. Engaged throughout the year, working
              behind the scenes, the core cell excels in cooperating with the
              other cells to get things done</p>
          </div>
          <div className={CoreCss.CellImg}>
            <img src={core} alt="" className={CoreCss.img} data-AOS="zoom-in" />
          </div>
        </div>
        <div className={CoreCss.CellWork} >
          <h1 data-AOS="fade-up">AIM</h1>
          <p data-AOS="fade-up">Our aim is to carry out the smooth functioning of the club. Filled
            with well-disciplined people we try to get out the best from
            everyone indulged in the club's activities.</p>
          <h1 data-AOS="fade-up">RESPONSIBILITY</h1>
          <p data-AOS="fade-up">
            1.Overseeing the activities of the club.<br />2.Arranging as well as conducting
            various technical and managements workshops/events round the clock
            throughout the year inside and outside the college.
            <br />3.Arranging for sponsorships and monetary aids for the club and the
            annual techno-management fest of NITD-'AAROHAN'.<br />4.Publicising our events.</p>
        </div>
        <div className={CoreCss.Heading} data-aos='fade'>
          <h1>Our Members</h1>
        </div>
        <main id={CoreCss.cardcontainer}>
          {items.map((elem) => {
            const { name, image } = elem;

            return (
              <div className={CoreCss.Cardbody} data-aos='fade-up'>
                <img src={image} alt={name}></img>
                {console.log(image)}
                <div className={CoreCss.cardcontent}>
                  <h1>SOMEONE NAME</h1>
                  <p>SENIOR Member</p>
                </div>
                <div className={CoreCss.cardback}>
                </div>
                <div className={CoreCss.cardsocial}>
                  <a href='#'><img className={CoreCss.socialicon} src={instagram}></img></a>
                  <a href='#'><img className={CoreCss.socialicon} src={linkedin}></img></a>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>


  )
}

export default CoreCell