import React from 'react';
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
            <div className="content-header">
                NUESTROS <span style={{ color: '#223240', marginLeft: '10px' }}>SERVICIOS</span>
            </div>
            <div className="services-container">
                <div className="service-container">
                    <div className="iconContainer">
                        <FontAwesomeIcon icon={faStethoscope} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                    </div>
                    <h1 className="service-header">Clínica</h1>
                    <div className="service-text">
                        Dedicada a brindar servicios de salud de alta calidad y atención médica integral.
                    </div>
                </div>
                <div className="service-container">
                    <div className="iconContainer">
                        <FontAwesomeIcon icon={faUserDoctor} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                    </div>
                    <h1 className="service-header">Salud Ocupacional</h1>
                    <div className="service-text">
                        Contamos con una amplia experiencia en la prevención y el control de riesgos laborales, así como en el diseño y la ejecución de planes de promoción de la salud.
                    </div>
                </div>
                <div className="service-container">
                    <div className="iconContainer">
                        <FontAwesomeIcon icon={faFlask} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                    </div>
                    <h1 className="service-header">Laboratorio</h1>
                    <div className="service-text">
                        Respaldado por un equipo de profesionales altamente capacitados y comprometidos con la excelencia científica y la precisión diagnóstica.
                    </div>
                </div>
            </div>
            <div class="button-container">
                <button class="see-more-services-button">Ver más...</button>
            </div>

            <div className="container2">
                <h1 className="ruta">Estamos ubicados en:</h1>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.2772379811036!2d-87.18158692600126!3d14.060799390066796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6fbd687c0d3b49%3A0xb5416f51d417978c!2sCl%C3%ADnica%20Dr.%20V%C3%ADctor%20Cruz%20Andino!5e0!3m2!1ses!2shn!4v1684216285312!5m2!1ses!2shn"
                    allowFullScreen=""
                    loading="lazy"
                    className='google-map-frame'
                ></iframe>
                <div className="linea">
                </div>

                <FontAwesomeIcon icon={faCalendarDays} style={{ position: 'relative', right: '140px', top: '85px', fontSize: '110px' }} />
                <h1 className="agendar" style={{ position: 'relative', left: '70px', top: '-30px' }}>Agenda una cita</h1>
                <button className="btnA" onClick={handleCitaClick} style={{ position: 'relative', top: '-75px' }}>Revisa nuestra disponibilidad</button>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
