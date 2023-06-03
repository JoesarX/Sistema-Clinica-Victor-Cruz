import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//GRID
import { Box, Button } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { PersonAdd, Delete, Person, Person2, Visibility, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import dayjs from 'dayjs';
import swal from 'sweetalert';

//ADD MEDICAMENTOS MODAL
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


//STYLES
import MedicamentosService from '../../Services/MedicamentosService';
import '../HojaDeEstilos/CrudStyles.css';
import NavBar from '../NavBar';


const Medicamentos = () => {
    //========================================================================================================================================================================================================================
    //LOGIN VALIDATION
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    //========================================================================================================================================================================================================================
    //MEDICAMENTOS GRID DATA
    const navigate = useNavigate();
    const [medicamentos, setMedicamentos] = useState([]);
    //esto es para el popup
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedMedicamentoId, setSelectedMedicamentoId] = useState(null);

    // const handleAddMedicamentosClick = () => {
    //    navigate('/medicamentos/crear');
    // };

    /*const handleEditMedicamentosClick = (id) => {
       navigate(`/medicamentos/${id}`);
       
    };*/

    const [isModalOpen1, setIsModalOpen1] = useState(false);

    // const handleEditMedicamentosClick = () => {
    //     setIsModalOpen1(true);
    //     <EditMedicamentosModal />
    // };


    //para el Popup
    const handleSelectedMedicamentosClick = (id) => {
        setSelectedMedicamentoId(id);
        setOpenPopup(true);
    }

    const handleDeleteMedicamentosClick = (id) => {
        swal({
            title: "¿Estas seguro?",
            text: "Una vez borrado, no podrás recuperar este medicamento.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const deleteMedicamento = async () => {
                        await MedicamentosService.deleteMedicamentos(id);

                    };
                    deleteMedicamento();

                    swal("¡Medicamento eliminado exitosamente!", {
                        icon: "success",
                    });
                    window.location.reload();
                } else {
                    swal("¡Tu medicamento no se ha borrado!");
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
        idmed: false,
        nombre: true,
        id_categoria: true,
        stock: true,
        precio_unitario: true,
        via: true,
        dosis: true,
    });

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
                        onClick={toggleModal}
                        startIcon={<PersonAdd />}
                        style={{
                            backgroundColor: 'rgb(27, 96, 241)',
                            color: 'white',
                            borderRadius: '10px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                        }}
                    >
                        Agregar Medicamento
                    </Button>
                </div>

            </GridToolbarContainer>
        );
    };
    //==================================================================================================================================================================================

    //ADD MEDICAMENTOS MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [medicamento, setMedicamento] = React.useState({
        nombre: '',
        edad: '',
        fecha_nacimiento: '',
        sexo: '',
        correo: '',
        telefono: '',
        numid: null,
        estado_civil: '',
        padecimientos: '',
        ocupacion: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitting2, setIsSubmitting2] = useState(false);
    const listaEstadoCivil = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a']

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setIsSubmitting(false);
    };

    const toggleModal2 = async (id) => {
        setID(id)
        console.log(id)
        try {
            const medicamentoData = await MedicamentosService.getOneMedicamento(id);
            console.log(medicamentoData)
            setMedicamentoss([medicamentoData]);
            setMedicamento(medicamentoData);
            console.log(medicamentoData)
        } catch (error) {
            console.log(error);
        }

        setIsModalOpen1(!isModalOpen1);
        setIsSubmitting2(false);
    };

    const toggleModal22 = () => {


        setIsModalOpen1(!isModalOpen1);
        setIsSubmitting2(false);
    };

    const handleModalFieldChange = (e) => {
        setMedicamento((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

    }

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleDateChange = (date) => {

        console.log(date)
        setFechaNacimiento(date);
        const formattedDate = date ? date.toISOString().slice(0, 10) : '';
        console.log(formattedDate)
        setMedicamento((prevState) => ({ ...prevState, fecha_nacimiento: formattedDate }))
        console.log(fecha_nacimiento)
        const age = formattedDate ? calculateAge(formattedDate) : '';
        console.log(age)
        setMedicamento((prevState) => ({ ...prevState, edad: age }))

    };

    const [fecha_nacimiento, setFechaNacimiento] = useState(null);
    const [id, setID] = useState(null);
    const handleTextChange = (e) => {
        console.log(":)")
        setMedicamento((prevState) => ({ ...prevState, fecha_nacimiento: e.target.value }))
        // Perform any validation or parsing logic if needed
        // Update the selectedDate state accordingly
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        console.log(medicamento.edad)
        console.log(medicamento.fecha_nacimiento)

        setIsSubmitting(true);


        if (validations()) {
            try {
                // Perform the form submission logic
                await MedicamentosService.postMedicamentos(medicamento);
                alert('Medicamento Agregado');
                toggleModal();
                medicamento.nombre = null;
                medicamento.edad = null;
                medicamento.fecha_nacimiento = null;
                medicamento.sexo = null;
                medicamento.correo = null;
                medicamento.telefono = null;
                medicamento.numid = null;
                medicamento.estado_civil = null;
                medicamento.padecimientos = null;
                medicamento.ocupacion = null;

            } catch (error) {
                // Handle error if any
                console.log('Error submitting medicamento:', error);
            }
        }
    };

    const EditHandler = () => {

        if (validations()) {
            const editMedicamento = async () => {
                await MedicamentosService.editMedicamentos(id, medicamento);
                alert('Medicamento Editado');
                toggleModal22();
            };
            console.log(medicamento)
            editMedicamento();

            navigate('/medicamentos')
            window.location.reload();
        }
    };
    const validations = () => {
        const { nombre, edad, fecha_nacimiento, sexo, correo, estado_civil } = medicamento
        if (nombre === null || nombre === '') {
            alert('Nombre Completo es requerido')
            return false
        }
        // if (edad === null || edad === '' || edad < 0) {
        //    console.log(edad)
        //    alert('Una edad valida es requerida')
        //    return false
        // }
        const selectedDate = new Date(fecha_nacimiento);
        const currentDate = new Date();
        if (isNaN(selectedDate.getTime())) {
            alert('Una Fecha valida de Nacimiento es requerida');
            return false;
        }
        if (selectedDate > currentDate) {
            alert('La Fecha de Nacimiento no puede ser mayor a la fecha actual');
            return false;
        }
        if (sexo === null || sexo === '') {
            alert('Sexo es requerido')
            return false
        }
        console.log(correo);
        if (!(correo == null || correo == '') && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo) == false)) {
            console.log("entro");
            alert("Debe ingresar un correo electronico valido.")
            return false
        }
        console.log("salio");
        if (estado_civil === null || estado_civil === '') {
            alert('Estado Civil es requerido')
            return false
        }

        return true
    }
    const [medicamentoData, setMedicamentoss] = useState([]);

    const fetchMedicamento = async (id) => {
        console.log(id)
        try {
            const medicamentoData = await MedicamentosService.getOneMedicamento(id);
            console.log(medicamentoData)
            setMedicamentoss([medicamentoData]);
            //setMedicamento(medicamentoData);
            console.log(medicamentoData)
        } catch (error) {
            console.log(error);
        }
    };

    const defaultValue = medicamento.sexo;
    const selectedValue2 = medicamento.estado_civil;


    useEffect(() => {
        // Validación login
        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            navigate("/iniciarsesion"); // Redirige a la página de inicio de sesión
        }

        const fetchAllMedicamentos = async () => {
            try {
                const medicamentosData = await MedicamentosService.getAllMedicamentos();
                const medicamentosWithId = medicamentosData.map((medicamento) => ({
                    ...medicamento,
                    medId: medicamento.idmed,
                }));
                setMedicamentos(medicamentosWithId);
            } catch (error) {
                // Handle error if any
                console.log("Error fetching medicamentos:", error);
            }
        };

        // Update tabla
        fetchAllMedicamentos();
        if (isSubmitting) {
            fetchAllMedicamentos();
        }

        const handleResize = () => {
            const isMobile = window.innerWidth < 600; // Define the screen width threshold for mobile devices

            // Update the column visibility based on the screen width
            setColumnVisibilityModel((prevVisibility) => ({
                ...prevVisibility,
                idmed: false,
                nombre: true,
                id_categoria: isMobile ? false : true,
                stock: true,
                precio_unitario: isMobile ? false : true,
                via: isMobile ? false : true,
                dosis: isMobile ? false : true,

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

    const [selectedDate, setSelectedDate] = useState(null);
    const handleInputFocus = (event) => {
        event.target.blur(); // Remove focus from the input field
    };

    return (

        <div className='crudGrid'>
            <NavBar />
            <div style={{ height: '100vh'}}>
                <div style={{ height: '50px' , paddingLeft:'3%', paddingTop:'1vh'}}>
                    <h1>Medicamentos</h1>
                </div>
                <div className='dataGridBox'>
                    <ThemeProvider theme={theme}>
                        <DataGrid
                            rows={medicamentos}
                            getRowId={(row) => row.medId}
                            columns={[
                                { field: 'nombre', headerName: 'Nombre Medicamento', flex: 3, headerClassName: 'column-header' },
                                { field: 'id_categoria', headerName: 'Categoria', flex: 2, headerClassName: 'column-header' },
                                { field: 'stock', headerName: 'Inventario', flex: 1, headerClassName: 'column-header' },
                                { field: 'precio_unitario', headerName: 'Precio Unitario', flex: 2, headerClassName: 'column-header' },
                                { field: 'via', headerName: 'Via', flex: 1, headerClassName: 'column-header' },
                                { field: 'dosis', headerName: 'Dosis', flex: 1, headerClassName: 'column-header' },
                                {
                                    field: 'actions',
                                    headerName: '',
                                    flex: 2,
                                    renderCell: (params) => (
                                        <div>
                                            <IconButton onClick={() => toggleModal2(params.id)}  >
                                                <Edit />
                                            </IconButton>

                                            <IconButton onClick={() => handleDeleteMedicamentosClick(params.id)}>
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
                    <Modal open={isModalOpen} onClose={toggleModal}>
                        <div className='modalContainer'>
                            <h2 className="modalHeader">NUEVO EXPEDIENTE</h2>
                            <Box
                                component="form"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    width: '100%', // Added width property

                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="nombre" label="Nombre Completo" variant="outlined" onChange={handleModalFieldChange} name='nombre' required />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        {/*} <LocalizationProvider dateAdapter={AdapterDayjs}>

                              <DatePicker id="fecha_nacimiento" diabled label="Fecha de Nacimiento"  value={fecha_nacimiento || null} renderInput={(params) => <TextField {...params} disabled/>} onChange={handleDateChange} name='fecha_nacimiento' />

                           </LocalizationProvider>*/}
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                                            <MobileDatePicker
                                                id="fecha_nacimiento"
                                                value={fecha_nacimiento || null}
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField {...params} />}
                                                name='fecha_nacimiento'
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div className='radioGroupContainer'>
                                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" className='sexoRadioGroup' id='sexo' onChange={handleModalFieldChange} name="sexo" required>
                                                <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                                                <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                                            </RadioGroup>
                                        </div>
                                    </Grid>
                                </Grid>
                                <TextField id="ocupacion" label="Ocupación" variant="outlined" onChange={handleModalFieldChange} name='ocupacion' />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="correo" label="Correo Electrónico" variant="outlined" type='email' onChange={handleModalFieldChange} name='correo' />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="telefono" label="Teléfono" variant="outlined" onChange={handleModalFieldChange} name='telefono' />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="numid" label="Número de Identidad" variant="outlined" onChange={handleModalFieldChange} name='numid' />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Autocomplete
                                            disablePortal
                                            id="estado_civil"
                                            required
                                            options={listaEstadoCivil}
                                            onChange={(event, newValue) =>
                                                setMedicamento({
                                                    ...medicamento,
                                                    estado_civil: newValue
                                                })
                                            }
                                            renderInput={(params) => <TextField {...params} label="Estado Civil" required />}

                                        />
                                    </Grid>
                                </Grid>
                                <Button onClick={handleModalSubmit} variant="contained" style={{
                                    backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px',
                                    paddingLeft: '10px', paddingRight: '10px', width: '270px', fontSize: '18px', alignSelf: 'center'
                                }}>
                                    Agregar Medicamento
                                </Button>
                            </Box>
                        </div>
                    </Modal>

                    <Modal open={isModalOpen1} onClose={toggleModal22}>

                        <div className='modalContainer'>
                            {medicamentoData.map((medicamento) => (
                                <div className='medicamentoCard' key={medicamento.idpaciente}>

                                    <h2 className="modalHeader">EDITAR EXPEDIENTE</h2>

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
                                        <TextField id="nombre" label="Nombre Completo" defaultValue={medicamento.nombre} variant="outlined" onChange={handleModalFieldChange} name='nombre' required />
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>

                                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                    <MobileDatePicker
                                                        id="fecha_nacimiento"
                                                        defaultValue={dayjs(medicamento.fecha_nacimiento)}
                                                        onChange={handleDateChange}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        name='fecha_nacimiento'
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <div className='radioGroupContainer'>
                                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" value={defaultValue} className='sexoRadioGroup' id='sexo' onChange={handleModalFieldChange} name="sexo" required>
                                                        <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                                                        <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                                                    </RadioGroup>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <TextField id="ocupacion" label="Ocupación" variant="outlined" defaultValue={medicamento.ocupacion} onChange={handleModalFieldChange} name='ocupacion' />

                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="correo" label="Correo Electrónico" defaultValue={medicamento.correo} variant="outlined" type='email' onChange={handleModalFieldChange} name='correo' />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="telefono" label="Teléfono" variant="outlined" defaultValue={medicamento.telefono} onChange={handleModalFieldChange} name='telefono' />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="numid" label="Número de Identidad" variant="outlined" defaultValue={medicamento.numid} onChange={handleModalFieldChange} name='numid' />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Autocomplete
                                                    value={selectedValue2}
                                                    disablePortal
                                                    id="estado_civil"
                                                    required
                                                    options={listaEstadoCivil}
                                                    onChange={(event, newValue) =>
                                                        setMedicamento({
                                                            ...medicamento,
                                                            estado_civil: newValue
                                                        })
                                                    }
                                                    renderInput={(params) => <TextField {...params} label="Estado Civil" required />}

                                                />
                                            </Grid>
                                        </Grid>
                                        <Button onClick={EditHandler} variant="contained" style={{
                                            backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px',
                                            paddingLeft: '10px', paddingRight: '10px', width: '270px', fontSize: '18px', alignSelf: 'center'
                                        }}>
                                            Editar Medicamento
                                        </Button>
                                    </Box>
                                </div>
                            ))}
                        </div>
                    </Modal>

                </div>
            </div>
        </div>
    );



}

export default Medicamentos 