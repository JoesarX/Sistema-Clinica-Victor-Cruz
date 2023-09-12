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
      const fechaParts = cita.fecha.split('-');
      let horaParts;

      const timeString = cita.hora;
      const [time, meridiem] = timeString.split(' ');
      const [hour, minute] = time.split(':');
      let hour24 = parseInt(hour);

      if (hour24 !== 12) {
        hour24 += (meridiem === 'PM' ? 12 : 0);
      }

      horaParts = [hour24.toString(), minute];

      const startDateTime = new Date(
        parseInt(fechaParts[0]),
        parseInt(fechaParts[1]) - 1,
        parseInt(fechaParts[2]),
        parseInt(horaParts[0]),
        parseInt(horaParts[1])
      );

      const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

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
          
        }
      } else {
        try {
          const citasData = await CitasService.filterCita(filter);
          processEvents(citasData);
        } catch (error) {
          
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
      <CitasCalendar events={formattedEvents} />
      <Footer />
    </div>
  );
};

export default Citas_Doc;