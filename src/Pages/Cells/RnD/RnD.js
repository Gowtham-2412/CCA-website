import React from 'react'
import RnDCss from './RnD.module.css'
import rnd from '../../../Assets/Images/rnd.png'

const RnD = () => {
  return (
    <div className={RnDCss.wrap}>
      <div className='cell-detail'>
        <div className={RnDCss.detailWrap}>
          <div className={RnDCss.CellInfo}>
            <h1 className={RnDCss.heading}>Research & Development Cell</h1>
            <h3 className={RnDCss.great}>Welcome To The Research, Developement and Innovation Cell Of The Club</h3>
            <hr className={RnDCss.line} />
            <p className={RnDCss.slogo}>"If we knew what it was we were doing, it would not be called research, would it? " - Albert Einstein.
              Write from the begining of the dark age alot of ground breaking discoveries were made by man. There is no field in which research is not done. Research and Development (R&D) flourishes where young minds and experienced faculties work synergistically. R&D Cell has been established to promote and monitor the research Programs of the institute.</p>
          </div>
          <div className={RnDCss.CellImg}>
            <img src={rnd} alt="" className={RnDCss.img} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RnD