import React, { useState } from 'react';
import './App.css';

import Calendar from './components/Calendar/Calendar';
import Contador from './components/Contador/Contador';
import Polaroid from './components/Polaroid/Polaroid';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import MoEvolution from './components/MoEvolution/MoEvolution';

import Logo from './images/Logo-site.png';
import backgroundImageCenter from './images/background-image.png';
import elementsGraphicsHeartCalendar from './images/elements-graphics-heart-calendar.png';
import elementsGraphicHeartContador from './images/elements-graphic-heart-contador.png'; 
import elementsGraphicsHeartsPolaroid from './images/elements-graphics-hearts-polaroid.png';
import elementsReminders from './images/elements-reminders.png';
import elementsForBack from './images/elements-graphics-background.png';
import elementsGraphicsHeader from './images/elements-graphics-header.png';
import codeIconPersona from './images/code-icon-persona.png';
import elementsGraphicsAster from './images/elements-graphics-aster.png';
import heartPopupTop from './images/heart-popup-top.png';
import heartPopupBottom from './images/heart-popup-bottom.png';

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [playMusic, setPlayMusic] = useState(false); //lembra de ajusta pra musica tocar quando clica no botao da popup

  const handleClosePopup = () => {
    setShowPopup(false);
    setPlayMusic(true);
  };

  return (
    <div className="app-background">
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h1 className="popup-header">FELIZ ANIVERSARIO PRO MELHOR HOMEM DO MUNDO</h1>
            <h2 className="popup-alert">ALERTA!</h2>
            <p className="popup-message">Quero sua ajuda pra preencher o calendário com todas nossas datas importantes, vamos fazer isso juntinhos &lt;3</p>
            <button className="popup-button" onClick={handleClosePopup}>Vem comigo?</button>
            <img src={heartPopupTop} alt="Heart Popup Top" className="popup-image-top" />
            <img src={heartPopupBottom} alt="Heart Popup Bottom" className="popup-image-bottom" />
          </div>
        </div>
      )}
      <div className="header-container welcome-container">
        <img src={Logo} alt="Logo" className="logo" />
        <div className="welcome-text">
          NOSSAS MEMORIAS EM CÓDIGO
          <img src={elementsGraphicsHeader} alt="Element Header" className="element-header" /> 
        </div>
      </div>
      <img src={backgroundImageCenter} alt="Background Center" className="background-image-center" />
      <img src={elementsGraphicsHeartCalendar} alt="Elements Graphics Heart Calendar" className="elements-graphics-heart-calendar" />
      <img src={elementsGraphicHeartContador} alt="Elements Graphic Heart Contador" className="elements-graphic-heart-contador" />
      <img src={elementsGraphicsHeartsPolaroid} alt="Elements Graphics Hearts Polaroid" className="elements-graphics-hearts-polaroid" /> 
      <img src={elementsReminders} alt="Elements Reminders" className="elements-reminders" /> 
      <img src={elementsForBack} alt="Elements Back" className="elements-back" /> 
      <Contador />
      <Calendar />
      <Polaroid />
      <MusicPlayer playMusic={playMusic} />
      <MoEvolution />
      <img src={codeIconPersona} alt="Code Icon Persona" className="code-icon-persona" />
      <img src={elementsGraphicsAster} alt="Elements Graphics Aster" className="elements-graphics-aster" />
    </div>
  );
}

export default App;
