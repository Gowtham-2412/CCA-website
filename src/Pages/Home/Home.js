import Frame from '../../Assets/Images/Frame1.png'
import Homecss from './Home.module.css';
export default function Home(){
    return(
        <div className={Homecss.maincontainer}>
            <div className={Homecss.herosectiondata}>
                <h1 className={Homecss.heroheading}>Centre for Cognitive Activities</h1>
                <p className={Homecss.heropara}>CCA, Centre for Cognitive Activities, the largest and oldest technical club of NIT Durgapur, is the focal point where the convergence of all technical and scientific endeavors of the students materializes.</p>
                <div className={Homecss.btnsection}>
                        <button className={Homecss.btn1}>Hall of Fame</button>
                    <button className={Homecss.btn2}>Aarohan</button>        
                    
                </div>

            </div>
            <div className={Homecss.herosectionimg}>
                <img className={Homecss.mainimg} src={Frame} alt="" />
            </div>
        </div>

    )
}
