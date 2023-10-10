import React from 'react'
import sample from "../../Assets/Images/grey.png";
import './Events.css';

function Events() {
    return (
        <div>
            <div class="header">
                <h1>Events</h1>
                <p>Lorem Ipsum dolor sit amet,consectetur adipisicing elit, sed doeiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim adminim veniam, quis nostrudexercitation ullamco laboris nisi utaliquip ex ea commodo consequat.</p>
            </div>


            <div class="card-container">

                <div class="card-1">
                    <div class="card-image-1">
                        <img src={sample} alt="" />
                    </div>
                    <div class="card-text-1">
                        <h2>Card 1</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero volutpat sed cras ornare.</p>
                    </div>
                </div>

                <div class="card-2">
                    <div class="card-image-2">
                        <img src={sample} alt="" />
                    </div>
                    <div class="card-text-2">
                        <h2>Card 2</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero volutpat sed cras ornare.</p>
                    </div>
                </div>

                <div class="card-1">
                    <div class="card-image-1">
                        <img src={sample} alt="" />
                    </div>
                    <div class="card-text-1">
                        <h2>Card 3</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero volutpat sed cras ornare.</p>
                    </div>
                </div>

                <div class="card-2">
                    <div class="card-image-2">
                        <img src={sample} alt="" />
                    </div>
                    <div class="card-text-2">
                        <h2>Card 4</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero volutpat sed cras ornare.</p>
                    </div>
                </div>

                <div class="card-1">
                    <div class="card-image-1">
                        <img src={sample} alt="" />
                    </div>
                    <div class="card-text-1">
                        <h2>Card 5</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero volutpat sed cras ornare.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Events