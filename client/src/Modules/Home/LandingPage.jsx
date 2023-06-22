import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../HojaDeEstilos/LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRulerVertical } from '@fortawesome/free-solid-svg-icons';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import EditExpedienteDashboardModal from '../Dashboard/EditExpedienteDashboardModal.jsx';
import TopBar from '../Home/Topbar.jsx';
import ExpedientesService from '../../Services/ExpedientesService';


const LandingPage = () => {
    const isLoggedIn = localStorage.getItem("100");
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

        const regexFinal = /\b([1-9]\d{1,2})\/([1-9]\d{1,2})\b/g;

        if (!regexFinal.test(patient.presion)) {
            alert("El ritmo cardiaco ingresado es invalido");
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
            <TopBar />
            <div className='contenido'>
                <div className='patient-section'>
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
                    <h2 className="nombre"> Nombre</h2>
                    <div className='patient-email-container'>
                        Correo
                    </div>
                    <p className="smallText">Numero de ID</p>
                    <p className="smallText">Sexo</p>
                    <p className="smallText">Fecha Nacimiento</p>
                    <p className="smallText">Edad</p>
                    <p className="smallText">Estado Civil</p>
                    <p className="smallText">Ocupacion</p>
                    <p className="smallText">Direccion</p>
                </div>
                <div className="appointments-section">
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

export default LandingPage;