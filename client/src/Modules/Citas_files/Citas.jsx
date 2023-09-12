import React, { useState, useEffect } from 'react';

import Topbar from '../Home/Topbar';
import Footer from '../Home/Footer';

import CitasService from '../../Services/CitasService';
import './CitasStyle.css';
import CitasCalendar from './CitasCalendar';

const Citas = () => {

  const [formattedEvents, setFormattedEvents] = useState([]);

  const processEvents = (receivedCitas) => {
    const events = receivedCitas.map(cita => {
      // Parse the fecha and hora values to create JavaScript Date objects
      const fechaParts = cita.date.split('-');
      let horaParts;

      // Time format is in "1:45 PM" format
      const timeString = cita.time;
      const [time, meridiem] = timeString.split(' ');
      const [hour, minute] = time.split(':');
      let hour24 = parseInt(hour);

      if (hour24 !== 12) {
        hour24 += (meridiem === 'PM' ? 12 : 0);
      }

      horaParts = [hour24.toString(), minute];

      const startDateTime = new Date(
        parseInt(fechaParts[0]),    // Year
        parseInt(fechaParts[1]) - 1,  // Month (months are zero-indexed in JavaScript Date)
        parseInt(fechaParts[2]),    // Day
        parseInt(horaParts[0]),      // Hours
        parseInt(horaParts[1])       // Minutes
      );

      // Calculate the ending time to be 40 minutes after the starting time
      const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 40 minutes in milliseconds

      return {
        // title: 'Disponible',
        start: startDateTime,
        end: endDateTime,
      };
    });
    setFormattedEvents(events);
  };

  useEffect(() => {

    const fetchCitas = async () => {
      try {
        const citasData = await CitasService.getAvailableTimesTwoWeeks(2);
        processEvents(citasData);
      } catch (error) {
        console.log("Error fetching citas:", error);
      }
    };

    fetchCitas();
  }, []);

  return (
    <div className="App">
      <header>
        <Topbar />
        <h1 className="calendar-page-header header">NUESTRA DISPONIBILIDAD</h1>
      </header>
      <CitasCalendar events={formattedEvents} isDoctor={false} />
      <Footer />
    </div>
  );

};

export default Citas;
