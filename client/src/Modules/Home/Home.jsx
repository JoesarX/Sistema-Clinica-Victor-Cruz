import React, { useEffect, useState, useRef } from 'react';
import '../HojaDeEstilos/Home.css';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import Topbar from './Topbar';
import Footer from './Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

import CarruselService from '../../Services/CarruselService';

import axios from 'axios'; // Import axios library

import { CompressOutlined, LegendToggleSharp } from '@mui/icons-material';

import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    getStorage,
    listAll,
    list,
} from "firebase/storage";

import { v4 } from "uuid";



const Home = () => {
    const navigate = useNavigate();

    let [CarruselData, setCarruselData] = useState([]);

    let [imageUpload, setImageUpload] = useState(null);
    let [imagePreview, setImagePreview] = useState(null);

    const fetchAllCarruselPics = async () => {
        try {
            const CarruselArray = await CarruselService.getPicsCarrusel();
            setCarruselData(CarruselArray);
        } catch (error) {
            console.log("Error fetching carrusel pictures:", error);
        }
    };

    useEffect(() => {
        fetchAllCarruselPics();
    }, []);


    useEffect(() => {
        // Make the initial request on component mount
        wakeUpServer();

        // Set up interval to make periodic requests
        const interval = setInterval(() => {
            wakeUpServer();
        }, 300000);

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

    const properties = {
        duration: 3000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true
    };


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

    const storage = getStorage();
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
                    //console.log(medicamento);
                })
                .catch((error) => reject(error));
        });
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("test");
            submitPicture();
        } catch (error) {
            // Handle error if any
            console.log('Error submitting medicamento:', error);
        }
    };



    const submitPicture = async () => {

        console.log("Entra a agregar despues de validaciones");
        try {
            if (imageUpload != null) {
                const imageUrl = await uploadFile();
                const carruselToSend = { url: imageUrl };
                await CarruselService.postPicture(carruselToSend);
                alert('Foto Agregada');
                // window.location.reload();
            }
            // toggleModal();
            setImagePreview(null);
        } catch (error) {
            // Handle error if any
            console.log('Error submitting medicamento:', error);
        }
    };

    const Carrusel = () => {
        return (
            <div className="imagenes">
                <Slide {...properties}>
                    {CarruselData.map((carrusel) => (
                        <div className='each-slide' key={carrusel.idfoto}>
                            <img src={carrusel.url} alt={`imagen ${carrusel.idfoto}`} />
                        </div>
                    ))}
                </Slide>
            </div>
        )
    };

    return (
        <div className="scrollable-page">
            <Topbar />

            <Carrusel />

            <label htmlFor="urlfoto" className="customFileLabel"  >Seleccionar archivo</label>
            <input
                type="file"
                onChange={(event) => {
                    imageUpload = event.target.files[0];
                    imagePreview = URL.createObjectURL(event.target.files[0]);

                    const selectedFile = event.target.files[0];
                    if (selectedFile) {
                        console.log(":)))))))))")
                        // Do something with the selected file, e.g., display its details
                        console.log('Selected file name:', selectedFile.name);
                        console.log('Selected file type:', selectedFile.type);
                        console.log('Selected file size:', selectedFile.size);
                        handleModalSubmit(event);
                    }
                }}
                name='urlfoto'
                id="urlfoto"
                className="customFileInput"
            />

            <div className="content-header-banner">
                NUESTROS <span style={{ color: '#223240', marginLeft: '10px' }}>SERVICIOS</span>
            </div>

            <div className="services-container">
                <div className="service-container">
                    <div className="service-icon-container">
                        <FontAwesomeIcon icon={faStethoscope} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                    </div>
                    <div className="service-text-elements">
                        <h1 className="service-header">Clínica</h1>
                        <div className="service-text">
                            Dedicada a brindar servicios de salud de alta calidad y atención médica integral.
                        </div>
                    </div>
                </div>
                <div className="service-container">
                    <div className="service-icon-container">
                        <FontAwesomeIcon icon={faUserDoctor} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                    </div>
                    <div className="service-text-elements">
                        <h1 className="service-header">Salud Ocupacional</h1>
                        <div className="service-text">
                            Contamos con una amplia experiencia en la prevención y el control de riesgos laborales, así como en el diseño y la ejecución de planes de promoción de la salud.
                        </div>
                    </div>
                </div>
                <div className="service-container">
                    <div className="service-icon-container">
                        <FontAwesomeIcon icon={faFlask} style={{ color: 'rgb(30, 96, 166)', fontSize: '104px' }} />
                    </div>
                    <div className="service-text-elements">
                        <h1 className="service-header">Laboratorio</h1>
                        <div className="service-text">
                            Respaldado por un equipo de profesionales altamente capacitados y comprometidos con la excelencia científica y la precisión diagnóstica.
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-container">
                <button class="see-more-button services" onClick={handleServicesClick}>Ver más...</button>
            </div>
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
                            style = {{width: '100%'}}
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
                        <button onClick={handleEditClick}>
                            <FontAwesomeIcon icon={faEdit} style={{ fontSize: '25px', padding: '5px', color: '#1E60A6' }} />
                        </button>
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
                        <button className='edit-button' onClick={handleEditClick1}>
                            <FontAwesomeIcon icon={faEdit} style={{ fontSize: '25px', padding: '5px', color: '#1E60A6' }} />
                        </button>
                    )}
                </div>
            </div>
            <div className="smooth-line" />
            <div className="home-schedule-container">
                <FontAwesomeIcon icon={faCalendarDays} className="content-header white-text schedule-calendar-icon" />
                <div className="text-wrapper">
                    <div className="content-header white-text smaller-text">Recuerda ver los horarios disponibles para poder agendar tu cita.</div>
                </div>
                <button className="see-more-button schedule-appointment" onClick={handleCitaClick}>Agenda ya!</button>
            </div>
            <Footer />
        </div >
    );
};

export default Home;
