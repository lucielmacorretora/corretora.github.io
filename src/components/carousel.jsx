import React, { useState } from 'react';
import CarouselItem from './carouselItem';

import './carousel.css';
import './colors.css';

function getListSize(list) {
  return Object.keys(list).length;
}

function Carousel({ imgs }) {
  //      {imgs.map(img => <CarouselItem imgLink={img.link} />)}
  const [curentImgID, setCurentImgID] = useState(0);

  const timer = () => {
    setInterval(() => {
      nextImg();
    }, 4000);
  }

  const nextImg = () => {
    let size = getListSize(imgs);
    if ((curentImgID + 1) >= size) {
      setCurentImgID(0);
      return;
    }

    setCurentImgID(curentImgID + 1);
  }

  const backImg = () => {
    let size = getListSize(imgs);
    if ((curentImgID - 1) < 0) {
      setCurentImgID(size - 1);
      return;
    }

    setCurentImgID(curentImgID - 1);
  }

  //timer();
  return (
    <div className='carouselContainer'>
      <i onClick={backImg}>
        <span className="glyphicon glyphicon-arrow-left arrow"></span>
      </i>
      <CarouselItem imgLink={imgs[curentImgID].link} alt={imgs[curentImgID].alt} />
      <i onClick={nextImg}>
        <span className="glyphicon glyphicon-arrow-right arrow"></span>
      </i>
    </div>
  );
}

export default Carousel;