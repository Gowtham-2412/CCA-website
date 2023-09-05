import sample from "../../Assets/Images/grey.png";
import './Aarohan.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { WdctCornar,
    decathalon,
    GOR,
    OSH,
    MEC,
    conjecture,
    inspiratie,
    redode,
    techmela,
    acsc,
    ARHN1,
    ARHN2,
    ARHN3,
    ARHN4,
    ARHN5,
    ARHN6,
    ARHN7,
    ARHN8 } from '../../Assets/Images';


const Aarohan = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 3000, min: 1900 },
            items: 6,
            slidesToSlide: 1 // optional, default to 1.
          },
        desktop: {
          breakpoint: { max: 1900, min: 1024 },
          items: 4,
          slidesToSlide: 1  // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 680 },
          items: 3,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 680, min: 521 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        },
        extrasmallmobile: {
            breakpoint: { max: 500, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
      };
      
  return (
    <div className="aarohan">
    <div class="header">
        <h1>AAROHAN</h1>
        <p>Lorem Ipsum dolor sit amet,consectetur adipisicing elit, sed doeiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim adminim veniam, quis nostrudexercitation ullamco laboris nisi utaliquip ex ea commodo consequat.</p>
    </div>

    <div class="aftermovie">
        <iframe src="https://www.youtube.com/embed/j2hREu7yRIQ?si=W9HxAfIGvNxt3pKp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>

    <div class="gallery">
        <h3>PHOTO GALLERY</h3>

        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1.5}
            centeredSlides={true}
            loop={true}
            autoplay={true}
            keyboard={true}
            freeMode={true}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            <SwiperSlide>
                <div class="card">
                    <img src={ARHN1} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                    <img src={ARHN2} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                    <img src={ARHN3} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                    <img src={ARHN4} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                    <img src={ARHN5} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                    <img src={ARHN6} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                    <img src={ARHN7} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                    <img src={ARHN8} alt="" />
                </div>
            </SwiperSlide>
        </Swiper>
        <div className="mt-[4rem] h-[2.4rem] ">
            <button className="border-[2px] font-inter font-semibold border-[#252525] px-3 py-2 hover:scale-105">View more</button>
        </div>
    </div>

    <div class="event">
        <h4>OUR EVENTS IN AAROHAN</h4>
        <Carousel
            swipeable={true}
            draggable={true}
            infinite={true}
            keyBoardControl={true}
            responsive={responsive}
        >
                <div class="card1">
                    <img src={WdctCornar} alt="" />
                    <div className="card-content">
                        <h3>WDCT CORNER</h3>
                        <p>The only creativity is one's own. The creative and scabies mind begins where the regular mind ends.</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={decathalon} alt="" />
                    <div className="card-content">
                        <h3>DECATHLON</h3>
                        <p>Gear up and place yourself in the shoes of Rico from Starwars Troopers, who joins the military to fight against the alien bugs as this Aarohan 2023, Team Aavishkar brings you Decathlon</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={conjecture} alt="" />
                    <div className="card-content">
                        <h3>CONJECTURE</h3>
                        <p>Does your mind often wander off from reality, wondering what could be the possible outcomes of crazy scenarios that you construct in your mind? Do you long for an adventurous event?</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={GOR} alt="" /><div className="card-content">
                        <h3>GAME OF RECRUITMENT</h3>
                        <p>Game of Recruitment bestows the opportunity to test your analytical and reasoning skills, witness disturbing group discussions, and finally participate in one of the most interesting aspect of the game, the mind-numbing interview.</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={inspiratie} alt="" />
                    <div className="card-content">
                        <h3>INSPIRATIE</h3>
                        <p>We are proud to host him at Inspiratie 2023.
                        Don’t miss your opportunity to interact with him on 10th March, Inspiratie 2023.</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={acsc} alt="" />
                    <div className="card-content">
                        <h3>ANNUAL CASE STUDY COMPITION</h3>
                        <p>Competing is the only way to reach greatness and AAROHAN'23 is providing you with the perfect opportunity to showcase your business acumen and analytical skills.</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={techmela} alt="" />
                    <div className="card-content">
                        <h3>TECHMELA</h3>
                        <p>Technology has the capability to change the world for the better. Imagination in people’s minds makes it possible to create something which can have wide ranging implications on the society.</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={OSH} alt="" />
                    <div className="card-content">
                        <h3>ON SPOT HACKATON</h3>
                        <p>On Spot Hackathon 2023, is here to provide you the platform to showcase your skills and build working prototypes</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={MEC} alt="" />
                    <div className="card-content">
                        <h3>MAIDAN-E-CREATIVE</h3>
                        <p>Web, Design and Creative Team, CCA presents Maidan-e-Creative , a week full of imagination and creativity.
Learn how to bring your creations alive using Adobe Illustrator and Adobe Photoshop.</p>
                    </div>
                </div><div class="card1">
                    <img src={redode} alt="" />
                    <div className="card-content">
                        <h3>RED ODYSSEY</h3>
                        <p>Embark on the Mars quest expendition and design a rover to conquor treocherous rugged terrains and obstacles</p>
                    </div>
                </div>
        </Carousel>
    </div>
</div>
  )
}

export default Aarohan