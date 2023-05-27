import React from 'react';
import '../HojaDeEstilos/Home.css';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import ReactDOM from 'react-dom';
import { useState } from 'react';
import Topbar from './Topbar';
import Footer from './Footer';

import doctor_slide from '../Imagenes/doctor_slide.jpeg';
import doctor_slide1 from '../Imagenes/doctor_slide1.jpeg';
import saludOcupacional from '../Imagenes/saludOcupacional.webp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

    const navigate = useNavigate();

    const handleCitaClick = () => {
        navigate('/citas');
    };


    const properties = {
        duration: 3000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true
    };

    return (
        <div className="scrollable-page">
            <Topbar />
            <div className="imagenes">
                <Slide {...properties}>
                    <div className="each-slide">
                        <img src={doctor_slide} alt="imagen 1"/>
                    </div>
                    <div className="each-slide">
                        <img src={doctor_slide1} alt="imagen 2"/>
                    </div>
                    <div className="each-slide">
                        <img src={saludOcupacional} alt="imagen 3"/>
                    </div>
                </Slide>
            </div>
            <div className="servicios" style={{ display: 'flex', justifyContent: 'center', fontSize: '50px', color: '#ffff' }}>
                NUESTROS <span style={{ color: '#223240', marginLeft: '10px' }}>SERVICIOS</span>
            </div>
            <div className="container">
                <div className="container1">
                    <div className="iconContainer">
                        <div style={{ position: 'relative', left: '70px', top: '80px' }}>
                            <FontAwesomeIcon icon={faStethoscope} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                        </div>
                    </div>
                    <h1 className="head1">Clinica</h1>
                    <div className="textoC">
                        Dedicada a brindar servicios de salud de alta calidad y atención médica integral
                    </div>
                </div>
                <div className="container1">
                    <div className="iconContainer">
                        <div style={{ position: 'relative', left: '85px', top: '70px' }}>
                            <FontAwesomeIcon icon={faUserDoctor} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                        </div>

                    </div>
                    <h1 className="head1">Salud ocupacional</h1>
                    <div className="textoS">
                        Contamos con una amplia experiencia en la prevención y el control de riesgos laborales, así como en el diseño y la ejecución de planes de promoción de la salud.
                    </div>
                </div>
                <div className="container1">
                    <div className="iconContainer" >
                        <div style={{ position: 'relative', left: '83px', top: '70px' }}>
                            <FontAwesomeIcon icon={faFlask} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                        </div>

                    </div>

                    <h1 className="head1">Laboratorio</h1>
                    <div className="textoL">
                        Respaldado por un equipo de profesionales altamente capacitados y comprometidos con la excelencia científica y la precisión diagnóstica.
                    </div>
                </div>
            </div>

            <div className="container2">
                <h1 className="ruta">Estamos ubicados en:</h1>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.2772379811036!2d-87.18158692600126!3d14.060799390066796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6fbd687c0d3b49%3A0xb5416f51d417978c!2sCl%C3%ADnica%20Dr.%20V%C3%ADctor%20Cruz%20Andino!5e0!3m2!1ses!2shn!4v1684216285312!5m2!1ses!2shn"
                    width="400"
                    height="300"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                    className='frame'
                ></iframe>
                <div className="linea">
                </div>

                <FontAwesomeIcon icon={faCalendarDays} style={{ position: 'relative', right: '140px', top: '85px', fontSize: '100px' }} />
                <h1 className="agendar" style={{ position: 'relative', left: '70px', top: '-50px' }}>Agenda una cita</h1>
                <button className="btnA" onClick={handleCitaClick} style={{ position: 'relative', top: '-60px' }}>Revisa nuestra disponibilidad</button>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
