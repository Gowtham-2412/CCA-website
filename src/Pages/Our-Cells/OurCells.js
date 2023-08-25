import React from 'react';
import './OurCells.css';
import coreimg from '../../Assets/Images/core-cell.png';
import rndimg from '../../Assets/Images/rnd.jpg'
import robocellimg from '../../Assets/Images/robo-cell.jpg'
import ecellimg from '../../Assets/Images/e-cell.jpg'
import wdctimg from '../../Assets/Images/wdct.jpg'






export default function OurCells() {
    const cellData = [
        { title: "Core Cell", class: "core-cell cell", img: coreimg },
        { title: "E Cell", class: "e-cell cell ", img: ecellimg },
        { title: "R&D Cell", class: "rd-cell cell ", img: rndimg },
        { title: "Robo Cell", class: "robo-cell cell ", img: robocellimg },
        { title: "WDCT", class: "wdct cell cell ", img: wdctimg },
    ];

    return (
        <div className="our-cells-page">
            <h1 className="main-heading pb-3">Our Cells</h1>
            <p className="para">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus, quam id hendrerit varius, lacus tellus cursus turpis, quis tempus ante odio vitae lectus. Nullam interdum lacus at nibh pulvinar efficitur. Praesent et justo nisl. Integer porta porta mollis.</p>
            <div className="cell-container">
                {cellData.map((cell, index) => (
                    <div className={cell.class} style={{ backgroundImage: `url(${cell.img})` }} key={index} >
                        <hr className='hr' />
                        <h3 className="cell-heading">{cell.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}