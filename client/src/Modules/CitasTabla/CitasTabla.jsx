import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//import { storage } from "./firebase";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


//GRID
import { Box, Button } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { Delete, Edit, Medication, CalendarMonth } from '@mui/icons-material'
import { IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import swal from 'sweetalert';

//ADD MEDICAMENTOS MODAL
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

//STYLES
import CitasService from '../../Services/CitasService';
import ExpedientesService from '../../Services/ExpedientesService';
import UsuariosService from '../../Services/UsuariosService';
import '../HojaDeEstilos/CrudStyles.css';
import NavBar from '../NavBar';

const Citas = () => {
    //========================================================================================================================================================================================================================
    //LOGIN VALIDATION
    const isLoggedIn = localStorage.getItem("400");
    let cont = 0;
    //========================================================================================================================================================================================================================
    //MEDICAMENTOS GRID DATA
    const navigate = useNavigate();
    const [citas, setCitas] = useState([]);
    //esto es para el popup
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedCitaId, setSelectedCitaId] = useState(null);

    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const [fecha, setFecha] = useState(dayjs());
    const [hora, setHora] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);


    const [Expedientes, setExpedientes] = useState([]);
    const [Usuarios, setUsuarios] = useState([]);

    // const handleSelectedCitasClick = (id) => {
    //     setSelectedCitaId(id);
    //     setOpenPopup(true);
    // }

    const handleDeleteCitasClick = (row, id) => {
        if (row.estado == "Terminada" || row.estado == "Cancelada") {
            swal({
                title: "Cita Terminada/Cancelada",
                text: "No se puede eliminar una cita terminada o cancelada.",
                icon: "info",
                confirmButtonText: 'Save',
                dangerMode: false,
            })
        }
        else {
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

                            await CitasService.deleteCitas(id);
                            swal("Cita eliminado exitosamente!", {
                                icon: "success",
                            });
                            window.location.reload();
                        } catch (error) {
                            swal("Error al eliminar el cita. Por favor, inténtalo de nuevo más tarde.", {
                                icon: "error",
                            });
                        }
                    } else {
                        swal("¡Tu información no se ha borrado!");
                    }
                });
        }

    };

    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976d2' },
            },
        },
        esES,
    );

    //Grid Column Visibility
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        idcita: false,
        nombre_persona: true,
        estado: true,
        idpaciente: true,
        correouser: true,
        fecha: true,
        hora: true,
    });



    //Appointments

    const handleOnClickAgendarCita = () => {
        navigate("/citas_tabla/citas_expedientes")
    };

    //


    const CustomToolbar = () => {
        const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

        return (
            <GridToolbarContainer
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'stretch' : 'center',
                    marginTop: '15px',
                    marginBottom: '10px',
                    gap: '10px',
                }}
            >
                <div>
                    {isMobile ? (
                        <>
                            <GridToolbarColumnsButton />
                            <GridToolbarFilterButton />
                            <GridToolbarDensitySelector />
                        </>
                    ) : (
                        <>
                            <GridToolbarColumnsButton />
                            <GridToolbarFilterButton />
                            <GridToolbarDensitySelector />
                            <GridToolbarExport />
                        </>
                    )}
                </div>

                <div>
                    <Button
                        onClick={handleOnClickAgendarCita}
                        startIcon={<CalendarMonth />}
                        style={{
                            backgroundColor: 'rgb(27, 96, 241)',
                            color: 'white',
                            borderRadius: '10px',
                            paddingLeft: '15px',
                            paddingRight: '15px',
                            marginRight: '15px',
                        }}
                    >
                        Ver Calendario
                    </Button>

                    <Button
                        onClick={toggleModal}
                        startIcon={<Medication />}
                        style={{
                            backgroundColor: 'rgb(27, 96, 241)',
                            color: 'white',
                            borderRadius: '10px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                        }}
                    >
                        Agregar Cita
                    </Button>
                </div>

            </GridToolbarContainer>
        );
    };
    //==================================================================================================================================================================================

    //ADD MEDICAMENTOS MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cita, setCita] = useState({
        idcita: '',
        nombre_persona: '',
        estado: '',
        idpaciente: '',
        correouser: '',
        altura: null,
        peso: null,
        temperatura: null,
        ritmo_cardiaco: null,
        presion: null,

    });
    const [Expedientess, setExpedientess] = useState({
        idpaciente: '',
        nombre: '',
        edad: '',


    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitting2, setIsSubmitting2] = useState(false);


    const toggleModal = async () => {
        setIsModalOpen(!isModalOpen);
        setIsSubmitting(false);
        cleanCita();
        // // console.log("Expedientes", Expedientes)
        // // console.log("Usuarios", Usuarios)
        const date = new Date();
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
        const times = await CitasService.getAvailableTimes(formattedDate);
        setAvailableTimes(times);
    };

    const [id, setID] = useState(null);
    const [citaD, setCitaD] = useState([]);
    const [selectMail, setMail] = useState([]);

    const toggleModal2 = async (id) => {
        setID(id);

        try {
            const citaData = await CitasService.getOneCita(id);

            const selectedIdPaciente2 = Expedientes.find((expediente) => expediente.idpaciente === citaData.idpaciente);
            setExpedientess(selectedIdPaciente2)

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
            // console.log("cita:", citaData);
        } catch (error) {
            // Handle the error
        }

        setIsModalOpen1(!isModalOpen1);
        setIsSubmitting2(false);
    };

    // useEffect hook to fetch available times when cita state is updated
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

    const handleModalFieldChange = (e) => {
        setCita((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

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

    const handleEditDateChange = async (date) => {
        setFecha(date);
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''; // Format date using dayjs
        setAvailableTimes([]); // Clear availableTimes when date changes
        setHora(null); // Clear selected hora when date changes
        setCita((prevCita) => ({ ...prevCita, fecha: formattedDate }));
        const times = await CitasService.getAvailableTimes(formattedDate, cita.idcita);
        setAvailableTimes(times);
    };


    //----------FichaCitas Modal-------------------------------------------------------


    const cleanCita = async () => {
        cita.nombre_persona = null;
        cita.estado = null;
        cita.idpaciente = null;
        cita.correouser = null;
        cita.fecha = new Date();
        cita.hora = null;
        setFecha(dayjs());
        setHora(null);
    };

    let isAvailabilityCheckInProgress = false;

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            cita.estado = "Pendiente";
            if (validations()) {
                // console.log("Entra a agregar despues de validaciones");
                // console.log("Fecha: " + cita.fecha + " Hora: " + cita.hora)
                const availableResponse = await CitasService.getCheckAvailability(cita.fecha, cita.hora);;
                const isAvailable = availableResponse.available;
                // console.log("isAvailable: " , isAvailable);

                if (!isAvailable) {
                    alert('La hora que ha seleccionado ya ha sido ocupada.');
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

    useEffect(() => {
        if (isSubmitting) {
            // console.log("test");
            submitCita();
        }
    }, [isSubmitting]);

    const submitCita = async () => {
        // console.log("doneee");

        // console.log("Entra a agregar despues de validaciones");
        try {
            await CitasService.postCitas(cita);
            alert('Cita Agregado');
            toggleModal();
            window.location.reload();
        } catch (error) {
            // Handle error if any
            // console.log('Error submitting cita:', error);
        }

    };

    const EditHandler = async (e) => {

        e.preventDefault();
        try {
            if (validations()) {
                const availableResponse = await CitasService.getCheckAvailability(cita.fecha, cita.hora, cita.idcita);
                const isAvailable = availableResponse.available;
                if (!isAvailable) {
                    alert('La hora que ha seleccionado ya ha sido ocupada.');
                    setHora(null);
                    const formattedDate = cita.fecha ? dayjs(cita.fecha).format('YYYY-MM-DD') : ''
                    const times = await CitasService.getAvailableTimes(formattedDate, cita.idcita);
                    setAvailableTimes(times);
                } else {
                    submitEditCita();
                }
            }
        } catch (error) {
            console.log('Error submitting cita:', error);
        }
    };

    useEffect(() => {
        if (isSubmitting2) {
            submitEditCita();
        }
    }, [isSubmitting2]);

    const submitEditCita = async () => {
        try {
            await CitasService.editCitas(id, cita);

            // console.log('SIUUU');
            alert("Cita editada exitosamente!")
            toggleModal22();
            window.location.reload();
            cleanCita();

        } catch (error) {

        }
    };

    const toggleModal22 = () => {
        setIsModalOpen1(!isModalOpen1);
        setIsSubmitting2(false);
        //window.location.reload();
        cleanCita();
    };


    const validations = () => {
        const { nombre_persona, estado } = cita
        var lettersRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/;
        //Nombre validations
        if (nombre_persona === null || nombre_persona === '') {
            alert('Debe agregarle un nombre al cita')
            return false
        } else if (!nombre_persona.replace(/\s/g, '').length) {
            alert('El nombre no puede contener solo espacios.');
            return false
        } else if (nombre_persona.charAt(0) === ' ') {
            alert('El nombre no puede iniciar con un espacio.');
            return false
        } else if (nombre_persona.charAt(nombre_persona.length - 1) === ' ') {
            alert('El nombre no puede terminar con un espacio.');
            return false
        } else if (!lettersRegex.test(nombre_persona)) {
            alert('Nombre invalido, no puede tener numeros ni caracteres especiales como @#$%');
            return false;
        }

        if (estado === null || estado === '') {
            alert('Debe agregar un estado valido.');
            return false;
        }

        if (fecha === null || fecha === '') {
            alert('Debe agregar una fecha valida.');
            return false;
        } else if (fecha.format('YYYY-MM-DD') < dayjs().format('YYYY-MM-DD')) {
            alert('La fecha no puede ser menor a la fecha actual.');
            return false;
        } else {
            cita.fecha = fecha.format('YYYY-MM-DD');
        }

        if (hora === null || hora === '') {
            alert('Debe agregar una hora valida.');
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
            alert('La hora que ha seleccionado para hoy ya ha pasado.');
            return false;
        }
        return true;
    }


    const [citaData, setCitaData] = useState([]);
    const selectedEstado = cita.estado;
    const selectedCorreoUser = cita.correouser;
    const selectedIdPaciente = cita.idpaciente;
    const listaEstado = ['Pendiente', 'En Progreso', 'Cancelada', 'Terminada']

    let buscaError = 0;
    useEffect(() => {
        // Validación login
        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            if (cont == 0) {
                alert("No Cuenta con el permiso de entrar a este apartado")
                navigate("/expedientes"); // Redirige a la página de inicio de sesión
                cont++;
            }



        }

        const fetchAllCitas = async () => {
            try {
                const citasData = await CitasService.getAllCitas();
                const citasWithId = citasData.map((cita) => ({
                    ...cita,
                    medId: cita.idmed,
                }));

                const expedientesData = await ExpedientesService.getAllExpedientes();
                const expedientesFormatted = expedientesData.map((expediente) => ({
                    idpaciente: expediente.idpaciente,
                    nombre: expediente.nombre,
                    edad: expediente.edad, // Assuming 'age' property exists in 'expediente' object
                    // Add other relevant properties from the 'Expedientes' table
                }));


                const usuariosData = await UsuariosService.getAllusuarios();
                const usuariosFormatted = usuariosData.map((usuario) => {
                    return {
                        correouser: usuario.correouser,
                        // Add other relevant properties from the 'Usuario' table
                    };
                });
                setCitas(citasWithId);
                setExpedientes(expedientesFormatted);
                setUsuarios(usuariosFormatted);
            } catch (error) {
                // Handle error if any
                console.log("Error fetching citas:", error);
            }
        };


        // Update tabla
        fetchAllCitas();


        if (isSubmitting) {
            fetchAllCitas();
        }

        const handleResize = () => {
            const isMobile = window.innerWidth < 600; // Define the screen width threshold for mobile devices

            // Update the column visibility based on the screen width
            setColumnVisibilityModel((prevVisibility) => ({
                ...prevVisibility,
                idcita: false,
                nombre_persona: true,
                estado: isMobile ? false : true,
                idpaciente: isMobile ? false : true,
                correouser: isMobile ? false : true,
                fecha: isMobile ? false : true,
                hora: isMobile ? false : true,

            }));
        };

        // Call the handleResize function initially and on window resize
        handleResize();
        window.addEventListener("resize", handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isLoggedIn, navigate, isSubmitting]);

    return (

        <div className='crudGrid'>
            <NavBar />
            <div style={{ height: '100vh' }}>
                <div className='headerDiv'>
                    <h1>Citas</h1>
                </div>
                <div className='dataGridBox'>
                    <ThemeProvider theme={theme}>
                        <DataGrid
                            rows={citas}
                            getRowId={(row) => row.idcita}
                            columns={[
                                { field: 'nombre_persona', headerName: 'Nombre Cita', flex: 3, headerClassName: 'column-header' },
                                { field: 'estado', headerName: 'Estado', flex: 2, headerClassName: 'column-header' },
                                { field: 'idpaciente', headerName: 'Expediente num', flex: 1, headerClassName: 'column-header' },
                                { field: 'correouser', headerName: 'Correo Cuenta', flex: 4, headerClassName: 'column-header' },
                                { field: 'fecha', headerName: 'Fecha', flex: 2, headerClassName: 'column-header' },
                                { field: 'hora', headerName: 'Hora', flex: 2, headerClassName: 'column-header' },
                                {
                                    field: 'actions',
                                    headerName: '',
                                    flex: 2,
                                    renderCell: (params) => (

                                        <div>

                                            <IconButton onClick={() => toggleModal2(params.id)} >
                                                <Edit />
                                            </IconButton>


                                            <IconButton onClick={() => handleDeleteCitasClick(params.row, params.id)}>
                                                <Delete />
                                            </IconButton>

                                        </div>
                                    ),
                                },

                            ]}
                            components={{
                                Toolbar: CustomToolbar,
                            }}

                            columnVisibilityModel={columnVisibilityModel}
                            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                        />
                    </ThemeProvider>


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
                                <Autocomplete
                                    disablePortal
                                    id="idpaciente"
                                    required
                                    options={Expedientes}
                                    getOptionLabel={(expediente) => `${expediente.nombre} (${expediente.edad} años)`}
                                    onChange={(event, newValue) => {
                                        cita.idpaciente = newValue?.idpaciente;
                                    }}
                                    renderInput={(params) => <TextField {...params} label="ID Paciente" required />}
                                    ListboxProps={
                                        {
                                            style: {
                                                maxHeight: '220px',
                                                border: '1px solid BLACK'
                                            }
                                        }
                                    }
                                />
                                <Autocomplete
                                    disablePortal
                                    id="correouser"
                                    required
                                    options={Usuarios}
                                    getOptionLabel={(usuario) => usuario.correouser}
                                    onChange={(event, newValue) => {
                                        cita.correouser = newValue?.correouser;
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Correo User" required />}
                                    ListboxProps={
                                        {
                                            style: {
                                                maxHeight: '160px',
                                                border: '1px solid BLACK'
                                            }
                                        }
                                    }
                                />

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        id="fecha"
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} />}
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

                    <Modal open={isModalOpen1} onClose={toggleModal22} closeAfterTransition BackdropProps={{ onClick: () => { } }}>
                        <div className='modalContainer modalCitas'>
                            <div className='innerCard' key={cita.idmed}>
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
                                    <TextField id="nombre_persona" label="Nombre de la Cita" defaultValue={cita.nombre_persona} variant="outlined" onChange={handleModalFieldChange} name='nombre_persona' required />
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
                                        value={Expedientess}
                                        disablePortal
                                        id="idpaciente"
                                        options={Expedientes}
                                        getOptionLabel={(expediente) => `${expediente.nombre} (${expediente.edad} años)`}
                                        onChange={(event, newValue) => {

                                            cita.idpaciente = newValue?.idpaciente;
                                          
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="ID Paciente" required />
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

                                    <Autocomplete
                                        value={selectMail}
                                        disablePortal
                                        id="correouser"
                                        required
                                        options={Usuarios}
                                        getOptionLabel={(opcion) => opcion.correouser}
                                        onChange={(event, newValue) => {
                                            cita.correouser = newValue?.correouser;
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Correo User" required />
                                        )}
                                        ListboxProps={
                                            {
                                                style: {
                                                    maxHeight: '160px',
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


                </div>

            </div>
            {/* {selectedRow && (
                <FichaCitas
                    open={openFicha}
                    setOpenPopup={setOpenFicha}
                    setNombreF={nombre}
                    setCategoriaF={categoria}
                    setPrecioUnitarioF={precioUnitario}
                    setStockF={stock}
                    setImagenF={imagen}
                    setViaF={via}
                />
            )} */}
        </div>
    );



}

export default Citas 