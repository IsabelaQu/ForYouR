import React, { useState } from 'react';
import './Calendar.css';
import arrowLeft from './arrow-left.png';
import arrowRight from './arrow-right.png';

import heartIcon from './icon-heart.png';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 11));
  const [reminders, setReminders] = useState({
    '2024-2-11': '11 de Março - Nos conhecemos 💕',
    '2024-3-10': '10 de Abril - Primeiro Beijo 😽',
    '2024-3-20': '20 de Abril - Fui na sua casa pela primeira vez 🏡',
    '2024-4-15': '20 de Maio - Eu Te Amo 💖',
    '2024-5-12': '12 de Junho - Primeiro dia dos namorados juntos 👩‍❤️‍💋‍🧑',
    '2024-5-15': '15 de Junho - Primeira viagem juntos para Campos 🌍',
    '2024-6-7': '07 de Julho - Primeiro show juntos do Veigh baby uhh 🎸',
    '2024-7-9': '09 de Agosto - Feliz aniversário meu amor!! 🎂💞✨'
  });
  

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const days = [];
    const startDay = startDayOfMonth(month, year);

    for (let i = 0; i < startDay; i++) {
      days.push(<div className="day empty" key={`empty-${i}`}></div>);
    }

    for (let i = 1; i <= daysInMonth(month, year); i++) {
      const dayKey = `${year}-${month}-${i}`;
      const isHighlighted = reminders[dayKey] !== undefined;

      days.push(
        <div
          className={`day ${isHighlighted ? 'highlight' : ''}`}
          key={i}
          onClick={() => addReminder(i)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const addReminder = (day) => {
    const reminder = prompt('Adicionar um lembrete:');
    if (reminder) {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      setReminders((prevReminders) => ({
        ...prevReminders,
        [`${year}-${month}-${day}`]: `${day} de ${currentDate.toLocaleString('default', { month: 'long' })} - ${reminder}`,
      }));
    }
  };

   const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const renderReminders = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    return Object.entries(reminders)
      .filter(([key, _]) => {
        const [reminderYear, reminderMonth] = key.split('-').map(Number);
        return reminderYear === year && reminderMonth === month;
      })
      .map(([key, reminder], index) => {
        const [date, ...rest] = reminder.split(' - ');
        return (
          <div className="reminder-item" key={index}>
            <div className="reminder-bar"></div>
            <span className="reminder-date">{date} | </span> <span className="reminder-text">{rest.join(' - ')}</span>
          </div>
        );
      });
  };

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="header">
          <div className="month-year-nav">
            <div className="month-year">
              <span className="month-title">{currentDate.toLocaleDateString('pt-BR', { month: 'long' })}</span>
              <span className="year-title">{currentDate.getFullYear()}</span>
            </div>
            <div className="nav-buttons">
              <button onClick={prevMonth} className="nav-button">
                <img src={arrowRight} alt="Previous Month" />
              </button>
              <button onClick={nextMonth} className="nav-button">
                <img src={arrowLeft} alt="Next Month" />
              </button>
            </div>
          </div>
        </div>
        <div className="calendar-background">
          <div className="week-days">
            {weekDays.map((day, index) => (
              <div className="week-day" key={index}>{day}</div>
            ))}
          </div>
          <div className="days">{renderDays()}</div>
        </div>
      </div>
      <div className="reminders-container">
        {renderReminders()}
      </div>
    </div>
  );
};

export default Calendar;
