import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
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
    activebtn.current.click();
    activebtn.current.focus();
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
      {items.slice(0, 1).map((elem) => {
        const { category } = elem;
        return (
          <div className={Hallcss.batchheading}>
            <h2>{category}</h2>
          </div>
        );
      })}
      <main id={Hallcss.cardcontainer}>
        {items.map((elem) => {
          const { name, image } = elem;

          return (
            <div className={Hallcss.Cardbody} data-aos='fade-up'>
              <img src={image} alt={name}></img>
              {console.log(image)}
              <div className={Hallcss.cardcontent}>
                <h1>SOMEONE NAME</h1>
                <p>SENIOR Member</p>
              </div>
              <div className={Hallcss.cardback}>
              </div>
              <div className={Hallcss.cardsocial}>
                <a href='#'><img className={Hallcss.socialicon} src={instagram}></img></a>
                <a href='#'><img className={Hallcss.socialicon} src={linkedin}></img></a>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Hall;
