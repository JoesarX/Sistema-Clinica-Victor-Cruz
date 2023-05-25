import React from 'react';
import '../HojaDeEstilos/Servicios.css';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import { useState } from 'react';
import doctor_slide from '../Imagenes/doctor_slide.jpeg';

const Servicios = () => {

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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


  return (
    <div className="scrollable-page">
      <header className="headerT">
        <button className="bt" style={{ fontSize: '18px' }} onClick={handleReturnClick}>INICIO</button>
        <button className="bt" style={{ fontSize: '18px' }} onClick={handleLabClick}>LABORATORIO</button>
        <button className="bt" style={{ fontSize: '18px' }} onClick={handleIniciarClick}>INICIAR SESIÓN</button>
        <button className="bt1" style={{ fontSize: '18px' }} onClick={toggleDropdown}>ACERCA DE
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" onClick={handleAcercade}>Sobre nosotros</button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleAcercade}>Contactanos</button>
            </li>
          </ul>
        )}
        <button className="bt2" style={{ fontSize: '18px' }} onClick={toggleDropdown}>SERVICIOS</button>
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" onClick={handleServicios}>Servicios</button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleServicios}>Otros Servicios</button>
            </li>
          </ul>
        )}
      </header>

      <div class="services">
        <div class="service">
          <img src={doctor_slide}/>
          <div class="text">Servicio</div>
        </div>
        <div class="service">
          <img src={doctor_slide}/>
          <div class="text">Servicio</div>
        </div>
        <div class="service">
          <img src={doctor_slide}/>
          <div class="text">Servicio</div>
        </div>
        <div class="service">
          <img src={doctor_slide}/>
          <div class="text">Servicio</div>
        </div>
        <div class="service">
          <img src={doctor_slide}/>
          <div class="text">Servicio</div>
        </div>
        <div class="service">
          <img src={doctor_slide}/>
          <div class="text">Servicio</div>
        </div>
        <div class="service">
          <img src={doctor_slide}/>
          <div class="text">Servicio</div>
        </div>
        <div class="service">
          <img src={doctor_slide}/>
          <div class="text">Servicio</div>
        </div>
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

export default Servicios;
