import React, { useState } from 'react';
import moment from 'moment';
import '../HojaDeEstilos/Citas.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import NavBar from '../NavBar';




const Citas = () => {


  const hiddenDays = [1, 7];

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
              weekends={true}
              selectable={true}
              selectMirror={true}
              editable={true}
              dayMaxEvents={true}
              locale={esLocale}
            />
          </div>
        </div>
      </main>

      <footer>

      </footer>
    </div>

  );

};

export default Citas;
