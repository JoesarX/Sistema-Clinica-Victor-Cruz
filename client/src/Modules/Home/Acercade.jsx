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

  /// PARA WALTER

  //CONSTANTES POR MIENTRAS
  const DESC = 'La clínica medica Dr. Victor Cruz fue fundada el 18 de febrero de 1990, bajo el lema de brindar atención primaria a los pobladores de la colonia Kennedy y sus Alrededores, bajo la dirección del Dr. Victor Cruz. Posteriormente, se abrió el servicio de internado vespertino y matutino para brindar un mejor servicio a la población en general.';
  const ABOUT_DOCTOR = 'El Dr. Victor Cruz se graduó de medico general el 30 de octubre de 1987, en la universidad nacional autónoma de honduras y empezó a laborar como médico de atención primaria el 4 de enero de 1988. Posteriormente saco una maestría en salud Publica , luego saco otra maestría en Epidemiologia; a Continuación, saco una maestría en salud Ocupacional las cuales fueron cursadas en la universidad de León en Nicaragua. También, saco una certificaron en la normas ISO-45001 sobre sistemas de gestión de salud y Seguridad de Trabajadores. Además, obtuvo una certificación de auditor interno de dicha norma.'
  const TEAM = 'Contamos con un equipo de colaboradores con alta experiencia en la rama de salud para brindar una atención de calidad a los pacientes que requieren de nuestros diferentes servicios, tanto en el área de atención primaria, como en la sección del laboratorio.'

  const [description, setDescription] = useState(null);
  const [biography, setBiography] = useState(null);
  const [teamDesc, setTeamDesc] = useState(null);

  const [descriptionOBJ, setDescriptionOBJ] = useState({
    Tipo: 'Descripcion', //SEPA COMO LO ACTUALIZAS Y NI ENTIENDO LO DE EDUARDO PERO VOS LO TOCAS
    texto_campo: '',
  });

  const [biographyOBJ, setBiographyOBJ] = useState({
    Tipo: 'Biografía', //SEPA COMO LO ACTUALIZAS Y NI ENTIENDO LO DE EDUARDO PERO VOS LO TOCAS
    texto_campo: '',
  });

  const [teamDescOBJ, setTeamDescOBJ] = useState({
    Tipo: 'Equipo', //SEPA COMO LO ACTUALIZAS Y NI ENTIENDO LO DE EDUARDO PERO VOS LO TOCAS
    texto_campo: '',
  });

  const handleDescChange = (event) => {
    setDescription(event.target.value);
    descriptionOBJ.texto_campo = event.target.value;
  }

  const handleDescEdit = (event) => {
    setIsEditingLabelDesc(true);
  }

  const handleDescSave = (event) => {
    setIsEditingLabelDesc(false);
    console.log(descriptionOBJ.texto_campo)
    setDescription(descriptionOBJ.texto_campo);
  }

  const handleBioChange = (event) => {
    setBiography(event.target.value);
    biographyOBJ.texto_campo = event.target.value;
  }

  const handleBioEdit = (event) => {
    setIsEditingLabelBio(true);
  }

  const handleBioSave = (event) => {
    setIsEditingLabelBio(false);
    setBiography(descriptionOBJ.texto_campo);
  }

  const handleTeamChange = (event) => {
    setTeamDesc(event.target.value);
    teamDescOBJ.texto_campo = event.target.value;
  }

  const handleTeamEdit = (event) => {
    setIsEditingLabelTeam(true);
  }

  const handleTeamSave = (event) => {
    setIsEditingLabelTeam(false);
    setTeamDesc(teamDescOBJ.texto_campo);
  }

  const handleCancel = (edit) => {
    switch (edit) {
      case 'mision':
        setIsEditingLabel(false);
        break;
      case 'vision':
        setIsEditingLabel2(false);
        break;
      case 'desc':
        setIsEditingLabelDesc(false);
        break;
      case 'bio':
        setIsEditingLabelBio(false);
        break;
      case 'team':
        setIsEditingLabelTeam(false);
        break;
    }
  }

  /////

  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isEditingLabel2, setIsEditingLabel2] = useState(false);
  const [isEditingLabelDesc, setIsEditingLabelDesc] = useState(false);
  const [isEditingLabelBio, setIsEditingLabelBio] = useState(false);
  const [isEditingLabelTeam, setIsEditingLabelTeam] = useState(false);

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

    //WALTER HACE LOS RESPECTIVOS FETCH AQUI
    const fetchDesc = () => {
      setDescription(DESC);
      descriptionOBJ.texto_campo = DESC;
    }

    const fetchBio = () => {
      setBiography(ABOUT_DOCTOR);
      biographyOBJ.texto_campo = ABOUT_DOCTOR;
    }

    const fetchTeam = () => {
      setTeamDesc(TEAM);
      teamDescOBJ.texto_campo = TEAM;
    }

    ////

    if (isEditingLabel && inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${25 + inputRef.current.scrollHeight}px`;
    }
    if (isEditingLabel2 && inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${25 + inputRef.current.scrollHeight}px`;
    }
    if (isEditingLabelDesc && inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${25 + inputRef.current.scrollHeight}px`;
    }
    if (isEditingLabelBio && inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${25 + inputRef.current.scrollHeight}px`;
    }
    if (isEditingLabelTeam && inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${25 + inputRef.current.scrollHeight}px`;
    }
    fetchMision();
    fetchVision();
    fetchDesc();
    fetchBio();
    fetchTeam();
  }, [isEditingLabel, isEditingLabel2, isEditingLabelDesc, isEditingLabelBio, isEditingLabelTeam]);


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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <textarea
                    ref={inputRef}
                    name="mision"
                    value={mision}
                    style={{ display: 'flex', position: 'relative', marginRight: '30px', fontSize: '18px', maxHeight: '250px', wordWrap: 'breakWord' }}
                    onChange={handleMisionChange}
                  >
                  </textarea>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                    <button onClick={handleMisionSave} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                      Guardar Cambios
                    </button>
                    <button onClick={() => handleCancel('mision')} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <span style={{ display: 'flex', flexDirection: 'column' }}>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <textarea
                    ref={inputRef}
                    name="vision"
                    value={vision}
                    style={{ display: 'flex', position: 'relative', marginRight: '30px', fontSize: '18px', maxHeight: '250px' }}
                    onChange={handleVisionChange}
                  >
                  </textarea>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                    <button onClick={handleVisionSave} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                      Guardar Cambios
                    </button>
                    <button onClick={() => handleCancel('vision')} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <span style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
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
              {isEditingLabelDesc ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <textarea
                    ref={inputRef}
                    name="description"
                    value={description}
                    style={{ display: 'flex', position: 'relative', marginRight: '30px', fontSize: '18px', height: 'fitContent', maxHeight: '250px' }}
                    onChange={handleDescChange}
                  >
                  </textarea>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                    <button onClick={handleDescSave} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                      Guardar Cambios
                    </button>
                    <button onClick={() => handleCancel('desc')} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                      Cancelar
                    </button>
                  </div>
                </div>
              ) :
                (
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <p style={{ position: 'relative', color: 'white', fontSize: '18px', margin: '0px', left: '20px' }}>
                      {description}
                    </p>
                    <button onClick={handleDescEdit} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                      Editar
                    </button>
                  </span>
                )
              }
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
              {isEditingLabelBio ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <textarea
                    ref={inputRef}
                    name="biography"
                    value={biography}
                    style={{ display: 'flex', position: 'relative', marginRight: '30px', fontSize: '18px', height: 'fitContent', maxHeight: '250px', width: '85em' }}
                    onChange={handleBioChange}
                  >
                  </textarea>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                    <button onClick={handleBioSave} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold', justifySelf: 'flex-start' }}>
                      Guardar Cambios
                    </button>
                    <button onClick={() => handleCancel('bio')} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                      Cancelar
                    </button>
                  </div>
                </div>
              ) :
                (
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <p style={{ position: 'relative', color: 'white', fontSize: '18px', margin: '0px', left: '20px' }}>
                      {biography}
                    </p>
                    <button onClick={handleBioEdit} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold', justifySelf: 'flex-start' }}>
                      Editar
                    </button>
                  </span>
                )
              }
            </span>
          </div>
        </div>

        <div className="employee-description">
          <FontAwesomeIcon icon={faPeopleGroup} style={{ color: 'rgb(255, 255, 255)', fontSize: '110px', position: 'relative', marginRight: '10px' }} />
          <span>
            <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center' }}>Nuestro Equipo</h2>
            {isEditingLabelTeam ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <textarea
                  ref={inputRef}
                  name="team"
                  value={teamDesc}
                  style={{ display: 'flex', position: 'relative', marginRight: '30px', fontSize: '18px', height: 'fitContent', maxHeight: '250px', width: '90em' }}
                  onChange={handleTeamChange}
                >
                </textarea>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                  <button onClick={handleTeamSave} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold', justifySelf: 'flex-start' }}>
                    Guardar Cambios
                  </button>
                  <button onClick={() => handleCancel('team')} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) :
              (
                <span style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <p style={{ position: 'relative', color: 'white', fontSize: '18px', margin: '0px', left: '20px' }}>
                    {teamDesc}
                  </p>
                  <button onClick={handleTeamEdit} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold', justifySelf: 'flex-start' }}>
                    Editar
                  </button>
                </span>
              )
            }
          </span>

        </div>
      </div>

      <Footer />

    </div>

  );
};

export default Acercade;