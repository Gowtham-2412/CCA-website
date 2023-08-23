import React from 'react'
import './AboutUs.css';
import arrow from '../../Assets/Icons/arrow.png';


export default function AboutUs() {
    return (
        <div className='container-fluid aboutuspage'>
            <div className='row'>
                <div className='col-12 col-lg-6'>
                    <div className='abt-image mb-5'>

                    </div>
                </div>
                <div className='col-12 col-lg-6'>
                    <h1 className='main-h pb-4 pt-3'>About CCA!</h1>
                    <p className='abt-para pb-3'>CCA, Centre for Cognitive Activities, is the focal point where convergence of all technical and scientific endeavours of the students materialises. This club is the revolution which bridges the gap between knowledge and application. Bulk of the extracurricular activities held in the college all the year round are organised by the CCA , with the objective of probing the dark recesses of human mind so that the grey cells are stimulated to create , conceptualise and evolve, triggering a rebellion of the new age mind against baseless conventions and meek acceptance.</p>
                    <div className='text-center text-md-left'>
                        <button className='exp-button'>
                            Explore<img src={arrow} alt='' className='arrow-icon ml-3 mb-1' />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
