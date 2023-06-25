import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
//import { storage } from "./firebase";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


//GRID
import { Box, Button } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { PersonAdd, Delete, Edit, Medication, CalendarMonth } from '@mui/icons-material'
import { IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import swal from 'sweetalert';

//ADD MEDICAMENTOS MODAL
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import UploadIcon from '@mui/icons-material/Upload';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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


    const [Expedientes, setExpedientes] = useState([]);
    const [Usuarios, setUsuarios] = useState([]);

    const handleSelectedCitasClick = (id) => {
        setSelectedCitaId(id);
        setOpenPopup(true);
    }

    const handleDeleteCitasClick = (row, id) => {
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
        hora_inicio: true,
        hora_final: true,
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
        hora_inicio: '',
        hora_final: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitting2, setIsSubmitting2] = useState(false);


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setIsSubmitting(false);
        cleanCita();
        console.log("Expedientes", Expedientes)
        console.log("Usuarios", Usuarios)

    };
    const [id, setID] = useState(null);
    const toggleModal2 = async (id) => {
        setID(id);
        console.log(id);

        try {
            const citaData = await CitasService.getOneCita(id);

            // Search for the object that corresponds to idpaciente
            const selectedIdPaciente = Expedientes.find((expediente) => expediente.idPaciente === citaData.idpaciente);

            // Search for the object that corresponds to correouser
            const selectedCorreoUser = Usuarios.find((usuario) => usuario.correouser === citaData.correouser);

            setCita({
                ...citaData,
                idpaciente: selectedIdPaciente || "", // Set the selected object or an empty string if not found
                correouser: selectedCorreoUser || "" // Set the selected object or an empty string if not found
            });

            console.log("cita:", citaData);
        } catch (error) {
            console.log(error);
        }

        setIsModalOpen1(!isModalOpen1);
        setIsSubmitting2(false);
    };

    const handleModalFieldChange = (e) => {
        setCita((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

    }

    const handleStartTimeChange = (dateTime) => {

        console.log(dateTime)
        setHora_inicio(dateTime);
        // const formattedDate = dateTime ? dateTime.toISOString().slice(0, 10) : '';
        // console.log(formattedDate)
        setCita((prevState) => ({ ...prevState, hora_inicio: dateTime }))
        // console.log(fecha_nacimiento)
        // const age = formattedDate ? calculateAge(formattedDate) : '';
        // console.log(age)
        // setExpediente((prevState) => ({ ...prevState, edad: age }))

    };
    //----------FichaCitas Modal-------------------------------------------------------


    let [selectedRow, setSelectedRow] = useState(null);
    const [nombre_persona, setNombre_persona] = useState(false);
    const [estado, setEstado] = useState(false);
    const [idpaciente, setIdpaciente] = useState(false);
    const [correouser, setCorreouser] = useState(false);
    const [hora_inicio, setHora_inicio] = useState(false);
    const [hora_final, setHora_final] = useState(false);

    // const handleSelectedFicha = (row) => {
    //     setOpenFicha(true);
    //     setNombre_persona(row.nombre_persona);
    //     setEstado(row.estado);
    //     setIdpaciente(row.idpaciente);
    //     setCorreouser(row.correouser);
    //     setHora_inicio(row.hora_inicio);
    //     setHora_final(row.hora_final);
    //     setSelectedRow(true);
    // }

    const cleanCita = () => {
        cita.nombre_persona = null;
        cita.estado = null;
        cita.idpaciente = null;
        cita.correouser = null;
        cita.hora_inicio = null;
        cita.hora_final = null;
    };


    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("test");
            const selDate2 = new Date(cita.hora_final)

            const day = String(selDate2.getDate()).padStart(2, '0');

            const year = selDate2.getFullYear();
            const month = String(selDate2.getMonth() + 1).padStart(2, '0');
            const hours = String(selDate2.getHours()).padStart(2, '0');
            console.log(hours)
            const minutes = String(selDate2.getMinutes()).padStart(2, '0');
            const seconds = String(selDate2.getSeconds()).padStart(2, '0');

            const selDate = new Date(cita.hora_inicio)
            console.log(selDate)
            const day3 = String(selDate.getDate()).padStart(2, '0');
            const year1 = selDate.getFullYear();
            const month1 = String(selDate.getMonth() + 1).padStart(2, '0');
            const hours1 = String(selDate.getHours()).padStart(2, '0');
            console.log(hours1)
            const minutes1 = String(selDate.getMinutes()).padStart(2, '0');
            const seconds1 = String(selDate.getSeconds()).padStart(2, '0');

            console.log(day3)
            if (day < day3 || month < month1 || year < year1 || (hours <= hours1 && minutes <= minutes1)) {
                alert('La hora final debe ser posterior a la hora de inicio');
            }
            else {
                if (validations()) {
                    submitCita();
                }

            }


        } catch (error) {
            // Handle error if any
            console.log('Error submitting cita:', error);
        }
    };

    useEffect(() => {
        if (isSubmitting) {
            console.log("test");
            submitCita();
        }
    }, [isSubmitting]);

    const submitCita = async () => {
        console.log("doneee");

        console.log("Entra a agregar despues de validaciones");
        try {
            console.log('yay')
            console.log("cita add:" + cita);
            console.log("ID:" + id);
            console.log("NOMBRE:" + cita.nombre_persona);
            console.log("ESTADO:" + cita.estado);
            console.log("IDPACIENTE:" + cita.idpaciente);
            console.log("CORREO:" + cita.correouser);
            console.log("HORA INICIO:" + cita.hora_inicio);
            console.log("HORA FINAL:" + cita.hora_final);
            await CitasService.postCitas(cita);
            alert('Cita Agregado');
            toggleModal();
            window.location.reload();
        } catch (error) {
            // Handle error if any
            console.log('Error submitting cita:', error);
        }

    };

    const EditHandler = async (e) => {
        console.log("Entra a editar");

        e.preventDefault();
        try {
            console.log("test");
            const selDate2 = new Date(cita.hora_final)

            const day = String(selDate2.getDate()).padStart(2, '0');

            const year = selDate2.getFullYear();
            const month = String(selDate2.getMonth() + 1).padStart(2, '0');
            const hours = String(selDate2.getHours()).padStart(2, '0');
            console.log(hours)
            const minutes = String(selDate2.getMinutes()).padStart(2, '0');
            const seconds = String(selDate2.getSeconds()).padStart(2, '0');

            const selDate = new Date(cita.hora_inicio)
            console.log(selDate)
            const day3 = String(selDate.getDate()).padStart(2, '0');
            const year1 = selDate.getFullYear();
            const month1 = String(selDate.getMonth() + 1).padStart(2, '0');
            const hours1 = String(selDate.getHours()).padStart(2, '0');
            console.log(hours1)
            const minutes1 = String(selDate.getMinutes()).padStart(2, '0');
            const seconds1 = String(selDate.getSeconds()).padStart(2, '0');

            console.log(day3)
            if (day < day3 || month < month1 || year < year1 || (hours <= hours1 && minutes <= minutes1)) {
                alert('La hora final debe ser posterior a la hora de inicio');
            }
            else {
                if (validations()) {
                    submitEditCita();
                }

            }


        } catch (error) {
            // Handle error if any
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
            console.log("Before validations");
            if (validations()) {
                console.log("Entra a edit despues de validaciones");

                console.log("CITA:" + cita);
                console.log("ID:" + id);
                console.log("NOMBRE:" + cita.nombre_persona);
                console.log("ESTADO:" + cita.estado);
                console.log("IDPACIENTE:" + cita.idpaciente);
                console.log("CORREO:" + cita.correouser);
                console.log("HORA INICIO:" + cita.hora_inicio);
                console.log("HORA FINAL:" + cita.hora_final);

                await CitasService.editCitas(id, cita);

                console.log('SIUUU');

                toggleModal22();
                window.location.reload();
                cleanCita();
            }
        } catch (error) {
            console.log('Error submitting cita:', error);
        }
    };

    const toggleModal22 = () => {
        setIsModalOpen1(!isModalOpen1);
        setIsSubmitting2(false);
        //window.location.reload();
        cleanCita();
    };


    const validations = () => {
        const { nombre_persona, estado, hora_inicio, hora_final } = cita
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
        //   else if (!estado.replace(/\s/g, '').length) {
        //     alert('El estado no puede contener solo espacios.');
        //     return false
        // } else if (estado.charAt(0) === ' ') {
        //     alert('El estado no puede iniciar con un espacio.');
        //     return false
        // } else if (estado.charAt(estado.length - 1) === ' ') {
        //     alert('El estado no puede terminar con un espacio.');
        //     return false

        // }

        if (hora_inicio === null || hora_inicio === '') {
            alert('Debe agregar la hora de inicio a la cita');
            return false;
        }

        if (hora_final === null || hora_final === '') {
            alert('Debe agregar la hora de final a la cita');
            return false;
        }

        console.log("END DE VALIDACINES");
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
        console.log("Este es el error en Med: " + (buscaError++));
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
                    idPaciente: expediente.idpaciente,
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
                hora_inicio: isMobile ? false : true,
                hora_final: isMobile ? false : true,

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

    const [fecha_nacimiento, setFechaNacimiento] = useState(null);

    const handleDateChange = (date, name) => {


        if (date !== null && date.getHours !== '00' && date.getMinutes !== '00') {

            const selectedDate = date.toDate();
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const hours = String(selectedDate.getHours()).padStart(2, '0');
            const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
            const seconds = String(selectedDate.getSeconds()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            if (name === 'hora_final') {

                cita.hora_final = formattedDate;
                console.log(cita);

            } else {
                console.log('hora inicio')
                console.log(formattedDate)
                cita.hora_inicio = formattedDate;
                console.log(cita);
            }

        }


    };

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
                                { field: 'hora_inicio', headerName: 'Hora Inicio', flex: 2, headerClassName: 'column-header' },
                                { field: 'hora_final', headerName: 'Hora Final', flex: 2, headerClassName: 'column-header' },
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
                                    id="estado"
                                    required
                                    options={listaEstado}
                                    defaultValue={cita.estado}
                                    onChange={(event, newValue) =>
                                        setCita({
                                            ...cita,
                                            estado: newValue
                                        })
                                    }
                                    renderInput={(params) => <TextField {...params} label="Estado" required />}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="idpaciente"
                                    required
                                    options={Expedientes}
                                    getOptionLabel={(expediente) => `${expediente.nombre} (${expediente.edad} años)`}
                                    onChange={(event, newValue) => {
                                        console.log("ID Paciente Value:", newValue);
                                        console.log("ID Paciente Type:", typeof newValue);
                                        setCita({
                                            ...cita,
                                            idpaciente: newValue ? newValue.idPaciente : "" // Handle null/undefined case

                                        })
                                    }}
                                    renderInput={(params) => <TextField {...params} label="ID Paciente" required />}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="correouser"
                                    required
                                    options={Usuarios}
                                    getOptionLabel={(usuario) => usuario.correouser}
                                    onChange={(event, newValue) =>
                                        setCita({
                                            ...cita,
                                            correouser: newValue ? newValue.correouser : "" // Handle null/undefined case
                                        })
                                    }
                                    renderInput={(params) => <TextField {...params} label="Correo User" required />}
                                />


                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDateTimePicker
                                                id="hora_inicio"
                                                label="Hora Inicio"

                                                onChange={(date) => handleDateChange(date, 'hora_inicio')}
                                                renderInput={(params) => <TextField {...params} />}
                                                name='hora_inicio'
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDateTimePicker
                                                id="hora_final"
                                                label="Hora Final"
                                                onChange={(date) => handleDateChange(date, 'hora_final')}
                                                renderInput={(params) => <TextField {...params} />}
                                                name='hora_final'
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>



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
                                    />
                                    <Autocomplete
                                        value={selectedIdPaciente || null}
                                        disablePortal
                                        id="idpaciente"
                                        options={Expedientes}
                                        getOptionLabel={(expediente) => `${expediente.nombre} (${expediente.edad} años)`}
                                        onChange={(event, newValue) =>
                                            setCita({
                                                ...cita,
                                                idpaciente: newValue,
                                            })
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params} label="ID Paciente" required />
                                        )}
                                    />

                                    <Autocomplete
                                        value={selectedCorreoUser || null}
                                        disablePortal
                                        id="correouser"
                                        required
                                        options={Usuarios}
                                        getOptionLabel={(opcion) => opcion.correouser}
                                        onChange={(event, newValue) =>
                                            setCita({
                                                ...cita,
                                                correouser: newValue,
                                            })
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params} label="Correo User" required />
                                        )}
                                    />


                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <MobileDateTimePicker
                                                    id="hora_inicio"
                                                    label="Hora Inicio"
                                                    defaultValue={dayjs(citas.hora_inicio)}
                                                    onChange={(date) => handleDateChange(date, 'hora_inicio')}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    name='hora_inicio'
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <MobileDateTimePicker
                                                    id="hora_final"
                                                    label="Hora Final"
                                                    defaultValue={dayjs(citas.hora_inicio)}
                                                    onChange={(date) => handleDateChange(date, 'hora_final')}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    name='hora_final'
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>



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