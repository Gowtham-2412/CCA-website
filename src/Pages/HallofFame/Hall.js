import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import './Hall.css';
import ImgLib from '../../Components/ImgLink/ImageLib';

const Hall = () => {
  const [items, setItems] = useState(ImgLib);
  const activebtn = useRef(null);
  useEffect(() => {
    activebtn.current.click();
    activebtn.current.focus();
  }, []);

  const filterItem = (categItem) => {
    const updatedItems = ImgLib.filter((curElem) => {
      return curElem.category === categItem;
    });

    setItems(updatedItems);
  };

  return (
    <div>
      <div className="Heading">
        <h1>Hall of Fame</h1>
      </div>
      <div className="Tab-bar">
        <button
          ref={activebtn}
          className="tab-switch active"
          onClick={() => filterItem('Batch 2020')}
        >
          Batch 2020
        </button>
        <button className="tab-switch" onClick={() => filterItem('Batch 2021')}>
          Batch 2021
        </button>
        <button className="tab-switch" onClick={() => filterItem('Batch 2022')}>
          Batch 2022
        </button>
        <button className="tab-switch" onClick={() => filterItem('Batch 2023')}>
          Batch 2023
        </button>
      </div>
      {items.slice(0, 1).map((elem) => {
        const { category } = elem;
        return (
          <div className="batch-heading">
            <h2>{category}</h2>
          </div>
        );
      })}
      <main id="card-container">
        {items.map((elem) => {
          const { name, image } = elem;

          return (
            <div className="Card-section">
              <div className="card-body">
                <img src={image} alt={name}></img>
                {console.log(image)}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Hall;
