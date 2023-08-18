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

import Services from '../../Services/CitasService';
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

    let contador = 0;
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
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
    const [cFuturas, setCFuturas] = useState([]);
    const [schAppointments, setSchAppointments] = useState([
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

    const fetchExpediente2 = async () => {
        console.log("FETCH 2.0: " + correo);
        if (contador == 0) {
            try {
                const email = [correo, "AYUDA"];
                const expedienteData = await ExpedientesService.getOneUser(email);
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
                console.log(patient.numid);
                console.log(patient.nombre);
            } catch (error) {
                console.log(error);
            }
            contador++;
            console.log(contador);
        }

    };

    //fetchExpediente2();



    useEffect(() => {

        //validación login
        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            navigate("/iniciarsesion"); // Redirige a la página de inicio de sesión
        }

        const fetchExpediente = async () => {
            console.log("CORREO 2.0: " + correo);

            try {
                const email = [correo, "AYUDA"];
                const expedienteData = await ExpedientesService.getOneUser(email);
                const futuraCita = await Services.getUserExpCitas(email[0]);

                console.log(futuraCita);
               // futuraCita=futuraCita.filter(futuraCita=>futuraCita.estado=== "Pendiente");
               const validar_Futura = futuraCita.filter(futuraCita=>futuraCita.estado=== "Pendiente");
               const validar_Pasadas = futuraCita.filter(futuraCita=>futuraCita.estado=== "Terminada" ||futuraCita.estado=== "Expirada" );
                setData(validar_Futura.map((cita) => ({
                    date: cita.fecha,
                    time: cita.hora,
                    description: cita.nombre_persona
                })))

                //para citas pasadas
                setData2(validar_Pasadas.map((cita) => ({
                    date: cita.fecha,
                    time: cita.hora,
                    description: cita.nombre_persona
                })))
                console.log(data);
                setSchAppointments(data);
                setCFuturas(data);
                console.log(cFuturas);
            
               

               

                // console.log( futuraCita[0].fecha)
                // console.log( futuraCita[0].hora)
                // console.log( futuraCita[0].nombre_persona)
                //  setSchAppointments(futuraCita=>({
                //      ...futuraCita,
                //      date: futuraCita.fecha,
                //     time :futuraCita.hora ,
                //     description : futuraCita.nombre_persona

                //  }));
                console.log(schAppointments);

                // schAppointments.description=futuraCita.nombre_persona;
                // schAppointments.time=futuraCita.hora;
                // schAppointments.date=futuraCita.fecha;

                console.log("info citas " + schAppointments);


                console.log("Citas Futuas: " + futuraCita.idcita);
                console.log("DATA OBTENIDA POR QUERY: " + expedienteData);
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

        fetchExpediente();
    }, [isLoggedIn]);

    /*if (contador === 0) {
        contador++;
        //fetchExpediente();
        console.log(contador);
    }*/

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
                        <h2 className="nombres">{patient.nombre}</h2>
                        <p className='smallTexts'>Correo:  <span style={{ color: '#464646', marginLeft: '10px' }}>{patient.correo}</span></p>
                        <hr className="linea" />
                        <p className="smallTexts">Numero de ID: <span style={{ color: '#464646', marginLeft: '10px' }}>{patient.numid}</span></p>
                        <hr className="linea" />
                        <p className="smallTexts">Numero de Teléfono: <span style={{ color: '#464646', marginLeft: '10px' }}>{patient.telefono}</span></p>
                        <hr className="linea" />
                        <p className="smallTexts">Sexo: <span style={{ color: '#464646', marginLeft: '10px' }}>{patient.sexo}</span></p>
                        <hr className="linea" />
                        <p className="smallTexts">Fecha Nacimiento: <span style={{ color: '#464646', marginLeft: '10px' }}>{patient.fecha_nacimiento}</span></p>
                        <hr className="linea" />
                        <p className="smallTexts">Edad: <span style={{ color: '#464646', marginLeft: '10px' }}>{patient.edad}</span></p>
                        <hr className="linea" />
                        <p className="smallTexts">Estado Civil: <span style={{ color: '#464646', marginLeft: '10px' }}>{patient.estado_civil}</span></p>
                        <hr className="linea" />
                        <p className="smallTexts">Ocupacion: <span style={{ color: '#464646', marginLeft: '10px' }}>{patient.ocupacion}</span></p>
                        <hr className="linea" />
                    </div>
                </div>
                <div className="appointments-section">
                    <button className='large-button schedule-date'>
                        <FontAwesomeIcon icon={faCalendarPlus} />
                        Agendar Cita
                    </button>
                    <div className='appointments-container'>
                        <div className='box-title appointments-title'>Citas Agendadas</div>
                        <div className='appointments'>
                            {data.map((appointment, index) => (
                                <div key={index} className='appointment'>
                                    <div className='appointment-date'>
                                        {formatAppointmentDate(appointment.date)}
                                    </div>
                                    <div className='appointment-details'>
                                        <span>{appointment.description}</span>
                                        <span className='appointment-light-text'>{formatAppointmentTime(appointment.time)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='box-title appointments-title'>Citas Previas</div>
                        <div className='appointments'>
                            {data2.map((appointment, index) => (
                                <div key={index} className='appointment prev-appointment'>
                                    <div className='appointment-date'>
                                        {formatAppointmentDate(appointment.date)}
                                    </div>
                                    <div className='appointment-details'>
                                        <span>{appointment.description}</span>
                                        <span className='appointment-light-text'>{formatAppointmentTime(appointment.time)}</span>
                                        
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