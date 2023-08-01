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
import text_Services from '../../Services/texto_cmdService';
import VisionService from '../../Services/VisionService';
import { useEffect, useRef, useState } from 'react';

import { v4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
} from "firebase/storage";
import { WindowSharp } from '@mui/icons-material';
import { text } from '@fortawesome/fontawesome-svg-core';

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
  const DESC_IMG = hospital;
  const DOCTOR_IMG = doctor;

  const [description, setDescription] = useState(null);
  const [biography, setBiography] = useState(null);
  const [teamDesc, setTeamDesc] = useState(null);

  const [descriptionOBJ, setDescriptionOBJ] = useState({
    Tipo: 'Descripción_Empresa', //SEPA COMO LO ACTUALIZAS Y NI ENTIENDO LO DE EDUARDO PERO VOS LO TOCAS
    texto_campo: '',
  });

  const [biographyOBJ, setBiographyOBJ] = useState({
    Tipo: 'Biografia_Autor', //SEPA COMO LO ACTUALIZAS Y NI ENTIENDO LO DE EDUARDO PERO VOS LO TOCAS
    texto_campo: '',
  });

  const [teamDescOBJ, setTeamDescOBJ] = useState({
    Tipo: 'Texto_Nuestro_Equipo', //SEPA COMO LO ACTUALIZAS Y NI ENTIENDO LO DE EDUARDO PERO VOS LO TOCAS
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
    text_Services.editText(descriptionOBJ)
    console.log(descriptionOBJ.texto_campo)
    setDescription(descriptionOBJ.texto_campo);
    window.location.reload(true);

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
    text_Services.editText(biographyOBJ)
    setBiography(biographyOBJ.texto_campo);
    window.location.reload(true);
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
    text_Services.editText(teamDescOBJ);
    setTeamDesc(teamDescOBJ.texto_campo);
    window.location.reload(true);
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



  const [imageUploadDesc, setImageUploadDesc] = useState(null);
  const [imagePreviewDesc, setImagePreviewDesc] = useState(null);
  const [imageUploadDoctor, setImageUploadDoctor] = useState(null);
  const [imagePreviewDoctor, setImagePreviewDoctor] = useState(null);

  const storage = getStorage();

  const handleCancelDescImg = () => {
    setImageUploadDesc(null);
    setImagePreviewDesc(null);
  };

  const handleCancelDoctorImg = () => {
    setImageUploadDoctor(null);
    setImagePreviewDoctor(null);
  };

  const deleteImg = (refUrl) => {
    const imageRef = ref(storage, refUrl)
    deleteObject(imageRef)
      .catch((error) => {
        console.log("Failed to delete image: ", error)
      })
  }

  async function uploadDescImg() {

    return new Promise((resolve, reject) => {
      if (imageUploadDesc == null) {
        return null;
      }

      const imageRef = ref(storage, `images/${imageUploadDesc.name + v4()}`);
      uploadBytes(imageRef, imageUploadDesc)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          resolve(url);
        })
        .catch((error) => reject(error));
    });
  };

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
    text_Services.editText(misionOBJ);
    window.location.reload(true);
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
    text_Services.editText(visionOBJ);
    window.location.reload(true);
  };
  const handleVisionEdit = () => {
    setIsEditingLabel2(true);
  };


  useEffect(() => {
    const fetchMision = async () => {
      try {
        const objectMision = ['Mision'];
        var misionData;
        console.log(misionData = await text_Services.getOneText(objectMision));
        console.log("Cargar Mision: " + misionData[0].texto_campo);
        setMision(misionData[0].texto_campo);
        misionOBJ.texto_campo = misionData[0].texto_campo;
        // console.log("Cargar Mision: "+misionData.texto_campo);
      } catch (error) {
        // Handle error if any
        console.log("Error fetching Mision:", error);
      }
    };
    const fetchVision = async () => {
      try {
        const objectVision = ['Vision'];

        const visionData = await text_Services.getOneText(objectVision);
        setVision(visionData[0].texto_campo);
        visionOBJ.texto_campo = visionData[0].texto_campo;
      } catch (error) {
        // Handle error if any
        console.log("Error fetching Vision:", error);
      }
    };

    //WALTER HACE LOS RESPECTIVOS FETCH AQUI
    const fetchDesc = async () => {
      try {
        const objectDesc = ['Descripción_Empresa'];
        const descData = await text_Services.getOneText(objectDesc);
        setDescription(descData[0].texto_campo);
        DESC = description;
        descriptionOBJ.texto_campo = DESC;
      } catch (error) {
        console.log("Error fetching Descripción de empresa:", error);
      }

    }

    const fetchBio = async () => {
      try {
        const objectBio = ['Biografia_Autor'];
        const descBio = await text_Services.getOneText(objectBio);
        setBiography(descBio[0].texto_campo);
        ABOUT_DOCTOR = biography;
        biographyOBJ.texto_campo = ABOUT_DOCTOR;
      } catch (error) {
        console.log("Error fetching Biography:", error);
      }


    }

    const fetchTeam = async () => {
      try {
        const objectTeam = ['Texto_Nuestro_Equipo'];
        const descTeam = await text_Services.getOneText(objectTeam);
        setTeamDesc(descTeam[0].texto_campo);
        TEAM = teamDesc;
        teamDescOBJ.texto_campo = TEAM;
      } catch (error) {
        console.log("Error fetching Team:", error);
      }
      
      
    }

    const fetchImgDesc = () => {
      setImagePreviewDesc(DESC_IMG);
    }

    const fetchImgDoctor = () => {
      setImagePreviewDoctor(DOCTOR_IMG);
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
    fetchImgDesc();
    fetchImgDoctor();
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
                    <button onClick={handleMisionSave} class="upload-button accept">
                      Guardar Cambios
                    </button>
                    <button onClick={() => handleCancel('mision')} class="upload-button cancel">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <p style={{ position: 'relative', color: 'white', marginRight: '30px', fontSize: '18px' }}>{mision}</p>
                  <button onClick={handleMisionEdit} class="upload-button">
                    Editar
                  </button>
                </div>
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
                    <button onClick={handleVisionSave} class="upload-button accept">
                      Guardar Cambios
                    </button>
                    <button onClick={() => handleCancel('vision')} class="upload-button cancel">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
                  <p style={{ position: 'relative', color: 'white', marginRight: '30px', fontSize: '18px' }}>{vision}</p>
                  <button onClick={handleVisionEdit} class="upload-button">
                    Editar
                  </button>
                </span>
              )}

            </span>
          </div>
        </div>

        <div className="company-description">
          <div className="image-container">
            <img src={imagePreviewDesc} alt="Imagen de la clínica" />
            <div class="upload-buttons">
              <label htmlFor="urlDescImg">Seleccionar imagen</label>
              <input
                type="file"
                onChange={(event) => {
                  setImageUploadDesc(event.target.files[0]);
                  setImagePreviewDesc(URL.createObjectURL(event.target.files[0]));
                }}
                accept="image/png, image/jpeg, image/webp"
                name='urlDescImg'
                id="urlDescImg"
                className="customFileInput"
              />
              <label class="delete" onClick={handleCancelDescImg}>Eliminar imagen</label>
            </div>
          </div>
          <div className="text-container">
            <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center' }}>Descripción de la Empresa</h2>
            {isEditingLabelDesc ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                <textarea
                  ref={inputRef}
                  name="description"
                  value={description}
                  style={{ display: 'flex', position: 'relative', marginRight: '30px', fontSize: '18px', height: 'fitContent', maxHeight: '250px' }}
                  onChange={handleDescChange}
                >
                </textarea>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                  <button onClick={handleDescSave} class="upload-button accept">
                    Guardar Cambios
                  </button>
                  <button onClick={() => handleCancel('desc')} class="upload-button cancel">
                    Cancelar
                  </button>
                </div>
              </div>
            ) :
              (
                <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
                  <p style={{ position: 'relative', color: 'white', fontSize: '18px' }}>
                    {description}
                  </p>
                  <button onClick={handleDescEdit} class="upload-button">
                    Editar
                  </button>
                </span>
              )
            }
          </div>
        </div>

        <div className="person-container">
          <div className="person-image">
            <img src={imagePreviewDoctor} alt="Dr. Víctor Cruz" />
            <div class="upload-buttons">
              <label htmlFor="urlDrImg">Seleccionar imagen</label>
              <input
                type="file"
                onChange={(event) => {
                  setImageUploadDoctor(event.target.files[0]);
                  setImagePreviewDoctor(URL.createObjectURL(event.target.files[0]));
                }}
                accept="image/png, image/jpeg, image/webp"
                name='urlDrImg'
                id="urlDrImg"
                className="customFileInput"
              />
              <label class="delete" onClick={handleCancelDoctorImg}>Eliminar imagen</label>
            </div>
          </div>
          <div className="text-container">
            <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center' }}> Dr. Victor Cruz</h2>
            {isEditingLabelBio ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                <textarea
                  ref={inputRef}
                  name="biography"
                  value={biography}
                  style={{ display: 'flex', position: 'relative', marginRight: '30px', fontSize: '18px', height: 'fitContent', maxHeight: '250px' }}
                  onChange={handleBioChange}
                >
                </textarea>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                  <button onClick={handleBioSave} class="upload-button accept">
                    Guardar Cambios
                  </button>
                  <button onClick={() => handleCancel('bio')} class="upload-button cancel">
                    Cancelar
                  </button>
                </div>
              </div>
            ) :
              (
                <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
                  <p style={{ color: 'white', fontSize: '18px', }}>
                    {biography}
                  </p>
                  <button onClick={handleBioEdit} class="upload-button">
                    Editar
                  </button>
                </span>
              )
            }
          </div>
        </div>

        <div className="employee-description">
          <FontAwesomeIcon icon={faPeopleGroup} style={{ color: 'rgb(255, 255, 255)', fontSize: '110px', position: 'relative', marginRight: '10px' }} />
          <div class="text-container">
            <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center' }}>Nuestro Equipo</h2>
            {isEditingLabelTeam ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                <textarea
                  ref={inputRef}
                  name="team"
                  value={teamDesc}
                  style={{ display: 'flex', position: 'relative', marginRight: '30px', fontSize: '18px', height: 'fitContent', maxHeight: '250px' }}
                  onChange={handleTeamChange}
                >
                </textarea>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                  <button onClick={handleTeamSave} class="upload-button accept">
                    Guardar Cambios
                  </button>
                  <button onClick={() => handleCancel('team')} class="upload-button cancel">
                    Cancelar
                  </button>
                </div>
              </div>
            ) :
              (
                <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
                  <p style={{ position: 'relative', color: 'white', fontSize: '18px', margin: '0px', left: '20px' }}>
                    {teamDesc}
                  </p>
                  <button onClick={handleTeamEdit} class="upload-button">
                    Editar
                  </button>
                </span>
              )
            }
          </div>

        </div>
      </div>

      <Footer />

    </div>

  );
};

export default Acercade;