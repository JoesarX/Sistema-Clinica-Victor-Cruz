import React from 'react';
import '../HojaDeEstilos/Servicios.css';
import Topbar from './Topbar';
import Footer from './Footer';

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
      description: 'Se enfoca en prevenir enfermedades y lesiones laborales, mejorar las condiciones de trabajo y promover el bienestar general de los empleados.'
    },
    {
      id: 2,
      imageSrc: 'https://static.emol.cl/emol50/Fotos/2020/03/24/file_20200324095443.jpg',
      title: 'Salubrista',
      description: ' profesional que se dedica a mejorar la salud de las personas a través de diversas acciones y colaboraciones interdisciplinarias. '
    },
    {
      id: 3,
      imageSrc: 'https://static.emisorasunidas.com/uploads/2020/09/dia-salubrista.jpg',
      title: 'Epidemiología',
      description: 'Estudio de los patrones, las causas y el control de las enfermedades en los grupos de personas.'
    },
    {
      id: 4,
      imageSrc: 'https://www.clinicapremium.com/wp-content/uploads/2022/09/medicina-general-en-clinica-premium-marbella.jpg',
      title: 'Atencion Primaria',
      description: ' Se centra en la prevención, el diagnóstico y el tratamiento de enfermedades comunes, así como en promover la salud general de las personas.'
          
    },
  ];


  return (
    <div className="scrollable-page">

      <Topbar/>

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

      <Footer/>

    </div>
  );
};

export default Servicios;