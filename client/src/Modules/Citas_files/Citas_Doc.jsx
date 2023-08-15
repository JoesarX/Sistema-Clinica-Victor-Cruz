import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import NavBar from '../NavBar';
import Footer from '../Home/Footer';
import CitasService from '../../Services/CitasService';
import './CitasStyle.css';
import Filtro from './Filtrar_Citas';

const Citas_Doc = () => {
  const [citas, setCitas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [formattedEvents, setFormattedEvents] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('Ver Todas');
  const [showAllCitas, setShowAllCitas] = useState(true);
  const [filter, setFilter] = useState('Ver Todas');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  }

  const fetchCitas = async () => {
    if (filter === 'Ver Todas') {
      try {
        const citasData = await CitasService.getAllCitas();
        const citasWithId = citasData.map((cita) => ({
          ...cita,
          medId: cita.idmed,
        }));
        setCitas(citasWithId);
        processEvents(citasWithId);
      } catch (error) {
        console.log("Error fetching citas:", error);
      }
    } else {
      try {
        const citasData = await CitasService.filterCita(filter);
        const citasWithId = citasData.map((cita) => ({
          ...cita,
          medId: cita.idmed,
        }));
        setCitas(citasWithId);
        processEvents(citasWithId);
      } catch (error) {
        console.log('Error fetching filtered citas:', error);
      }
    }

  };
  const processEvents = (receivedCitas) => {
    const events = receivedCitas.map(cita => {
      // Parse the fecha and hora values to create JavaScript Date objects
      const fechaParts = cita.fecha.split('-');
      let horaParts;

      // Time format is in "1:45 PM" format
      const timeString = cita.hora;
      const [time, meridiem] = timeString.split(' ');
      const [hour, minute] = time.split(':');
      const hour24 = parseInt(hour) + (meridiem === 'PM' ? 12 : 0);
      horaParts = [hour24.toString(), minute];

      const startDateTime = new Date(
        parseInt(fechaParts[0]),    // Year
        parseInt(fechaParts[1]) - 1,  // Month (months are zero-indexed in JavaScript Date)
        parseInt(fechaParts[2]),    // Day
        parseInt(horaParts[0]),      // Hours
        parseInt(horaParts[1])       // Minutes
      );

      // Calculate the ending time to be 40 minutes after the starting time
      const endDateTime = new Date(startDateTime.getTime() + 29 * 60000); // 40 minutes in milliseconds

      return {
        title: `${cita.nombre_persona}`,
        start: startDateTime,
        end: endDateTime,
      };
    });
    setFormattedEvents(events);
  };

  useEffect(() => {
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
        <div className="cal-container">
          <div className="cal">
            <FullCalendar

              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridThreeDay',
              }}

              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

              initialView="dayGridMonth"

              views={{
                timeGridThreeDay:{
                  type: 'timeGrid',
                  duration: { days: 3 },
                  buttonText: 'Día'
                }
              }}

              locale={esLocale}

              slotDuration="00:30:00"

              slotLabelFormat={{
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              }}

              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              }}

              slotMinTime="07:00:00"
              slotMaxTime="17:00:00"

              allDaySlot={false}
              events={formattedEvents}
              nowIndicator={true}

              dayMaxEventRows={6}

              eventMinHeight={50}
              eventMinWidth={'100%'}

              height={'80em'}

              hiddenDays={[0]}

              eventContent={(eventInfo) => (
                <>
                  <div className='event-line-container'>
                    <div class="event-line-time-label">{eventInfo.timeText}</div>
                    <div class="event-line-title-label">{eventInfo.event.title}</div>
                  </div>
                </>
              )}
            />
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Citas_Doc;