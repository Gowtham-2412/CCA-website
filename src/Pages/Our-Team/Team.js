import React, { useEffect, useState } from 'react';
import { useRef } from 'react'
import Teamcss from './Team.module.css'
import ImgLib from '../../Components/ImgLink/ImageLib'
import instagram from '../../Assets/Icons/instagram.svg';
import linkedin from '../../Assets/Icons/linkedin.svg';
import Aos from 'aos'
import 'aos/dist/aos.css'

const Team = () => {
    const [items] = useState(ImgLib);
    const FacLib = [
        {
            id: 1,
            image: require("../../Assets/Images/Gojo.jpeg"),
            name: "Sample1",
            category: "Faculty",
        },
        {
            id: 2,
            image: require("../../Assets/Images/Gojo.jpeg"),
            name: "Sample2",
            category: "Faculty",
        },
        {
            id: 3,
            image: require("../../Assets/Images/Gojo.jpeg"),
            name: "Sample3",
            category: "Faculty",
        },
    ]
    useEffect(() => {
        Aos.init({
            duration: 600,
            easing: 'ease-in-out-cubic',
        });
    }, []);

    const faculty = useRef(null);
    const office = useRef(null);
    const senior = useRef(null);

    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: 'smooth'
        })
    }

    return (
        <div>
            <div className={Teamcss.heading} data-aos='fade'>
                <h1>Our Team</h1>
            </div>
            <div className={Teamcss.teamtab} data-aos='fade'>
                <button className={Teamcss.tabswitch} onClick={() => scrollToSection(faculty)}>Faculty Advisers</button>
                <button className={Teamcss.tabswitch} onClick={() => scrollToSection(office)}>Office Bearers</button>
                <button className={Teamcss.tabswitch} onClick={() => scrollToSection(senior)}>Senior Members</button>

            </div>
            <div className={Teamcss.fasection}>
                <div ref={faculty} className={Teamcss.secheading}>
                    <h3 data-aos='fade-up'>Faculty Advisers</h3>
                </div>
                <main id={Teamcss.facontent}>
                    {
                        FacLib.map((elem) => {
                            const { name, image } = elem;

                            return (

                                <div className={Teamcss.cardbody} data-aos='fade-up'>
                                    <img src={image} alt={name}></img>
                                    <div className={Teamcss.cardcontent}>
                                        <h1>ganapathri praphul chandra</h1>
                                        <p>Faculty Advisers</p>
                                    </div>
                                    <div className={Teamcss.cardback}>
                                    </div>
                                    <div className={Teamcss.cardsocial}>
                                        <a href='#'><img className={Teamcss.socialicon} src={instagram}></img></a>
                                        <a href='#'><img className={Teamcss.socialicon} src={linkedin}></img></a>
                                    </div>
                                </div>

                            )
                        })
                    }
                </main>
            </div>
            <div className={Teamcss.obsection}>
                <div ref={office} className={Teamcss.secheading}>
                    <h3 data-aos='fade-up'>Office Bearers</h3>
                </div>
                <main id={Teamcss.facontent}>
                    {
                        items.slice(21, 31).map((elem) => {
                            const { name, image } = elem;

                            return (

                                <div className={Teamcss.cardbody} data-aos='fade-up'>
                                    <img src={image} alt={name}></img>
                                    <div className={Teamcss.cardcontent}>
                                        <h1>SOMEONE NAME</h1>
                                        <p>SENIOR Member</p>
                                    </div>
                                    <div className={Teamcss.cardback}>
                                    </div>
                                    <div className={Teamcss.cardsocial}>
                                        <a href='#'><img className={Teamcss.socialicon} src={instagram}></img></a>
                                        <a href='#'><img className={Teamcss.socialicon} src={linkedin}></img></a>
                                    </div>
                                </div>

                            )
                        })
                    }
                </main>
            </div>
            <div className={Teamcss.smsection}>
                <div ref={senior} className={Teamcss.secheading}>
                    <h3 data-aos='fade-up'>Senior Members</h3>
                </div>
                <main id={Teamcss.facontent}>
                    {
                        items.slice(32,).map((elem) => {
                            const { name, image } = elem;

                            return (

                                <div className={Teamcss.cardbody} data-aos='fade-up'>
                                    <img src={image} alt={name}></img>
                                    {console.log(items.categoty)}
                                    <div className={Teamcss.cardcontent}>
                                        <h1>SOMEONE NAME</h1>
                                        <p>SENIOR Member</p>
                                    </div>
                                    <div className={Teamcss.cardback}>
                                    </div>
                                    <div className={Teamcss.cardsocial}>
                                        <a href='#'><img className={Teamcss.socialicon} src={instagram}></img></a>
                                        <a href='#'><img className={Teamcss.socialicon} src={linkedin}></img></a>
                                    </div>
                                </div>

                            )
                        })
                    }
                </main>
            </div>


        </div>
    )
}

export default Team