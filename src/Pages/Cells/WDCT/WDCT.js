import React from 'react'
import WdctCss from './WDCT.module.css'
import wdct from '../../../Assets/Images/wdct.png'

const WDCT = () => {
  return (
    <div className={WdctCss.wrap}>
      <div className='cell-detail'>
        <div className={WdctCss.detailWrap}>
          <div className={WdctCss.CellInfo}>
            <h1 className={WdctCss.heading}>Web, Design & Creative Team</h1>
            <h3 className={WdctCss.great}>Welcome to the Technical Cell of the club</h3>
            <hr className={WdctCss.line} />
            <p className={WdctCss.slogo}>A congregation of enthusiastic techno-crats, we manage the technical aspects of the club, to keep it up and running in the cyber front. From designing websites for fests to organising workshops for amateurs, we nurture the creative spurt in the club.</p>
          </div>
          <div className={WdctCss.CellImg}>
            <img src={wdct} alt="" className={WdctCss.img} />
          </div>
        </div>
        <div className={WdctCss.CellWork}>
          <h1>Web Development Team</h1>
          <p>This team is responsible for the development, design of the various websites associated with CCA, the Aarohan official website and various online publication and propaganda of the events of the club. It also devises interactive online events, which see about 3000 online participants, for Aarohan, the Annual Techno-Management Fest of CCA.</p>
          <h1>Design Team</h1>
          <p>
            This creative team is entrusted with the development and designing of the various offline propaganda means for CCA as well as for Aarohan-The Annual Techno Management Fest of NIT Durgapur. It designs the sponsorship and talk show brochures for Aarohan, flyers, pamphlets, event posters and flexes for Aarohan.</p>
        </div>
      </div>
    </div>
  )
}

export default WDCT