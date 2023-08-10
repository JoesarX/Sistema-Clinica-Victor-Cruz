import React, { useEffect, useState, useRef, useContext } from 'react';
import '../HojaDeEstilos/Home.css';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { AuthContext } from '../AuthContext.js';
import text_Services from '../../Services/texto_cmdService';

import Topbar from './Topbar';
import Footer from './Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faSave, faTimes, faCog } from '@fortawesome/free-solid-svg-icons';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import CarruselService from '../../Services/CarruselService';

import axios from 'axios'; // Import axios library

import { Button, TextField, Modal } from '@mui/material'
import {
    DataGrid, esES, GridCellEditStopReasons, gridColumnsTotalWidthSelector, useGridApiRef
} from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import swal from 'sweetalert';

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
import { idID } from '@mui/material/locale';
const Home = () => {

    const maxDescriptionCharacters = 512;
    const maxDescriptionCharacters2 = 190;

    const AddButton = () => (
        <button>
            <AddIcon />
            Agregar Foto
        </button>
    );

    const SaveButton = () => (
        <button>
            <SaveIcon />
            Guardar Cambios
        </button>
    );

    /* Para la DB*/

    const [isFetching, setIsFetching] = useState(true);

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








    const [misionOBJ] = React.useState({
        Tipo: 'Mision',
        texto_campo: ''
    })


    const [mapsOBJ] = React.useState({
        Tipo: 'google_maps',
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



    const ServiceComponent = ({ title, description, icon, isEditMode, TipoTitulo, TipoDesc }) => {
        const [editable, setEditable] = useState(false);
        const [editedTitle, setEditedTitle] = useState(title);
        const [editedDescription, setEditedDescription] = useState(description);

        const handleEditToggle = () => {
            setEditable(!editable);


        };

        const handleSave = async () => {
            // Remove extra spaces at the end of title and description
            const TituloOriginal = TipoTitulo.texto_campo;
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
            console.log("Este es el titulo:" + TipoTitulo.texto_campo);

            TipoTitulo.texto_campo = trimmedTitle;

            console.log("Este es el titulo original:" + TituloOriginal);
            await text_Services.editText(TipoTitulo);
            TipoDesc.texto_campo = trimmedDescription;
            await text_Services.editText(TipoDesc);

            setEditable(false);
            setEditedTitle(trimmedTitle);
            setEditedDescription(trimmedDescription);
            window.location.reload(true);
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

        useEffect(() => {
            if (isFetching) {
                const fetchTitulos = async () => {
                    try {
                        const titulo1Data = await text_Services.getOneText(['título_servicio1']);
                        setTitulo1OBJ({ ...titulo1OBJ, texto_campo: titulo1Data[0].texto_campo });

                        const titulo2Data = await text_Services.getOneText(['título_servicio2']);
                        setTitulo2OBJ({ ...titulo2OBJ, texto_campo: titulo2Data[0].texto_campo });

                        const titulo3Data = await text_Services.getOneText(['título_servicio3']);
                        setTitulo3OBJ({ ...titulo3OBJ, texto_campo: titulo3Data[0].texto_campo });

                        const servicio1Data = await text_Services.getOneText(['texto_servicio1']);
                        setdescripcion1OBJ({ ...descripcion1OBJ, texto_campo: servicio1Data[0].texto_campo });

                        const servicio2Data = await text_Services.getOneText(['texto_servicio2']);
                        setdescripcion2OBJ({ ...descripcion2OBJ, texto_campo: servicio2Data[0].texto_campo });

                        const servicio3Data = await text_Services.getOneText(['texto_servicio3']);
                        setdescripcion3OBJ({ ...descripcion3OBJ, texto_campo: servicio3Data[0].texto_campo });
                        setIsFetching(false);

                    } catch (error) {
                        console.log("Error fetching titles:", error);
                    }
                };
                console.log("Error de effect");
                fetchAllCarruselPics();
                fetchTitulos();
                setIsFetching(false);
            }
        }, [isFetching]);


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
                                maxLength={maxDescriptionCharacters2}
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

    let [CarruselData, setCarruselData] = useState([]);

    let [imageUpload, setImageUpload] = useState(null);
    let [imagePreview, setImagePreview] = useState(null);

    const fetchAllCarruselPics = async () => {
        try {
            const CarruselArray = await CarruselService.getPicsCarrusel();
            console.log(CarruselArray)
            setCarruselData(CarruselArray);
        } catch (error) {
            console.log("Error fetching carrusel pictures:", error);
        }
    };

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



    /* mision Edit */

    const originalText = `Nuestra misión en nuestra clínica médica y laboratorio de análisis clínicos es proporcionar atención médica de alta calidad a nuestros pacientes, con énfasis en la prevención, el diagnóstico y el tratamiento de enfermedades.
    \nEstamos dedicados a proporcionar atención médica individualizada, segura y eficiente mediante la utilización de tecnologías.`;

    const [editable, setEditable] = useState(false);
    const [missionText, setMissionText] = useState(originalText);
    const [editedMission, setEditedMission] = useState('');

    const MAX_LINES = 10;

    const handleChange = (event) => {
        setEditedMission(event.target.value);
        misionOBJ.texto_campo = event.target.value; // Actualizamos el valor en misionOBJ mientras se edita
    };

    const handleEditClick = () => {
        setEditable(true);
        setEditedMission(missionText);
    };

    const handleSaveClick = async () => {
        if (editedMission.split('\n').length > MAX_LINES) {
            alert(`¡Error! El texto no puede tener más de ${MAX_LINES} líneas.`);
            return;
        }

        setEditable(false);
        setMissionText(editedMission);
        await text_Services.editText(misionOBJ);
        window.location.reload(true);
    };

    const handleCancelClick = () => {
        setEditable(false);
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
    const [editedMapURL, setEditedMapURL] = useState('');

    const handleChange1 = (event) => {
        setEditedMapURL(event.target.value);
        mapsOBJ.texto_campo = event.target.value;
    };

    const handleEditClick1 = () => {
        setEditedMapURL(mapURL);
        setEditable1(true);
    };

    const isValidMapURL = (url) => {
        // Expresión regular para verificar si el valor es un enlace válido de Google Maps
        const mapURLRegex = /^(https?:\/\/)?www\.google\.com\/maps\/embed\?.*$/;
        return mapURLRegex.test(url);
    };

    const handleSaveClick1 = async () => {
        setEditable1(false);

        // Extraer el enlace del iframe y validar
        const extractedSrc = extractSrcFromIframe(editedMapURL);
        if (!extractedSrc || !isValidMapURL(extractedSrc)) {
            alert("Por favor, ingrese un enlace válido de Google Maps.");
            return;
        }

        // Guardar el enlace en el estado
        setMapURL(extractedSrc);
        mapsOBJ.texto_campo = extractedSrc;

        await text_Services.editText(mapsOBJ);
        window.location.reload(true);
    };

    const handleCancelClick1 = () => {
        setEditable1(false);
        setEditedMapURL(mapURL); // Restaurar el valor original si se cancela la edición
    };

    const extractSrcFromIframe = (iframeCode) => {
        const srcRegex = /src="([^"]*)"/;
        const matches = srcRegex.exec(iframeCode);
        if (matches && matches.length >= 2) {
            return matches[1];
        }
        return null;
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
                swal("Imagen de carrusel agregada exitosamente!", {
                    icon: "success",
                });
                fetchAllCarruselPics();
            }
            // toggleModal();
            setImagePreview(null);
        } catch (error) {
            // Handle error if any
            console.log('Error submitting medicamento:', error);
        }
    };

    useEffect(() => {

        const fetchMision = async () => {
            try {
                const objectMision = ['Mision'];
                var misionData = await text_Services.getOneText(objectMision);
                misionOBJ.texto_campo = misionData[0].texto_campo;
                setMissionText(misionData[0].texto_campo);
            } catch (error) {
                console.log("Error fetching Mision:", error);
            }
        };

        const fetchMaps = async () => {
            try {
                const objectMaps = ['google_maps'];
                var mapsData = await text_Services.getOneText(objectMaps);
                mapsOBJ.texto_campo = mapsData[0].texto_campo;
                setMapURL(mapsData[0].texto_campo);
            } catch (error) {
                console.log("Error fetching Google Maps:", error);
            }
        };

        fetchMision();
        fetchMaps();
    }, [editable, editable1]);


    // CRUD CARRUSEL

    const getRowId = (row) => {
        return row.idfoto;
    };

    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976d2' },
            },
        },
        esES,
    );

    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setImagePreview(null);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setImageUpload(null);
        setImagePreview(null);
    };

    const deleteImg = (refUrl) => {
        const imageRef = ref(storage, refUrl)
        deleteObject(imageRef)
            .catch((error) => {
                console.log("Failed to delete image: ", error)
            })
        window.location.reload();
    }

    const handleDeleteCarruselImage = async (id, url) => {

        if (CarruselData.length <= 1) {
            swal("El carrusel debe tener como mínimo una imagen!", {
                icon: "error",
            });
            return;
        }

        swal({
            title: "¿Estás seguro?",
            text: "Una vez borrado, no podrás recuperar esta imagen del carrusel.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    try {

                        await CarruselService.deletePicture(id);
                        console.log(url);
                        deleteImg(url);
                        swal("Imagen de carrusel eliminada exitosamente!", {
                            icon: "success",
                        });
                        fetchAllCarruselPics();
                    } catch (error) {
                        swal("Error al eliminar la imagen de carrusel. Por favor, inténtalo de nuevo más tarde.\n".concat(error.message), {
                            icon: "error",
                        });
                    }
                } else {
                    swal("¡Tu información no se ha borrado!");
                }
            });
    }

    ////////////////////

    const Carrusel = () => {

        if (!isFetching) {
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
        }

    };

    const [showEditButtons, setShowEditButtons] = useState(false);
    const toggleEditButtons = () => {
        setShowEditButtons(prev => !prev);
    };

    const [selectedImage, setSelectedImage] = useState();


    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        addPhoto(file);
        setSelectedImage(file);
    }

    const addPhoto = () => {
        const newPhoto = {
            id: Date.now(),
            url: URL.createObjectURL(selectedImage)
        };

        setCarruselData(prev => [...prev, newPhoto]);

    }

    const saveChanges = async () => {
        await fetch('/api/carrusel', {
            method: 'POST',
            body: JSON.stringify(CarruselData)
        });
        console.log('Cambios guardados!');
    }
    let urlDelete;
    return (
        <div className="scrollable-page">
            <Topbar />

            <Carrusel />

            <Modal
                open={modalOpen}
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                closeAfterTransition BackdropProps={{ onClick: () => { } }}>
                <div className='modal-container-carrusel modalServicios-carrusel'>
                    <div className='modified-crudGrid'>
                        <div>
                            <div className="button-container" style={{ display: 'flex', paddingTop: '5%', justifyContent: 'center', alignItems: 'center' }}>
                                <label htmlFor="urlfoto" className="customFileLabel" style={{ marginTop: '5%', marginLeft: '32%', backgroundColor: '#1E60A6', fontWeight: 'bold' }}>
                                    <FontAwesomeIcon icon={faPlus} size="2x" />
                                    Agregar foto</label>
                                <input
                                    type="file"
                                    onChange={(event) => {
                                        imageUpload = event.target.files[0];
                                        imagePreview = URL.createObjectURL(event.target.files[0]);

                                        const selectedFile = event.target.files[0];
                                        if (selectedFile) {
                                            handleModalSubmit(event);
                                        }
                                    }}
                                    name='urlfoto'
                                    id="urlfoto"
                                    className="customFileInput"
                                />
                            </div>
                            <div className='headerDiv'>
                                <h2>Carrusel de imágenes</h2>
                            </div>

                            <button className="cancelButton" onClick={handleModalClose}>
                                <FontAwesomeIcon icon={faTimes} size="2x" />
                            </button>
                            <div className='dataGridBox'>

                                <ThemeProvider theme={theme}>
                                    {CarruselData.length > 0 ? (
                                        <DataGrid
                                            rows={CarruselData}
                                            getRowId={getRowId}
                                            rowHeight={150}

                                            columns={[
                                                {
                                                    field: 'Imagen',
                                                    headerName: 'Imagen',
                                                    flex: 5,
                                                    headerClassName: 'column-header',
                                                    renderCell: (params) => {
                                                        const { id, row } = params;
                                                        urlDelete = row.url;
                                                        return (
                                                            <div key={id} >
                                                                <img src={row.url} class="carrusel-crud-image-img" alt={`imagen ${row.idfoto}`} />
                                                            </div>
                                                        );
                                                    },
                                                },
                                                {
                                                    field: 'status',
                                                    headerName: '',
                                                    flex: 1,
                                                    renderCell: (params) => (

                                                        <IconButton style={{ justifySelf: 'flex-end' }} onClick={() => handleDeleteCarruselImage(params.id, urlDelete)}>
                                                            <Delete />
                                                        </IconButton>
                                                    ),
                                                },
                                            ]}
                                            onCellEditStop={(params, event) => {
                                                if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                                                    event.defaultMuiPrevented = true;
                                                }
                                            }}
                                        />
                                    ) : (
                                        <p>Cargando carrusel...</p>
                                    )}
                                </ThemeProvider>
                            </div>
                        </div>
                    </div>
                </div >
            </Modal >
            {isLoggedIn && userType !== 'normal' && (
                <button className='edit-button' onClick={toggleEditButtons}>
                    <FontAwesomeIcon icon={faCog} style={{ fontSize: '25px', padding: '5px', color: '#1E60A6' }} />
                </button>
            )}
            {showEditButtons && (
                <div style={{ height: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                    <label onClick={handleModalOpen} className="customFileLabel" style={{ marginTop: '0%', backgroundColor: '#1E60A6', fontWeight: 'bold' }}>Editar Carrusel</label>
                </div>
            )}

            <div className="content-header-banner">
                NUESTROS <span style={{ color: '#223240', marginLeft: '10px' }}>SERVICIOS</span>
            </div>

            <div className="services-container">
                <ServiceComponent
                    title={titulo1OBJ.texto_campo}
                    description={descripcion1OBJ.texto_campo}
                    icon={servicesData[0].icon}
                    isEditMode={editAll}
                    TipoTitulo={titulo1OBJ}
                    TipoDesc={descripcion1OBJ}

                />
                <ServiceComponent
                    title={titulo2OBJ.texto_campo}
                    description={descripcion2OBJ.texto_campo}
                    icon={servicesData[1].icon}
                    isEditMode={editAll}
                    TipoTitulo={titulo2OBJ}
                    TipoDesc={descripcion2OBJ}
                />
                <ServiceComponent
                    title={titulo3OBJ.texto_campo}
                    description={descripcion3OBJ.texto_campo}
                    icon={servicesData[2].icon}
                    isEditMode={editAll}
                    TipoTitulo={titulo3OBJ}
                    TipoDesc={descripcion3OBJ}
                />
            </div>
            <div class="button-container">
                <button class="see-more-button servicecomponent" onClick={handleServicesClick}>Ver más...</button>
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
                            value={editedMission}
                            onChange={handleChange}
                            rows="10"
                            style={{ width: '100%' }} 
                            maxLength={maxDescriptionCharacters}/>
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
                            value={editedMapURL} // Usar editedMapURL en lugar de mapURL
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
        </div >
    );
};

export default Home;
