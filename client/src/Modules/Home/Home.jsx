import React, { useEffect } from 'react';
import '../HojaDeEstilos/Home.css';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import Topbar from './Topbar';
import Footer from './Footer';

import doctor_slide from '../Imagenes/doctor_slide.jpeg';
import doctor_slide1 from '../Imagenes/doctor_slide1.jpeg';
import saludOcupacional from '../Imagenes/saludOcupacional.webp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';


import axios from 'axios'; // Import axios library



const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Make the initial request on component mount
        wakeUpServer();

        // Set up interval to make periodic requests
        const interval = setInterval(() => {
            wakeUpServer();
        }, 300000); // Every 5 minutes (adjust as needed)

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const wakeUpServer = () => {
        // Make a GET request to wake up the server
        axios.get('https://clinicavictorcruzserver.azurewebsites.net')
            .catch(error => {
                // Handle any errors if necessary
                console.error('Error waking up server:', error);
            });
        console.log('Server is awake!');
    };

    const handleCitaClick = () => {
        navigate('/citas');
    };

    const handleServicesClick = () => {
        navigate('/servicios');
    };

    const handleAboutUsClick = () => {
        navigate('acerca-de');
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
                        <img src={doctor_slide} alt="imagen 1" />
                    </div>
                    <div className="each-slide">
                        <img src={doctor_slide1} alt="imagen 2" />
                    </div>
                    <div className="each-slide">
                        <img src={saludOcupacional} alt="imagen 3" />
                    </div>
                </Slide>
            </div>
            <div className="content-header-banner">
                NUESTROS <span style={{ color: '#223240', marginLeft: '10px' }}>SERVICIOS</span>
            </div>
            <div className="services-container">
                <div className="service-container">
                    <div className="service-icon-container">
                        <FontAwesomeIcon icon={faStethoscope} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                    </div>
                    <div className="service-text-elements">
                        <h1 className="service-header">Clínica</h1>
                        <div className="service-text">
                            Dedicada a brindar servicios de salud de alta calidad y atención médica integral.
                        </div>
                    </div>
                </div>
                <div className="service-container">
                    <div className="service-icon-container">
                        <FontAwesomeIcon icon={faUserDoctor} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                    </div>
                    <div className="service-text-elements">
                        <h1 className="service-header">Salud Ocupacional</h1>
                        <div className="service-text">
                            Contamos con una amplia experiencia en la prevención y el control de riesgos laborales, así como en el diseño y la ejecución de planes de promoción de la salud.
                        </div>
                    </div>
                </div>
                <div className="service-container">
                    <div className="service-icon-container">
                        <FontAwesomeIcon icon={faFlask} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                    </div>
                    <div className="service-text-elements">
                        <h1 className="service-header">Laboratorio</h1>
                        <div className="service-text">
                            Respaldado por un equipo de profesionales altamente capacitados y comprometidos con la excelencia científica y la precisión diagnóstica.
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-container">
                <button class="see-more-button services" onClick={handleServicesClick}>Ver más...</button>
            </div>
            <div className="content-header-banner">
                SOBRE <span style={{ color: '#223240', marginLeft: '10px' }}>NOSOTROS</span>
            </div>
            <div className="home-about-us-container">
                <div className='about-us-content'>
                    <div className='content-header align-left'>Misión</div>
                    <div className='about-us-text'>
                        Nuestra misión en nuestra clínica médica y laboratorio de análisis clínicos es proporcionar atención médica de alta calidad a nuestros pacientes, con énfasis en la prevención, el diagnóstico y el tratamiento de enfermedades.
                        <br /><br />Estamos dedicados a proporcionar atención médica individualizada, segura y eficiente mediante la utilización de tecnologías.
                    </div>
                    <button class="see-more-button about-us" onClick={handleAboutUsClick}>Más Información</button>
                </div>
                <div className='about-us-content'>
                    <div className="content-header align-left small-text">Estamos ubicados en:</div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.2772379811036!2d-87.18158692600126!3d14.060799390066796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6fbd687c0d3b49%3A0xb5416f51d417978c!2sCl%C3%ADnica%20Dr.%20V%C3%ADctor%20Cruz%20Andino!5e0!3m2!1ses!2shn!4v1684216285312!5m2!1ses!2shn"
                        allowFullScreen=""
                        loading="lazy"
                        className='google-map-frame'
                    >
                    </iframe>
                </div>
            </div>
            <div className="smooth-line" />
            <div className="home-schedule-container">
                <FontAwesomeIcon icon={faCalendarDays} className="content-header white-text schedule-calendar-icon" />
                <div className="text-wrapper">
                    <div className="content-header white-text smaller-text">Recuerda ver los horarios disponibles para poder agendar tu cita.</div>
                </div>
                <button className="see-more-button schedule-appointment" onClick={handleCitaClick}>Agenda ya!</button>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
