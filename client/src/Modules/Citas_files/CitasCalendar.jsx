import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list'
import esLocale from '@fullcalendar/core/locales/es';
import { useState, useEffect, useRef } from 'react';

const CitasCalendar = ({ events, isDoctor = true }) => {

    const calendarRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [shouldChangeView, setShouldChangeView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 920);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isMobile) {
            setShouldChangeView(true);
        } else {
            setShouldChangeView(false);
        }
    }, [isMobile]);

    useEffect(() => {
        const calendarApi = calendarRef.current.getApi();

        if (shouldChangeView) {
            setTimeout(() => {
                const defaultMobileView = isDoctor ? 'listMonth' : 'listWeek'
                calendarApi.changeView(defaultMobileView);
            }, 0);
        } else {
            const defaultView = isDoctor ? 'dayGridMonth' : 'timeGridWeek';
            setTimeout(() => {
                calendarApi.changeView(defaultView);
            }, 0);
        }
    }, [shouldChangeView, isDoctor]);

    return (
        <div class='cal-container'>
            <FullCalendar

                ref={calendarRef}

                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: isMobile ? (isDoctor ? 'listMonth,listWeek' : null) : (isDoctor ? 'dayGridMonth,timeGridWeek' : null),
                }}

                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}

                initialView={isMobile ? 'listWeek' : (isDoctor ? 'dayGridMonth' : 'timeGridWeek')}

                views={{
                    dayGridMonth: {
                        titleFormat: { year: 'numeric', month: 'long' }
                    },
                    timeGridWeek: {
                        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
                    },
                    listWeek: {
                        buttonText: 'Semana'
                    },
                    listMonth: {
                        buttonText: 'Mes'
                    }
                }}

                validRange={(currentDate) => {
                    if (!isDoctor) {
                        var startDate = new Date(currentDate.valueOf());
                        var endDate = new Date(currentDate.valueOf());

                        const daysPast = startDate.getDay();
                        const remainingDaysThisWeek = 7 - startDate.getDay();

                        startDate.setDate(startDate.getDate() - daysPast);
                        endDate.setDate(endDate.getDate() + 14 + remainingDaysThisWeek);

                        return { start: startDate, end: endDate };
                    }
                }}

                titleRangeSeparator=' a '

                locale={esLocale}

                slotDuration="00:30:00"

                slotLabelFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    hourCycle: 'h12'
                }}

                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    hourCycle: 'h12'
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

                hiddenDays={[0, 6]}

                // viewDidMount={handleViewDidMount}

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