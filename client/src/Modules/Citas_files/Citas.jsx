import React, { useState } from 'react';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import Topbar from '../Home/Topbar';
import Footer from '../Home/Footer';

import CitasService from '../../Services/CitasService';
import './CitasStyle.css';
import '../HojaDeEstilos/CrudStyles.css';

const Citas = () => {

  const hiddenDays = [0, 6, 5];

  
  return (
    <div className="App">
      <header>
        <Topbar />
        <h1 className="header">NUESTRA DISPONIBILIDAD</h1>
      </header>

      <main>
        <div className="cal-container">
          <div className="cal">
            <FullCalendar
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay',
              }}
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
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


      <footer>
        <Footer />
      </footer>
    </div>
  );

};

export default Citas;
