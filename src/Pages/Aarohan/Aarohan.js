import arhncss from './Aarohan.module.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
  WdctCornar,
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
  ARHN8
} from '../../Assets/Images';
import { arhnvd } from '../../Assets/Videos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SpotlightCard from '../../Components/UI/SpotlightCard';
import CircularGallery from '../../Components/UI/CircularGallery';
import { Trophy, Users, Calendar, Sparkles, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
  {
    common: "Grand Inauguration",
    binomial: "Aarohan 2024 Highlight",
    photo: { url: ARHN1, text: "Grand Inauguration Ceremony", by: "Team CCA" }
  },
  {
    common: "Robotics Arena",
    binomial: "Hardware & Bots",
    photo: { url: ARHN2, text: "Robotics Arena Showcase", by: "Robo-Cell" }
  },
  {
    common: "Cultural Nights",
    binomial: "Pro Shows & Concerts",
    photo: { url: ARHN3, text: "Cultural Pro-Nite", by: "Team CCA" }
  },
  {
    common: "Hackathon Prototyping",
    binomial: "Coding & Web",
    photo: { url: ARHN4, text: "On-Spot Hackathon Prototyping", by: "WDCT & R&D" }
  },
  {
    common: "Keynote Inspiratie",
    binomial: "Guest Talks",
    photo: { url: ARHN5, text: "Inspiratie Guest Session", by: "E-Cell" }
  },
  {
    common: "Decathlon Tactics",
    binomial: "Management & Strategy",
    photo: { url: ARHN6, text: "Decathlon Business Battle", by: "CCA Team" }
  },
  {
    common: "Case Study Pitch",
    binomial: "Strategy & Innovation",
    photo: { url: ARHN7, text: "Case Study Presentation", by: "E-Cell" }
  },
  {
    common: "Closing Celebration",
    binomial: "Aarohan Finale",
    photo: { url: ARHN8, text: "Valedictory & Closing Ceremony", by: "Team CCA" }
  }
];

const festEvents = [
  {
    title: "WDCT CORNER",
    img: WdctCornar,
    desc: "The only creativity is one's own. The creative mind begins where regular logic ends."
  },
  {
    title: "DECATHLON",
    img: decathalon,
    desc: "Gear up and place yourself in tactical shoes as Team Aavishkar brings Decathlon."
  },
  {
    title: "CONJECTURE",
    img: conjecture,
    desc: "Does your mind wander off from reality wondering about crazy outcomes? An adventurous riddle hunt awaits."
  },
  {
    title: "GAME OF RECRUITMENT",
    img: GOR,
    desc: "Test your analytical skills in intense group discussions and a mind-numbing mock interview."
  },
  {
    title: "INSPIRATIE",
    img: inspiratie,
    desc: "Interact with eminent leaders, entrepreneurs, and visionary guest speakers live."
  },
  {
    title: "CASE STUDY COMP",
    img: acsc,
    desc: "Showcase your business acumen and analytical skills in solving real-world case studies."
  },
  {
    title: "TECHMELA",
    img: techmela,
    desc: "Explore innovation that changes the world through high-impact hardware and software prototypes."
  },
  {
    title: "ON SPOT HACKATHON",
    img: OSH,
    desc: "Showcase your rapid prototyping and coding skills to build functional solutions live."
  },
  {
    title: "MAIDAN-E-CREATIVE",
    img: MEC,
    desc: "A week full of imagination bringing digital creations alive in Adobe Illustrator and Photoshop."
  },
  {
    title: "RED ODYSSEY",
    img: redode,
    desc: "Embark on a Mars quest expedition by designing a rover to conquer rugged terrain obstacles."
  }
];

const Aarohan = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 3000, min: 1900 }, items: 4 },
    desktop: { breakpoint: { max: 1900, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 680 }, items: 2 },
    mobile: { breakpoint: { max: 680, min: 0 }, items: 1 }
  };

  const mainRef = useRef(null);

  useEffect(() => {
    const el = mainRef.current;
    gsap.to(el, {
      backgroundColor: "#F2EFE4",
      duration: 1,
      scrollTrigger: {
        trigger: el,
        scroller: "body",
        start: "top -20%",
        end: "top -70%",
        scrub: 1.5
      }
    });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    });
  }, []);

  return (
    <div className={arhncss.main}>
      {/* Video Background Container */}
      <div className={arhncss.back}>
        <video muted autoPlay loop src={arhnvd} />
        <div className={arhncss.videoOverlay} />
      </div>

      <div className={arhncss.aarohan} ref={mainRef}>
        {/* Fest Hero Header */}
        <div className={arhncss.header}>
          <h1 className={arhncss.festTitle} data-aos="fade-up">
            AAROHAN
          </h1>

          <p className={arhncss.heroLead} data-aos="fade-up" data-aos-delay="100">
            Aarohan means to conquer greater heights. As the annual Techno-Management festival of NIT Durgapur,
            it dares youth to elevate their limits and defy standard boundaries. Celebrate technology, innovation, and perfection.
          </p>

          {/* Stat Highlights Bar */}
          <div className={arhncss.statsBar} data-aos="fade-up" data-aos-delay="200">
            <SpotlightCard className={arhncss.statCard} spotlightColor="rgba(184, 212, 116, 0.25)">
              <Trophy size={24} className="text-[#b8d474] mb-1" />
              <div className={arhncss.statVal}>30+</div>
              <div className={arhncss.statLab}>Flagship Events</div>
            </SpotlightCard>

            <SpotlightCard className={arhncss.statCard} spotlightColor="rgba(184, 212, 116, 0.25)">
              <Users size={24} className="text-[#b8d474] mb-1" />
              <div className={arhncss.statVal}>3000+</div>
              <div className={arhncss.statLab}>Footfall</div>
            </SpotlightCard>

            <SpotlightCard className={arhncss.statCard} spotlightColor="rgba(184, 212, 116, 0.25)">
              <Award size={24} className="text-[#b8d474] mb-1" />
              <div className={arhncss.statVal}>₹5 Lakhs+</div>
              <div className={arhncss.statLab}>Prize Pool</div>
            </SpotlightCard>
          </div>
        </div>

        {/* Photo Gallery Section using exact prompt Circular Gallery component */}
        <div className={arhncss.gallery} data-aos="fade-up">
          <div className={arhncss.sectionHeader}>
            <Sparkles size={24} className="text-[#303030] inline mr-2" />
            <h3 className="inline">Photo Gallery</h3>
          </div>

          <div className="py-2">
            <CircularGallery items={galleryData} radius={520} autoRotateSpeed={0.08} />
          </div>
        </div>

        {/* Fest Events Carousel Section */}
        <div className={arhncss.event} data-aos="fade-up">
          <div className={arhncss.sectionHeader}>
            <Calendar size={24} className="text-[#303030] inline mr-2" />
            <h4 className="inline">Our Events in Aarohan</h4>
          </div>

          <div className={arhncss.carouselContainer}>
            <Carousel
              swipeable={true}
              draggable={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              responsive={responsive}
              itemClass="px-3"
            >
              {festEvents.map((evt, idx) => (
                <SpotlightCard key={idx} className={arhncss.eventSlideCard} spotlightColor="rgba(184, 212, 116, 0.2)">
                  <div className={arhncss.slideImgWrap}>
                    <img src={evt.img} alt={evt.title} />
                  </div>
                  <div className={arhncss.slideContent}>
                    <h3>{evt.title}</h3>
                    <p>{evt.desc}</p>
                  </div>
                </SpotlightCard>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aarohan;