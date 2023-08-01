import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import './Filtrar_Citas.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import CitasService from '../../Services/CitasService';


const Filtro = () => {
    const [citas, setCitas] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(true);
    const [formattedEvents, setFormattedEvents] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('Ver Todas');

    useEffect(() => {
        const fetchAllCitas = async () => {
            try {
                const citasData = await CitasService.getAllCitas();
                const citasWithId = citasData.map((cita) => ({
                    ...cita,
                    medId: cita.idmed,
                }));
                setCitas(citasWithId);
                processEvents(citasWithId);
            } catch (error) {
                console.log('Error FILTRAR 1:', error);
            }
        };

        const fetchFilteredCitas = async (estado) => {
            try {
                const citasData = await CitasService.filterCita(estado);
                const citasWithId = citasData.map((cita) => ({
                    ...cita,
                    medId: cita.idmed,
                }));
                setCitas(citasWithId);
                processEvents(citasWithId);
            } catch (error) {
                console.log('Error FILTRAR 2222:', error);
            }
        };

        const processEvents = (receivedCitas) => {
            const events = receivedCitas.map(cita => {
                // Parse the fecha and hora values to create JavaScript Date objects
                const fechaParts = cita.fecha.split('-');
                let horaParts;

                // Time format is in "1:45 PM" format
                const timeString = cita.hora;
                const [time, meridiem] = timeString.split(' ');
                const [hour, minute] = time.split(':');
                const hour24 = parseInt(hour) + (meridiem === 'PM' ? 12 : 0);
                horaParts = [hour24.toString(), minute];

                const startDateTime = new Date(
                    parseInt(fechaParts[0]),    // Year
                    parseInt(fechaParts[1]) - 1,  // Month (months are zero-indexed in JavaScript Date)
                    parseInt(fechaParts[2]),    // Day
                    parseInt(horaParts[0]),      // Hours
                    parseInt(horaParts[1])       // Minutes
                );

                // Calculate the ending time to be 40 minutes after the starting time
                const endDateTime = new Date(startDateTime.getTime() + 29 * 60000); // 40 minutes in milliseconds

                return {
                    title: `${cita.nombre_persona}`,
                    start: startDateTime,
                    end: endDateTime,
                    // description: `Hora de inicio: ${cita.hora}, Hora final: ${formatEndTime(endDateTime)}`,
                };
            });
            setFormattedEvents(events);
        };

        if (isSubmitting) {
            if (selectedFilter === 'Ver Todas') {
                fetchAllCitas();
            } else {
                fetchFilteredCitas(selectedFilter);
            }
            setIsSubmitting(false);
        }
    }, [isSubmitting, selectedFilter]);

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
        setIsSubmitting(true);
    };

    return (
        <div className="dropdown-container">
            <div className="icon-container">
                <FontAwesomeIcon icon={faFilter} />
            </div>
            <div className='txt'>Filtrar Citas</div>
            <div className="dropdown">
                <select
                    className="custom-select-color"
                    aria-label="Default select example"
                    value={selectedFilter}
                    onChange={handleFilterChange}        >
                    <option value="Ver Todas">Ver Todas</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Curso">En Curso</option>
                    <option value="Terminada">Terminada</option>
                    <option value="Cancelada">Cancelada</option>
                    <option value="Expirada">Expirada</option>
                </select>
            </div>
        </div>
    );
};

export default Filtro;

