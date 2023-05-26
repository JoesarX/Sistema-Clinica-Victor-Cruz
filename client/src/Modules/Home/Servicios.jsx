import React from 'react';
import '../HojaDeEstilos/Servicios.css';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import { useState } from 'react';
import doctor_slide from '../Imagenes/doctor_slide.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Servicios = () => {

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

  function toggleText(serviceID) {
    const service = document.getElementById(`service-${serviceID}`);
    const additionalText = service.querySelector('.additional-text');

    let isTextVisible = additionalText.classList.contains('show');

    if (isTextVisible) {
      additionalText.classList.remove('show');
    } else {
      additionalText.classList.add('show');
    }
  }



  const serviceData = [
    {
      id: 1,
      imageSrc: 'https://www.medigreen.com.ec/wp-content/uploads/2021/08/95368dbecc661caf7efebdb9c43364817e936d45.jpg',
      title: 'Salud Ocupacional',
      description: 'Vigilancia de las condiciones y medio ambiente de trabajo. Asesoramiento, capacitación, información y difusión en materia de salud y seguridad en el trabajo.'
    },
    {
      id: 2,
      imageSrc: 'https://static.emol.cl/emol50/Fotos/2020/03/24/file_20200324095443.jpg',
      title: 'Salubrista',
      description: 'Profesional que se dedica a mejorar la salud de la población, por medio de la sinergia de diferentes disciplinas y actores'
    },
    {
      id: 3,
      imageSrc: 'https://static.emisorasunidas.com/uploads/2020/09/dia-salubrista.jpg',
      title: 'Epidemiología',
      description: 'Estudio de los patrones, las causas y el control de las enfermedades en los grupos de personas.'
    },
    {
      id: 4,
      imageSrc: 'https://centromedicoabc.com/wp-content/uploads/2022/08/medicina-interna.jpg',
      title: 'Medicina Interna',
      description: 'Rama de la medicina que se especializa en la prevención, el diagnóstico y el tratamiento de enfermedades en adultos, sin utilizar cirugías.'
    },
    {
      id: 5,
      imageSrc: 'https://www.clinicapremium.com/wp-content/uploads/2022/09/medicina-general-en-clinica-premium-marbella.jpg',
      title: 'Medicina General',
      description: 'La medicina general constituye el primer nivel de atención médica y es imprescindible para la prevención, detección,' +
                    ' tratamiento y seguimiento de las enfermedades crónicas estabilizadas, responsabilizándose del paciente en su conjunto.'
    },
  ];


  return (
    <div className="scrollable-page">
      <header className="headerT">
        <button className="bt" style={{ fontSize: '18px' }} onClick={handleReturnClick}>INICIO</button>
        <button className="bt" style={{ fontSize: '18px' }} onClick={handleLabClick}>LABORATORIO</button>
        <button className="bt" style={{ fontSize: '18px' }} onClick={handleIniciarClick}> <FontAwesomeIcon icon={faUser} /> INICIAR SESIÓN</button>
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
        NUESTROS SERVICIOS
      </div>

      <div className="info">
        Los servicios que la clínica Víctor Cruz tiene a disposición para los clientes son varios, incluyendo:
      </div>

      <div className='services'>
        {serviceData.map((service) => (
          <div
            id={`service-${service.id}`}
            key={service.id}
            className="service background-img"
            onClick={() => toggleText(service.id)}
            style={{
              backgroundImage: `url(${service.imageSrc})`,
              backgroundSize: 'cover',
            }}
          >
            <div className="text">{service.title}</div>
            <div className="additional-text">{service.description}</div>
          </div>
        ))}
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
    </div >
  );
};

export default Servicios;
