import React from 'react';
import CellsCss from './OurCells.module.css';
import coreimg from '../../Assets/Images/core-cell.png';
import rndimg from '../../Assets/Images/rnd.jpg';
import robocellimg from '../../Assets/Images/robo-cell.jpg';
import ecellimg from '../../Assets/Images/e-cell.jpg';
import wdctimg from '../../Assets/Images/wdct.jpg';

export default function OurCells() {
    const cellData = [
        { title: "Core Cell", class: CellsCss.corecell, img: coreimg },
        { title: "E Cell", class: CellsCss.ecell, img: ecellimg },
        { title: "R&D Cell", class: CellsCss.rdcell, img: rndimg },
        { title: "Robo Cell", class: CellsCss.robocell, img: robocellimg },
        { title: "WDCT", class: CellsCss.wdct, img: wdctimg },
    ];

    return (
        <div className={CellsCss.ourcellspage}>
            <h1 className={CellsCss.mainheading}>Our Cells</h1>
            <p className={CellsCss.para}>CCA is divided into five cells which work together in collaboration with each other. We believe in the fact that togetherness yields excellent results. These cells basically function to cover every aspect required for the success of an organisation.</p>
            <div className={CellsCss.cellcontainer}>
                {cellData.map((cell, index) => (
                    <div className={`${CellsCss.cell} ${cell.class}`} style={{ backgroundImage: `url(${cell.img})` }} key={index}>
                        <hr className={CellsCss.hr} />
                        <h3 className={CellsCss.cellheading}>{cell.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
