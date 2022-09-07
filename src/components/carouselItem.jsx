import React from "react";
import './carousel.css';

function CarouselItem({ imgLink, alt }) {
  //<img src={imgLink} alt="Product" />
  return (
    <div className="imgContainer">
      <img src={imgLink} alt={alt} className="carouselItem" />
    </div>
  );
}

export default CarouselItem;