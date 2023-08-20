import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

const CitasCalendar = ({ events, isDoctor = true }) => {

    let views = 'dayGridMonth,timeGridWeek';

    let headerToolbar = {
        left: 'prev,next today',
        center: 'title',
        right: views,
    }
    // let hiddenDays = [0]

    if (!isDoctor) {
        views = 'timeGridWeek';
        headerToolbar = {
            left: 'prev,next today',
            center: 'title',
            right: null,
        }
        // hiddenDays.push(6);
    }

    return (
        <div class='cal-container'>
            <FullCalendar

                headerToolbar={headerToolbar}

                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

                initialView={isDoctor ? "dayGridMonth" : "timeGridWeek"}

                // views={{
                //     timeGridThreeDay: {
                //         type: 'timeGrid',
                //         duration: { days: 3 },
                //         buttonText: 'Día'
                //     }
                // }}

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

                // hiddenDays={hiddenDays}
                hiddenDays={[0, 6]}

                eventContent={(eventInfo) => (
                    <>
                        <div class={'event-line-container' + (!isDoctor ? ' user' : '')}>
                            <div class={'event-line-time-label' + (!isDoctor ? ' user' : '')}>
                                {eventInfo.timeText}
                            </div>
                            <div class={'event-line-title-label' + (!isDoctor ? ' user' : '')}>
                                {eventInfo.event.title}
                            </div>
                        </div>
                    </>
                )}
            />
        </div>
    )
}

export default CitasCalendar;