import React from 'react';
import '../HojaDeEstilos/Home.css';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ReactDOM from 'react-dom';
import { useState } from 'react';

import doctor_slide from '../Imagenes/doctor_slide.jpeg';
import doctor_slide1 from '../Imagenes/doctor_slide1.jpeg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const Home = () => {

    function mostrarBotones1() {
        var boton1 = document.getElementById('bt1');
        var boton2 = document.getElementById('bt2');
        var div1 = document.getElementById('m1');
        var div2 = document.getElementById('mi1');
        div1.style.display = 'block';
        div2.style.display = 'block';
        boton1.style.visibility = 'visible';
        boton1.style.top = '30px';
        boton2.style.visibility = 'visible';
        boton2.style.top = '60px';
    }

    function ocultarBotones1() {
        var boton1 = document.getElementById('bt1');
        var boton2 = document.getElementById('bt2');
        var div2 = document.getElementById('mi1');
        div2.style.display = 'none';
        boton1.style.visibility = 'hidden';
        boton2.style.visibility = 'hidden';
    }

    function mostrarBotones2() {
        var boton1 = document.getElementById('bt3');
        var boton2 = document.getElementById('bt4');
        var div1 = document.getElementById('m2');
        var div2 = document.getElementById('mi2');
        div1.style.display = 'block';
        div2.style.display = 'block';
        boton1.style.visibility = 'visible';
        boton1.style.top = '30px';
        boton2.style.visibility = 'visible';
        boton2.style.top = '60px';
    }

    function ocultarBotones2() {
        var boton1 = document.getElementById('bt3');
        var boton2 = document.getElementById('bt4');
        var div2 = document.getElementById('mi2');
        div2.style.display = 'none';
        boton1.style.visibility = 'hidden';
        boton2.style.visibility = 'hidden';
    }

    window.onload = function () {
        ocultarBotones1();
        ocultarBotones2();
        var botonPrincipal = document.getElementById('btp1');
        var botonPrincipal2 = document.getElementById('btp2');
        botonPrincipal.addEventListener('mouseenter', mostrarBotones1);
        botonPrincipal.addEventListener('mouseleave', ocultarBotones1);
        botonPrincipal2.addEventListener('mouseenter', mostrarBotones2);
        botonPrincipal2.addEventListener('mouseleave', ocultarBotones2);
    };


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const handleReturnClick = () => {
        navigate('/');
    };
    const handleIniciarClick = () => {
        navigate('/iniciarsesion');
    };
    const handleCitaClick = () => {
        navigate('/citas');
    };
    const handleLabClick = () => {
        navigate('/laboratorio');
    };


    const handleServicios = () => {
        navigate('/servicios');
    };

    const handleAcercade = () => {
        navigate('/acerca-de');
    };



    const properties = {
        duration: 3000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true
    };




    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="scrollable-page">
            <header className="headerT">
                <button className="bt" style={{ fontSize: '18px' }} onClick={handleReturnClick}>INICIO</button>
                <button className="bt" style={{ fontSize: '18px' }} onClick={handleLabClick}>LABORATORIO</button>
                <button className="bt" style={{ fontSize: '18px' }} onClick={handleIniciarClick}>INICIAR SESIÓN</button>
                <button className="bt1" style={{ fontSize: '18px' }} id="btp1" onMouseEnter={mostrarBotones1}
                    onMouseLeave={ocultarBotones1}>ACERCA DE
                    <div className="menu_desplegable" id='m1'>
                        <div className="menu_item" id='mi1'>
                            <button className='bt_menu' id='bt1' onClick={handleAcercade}>Sobre Nosotros</button>
                            <button className='bt_menu' id='bt2' onClick={handleAcercade}>Contáctanos</button>
                        </div>
                    </div>
                </button>
                <button className="bt2" style={{ fontSize: '18px' }} id="btp2" onMouseEnter={mostrarBotones2}
                    onMouseLeave={ocultarBotones2}>SERVICIOS
                    <div className="menu_desplegable" id='m2'>
                        <div className="menu_item" id='mi2'>
                            <button className='bt_menu' id='bt3' onClick={handleServicios}>Servicios</button>
                            <button className='bt_menu' id='bt4' onClick={handleServicios}>Otros Servicios</button>
                        </div>
                    </div>
                </button>
            </header>
            <div className="imagenes">
                <Slide {...properties}>
                    <div className="each-slide">
                        <img src={doctor_slide} />
                    </div>
                    <div className="each-slide">
                        <img src={doctor_slide1} />
                    </div>
                    <div className="each-slide">
                        <img src={doctor_slide1} />
                    </div>
                </Slide>
            </div>
            <div className="servicios" style={{ display: 'flex', justifyContent: 'center', fontSize: '50px', color: '#ffff' }}>
                NUESTROS <span style={{ color: '#223240', marginLeft: '10px' }}>SERVICIOS</span>
            </div>
            <div className="container">
                <div className="container1">
                    <div className="iconContainer">
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <h1 className="head1">Clinica</h1>
                    <div className="textoC">
                        Dedicada a brindar servicios de salud de alta calidad y atención médica integral
                    </div>
                </div>
                <div className="container1">
                    <div className="iconContainer">
                    </div>
                    <h1 className="head1">Salud ocupacional</h1>
                    <div className="textoS">
                        Contamos con una amplia experiencia en la prevención y el control de riesgos laborales, así como en el diseño y la ejecución de planes de promoción de la salud.
                    </div>
                </div>
                <div className="container1">
                    <div className="iconContainer">
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
                <h1 className="agendar">Agenda una cita</h1>
                <button className="btnA" onClick={handleCitaClick}>Revisa nuestra disponibilidad</button>
                <button className='botonA'>
                    ∧
                </button>
            </div>
            <footer className="footer">
                <p style={{ color: '#fff' }}>Col.Kennedy, Tegucigalpa</p>
                <p style={{ color: '#fff' }}>(504) 2228-3233</p>
                <button // onClick={handleClick} 
                    className='botonCon'
                >
                    Contactanos para responder tus dudas
                </button>
            </footer>
        </div>
    );
};

export default Home;
