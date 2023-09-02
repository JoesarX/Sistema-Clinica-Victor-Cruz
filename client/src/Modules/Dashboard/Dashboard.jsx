import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext.js';
import { useNavigate } from 'react-router-dom';
import '../HojaDeEstilos/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
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

import ExpedientesService from '../../Services/ExpedientesService';
import Topbar from '../Home/Topbar.jsx';


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

    moment.locale('es');

    const fetchExpediente2 = async () => {
        try {
            const expedienteData = await ExpedientesService.getOneExpedienteDashboard(id);
            console.log(expedienteData);
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
            console.log(error);
        }
    };

    useEffect(() => {



        const fetchExpediente = async () => {
            try {
                const expedienteData = await ExpedientesService.getOneExpedienteDashboard(id);
                console.log(expedienteData);
                setExpediente(expedienteData);

                const citas = await ExpedientesService.getCitasOneExpediente(id);
                console.log(citas)


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
                console.log(error);
            }
        };

        const fetchAppointments = async () => {
            try {
                const appointments = await ExpedientesService.getCitasOneExpediente(id)

                const scheduled = appointments.filter(appointment => appointment.estado === "Pendiente");
                const previous = appointments.filter(appointment => appointment.estado !== "Pendiente");
                
                setSchAppointments(scheduled.reverse());
                setPrevAppointments(previous.reverse());
                setLastAppointment(previous.slice(-1));
            } catch (error) {
                console.log(error);
            }
        }

        
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


    const handleUploadFile = (event) => {
        const file = event.target.files[0];
        // Lógica para subir el archivo al servidor y actualizar el estado
        // de los archivos en el paciente
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

    return (
        <div className='scrollable-page'>
            {userType !== 'normal' && (

                <NavBar />
            )}
            {userType === 'normal' && (
                <>
                    <Topbar />
                    <button className='botonVolver' onClick={handleVolver}>Volver</button>
                </>
            )}


            <div className='contenido'>
                <div className='patient-section'>

                    <div className="infoGeneral">
                        <div className='profile-picture-and-edit'>
                            <div className='perfil'>
                                <FontAwesomeIcon icon={faUser} className='iconoUser' />
                            </div>
                            {userType !== 'normal' && (
                                <button onClick={handleOpenEditModal} className='editButton'>Editar</button>
                            )}
                            {isEditModalOpen && (
                                <EditExpedienteDashboardModal
                                    expedientess={expediente}
                                    onClose={handleCloseEditModal}
                                />
                            )}
                        </div>

                        <div className='patient-info-vert-align'>
                            <h2 className="nombre"> {patient.nombre}</h2>
                            <div className='patient-email-container'>
                                {patient.correo}
                            </div>
                            <p className="smallText">{patient.numid}</p>
                            <p className="smallText">{patient.sexo}</p>
                            <div className='space-between-text'>
                                <p className="smallText">{patient.fecha_nacimiento}</p>
                                <p className="smallText">{patient.edad} años</p>
                            </div>
                            <div className='space-between-text'>
                                <p className="smallText">{patient.estado_civil}</p>
                                <p className="smallText">{patient.ocupacion}</p>
                            </div>
                            <p className="smallText">{patient.address}</p>
                        </div>
                    </div>

                    <div className="vitals">
                        <div className='box-title'>
                            <h3 className='histmedtit'>Signos Vitales
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
                            <div style={{ color: '#75BD89' }} className="vital-sign-content">
                                <span className="vitals-label">
                                    <FontAwesomeIcon icon={faRulerVertical} style={{ color: '#75BD89', fontSize: '24px', marginRight: '22px' }} />
                                    <span
                                    // style={{ marginRight: '220px' }}
                                    >
                                        Altura
                                    </span>
                                </span>
                                <span className='vital-sign-value-align'>
                                    <span className="vitals-value">
                                        {isEditingLabel ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    className="edit-text-box"
                                                    name="altura"
                                                    style={{ width: '65px' }}
                                                    value={patient.altura}
                                                    onChange={handleSignosLabelChange}
                                                    placeholder='170'
                                                />
                                            </div>
                                        ) : (
                                            <span className="vitals-value">
                                                {(lastAppointment.altura !== null || lastAppointment.altura !== undefined)
                                                    ? lastAppointment.altura : '-'}
                                            </span>
                                        )}
                                    </span>
                                    <span className="vitals-value">CM</span>
                                </span>
                            </div>
                            <div class='vitals-history'>
                                {prevAppointments.slice(0, 5).map((appointment, index) => (
                                    <div key={index}>
                                        <span class='vitals-history-details'>
                                            {formatVitalsDate(appointment.fecha)}
                                        </span>
                                        <div class="vitals-history-details">
                                            <span className='vitals-value'>{appointment.altura}</span>
                                            <span className='vitals-value'>CM</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* WEIGHT */}
                        <div class="vital-sign-container weight" onClick={toggleVitalsInfo}>
                            <div style={{ color: '#54648D' }} className="vital-sign-content">
                                <span className="vitals-label">
                                    <FontAwesomeIcon icon={faWeightScale} style={{ color: '#54648D', fontSize: '24px', marginRight: '10px' }} />
                                    <span
                                    // style={{ marginRight: '280px' }}
                                    >
                                        Peso
                                    </span>
                                </span>
                                <span className='vital-sign-value-align'>
                                    <span className="vitals-value">
                                        {isEditingLabel ? (
                                            <div >
                                                <input
                                                    type="text"
                                                    className="edit-text-box"
                                                    name="peso"
                                                    style={{ width: '60px' }}
                                                    value={patient.peso}
                                                    onChange={handleSignosLabelChange}
                                                    placeholder='63.3'
                                                />
                                            </div>
                                        ) : (
                                            <span className="vitals-value">
                                                {(lastAppointment.peso !== null || lastAppointment.peso !== undefined)
                                                    ? lastAppointment.peso : '-'}
                                            </span>
                                        )}
                                    </span>
                                    <span className="vitals-value">KG</span>
                                </span>
                            </div>
                            <div class='vitals-history'>
                                {prevAppointments.slice(0, 5).map((appointment, index) => (
                                    <div key={index}>
                                        <span class='vitals-history-details'>
                                            {formatVitalsDate(appointment.fecha)}
                                        </span>
                                        <div class="vitals-history-details">
                                            <span className='vitals-value'>{appointment.peso}</span>
                                            <span className='vitals-value'>KG</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* TEMPERATURA */}
                        <div class="vital-sign-container temperature" onClick={toggleVitalsInfo}>
                            <div style={{ color: '#916A9E' }} className="vital-sign-content">
                                <span className="vitals-label">
                                    <FontAwesomeIcon icon={faTemperatureLow} style={{ color: '#916A9E', fontSize: '24px', marginRight: '10px' }} />
                                    <span
                                    // style={{ marginRight: '150px' }}
                                    >
                                        Temperatura
                                    </span>
                                </span>
                                <span className='vital-sign-value-align'>
                                    <span className="vitals-value">
                                        {isEditingLabel ? (
                                            <div >
                                                <input
                                                    type="text"
                                                    className="edit-text-box"
                                                    name="temperatura"
                                                    style={{ width: '65px' }}
                                                    value={patient.temperatura}
                                                    onChange={handleSignosLabelChange}
                                                    placeholder='37.2'
                                                />
                                            </div>
                                        ) : (
                                            <span className="vitals-value">
                                                {(lastAppointment.temperatura !== null || lastAppointment.temperatura !== undefined)
                                                    ? lastAppointment.temperatura : '-'}
                                            </span>
                                        )}
                                    </span>
                                    <span className="vitals-value">ºC</span>
                                </span>
                            </div>
                            <div class='vitals-history'>
                                {prevAppointments.slice(0, 5).map((appointment, index) => (
                                    <div key={index}>
                                        <span class='vitals-history-details'>
                                            {formatVitalsDate(appointment.fecha)}
                                        </span>
                                        <div class="vitals-history-details">
                                            <span className='vitals-value'>{appointment.temperatura}</span>
                                            <span className='vitals-value'>ºC</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RITMO CARDIACO */}
                        <div class="vital-sign-container heart-rate" onClick={toggleVitalsInfo}>
                            <div style={{ color: '#AB2525' }} className="vital-sign-content">
                                <span className="vitals-label">
                                    <FontAwesomeIcon icon={faHeartPulse} style={{ color: '#AB2525', fontSize: '24px', marginRight: '10px' }} />
                                    <span
                                    // style={{ marginRight: '170px' }}
                                    >
                                        Ritmo Cardiaco
                                    </span>
                                </span>
                                <span className='vital-sign-value-align'>
                                    <span className="vitals-value">
                                        {isEditingLabel ? (
                                            <div >
                                                <input
                                                    className="edit-text-box"
                                                    type="text"
                                                    name="ritmo_cardiaco"
                                                    style={{ width: '60px' }}
                                                    value={patient.ritmo_cardiaco}
                                                    onChange={handleSignosLabelChange}
                                                    placeholder='80'
                                                />
                                            </div>
                                        ) : (
                                            <span className="vitals-value">
                                                {(lastAppointment.ritmo_cardiaco !== null || lastAppointment.ritmo_cardiaco !== undefined)
                                                    ? lastAppointment.ritmo_cardiaco : '-'}
                                            </span>
                                        )}
                                    </span>
                                    <span className="vitals-value">ppm</span>
                                </span>
                            </div>
                            <div class='vitals-history'>
                                {prevAppointments.slice(0, 5).map((appointment, index) => (
                                    <div key={index}>
                                        <span class='vitals-history-details'>
                                            {formatVitalsDate(appointment.fecha)}
                                        </span>
                                        <div class="vitals-history-details">
                                            <span className='vitals-value'>{appointment.ritmo_cardiaco}</span>
                                            <span className='vitals-value'>ppm</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PRESION */}
                        <div class="vital-sign-container pressure" onClick={toggleVitalsInfo}>
                            <div style={{ color: '#AB2525' }} className="vital-sign-content">
                                <span className="vitals-label">
                                    <FontAwesomeIcon icon={faHeartPulse} style={{ color: '#AB2525', fontSize: '24px', marginRight: '10px' }} />
                                    <span
                                    // style={{ width: '300px', marginRight: '10px' }}
                                    >
                                        Presión Arterial
                                    </span>
                                </span>
                                <span className='vital-sign-value-align'>
                                    <span className="vitals-value">
                                        {isEditingLabel ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    className="edit-text-box"
                                                    name="presion"
                                                    style={{ width: '80px' }}
                                                    value={patient.presion}
                                                    onChange={handleSignosLabelChange}
                                                    placeholder='120/80'
                                                />
                                            </div>
                                        ) : (
                                            <span className="vitals-value">
                                                {(lastAppointment.presion !== null || lastAppointment.presion !== undefined)
                                                    ? lastAppointment.presion : '-'}
                                            </span>
                                        )}
                                    </span>
                                    <span className="vitals-value">mmHg</span>
                                </span>
                            </div>
                            <div class='vitals-history'>
                                {prevAppointments.slice(0, 5).map((appointment, index) => (
                                    <div key={index} style={{ borderColor: '#AB2525' }}>
                                        <span class='vitals-history-details'>
                                            {formatVitalsDate(appointment.fecha)}
                                        </span>
                                        <div class="vitals-history-details">
                                            <span className='vitals-value'>{appointment.presion}</span>
                                            <span className='vitals-value'>mmHg</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* <div className="files">
                        <div className='box-title'>
                            <h3 className='archivostit'>Archivos</h3>
                        </div>
                        <ul className="file-list">
                            {patient.files.map((file, index) => (
                                <div key={index} className='file-item-line'>
                                    <li className='lifile'>{file}</li>
                                    {index !== patient.files.length - 1 && <hr className='divider'></hr>}
                                </div>
                            ))}
                        </ul>
                        {userType !== 'normal' && (
                            <button className="large-button">
                                <span>
                                    <FontAwesomeIcon icon={faPlus} style={{ color: '#FFF', fontSize: '24px', marginRight: '20px' }} />
                                    Subir Archivo
                                </span>
                            </button>
                        )}
                    </div> */}

                </div>

                <div className="patient-section">

                    <div className='medHis'>

                        <div className='box-title'>
                            <h3 className='histmedtit'>Historial Médico
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

                        <div className="alergias">
                            <p className="section-label">Alergias:</p>
                            <ul className="section-value">
                                {alergias.map((alergias, index) => (
                                    <li key={index}>
                                        {isEditingLabel2 ? (
                                            <input
                                                className="edit-text-box small"
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

                        <div className="enfermedades">
                            <p className="section-label">Enfermedades Base:</p>
                            <ul className="section-value">
                                {enfermedades.map((enfermedades, index) => (
                                    <li key={index}>
                                        {isEditingLabel2 ? (
                                            <input
                                                className="edit-text-box small"
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

                    <div className='medicamentos'>
                        <div className='box-title'>
                            <h3 className='medtit'>Medicamentos
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
                        <ul className="section-value">
                            {medications.map((medication, index) => (
                                <li key={index}>
                                    {isEditingLabel3 ? (
                                        <input
                                            className="edit-text-box small"
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

                <div className="patient-section appointments-section">
                    {userType !== 'normal' && (
                        <button className='large-button schedule-date' onClick={handleOnClickAgendarCita}>
                            <FontAwesomeIcon icon={faCalendarPlus} />
                            Agendar Cita
                        </button>

                    )}
                    <div className='appointments-container'>

                        <div className='box-title appointments-title'>Citas Agendadas</div>
                        <div className='appointments'>
                            {schAppointments.map((appointment, index) => (
                                <div key={index} className='appointment'>
                                    <div className='appointment-date'>
                                        {formatAppointmentDate(appointment.fecha)}
                                    </div>
                                    <div className='appointment-details'>
                                        <span className='appointment-light-text'>{formatAppointmentTime(appointment.hora)}</span>
                                        <span className='appointment-light-text'>{appointment.estado}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='box-title appointments-title'>Citas Previas</div>
                        <div className='appointments'>
                            {prevAppointments.map((appointment, index) => (
                                <div key={index} className='appointment prev-appointment'>
                                    <div className='appointment-date'>
                                        {formatAppointmentDate(appointment.fecha)}
                                    </div>
                                    <div className='appointment-details'>
                                        {/* <span>{appointment.description}</span> */}
                                        <span className='appointment-light-text'>{formatAppointmentTime(appointment.hora)}</span>
                                        {/* <span className='appointment-light-text'>{appointment.medicalExplanation}</span> */}
                                        <span className='appointment-light-text'>{appointment.estado}</span>
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