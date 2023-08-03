import '../HojaDeEstilos/Servicios.css';
import Topbar from './Topbar';
import Footer from './Footer';
import React, { useState } from 'react';

const Servicios = () => {

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
      description: 'Se enfoca en prevenir enfermedades y lesiones laborales, mejorar las condiciones de trabajo y promover el bienestar general de los empleados.',
      hooverComponent: '1'
    },
    {
      id: 2,
      imageSrc: 'https://static.emol.cl/emol50/Fotos/2020/03/24/file_20200324095443.jpg',
      title: 'Salubrista',
      description: ' profesional que se dedica a mejorar la salud de las personas a través de diversas acciones y colaboraciones interdisciplinarias. ',
      hooverComponent: '2'
    },
    {
      id: 3,
      imageSrc: 'https://static.emisorasunidas.com/uploads/2020/09/dia-salubrista.jpg',
      title: 'Epidemiología',
      description: 'Estudio de los patrones, las causas y el control de las enfermedades en los grupos de personas.',
      hooverComponent: '3'
    },
    {
      id: 4,
      imageSrc: 'https://www.clinicapremium.com/wp-content/uploads/2022/09/medicina-general-en-clinica-premium-marbella.jpg',
      title: 'Atencion Primaria',
      description: ' Se centra en la prevención, el diagnóstico y el tratamiento de enfermedades comunes, así como en promover la salud general de las personas.',
      hooverComponent: '4'
    },
  ];

  const ServiceComponent = ({ service }) => {
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);
    const [isTitleVisible, setTitleVisible] = useState(false);

    const handleMouseEnter = () => {
      setDescriptionVisible(true);
      
    };

    const handleMouseLeave = () => {
      setDescriptionVisible(false);
      

    };

    return (
    
      <div
        className='services'
        id={service.hooverComponent}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={service.imageSrc} alt={service.title} />
        <div className="overlay">
          <h2>{service.title}</h2>
          {isDescriptionVisible && <p>{service.description}</p>}
        </div>

      </div>
      
    );
  };




  return (
    <div className='scrollable-page'>
      <Topbar />

      <div className='header'>
        NUESTROS SERVICIOS
      </div>

      <div className='info'>
        Los servicios que la clínica Víctor Cruz tiene a disposición para los clientes son varios, incluyendo:
      </div>


      <div>
        {serviceData.map((service) => (
          <ServiceComponent key={service.id} service={service} />
        ))}
      </div>




      <Footer />
    </div>
  );
};

export default Servicios;