import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';
import music1 from './music/music-1.mp3';
import music2 from './music/music-2.mp3';
import music3 from './music/music-3.mp3';
import music4 from './music/music-4.mp3';

import capa1 from './veigh-capa.jpg'; 
import capa2 from './delineado-capa.jpg'; 
import capa3 from './loucura-capa.jpg';
import capa4 from './mandraka-capa.jpg';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState({ play: false, next: false, prev: false, repeat: false, shuffle: false });
  const [elapsedTime, setElapsedTime] = useState('00:00');
  const [totalTime, setTotalTime] = useState('00:00');
  const audioRef = useRef(null);

  const tracks = [
    { src: music1, title: 'Fumaça', artist: 'Barbara Bandeira', cover: capa1 }, //chorei quando funcionou pela primeira vez quando comecei a desenvolver
    { src: music2, title: 'Delineado', artist: 'Veigh', cover: capa2 },
    { src: music3, title: 'Loucura', artist: 'Borges', cover: capa3 },
    { src: music4, title: 'Mandraka', artist: 'Veigh', cover: capa4 },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      setElapsedTime(formatTime(currentTime));
      setTotalTime(formatTime(duration));
    };
    audio.addEventListener('timeupdate', updateProgress);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentTrackIndex]);

  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setSelectedButtons((prevState) => ({ ...prevState, play: false }));
    } else {
      audioRef.current.play();
      setSelectedButtons((prevState) => ({ ...prevState, play: true }));
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
    setIsPlaying(true);
    setSelectedButtons((prevState) => ({ ...prevState, next: true, play: true }));
    setTimeout(() => setSelectedButtons((prevState) => ({ ...prevState, next: false })), 200);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((currentTrackIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
    setSelectedButtons((prevState) => ({ ...prevState, prev: true, play: true }));
    setTimeout(() => setSelectedButtons((prevState) => ({ ...prevState, prev: false })), 200);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    setSelectedButtons((prevState) => ({ ...prevState, repeat: !isRepeat }));
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    setSelectedButtons((prevState) => ({ ...prevState, shuffle: !isShuffle }));
  };

  const handleEnded = () => {
    if (isRepeat) {
      audioRef.current.play();
    } else if (isShuffle) {
      setCurrentTrackIndex(Math.floor(Math.random() * tracks.length));
    } else {
      nextTrack();
    }
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex].src}
        onEnded={handleEnded}
        autoPlay={isPlaying}
      ></audio>
      <div className="track-info-container" style={{ backgroundImage: `url(${tracks[currentTrackIndex].cover})` }}>
        <div className="track-title">{tracks[currentTrackIndex].title}</div>
        <div className="track-artist">{tracks[currentTrackIndex].artist}</div>
      </div>
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(audioRef.current?.currentTime / audioRef.current?.duration) * 100}%` }}></div>
        </div>
        <div className="time-container">
          <span className="time elapsed-time">{elapsedTime}</span>
          <span className="time total-time">{totalTime}</span>
        </div>
      </div>
      <div className="controls">
        <button
          className={`repeat-button ${selectedButtons.repeat ? 'selected' : ''}`}
          onClick={toggleRepeat}
        ></button>
        <button
          className={`prev-button ${selectedButtons.prev ? 'selected' : ''}`}
          onClick={prevTrack}
        ></button>
        <button
          className={`play-button ${selectedButtons.play ? 'selected' : ''}`}
          onClick={playPause}
        ></button>
        <button
          className={`next-button ${selectedButtons.next ? 'selected' : ''}`}
          onClick={nextTrack}
        ></button>
        <button
          className={`shuffle-button ${selectedButtons.shuffle ? 'selected' : ''}`}
          onClick={toggleShuffle}
        ></button>
      </div>
    </div>
  );
};

export default MusicPlayer;
