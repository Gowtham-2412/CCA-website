import Frame from '../../Assets/Images/Frame1.png'
import './Home.css';
export default function Home(){
    return(
        <div className="main-container">
            <div className="hero-section-data">
                <h1 className="hero-heading">Centre for Cognitive Activities</h1>
                <p className="hero-para">CCA, Centre for Cognitive Activities, the largest and oldest technical club of NIT Durgapur, is the focal point where the convergence of all technical and scientific endeavors of the students materializes.</p>
                <div className='btn-section'>
                        <button className='btn-1'>Hall of Fame</button>
                    <button className='btn-2'>Aarohan</button>        
                    
                </div>

            </div>
            <div className="hero-section-img"
            >
                <img className='main-img' src={Frame} alt="" />
            </div>
        </div>

    )
}
