import React, { useEffect, useState } from 'react';
import assisteque from "../../Assets/Images/assisteque.jpeg";
import parichay from "../../Assets/Images/parichay.jpeg";
import designworkshop from "../../Assets/Images/design workshop.jpeg";
import robozido from "../../Assets/Images/robozido.jpeg";
import youthparliament from "../../Assets/Images/youth parliament.jpeg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import EventsCSS from "./Events.module.css";
import SpotlightCard from "../../Components/UI/SpotlightCard";
import { Calendar, ChevronRight } from 'lucide-react';

const eventData = [
  {
    id: 1,
    title: "Parichay",
    category: "Technical",
    cell: "CCA Team",
    image: parichay,
    date: "Annual Advent",
    description: "CCA presents PARICHAY, an evening full of technology and innovation, marking the advent of the technical extravaganza of the forthcoming academic year and giving you a peek at the different co-curricular events held throughout the year."
  },
  {
    id: 2,
    title: "Robozido",
    category: "Workshops",
    cell: "Robo-Cell",
    image: robozido,
    date: "Odd Semester",
    description: "Robocell, CCA brings to you its first workshop of the season. Robozido - The autonomous and manual robotics workshop aims to furnish a one-of-a-kind opportunity to showcase your inventive & creative skills in Robotics."
  },
  {
    id: 3,
    title: "Youth Parliament",
    category: "Debate",
    cell: "E-Cell",
    image: youthparliament,
    date: "Ninth Edition",
    description: "Entrepreneurship Cell, CCA, NIT Durgapur brings you the perfect platform to hone your debating skills, be a part of something bigger than yourself, and express yourself in Defending Democracies."
  },
  {
    id: 4,
    title: "Design Workshop",
    category: "Creative",
    cell: "WDCT",
    image: designworkshop,
    date: "Annual Workshop",
    description: "Web, Design and Creative Team, CCA guides you throughout the graphic design, video editing, and animation process. Learn the basics of Adobe Illustrator and After Effects with us."
  },
  {
    id: 5,
    title: "Assisteque",
    category: "Technical",
    cell: "R&D Cell",
    image: assisteque,
    date: "Two-Day Event",
    description: "The Research and Development Cell, CCA organises a two-day workshop on the Internet of Things, where you learn how to implement IoT in devices using simple sensors and a bit of code!"
  }
];

const cellFilters = ["All", "CCA Team", "Robo-Cell", "E-Cell", "WDCT", "R&D Cell"];

function Events() {
  const [activeCell, setActiveCell] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
    });
  }, []);

  const filteredEvents = activeCell === "All"
    ? eventData
    : eventData.filter(item => item.cell === activeCell);

  return (
    <div className={EventsCSS.pageWrapper}>
      {/* Header Section */}
      <div className={EventsCSS.header} data-aos="fade-down">
        <h1>Campus Events</h1>
        <p className={EventsCSS.headerLead}>
          Team CCA curates a multitude of campus events synonymous with excitement, innovation, and creativity.
          Join us to experience hands-on learning at every turn.
        </p>

        {/* Cell-Wise Filter Pills */}
        <div className={EventsCSS.filterContainer}>
          {cellFilters.map((cell) => (
            <button
              key={cell}
              onClick={() => setActiveCell(cell)}
              className={`${EventsCSS.filterBtn} ${activeCell === cell ? EventsCSS.activeFilterBtn : ''}`}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className={EventsCSS.cardcontainer}>
        {filteredEvents.map((evt, idx) => (
          <div key={evt.id} className={EventsCSS.eventRow} data-aos="fade-up">
            <SpotlightCard
              className={EventsCSS.eventCard}
              spotlightColor="rgba(255, 255, 255, 0.4)"
              borderColor="rgba(48, 48, 48, 0.1)"
            >
              <div className={`${EventsCSS.cardFlex} ${idx % 2 === 1 ? EventsCSS.cardReverse : ''}`}>
                {/* Event Image */}
                <div className={EventsCSS.cardImgWrap}>
                  <img src={evt.image} alt={evt.title} className={EventsCSS.cardImage} />
                </div>

                {/* Event Content */}
                <div className={EventsCSS.cardTxtWrap}>
                  <div className={EventsCSS.metaRow}>
                    <span className={EventsCSS.dateMeta}>
                      <Calendar size={13} className="mr-1 inline text-slate-500" /> {evt.date}
                    </span>
                  </div>

                  <h2>{evt.title}</h2>
                  <p>{evt.description}</p>

                  <button
                    className={EventsCSS.detailsBtn}
                    onClick={() => setSelectedEvent(evt)}
                  >
                    <span>Event Details</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className={EventsCSS.modalOverlay} onClick={() => setSelectedEvent(null)}>
          <div className={EventsCSS.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={EventsCSS.modalHeader}>
              <div>
                <span className={EventsCSS.categoryBadge}>{selectedEvent.category}</span>
                <h2 className="text-2xl font-bold text-[#303030] mt-1">{selectedEvent.title}</h2>
              </div>
              <button className={EventsCSS.closeBtn} onClick={() => setSelectedEvent(null)}>✕</button>
            </div>
            <img src={selectedEvent.image} alt={selectedEvent.title} className={EventsCSS.modalImg} />
            <p className={EventsCSS.modalDesc}>{selectedEvent.description}</p>
            <div className={EventsCSS.modalMeta}>
              <div><strong>Organized by:</strong> {selectedEvent.cell}</div>
              <div><strong>Timing/Schedule:</strong> {selectedEvent.date}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;