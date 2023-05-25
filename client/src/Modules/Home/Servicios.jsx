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
