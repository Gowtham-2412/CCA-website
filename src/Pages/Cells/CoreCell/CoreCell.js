import React from 'react'
import CoreCss from './CoreCell.module.css'
import { core } from '../../../Assets/Images'

const CoreCell = () => {
  return (
    <div className={CoreCss.wrap}>
        <div className='cell-detail'>
            <div className={CoreCss.detailWrap}>
                <div className={CoreCss.CellInfo}>
                    <h1 className={CoreCss.heading}>Core Cell</h1>
                    <h3 className={CoreCss.great}>Welcome to the Core Cell of the Club</h3>
                    <hr className={CoreCss.line} />
                    <p className={CoreCss.slogo}>"Management is doing things right; Leadership is doing right things."- 
                    Peter Drucker Motivating, along with leading is a task well known
                    by these robust people. Engaged throughout the year, working 
                    behind the scenes,the core cell excels in cooperating with the 
                    other cells to get things done</p>
                </div>
                <div className={CoreCss.CellImg}>
                    <img src={core} alt="" className={CoreCss.img} />
                </div>
            </div>
            <div className={CoreCss.CellWork}>
                <h1>AIM</h1>
                <p>Our aim is to carry out the smooth functioning of the club. Filled
                with well-disciplined people we try to get out the best from
                everyone indulged in the club's activities.</p>
                <h1>RESPONSIBILITY</h1>
                <p>
                1.Overseeing the activities of the club.2.Arranging as well as conducting
                various technical and managements workshops/events round the clock 
                throughout the year inside and outside the college.
                3.Arranging for sponsorships and monetary aids for the club and the 
                annual techno-management fest of NITD-'AAROHAN'.4.Publicising our events.</p>
            </div>
        </div>
    </div>
  )
}

export default CoreCell