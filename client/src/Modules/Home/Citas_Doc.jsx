import React, { useState } from 'react';
import '../HojaDeEstilos/Citas.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import NavBar from '../NavBar';


//GRID
import { Box, Button } from '@mui/material'
import { PersonAdd, Delete, Edit, Medication } from '@mui/icons-material'





const Citas_Doc = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toggleModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
    setIsSubmitting(false);

  };


  const hiddenDays = [1, 7];

  return (
    <div className="App">
      <NavBar />
      <Button
        onClick={toggleModal}
        startIcon={<PersonAdd />}
        style={{
          backgroundColor: 'rgb(27, 96, 241)',
          color: 'white',
          borderRadius: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        Agregar Cita
      </Button>
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
            />
          </div>
        </div>
        
      </main>
      <Footer />
    </div>
  );
};

export default Citas_Doc;
