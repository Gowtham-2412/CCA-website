import React from 'react';
import CellsCss from './OurCells.module.css';
import coreimg from '../../Assets/Images/core-cell.png';
import rndimg from '../../Assets/Images/rnd.jpg';
import robocellimg from '../../Assets/Images/robo-cell.jpg';
import ecellimg from '../../Assets/Images/e-cell.jpg';
import wdctimg from '../../Assets/Images/wdct.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function OurCells() {
    const cellData = [
        { herf: "/core", title: "Core Cell", class: CellsCss.corecell, img: coreimg },
        { herf: "/wdct", title: "WDCT", class: CellsCss.wdct, img: wdctimg },
        { herf: "/robo", title: "Robo-Cell", class: CellsCss.robocell, img: robocellimg },
        { herf: "/ecell", title: "E-Cell", class: CellsCss.ecell, img: ecellimg },
        { herf: "/rnd", title: "R&D Cell", class: CellsCss.rdcell, img: rndimg },
    ];

    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out-cubic',
        })
    }, [])

    return (
        <div className={CellsCss.ourcellspage} >
            <h1 className={CellsCss.mainheading} data-aos="fade">Our Cells</h1>
            <p className={CellsCss.para} data-aos="fade">CCA is divided into five cells which work together in collaboration with each other. We believe in the fact that togetherness yields excellent results. These cells basically function to cover every aspect required for the success of an organisation.</p>
            <div className={CellsCss.cellcontainer} data-aos="fade-up">
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
