import React, { useState } from 'react';
import '../HojaDeEstilos/SaludOcupacional.css';
import { useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import Footer from './Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faHouseMedicalFlag } from '@fortawesome/free-solid-svg-icons';


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
                    Se define como una actividad multidisciplinaria que controla y realiza medidas de prevención para cuidar la 
                    salud de todos los trabajadores. Esto incluye enfermedades, cualquier tipo de accidentes y todos los factores
                    que puedan llegar a poner en peligro la vida, la salud o la seguridad de las personas en sus respectivos trabajos.
                </p>
            </div>

            <div className="salud_impor-container">
                <h2>¿Por qué es importante la salud ocupacional?</h2>
                <p>
                Las actividades están dirigidas a promover y mantener el más alto grado de bienestar físico, mental y 
                social entre los trabajadores de todas las áreas y profesiones; prevenir daños a la salud causados por condiciones 
                de trabajo, así como colocar y mantener al trabajador en un empleo digno acorde con sus aptitudes fisiológicas y psicológicas.
                </p>
            </div>

            <div className='header2'>
                COMO ESTA FORMADO NUESTRO PROGRAMA
            </div>

            <div className='containerInfo'>
                <div style={{ position: 'relative', paddingLeft: '15%', marginTop:'1%' }}>
                    <h2 style={{fontSize: '2.5rem' }}>PLANIFICACIÓN</h2>
                </div>
                <FontAwesomeIcon icon={faBriefcaseMedical} style={{ color: '#1E60A6', fontSize: '100px', position: 'relative', marginRight: '77%', marginTop: '-7%', marginBottom: '2%'  }} />
                
                <div style={{ fontSize: '1.1rem'}}>
                    <p style={{ marginBottom: '2%'}}>
                    Inicia con un diagnóstico integral de las condiciones de salud y trabajo. Este diagnóstico abarca una evaluación 
                    detallada que incluye la identificación de peligros y evaluación de riesgos, análisis de estadísticas de 
                    accidentabilidad, detección de enfermedades laborales y comunes, así como el estudio del ausentismo laboral. 
                    Este proceso proporciona una visión completa de la situación actual en términos de salud y seguridad laboral, 
                    permitiendo identificar áreas clave para mejoras y acciones de control.
                    </p>
                </div>
            </div>
            
            <div className='containerInfo'>
                <div style={{ position: 'relative', paddingLeft: '10%', marginTop:'1%' }}>
                    <h2 style={{fontSize: '2.5rem' }}>DEFINICIÓN DE PRIORIADES</h2>
                </div>
                <FontAwesomeIcon icon={faCircleExclamation} style={{ color: '#1E60A6', fontSize: '100px', position: 'relative', marginRight: '77%', marginTop: '-7%', marginBottom: '2%'  }} />
                
                <div style={{ fontSize: '1.1rem'}}>
                    <p style={{ marginBottom: '2%'}}>
                    Se lleva a cabo una revisión de los requisitos legales en salud ocupacional entre el personal de alta gerencia y el evaluador.
                    </p>
                </div>
            </div>

            <div className='containerInfo'>
                <div style={{ position: 'relative', paddingLeft: '15%', marginTop:'1%' }}>
                    <h2 style={{fontSize: '2.5rem' }}>PLANES DE ACCIÓN</h2>
                </div>
                <FontAwesomeIcon icon={faHouseMedicalFlag} style={{ color: '#1E60A6', fontSize: '100px', position: 'relative', marginRight: '74%', marginTop: '-7%', marginBottom: '2%'  }} />
                
                <div style={{ fontSize: '1.1rem'}}>
                    <p style={{ marginBottom: '2%'}}>
                    Elabora estrategias para la intervención en el entorno y con las personas, incluyendo objetivos definidos, 
                    actividades específicas, indicadores de seguimiento, asignación de responsables y fechas de inicio y finalización.
                    Estas estrategias proveen una guía integral para implementar acciones con eficacia, enfocadas en mejorar 
                    condiciones y promover la salud laboral.
                    </p>
                </div>
            </div>




            <div className="empty-space-bottom1"></div>
            <Footer />
        </div>
    );
};

export default SaludOcupacional;
