import React,{useState} from 'react'
import { useRef } from 'react'
import Teamcss from './Team.module.css'
import ImgLib from '../../Components/ImgLink/ImageLib'

const Team = () => {
    const [items] = useState(ImgLib);
    const FacLib = [
        {
            id:1,
            image:require("../../Assets/Images/Gojo.jpeg"),
            name:"Sample1",
            category:"Faculty",
        },
        {
            id:2,
            image:require("../../Assets/Images/Gojo.jpeg"),
            name:"Sample2",
            category:"Faculty",
        },
        {
            id:3,
            image:require("../../Assets/Images/Gojo.jpeg"),
            name:"Sample3",
            category:"Faculty",
        },
    ]

    const faculty = useRef(null);
    const office = useRef(null);
    const senior = useRef(null);

    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top:elementRef.current.offsetTop,
            behavior:'smooth'
        })
    }
  return (
    <div>
        <div className={Teamcss.heading}>
            <h1>Our Team</h1>
        </div>
        <div className={Teamcss.teamtab}> 
        <button className={Teamcss.tabswitch} onClick={() => scrollToSection(faculty)}>Faculty Advisers</button>  
        <button className={Teamcss.tabswitch} onClick={() => scrollToSection(office)}>Office Bearers</button>  
        <button className={Teamcss.tabswitch} onClick={() => scrollToSection(senior)}>Senior Members</button>     

        </div>
        <div className={Teamcss.fasection}>
        <div ref= {faculty} className={Teamcss.secheading}>
            <h3>Faculty Advisers</h3>
        </div>
        <main id={Teamcss.facontent}>
        {
            FacLib.map((elem) => {
                const { name, image } = elem;
                
                return(
                    
                    <div className='Card-section'>
                    <div className={Teamcss.cardbody}>
                        <img src={image} alt={name}></img>
                    </div>
                    </div> 
                    
                )
            })
        }
        </main>
        </div>
        <div className={Teamcss.obsection}>
            <div ref= {office} className={Teamcss.secheading}>
                <h3>Office Bearers</h3>
            </div>
            <main id={Teamcss.facontent}>
        {
            items.slice(21,31).map((elem) => {
                const {  name, image } = elem;
                
                return(
                    
                    <div className='Card-section'>
                    <div className={Teamcss.cardbody}>
                        <img src={image} alt={name}></img>
                    </div>
                    </div> 
                    
                )
            })
        }
        </main>
        </div>
        <div className={Teamcss.smsection}>
            <div ref= {senior} className={Teamcss.secheading}>
                <h3>Senior Members</h3>
            </div>
            <main id={Teamcss.facontent}>
        {
            items.slice(32,).map((elem) => {
                const {  name, image } = elem;
                
                return(
                    
                    <div className='Card-section'>
                    <div className={Teamcss.cardbody}>
                        <img src={image} alt={name}></img>
                        {console.log(items.categoty)}
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