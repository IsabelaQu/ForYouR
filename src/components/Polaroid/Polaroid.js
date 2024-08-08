import React, { useState } from 'react';
import './Polaroid.css';
import imageUs1 from './image-us-1.png';
import imageUs2 from './image-us-2.png';
import imageUs3 from './image-us-3.png';
import imageUs4 from './image-us-4.png';

const images = [imageUs1, imageUs2, imageUs3, imageUs4];

const Polaroid = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClick = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  return (
    <div className="polaroid-wrapper">
      <div className="polaroid-container">
        <div 
          className="polaroid-picture" 
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        ></div>
        <div className="polaroid-image image-slime"></div>
        <div className="polaroid-image-two image-slime-two"></div>
      </div>
      <button className="polaroid-button" onClick={handleClick}></button>
    </div>
  );
};

export default Polaroid;
