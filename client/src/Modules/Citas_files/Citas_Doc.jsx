import React, { useEffect, useState } from 'react';
import './CitasStyle.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import NavBar from '../NavBar';
import Footer from '../Home/Footer';
import CitasService from '../../Services/CitasService';



const Citas_Doc = () => {
  const hiddenDays = [1, 7];
  const [citas, setCitas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(true);

  useEffect(() => {
    // Validación login
    

    const fetchAllCitas = async () => {
        try {
            const citasData = await CitasService.getAllCitas();
            const citasWithId = citasData.map((cita) => ({
                ...cita,
                medId: cita.idmed,
            }));

            setCitas(citasWithId);
      
        } catch (error) {
            // Handle error if any
            console.log("Error fetching citas:", error);
        }
    };
    // Update tabla
    fetchAllCitas();

    if (isSubmitting) {
        fetchAllCitas();
        setIsSubmitting(false);
        console.log("TEST DE CITAS API AAAAAAAAAAAAAAAAAAAAAAA")
    }

    // Clean up the event listener on component unmount
    return () => {
      setIsSubmitting(false);
    };
}, [isSubmitting]);

  console.log("Hola"+citas);

  return (
    <div className="App">
      <NavBar />
      <h1 className="header">Agendar Cita</h1>
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
              hiddenDays={hiddenDays}
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
              events={citas.map(cita => ({
                title: `Expediente: ${cita.expediente}`,
                start: cita.fechaInicio,
                end: cita.fechaFin,
                description: `Hora de inicio: ${cita.horaInicio}, Hora final: ${cita.horaFin}`,
              }))}
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
