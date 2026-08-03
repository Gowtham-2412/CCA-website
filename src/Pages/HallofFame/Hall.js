import React, { useEffect, useState, useRef } from 'react';
import Hallcss from './Hall.module.css';
import ImgLib from '../../Components/ImgLink/ImageLib';
import instagram from '../../Assets/Icons/instagram.svg';
import linkedin from '../../Assets/Icons/linkedin.svg';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Hall = () => {
  const [items, setItems] = useState(ImgLib);
  const activebtn = useRef(null);

  useEffect(() => {
    if (activebtn.current) {
      activebtn.current.click();
      activebtn.current.focus();
    }
    Aos.init({
      duration: 600,
      easing: 'ease-in-out-cubic',
    });
  }, []);

  const filterItem = (categItem) => {
    const updatedItems = ImgLib.filter((curElem) => {
      return curElem.category === categItem;
    });

    setItems(updatedItems);
  };

  return (
    <div>
      <div className={Hallcss.Heading} data-aos='fade'>
        <h1>Hall of Fame</h1>
      </div>
      <div className={Hallcss.Tabbar} data-aos='fade'>
        <button
          ref={activebtn}
          className="tab-switch active"
          onClick={() => filterItem('Batch 2020')}
        >
          Batch 2020
        </button>
        <button className={Hallcss.tabswitch} onClick={() => filterItem('Batch 2021')}>
          Batch 2021
        </button>
        <button className={Hallcss.tabswitch} onClick={() => filterItem('Batch 2022')}>
          Batch 2022
        </button>
        <button className={Hallcss.tabswitch} onClick={() => filterItem('Batch 2023')}>
          Batch 2023
        </button>
      </div>
      {items.slice(0, 1).map((elem, idx) => (
        <div key={idx} className={Hallcss.batchheading}>
          <h2>{elem.category}</h2>
        </div>
      ))}
      <main id={Hallcss.cardcontainer}>
        {items.map((elem, idx) => {
          const { name, image } = elem;

          return (
            <div key={idx} className={Hallcss.Cardbody} data-aos='fade-up'>
              <img src={image} alt={name || "Hall of Fame Member"} />
              <div className={Hallcss.cardcontent}>
                <h1>{name || "Senior Member"}</h1>
                <p>Senior Member</p>
              </div>
              <div className={Hallcss.cardback}></div>
              <div className={Hallcss.cardsocial}>
                <a href="https://www.instagram.com/cca.nitd/" target="_blank" rel="noreferrer">
                  <img className={Hallcss.socialicon} src={instagram} alt="Instagram profile" />
                </a>
                <a href="https://www.linkedin.com/company/center-for-cognitive-activities-nit-durgapur/" target="_blank" rel="noreferrer">
                  <img className={Hallcss.socialicon} src={linkedin} alt="LinkedIn profile" />
                </a>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Hall;
