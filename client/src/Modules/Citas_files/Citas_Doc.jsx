import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import Footer from '../Home/Footer';
import CitasService from '../../Services/CitasService';
import Filtro from './Filtrar_Citas';
import CitasCalendar from './CitasCalendar';

const Citas_Doc = () => {
  const [formattedEvents, setFormattedEvents] = useState([]);
  const [filter, setFilter] = useState('Ver Todas');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  }

  const processEvents = (receivedCitas) => {
    const events = receivedCitas.map(cita => {
      // Parse the fecha and hora values to create JavaScript Date objects
      const fechaParts = cita.fecha.split('-');
      let horaParts;

      // Time format is in "1:45 PM" format
      const timeString = cita.hora;
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
        title: `${cita.nombre_persona}`,
        start: startDateTime,
        end: endDateTime,
      };
    });
    setFormattedEvents(events);
  };

  useEffect(() => {

    const fetchCitas = async () => {
      if (filter === 'Ver Todas') {
        try {
          const citasData = await CitasService.getAllCitas();
          processEvents(citasData);
        } catch (error) {
          console.log("Error fetching citas:", error);
        }
      } else {
        try {
          const citasData = await CitasService.filterCita(filter);
          processEvents(citasData);
        } catch (error) {
          console.log('Error fetching filtered citas:', error);
        }
      }
  
    };

    fetchCitas(filter);
  }, [filter]);

  return (
    <div className="App">
      <NavBar />
      <h1 className="calendar-page-header header">Calendario de Citas</h1>
      <div>
        <Filtro onFilterChange={handleFilterChange} />
      </div>
      <main>
        <CitasCalendar events={formattedEvents} isDoctor={true}/>
      </main>
      <Footer />
    </div>
  );
};

export default Citas_Doc;