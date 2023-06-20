import React, { useState } from 'react';
import moment from 'moment';
import '../HojaDeEstilos/Citas.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import Topbar from './Topbar';
import Footer from './Footer';


const Citas = () => {

  const hiddenDays = [0, 6];

  return (
    <div className="App">
      <Topbar />
      <div className='header'>
        NUESTRA DISPONIBILIDAD
      </div>

      <div className='cal'>
        <FullCalendar
          headerToolbar={{
            center: 'dayGridMonth,timeGridDay',
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          hiddenDays={hiddenDays}
          locale={esLocale}
          slotDuration="00:30:00" // se divida cada media hora
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }} // Formato de 12h
          slotMinTime="06:00:00"
          slotMaxTime="17:00:00"
          allDaySlot={false}
        />
      </div>
      <Footer />
    </div>
  );

};

export default Citas;
