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
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import MisionService from '../../Services/MisionService';
import VisionService from '../../Services/VisionService';
import { useEffect, useRef, useState } from 'react';


const Acercade = () => {
  const [mision, setMision] = useState(null);
  const [vision, setVision] = useState(null);

  const [misionOBJ, setMisionOBJ] = React.useState({
    Tipo: 'Mision',
    texto_campo: ''
  })

  const [visionOBJ, setVisionOBJ] = React.useState({
    Tipo: 'Vision',
    texto_campo: '',
  })

  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isEditingLabel2, setIsEditingLabel2] = useState(false);

  const inputRef = useRef(null);

  const handleMisionChange = (event) => {
    setMision(event.target.value);
    misionOBJ.texto_campo = event.target.value;
    console.log(mision)
  };

  const handleMisionSave = (event) => {

    setIsEditingLabel(false);

    MisionService.editMision(misionOBJ);
  };

  const handleMisionEdit = () => {
    setIsEditingLabel(true);
  };



  const handleVisionChange = (event) => {
    setVision(event.target.value);
    visionOBJ.texto_campo = event.target.value;
    console.log(vision)
  };

  const handleVisionSave = (event) => {

    setIsEditingLabel2(false);
    console.log(visionOBJ)
    VisionService.editVision(visionOBJ);
  };
  const handleVisionEdit = () => {
    setIsEditingLabel2(true);
  };


  useEffect(() => {
    const fetchMision = async () => {


      try {
        const misionData = await MisionService.getMision();
        setMision(misionData.texto_campo);
        misionOBJ.texto_campo = misionData.texto_campo;
      } catch (error) {
        // Handle error if any
        console.log("Error fetching expedientes:", error);
      }
    };
    const fetchVision = async () => {


      try {
        const visionData = await VisionService.getVision();
        setVision(visionData.texto_campo);
        visionOBJ.texto_campo = visionData.texto_campo;
      } catch (error) {
        // Handle error if any
        console.log("Error fetching expedientes:", error);
      }
    };
    if (isEditingLabel && inputRef.current) {
      // Adjust the height of the input box to match its content
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
    if (isEditingLabel2 && inputRef.current) {
      // Adjust the height of the input box to match its content
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
    fetchMision();
    fetchVision();
  }, [isEditingLabel,isEditingLabel2]);


  return (
    <div className="scrollable-page">
      <Topbar />
      <div className="info header">
        SOBRE NOSOTROS
      </div>

      <div className="about-us-container">

        <div className="mission-vision-container">
          <div className="mission">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', fontSize: '40px' }}>
              <FontAwesomeIcon icon={faCircleDot} style={{ color: '#D3B938', fontSize: '50px' }} />
            </div>
            <span >
              <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px' }}>Misión</h2>
              {isEditingLabel ? (
                <div className='mission'>
                  <textarea
                    ref={inputRef}
                    name="mision"
                    value={mision}
                    style={{ display: 'flex', position: 'relative', marginRight: '30px', fontSize: '18px' }}
                    onChange={handleMisionChange}
                  >
                  </textarea>
                  <button onClick={handleMisionSave} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                    Guardar Cambios
                  </button>
                </div>
              ) : (
                <span>
                  <p style={{ position: 'relative', color: 'white', marginRight: '30px', fontSize: '18px' }}>{mision}</p>
                  <button onClick={handleMisionEdit} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                    Editar
                  </button>
                </span>
              )}
            </span>

          </div>

          <div className="vision">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', fontSize: '40px' }}>
              <FontAwesomeIcon icon={faStar} style={{ color: '#D3B938', fontSize: '50px' }} />
            </div>
            <span>
              <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px' }}>Visión</h2>

              {isEditingLabel2 ? (
                <div className='vision'>
                  <textarea
                    ref={inputRef}
                    name="vision"
                    value={vision}
                    style={{ display: 'flex', position: 'relative', marginRight: '30px', fontSize: '18px' }}
                    onChange={handleVisionChange}
                  >
                  </textarea>
                  <button onClick={handleVisionSave} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                    Guardar Cambios
                  </button>
                </div>
              ) : (
                <span>
                  <p style={{ position: 'relative', color: 'white', marginRight: '30px', fontSize: '18px' }}>{vision}</p>
                  <button onClick={handleVisionEdit} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                    Editar
                  </button>
                </span>
              )}
              
            </span>
          </div>
        </div>

        <div className="company-description">
          <div className="image-container">
            <img src={hospital} alt="hospital" />
          </div>
          <div className="text-container">
            <span>
              <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center' }}>Descripcion de la Empresa</h2>
              <p style={{ position: 'relative', color: 'white', fontSize: '18px', margin: '0px', left: '20px' }}>
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
              <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center' }}> Dr. Victor Cruz</h2>
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
          <FontAwesomeIcon icon={faPeopleGroup} style={{ color: 'rgb(255, 255, 255)', fontSize: '110px', position: 'relative', top: 5, left: '-8px' }} />

          <span>
            <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center' }}>Nuestro Equipo</h2>
            <p style={{ position: 'relative', color: 'white', fontSize: '18px', margin: '0px', left: '20px' }}>
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