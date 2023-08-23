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
    const previousViewRef = useRef('timeGridWeek');

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
        const calendarApi = calendarRef.current.getApi();

        if (isMobile) {
            previousViewRef.current = calendarApi.view.type;
            calendarApi.changeView('listWeek');
        } else {
            calendarApi.changeView(previousViewRef.current);
        }

    }, [isMobile]);

    const handleViewDidMount = () => {
        if (isMobile) {
            calendarRef.current.getApi().changeView('listWeek');
        }
    };

    let views = 'dayGridMonth,timeGridWeek';

    let headerToolbar = {
        left: 'prev,next today',
        center: 'title',
        right: views,
    }

    if (!isDoctor) {
        previousViewRef.current = 'dayGridMonth'
        views = 'timeGridWeek';
        headerToolbar = {
            left: 'prev,next today',
            center: 'title',
            right: null,
        }
    }

    return (
        <div class='cal-container'>
            <FullCalendar

                ref={calendarRef}

                headerToolbar={headerToolbar}

                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}

                initialView={isMobile ? 'listWeek' : (isDoctor ? 'dayGridMonth' : 'timeGridWeek')}

                views={{
                    dayGridMonth: {
                        titleFormat: { year: 'numeric', month: 'long' }
                    },
                    timeGridWeek: {
                        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
                    },
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

                viewDidMount={handleViewDidMount}

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