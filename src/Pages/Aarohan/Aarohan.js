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
                    <img src={sample} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                    <img src={sample} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                    <img src={sample} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                    <img src={sample} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                    <img src={sample} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                    <img src={sample} alt="" />
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
                    <img src={sample} alt="" />
                    <div className="card-content">
                        <h3>wdct corner</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa odio pariatur minus, neque dolorem maxime?</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={sample} alt="" />
                    <div className="card-content">
                        <h3>wdct corner</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa odio pariatur minus, neque dolorem maxime?</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={sample} alt="" />
                    <div className="card-content">
                        <h3>wdct corner</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa odio pariatur minus, neque dolorem maxime?</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={sample} alt="" /><div className="card-content">
                        <h3>wdct corner</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa odio pariatur minus, neque dolorem maxime?</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={sample} alt="" />
                    <div className="card-content">
                        <h3>wdct corner</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa odio pariatur minus, neque dolorem maxime?</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={sample} alt="" />
                    <div className="card-content">
                        <h3>wdct corner</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa odio pariatur minus, neque dolorem maxime?</p>
                    </div>
                </div>
                <div class="card1">
                    <img src={sample} alt="" />
                    <div className="card-content">
                        <h3>wdct corner</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa odio pariatur minus, neque dolorem maxime?</p>
                    </div>
                </div>
        </Carousel>
    </div>
</div>
  )
}

export default Aarohan