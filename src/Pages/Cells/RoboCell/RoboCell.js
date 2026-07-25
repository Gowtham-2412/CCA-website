import React from 'react'
import RoboCss from './RoboCell.module.css'
import robo from '../../../Assets/Images/robo.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import instagram from '../../../Assets/Icons/instagram.svg';
import linkedin from '../../../Assets/Icons/linkedin.svg';
import RoboCellImg from '../../../Components/ImgLink/RoboCellImg';

const RoboCell = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    })
  }, [])

  const [items, setItem] = useState(RoboCellImg);

  return (
    <div className={RoboCss.wrap}>
      <div className='cell-detail'>
        <div className={RoboCss.detailWrap}>
          <div className={RoboCss.CellInfo} data-AOS="fade-up">
            <h1 className={RoboCss.heading} data-AOS="fade-right">ROBO-CELL</h1>
            <h3 className={RoboCss.great}>Welcome to the Robotics Cell of the club</h3>
            <hr className={RoboCss.line} />
            <p className={RoboCss.slogo}>"First they ignore you, then they laugh at you, then they fight you, then you win." - Gandhi. Creation of automated machines which mimic and reproduce human
              behaviour, has been the topic of enthusiastic research for ages.
              With the recent ground-breaking advances in electronics science
              and programming technology, research and development in the field
              of producing high- precision, highly efficient robots is the
              latest trend.</p>
          </div>
          <div className={RoboCss.CellImg}>
            <img src={robo} alt="" className={RoboCss.img} data-AOS="zoom-in" />
          </div>
        </div>
        <div className={RoboCss.CellWork}>
          <h1 data-AOS="fade-up">WORKSHOPS</h1>
          <p data-AOS="fade-up">Workshops on mechanical/wired robots for beginners wherein
            complete robotics kits are provided and participants are taught
            the art of compiling a bot. A pre-Aarohan autonomous robotics
            workshop, generally in collaboration with professionals from the
            field of robotics is held.</p>
          <h1 data-AOS="fade-up">ROBOCITY</h1>
          <p data-AOS="fade-up">Stand-alone events (which take place in the odd semester) that
            test your prowess in robotics, based on application skills of the
            workshop knowledge that is held before the event, generally in
            collaboration with professionals.This is generally done to
            enlighten the 1st years about robotics.</p>
          <h1 data-AOS="fade-up">AAROHAN WORKSHOPS</h1>
          <p data-AOS="fade-up">Basic robotic events that are aimed to attract the participation
            of 1st and 2nd year students in order to develop there basic
            skills in making bots. Autonomous robotics events to test your
            skills and knowledge about your bot. Advanced level
            wired/mechanical robotics events.</p>
        </div>
        <div className={RoboCss.Heading} data-aos='fade'>
          <h1>Our Members</h1>
        </div>
        <main id={RoboCss.cardcontainer}>
          {items.map((elem) => {
            const { name, image } = elem;

            return (
              <div className={RoboCss.Cardbody} data-aos='fade-up'>
                <img src={image} alt={name}></img>
                {console.log(image)}
                <div className={RoboCss.cardcontent}>
                  <h1>SOMEONE NAME</h1>
                  <p>SENIOR Member</p>
                </div>
                <div className={RoboCss.cardback}>
                </div>
                <div className={RoboCss.cardsocial}>
                  <a href='#'><img className={RoboCss.socialicon} src={instagram}></img></a>
                  <a href='#'><img className={RoboCss.socialicon} src={linkedin}></img></a>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  )
}

export default RoboCell