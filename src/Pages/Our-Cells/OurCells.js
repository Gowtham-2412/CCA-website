import React from 'react';
import CellsCss from './OurCells.module.css';
import coreimg from '../../Assets/Images/core-cell.png';
import rndimg from '../../Assets/Images/rnd.jpg';
import robocellimg from '../../Assets/Images/robo-cell.jpg';
import ecellimg from '../../Assets/Images/e-cell.jpg';
import wdctimg from '../../Assets/Images/wdct.jpg';

export default function OurCells() {
    const cellData = [
        { herf: "/core", title: "Core Cell", class: CellsCss.corecell, img: coreimg },
        { herf: "/ecell", title: "E Cell", class: CellsCss.ecell, img: ecellimg },
        { herf: "/rnd", title: "R&D Cell", class: CellsCss.rdcell, img: rndimg },
        { herf: "/robo", title: "Robo Cell", class: CellsCss.robocell, img: robocellimg },
        { herf: "/wdct", title: "WDCT", class: CellsCss.wdct, img: wdctimg },
    ];

    return (
        <div className={CellsCss.ourcellspage}>
            <h1 className={CellsCss.mainheading}>Our Cells</h1>
            <p className={CellsCss.para}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus, quam id hendrerit varius, lacus tellus cursus turpis, quis tempus ante odio vitae lectus. Nullam interdum lacus at nibh pulvinar efficitur. Praesent et justo nisl. Integer porta porta mollis.</p>
            <div className={CellsCss.cellcontainer}>
                {cellData.map((cell, index) => (
                    <a href={cell.herf}>
                        <div className={`${CellsCss.cell} ${cell.class}`} style={{ backgroundImage: `url(${cell.img})` }} key={index}>
                            <hr className={CellsCss.hr} />
                            <h3 className={CellsCss.cellheading}>{cell.title}</h3>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
