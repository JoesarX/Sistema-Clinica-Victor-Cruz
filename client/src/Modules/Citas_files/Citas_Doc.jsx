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

const Citas_Doc = () => {

  const [citas, setCitas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [formattedEvents, setFormattedEvents] = useState([]);

  useEffect(() => {

    const fetchAllCitas = async () => {
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
    };
    // Update tabla
    fetchAllCitas();

    const processEvents = (receivedCitas) => {
      const events = receivedCitas.map(cita => ({
        title: `${cita.nombre_persona}`,
        start: cita.hora_inicio,
        end: cita.hora_final,
        description: `Hora de inicio: ${cita.hora_inicio}, Hora final: ${cita.hora_final}`,
      }));
      setFormattedEvents(events);
    };

    if (isSubmitting) {
      fetchAllCitas();
      setIsSubmitting(false);
    }

    // Clean up the event listener on component unmount
    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);

  return (
    <div className="App">
      <NavBar />
      <h1 className="header">Calendario de Citas</h1>
      <main>
        <div className="cal-container">
          <div className="cal">
            <FullCalendar
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
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
              dayMaxEvents={5}
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
