import React, { useState } from 'react';
import moment from 'moment';
import '../HojaDeEstilos/Citas.css';

const Citas = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));
  const [email, setEmail] = useState('');

  const handleSlotClick = (slot) => {
    if (!selectedSlot && slot.available) {
      setSelectedSlot(slot);
    }
  };

  const handleConfirmAppointment = () => {
    if (selectedSlot && email) {
      // Perform necessary actions here (e.g., send confirmation email, update database, etc.)
      alert(`Cita Confirmada! Hora:${selectedSlot.time} el ${selectedSlot.day} para ${email}`);

      // Mark the slot as booked
      const updatedSlot = { ...selectedSlot, available: false };
      setSelectedSlot(updatedSlot);

      // Clear the selected slot and email
      setSelectedSlot(null);
      setEmail('');
    }
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    setSelectedSlot(null); // Reset the selected slot when the day changes
  };

  const renderSlots = () => {
    const slots = [];
    const startTime = moment('08:00 AM', 'hh:mm A');
    const endTime = moment('05:00 PM', 'hh:mm A');

    while (startTime.isBefore(endTime)) {
      const slot = {
        time: startTime.format('hh:mm A'),
        day: selectedDay,
        available: true,
      };

      slots.push(
        <div
          key={`${slot.day}-${slot.time}`}
          className={`slot ${selectedSlot === slot ? 'selected' : ''} ${slot.available ? 'available' : 'booked'}`}
          onClick={() => handleSlotClick(slot)}
          style={{ backgroundColor: selectedSlot === slot ? 'grey' : (slot.available ? 'inherit' : 'red') }}
        >
          {slot.time}
        </div>
      );

      startTime.add(1, 'hour');
    }

    return slots;
  };

  return (
    <div className="App">
      <h1>Appointment Calendar</h1>
      <div className="calendar">
        <div className="day-selector">
          <label htmlFor="day">Select a day:</label>
          <input
            type="date"
            id="day"
            value={selectedDay}
            onChange={handleDayChange}
          />
        </div>
        <div className="time-slots">{renderSlots()}</div>
        <div className="appointment-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleConfirmAppointment}>Confirm Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default Citas;
