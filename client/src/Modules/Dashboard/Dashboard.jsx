import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../AuthContext.js';
import { useNavigate } from 'react-router-dom';
import '../HojaDeEstilos/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFile, faTrash, faFilePdf, faFileImage, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faRulerVertical } from '@fortawesome/free-solid-svg-icons';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import EditExpedienteDashboardModal from './EditExpedienteDashboardModal.jsx';

import Modal from '@mui/material/Modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Box, Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import Enfermedades from '../../Services/ExpedientesEnfermedadesServices.js'
import Alergias from '../../Services/ExpedientesAlergiasServices.js'
import Medicamentos from '../../Services/ExpedientesMedServices.js'
import NavBar from '../NavBar';
import TopBar from '../Home/Topbar.jsx';
import moment from 'moment';
import 'moment/locale/es';
import swal from 'sweetalert';
import ArchivosService from '../../Services/ArchivosService';
import ExpedientesService from '../../Services/ExpedientesService';
import CitasService from '../../Services/CitasService';
import Topbar from '../Home/Topbar.jsx';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { storage } from '../../firebase';
import 'firebase/compat/storage';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    getStorage,
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

    const [fecha, setFecha] = useState(dayjs());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [hora, setHora] = useState(null);

    const [medications, setMedications] = useState([]);
    const [alergias, setAlergias] = useState([]);
    const [enfermedades, setEnfermedades] = useState([]);

    const [updatedMedications, setUpdatedMedications] = useState([]);
    const [updatedAlergias, setUpdatedAlergias] = useState([]);
    const [updatedEnfermedades, setUpdatedEnfermedades] = useState([]);

    const [schAppointments, setSchAppointments] = useState([]);
    const [prevAppointments, setPrevAppointments] = useState([]);
    const [lastAppointment, setLastAppointment] = useState({});

    const [archivos, setArchivos] = useState([]);
    const [archivoUpload, setArchivoUpload] = useState([]);
    const [archivo, setArchivo] = React.useState({
        filename: '',
        filetype: '',
        url: '',
        idpaciente: '',
    });
    const [selectingAppointment, setSelectingAppointment] = useState(false);
    const [diffDate, setDiffDate] = useState(false);
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
                swal("Error al obtener archivos", {
                    icon: "error",
                });
            }
        }

        const fetchMedHis = async () => {
            try {
                const allergies = await Alergias.getAllAlergias(id);
                const medicine = await Medicamentos.getAllMeds(id);
                const enferm = await Enfermedades.getAllEnfermedades(id);

                console.log('FETCHED: ', medicine);

                const allergiesNEW = allergies.map(item => item.alergia);
                const medicineNEW = medicine.map(item => item.medicamento);
                const enfermNEW = enferm.map(item => item.enfermedad);

                setAlergias(allergiesNEW);
                setMedications(medicineNEW);
                setEnfermedades(enfermNEW);

                setUpdatedAlergias(allergiesNEW);
                setUpdatedMedications(medicineNEW);
                setUpdatedEnfermedades(enfermNEW);
            } catch (error) {
                swal("Error al obtener historial médico y medicamentos", {
                    icon: "error",
                });
            }
        }

        fetchArchivos();
        fetchAppointments();
        fetchExpediente();
        fetchMedHis();
    }, [id]);
    //validación login
    if (!isLoggedIn) {
        navigate("/iniciarsesion");
    }

    const fetchArchivos = async () => {
        try {
            const archivosF = await ArchivosService.getArchivos(id);
            setArchivos(archivosF);
        } catch (error) {
            swal("Error al obtener archivos", {
                icon: "error",
            });
        }
    }

    const formatDate = (date) => {
        const dateObj = new Date(date);
        dateObj.setDate(dateObj.getDate() + 1);
        const datePrefs = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString("es-HN", datePrefs);
    };

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

    const formatVitalsDate = (dateString, verbose = false) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "DIA NO VALIDO";
        }
        let options = { month: 'long', day: 'numeric' };
        if (verbose) {
            options = {
                ...options,
                year: 'numeric',
            }
        }
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

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile != null) {
            setArchivoUpload(selectedFile);
        }
    };

    useEffect(() => {
        if (archivoUpload !== null) {
            handleAgregarArchivo();
        }
    }, [archivoUpload]);

    const handleAgregarArchivo = async () => {
        const file = archivoUpload;
        if (!file || !validateImageFormat(file)) {
            return;
        }

        try {
            const archivoURL = await uploadFile();

            setArchivo((prevState) => ({
                ...prevState,
                url: archivoURL,
                filename: archivoUpload.name,
                filetype: archivoUpload.type,
                idpaciente: expediente.idpaciente,
            }));
            archivo.url = archivoURL;
            archivo.filename = archivoUpload.name;
            archivo.filetype = archivoUpload.type;
            archivo.idpaciente = expediente.idpaciente;
            await ArchivosService.postArchivos(archivo);
            swal("Archivo Agregado!", {
                icon: "success",
            });
            fetchArchivos();
        } catch (error) {
            swal("Error al cargar archivo. Por favor, intentarlo de nuevo.", {
                icon: "error",
            });
        } finally {
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
        if (userType !== 'normal') {
            navigate(`/citas_tabla/historial_cita/${idcita}`)
        }
    };

    const [isEditingLabelMedHis, setIsEditingLabelMedHis] = useState(false);
    const [isEditingLabelMed, setIsEditingLabelMed] = useState(false);

    const handleSelectingAppointment = () => {
        setSelectingAppointment(true);
    };

    const handleCancelAppointment = () => {
        setSelectingAppointment(false);
    };

    const handleSelectedAppointment = (appointment) => {
        setSelectingAppointment(false);
        setLastAppointment(appointment);
        setDiffDate(true);
    }

    const handleLabelEdit2 = () => {
        setIsEditingLabelMedHis(true);
    };

    const handleLabelEdit3 = () => {
        setIsEditingLabelMed(true);
    };

    const handleCancelMedHis = () => {
        setIsEditingLabelMedHis(false);
        setUpdatedAlergias(alergias);
        setUpdatedEnfermedades(enfermedades);
    };

    const handleCancelMedicamentos = () => {
        setIsEditingLabelMed(false);
        setUpdatedMedications(medications);
    };

    const handleSaveMedHis = async () => {
        setIsEditingLabelMedHis(false);
        await uploadDataMedHis(updatedAlergias.filter(str => str !== ""), updatedEnfermedades.filter(str => str !== ""));
        setUpdatedAlergias(updatedAlergias.filter(str => str !== ""))
        setUpdatedEnfermedades(updatedEnfermedades.filter(str => str !== ""))
        setEnfermedades(updatedEnfermedades);
        setAlergias(updatedAlergias);
    };

    const handleSaveMedicamentos = async () => {
        setIsEditingLabelMed(false);
        await uploadDataMeds(updatedMedications);
        setUpdatedMedications(updatedMedications.filter(str => str !== ""))
        setMedications(updatedMedications);
    };

    const uploadDataMedHis = async (alergias, enfermedades) => {
        try {
            const allergiesOBJ = {
                alergiaLista: alergias,
            }
            const enfOBJ = {
                enfLista: enfermedades,
            }

            await Alergias.deleteAllAlergias(id);
            await Alergias.postAlergiaList(id, allergiesOBJ);
            await Enfermedades.deleteAllEnfermedades(id);
            await Enfermedades.postEnfermedadesList(id, enfOBJ);

            swal("Historial Médico actualizado exitosamente", {
                icon: "success",
            });

        } catch (error) {
            swal("Error al actualizar datos de Historial Médico.", {
                icon: "error",
            });
        }
    }

    const uploadDataMeds = async (medications) => {
        try {
            const medicamentosOBJ = {
                medLista: medications,
            }

            console.log("MEDICENTOS OBJ", medicamentosOBJ)

            await Medicamentos.deleteAllMeds(id);
            await Medicamentos.postMedList(id, medicamentosOBJ);

            swal("Medicamentos actualizado exitosamente", {
                icon: "success",
            });

        } catch (error) {
            swal("Error al actualizar datos de Medicamentos.", {
                icon: "error",
            });
        }
    }

    //Funciones para medicamentos////////////////////////////
    const handleMedicationChange = (index, newValue) => {
        const updMed = [...updatedMedications];
        updMed[index] = newValue;
        setUpdatedMedications(updMed);
    };
    const handleAddMedication = () => {
        setUpdatedMedications([...updatedMedications, '']);
    };

    const handleDeleteMedication = (index) => {
        const updMed = [...updatedMedications];
        updMed.splice(index, 1);
        setUpdatedMedications(updMed);
    };
    /////////////////////////////////////////////////////////
    //Funciones para alergias//////////////////////////
    const handleAddAlergia = () => {
        setUpdatedAlergias([...updatedAlergias, '']);
    };

    const handleDeleteAlergia = (index) => {
        const updAlergias = [...updatedAlergias];
        updAlergias.splice(index, 1);
        setUpdatedAlergias(updAlergias);
    };

    const handleAlergiasChange = (index, newValue) => {
        const updAlergias = [...updatedAlergias];
        updAlergias[index] = newValue;
        setUpdatedAlergias(updAlergias);
    };
    /////////////////////////////////////////////////
    //Funciones para enfermedades//////////////////////////
    const handleEnfermedadesChange = (index, newValue) => {
        const updEnfermedades = [...updatedEnfermedades];
        updEnfermedades[index] = newValue;
        setUpdatedEnfermedades(updEnfermedades);
    };
    const handleAddEnfermedad = () => {
        setUpdatedEnfermedades([...updatedEnfermedades, '']);
    };

    const handleDeleteEnfermedad = (index) => {
        const updEnfermedades = [...updatedEnfermedades];
        updEnfermedades.splice(index, 1);
        setUpdatedEnfermedades(updEnfermedades);
    };
    ////////////////////////////////////////////////////////

    const handleOpenEditModal = () => {
        setSelectedExpediente(expediente);
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


//----------------------------------MODAL CITA----------------------------------------------------------


    const [cita, setCita] = useState({
        idcita: '',
        nombre_persona: '',
        estado: '',
        idpaciente: expediente.idpaciente,
        correouser: expediente.correo,
        altura: null,
        peso: null,
        temperatura: null,
        ritmo_cardiaco: null,
        presion: null,
    });

    const handleModalFieldChange = (e) => {
        setCita((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const cleanCita = async () => {
        cita.nombre_persona = null;
        cita.estado = null;
        //cita.idpaciente = expediente.idpaciente;
        //cita.correouser = expediente.correo;
        cita.fecha = new Date();
        cita.hora = null;
        setFecha(dayjs());
        setHora(null);
    };

    const handleDateChange = async (date) => {
        setFecha(date);
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''; // Format date using dayjs
        setAvailableTimes([]); // Clear availableTimes when date changes
        setHora(null); // Clear selected hora when date changes
        setCita((prevCita) => ({ ...prevCita, fecha: formattedDate }));
        const times = await CitasService.getAvailableTimes(formattedDate);
        setAvailableTimes(times);
    };

    const isWeekday = (date) => {
        const day = date.day();
        return day == 0 || day == 6; // 0 is Sunday, 6 is Saturday
    };

    const toggleModal = async () => {
        setIsModalOpen(!isModalOpen);
        setIsSubmitting(false);
        cleanCita();

        const currentDate = new Date();
        const currentDayOfWeek = currentDate.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

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

    const handleModalSubmit = async (e) => {
        cita.idpaciente = expediente.idpaciente;
        cita.correouser = expediente.correo;
        console.log(cita);
        
        e.preventDefault();
        try {
            cita.estado = "Pendiente";
            if (validations()) {
                // 
                // console.log("Fecha: " + cita.fecha + " Hora: " + cita.hora)
                const availableResponse = await CitasService.getCheckAvailability(cita.fecha, cita.hora);;
                const isAvailable = availableResponse.available;
                // 

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
            // 
        }
        
    };

    const submitCita = async () => {
        try {
            await CitasService.postCitas(cita);
            swal("Cita Agregada.", {
                icon: "success",
            });
            toggleModal();
            window.location.reload();
        } catch (error) {
            // Handle error if any
            // 
        }

    };

    const validations = () => {
        const { nombre_persona, estado } = cita
        var lettersRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/;
        //Nombre validations
        if (userType === 'normal') {
            console.log(schAppointments.length);
            if (schAppointments.length !== 0) {
                swal("Ya tiene una cita Agendada.", {
                    icon: "error",
                });
                return false;
            }
        }
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


//----------------------------------MODAL CITA----------------------------------------------------------


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

    const handleDeleteFile = (file) => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez borrado, no podrás recuperar esta información.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    try {
                        const url = file.url;
                        await ArchivosService.deleteArchivos(file.id);
                        if (url != null) {
                            deleteImg(url);
                        }
                        else {
                            window.location.reload();
                        }
                        swal("Archivo eliminado exitosamente!", {
                            icon: "success",
                        });
                        window.location.reload();
                    } catch (error) {
                        swal("Error al eliminar el archivo. Por favor, inténtalo de nuevo más tarde.", {
                            icon: "error",
                        });
                    }
                } else {
                    swal("¡Tu información no se ha borrado!");
                }
            });
    }

    const storage = getStorage();
    const deleteImg = (refUrl) => {
        const imageRef = ref(storage, refUrl)
        deleteObject(imageRef)
            .catch((error) => {
            })
    }

    const handleOpenFile = (fileName) => {
        window.open(fileName.url);
    }

    const getFileIcon = (filetype) => {
        if (filetype.includes('jpeg') || filetype.includes('jpg') || filetype.includes('png')) {
            return <FontAwesomeIcon icon={faFileImage} style={{ color: '#1560F2', fontSize: '24px' }} />;
        } else if (filetype.includes('pdf')) {
            return <FontAwesomeIcon icon={faFilePdf} style={{ color: '#FF0000', fontSize: '24px' }} />;
        } else {
            return <FontAwesomeIcon icon={faFile} style={{ color: '#464646', fontSize: '24px' }} />;
        }
    };


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
                            <div class='vital-signs-box-title-container'>
                                <h3 class='histmedtit'>Signos Vitales</h3>
                                <span>
                                    {(!selectingAppointment && diffDate && lastAppointment.fecha !== null && lastAppointment.fecha !== undefined) && (
                                        formatVitalsDate(lastAppointment.fecha, true)
                                    )}
                                </span>
                                <span>
                                    {!selectingAppointment ? (
                                        <button onClick={handleSelectingAppointment} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                            Seleccionar Fecha
                                        </button>
                                    ) : (
                                        <button onClick={handleCancelAppointment} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                            Cancelar
                                        </button>
                                    )}
                                </span>

                            </div>
                        </div>
                        <div class="all-vital-signs-container">
                            {
                                selectingAppointment ?
                                    (
                                        <div class='vital-signs-appointments-container'>
                                            {prevAppointments.map((appointment, index) => (
                                                <div key={index} class='vital-sign-appointment' onClick={() => handleSelectedAppointment(appointment)}>
                                                    <div class='appointment-date'>
                                                        {formatAppointmentDate(appointment.fecha)}
                                                    </div>
                                                    <span class='appointment-light-text'>{formatAppointmentTime(appointment.hora)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                    :
                                    (
                                        <>
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
                                                            {(lastAppointment.altura !== null || lastAppointment.altura !== undefined)
                                                                ? lastAppointment.altura : '-'}
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
                                                            {(lastAppointment.peso !== null || lastAppointment.peso !== undefined)
                                                                ? lastAppointment.peso : '-'}
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
                                                            {(lastAppointment.temperatura !== null || lastAppointment.temperatura !== undefined)
                                                                ? lastAppointment.temperatura : '-'}
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
                                                            {(lastAppointment.ritmo_cardiaco !== null || lastAppointment.ritmo_cardiaco !== undefined)
                                                                ? lastAppointment.ritmo_cardiaco : '-'}
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
                                                            {(lastAppointment.presion !== null || lastAppointment.presion !== undefined)
                                                                ? lastAppointment.presion : '-'}
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
                                        </>
                                    )}
                        </div>
                    </div>

                    <div class="files">
                        <div class='box-title'>
                            <h3 class='archivostit'>Archivos</h3>
                        </div>
                        <ul className="file-list">
                            {archivos.map((archivo, index) => (
                                <React.Fragment key={index}>
                                    <div className='file-item-line'>
                                        {getFileIcon(archivo.filetype)}
                                        <li className='lifile'>{archivo.filename}</li>
                                        <span class="file-interaction-container">
                                            <button class="file-interaction-button" onClick={() => handleOpenFile(archivo)}>
                                                <FontAwesomeIcon icon={faFile} style={{ color: '#3f79ee', fontSize: '24px' }} />
                                            </button>
                                            {userType !== 'normal' &&
                                                <button class="file-interaction-button" onClick={() => handleDeleteFile(archivo)}>
                                                    <FontAwesomeIcon icon={faTrash} style={{ color: '#FF0000', fontSize: '24px' }} />
                                                </button>
                                            }
                                        </span>
                                    </div>
                                    {index !== archivos.length - 1 && <hr className='dividerer'></hr>}
                                </React.Fragment>
                            ))}
                        </ul>
                        <div className='contBot'>
                            {userType !== 'normal' && (
                                <div>
                                    <button
                                        class="large-button file-upload-button"
                                        onClick={() => document.getElementById('urlfoto').click()}
                                    >
                                        <span>
                                            <FontAwesomeIcon icon={faPlus} style={{ color: '#FFF', fontSize: '24px', marginRight: '20px' }} />
                                            Subir Archivo
                                        </span>
                                    </button>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        name='urlfoto'
                                        id="urlfoto"
                                        className="customFileInput"
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div class="patient-section">
                    <div class='medHis'>
                        <div class='box-title'>
                            <h3 class='histmedtit'>Historial Médico
                                <span>
                                    {isEditingLabelMedHis ? (<>
                                        <button onClick={handleSaveMedHis} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                            Guardar cambios
                                        </button>
                                        <button onClick={handleCancelMedHis} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
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
                            <ul className="section-value">
                                {isEditingLabelMedHis && <button onClick={handleAddAlergia} style={{ fontSize: '18px', marginLeft: '1px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2' }}><FontAwesomeIcon icon={faPlus} /></button>}
                                {updatedAlergias.map((alergia, index) => (
                                    <li key={index}>
                                        {isEditingLabelMedHis ? (
                                            <div className='ElLista'>
                                                <input
                                                    className="edit-text-box small"
                                                    type="text"
                                                    value={alergia}
                                                    style={{ width: '98%' }}
                                                    onChange={(e) => handleAlergiasChange(index, e.target.value)}
                                                />
                                                <button onClick={() => handleDeleteAlergia(index)} style={{ fontSize: '18px', marginLeft: '1px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: 'red' }}><FontAwesomeIcon icon={faTrash} /></button>
                                            </div>
                                        ) : (
                                            alergia
                                        )}
                                    </li>
                                ))}
                            </ul>


                        </div>

                        <div class="enfermedades">
                            <p class="section-label">Enfermedades Base:</p>


                            <ul className="section-value">
                                {isEditingLabelMedHis && (<button onClick={handleAddEnfermedad} style={{ fontSize: '18px', marginLeft: '1px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2' }}><FontAwesomeIcon icon={faPlus} /></button>
                                )}
                                {updatedEnfermedades.map((enfermedad, index) => (
                                    <li key={index}>
                                        {isEditingLabelMedHis ? (
                                            <div className='ElLista'>
                                                <input
                                                    className="edit-text-box small"
                                                    type="text"
                                                    value={enfermedad}
                                                    style={{ width: '98%' }}
                                                    onChange={(e) => handleEnfermedadesChange(index, e.target.value)}
                                                />
                                                <button onClick={() => handleDeleteEnfermedad(index)} style={{ fontSize: '18px', marginLeft: '1px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: 'red' }}><FontAwesomeIcon icon={faTrash} /></button>
                                            </div>
                                        ) : (
                                            enfermedad
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
                                    {isEditingLabelMed ? (
                                        <>
                                            <button onClick={handleSaveMedicamentos} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                                Guardar cambios
                                            </button>
                                            <button onClick={handleCancelMedicamentos} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
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
                            {isEditingLabelMed && <button onClick={handleAddMedication} style={{ fontSize: '18px', marginLeft: '1px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2' }}><FontAwesomeIcon icon={faPlus} /></button>}
                            {updatedMedications.map((medication, index) => (
                                <li key={index}>
                                    {isEditingLabelMed ? (
                                        <div className='ElLista'>
                                            <input
                                                className="edit-text-box small"
                                                type="text"
                                                value={medication}
                                                style={{ width: '98%' }}
                                                onChange={(e) => handleMedicationChange(index, e.target.value)}
                                            />
                                            <button onClick={() => handleDeleteMedication(index)} style={{ fontSize: '18px', marginLeft: '1px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: 'red' }}><FontAwesomeIcon icon={faTrash} /></button>
                                        </div>
                                    ) : (
                                        medication
                                    )}
                                </li>
                            ))}
                        </ul>

                    </div>

                </div>
                <Modal open={isModalOpen} onClose={toggleModal} closeAfterTransition BackdropProps={{ onClick: () => { } }}>

                        <div className='modalContainer modalCitas'>


                            <h2 className="modalHeader">AGREGAR CITA</h2>
                            <button className="cancelButton" onClick={toggleModal}>
                                <FontAwesomeIcon icon={faTimes} size="2x" />
                            </button>
                            <Box
                                component="form"//edit modal
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    width: '100%', // Added width property
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="nombre_persona" label="Nombre de la Cita" variant="outlined" onChange={handleModalFieldChange} name='nombre_persona' required />
                                <TextField id="id_paciente" label={`ID Paciente: ${expediente.idpaciente}`} variant="outlined" name='id_paciente' disabled={true} InputProps={{readOnly: true,}}/>
                                <TextField id="correouser" label={`Correo User: ${expediente.correo}`} variant="outlined" name='correouser' disabled={true} InputProps={{readOnly: true,}}/>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        id="fecha"
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                        shouldDisableDate={isWeekday} // Disable weekends
                                        label="Fecha"
                                        name='fecha'
                                        value={fecha}
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


                                <Button onClick={handleModalSubmit} variant="contained" style={{
                                    backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px',
                                    paddingLeft: '10px', paddingRight: '10px', width: '270px', fontSize: '18px', alignSelf: 'center'
                                }}>
                                    Agregar Cita
                                </Button>
                            </Box>

                        </div>
                </Modal>
                <div class="patient-section appointments-section">
                    
                        <button class='large-button schedule-date' onClick={toggleModal}>
                            <FontAwesomeIcon icon={faCalendarPlus} />
                            Agendar Cita
                        </button>
                        
                    
                    <div class='appointments-container'>
                        <div>
                            <div class='box-title appointments-title'>Citas Agendadas</div>
                            <div class='appointments'>
                                {schAppointments.map((appointment, index) => (
                                    <div key={index} class={`appointment ${userType === 'normal' ? 'normal-user' : ''}`} onClick={() => handleAppointmentClick(appointment.idcita)}>
                                        <div class='appointment-date'>
                                            {formatAppointmentDate(appointment.fecha)}
                                        </div>
                                        <div class='appointment-details'>
                                            <span class='appointment-text'>{appointment.nombre_persona}</span>
                                            <span class='appointment-text'>{appointment.estado}</span>
                                            <span class='appointment-light-text'>{formatAppointmentTime(appointment.hora)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div class='box-title appointments-title'>Citas Previas</div>
                            <div class='appointments'>
                                {prevAppointments.map((appointment, index) => (
                                    <div key={index} class={`appointment prev-appointment ${userType === 'normal' ? 'normal-user' : ''}`} onClick={() => handleAppointmentClick(appointment.idcita)}>
                                        <div class='appointment-date'>
                                            {formatAppointmentDate(appointment.fecha)}
                                        </div>
                                        <div class='appointment-details'>
                                            <span class='appointment-light-text'>{appointment.nombre_persona}</span>
                                            <span class='appointment-light-text'>{formatAppointmentTime(appointment.hora)}</span>
                                            <span class='appointment-light-text'>{appointment.Diagnostico}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>

            </div >
        </div>

    );
};

export default Dashboard;