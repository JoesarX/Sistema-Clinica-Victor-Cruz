import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../HojaDeEstilos/LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import EditUserInfo from '../Home/EditUser.jsx';
import TopBar from '../Home/Topbar.jsx';
import ExpedientesService from '../../Services/ExpedientesService';
import UsuariosService from '../../Services/UsuariosService';
import IniciarSesion from '../Home/IniciarSesion.jsx';
import swal from 'sweetalert';
import CitasService from '../../Services/CitasService';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Box, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material';
import Citas from '../CitasTabla/CitasTabla';
import { CorporateFareTwoTone } from '@mui/icons-material';
import bcrypt from 'bcryptjs';
import AddCitaLandingPage from './AddCitaLandingPage';
import PermissionChecker from '../Home/PermissionChecker.jsx';
import { AuthContext } from '../AuthContext.js';

const LandingPage = () => {
    const authContext = useContext(AuthContext);
    const allowSpecialPermission = true;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [Expedientes, setExpedientes] = useState([]);
    const [selectedExpediente, setSelectedExpediente] = useState(null);
    const [user, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();
    const [altura, setAltura] = useState('');
    const email = IniciarSesion.email;
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    const correo = localStorage.getItem("correo");

    const [perfil, setPerfil] = useState({});
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting2, setIsSubmitting2] = useState(false);
    const [idd, setID] = useState(null);
    const [selectMail, setMail] = useState([]);
    const [citaD, setCitaD] = useState([]);
    const [selectedNombre, setSelectedNombre] = useState('Ver Todas');
    const [selectedNombre2, setSelectedNombre2] = useState('Ver Todas');
    const [Expedientess, setExpedientess] = useState({
        idpaciente: '',
        nombre: '',
        edad: '',
    });

    const [cita, setCita] = useState({
        idcita: '',
        nombre_persona: '',
        estado: '',
        idpaciente: '',
        correouser: '',
        nombre: '',
        altura: null,
        peso: null,
        temperatura: null,
        ritmo_cardiaco: null,
        presion: null,

    });

    const cleanCita = async () => {
        cita.nombre_persona = null;
        cita.estado = null;
        cita.idpaciente = null;
        cita.correouser = null;
        cita.nombre = null;
        cita.fecha = new Date();
        cita.hora = null;
        setFecha(dayjs());
        setHora(null);
    };

    const handleEditDateChange = async (date) => {
        setFecha(date);
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''; // Format date using dayjs
        setAvailableTimes([]); // Clear availableTimes when date changes
        setHora(null); // Clear selected hora when date changes
        setCita((prevCita) => ({ ...prevCita, fecha: formattedDate }));
        const times = await CitasService.getAvailableTimes(formattedDate, cita.idcita);
        setAvailableTimes(times);

    };

    const [Usuarios, setUsuarios] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserId2, setSelectedUserId2] = useState(null);
    const [fecha, setFecha] = useState(dayjs());
    const [hora, setHora] = useState(null);

    useEffect(() => {
        console.log("ESTOY EN EL USE EFFECT")
        const fetchExpedientes = async () => {
            try {
                const expedientesData = await ExpedientesService.getUserExpedients(correo);
                console.log(expedientesData)
                const expedientesFormatted = expedientesData.map((expediente) => ({
                    idpaciente: expediente.idpaciente,
                    nombre: expediente.nombre,
                    edad: expediente.edad, // Assuming 'age' property exists in 'expediente' object
                    // Add other relevant properties from the 'Expedientes' table
                }));
                console.log("estoy tratando de hacer cositas")
                console.log(expedientesFormatted)
                const usuariosData = await UsuariosService.getAllusuarios();
                const usuariosFormatted = usuariosData.map((usuario) => {
                    return {
                        correouser: usuario.correouser,
                        // Add other relevant properties from the 'Usuario' table
                    };
                });

                setExpedientes(expedientesFormatted);
                setUsuarios(usuariosFormatted);

            } catch (error) {

            }
        }
        fetchExpedientes();

        let cont = 0;
        if (isSubmitting2) {
            fetchExpedientes();
        }

    }, [isSubmitting2]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleModal = async () => {
        console.log("HI ADD")
        setIsModalOpen(!isModalOpen);
        setIsSubmitting(false);
        cleanCita();

        const currentDate = new Date();
        const currentDayOfWeek = currentDate.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

        console.log("currentDayOfWeek: ", currentDayOfWeek);

        // Calculate the number of days to add to the current date to reach the next Monday
        let daysUntilNextMonday = 0

        if (currentDayOfWeek === 0) {
            daysUntilNextMonday = 1;
        } else if (currentDayOfWeek === 6) {
            daysUntilNextMonday = 2;
        }

        // Create a new date by adding the days to the current date
        const nextMonday = new Date(currentDate);
        nextMonday.setDate(currentDate.getDate() + daysUntilNextMonday);
        const formattedDate = dayjs(nextMonday).format('YYYY-MM-DD');
        const times = await CitasService.getAvailableTimes(formattedDate);
        const fechaAsDayjs = dayjs(formattedDate);
        setFecha(fechaAsDayjs);
        setAvailableTimes(times);
    };

    const toggleModal22 = async (id) => {
        setID(id);
        console.log(idd)
        try {
            const citaData = await CitasService.getOneCita(id);
            console.log(citaData)
            const selectedIdPaciente2 = Expedientes.find((expediente) => expediente.idpaciente === citaData.idpaciente);
            console.log(selectedIdPaciente2)
            setExpedientess(selectedIdPaciente2)
            console.log(selectedIdPaciente2)
            console.log("HELLOOOOO")
            const selectedCorreoUser2 = Usuarios.find((usuario) => usuario.correouser === citaData.correouser);
            setMail(selectedCorreoUser2)
            setCitaD([citaData])
            setCita(citaData);
            cita.idcita = citaData.idcita;
            cita.nombre_persona = citaData.nombre_persona;
            cita.estado = citaData.estado;
            cita.idpaciente = citaData.idpaciente;
            cita.correouser = citaData.correouser;
            cita.altura = citaData.altura;
            cita.peso = citaData.peso;
            cita.temperatura = citaData.temperatura;
            cita.ritmo_cardiaco = citaData.ritmo_cardiaco;
            cita.presion = citaData.presion;
            setHora(citaData.hora);
            setFecha(dayjs(citaData.fecha));
        } catch (error) {

        }
        setIsModalOpen1(!isModalOpen1);
        setIsSubmitting2(false);
    };

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

    const [usuarios, setUsuarioss] = useState([]);

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const perfilData = await UsuariosService.getOneUser(correo);
                setPerfil({
                    correo: perfilData[0],
                    nombre: perfilData[1],
                    edad: perfilData[2],
                    preguntaSeguridad: perfilData[3],
                    respuestaSeguridad: perfilData[4],
                    password: perfilData[5],
                });

            } catch (error) {

            }
            const futuraCita = await CitasService.getUserExpCitas(correo);
            //
            const validar_Futura = futuraCita.filter(futuraCita => futuraCita.estado === "Pendiente");
            const validar_Pasadas = futuraCita.filter(futuraCita => futuraCita.estado === "Terminada" || futuraCita.estado === "Expirada");
            const uniqueCitas = Array.from(new Set(validar_Futura.map(cita => cita.idcita)))
                .map(idcita => validar_Futura.find(cita => cita.idcita === idcita));
            setData(uniqueCitas.map((cita) => ({
                id: cita.idcita,
                date: cita.fecha,
                time: cita.hora,
                description: cita.nombre_persona,
                idpaciente: cita.idpaciente,
                estado: cita.estado
            })))
            const uniqueCitas2 = Array.from(new Set(validar_Pasadas.map(cita => cita.idcita)))
                .map(idcita => validar_Pasadas.find(cita => cita.idcita === idcita));
            setData2(uniqueCitas2.map((cita) => ({
                id: cita.idcita,
                date: cita.fecha,
                time: cita.hora,
                description: cita.nombre_persona,
                idpaciente: cita.idpaciente,
                estado: cita.estado
            })))
        }
        const fetchUsuarios = async () => {
            const usuariosObtenidos = await ExpedientesService.getExpedientes(correo);
            const filteredUsuarios = usuariosObtenidos.filter(usuario => usuario.edad < 18);

            setUsuarioss(filteredUsuarios);
        };

        fetchPerfil();
        fetchUsuarios();
    }, []);

    const performActionsAfterModalClose = () => {
        const fetchPerfil = async () => {
            try {
                console.log("probando cositas")
                const email = [correo, "AYUDA"];
                console.log(email)
                const expedienteData = await UsuariosService.getOneUser(email);
                console.log(expedienteData)
                const futuraCita = await CitasService.getUserExpCitas(email[0]);

                const validar_Futura = futuraCita.filter(futuraCita => futuraCita.estado === "Pendiente");
                const validar_Pasadas = futuraCita.filter(futuraCita => futuraCita.estado === "Terminada" || futuraCita.estado === "Expirada");
                const uniqueCitas = Array.from(new Set(validar_Futura.map(cita => cita.idcita)))
                    .map(idcita => validar_Futura.find(cita => cita.idcita === idcita));
                setData(uniqueCitas.map((cita) => ({
                    id: cita.idcita,
                    date: cita.fecha,
                    time: cita.hora,
                    description: cita.nombre_persona,
                    idpaciente: cita.idpaciente
                })))
                const uniqueCitas2 = Array.from(new Set(validar_Pasadas.map(cita => cita.idcita)))
                    .map(idcita => validar_Pasadas.find(cita => cita.idcita === idcita));
                setData2(uniqueCitas2.map((cita) => ({
                    id: cita.idcita,
                    date: cita.fecha,
                    time: cita.hora,
                    description: cita.nombre_persona,
                    idpaciente: cita.idpaciente
                })))

                setSchAppointments(data);
                setCFuturas(data);





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
                const perfilData = await UsuariosService.getOneUser(correo);
                setPerfil({
                    correo: perfilData[0],
                    nombre: perfilData[1],
                    edad: perfilData[2],
                    preguntaSeguridad: perfilData[3],
                    respuestaSeguridad: perfilData[4],
                    password: perfilData[5],
                });

            } catch (error) {

            }
        };
        const fetchUsuarios = async () => {
            const usuariosObtenidos = await ExpedientesService.getExpedientes(correo);
            const filteredUsuarios = usuariosObtenidos.filter(usuario => usuario.edad < 18);
            setUsuarioss(filteredUsuarios);
        };

        fetchPerfil();
        fetchUsuarios();
    };


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

        setSelectedUser(user);
        console.log(perfil)
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setSelectedUser(null);
        setIsEditModalOpen(false);
        performActionsAfterModalClose();
    };

    const handleViewExpediente = (id) => {
        navigate(`/expedientes/dashboard/${id}`);
    };

    const deleteUser = (email) => {
        swal({
            title: "¿Estás seguro?",
            text: "No podrás recuperar este usuario!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    await deleteAPI(email);
                    swal("Usuario eliminado correctamente!", {
                        icon: "success",
                    });
                    navigate("/iniciarsesion");
                } catch (error) {
                    swal("Ocurrió un error, intente nuevamente", {
                        icon: "error",
                    });
                }
            } else {
                swal("Operación cancelada");
            }
        });
    };

    const deleteAPI = async (email) => {
        try {
            const response = await UsuariosService.deleteusuarios(email);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const isWeekday = (date) => {
        const day = date.day();
        return day == 0 || day == 6; // 0 is Sunday, 6 is Saturday
    };

    const [availableTimes, setAvailableTimes] = useState([]);

    const selectedEstado = cita.estado;
    const listaEstado = ['Pendiente', 'Cancelar Cita']
    useEffect(() => {
        if (cita.idcita && cita.fecha) {
            const fetchAvailableTimes = async () => {
                try {
                    const formattedDate = cita.fecha ? dayjs(cita.fecha).format('YYYY-MM-DD') : ''
                    const times = await CitasService.getAvailableTimes(formattedDate, cita.idcita);
                    setAvailableTimes(times);

                } catch (error) {
                    // Handle the error
                }
            };
            fetchAvailableTimes();
        }
    }, [cita.fecha, fecha]);

    const EditHandler = async (e) => {
        console.log(cita)
        e.preventDefault();
        try {
            if (validations()) {
                const availableResponse = await CitasService.getCheckAvailability(cita.fecha, cita.hora, cita.idcita);
                const isAvailable = availableResponse.available;
                if (!isAvailable) {
                    swal("La hora que ha seleccionado ya ha sido ocupada.", {
                        icon: "warning",
                    });
                    setHora(null);
                    const formattedDate = cita.fecha ? dayjs(cita.fecha).format('YYYY-MM-DD') : ''
                    const times = await CitasService.getAvailableTimes(formattedDate, cita.idcita);
                    setAvailableTimes(times);
                } else {
                    if (cita.estado === "Cancelar Cita") {
                        cita.estado = "Cancelada";
                    }
                    submitEditCita();
                }
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        if (isSubmitting2) {
            submitEditCita();
        }
    }, [isSubmitting2]);

    const submitEditCita = async () => {
        try {
            if (cita.estado === "Cancelada") {
                await CitasService.editCitasUser(idd, cita);
                swal("Cita Editada Exitosamente!.", {
                    icon: "success",
                });
            } else {
                await CitasService.editCitas(idd, cita);
                swal("Cita Editada Exitosamente!.", {
                    icon: "success",
                });
            }
            toggleModal22();
            window.location.reload();
            cleanCita();
        } catch (error) {

        }
    };
    const validations = () => {
        const { nombre_persona, estado } = cita
        var lettersRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/;
        //Nombre validations
        if (nombre_persona === null || nombre_persona === '') {
            swal("Debe Agregarle un nombre a la Cita!", {
                icon: "error",
            });
            return false
        } else if (!nombre_persona.replace(/\s/g, '').length) {
            swal("El nombre no puede contener solo espacios.", {
                icon: "error",
            });
            return false
        } else if (nombre_persona.charAt(0) === ' ') {

            swal("El nombre no puede iniciar con un espacio.", {
                icon: "error",
            });
            return false
        } else if (nombre_persona.charAt(nombre_persona.length - 1) === ' ') {
            swal("El nombre no puede terminar con un espacio", {
                icon: "error",
            });
            return false
        } else if (!lettersRegex.test(nombre_persona)) {
            swal("Nombre invalido, no puede tener numeros ni caracteres especiales como @#$%.", {
                icon: "error",
            });
            return false;
        }

        if (estado === null || estado === '') {
            swal("Debe agregar un estado valido.", {
                icon: "error",
            });
            return false;
        }

        if (fecha === null || fecha === '') {
            swal("Debe Agregar una fecha valida", {
                icon: "error",
            });
            return false;
        } else if (fecha.format('YYYY-MM-DD') < dayjs().format('YYYY-MM-DD')) {
            swal("La fecha no puede ser menor a la fecha actual", {
                icon: "error",
            });
            return false;
        } else {
            cita.fecha = fecha.format('YYYY-MM-DD');
        }

        if (hora === null || hora === '') {
            swal("Debe agregar una hora valida", {
                icon: "warning",
            });
            return false;
        } else {
            const timeString = cita.hora;
            const [time, meridiem] = timeString.split(" ");
            const [hourString, minuteString] = time.split(":");
            const hour = parseInt(hourString, 10);
            const minute = parseInt(minuteString, 10);
            let hour24 = hour;
            // console.log(hour24)
            // console.log(meridiem)
            if (meridiem === "PM" && hour != 12) {
                hour24 += 12;
            }
            cita.hora = hour24 + ":" + minuteString + ":00";
        }

        if (fecha.format('YYYY-MM-DD') == dayjs().format('YYYY-MM-DD') && cita.hora < dayjs().format('HH:mm:ss')) {
            swal("La hora que ha seleccionado para hoy ya ha pasado.", {
                icon: "error",
            });
            return false;
        }
        return true;
    }

    const handleModalFieldChange = (e) => {
        setCita((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
        console.log(cita)
    }

    const handleDateChange = async (date) => {
        setFecha(date);
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''; // Format date using dayjs
        setAvailableTimes([]); // Clear availableTimes when date changes
        setHora(null); // Clear selected hora when date changes
        setCita((prevCita) => ({ ...prevCita, fecha: formattedDate }));
        const times = await CitasService.getAvailableTimes(formattedDate);
        setAvailableTimes(times);
    };


    const [filteredFuturaCita, setFilteredFuturaCita] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const email = [correo, "AYUDA"];
                const futuraCitaResponse = await CitasService.getUserExpCitas(email[0]);
                const futuraCitaFiltrada = futuraCitaResponse.filter(cita => {
                    if (selectedNombre === 'Ver Todas') {
                        return cita.estado === 'Pendiente';
                    }
                    return cita.estado === 'Pendiente' && cita.idpaciente === selectedUserId;
                });
                const uniqueCitas = Array.from(new Set(futuraCitaFiltrada.map(cita => cita.idcita)))
                    .map(idcita => futuraCitaFiltrada.find(cita => cita.idcita === idcita));
                setFilteredFuturaCita(uniqueCitas);
                const newData = uniqueCitas.map(cita => ({
                    id: cita.idcita,
                    date: cita.fecha,
                    time: cita.hora,
                    description: cita.nombre_persona,
                    idpaciente: cita.idpaciente
                }));
                setData(newData);
            } catch (error) {
                console.error('Error al obtener las citas:', error);
            }
        }
        console.log("SE EJECTUDO FETCH DATA")
        fetchData();
    }, [selectedNombre]);

    const [filteredPasadaCita, setFilteredPasadaCita] = useState([]);
    useEffect(() => {
        async function fetchData2() {
            try {
                const email = [correo, "AYUDA"];
                const pasadaCitaResponse = await CitasService.getUserExpCitas(email[0]);
                const pasadaCitaFiltrada = pasadaCitaResponse.filter(cita => {
                    if (selectedNombre2 === 'Ver Todas') {
                        return cita.estado === 'Terminada' || cita.estado === 'Expirada';
                    }
                    return cita.estado === 'Terminada' || cita.estado === 'Expirada' && cita.idpaciente === selectedUserId2;
                });
                const uniqueCitas = Array.from(new Set(pasadaCitaFiltrada.map(cita => cita.idcita)))
                    .map(idcita => pasadaCitaFiltrada.find(cita => cita.idcita === idcita));
                setFilteredPasadaCita(uniqueCitas);
                const newData = uniqueCitas.map(cita => ({
                    id: cita.idcita,
                    date: cita.fecha,
                    time: cita.hora,
                    description: cita.nombre_persona,
                    nombre: cita.nombre,
                    idpaciente: cita.idpaciente
                }));
                setData2(newData);
            } catch (error) {
                console.error('Error al obtener las citas:', error);
            }
        }
        fetchData2();
    }, [selectedNombre2]);

    const submitCita = async () => {
        // console.log("doneee");

        // console.log("Entra a agregar despues de validaciones");
        try {
            await CitasService.postCitas(cita);
            //
            console.log(cita)
            swal("Cita Agregada.", {
                icon: "success",
            });
            toggleModal();
            window.location.reload();
        } catch (error) {
            // Handle error if any
            // console.log('Error submitting cita:', error);
        }
    };


    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            cita.estado = "Pendiente";
            cita.correouser = perfil.correo;
            if (validations()) {
                // console.log("Entra a agregar despues de validaciones");
                // console.log("Fecha: " + cita.fecha + " Hora: " + cita.hora)
                const availableResponse = await CitasService.getCheckAvailability(cita.fecha, cita.hora);;
                const isAvailable = availableResponse.available;
                // console.log("isAvailable: " , isAvailable);

                if (!isAvailable) {
                    swal("La hora que ha seleccionado ya ha sido ocupada.", {
                        icon: "error",
                    });
                    setHora(null);
                    const formattedDate = cita.fecha ? dayjs(cita.fecha).format('YYYY-MM-DD') : ''
                    const times = await CitasService.getAvailableTimes(formattedDate);
                    setAvailableTimes(times);
                } else {
                    submitCita();
                }
            }
        } catch (error) {
            // Handle error if any
            // console.log('Error submitting cita:', error);
        }
    };




    return (

        <div className='scrollable-pageeee'>
            <PermissionChecker
                userType={authContext.userType}
                requiredPermissions={['normal','administrador','master']}
                allowSpecialPermission={allowSpecialPermission ? 'specialPermission' : null}
            >
                <TopBar />
                <div className='contenidoss'>
                    <div className='pat-fil'>
                        <div className='patient-sections'>
                            <div className='profile-picture-and-edits'>
                                <div className='perfile'>
                                    <FontAwesomeIcon icon={faUser} className='iconoUsers' />
                                </div>
                                <div className='buttonBox'>
                                    <button onClick={handleOpenEditModal} className="edit-button">
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>
                                    <button className="delete-button" onClick={() => deleteUser(perfil.correo)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                                {isEditModalOpen && (
                                    <EditUserInfo
                                        profile={perfil}
                                        onClose={handleCloseEditModal}
                                    />

                                )}
                            </div>
                            <div className='infoP'>
                                <h2 className="nombres">{perfil.nombre}</h2>
                                <p className='smallTexts'>Correo:  <span className='patient-email-container' style={{ color: '#464646', marginLeft: '10px' }}>{perfil.correo}</span></p>
                                <hr className="linea" />
                                <p className="smallTexts">Edad: <span style={{ color: '#464646', marginLeft: '10px' }}>{perfil.edad}</span></p>
                                <hr className="linea" />
                                <p className="smallTexts">Pregunta de Seguridad: <span style={{ color: '#464646', marginLeft: '10px' }}>{perfil.preguntaSeguridad}</span></p>
                                <hr className="linea" />
                                <div className="expedientesV">
                                    <div className='box-title'>
                                        <h3 className='vintit'>Expedientes relacionados al perfil</h3>
                                    </div>
                                    <ul className="evlist">
                                        {usuarios
                                            .filter(usuario => usuario.edad < 18)
                                            .map((usuario, index) => {
                                                return (
                                                    <div key={usuario.idPaciente} className="user-item">
                                                        <li className="user-info">
                                                            <span className="user-name">{usuario.nombre}</span>
                                                            <button
                                                                className="ver-perfil-button"
                                                                onClick={() => handleViewExpediente(usuario.idPaciente)}
                                                            >
                                                                Ver Expediente
                                                            </button>
                                                        </li>
                                                        {index !== usuarios.length - 1 && <hr className="linead" />}
                                                    </div>
                                                );
                                            })}
                                    </ul>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="appointments-section">
                        <button onClick={toggleModal} className='large-button schedule-date'>
                            <FontAwesomeIcon icon={faCalendarPlus} />
                            Agendar Cita
                        </button>
                        <div className='appointments-container'>
                            <div className='box-title appointments-title'>Citas Agendadas
                                <Autocomplete
                                    value={selectedNombre}
                                    options={['Ver Todas', ...usuarios.map(usuario => usuario.nombre)]}
                                    onChange={(event, newValue) => {
                                        setSelectedNombre(newValue);
                                        const selectedUser = usuarios.find(usuario => usuario.nombre === newValue);
                                        if (selectedUser) {
                                            setSelectedUserId(selectedUser.idPaciente);
                                        } else {
                                            setSelectedUserId(null);
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Filtrar por Nombre" />}
                                    sx={{ marginLeft: '10%', backgroundColor: '#F0F0F0', width: '60%', marginTop: '3%' }}
                                />
                            </div>
                            <div className='appointments'>
                                {data.map((appointment, index) => (
                                    <div key={index} className='appointment'>
                                        <div className='appointment-date'>
                                            {formatAppointmentDate(appointment.date)}
                                        </div>
                                        <div className='appointment-details'>
                                            <span>{appointment.description}</span>
                                            <span>{appointment.estado}</span>
                                            <span className='appointment-light-text'>{formatAppointmentTime(appointment.time)}</span>
                                        </div>
                                        <IconButton onClick={() => toggleModal22(appointment.id)}>
                                            <Edit />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                            <div className='box-title appointments-title'>Citas Previas
                                <Autocomplete
                                    value={selectedNombre2}
                                    options={['Ver Todas', ...usuarios.map(usuario => usuario.nombre)]}
                                    onChange={(event, newValue) => {
                                        setSelectedNombre2(newValue);
                                        const selectedUser = usuarios.find(usuario => usuario.nombre === newValue);
                                        if (selectedUser) {
                                            setSelectedUserId2(selectedUser.idPaciente);
                                        } else {
                                            setSelectedUserId2(null);
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Filtrar por Nombre" />}
                                    sx={{ marginLeft: '10%', backgroundColor: '#F0F0F0', width: '60%', marginTop: '3%' }}
                                />
                            </div>
                            <div className='appointments'>
                                {data2.map((appointment, index) => (
                                    <div key={index} className='appointment prev-appointment'>
                                        <div className='appointment-date'>
                                            {formatAppointmentDate(appointment.date)}
                                        </div>
                                        <div className='appointment-details'>
                                            <span>{appointment.description}</span>
                                            <span>{appointment.estado}</span>
                                            <span className='appointment-light-text'>{formatAppointmentTime(appointment.time)}</span>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div >
                <Modal open={isModalOpen1} onClose={toggleModal22} closeAfterTransition BackdropProps={{ onClick: () => { } }}>
                    <div className='modalContainer modalCitas'>
                        <div className='innerCard' key={cita.idcita} >
                            <h2 className="modalHeader">EDITAR CITA</h2>
                            <button className="cancelButton" onClick={toggleModal22}>
                                <FontAwesomeIcon icon={faTimes} size="2x" />
                            </button>
                            <Box
                                component="form" //edit modal
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    width: '100%', // Added width property
                                }}
                                noValidate
                                autoComplete="off"
                            >

                                <TextField id="nombre_persona" label="Nombre de la Cita" variant="outlined" name='nombre_persona' defaultValue={cita.nombre_persona} onChange={handleModalFieldChange} required />
                                <Autocomplete
                                    value={selectedEstado}
                                    disablePortal
                                    id="estado"
                                    required
                                    options={listaEstado}
                                    defaultValue={cita.estado}
                                    onChange={(event, newValue) =>
                                        setCita({
                                            ...cita,
                                            estado: newValue,
                                        })
                                    }
                                    renderInput={(params) => <TextField {...params} label="Estado" required />}
                                    ListboxProps={
                                        {
                                            style: {
                                                border: '1px solid BLACK'
                                            }
                                        }
                                    }
                                />
                                <Autocomplete

                                    disablePortal
                                    id="idpaciente"
                                    options={Expedientes}
                                    getOptionLabel={(expediente) => `${expediente.nombre} (${expediente.edad} años)`}
                                    onChange={(event, newValue) => {

                                        cita.idpaciente = newValue?.idpaciente;

                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="ID Paciente" />
                                    )}
                                    ListboxProps={
                                        {
                                            style: {
                                                maxHeight: '220px',
                                                border: '1px solid BLACK'
                                            }
                                        }
                                    }
                                />

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        id="fecha"
                                        onChange={handleEditDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                        shouldDisableDate={isWeekday} // Disable weekends
                                        label="Fecha"
                                        name='fecha'
                                        value={dayjs(fecha)}
                                    />
                                </LocalizationProvider>
                                <Autocomplete
                                    disablePortal
                                    id="hora"
                                    required
                                    options={availableTimes}
                                    value={hora}
                                    onChange={(event, newValue) => {
                                        setHora(newValue);
                                        setCita((prevCita) => ({ ...prevCita, hora: newValue }));
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Hora
                                        " required style={{ marginBottom: '0.45rem' }} />}
                                    ListboxProps={
                                        {
                                            style: {
                                                maxHeight: '300px',
                                                border: '1px solid BLACK'
                                            }
                                        }
                                    }
                                />
                                <Button onClick={EditHandler} variant="contained" style={{
                                    backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px',
                                    paddingLeft: '10px', paddingRight: '10px', width: '270px', fontSize: '18px', alignSelf: 'center'
                                }}>
                                    Editar Cita
                                </Button>
                            </Box>
                        </div>
                    </div>
                </Modal>
                <div>
                    <AddCitaLandingPage
                        isModalOpen={isModalOpen}
                        toggleModal={() => setIsModalOpen(!isModalOpen)}
                    />
                </div>
            </PermissionChecker>
        </div>
    );
};

export default LandingPage;