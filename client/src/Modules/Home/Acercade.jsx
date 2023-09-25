import React from 'react';
import '../HojaDeEstilos/Acercade.css';
import 'react-slideshow-image/dist/styles.css';
import Topbar from './Topbar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faGear } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

import text_Services from '../../Services/texto_cmdService';
import { useEffect, useRef, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

import 'firebase/compat/storage';
import { v4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
} from "firebase/storage";
import swal from 'sweetalert';

import AboutUsService from '../../Services/AboutUsService';

const Acercade = () => {

  //CONSTANTES POR MIENTRAS
  // const DESC = 'La clínica medica Dr. Victor Cruz fue fundada el 18 de febrero de 1990, bajo el lema de brindar atención primaria a los pobladores de la colonia Kennedy y sus Alrededores, bajo la dirección del Dr. Victor Cruz. Posteriormente, se abrió el servicio de internado vespertino y matutino para brindar un mejor servicio a la población en general.';
  // const ABOUT_DOCTOR = 'El Dr. Victor Cruz se graduó de medico general el 30 de octubre de 1987, en la universidad nacional autónoma de honduras y empezó a laborar como médico de atención primaria el 4 de enero de 1988. Posteriormente saco una maestría en salud Publica , luego saco otra maestría en Epidemiologia; a Continuación, saco una maestría en salud Ocupacional las cuales fueron cursadas en la universidad de León en Nicaragua. También, saco una certificaron en la normas ISO-45001 sobre sistemas de gestión de salud y Seguridad de Trabajadores. Además, obtuvo una certificación de auditor interno de dicha norma.'
  // const TEAM = 'Contamos con un equipo de colaboradores con alta experiencia en la rama de salud para brindar una atención de calidad a los pacientes que requieren de nuestros diferentes servicios, tanto en el área de atención primaria, como en la sección del laboratorio.'
  //const DESC_IMG = hospital;
  //const DOCTOR_IMG = doctor;

  const [isEditingPage, setIsEditingPage] = useState(false);

  const handleEditPage = () => {
    if (isEditingLabelBio || isEditingLabelDesc || isEditingLabelMision || isEditingLabelTeam || isEditingLabelVision) {
      swal({
        title: "Cambios sin guardar",
        text: "¡Tiene cambios sin guardar!",
        icon: "warning"
      });
    }
    else {
      setIsEditingPage(!isEditingPage);
    }
  }

  const [description, setDescription] = useState(null);
  const [biography, setBiography] = useState(null);
  const [teamDesc, setTeamDesc] = useState(null);
  const [mision, setMision] = useState(null);
  const [vision, setVision] = useState(null);

  const { userType, isLoggedIn } = useContext(AuthContext);

  const maxDescriptionCharacters = 512;
  const maxDescriptionCharacters2 = 1024;

  let ImgsData = [];
  let ImgsDataDoc = [];
  let ImgsDataDesc = [];

  const [images2, setImages2] = useState({
    idfoto: '',
    tipo: 'AboutUs',
    size: null,
    visibility: null,
    url: '',
    created_at: '',
    updated_at: ''
  });

  let [images, setImages] = React.useState({
    idfoto: '',
    tipo: 'AboutUs',
    size: null,
    visibility: null,
    url: '',
    created_at: '',
    updated_at: ''
  })

  const [misionOBJ] = React.useState({
    Tipo: 'Mision',
    texto_campo: ''
  })

  const [visionOBJ] = React.useState({
    Tipo: 'Vision',
    texto_campo: '',
  })

  const [descriptionOBJ] = useState({
    Tipo: 'Descripción_Empresa',
    texto_campo: '',
  });

  const [biographyOBJ] = useState({
    Tipo: 'Biografia_Autor',
    texto_campo: '',
  });

  const [teamDescOBJ] = useState({
    Tipo: 'Texto_Nuestro_Equipo',
    texto_campo: '',
  });

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  }

  const handleDescEdit = () => {
    setIsEditingLabelDesc(true);
  }

  const handleDescSave = async () => {
    if (isValidText(description, "Descripción de la empresa")) {
      try {
        descriptionOBJ.texto_campo = description;
        await text_Services.editText(descriptionOBJ)
        setIsEditingLabelDesc(false);
        swal({
          title: "Descripción actualizada",
          text: "La descripción ha sido actualizada exitosamente.",
          icon: "success"
        });
      } catch (error) {
        swal({
          title: "Error de servidor",
          text: `Error, reportar este error: ${error}`,
          icon: "error"
        });
      }
    }
  }

  const handleBioChange = (event) => {
    setBiography(event.target.value);
  }

  const handleBioEdit = () => {
    setIsEditingLabelBio(true);
  }

  const handleBioSave = async () => {
    if (isValidText(biography, "Biografía")) {
      try {
        biographyOBJ.texto_campo = biography;
        await text_Services.editText(biographyOBJ)
        setIsEditingLabelBio(false);
        swal({
          title: "Biografía actualizada",
          text: "La biografía ha sido actualizada exitosamente.",
          icon: "success"
        });
      } catch (error) {
        swal({
          title: "Error de servidor",
          text: `Error, reportar este error: ${error}`,
          icon: "error"
        });
      }
    }
  }

  const handleTeamChange = (event) => {
    setTeamDesc(event.target.value);
  }

  const handleTeamEdit = () => {
    setIsEditingLabelTeam(true);
  }

  const handleTeamSave = async () => {
    if (isValidText(teamDesc, "Nuestro equipo")) {
      try {
        teamDescOBJ.texto_campo = teamDesc;
        await text_Services.editText(teamDescOBJ);
        setIsEditingLabelTeam(false);
        swal({
          title: "Nuestro equipo actualizado",
          text: "Apartado de nuestro equipo ha sido actualizado exitosamente.",
          icon: "success"
        });
      } catch (error) {
        swal({
          title: "Error de servidor",
          text: `Error, reportar este error: ${error}`,
          icon: "error"
        });
      }
    }
  }

  const handleMisionChange = (event) => {
    setMision(event.target.value);
  };

  const handleMisionSave = async () => {
    if (isValidText(mision, "Misión")) {
      try {
        misionOBJ.texto_campo = mision;
        await text_Services.editText(misionOBJ);
        setIsEditingLabelMision(false);
        swal({
          title: "Misión actualizada",
          text: "La misión ha sido actualizada exitosamente.",
          icon: "success"
        });
      } catch (error) {
        swal({
          title: "Error de servidor",
          text: `Error, reportar este error: ${error}`,
          icon: "error"
        });
      }
    }
  };

  const handleMisionEdit = () => {
    setIsEditingLabelMision(true);
  };

  const handleVisionChange = (event) => {
    setVision(event.target.value);
  };

  const handleVisionSave = async () => {
    if (isValidText(vision, "Visión")) {
      try {
        visionOBJ.texto_campo = vision;
        await text_Services.editText(visionOBJ);
        setIsEditingLabelVision(false);
        swal({
          title: "Visión actualizada",
          text: "La visión ha sido actualizada exitosamente.",
          icon: "success"
        });
      } catch (error) {
        swal({
          title: "Error de servidor",
          text: `Error, reportar este error: ${error}`,
          icon: "error"
        });
      }
    }
  };

  const handleVisionEdit = () => {
    setIsEditingLabelVision(true);
  };

  const handleCancel = (edit) => {
    switch (edit) {
      case 'mision':
        setIsEditingLabelMision(false);
        setMision(misionOBJ.texto_campo);
        break;
      case 'vision':
        setIsEditingLabelVision(false);
        setVision(visionOBJ.texto_campo);
        break;
      case 'desc':
        setIsEditingLabelDesc(false);
        setDescription(descriptionOBJ.texto_campo);
        break;
      case 'bio':
        setIsEditingLabelBio(false);
        setBiography(biographyOBJ.texto_campo);
        break;
      case 'team':
        setIsEditingLabelTeam(false);
        setTeamDesc(teamDescOBJ.texto_campo);
        break;
      default:
        break;
    }
  }

  const isValidText = (text, editing) => {
    const cleanText = text.trim();

    if (text === null || text === '') {
      swal({
        title: `Error al actualizar ${editing}`,
        text: `${editing} no puede ir vacío`,
        icon: "error"
      });
      return false;
    }

    if (editing === "Misión" || editing === "Visión") {
      if (cleanText.length > 512) {
        swal({
          title: `Error al actualizar ${editing}`,
          text: `¡${editing} no puede exceder los 512 carácteres!`,
          icon: "error"
        });
        return false;
      }
    } else {
      if (cleanText.length > 1024) {
        swal({
          title: `Error al actualizar ${editing}`,
          text: `¡${editing} no puede exceder los 1024 carácteres!`,
          icon: "error"
        });
        return false;
      }
    }

    if (/^\d|^\s*\d|\d\s*$/.test(cleanText)) {
      swal({
        title: `Error al actualizar ${editing}`,
        text: `¡${editing} no puede ni empezar ni terminar con números!`,
        icon: "error"
      });
      return false;
    }

    if (text !== cleanText) {
      swal({
        title: `Error al actualizar ${editing}`,
        text: `¡${editing} no puede ni empezar ni terminar con espacios ni nuevas líneas!"`,
        icon: "error"
      });
      return false;
    }

    return true;
  }

  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreviewDesc, setImagePreviewDesc] = useState(null);
  const [imagePreviewDoctor, setImagePreviewDoctor] = useState(null);
  const [urlfotoDesc, seturlfotoDesc] = useState(null);
  const [urlfotoDoc, seturlfotoDoc] = useState(null);
  const [idfotoDesc, setidfotoDesc] = useState(74);
  const [idfotoDoc, setidfotoDoc] = useState(64);
  const storage = getStorage();

  //DESCRIPTION
  const handleConfirmarImagen = async (e) => {
    e.preventDefault();
    try {
      
      submitImagen(true);
    } catch (error) {
      // Handle error if any
      
    }
    setImageUpload(null);
  };

  //DOCTOR
  const handleConfirmarDoctorImg = async (e) => {
    e.preventDefault();
    try {
      
      submitImagen(false);
    } catch (error) {
      // Handle error if any
      
    }
    setImageUpload(null);
  };

  const submitImagen = async (flag) => {
    
    
    
    if (flag) {
      try {
        if (imageUpload != null) {
          deleteImg(urlfotoDesc);
          
          const imageUrll = await uploadFile();
          setImages2(() => ({

            url: imageUrll,
          }));
          images2.url = imageUrll;
          
          await AboutUsService.editImagen(idfotoDesc, images2);
          swal("Imagen Agregado", {
            icon: "success",
          });
          window.location.reload();
        } else {
          swal("No se ha seleccionado una imagen nueva", {
            icon: "warning",
          });
        }
      } catch (error) {
        // Handle error if any
        
      }
    } else if (!flag) {
      try {
        if (imageUpload != null) {
          deleteImg(urlfotoDoc);
          
          const imageUrll = await uploadFile();
          setImages2(() => ({

            url: imageUrll,
          }));
          images2.url = imageUrll;
          
          await AboutUsService.editImagen(idfotoDoc, images2);
          swal("Imagen Agregada", {
            icon: "success",
          });
          window.location.reload();
        } else {
          swal("No se ha seleccionado una imagen nueva", {
            icon: "warning",
          });
        }
      } catch (error) {
        // Handle error if any
        
      }
    }
    else {
      
    }
  }

  const deleteImg = (refUrl) => {
    const imageRef = ref(storage, refUrl)
    deleteObject(imageRef)
      .catch((error) => {
        console.log("Failed to delete image: ", error)
      })
    //window.location.reload();
  }

  async function uploadFile() {

    return new Promise((resolve, reject) => {
      if (imageUpload == null) {
        return null;
      }

      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          resolve(url);
        })
        .catch((error) => reject(error));
    });
  };

  /////

  const [isEditingLabelMision, setIsEditingLabelMision] = useState(false);
  const [isEditingLabelVision, setIsEditingLabelVision] = useState(false);
  const [isEditingLabelDesc, setIsEditingLabelDesc] = useState(false);
  const [isEditingLabelBio, setIsEditingLabelBio] = useState(false);
  const [isEditingLabelTeam, setIsEditingLabelTeam] = useState(false);

  const inputRef = useRef(null);

  const fetchImgs = async () => {
    setidfotoDoc(64);
    setidfotoDesc(74);
    try {
      const imgsArray = await AboutUsService.getPicsDoctoryDesc();
      

      ImgsData = imgsArray.map((images) => ({
        idfoto: images.idfoto,
        url: images.url,
      }));
      images = imgsArray.map((img) => ({
        ...img,
        url: img.url,
        idfoto: img.idfoto,
      }));
      setImagePreviewDoctor(images[0].url);
      seturlfotoDoc(images[0].url);
      setImagePreviewDesc(images[1].url);
      seturlfotoDesc(images[1].url);
      ImgsDataDesc = images[1];
      ImgsDataDoc = images[0];
    } catch (error) {
      // Handle error if   any
      
    }
  };

  const fetchMision = async () => {
    try {
      const objectMision = ['Mision'];
      var misionData = await text_Services.getOneText(objectMision);
      misionOBJ.texto_campo = misionData[0].texto_campo;
      setMision(misionData[0].texto_campo);
    } catch (error) {
      
    }
  };
  const fetchVision = async () => {
    try {
      const objectVision = ['Vision'];
      const visionData = await text_Services.getOneText(objectVision);
      visionOBJ.texto_campo = visionData[0].texto_campo;
      setVision(visionData[0].texto_campo);
    } catch (error) {
      
    }
  };

  const fetchDesc = async () => {
    try {
      const objectDesc = ['Descripción_Empresa'];
      const descData = await text_Services.getOneText(objectDesc);
      descriptionOBJ.texto_campo = descData[0].texto_campo;
      setDescription(descData[0].texto_campo);
    } catch (error) {
      
    }
  }

  const fetchBio = async () => {
    try {
      const objectBio = ['Biografia_Autor'];
      const descBio = await text_Services.getOneText(objectBio);
      biographyOBJ.texto_campo = descBio[0].texto_campo;
      setBiography(descBio[0].texto_campo);
    } catch (error) {
      
    }
  }

  const fetchTeam = async () => {
    try {
      const objectTeam = ['Texto_Nuestro_Equipo'];
      const descTeam = await text_Services.getOneText(objectTeam);
      teamDescOBJ.texto_campo = descTeam[0].texto_campo;
      setTeamDesc(descTeam[0].texto_campo);
    } catch (error) {
      
    }
  }
  

  useEffect(() => {
    
    fetchImgs();
    fetchMision();
    fetchVision();
    fetchDesc();
    fetchBio();
    fetchTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEditingLabelMision || isEditingLabelBio || isEditingLabelDesc || isEditingLabelTeam || isEditingLabelMision && inputRef.current) {
      inputRef.current.style.height = `${25 + inputRef.current.scrollHeight}px`;
    }
  }, [isEditingLabelMision, isEditingLabelVision, isEditingLabelDesc, isEditingLabelBio, isEditingLabelTeam]);


  return (
    <div className="scrollable-page">
      <Topbar />

      <div className="info header">
        SOBRE NOSOTROS
      </div>

      <div className="about-us-container">

        {isLoggedIn && userType !== 'normal' &&
          <div class="admin-edit">
            {
              isEditingPage &&
              <h2>EDITANDO</h2>
            }
            <FontAwesomeIcon onClick={handleEditPage} icon={faGear} />
          </div>
        }

        <div className="mission-vision-container">
          <div className="mission">
            <FontAwesomeIcon icon={faCircleDot} style={{ color: '#D3B938', fontSize: '50px' }} />
            <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px' }}>Misión</h2>
            {isEditingLabelMision ? (
              <div class="about-us-txt-container">
                <textarea
                  ref={inputRef}
                  name="mision"
                  value={mision}
                  style={{ fontSize: '18px', maxHeight: '250px', wordWrap: 'breakWord', width: '100%' }}
                  onChange={handleMisionChange}
                  maxLength={maxDescriptionCharacters}
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
              <div class="about-us-txt-container">
                <p class="new-text">{mision}</p>
                {isEditingPage &&
                  <button onClick={handleMisionEdit} class="upload-button">
                    Editar
                  </button>
                }
              </div>
            )}

          </div>

          <div className="vision">
            <FontAwesomeIcon icon={faStar} style={{ color: '#D3B938', fontSize: '50px' }} />
            <h2 style={{ color: '#8FC1B5', fontSize: '40px' }}>Visión</h2>

            {isEditingLabelVision ? (
              <div class="about-us-txt-container">
                <textarea
                  ref={inputRef}
                  name="vision"
                  value={vision}
                  style={{ fontSize: '18px', maxHeight: '250px', wordWrap: 'break-word', width: '100%' }}
                  onChange={handleVisionChange}
                  maxLength={maxDescriptionCharacters}
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
              <div class="about-us-txt-container">
                <p class="new-text">{vision}</p>
                {isEditingPage &&
                  <button onClick={handleVisionEdit} class="upload-button">
                    Editar
                  </button>
                }
              </div>
            )}

          </div>
        </div>

        <div className="company-description">
          <div className="image-container">
            <img src={imagePreviewDesc} alt="Imagen de la clínica" />
            {isEditingPage &&
              <div class="upload-buttons">
                <label class="upload-button" htmlFor="urlDescImg">Seleccionar imagen</label>
                <input
                  type="file"
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                    setImagePreviewDesc(URL.createObjectURL(event.target.files[0]));
                  }}
                  accept="image/png, image/jpeg, image/webp"
                  name='urlDescImg'
                  id="urlDescImg"
                  className="customFileInput"
                />
                <label class="upload-button accept" onClick={handleConfirmarImagen}>Confirmar imagen</label>
              </div>
            }
          </div>
          <div className="text-container">
            <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center' }}>Descripción de la Empresa</h2>
            {isEditingLabelDesc ? (
              <div class="about-us-txt-container">
                <textarea
                  ref={inputRef}
                  name="description"
                  value={description}
                  style={{ fontSize: '18px', maxHeight: '250px', width: '100%' }}
                  onChange={handleDescChange}
                  maxLength={maxDescriptionCharacters2}
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
                <div class="about-us-txt-container">
                  <p class="new-text">
                    {description}
                  </p>
                  {isEditingPage &&
                    <button onClick={handleDescEdit} class="upload-button">
                      Editar
                    </button>
                  }
                </div>
              )
            }
          </div>
        </div>

        <div className="person-container">
          <div className="person-image">
            <img src={imagePreviewDoctor} alt="Dr. Víctor Cruz" />
            {
              isEditingPage &&
              <div class="upload-buttons">
                <label class="upload-button" htmlFor="urlDrImg">Seleccionar imagen</label>
                <input
                  type="file"
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                    setImagePreviewDoctor(URL.createObjectURL(event.target.files[0]));
                  }}
                  accept="image/png, image/jpeg, image/webp"
                  name='urlDrImg'
                  id="urlDrImg"
                  className="customFileInput"
                />
                <label class="upload-button accept" onClick={handleConfirmarDoctorImg}>Confirmar imagen</label>
              </div>
            }
          </div>
          <div className="text-container">
            <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center' }}> Dr. Victor Cruz</h2>
            {isEditingLabelBio ? (
              <div class="about-us-txt-container">
                <textarea
                  ref={inputRef}
                  name="biography"
                  value={biography}
                  style={{ width: '100%', height: 'fitContent', maxHeight: '250px', fontSize: '18px' }}
                  onChange={handleBioChange}
                  maxLength={maxDescriptionCharacters2}
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
                <div class="about-us-txt-container">
                  <p class="new-text">
                    {biography}
                  </p>
                  {isEditingPage &&
                    <button onClick={handleBioEdit} class="upload-button">
                      Editar
                    </button>
                  }
                </div>
              )
            }
          </div>
        </div>

        <div className="employee-description">
          <FontAwesomeIcon icon={faPeopleGroup} style={{ color: 'rgb(255, 255, 255)', fontSize: '110px', position: 'relative', marginRight: '10px' }} />
          <div class="text-container">
            <h2 style={{ position: 'relative', color: '#8FC1B5', fontSize: '40px', marginBottom: '30px', textAlign: 'center' }}>Nuestro Equipo</h2>
            {isEditingLabelTeam ? (
              <div class="about-us-txt-container">
                <textarea
                  ref={inputRef}
                  name="team"
                  value={teamDesc}
                  style={{ width: '100%', fontSize: '18px', maxHeight: '250px' }}
                  onChange={handleTeamChange}
                  maxLength={maxDescriptionCharacters2}
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
                <div class="about-us-txt-container">
                  <p class="new-text">
                    {teamDesc}
                  </p>
                  {isEditingPage &&
                    <button onClick={handleTeamEdit} class="upload-button">
                      Editar
                    </button>
                  }
                </div>
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