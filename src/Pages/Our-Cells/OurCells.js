import React from 'react';

export default function OurCells() {
    const cellData = [
        { title: "Core Cell", class: "core-cell cell" },
        { title: "WDCT", class: "wdct cell cell " },
        { title: "E Cell", class: "robo-cell cell " },
        { title: "Robo Cell", class: "e-cell cell " },
        { title: "R&D Cell", class: "rd-cell cell " }
    ];

    return (
        <div className="our-cells-page">
            <h1 className="main-heading pb-3">Our Cells</h1>
            <p className="para">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus, quam id hendrerit varius, lacus tellus cursus turpis, quis tempus ante odio vitae lectus. Nullam interdum lacus at nibh pulvinar efficitur. Praesent et justo nisl. Integer porta porta mollis.</p>
            <div className="cell-container">
                {cellData.map((cell, index) => (
                    <div className={cell.class} key={index} >
                        <hr />
                        <h3 className="cell-heading">{cell.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}