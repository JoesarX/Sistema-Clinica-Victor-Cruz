import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Medicamentos.css';
import EditMedicamentosModal from './EditMedicamentosModal.jsx';
import InfoIcon from '@mui/icons-material/Info';
import FichaMedicamentos from './FichaMedicamentos';

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
import UploadIcon from '@mui/icons-material/Upload';


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

    const handleSelectedAdministradoresClick = (row) => {

    }

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
        categoria: true,
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
        stock: '',
        precio_unitario: '',
        via: '',
        dosis: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitting2, setIsSubmitting2] = useState(false);
    const listaCategoriaMedicamentos = ['Analgésico', 'Antiinflamatorio', 'Antiinfeccioso', 'Mucolítico', 'Antitusivo', 'Antiulceroso', 'Antiácidos', 'Antidiarreico', 'Laxante', 'Antipirético', 'Antialérgico']

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setIsSubmitting(false);
        cleanExpediente();
    };
    const [id, setID] = useState(null);
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
        cleanExpediente();
    };

    const handleModalFieldChange = (e) => {
        setMedicamento((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

    }
    //----------FichaMedicamentos Modal-------------------------------------------------------

    const [nombre, setNombre] = useState(false);
    const [categoria, setCategoria] = useState(false);
    const [stock, setStock] = useState(false);
    const [precioUnitario, setPrecioUnitario] = useState(false);
    const [openFicha, setOpenFicha] = useState(false);
    const [imagen, setImagen] = useState(false);
    const [via, setVia] = useState(false);
    let [selectedRow, setSelectedRow] = useState(null);

    const handleSelectedFicha = (row) => {
        setOpenFicha(true);
        setNombre(row.nombre);
        setCategoria(row.categoria);
        setStock(row.stock);
        setPrecioUnitario(row.precio_unitario);
        setSelectedRow(true);
        setVia(row.via);
        setImagen('https://thumbs.dreamstime.com/b/comprimido-35700453.jpg');
    }




    const cleanExpediente = () => {
        medicamento.nombre = null;
        medicamento.stock = null;
        medicamento.categoria = null;
        medicamento.precio_unitario = null;
        medicamento.via = null;
        medicamento.dosis = null;
    };



    const handleModalSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        console.log(medicamento)

        if (validations()) {
            try {
                // Perform the form submission logic
                await MedicamentosService.postMedicamentos(medicamento);
                alert('Medicamento Agregado');
                toggleModal();



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
                cleanExpediente();
            };
            console.log(medicamento)
            editMedicamento();

            navigate('/medicamentos')
            window.location.reload();
        }

    };
    const validations = () => {
        const { nombre, categoria, stock, precio_unitario, via, dosis } = medicamento
        if (nombre === null || nombre === '' || nombre === ' ') {
            alert('Debe agregarle un nombre al medicamento')
            return false
        }
        if (categoria === null || categoria === '') {
            alert('Debe agregar una categoria valida.');
            return false;
        }
        if (stock === null || stock === '') {
            alert('Debe agregarle la cantidad de unidades al medicamento');
            return false;
        } else if (!(/^\d+$/.test(stock))) {
            alert("Ingrese una unidad numerica valida");
            return false;
        }
        if (precio_unitario === null || precio_unitario === '') {
            alert('Debe agregarle un precio unitario al medicamento');
            return false;
        } else if (!(/^[0-9,.]*$/.test(parseFloat(precio_unitario)))) {
            alert("Ingrese un precio valido");
            return false;
        }
        if (via === null || via === '') {
            alert('Ingrese una via para el medicamento');
            return false
        }
        if (dosis === null || dosis === '' || dosis === ' ') {
            alert('Debe agregarle una dosis al medicamento')
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
                categoria: isMobile ? false : true,
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
    const [selectedMedicamento, setSelectedMedicamento] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleOpenEditModal = (medicamento) => {
        setSelectedMedicamento(medicamento);
        setIsEditModalOpen(true);
    };
    const handleCloseEditModal = () => {
        setSelectedMedicamento(null);
        setIsEditModalOpen(false);
    };


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (

        <div className='crudGrid'>
            <NavBar />
            <div style={{ height: '100vh' }}>
                <div className='headerDiv'>
                    <h1>Medicamentos</h1>
                </div>
                <div className='dataGridBox'>
                    <ThemeProvider theme={theme}>
                        <DataGrid
                            rows={medicamentos}
                            getRowId={(row) => row.medId}
                            columns={[
                                { field: 'nombre', headerName: 'Nombre Medicamento', flex: 3, headerClassName: 'column-header' },
                                { field: 'categoria', headerName: 'Categoria', flex: 2, headerClassName: 'column-header' },
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

                                            <IconButton onClick={() => toggleModal2(params.id)} >
                                                <Edit />
                                            </IconButton>


                                            <IconButton onClick={() => handleDeleteMedicamentosClick(params.id)}>
                                                <Delete />
                                            </IconButton>
                                            <IconButton onClick={() => handleSelectedFicha(params.row)}>

                                                <InfoIcon />
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

                    <Modal open={isModalOpen} onClose={toggleModal} >

                        <div className='modalContainer modalMedicamentos'>

                            <h2 className="modalHeader">AGREGAR MEDICAMENTO</h2>

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
                                <TextField id="nombre" label="Nombre" variant="outlined" onChange={handleModalFieldChange} name='nombre' required />
                                <Autocomplete
                                    disablePortal
                                    id="categoria"

                                    required
                                    options={listaCategoriaMedicamentos}
                                    onChange={(event, newValue) =>
                                        setMedicamento({
                                            ...medicamento,
                                            categoria: newValue
                                        })

                                    }
                                    renderInput={(params) => <TextField {...params} label="Categoria" required />}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="stock" label="Unidades" variant="outlined" onChange={handleModalFieldChange} name='stock' />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="precio_unitario" label="Precio Unitario" variant="outlined" onChange={handleModalFieldChange} name='precio_unitario' />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="via" label="Via" variant="outlined" onChange={handleModalFieldChange} name='via' />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="dosis" label="Dosis" variant="outlined" onChange={handleModalFieldChange} name='dosis' />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={3} sm={1}>
                                        <IconButton >
                                            <UploadIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={3} sm={11}>
                                        <TextField id="picURL" variant="outlined" name='dosis' disabled ='true'/>
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

                    <Modal open={isModalOpen1} onClose={toggleModal22}  >


                        <div className='modalContainer modalMedicamentos'>
                            {medicamentoData.map((medicamento) => (
                                <div className='innerCard' key={medicamento.idmed}>

                                    <h2 className="modalHeader">EDITAR MEDICAMENTO</h2>

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
                                        <TextField id="nombre" label="Nombre" defaultValue={medicamento.nombre} variant="outlined" onChange={handleModalFieldChange} name='nombre' required />
                                        <Autocomplete
                                            disablePortal
                                            id="categoria"

                                            required
                                            options={listaCategoriaMedicamentos}
                                            onChange={(event, newValue) =>
                                                setMedicamento({
                                                    ...medicamento,
                                                    categoria: newValue
                                                })

                                            }
                                            renderInput={(params) => <TextField {...params} label="Categoria" required />}
                                        />
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="stock" label="Unidades" variant="outlined" defaultValue={medicamento.stock} onChange={handleModalFieldChange} name='stock' />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="precio_unitario" label="Precio Unitario" variant="outlined" defaultValue={medicamento.precio_unitario} onChange={handleModalFieldChange} name='precio_unitario' />
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="via" label="Via" variant="outlined" defaultValue={medicamento.via} onChange={handleModalFieldChange} name='via' />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="dosis" label="Dosis" variant="outlined" defaultValue={medicamento.dosis} onChange={handleModalFieldChange} name='dosis' />
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
            {selectedRow && (
                <FichaMedicamentos
                    open={openFicha}
                    setOpenPopup={setOpenFicha}
                    setNombreF={nombre}
                    setCategoriaF={categoria}
                    setPrecioUnitarioF={precioUnitario}
                    setStockF={stock}
                    setImagenF={imagen}
                    setViaF={via}
                />
            )}
        </div>
    );



}

export default Medicamentos 