import React from 'react';
import '../HojaDeEstilos/Acercade.css';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import doctor from '../Imagenes/doctor.jpg';
import hospital from '../Imagenes/hospital.jpeg';
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
            <img src={hospital} />
          </div>
          <div className="text-container">
            <span>
              <h2  style={{ position: 'relative', top: -30, color: '#8FC1B5', fontSize: '40px'}}>Company Description</h2>
              <p style={{ position: 'relative', top: -25, color: 'white', marginRight: '30px', fontSize: '18px' }}>Our company is a leading provider of cutting-edge technology solutions. We specialize in developing software applications and providing consulting services to clients across various industries. With a focus on delivering exceptional value and driving digital transformation, we help businesses achieve their goals and stay ahead in today's competitive market.</p>
            </span>
          </div>
        </div>

        <div className="person-container">
          <div className="person-image">
            <img src={doctor} />
          </div>
          <div className="person-description">
            <span>
              <h2 style={{ position: 'relative', top: -30, color: '#8FC1B5', fontSize: '40px', left: '300px'}}> Dr. Victor Cruz</h2>
              <p style={{ position: 'relative', top: -25, color: 'white', marginRight: '30px', fontSize: '18px' }}>John Doe is the founder and CEO of our company. With over 20 years of experience in the technology sector, he has led our organization to numerous successes. John is passionate about driving innovation and creating a positive impact through technology.</p>
            </span>
          </div>
        </div>

        <div className="employee-description">
          <FontAwesomeIcon icon={faPeopleGroup} style={{ color: 'rgb(255, 255, 255)', fontSize: '110px',  position: 'relative', top: 5,left:'-8px' }} />

          <span>
            <h2 style={{ position: 'relative', top: -30, color: '#8FC1B5', fontSize: '40px'}}>Our Team</h2>
            <p style={{ position: 'relative', top: -25, color: 'white', marginRight: '30px', fontSize: '18px'}}>We have a team of dedicated professionals who are experts in their respective fields. From software engineers to designers and project managers, our team works collaboratively to deliver outstanding results for our clients. With a shared commitment to excellence, we constantly strive to exceed expectations and push the boundaries of what's possible.</p>
          </span>
          
        </div>
      </div>

      <Footer />

    </div>

  );
};

export default Acercade;