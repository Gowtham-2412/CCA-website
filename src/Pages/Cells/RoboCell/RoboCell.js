import React from 'react'
import RoboCss from './RoboCell.module.css'
import robo from '../../../Assets/Images/robo.png'

const RoboCell = () => {
  return (
    <div className={RoboCss.wrap}>
      <div className='cell-detail'>
        <div className={RoboCss.detailWrap}>
          <div className={RoboCss.CellInfo}>
            <h1 className={RoboCss.heading}>ROBO-CELL</h1>
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
            <img src={robo} alt="" className={RoboCss.img} />
          </div>
        </div>
        <div className={RoboCss.CellWork}>
          <h1>WORKSHOPS</h1>
          <p>Workshops on mechanical/wired robots for beginners wherein
            complete robotics kits are provided and participants are taught
            the art of compiling a bot. A pre-Aarohan autonomous robotics
            workshop, generally in collaboration with professionals from the
            field of robotics is held.</p>
          <h1>ROBOCITY</h1>
          <p>Stand-alone events (which take place in the odd semester) that
            test your prowess in robotics, based on application skills of the
            workshop knowledge that is held before the event, generally in
            collaboration with professionals.This is generally done to
            enlighten the 1st years about robotics.</p>
          <h1>AAROHAN WORKSHOPS</h1>
          <p>Basic robotic events that are aimed to attract the participation
            of 1st and 2nd year students in order to develop there basic
            skills in making bots. Autonomous robotics events to test your
            skills and knowledge about your bot. Advanced level
            wired/mechanical robotics events.</p>
        </div>
      </div>
    </div>
  )
}

export default RoboCell