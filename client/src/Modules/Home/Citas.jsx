import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const Citas = () => {
  const localizer = momentLocalizer(moment);

  return (
    <div>
      <h1>Appointment Calendar</h1>
      <Calendar
        localizer={localizer}
        events={[]} // Provide your own events data here
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={(slotInfo) => {
          console.log('Selected slot:', slotInfo);
          // Implement your logic to handle the selected slot here
        }}
      />
    </div>
  );
};

export default Citas;

  