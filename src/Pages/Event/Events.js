import React from 'react'
import assisteque from "../../Assets/Images/assisteque.jpeg";
import parichay from "../../Assets/Images/parichay.jpeg";
import designworkshop from "../../Assets/Images/design workshop.jpeg";
import robozido from "../../Assets/Images/robozido.jpeg";
import youthparliament from "../../Assets/Images/youth parliament.jpeg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import EventsCSS from "./Events.module.css";
import { useEffect } from 'react';

function Events() {

    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out-cubic',
        })
    }, [])

    return (
        <div>
            <div className={EventsCSS.header} data-AOS="fade">
                <h1>Events</h1>
                <p>Team CCA curates a multitude of campus events that are synonymous with excitement, innovation, and creativity. Join us, and you'll discover valuable learning experiences at every turn.</p>
            </div>


            <div className={EventsCSS.cardcontainer}>

                <div className={EventsCSS.card1} data-AOS="fade-up" >
                    <div className={EventsCSS.cardimg1} data-AOS="zoom-in">
                        <img src={parichay} alt="" />
                    </div>
                    <div className={EventsCSS.cardtxt1}>
                        <h2>Parichay</h2>
                        <p>CCA presents PARICHAY 2023, an evening full of technology and innovation, marking the advent of the technical extravaganza of the forthcoming academic year and giving you a peek at the different co-curricular events held throughout the year.</p>
                    </div>
                </div>

                <div className={EventsCSS.card2} data-AOS="fade-up">
                    <div className={EventsCSS.cardimg2} data-AOS="zoom-in">
                        <img src={robozido} alt="" />
                    </div>
                    <div className={EventsCSS.cardtxt2}>
                        <h2>Robozido</h2>
                        <p>Robocell, CCA brings to you its first workshop of the season. Robozido - The autonomous and manual robotics workshop aims to furnish a one of a kind opportunity, for you all to showcase your inventive & creative skills that would pave a serene track to the world of Robotics.</p>
                    </div>
                </div>

                <div className={EventsCSS.card1} data-AOS="fade-up">
                    <div className={EventsCSS.cardimg1} data-AOS="zoom-in">
                        <img src={youthparliament} alt="" />
                    </div>
                    <div className={EventsCSS.cardtxt1}>
                        <h2>Youth Parliament</h2>
                        <p>Entrepreneurship Cell, CCA, NIT Durgapur brings you the perfect platform to hone your debating skills, be a part of something bigger than yourself, and express yourself in a way that transcends the boundaries of your everyday interactions.We bring you the ninth edition of Youth Parliament - Defending Democracies</p>
                    </div>
                </div>

                <div className={EventsCSS.card2} data-AOS="fade-up">
                    <div className={EventsCSS.cardimg2} data-AOS="zoom-in">
                        <img src={designworkshop} alt="" />
                    </div>
                    <div className={EventsCSS.cardtxt2}>
                        <h2>Design Workshop</h2>
                        <p>Web, Design and Creative Team, CCA is back with another one of our events. Graphic design, video editing, animations are a integral part of every club. We, WDCT will guide you throughout the process and give a kick-start to your design learning. Learn the basics of Adobe Illustrator and After Effects with us. We await your enthusiastic response.</p>
                    </div>
                </div>

                <div className={EventsCSS.card1} data-AOS="fade-up">
                    <div className={EventsCSS.cardimg1} data-AOS="zoom-in">
                        <img src={assisteque} alt="" />
                    </div>
                    <div className={EventsCSS.cardtxt1}>
                        <h2>Assisteque</h2>
                        <p>The Research and Development Cell, CCA is organising a two-day workshop on the Internet of Things, where you can learn how to implement IoT in devices, and make useful technology on your own using simple sensors and a bit of code! Teams of 4 will be set up where you will build your project on a sign language hand translator.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Events