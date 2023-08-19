import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../HojaDeEstilos/LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import EditUserInfo from '../Dashboard/EditUserInfo.jsx';
import TopBar from '../Home/Topbar.jsx';
import ExpedientesService from '../../Services/ExpedientesService';
import UsuariosService from '../../Services/UsuariosService';
import IniciarSesion from '../Home/IniciarSesion.jsx';
import { CorporateFareTwoTone } from '@mui/icons-material';


const LandingPage = () => {
    const isLoggedIn = localStorage.getItem("100");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [expedientes, setExpedientes] = useState([]);
    const [selectedExpediente, setSelectedExpediente] = useState(null);
    const navigate = useNavigate();
    const [altura, setAltura] = useState('');
    const email = IniciarSesion.email;
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    const correo = localStorage.getItem("correo");
    console.log("ESTE ES EL CORREO: " + correo);
    const [perfil, setPerfil] = useState({});
    let cont = 0;

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

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {

        //validación login
        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            navigate("/iniciarsesion"); // Redirige a la página de inicio de sesión
        }
        const fetchPerfil = async () => {
            try {
                const perfilData = await UsuariosService.getOneUser(correo);
                setPerfil({
                    correo: perfilData[0],
                    nombre: perfilData[1],
                    edad: perfilData[2],
                    preguntaSeguridad: perfilData[3],
                    respuestaSeguridad: perfilData[4],
                });
            } catch (error) {
                console.log(error);
            }
        }
        const fetchUsuarios = async () => {
            const usuariosObtenidos = await ExpedientesService.getExpedientes(correo);
            setUsuarios(usuariosObtenidos);
        }
        fetchPerfil();
        fetchUsuarios();
    }, [isLoggedIn]);

    const formatDate = (date) => {
        var datePrefs = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("es-HN", datePrefs);
    }

    const formatAppointmentDate = (date) => {
        var datePrefs = { month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString("es-HN", datePrefs).toLocaleUpperCase();
    }


    const handleOpenEditModal = () => {
        setSelectedExpediente(expediente);
        console.log(expediente)
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setSelectedExpediente(null);
        setIsEditModalOpen(false);
    };

    const handleViewExpediente = (id) => {
        navigate(`/expedientes/dashboard/${id}`);
     };


    return (
        <div className='scrollable-page'>
            <TopBar />
            <div className='contenidos'>
                <div className='patient-sections'>
                    <div className='profile-picture-and-edits'>
                        <div className='perfile'>
                            <FontAwesomeIcon icon={faUser} className='iconoUsers' />
                        </div>
                        <button onClick={handleOpenEditModal} className='editButton'>Editar</button>
                        {isEditModalOpen && (
                            <EditUserInfo
                                expedientess={expediente}
                                onClose={handleCloseEditModal}
                            />
                        )}
                    </div>
                    <div className='infoP'>
                        <h2 className="nombres">{perfil.nombre}</h2>
                        <p className='smallTexts'>Correo:  <span style={{ color: '#464646', marginLeft: '10px' }}>{perfil.correo}</span></p>
                        <hr className="linea" />
                        <p className="smallTexts">Edad: <span style={{ color: '#464646', marginLeft: '10px' }}>{perfil.edad}</span></p>
                        <hr className="linea" />
                        <p className="smallTexts">Pregunta de Seguridad: <span style={{ color: '#464646', marginLeft: '10px' }}>{perfil.preguntaSeguridad}</span></p>
                        <hr className="linea" />
                    </div>
                </div>
                <div className="files">
                    <div className='box-title'>
                        <h3 className='archivostit'>Expedientes relacionados al perfil</h3>
                    </div>
                    <ul className="file-list">
                        {usuarios.map((usuario, index) => {

                            return (
                                <div key={usuario.idPaciente}>
                                    <li>{usuario.nombre}</li>
                                    {index !== usuarios.length - 1 && (
                                        <hr className="divider" />
                                    )}
                                    <button onClick={() => handleViewExpediente(usuario.idPaciente)}>Ver Perfil
                                 </button>
                                </div>
                            )
                        })}
                    </ul>
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