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
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
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
      <Footer />
    </footer>
  </div>
  );

};

export default Citas;
