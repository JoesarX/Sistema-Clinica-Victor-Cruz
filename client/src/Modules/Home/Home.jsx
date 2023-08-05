import React, { useEffect, useState, useRef, useContext } from 'react';
import '../HojaDeEstilos/Home.css';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { AuthContext } from '../AuthContext.js';
import text_Services from '../../Services/texto_cmdService';

import Topbar from './Topbar';
import Footer from './Footer';

import doctor_slide from '../Imagenes/doctor_slide.jpeg';
import doctor_slide1 from '../Imagenes/doctor_slide1.jpeg';
import saludOcupacional from '../Imagenes/saludOcupacional.webp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faSave, faTimes, faCog } from '@fortawesome/free-solid-svg-icons';


import axios from 'axios'; // Import axios library



const Home = () => {


    /* Para la DB*/



    const [titulo1OBJ, setTitulo1OBJ] = React.useState({
        Tipo: 'título_servicio1',
        texto_campo: ''
    })


    const [titulo2OBJ, setTitulo2OBJ] = React.useState({
        Tipo: 'título_servicio2',
        texto_campo: ''
    })

    const [titulo3OBJ, setTitulo3OBJ] = React.useState({
        Tipo: 'título_servicio3',
        texto_campo: ''
    })


    const [descripcion1OBJ, setdescripcion1OBJ] = React.useState({
        Tipo: 'texto_servicio1',
        texto_campo: ''
    })

    const [descripcion2OBJ, setdescripcion2OBJ] = React.useState({
        Tipo: 'texto_servicio2',
        texto_campo: ''
    })

    const [descripcion3OBJ, setdescripcion3OBJ] = React.useState({
        Tipo: 'texto_servicio3',
        texto_campo: ''
    })









    //Array donde se va a ir guardando el componente/servicio segun un id
    const servicesData = [
        {
            id: 1,
            title: 'Clinica',
            description: 'Dedicada a brindar servicios de salud de alta calidad y atención médica integral.',
            icon: faStethoscope
        },
        {
            id: 2,
            title: 'Salud Ocupacional',
            description: 'Contamos con una amplia experiencia en la prevención y el control de riesgos laborales, así como en el diseño y la ejecución de planes de promoción de la salud.',
            icon: faUserDoctor
        },
        {
            id: 3,
            title: 'Laboratorio',
            description: 'Respaldado por un equipo de profesionales altamente capacitados y comprometidos con la excelencia científica y la precisión diagnóstica.',
            icon: faFlask
        }
    ];
    const [editAll, setEditAll] = useState(false);
    const [editAll2, setEditAll2] = useState(false);



    const ServiceComponent = ({ title, description, icon, isEditMode }) => {
        const [editable, setEditable] = useState(false);
        const [editedTitle, setEditedTitle] = useState(title);
        const [editedDescription, setEditedDescription] = useState(description);

        const handleEditToggle = () => {
            setEditable(!editable);
        };

        const handleSave = () => {
            // Remove extra spaces at the end of title and description
            const trimmedTitle = editedTitle.trim();
            const trimmedDescription = editedDescription.trim();

            // Check if the description ends with a period
            if (trimmedDescription.charAt(trimmedDescription.length - 1) !== ".") {
                alert("La descripción debe terminar con un punto.");
                return;
            }

            // Check if title starts with an uppercase letter and is within 25 characters
            if (
                !/^[A-Z]/.test(trimmedTitle) ||
                trimmedTitle.length > 20
            ) {
                alert("Asegúrate de que el título inicie con mayúscula y que no exceda los 20 caracteres.");
                return;
            }

            // Check if there are more than one consecutive spaces in title or description
            if (/\s{2,}/.test(trimmedTitle) || /\s{2,}/.test(trimmedDescription)) {
                alert("No se permiten más de un espacio consecutivo en el texto.");
                return;
            }

            // Check if the description has more than 80 characters
            if (trimmedDescription.length > 190) {
                alert("La descripción no puede exceder los 190 caracteres.");
                return;
            }

            setEditable(false);
            setEditedTitle(trimmedTitle);
            setEditedDescription(trimmedDescription);
        };

        const handleCancel = () => {
            setEditable(false);
            // Reset to original values
            setEditedTitle(title);
            setEditedDescription(description);
        };

        const handleTitleChange = (e) => {
            // Capitalize the first letter of the title
            const value = e.target.value;
            if (value.length === 0) {
                setEditedTitle(value);
            } else {
                setEditedTitle(value.charAt(0).toUpperCase() + value.slice(1));
            }
        };

        const handleDescriptionChange = (e) => {
            // Capitalize the first letter of the description
            const value = e.target.value;
            if (value.length === 0) {
                setEditedDescription(value);
            } else {
                setEditedDescription(value.charAt(0).toUpperCase() + value.slice(1));
            }
        };




       /* useEffect(() => {
            const fetchTitulo1 = async () => {
                try {
                    const titulo1 = ['título_servicio1'];
                    var titulo1Data;
                    titulo1Data = await text_Services.getOneText(titulo1);
                    console.log("Cargar titulo: " + titulo1Data[0].texto_campo);
                    setEditedTitle(titulo1Data[0].texto_campo);
                    titulo1OBJ.texto_campo = titulo1Data[0].texto_campo;
                } catch (error) {
                    console.log("Error fetching titulo 1:", error);
                }
            };


            const fetchTitulo2 = async () => {
                try {
                    const titulo2 = ['título_servicio2'];
                    var titulo2Data;
                    titulo2Data = await text_Services.getOneText(titulo2);
                    console.log("Cargar titulo: " + titulo2Data[0].texto_campo);
                    setEditedTitle(titulo2Data[0].texto_campo);
                    titulo2OBJ.texto_campo = titulo2Data[0].texto_campo;
                } catch (error) {
                    console.log("Error fetching titulo 2:", error);
                }
            };


            const fetchTitulo3 = async () => {
                try {
                    const titulo3 = ['título_servicio3'];
                    var titulo3Data;
                    titulo3Data = await text_Services.getOneText(titulo3);
                    console.log("Cargar titulo: " + titulo3Data[0].texto_campo);
                    setEditedTitle(titulo3Data[0].texto_campo);
                    titulo3OBJ.texto_campo = titulo3Data[0].texto_campo;
                } catch (error) {
                    console.log("Error fetching titulo 3:", error);
                }
            };


            fetchTitulo1();
            fetchTitulo2();
            fetchTitulo3();


        }, [editable]);
*/

useEffect(() => {
    const fetchTitulos = async () => {
      try {
        const titulo1Data = await text_Services.getOneText(['título_servicio1']);
        setTitulo1OBJ({ ...titulo1OBJ, texto_campo: titulo1Data[0].texto_campo });

        const titulo2Data = await text_Services.getOneText(['título_servicio2']);
        setTitulo2OBJ({ ...titulo2OBJ, texto_campo: titulo2Data[0].texto_campo });

        const titulo3Data = await text_Services.getOneText(['título_servicio3']);
        setTitulo3OBJ({ ...titulo3OBJ, texto_campo: titulo3Data[0].texto_campo });
      } catch (error) {
        console.log("Error fetching titles:", error);
      }
    };

    fetchTitulos();
  }, [editable]);


        return (
            <div className="service-container">
                <div className="service-icon-container">
                    <FontAwesomeIcon icon={icon} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                </div>
                <div className="service-text-elements" style={{ height: '270px' }}>
                    <h1 className="service-header">
                        {editable ? (
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={handleTitleChange}
                                style={{ width: '100%' }}
                            />
                        ) : (
                            editedTitle
                        )}
                    </h1>
                    <div className="service-text">
                        {editable ? (
                            <textarea
                                value={editedDescription}
                                onChange={handleDescriptionChange}
                                rows={5}
                                cols={40}
                                style={{ width: '100%' }}
                            />
                        ) : (
                            editedDescription
                        )}
                    </div>
                    {isEditMode && (
                        <div className="edit-buttons-container">
                            {editable ? (
                                <div className="centered-edit-buttons">
                                    <button onClick={handleSave}>
                                        <FontAwesomeIcon icon={faSave} style={{ color: '#1E60A6' }} />
                                    </button>
                                    <button onClick={handleCancel}>
                                        <FontAwesomeIcon icon={faTimes} style={{ color: '#1E60A6' }} />
                                    </button>
                                </div>
                            ) : (
                                <button onClick={handleEditToggle}>
                                    <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // ==========================================================================================

    const navigate = useNavigate();

    const { userType, isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        // Make the initial request on component mount
        wakeUpServer();

        // Set up interval to make periodic requests
        const interval = setInterval(() => {
            wakeUpServer();
        }, 300000); // Every 5 minutes (adjust as needed)

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const wakeUpServer = () => {
        // Make a GET request to wake up the server
        axios.get('https://clinicavictorcruzserver.azurewebsites.net')
            .catch(error => {
                // Handle any errors if necessary
                console.error('Error waking up server:', error);
            });
        console.log('Server is awake!');
    };

    const handleCitaClick = () => {
        navigate('/citas');
    };

    const handleServicesClick = () => {
        navigate('/servicios');
    };

    const handleAboutUsClick = () => {
        navigate('acerca-de');
    };

    const properties = {
        duration: 3000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true
    };


    /* msion Edit */

    const originalText = `Nuestra misión en nuestra clínica médica y laboratorio de análisis clínicos es proporcionar atención médica de alta calidad a nuestros pacientes, con énfasis en la prevención, el diagnóstico y el tratamiento de enfermedades.
    \nEstamos dedicados a proporcionar atención médica individualizada, segura y eficiente mediante la utilización de tecnologías.`;

    const [editable, setEditable] = useState(false);
    const [missionText, setMissionText] = useState(originalText);

    const MAX_LINES = 10;

    const handleEditClick = () => {
        setEditable(true);
    };

    const handleSaveClick = () => {
        if (missionText.split('\n').length > MAX_LINES) {
            alert(`¡Error! El texto no puede tener más de ${MAX_LINES} líneas.`);
            return;
        }

        setEditable(false);
    };

    const handleCancelClick = () => {
        setEditable(false);
        setMissionText(originalText);
    };

    const handleChange = (event) => {
        // Recortar el texto si excede el máximo número de líneas permitidas
        setMissionText(event.target.value);
    };

    const formatOriginalText = (text) => {
        return text.split('\n').map((paragraph, index) => (
            <React.Fragment key={index}>
                {paragraph}
                <br />
            </React.Fragment>
        ));
    };



    /* Google Maps*/
    const [editable1, setEditable1] = useState(false);
    const mapEmbedURL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.2772379811036!2d-87.18158692600126!3d14.060799390066796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6fbd687c0d3b49%3A0xb5416f51d417978c!2sCl%C3%ADnica%20Dr.%20V%C3%ADctor%20Cruz%20Andino!5e0!3m2!1ses!2shn!4v1684216285312!5m2!1ses!2shn";
    const [mapURL, setMapURL] = useState(mapEmbedURL);

    const handleEditClick1 = () => {
        setEditable1(true);
    };

    const handleSaveClick1 = () => {
        setEditable1(false);
    };

    const handleCancelClick1 = () => {
        setEditable1(false);
        setMapURL(mapEmbedURL);
    };

    const handleChange1 = (event) => {
        setMapURL(event.target.value);
    };





    /* Metodos de Fetch de la D*/







    return (
        <div className="scrollable-page">
            <Topbar />
            <div className="imagenes">
                <Slide {...properties}>
                    <div className="each-slide">
                        <img src={doctor_slide} alt="imagen 1" />
                    </div>
                    <div className="each-slide">
                        <img src={doctor_slide1} alt="imagen 2" />
                    </div>
                    <div className="each-slide">
                        <img src={saludOcupacional} alt="imagen 3" />
                    </div>
                </Slide>
            </div>
            <div className="content-header-banner">
                NUESTROS <span style={{ color: '#223240', marginLeft: '10px' }}>SERVICIOS</span>
            </div>
            <div className="services-container">
        <ServiceComponent
          title={titulo1OBJ.texto_campo}
          description={servicesData[0].description}
          icon={servicesData[0].icon}
          isEditMode={editAll}
        />
        <ServiceComponent
          title={titulo2OBJ.texto_campo}
          description={servicesData[1].description}
          icon={servicesData[1].icon}
          isEditMode={editAll}
        />
        <ServiceComponent
          title={titulo3OBJ.texto_campo}
          description={servicesData[2].description}
          icon={servicesData[2].icon}
          isEditMode={editAll}
        />
      </div>
            <div class="button-container">
                <button class="see-more-button services" onClick={handleServicesClick}>Ver más...</button>
            </div>
            {isLoggedIn && userType !== 'normal' && (
                <button onClick={() => setEditAll(!editAll)}>
                    <FontAwesomeIcon icon={faCog} style={{ fontSize: '25px', padding: '5px', color: '#1E60A6' }} />
                </button>
            )}
            <div className="content-header-banner">
                SOBRE <span style={{ color: '#223240', marginLeft: '10px' }}>NOSOTROS</span>
            </div>
            <div className="home-about-us-container">
                <div className='about-us-content'>
                    <div className='content-header align-left'>Misión</div>
                    {editable ? (
                        <textarea
                            className='about-us-text'
                            value={missionText}
                            onChange={handleChange}
                            rows="10"
                            cols={50}
                        />
                    ) : (
                        <div className='about-us-text'>{formatOriginalText(missionText)}</div>
                    )}
                    {editable ? (
                        <>
                            <button onClick={handleSaveClick} style={{ display: 'inline-block' }}>
                                <FontAwesomeIcon icon={faSave} style={{ fontSize: '20px', padding: '5px', color: '#1E60A6' }} />
                            </button>
                            <button onClick={handleCancelClick} style={{ display: 'inline-block' }}>
                                <FontAwesomeIcon icon={faTimes} style={{ fontSize: '20px', padding: '5px', color: '#1E60A6' }} />
                            </button>
                        </>
                    ) : (
                        <div>
                            {editAll2 && (
                                <button className='edit-button' onClick={handleEditClick}>
                                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: '25px', padding: '5px', color: '#1E60A6' }} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
                <div className='about-us-content'>
                    <div className="content-header align-left small-text">Estamos ubicados en:</div>
                    {editable1 ? (
                        <input
                            type="text"
                            className='google-map-input'
                            value={mapURL}
                            onChange={handleChange1}
                        />
                    ) : (
                        <iframe
                            src={mapURL}
                            allowFullScreen=""
                            loading="lazy"
                            className='google-map-frame'
                        />
                    )}
                    {editable1 ? (
                        <div className="button-container">
                            <button className='edit-button' onClick={handleSaveClick1}>
                                <FontAwesomeIcon icon={faSave} style={{ fontSize: '20px', padding: '5px', color: '#1E60A6' }} />
                            </button>
                            <button className='cancel-button' onClick={handleCancelClick1}>
                                <FontAwesomeIcon icon={faTimes} style={{ fontSize: '20px', padding: '5px', color: '#1E60A6' }} />
                            </button>
                        </div>
                    ) : (
                        <div>
                            {editAll2 && (
                                <button className='edit-button' onClick={handleEditClick1}>
                                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: '25px', padding: '5px', color: '#1E60A6' }} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {isLoggedIn && userType !== 'normal' && (
                <button onClick={() => setEditAll2(!editAll2)}>
                    <FontAwesomeIcon icon={faCog} style={{ fontSize: '25px', padding: '5px', color: '#1E60A6' }} />
                </button>
            )}




            <div className="smooth-line" />
            <div className="home-schedule-container">
                <FontAwesomeIcon icon={faCalendarDays} className="content-header white-text schedule-calendar-icon" />
                <div className="text-wrapper">
                    <div className="content-header white-text smaller-text">Recuerda ver los horarios disponibles para poder agendar tu cita.</div>
                </div>
                <button className="see-more-button schedule-appointment" onClick={handleCitaClick}>Agenda ya!</button>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
