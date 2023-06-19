import React, { useState, useEffect } from 'react';
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
import EditExpedienteDashboardModal from '../Dashboard/EditExpedienteDashboardModal.jsx';
import NavBar from '../NavBar';

import ExpedientesService from '../../Services/ExpedientesService';


const Dashboard = () => {
    const isLoggedIn = localStorage.getItem("400");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [expedientes, setExpedientes] = useState([]);
    const [selectedExpediente, setSelectedExpediente] = useState(null);
    const navigate = useNavigate();
    const [altura, setAltura] = useState('');

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
        ocupacion: '',
        altura: '',
    })

    const [schAppointments, setSchAppointments] = useState([{
        date: '2023-06-17',
        time: '10:00 AM',
        description: 'Dolor de cabeza',
    },
    {
        date: '2023-06-20',
        time: '10:00 AM',
        description: 'Migraña',
    },
    {
        date: '2023-06-20',
        time: '10:00 AM',
        description: 'Migraña',
    },
    {
        date: '2023-06-20',
        time: '10:00 AM',
        description: 'Migraña',
    }
    ]);
    const [prevAppointments, setPrevAppointments] = useState([{
        date: '2023-05-17',
        time: '10:00 AM',
        description: 'Dolor de estomago',
        medicine: 'Acetaminofén',
        medicalExplanation: 'Lumbalgia'
    },
    {
        date: '2023-05-20',
        time: '10:00 AM',
        description: 'Fiebre',
        medicine: 'Acetaminofén',
        medicalExplanation: 'Lumbalgia'
    },
    {
        date: '2023-05-20',
        time: '10:00 AM',
        description: 'Fiebre',
        medicine: 'Acetaminofén',
        medicalExplanation: 'Lumbalgia'
    },
    {
        date: '2023-05-20',
        time: '10:00 AM',
        description: 'Fiebre',
        medicine: 'Acetaminofén',
        medicalExplanation: 'Lumbalgia'
    }
    ]);

    const formatDate = (date) => {
        var datePrefs = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("es-HN", datePrefs);
    }

    const formatAppointmentDate = (date) => {
        var datePrefs = { month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString("es-HN", datePrefs).toLocaleUpperCase();
    }

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
        ocupacion: '',
        address: '',
    });


    function Signout() {
        localStorage.clear();
        navigate('/');
    }

    function enviar_A_Crud() {
        navigate('/administrador');
    }

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

        //validación login
        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            navigate("/iniciarsesion"); // Redirige a la página de inicio de sesión
        }

        const fetchExpediente = async () => {
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

        fetchExpediente();
    }, [id]);

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
            alert("La altura ingresada no es valida");
            return false;
        }
        if (patient.peso > 250) {
            alert("el peso ingresado no es valido");
        }
        if (patient.temperatura > 43) {
            alert("La temperatura ingresada es invalida");
        }
    
     const regexFinal=/\b([1-9]\d{1,2})\/([1-9]\d{1,2})\b/g;
   
        if (!regexFinal.test(patient.presion)) {
            alert("El ritmo cardiaco ingresado es invalido");
            return false;
        }
        if(patient.presion)

        return true;

    }

    const handleSaveChangesSignos = () => {
        console.log(patient.idpaciente)


        const editExpediente = async () => {
            if (validacionesSignos()) {
                console.log(patient)
                await ExpedientesService.editExpedientesDashboard(patient.idpaciente, patient);
                alert('Expediente Editado');
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

    const hanldeSignosLabelChange = (e) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditingLabel(false);
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

    const handleCancelarEditSignos = () => {
        setIsEditingLabel(false);
        fetchExpediente2();
    };

    return (
        <div className='scrollable-page'>
            <NavBar />
            <div className='contenido'>
                <div className='patient-section'>
                    <div className="infoGeneral">
                        <div className='profile-picture-and-edit'>
                            <div className='perfil'>
                                <FontAwesomeIcon icon={faUser} className='iconoUser' />
                            </div>
                            <button onClick={handleOpenEditModal} className='editButton'>Editar</button>
                            {isEditModalOpen && (
                                <EditExpedienteDashboardModal
                                    expedientess={expediente}
                                    onClose={handleCloseEditModal}
                                />
                            )}
                        </div>
                        <div className='patient-info-vert-align'>
                            <h2 className="nombre"> Nombre</h2>
                            <div className='patient-email-container'>
                                Correo
                            </div>
                            <p className="smallText">Numero de ID</p>
                            <p className="smallText">Sexo</p>
                            <div className='space-between-text'>
                                <p className="smallText">Fecha Nacimiento</p>
                                <p className="smallText">Edad</p>
                            </div>
                            <div className='space-between-text'>
                                <p className="smallText">Estado Civil</p>
                                <p className="smallText">Ocupacion</p>
                            </div>
                            <p className="smallText">Direccion</p>
                        </div>
                    </div>
                    <div className="vitals">
                        <div className='box-title'>
                            <h3 className='histmedtit'>Signos Vitales
                                <span>
                                    {isEditingLabel ? (<>
                                        <button onClick={handleSaveChangesSignos} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                            Guardar cambios
                                        </button>
                                        <button onClick={handleCancelarEditSignos} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                            Cancelar
                                        </button>
                                    </>
                                    ) : (
                                        <button onClick={handleLabelEdit} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                            Editar
                                        </button>
                                    )}
                                </span>
                            </h3>
                        </div>
                        <div style={{ color: '#75BD89' }} className="vital-sign-content">
                            <span className="vitals-label">
                                <FontAwesomeIcon icon={faRulerVertical} style={{ color: '#75BD89', fontSize: '24px', marginRight: '22px' }} />
                                <span>
                                    Altura
                                </span>
                            </span>
                            <span className='vital-sign-value-align'>
                                <span className="vitals-value">
                                    {isEditingLabel ? (
                                        <div >
                                            <input
                                                type="text"
                                                className="edit-text-box"
                                                name="altura"
                                                style={{ width: '65px' }}
                                                value={altura}
                                                onChange={hanldeSignosLabelChange}
                                            />
                                        </div>
                                    ) : (
                                        <span className="vitals-value">altura</span>
                                    )}
                                </span>
                                <span className="vitals-value">CM</span>
                            </span>
                        </div>
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
                                                style={{ width: '55px' }}
                                                value={patient.peso}
                                                onChange={hanldeSignosLabelChange}
                                            />
                                        </div>
                                    ) : (
                                        <span className="vitals-value">{patient.peso}</span>
                                    )}
                                </span>
                                <span className="vitals-value">KG</span>
                            </span>
                        </div>
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
                                                onChange={hanldeSignosLabelChange}
                                            />
                                        </div>
                                    ) : (
                                        <span className="vitals-value">{patient.temperatura}</span>
                                    )}
                                </span>
                                <span className="vitals-value">ºC</span>
                            </span>
                        </div>
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
                                                onChange={hanldeSignosLabelChange}
                                            />
                                        </div>
                                    ) : (
                                        <span className="vitals-value">{patient.ritmo_cardiaco}</span>
                                    )}
                                </span>
                                <span className="vitals-value">ppm</span>
                            </span>
                        </div>
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
                                                onChange={hanldeSignosLabelChange}
                                            />
                                        </div>
                                    ) : (
                                        <span className="vitals-value">{patient.presion}</span>
                                    )}
                                </span>
                                <span className="vitals-value">mmHg</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="patient-section appointments-section">
                    <button className='large-button schedule-date'>
                        <FontAwesomeIcon icon={faCalendarPlus} />
                        Agendar Cita
                    </button>

                    <div className='appointments-container'>

                        <div className='box-title appointments-title'>Citas Agendadas</div>
                        <div className='appointments'>
                            {schAppointments.map((appointment, index) => (
                                <div key={index} className='appointment'>
                                    <div className='appointment-date'>
                                        {formatAppointmentDate(appointment.date)}
                                    </div>
                                    <div className='appointment-details'>
                                        <span>{appointment.description}</span>
                                        <span className='appointment-light-text'>{appointment.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='box-title appointments-title'>Citas Previas</div>
                        <div className='appointments'>
                            {prevAppointments.map((appointment, index) => (
                                <div key={index} className='appointment prev-appointment'>
                                    <div className='appointment-date'>
                                        {formatAppointmentDate(appointment.date)}
                                    </div>
                                    <div className='appointment-details'>
                                        <span>{appointment.description}</span>
                                        <span className='appointment-light-text'>{appointment.time}</span>
                                        <span className='appointment-light-text'>{appointment.medicalExplanation}</span>
                                        <span className='appointment-light-text'>{appointment.medicine}</span>
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