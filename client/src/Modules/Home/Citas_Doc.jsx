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

  const [showCreateAppointment, setShowCreateAppointment] = useState(false);

  const handleCreateAppointment = () => {
    // Logic to handle the creation of an appointment
    console.log('Creating appointment...');
    // Additional code to perform the necessary actions for appointment creation
  };

  const hiddenDays = [1, 7];

  return (
    <div className="App">
      <h1 className="header">Calendario Para Citas</h1>
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
