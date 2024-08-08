import React, { useState } from 'react';
import './Contador.css';
import PlusIcon from './plus-icon.png';
import CatSad1 from './gatinhos-tristinhos/cat-sad-1.png';
import CatSad2 from './gatinhos-tristinhos/cat-sad-2.png';
import CatSad3 from './gatinhos-tristinhos/cat-sad-3.png';
import CatSad4 from './gatinhos-tristinhos/cat-sad-4.png';
import CatSad5 from './gatinhos-tristinhos/cat-sad-5.png';
import CatSad6 from './gatinhos-tristinhos/cat-sad-6.png';
import CatSad7 from './gatinhos-tristinhos/cat-sad-7.png';
import CatSad8 from './gatinhos-tristinhos/cat-sad-8.png';

const Contador = () => {
    const [count, setCount] = useState(256);
    const [cats, setCats] = useState([]);
    const catImages = [
        CatSad1,
        CatSad2,
        CatSad3,
        CatSad4,
        CatSad5,
        CatSad6,
        CatSad7,
        CatSad8
    ];

    const addCat = () => {
        const randomCat = catImages[Math.floor(Math.random() * catImages.length)];
        const randomLeft = Math.random() * 100 - 50; 
        const randomRotate = Math.random() * 40 - 20;
        setCats([...cats, { src: randomCat, left: randomLeft, rotate: randomRotate }]);
    };

    const handleClick = () => {
        setCount(count + 1);
        addCat();
    };

    return (
        <div className="contador-container">
            <div className="counter-content">
                <h1>Contador de Saudade Hoje: {count}</h1>
                <button className="increment-button" onClick={handleClick}>
                    <img src={PlusIcon} alt="plus" />
                    {cats.map((cat, index) => (
                    <img
                        key={index}
                        src={cat.src}
                        alt="cat"
                        className="cat-image"
                        style={{ left: `${cat.left}px`, transform: `rotate(${cat.rotate}deg)` }}
                    />
                ))}
                </button>     
            </div>
        </div>
    );
};

export default Contador;
