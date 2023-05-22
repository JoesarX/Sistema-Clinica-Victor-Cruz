import React from 'react';
import '../HojaDeEstilos/Home.css';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';



const Home = () => {
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

    return (
        <div className="scrollable-page">
            <header className="header">
                <div className="buttons">
                    <button style={{ fontSize: '24px' }} onClick={handleReturnClick}>INICIO</button>
                    <button style={{ fontSize: '24px' }} onClick={handleLabClick}>LABORATORIO</button>
                    <button style={{ fontSize: '24px' }} onClick={handleIniciarClick}>INICIAR SESIÓN</button>
                </div>
            </header>
            <div className="imagenes">
                <Slide>
                    <div className="each-slide">
                        <img src="image1.jpg" />
                    </div>
                    <div className="each-slide">
                        <img src="image2.jpg" />
                    </div>
                    <div className="each-slide">
                        <img src="image3.jpg" />
                    </div>
                </Slide>
            </div>
            <div className="servicios" style={{ display: 'flex', justifyContent: 'center', fontSize: '50px', color: '#ffff' }}>
                NUESTROS <span style={{ color: '#223240', marginLeft: '10px' }}>SERVICIOS</span>
            </div>
            <div className="container">
                <div className="container1">
                    <div className="iconContainer">
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
                        {/* <FontAwesomeIcon icon="fa-solid fa-flask" /> */}
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
                <button // onClick={handleClick} 
                    className='botonA'
                >
                    ∧
                </button>
            </div>
            <footer className="footer">
                <p style={{ color: '#fff' }}>Col.Kennedy, Tegucigalpa</p>
                <p style={{ color: '#fff' }}>(504) 2228-3233</p>
                <button // onClick={handleClick} 
                    className='boton'
                >
                    Contactanos para responder tus dudas
                </button>
            </footer>
        </div>
    );
};

export default Home;
