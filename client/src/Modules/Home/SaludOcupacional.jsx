import React, { useState } from 'react';
import '../HojaDeEstilos/SaludOcupacional.css';
import { useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import Footer from './Footer';

import { useEffect, useCallback } from 'react'
import DoctorImg from '../Imagenes/doctorPhoto.jpg'

const SaludOcupacional = () => {




    return (
        <div className="scrollable-page2">
            <Topbar />
            <div className='header1'>
                SALUD OCUPACIONAL
            </div>
            <div className="empty-space-top1"></div>


            <div className="salud_desc-container">
                <h2>¿Qué es la Salud Ocupacional?</h2>
                <p>
                    se define como una actividad multidisciplinaria que controla y realiza medidas de prevención para cuidar la salud de todos los trabajadores.
                    Esto incluye enfermedades, cualquier tipo de accidentes y todos los factores que puedan llegar a poner en peligro la vida,
                    la salud o la seguridad de las personas en sus respectivos trabajos.
                </p>
            </div>

            <div className="salud_impor-container">
                <h2>¿Por qué es importante la salud ocupacional?</h2>
                <p>
                    Una de las principales razones para poner atención en la salud ocupacional es la
                    reducción en el porcentaje de ausentismo debido a la baja de enfermedades o malestares y el incremento de la felicidad.
                </p>
            </div>


            <div className="person-container1">
                
            </div>




            <div className="empty-space-bottom1"></div>
            <Footer />
        </div>
    );
};

export default SaludOcupacional;
