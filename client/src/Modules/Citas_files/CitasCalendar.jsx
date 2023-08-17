import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

const CitasCalendar = ({ events, isDoctor=true }) => {

    let views = 'dayGridMonth,timeGridWeek,timeGridThreeDay';
    let eventColor = '';

    if (!isDoctor) {
        views = 'timeGridWeek,timeGridThreeDay';
        eventColor = '#6c757d';
    }

    return (
        <div class='cal-container'>
            <FullCalendar

                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: views,
                }}

                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

                initialView={isDoctor ? "dayGridMonth" : "timeGridWeek"}

                views={{
                    timeGridThreeDay: {
                        type: 'timeGrid',
                        duration: { days: 3 },
                        buttonText: 'Día'
                    }
                }}

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
                slotMaxTime="16:00:00"

                allDaySlot={false}
                events={events}
                nowIndicator={true}

                dayMaxEventRows={6}

                eventMinHeight={50}
                eventMinWidth={'100%'}

                height={'auto'}

                hiddenDays={[0]}

                eventColor={eventColor}

                eventContent={(eventInfo) => (
                    isDoctor ? (
                        <>
                            <div className='event-line-container'>
                                <div class="event-line-time-label">{eventInfo.timeText}</div>
                                <div class="event-line-title-label">{eventInfo.event.title}</div>
                            </div>
                        </>) :
                        (

                            <>
                                <div className='event-line-container reserved'>
                                    <div class="event-line-time-label">{eventInfo.timeText}</div>
                                </div>
                            </>
                        )
                )}
            />
        </div>
    )
}

export default CitasCalendar;