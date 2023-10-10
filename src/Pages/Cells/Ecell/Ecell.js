import React from 'react'
import EcellCss from './Ecell.module.css'
import ecell from '../../../Assets/Images/e-cell.png'

const Ecell = () => {
  return (
    <div className={EcellCss.wrap}>
      <div className='cell-detail'>
        <div className={EcellCss.detailWrap}>
          <div className={EcellCss.CellInfo}>
            <h1 className={EcellCss.heading}>Entrepreneurship Cell</h1>
            <h3 className={EcellCss.great}>Welcome To The Entrepreneurship Cell Of The Club</h3>
            <hr className={EcellCss.line} />
            <p className={EcellCss.slogo}>"Logic will get you from A to B. Imagination will get you everywhere else." - Albert Einstein.
              Rules and norms are there, meant to be followed, for the smooth pliability of social wagons. And then there is imagination. Imagination is a strange thing. It is wild, it is silly. It is the fuel to all great revolutionaries that have taken place in the history of the world.</p>
          </div>
          <div className={EcellCss.CellImg}>
            <img src={ecell} alt="" className={EcellCss.img} />
          </div>
        </div>
        <div className={EcellCss.CellWork}>
          <h1>AIM</h1>
          <p>We at Entrepreneurship and Innovation Cell, NIT Durgapur, are a bunch of people who believe in the potent power of imagination and dreams. We strive to nourish the spirit of entrepreneurship among our members from the student community and faculty, inspire and encourage them to take on entrepreneurial challenges, and assist them in their efforts to launch and run business. We will also try to foster technical innovation within our campus, and would help them in proper incubations of the same.</p>
          <h1>OBJECTIVE</h1>
          <p>
            Inculcating the spirit of entrepreneurship in students. Developing leadership qualities among students. Motivating the students to come up with feasible and practical business plans. Helping bridge the gap between the industry and academics. Developing a strong network of entrepreneurs, venture capitalists, corporate executives, EXECUTIVE professionals and individuals who are directly or indirectly related to Entrepreneurship. To help NITD students and alumni leverage from this network.</p>
          <h1>ACTIVITIES</h1>
          <p>
            Inviting eminent entrepreneurs and NITD alumni from various industry to deliver lectures on entrepreneurship. Organizing inter college business plan competitions and have the CEOs of reputed organizations and entrepreneurs judging the event. Organizing brainstorming sessions to foster entrepreneurship and technical innovation Organizing a series of events related to entrepreneurship, business, economics and technical innovation in techno-management fest ‘Aarohan’, of our college.

          </p>
        </div>
      </div>
    </div>
  )
}

export default Ecell