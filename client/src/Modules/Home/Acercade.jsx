import React from 'react';
import '../HojaDeEstilos/Acercade.css';
import { useNavigate } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';
import hospital from '../Imagenes/hospital.jpeg';
import doctor from '../Imagenes/victor_cruz.jpeg';
import Topbar from './Topbar';
import Footer from './Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Acercade = () => {

  return (
    <div className="scrollable-page">
      <Topbar/>
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
            <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px'}}>Misión</h2>
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
              <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px'}}>Visión</h2>
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
              <h2  style={{  position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center'}}>Descripcion de la Empresa</h2>
              <p style={{ position: 'relative', color: 'white', fontSize: '18px', margin: '0px', left: '20px'}}>
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
              <h2 style={{  position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center'}}> Dr. Victor Cruz</h2>
              <p style={{ position: 'relative', color: 'white', fontSize: '18px', margin: '0px', left: '20px' }}>
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
            <h2 style={{  position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center'}}>Nuestro Equipo</h2>
            <p style={{ position: 'relative', color: 'white', fontSize: '18px', margin: '0px', left: '20px'}}>
            Contamos con un equipo de colaboradores con alta experiencia 
            en la rama de salud para brindar una atención de calidad a los pacientes que requieren de nuestros diferentes servicios, tanto en el área de atención primaria, como en la sección del laboratorio.
            </p>
          </span>
          
        </div>
      </div>

      <Footer />

    </div>

  );
};

export default Acercade;