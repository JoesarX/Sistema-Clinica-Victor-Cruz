import React from 'react';
import '../HojaDeEstilos/Acercade.css';
import { useNavigate } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';
import doctor from '../Imagenes/doctor.jpg';
import hospital from '../Imagenes/hospital.jpeg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Acercade = () => {

  const navigate = useNavigate();
  const handleReturnClick = () => {
    navigate('/');
  };
  const handleIniciarClick = () => {
    navigate('/iniciarsesion');
  };
  /*const handleCitaClick = () => {
    navigate('/citas');
  };
  const handleLabClick = () => {
    navigate('/laboratorio');
  };*/

  const handleServicios = () => {
    navigate('/servicios');
  };

  const handleAcercade = () => {
    navigate('/acerca-de');
  };

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

  return (
    <div className="scrollable-page">
      <header className="headerT">
        <button className="bt" style={{ fontSize: '18px' }} onClick={handleReturnClick}>INICIO</button>
       {/* <button className="bt" style={{ fontSize: '18px' }} onClick={handleLabClick}>LABORATORIO</button>*/}
        <button className="bt" style={{ fontSize: '18px' }} onClick={handleIniciarClick} > <FontAwesomeIcon icon={faUser} /> INICIAR SESIÓN</button>
        <button className="bt1" style={{ fontSize: '18px' }} id="btp1" onMouseEnter={mostrarBotones1}
          onMouseLeave={ocultarBotones1}>ACERCA DE
          <div className="menu_desplegable" id='m1'>
            <div className="menu_item" id='mi1'>
              <button className='bt_menu' id='bt1' onClick={handleAcercade}>Nosotros</button>
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

      <div className="info header">
        SOBRE NOSOTROS
      </div>

      <div className="about-us-container">
        
        <div className="mission-vision-container">
          <div className="mission">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', fontSize: '40px'}}>
              <FontAwesomeIcon icon={faCircleDot} style={{ color: '#D3B938', fontSize: '50px' }}/>
            </div>
            <span>
            <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px'}}>Mission</h2>
            <p style={{ position: 'relative', color: 'white', marginRight: '30px', fontSize: '18px' }}>Nuestra misión en nuestra clínica médica y laboratorio de análisis clínicos es
              proporcionar atención médica de alta calidad a nuestros pacientes, con énfasis en
              la prevención, el diagnóstico y el tratamiento de enfermedades. Estamos dedicados
              a proporcionar atención médica individualizada, segura y eficiente mediante la
              utilización de tecnologías.</p>
            </span>
          </div>

          <div className="vision">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', fontSize: '40px' }}>
              <FontAwesomeIcon icon={faStar} style={{ color: '#D3B938', fontSize: '50px' }} />
            </div>
            <span>
              <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px'}}>Vision</h2>
              <p style={{ position: 'relative', color: 'white', marginRight: '30px', fontSize: '18px' }}>Ser conocido como la clínica médica y laboratorio de análisis clínicos que garantice
                su excelencia en el servicio al paciente, la precisión de sus diagnósticos y la
                atención personalizada de su personal de expertos altamente calificados.</p>
            </span>
          </div>
        </div>

        <div className="company-description">
          <div className="image-container">
            <img src={hospital} alt="hospital"/>
          </div>
          <div className="text-container">
            <span>
              <h2  style={{ position: 'relative', top: -30, color: '#8FC1B5', fontSize: '40px'}}>Descripcion de la Empresa</h2>
              <p style={{ position: 'relative', top: -25, color: 'white', marginRight: '30px', fontSize: '18px' }}>
              La clínica medica Dr. Victor Cruz fue fundada el 18 de febrero de 1990, 
              bajo el lema de brindar atención primaria a los pobladores de la colonia Kennedy y sus Alrededores, bajo la dirección del Dr. Victor Cruz. Posteriormente, se abrió el servicio de internado 
              vespertino y matutino para brindar un mejor servicio a la población en general.
                </p>
            </span>
          </div>
        </div>

        <div className="person-container">
          <div className="person-image">
            <img src={doctor} alt="doctor" />
          </div>
          <div className="person-description">
            <span>
              <h2 style={{ position: 'relative', top: -30, color: '#8FC1B5', fontSize: '40px', left: '400px', marginBottom: '30px'}}> Dr. Victor Cruz</h2>
              <p style={{ position: 'relative', top: -20, color: 'white', marginRight: '80px', fontSize: '18px',  left: '70px' }}>
              El Dr. Victor Cruz se graduó de medico general el 30 de octubre de 1987, en la universidad nacional autónoma de honduras y empezó a laborar como médico de atención primaria el 4 de enero de 1988. Posteriormente saco una maestría en salud Publica
              , luego saco otra maestría en Epidemiologia; a Continuación, saco una maestría en salud Ocupacional las cuales fueron cursadas en la universidad de León en Nicaragua. 
              También, saco una certificaron en la normas ISO-45001 sobre sistemas de gestión de salud y Seguridad de Trabajadores. 
              Además, obtuvo una certificación de auditor interno de dicha norma.
              </p>
            </span>
          </div>
        </div>

        <div className="employee-description">
          <FontAwesomeIcon icon={faPeopleGroup} style={{ color: 'rgb(255, 255, 255)', fontSize: '110px',  position: 'relative', top: 5,left:'-8px' }} />

          <span>
            <h2 style={{ position: 'relative', top: -30, color: '#8FC1B5', fontSize: '40px'}}>Nuestro Equipo</h2>
            <p style={{ position: 'relative', top: -25, color: 'white', marginRight: '30px', fontSize: '18px'}}>
            Contamos con un equipo de colaboradores con alta experiencia 
            en la rama de salud para brindar una atención de calidad a los pacientes que requieren de nuestros diferentes servicios, tanto en el área de atención primaria, como en la sección del laboratorio.
            </p>
          </span>
          
        </div>
      </div>

      <footer className="footer">
        <p style={{ color: '#fff' }}>  <FontAwesomeIcon icon={faLocationDot} /> Col.Kennedy, Tegucigalpa</p>
        <p style={{ color: '#fff' }}>  <FontAwesomeIcon icon={faPhone} /> (504) 2230-3901</p>
        <button className='botonCon' >
          Contactanos para responder tus dudas
        </button>
      </footer>

    </div>

  );
};

export default Acercade;