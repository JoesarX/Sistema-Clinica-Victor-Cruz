import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import './Filtrar_Citas.css';

const Filtro = ({ onFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState('Ver Todas');

    const handleChange = (e) => {
        setSelectedFilter(e.target.value);
        onFilterChange(e.target.value);
    }

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
                    select onChange={handleChange}
                >
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