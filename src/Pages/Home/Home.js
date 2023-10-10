import Frame from '../../Assets/Images/Frame1.png'
import Homecss from './Home.module.css';
export default function Home() {
    return (
        <div className={Homecss.maincontainer}>
            <div className={Homecss.herosectiondata}>
                <h1 className={Homecss.heroheading}>Centre for Cognitive Activities</h1>
                <p className={Homecss.heropara}>CCA, Centre for Cognitive Activities, the largest and oldest technical club of NIT Durgapur, is the focal point where the convergence of all technical and scientific endeavors of the students materializes. Founded in 2003, this club aims to enhance the technical and managerial skills of the students from the beginning. Intending to bridge the gap between knowledge and application, CCA organizes diverse events covering the various domains throughout the year that stimulate the gray cells of the students, thereby proving to be an asset to them.</p>
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
