import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext.js';
import { useNavigate } from 'react-router-dom';
import '../HojaDeEstilos/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFile, faTrash, faFilePdf, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { faRulerVertical } from '@fortawesome/free-solid-svg-icons';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import EditExpedienteDashboardModal from './EditExpedienteDashboardModal.jsx';
import NavBar from '../NavBar';
import TopBar from '../Home/Topbar.jsx';
import moment from 'moment';
import 'moment/locale/es';
import swal from 'sweetalert';
import ArchivosService from '../../Services/ArchivosService';
import ExpedientesService from '../../Services/ExpedientesService';
import Topbar from '../Home/Topbar.jsx';
import Grid from '@mui/material/Grid';
import { storage } from '../../firebase';
import 'firebase/compat/storage';
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

const Dashboard = () => {
    const { isLoggedIn, userType } = useContext(AuthContext);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [expedientes, setExpedientes] = useState([]);
    const [selectedExpediente, setSelectedExpediente] = useState(null);
    const navigate = useNavigate();

    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    
    const [expediente, setExpediente] = React.useState({
        idpaciente: '',
        nombre: '',
        edad: '',
        fecha_nacimiento: '',
        sexo: '',
        correo: '',
        telefono: '',
        numid: null,
        estado_civil: '',
        padecimientos: '',
        ocupacion: '',
        altura: '',
        peso: '',
        temperatura: '',
        ritmo_cardiaco: '',
        presion: '',
    })

    const [patient, setPatient] = useState({
        idpaciente: '',
        nombre: '',
        edad: '',
        fecha_nacimiento: '',
        sexo: '',
        correo: '',
        telefono: '',
        numid: '',
        estado_civil: '',
        padecimientos: '',
        ocupacion: '',
        address: '',
        altura: '',
        peso: '',
        temperatura: '',
        ritmo_cardiaco: '',
        presion: '',

        medicalHistory: {
            allergies: ['Alergia 1', 'Alergia 2'],
            basicConditions: ['Enfermedad 1', 'Enfermedad 2'],
        },
        medications: ['Medicamento 1', 'Medicamento 2'],
        files: ['archivo1.pdf', 'archivo2.jpg', 'archivo3.pdf', 'archivo4.pdf', 'archivo5.pdf'],

        appointments: [
            {
                date: '01/06/2023',
                time: '10:00 AM',
                description: 'Descripción de la cita',
            },
            {
                date: '10/06/2023',
                time: '03:00 PM',
                description: 'Descripción de la cita',
            },
        ],
    });

    const [medications, setMedications] = useState(['Medicamento 1', 'Medicamento 2', 'Medicamento 3', 'Medicamento 4', 'Medicamento 5', 'Medicamento 6', 'Medicamento 7', 'Medicamento 8', 'Medicamento 9', 'Medicamento 10', 'Medicamento 11', 'Medicamento 12']);
    const [alergias, setAlergias] = useState(['Alergia 1', 'Alergia 2', 'Alergia 3', 'Alergia 4']);
    const [enfermedades, setEnfermadades] = useState(['Enfermedad 1', 'Enfermedad 2', 'Enfermedad 3', 'Enfermedad 4']);
    const [schAppointments, setSchAppointments] = useState([]);
    const [prevAppointments, setPrevAppointments] = useState([]);
    const [lastAppointment, setLastAppointment] = useState({});
    const [archivos, setArchivos] = useState({});
    const [archivoUpload, setArchivoUpload] = useState([]);
    const [archivo, setArchivo] = React.useState({
        filename: '',
        filetype: '',
        url: '',
        idpaciente: '',
    });
    moment.locale('es');

    const fetchExpediente2 = async () => {
        try {
            const expedienteData = await ExpedientesService.getOneExpedienteDashboard(id);
            
            setExpediente(expedienteData);
            setPatient(prevPatient => ({
                ...prevPatient,
                idpaciente: expedienteData.idpaciente,
                nombre: expedienteData.nombre,
                edad: expedienteData.edad,
                fecha_nacimiento: formatDate(expedienteData.fecha_nacimiento),
                sexo: (expedienteData.sexo === "M") ? 'Masculino' : 'Femenino',
                correo: expedienteData.correo,
                telefono: expedienteData.telefono,
                numid: expedienteData.numid,
                estado_civil: expedienteData.estado_civil,
                padecimientos: expedienteData.padecimientos,
                ocupacion: expedienteData.ocupacion,
                altura: expedienteData.altura,
                peso: expedienteData.peso,
                temperatura: expedienteData.temperatura,
                ritmo_cardiaco: expedienteData.ritmo_cardiaco,
                presion: expedienteData.presion,
            }));
        } catch (error) {
            
        }
    };

    useEffect(() => {

        const fetchExpediente = async () => {
            try {
                const expedienteData = await ExpedientesService.getOneExpedienteDashboard(id);
                setExpediente(expedienteData);

                setPatient(prevPatient => ({
                    ...prevPatient,
                    idpaciente: expedienteData.idpaciente,
                    nombre: expedienteData.nombre,
                    edad: expedienteData.edad,
                    fecha_nacimiento: formatDate(expedienteData.fecha_nacimiento),
                    sexo: (expedienteData.sexo === "M") ? 'Masculino' : 'Femenino',
                    correo: expedienteData.correo,
                    telefono: expedienteData.telefono,
                    numid: expedienteData.numid,
                    estado_civil: expedienteData.estado_civil,
                    padecimientos: expedienteData.padecimientos,
                    ocupacion: expedienteData.ocupacion,
                    direccion: expedienteData.direccion,
                    altura: expedienteData.altura,
                    peso: expedienteData.peso,
                    temperatura: expedienteData.temperatura,
                    ritmo_cardiaco: expedienteData.ritmo_cardiaco,
                    presion: expedienteData.presion,
                }));
            } catch (error) {
                
            }
        };

        const fetchAppointments = async () => {
            try {
                const appointments = await ExpedientesService.getCitasOneExpediente(id);

                const scheduled = appointments.filter(appointment => appointment.estado === "Pendiente");
                const previous = appointments.filter(appointment => appointment.estado !== "Pendiente");

                setSchAppointments(scheduled.reverse());
                setPrevAppointments(previous.reverse());
                if (previous.length > 0) {
                    setLastAppointment(previous.at(0));
                }
            } catch (error) {
                
            }
        };

        const fetchArchivos = async () => {
            try {
                const archivosF = await ArchivosService.getArchivos(id);
                setArchivos(archivosF);
            } catch (error) {
                
            }
        }

        fetchArchivos();
        fetchAppointments();
        fetchExpediente();
    }, [id]);
    //validación login
    if (!isLoggedIn) {
        navigate("/iniciarsesion");
    }
    const formatDate = (date) => {
        var datePrefs = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("es-HN", datePrefs);
    }

    const formatAppointmentDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "DIA NO VALIDO";
        }
        const options = { month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString("es-HN", options).toUpperCase();
        return formattedDate;
    };

    const formatAppointmentTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date(0, 0, 0, hours, minutes);

        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const formatVitalsDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "DIA NO VALIDO";
        }
        const options = { month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString("es-HN", options);
        return formattedDate;
    };

    async function uploadFile() {

        return new Promise((resolve, reject) => {
            // Your file upload logic here
            // Call resolve with the imageUrl when the upload is complete
            // Call reject with an error if there's an issue with the upload
            // For example:
            if (archivoUpload == null) {
                //reject(new Error('No file selected for upload'));
                return null;
            }

            const imageRef = ref(storage, `images/${archivoUpload.name + v4()}`);
            uploadBytes(imageRef, archivoUpload)
                .then((snapshot) => getDownloadURL(snapshot.ref))
                .then((url) => {
                    resolve(url);
                    //
                })
                .catch((error) => reject(error));
        });
    };

    const handleAgregarArchivo = async () => {
        const file = archivoUpload;
        console.log(file);
        if (!file || !validateImageFormat(file)) {
            console.log("Invalid file or format");
            return;
        }
    
        try {
            const archivoURL = await uploadFile();
            
            const updatedArchivo = {
                url: archivoURL,
                filename: archivoUpload.name,
                filetype: archivoUpload.type,
                idpaciente: expediente.idpaciente,
            };
    
            // Update the state with the new file information
            setArchivo(updatedArchivo);
    
            // Perform any other operations you need with the updatedArchivo object
    
            // Show success message
            swal("Archivo Agregado!", {
                icon: "success",
            });
    
        } catch (error) {
            // Handle error if any
            console.log("Error: " + error);
        } finally {
            // Always clear archivoUpload after all operations
            setArchivoUpload(null);
        }
    }

    const validateImageFormat = (file) => {
        const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        const maxSizeInBytes = 10 * 1024 * 1024; // 5MB
        if (!allowedFormats.includes(file.type)) {
            return false;
        }
        if (file.size > maxSizeInBytes) {
            return false;
        }
        return true;
    };

    const handleAppointmentClick = (idcita) => {
        navigate(`/citas_tabla/historial_cita/${idcita}`)
    };

    {/* Editar Button  */ }

    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [isChangesSaved, setIsChangesSaved] = useState(false);

    const [isEditingLabel2, setIsEditingLabel2] = useState(false);
    const [isChangesSaved2, setIsChangesSaved2] = useState(false);

    const [isEditingLabel3, setIsEditingLabel3] = useState(false);
    const [isChangesSaved3, setIsChangesSaved3] = useState(false);


    const handleLabelEdit = () => {
        setIsEditingLabel(true);
        setIsChangesSaved(false);
    };

    const handleLabelEdit2 = () => {
        setIsEditingLabel2(true);
        setIsChangesSaved2(false);
    };

    const handleLabelEdit3 = () => {
        setIsEditingLabel3(true);
        setIsChangesSaved3(false);
    };

    const validacionesSignos = () => {
        if (patient.altura > 280) {
            swal({
                title: "Error al ingresar datos",
                text: "La altura ingresada no es válida",
                icon: "error"
            });
            return false;
        }
        if (patient.peso > 250) {
            swal({
                title: "Error al ingresar datos",
                text: "El peso ingresado no es válido",
                icon: "error"
            });
            return false;
        }
        if (patient.temperatura > 50 || patient.temperatura < 31.2) {
            swal({
                title: "Error al ingresar datos",
                text: "La temperatura ingresada no es válida",
                icon: "error"
            });
            return false;
        }

        const regexFinal = /\b([1-9]\d{1,2})\/([1-9]\d{1,2})\b/g;

        if (!regexFinal.test(patient.presion)) {
            swal({
                title: "Error al ingresar datos",
                text: "El ritmo cardíaco no es válido",
                icon: "error"
            });
            return false;
        }
        if (patient.presion)
            return true;

    }

    const handleSaveChangesSignos = () => {
        console.log(patient.idpaciente)


        const editExpediente = async () => {
            if (validacionesSignos()) {
                console.log(patient)
                await ExpedientesService.editExpedientesDashboard(patient.idpaciente, patient);
                swal({
                    title: "Expediente editado",
                    text: "¡Expediente editado satisfactoriamente!",
                    icon: "success"
                });
                setIsEditingLabel(false);
                setIsChangesSaved(true);
            }
        };
        console.log(patient)
        editExpediente();
    };

    const handleSaveChanges2 = () => {
        setIsEditingLabel2(false);
        setIsChangesSaved2(true);
    };

    const handleSaveChanges3 = () => {
        setIsEditingLabel3(false);
        setIsChangesSaved3(true);
    };

    const handleSignosLabelChange = (e) => {
        const { name, value } = e.target;
        const wholeNumberRegex = /^\d*$/
        const decimalRegex = /^\d*\.?\d*$/
        const fractionRegex = /(?:[1-9][0-9]*|0)\/[1-9][0-9]*/g
        // setPatient((prevPatient) => ({
        //     ...prevPatient,
        //     [name]: value,
        // }));
        if (name === 'altura') {
            if (decimalRegex.test(value)) {
                setPatient((prevPatient) => ({
                    ...prevPatient,
                    [name]: value,
                }));
            }
        } else if (name === 'peso') {
            if (decimalRegex.test(value)) {
                setPatient((prevPatient) => ({
                    ...prevPatient,
                    [name]: value,
                }));
            }
        } else if (name === 'temperatura') {
            if (decimalRegex.test(value)) {
                setPatient((prevPatient) => ({
                    ...prevPatient,
                    [name]: value,
                }));
            }
        } else if (name === 'ritmo_cardiaco') {
            if (wholeNumberRegex.test(value)) {
                setPatient((prevPatient) => ({
                    ...prevPatient,
                    [name]: value,
                }));
            }
        } else if (name === 'presion') {
            if (true) {
                setPatient((prevPatient) => ({
                    ...prevPatient,
                    [name]: value,
                }));
            }
        }
    };

    const handleMedicationChange = (index, newValue) => {
        const updatedMedications = [...medications];
        updatedMedications[index] = newValue;
        setMedications(updatedMedications);
    };

    const handleAlergiasChange = (index, newValue) => {
        const updatedAlergias = [...alergias];
        updatedAlergias[index] = newValue;
        setAlergias(updatedAlergias);
    };

    const handleEnfermedadesChange = (index, newValue) => {
        const updatedEnfermedades = [...enfermedades];
        updatedEnfermedades[index] = newValue;
        setEnfermadades(updatedEnfermedades);
    };

    const handleOpenEditModal = () => {
        setSelectedExpediente(expediente);
        console.log(expediente)

        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setSelectedExpediente(null);
        setIsEditModalOpen(false);
        fetchExpediente2();
    };

    const handleVolver = () => {
        navigate(-1);
    };


    const handleOnClickAgendarCita = () => {
        navigate("/expedientes/dashboard/:expedienteId/cita_expediente")
    };

    const toggleVitalsInfo = (event) => {
        const element = event.currentTarget;
        const extraInfo = element.querySelector('.vitals-history');
        const isExpanded = extraInfo.classList.contains('expanded');

        const allVitalsHistory = document.querySelectorAll('.vitals-history');
        allVitalsHistory.forEach((history) => {
            history.classList.remove('expanded');
        });

        if (!isExpanded) {
            extraInfo.classList.add('expanded');
        }
    };

    const handleDeleteFile = (index) => {
        ///////////////
    }


    const handleOpenFile = (fileName) => {
        //////////////////
    }

    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();

        switch (extension) {
            case 'pdf':
                return <FontAwesomeIcon icon={faFilePdf} style={{ color: '#FF5733', fontSize: '24px' }} />;
            case 'jpg':
            case 'jpeg':
            case 'png':
                return <FontAwesomeIcon icon={faFileImage} style={{ color: '#33AFFF', fontSize: '24px' }} />;
            // Add more cases for other file types as needed
            default:
                return <FontAwesomeIcon icon={faFile} style={{ color: '#0000FF', fontSize: '24px' }} />;
        }
    }


    return (
        <div class='scrollable-page'>
            {userType !== 'normal' && (

                <NavBar />
            )}
            {userType === 'normal' && (
                <>
                    <Topbar />
                    <button class='botonVolver' onClick={handleVolver}>Volver</button>
                </>
            )}


            <div class='contenido'>
                <div class='patient-section'>

                    <div class="infoGeneral">
                        <div class='profile-picture-and-edit'>
                            <div class='perfil'>
                                <FontAwesomeIcon icon={faUser} className='iconoUser' />
                            </div>
                            {userType !== 'normal' && (
                                <button onClick={handleOpenEditModal} class='editButton'>Editar</button>
                            )}
                            {isEditModalOpen && (
                                <EditExpedienteDashboardModal
                                    expedientess={expediente}
                                    onClose={handleCloseEditModal}
                                />
                            )}
                        </div>

                        <div class='patient-info-vert-align'>
                            <h2 class="nombre"> {patient.nombre}</h2>
                            <div class='patient-email-container'>
                                {patient.correo}
                            </div>
                            <p class="smallText">{patient.numid}</p>
                            <p class="smallText">{patient.sexo}</p>
                            <div class='space-between-text'>
                                <p class="smallText">{patient.fecha_nacimiento}</p>
                                <p class="smallText">{patient.edad} años</p>
                            </div>
                            <div class='space-between-text'>
                                <p class="smallText">{patient.estado_civil}</p>
                                <p class="smallText">{patient.ocupacion}</p>
                            </div>
                            <p class="smallText">{patient.address}</p>
                        </div>
                    </div>

                    <div class="vitals">
                        <div class='box-title'>
                            <h3 class='histmedtit'>Signos Vitales
                                {/* <span>
                                    {isEditingLabel ? (<>
                                        <button onClick={handleSaveChangesSignos} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                            Guardar cambios
                                        </button>
                                        <button onClick={handleCancelarEditSignos} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                            Cancelar
                                        </button>
                                    </>
                                    ) : (
                                        userType !== 'normal' && (
                                            <button onClick={handleLabelEdit} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                                Editar
                                            </button>
                                        )
                                    )}
                                </span> */}
                            </h3>
                        </div>
                        {/* HEIGHT */}
                        <div class="vital-sign-container height" onClick={toggleVitalsInfo}>
                            <div style={{ color: '#75BD89' }} class="vital-sign-content">
                                <span class="vitals-label">
                                    <FontAwesomeIcon icon={faRulerVertical} style={{ color: '#75BD89', fontSize: '24px', marginRight: '22px' }} />
                                    <span
                                    // style={{ marginRight: '220px' }}
                                    >
                                        Altura
                                    </span>
                                </span>
                                <span class='vital-sign-value-align'>
                                    <span class="vitals-value">
                                        {isEditingLabel ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    class="edit-text-box"
                                                    name="altura"
                                                    style={{ width: '65px' }}
                                                    value={patient.altura}
                                                    onChange={handleSignosLabelChange}
                                                    placeholder='170'
                                                />
                                            </div>
                                        ) : (
                                            <span class="vitals-value">
                                                {(lastAppointment.altura !== null || lastAppointment.altura !== undefined)
                                                    ? lastAppointment.altura : '-'}
                                            </span>
                                        )}
                                    </span>
                                    <span class="vitals-value">CM</span>
                                </span>
                            </div>
                            <div class='vitals-history'>
                                {prevAppointments.slice(0, 5).map((appointment, index) => (
                                    <div key={index}>
                                        <span class='vitals-history-details'>
                                            {formatVitalsDate(appointment.fecha)}
                                        </span>
                                        <div class="vitals-history-details">
                                            <span class='vitals-value'>{appointment.altura}</span>
                                            <span class='vitals-value'>CM</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* WEIGHT */}
                        <div class="vital-sign-container weight" onClick={toggleVitalsInfo}>
                            <div style={{ color: '#54648D' }} class="vital-sign-content">
                                <span class="vitals-label">
                                    <FontAwesomeIcon icon={faWeightScale} style={{ color: '#54648D', fontSize: '24px', marginRight: '10px' }} />
                                    <span
                                    // style={{ marginRight: '280px' }}
                                    >
                                        Peso
                                    </span>
                                </span>
                                <span class='vital-sign-value-align'>
                                    <span class="vitals-value">
                                        {isEditingLabel ? (
                                            <div >
                                                <input
                                                    type="text"
                                                    class="edit-text-box"
                                                    name="peso"
                                                    style={{ width: '60px' }}
                                                    value={patient.peso}
                                                    onChange={handleSignosLabelChange}
                                                    placeholder='63.3'
                                                />
                                            </div>
                                        ) : (
                                            <span class="vitals-value">
                                                {(lastAppointment.peso !== null || lastAppointment.peso !== undefined)
                                                    ? lastAppointment.peso : '-'}
                                            </span>
                                        )}
                                    </span>
                                    <span class="vitals-value">KG</span>
                                </span>
                            </div>
                            <div class='vitals-history'>
                                {prevAppointments.slice(0, 5).map((appointment, index) => (
                                    <div key={index}>
                                        <span class='vitals-history-details'>
                                            {formatVitalsDate(appointment.fecha)}
                                        </span>
                                        <div class="vitals-history-details">
                                            <span class='vitals-value'>{appointment.peso}</span>
                                            <span class='vitals-value'>KG</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* TEMPERATURA */}
                        <div class="vital-sign-container temperature" onClick={toggleVitalsInfo}>
                            <div style={{ color: '#916A9E' }} class="vital-sign-content">
                                <span class="vitals-label">
                                    <FontAwesomeIcon icon={faTemperatureLow} style={{ color: '#916A9E', fontSize: '24px', marginRight: '10px' }} />
                                    <span
                                    // style={{ marginRight: '150px' }}
                                    >
                                        Temperatura
                                    </span>
                                </span>
                                <span class='vital-sign-value-align'>
                                    <span class="vitals-value">
                                        {isEditingLabel ? (
                                            <div >
                                                <input
                                                    type="text"
                                                    class="edit-text-box"
                                                    name="temperatura"
                                                    style={{ width: '65px' }}
                                                    value={patient.temperatura}
                                                    onChange={handleSignosLabelChange}
                                                    placeholder='37.2'
                                                />
                                            </div>
                                        ) : (
                                            <span class="vitals-value">
                                                {(lastAppointment.temperatura !== null || lastAppointment.temperatura !== undefined)
                                                    ? lastAppointment.temperatura : '-'}
                                            </span>
                                        )}
                                    </span>
                                    <span class="vitals-value">ºC</span>
                                </span>
                            </div>
                            <div class='vitals-history'>
                                {prevAppointments.slice(0, 5).map((appointment, index) => (
                                    <div key={index}>
                                        <span class='vitals-history-details'>
                                            {formatVitalsDate(appointment.fecha)}
                                        </span>
                                        <div class="vitals-history-details">
                                            <span class='vitals-value'>{appointment.temperatura}</span>
                                            <span class='vitals-value'>ºC</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RITMO CARDIACO */}
                        <div class="vital-sign-container heart-rate" onClick={toggleVitalsInfo}>
                            <div style={{ color: '#AB2525' }} class="vital-sign-content">
                                <span class="vitals-label">
                                    <FontAwesomeIcon icon={faHeartPulse} style={{ color: '#AB2525', fontSize: '24px', marginRight: '10px' }} />
                                    <span
                                    // style={{ marginRight: '170px' }}
                                    >
                                        Ritmo Cardiaco
                                    </span>
                                </span>
                                <span class='vital-sign-value-align'>
                                    <span class="vitals-value">
                                        {isEditingLabel ? (
                                            <div >
                                                <input
                                                    class="edit-text-box"
                                                    type="text"
                                                    name="ritmo_cardiaco"
                                                    style={{ width: '60px' }}
                                                    value={patient.ritmo_cardiaco}
                                                    onChange={handleSignosLabelChange}
                                                    placeholder='80'
                                                />
                                            </div>
                                        ) : (
                                            <span class="vitals-value">
                                                {(lastAppointment.ritmo_cardiaco !== null || lastAppointment.ritmo_cardiaco !== undefined)
                                                    ? lastAppointment.ritmo_cardiaco : '-'}
                                            </span>
                                        )}
                                    </span>
                                    <span class="vitals-value">ppm</span>
                                </span>
                            </div>
                            <div class='vitals-history'>
                                {prevAppointments.slice(0, 5).map((appointment, index) => (
                                    <div key={index}>
                                        <span class='vitals-history-details'>
                                            {formatVitalsDate(appointment.fecha)}
                                        </span>
                                        <div class="vitals-history-details">
                                            <span class='vitals-value'>{appointment.ritmo_cardiaco}</span>
                                            <span class='vitals-value'>ppm</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PRESION */}
                        <div class="vital-sign-container pressure" onClick={toggleVitalsInfo}>
                            <div style={{ color: '#AB2525' }} class="vital-sign-content">
                                <span class="vitals-label">
                                    <FontAwesomeIcon icon={faHeartPulse} style={{ color: '#AB2525', fontSize: '24px', marginRight: '10px' }} />
                                    <span
                                    // style={{ width: '300px', marginRight: '10px' }}
                                    >
                                        Presión Arterial
                                    </span>
                                </span>
                                <span class='vital-sign-value-align'>
                                    <span class="vitals-value">
                                        {isEditingLabel ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    class="edit-text-box"
                                                    name="presion"
                                                    style={{ width: '80px' }}
                                                    value={patient.presion}
                                                    onChange={handleSignosLabelChange}
                                                    placeholder='120/80'
                                                />
                                            </div>
                                        ) : (
                                            <span class="vitals-value">
                                                {(lastAppointment.presion !== null || lastAppointment.presion !== undefined)
                                                    ? lastAppointment.presion : '-'}
                                            </span>
                                        )}
                                    </span>
                                    <span class="vitals-value">mmHg</span>
                                </span>
                            </div>
                            <div class='vitals-history'>
                                {prevAppointments.slice(0, 5).map((appointment, index) => (
                                    <div key={index} style={{ borderColor: '#AB2525' }}>
                                        <span class='vitals-history-details'>
                                            {formatVitalsDate(appointment.fecha)}
                                        </span>
                                        <div class="vitals-history-details">
                                            <span class='vitals-value'>{appointment.presion}</span>
                                            <span class='vitals-value'>mmHg</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div class="files">
                        <div class='box-title'>
                            <h3 class='archivostit'>Archivos</h3>
                        </div>
                        <ul className="file-list">
                            {patient.files.map((file, index) => (
                                <div key={index} className='file-item-line'>
                                    <div className="file-info">
                                        <div className="file-icon">
                                            {getFileIcon(file)} 
                                        </div>
                                        <li className='lifile'>{file}</li>
                                        <button onClick={() => handleDeleteFile(index)}>
                                            <FontAwesomeIcon icon={faTrash} style={{ color: '#FF0000', fontSize: '24px' }} />
                                        </button>
                                        <button onClick={() => handleOpenFile(file)}>
                                            <FontAwesomeIcon icon={faFile} style={{ color: '#0000FF', fontSize: '24px' }} />
                                        </button>
                                    </div>
                                    {index !== patient.files.length - 1 && (
                                        <div className="divider-container">
                                            <hr className='divider'></hr>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </ul>



                        {userType !== 'normal' && (
                            <Grid item xs={12} sm={6}>
                                <label htmlFor="urlfoto" className="customFileLabel"  >Subir Archivo</label>
                                <input
                                    type="file"
                                    onChange={(event) => {
                                        setArchivoUpload(event.target.files[0]);
                                        console.log(archivoUpload);
                                        handleAgregarArchivo();
                                    }}
                                    name='urlfoto'
                                    id="urlfoto"
                                    className="customFileInput"
                                />
                            </Grid>
                        )}
                    </div>


                </div>

                <div class="patient-section">

                    <div class='medHis'>

                        <div class='box-title'>
                            <h3 class='histmedtit'>Historial Médico
                                <span>
                                    {isEditingLabel2 ? (<>
                                        <button onClick={handleSaveChanges2} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                            Guardar cambios
                                        </button>
                                        <button onClick={() => setIsEditingLabel2(false)} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                            Cancelar
                                        </button>
                                    </>
                                    ) : (
                                        userType !== 'normal' && (
                                            <button onClick={handleLabelEdit2} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                                Editar
                                            </button>
                                        )
                                    )}
                                </span>
                            </h3>
                        </div>

                        <div class="alergias">
                            <p class="section-label">Alergias:</p>
                            <ul class="section-value">
                                {alergias.map((alergias, index) => (
                                    <li key={index}>
                                        {isEditingLabel2 ? (
                                            <input
                                                class="edit-text-box small"
                                                type="text"
                                                value={alergias}
                                                style={{ width: '98%' }}
                                                onChange={(e) => handleAlergiasChange(index, e.target.value)}
                                            />
                                        ) : (
                                            alergias
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div class="enfermedades">
                            <p class="section-label">Enfermedades Base:</p>
                            <ul class="section-value">
                                {enfermedades.map((enfermedades, index) => (
                                    <li key={index}>
                                        {isEditingLabel2 ? (
                                            <input
                                                class="edit-text-box small"
                                                type="text"
                                                value={enfermedades}
                                                style={{ width: '98%' }}
                                                onChange={(e) => handleEnfermedadesChange(index, e.target.value)}
                                            />
                                        ) : (
                                            enfermedades
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div class='medicamentos'>
                        <div class='box-title'>
                            <h3 class='medtit'>Medicamentos
                                <span>
                                    {isEditingLabel3 ? (
                                        <>
                                            <button onClick={handleSaveChanges3} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                                Guardar cambios
                                            </button>
                                            <button onClick={() => setIsEditingLabel3(false)} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        userType !== 'normal' && (
                                            <button onClick={handleLabelEdit3} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                                Editar
                                            </button>
                                        )
                                    )}
                                </span>

                            </h3>
                        </div>
                        <ul class="section-value">
                            {medications.map((medication, index) => (
                                <li key={index}>
                                    {isEditingLabel3 ? (
                                        <input
                                            class="edit-text-box small"
                                            type="text"
                                            value={medication}
                                            style={{ width: '98%' }}
                                            onChange={(e) => handleMedicationChange(index, e.target.value)}
                                        />
                                    ) : (
                                        medication
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div class="patient-section appointments-section">
                    {userType !== 'normal' && (
                        <button class='large-button schedule-date' onClick={handleOnClickAgendarCita}>
                            <FontAwesomeIcon icon={faCalendarPlus} />
                            Agendar Cita
                        </button>

                    )}
                    <div class='appointments-container'>

                        <div class='box-title appointments-title'>Citas Agendadas</div>
                        <div class='appointments'>
                            {schAppointments.map((appointment, index) => (
                                <div key={index} class='appointment' onClick={() => handleAppointmentClick(appointment.idcita)}>
                                    <div class='appointment-date'>
                                        {formatAppointmentDate(appointment.fecha)}
                                    </div>
                                    <div class='appointment-details'>
                                        <span class='appointment-light-text'>{formatAppointmentTime(appointment.hora)}</span>
                                        <span class='appointment-light-text'>{appointment.estado}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div class='box-title appointments-title'>Citas Previas</div>
                        <div class='appointments'>
                            {prevAppointments.map((appointment, index) => (
                                <div key={index} class='appointment prev-appointment' onClick={() => handleAppointmentClick(appointment.idcita)}>
                                    <div class='appointment-date'>
                                        {formatAppointmentDate(appointment.fecha)}
                                    </div>
                                    <div class='appointment-details'>
                                        {/* <span>{appointment.description}</span> */}
                                        <span class='appointment-light-text'>{formatAppointmentTime(appointment.hora)}</span>
                                        <span class='appointment-light-text'>{appointment.Diagnostico}</span>
                                        {/* <span class='appointment-light-text'>{appointment.estado}</span> */}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div >
        </div>

    );
};

export default Dashboard;