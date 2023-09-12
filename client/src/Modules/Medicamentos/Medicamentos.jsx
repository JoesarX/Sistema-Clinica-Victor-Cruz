import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Medicamentos.css';
import InfoIcon from '@mui/icons-material/Info';
import FichaMedicamentos from './FichaMedicamentos';
import Ficha_Agregar_Categorias from './Ficha_Agregar_Categorias';

import CategoriasService from '../../Services/CategoriasService';
import { storage } from '../../firebase';
import 'firebase/compat/storage';
//import { storage } from "./firebase";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    getStorage,
    listAll,
    list,
} from "firebase/storage";
import { v4 } from "uuid";

//GRID
import { Box, Button } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { PersonAdd, Delete, Edit, Medication, Category } from '@mui/icons-material'
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
import UploadIcon from '@mui/icons-material/Upload';



//STYLES
import MedicamentosService from '../../Services/MedicamentosService';
import './Medicamentos.css';
import '../HojaDeEstilos/CrudStyles.css';
import NavBar from '../NavBar';

let listaCategoriaMedicamentos = [];
let idListaCategoriaMedicamentos = [];

const Medicamentos = () => {
    //========================================================================================================================================================================================================================
    //LOGIN VALIDATION
    const isLoggedIn = localStorage.getItem("400");
    let cont = 0;
    //========================================================================================================================================================================================================================
    //MEDICAMENTOS GRID DATA
    const navigate = useNavigate();
    const [medicamentos, setMedicamentos] = useState([]);
    //esto es para el popup
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedMedicamentoId, setSelectedMedicamentoId] = useState(null);

    const [isModalOpen1, setIsModalOpen1] = useState(false);


    const handleSelectedMedicamentosClick = (id) => {
        setSelectedMedicamentoId(id);
        setOpenPopup(true);
    }


    const handleDeleteMedicamentosClick = (row, id) => {
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
                        const url = row.urlfoto
                        
                        await MedicamentosService.deleteMedicamentos(id);
                        if (url != null) {
                            
                            deleteImg(url);
                        }
                        else {
                            window.location.reload();

                        }
                        swal("Medicamento eliminado exitosamente!", {
                            icon: "success",
                        });
                        window.location.reload();
                    } catch (error) {
                        swal("Error al eliminar el medicamento. Por favor, inténtalo de nuevo más tarde.", {
                            icon: "error",
                        });
                    }
                } else {
                    swal("¡Tu información no se ha borrado!");
                }
            });
    };
    const storage = getStorage();
    const deleteImg = (refUrl) => {
        const imageRef = ref(storage, refUrl)
        deleteObject(imageRef)
            .catch((error) => {
                console.log("Failed to delete image: ", error)
            })
        //window.location.reload();
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
                        onClick={toggleModalCategory}
                        startIcon={<Category />}
                        style={{
                            backgroundColor: 'rgb(27, 96, 241)',
                            color: 'white',
                            borderRadius: '10px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                        }}
                    >
                        Administración de Categorías
                    </Button>
                </div>
                <div>
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
                        Agregar Medicamento
                    </Button>
                </div>

            </GridToolbarContainer>
        );
    };
    //==================================================================================================================================================================================

    //ADD MEDICAMENTOS MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [medicamento, setMedicamento] = useState({
        nombre: '',
        stock: '',
        precio_unitario: '',
        via: '',
        dosis: '',
        urlfoto: '',
        id_categoria: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitting2, setIsSubmitting2] = useState(false);

    const listaVias = ['Oral', 'Subcutánea', 'Intramuscular ', 'Intravenosa']

    console.log(isSubmitting2)


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setIsSubmitting(false);
        setImagePreview(null);
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
            console.log("medicamento: " + medicamento)
        } catch (error) {
            
        }

        setIsModalOpen1(!isModalOpen1);
        setIsSubmitting2(false);
    };
    //-----------------Ficha Agregar Categoría---------//
    const [openCategories, setOpenCategories] = useState(false);
    let [selectedModal, setSelectedModal] = useState(null);

    const toggleModalCategory = () => {
        setOpenCategories(true);
        setSelectedModal(true);
    }

    const handleModalFieldChange = (e) => {
        setMedicamento((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

    }

    //----------FichaMedicamentos Modal-------------------------------------------------------

    const [nombre, setNombre] = useState(false);
    const [id_categoria, setIdCategoria] = useState(false);
    const [stock, setStock] = useState(false);
    const [precioUnitario, setPrecioUnitario] = useState(false);
    const [openFicha, setOpenFicha] = useState(false);
    const [imagen, setImagen] = useState(false);
    const [via, setVia] = useState(false);
    let [selectedRow, setSelectedRow] = useState(null);

    const handleSelectedFicha = (row) => {
        setOpenFicha(true);
        setNombre(row.nombre);
        setIdCategoria(row.Nombre_Categoria);
        setStock(row.stock);
        setPrecioUnitario(row.precio_unitario);
        setSelectedRow(true);
        setVia(row.via);

        setImagen(row.urlfoto);
    }

    const cleanExpediente = () => {
        medicamento.nombre = null;
        medicamento.stock = null;
        medicamento.id_categoria = null;
        medicamento.precio_unitario = null;
        medicamento.via = null;
        medicamento.dosis = null;
        medicamento.urlfoto = null;
    };

    const [imageUpload, setImageUpload] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const imagesListRef = ref(storage, "images/");
    async function uploadFile() {

        return new Promise((resolve, reject) => {
            // Your file upload logic here
            // Call resolve with the imageUrl when the upload is complete
            // Call reject with an error if there's an issue with the upload
            // For example:
            if (imageUpload == null) {
                //reject(new Error('No file selected for upload'));
                return null;
            }

            const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
            uploadBytes(imageRef, imageUpload)
                .then((snapshot) => getDownloadURL(snapshot.ref))
                .then((url) => {
                    resolve(url);
                    //
                })
                .catch((error) => reject(error));
        });
    };
    const setCategoriasID = async (valor) => {
        let cat = 0;
        try {
            for (let i = 0; i < listaCategoriaMedicamentos.length; i++) {
                if (listaCategoriaMedicamentos[i] == valor) {
                    
                    cat = idListaCategoriaMedicamentos[i]
                }
            }
            setMedicamento({
                ...medicamento,
                id_categoria: cat
            })
        } catch (error) {

        }
    }

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            
            submitMedicamento();
        } catch (error) {
            // Handle error if any
            
        }
    };

    useEffect(() => {
        if (isSubmitting) {
            
            submitMedicamento();
        }
    }, [isSubmitting]);

    const submitMedicamento = async () => {
        if (validations()) {
            
            try {
                if (imageUpload != null) {
                    const imageUrll = await uploadFile();
                    
                    setMedicamento((prevState) => ({
                        ...prevState,
                        urlfoto: imageUrll,
                    }));
                    medicamento.urlfoto = imageUrll;
                    
                }
                await MedicamentosService.postMedicamentos(medicamento);
                swal("Medicamento Agregado!", {
                    icon: "success",
                });
                toggleModal();
                setImagePreview(null);
                window.location.reload();
            } catch (error) {
                // Handle error if any
                
            }
        }
    };

    const EditHandler = async (e) => {
        e.preventDefault();
        try {
            submitEditMedicamento();
        } catch (error) {
            // Handle error if any
            
        }
    };

    useEffect(() => {
        if (isSubmitting2) {
            submitEditMedicamento();
        }
    }, [isSubmitting2]);

    const submitEditMedicamento = async () => {
        try {
            if (validations()) {
                
                if (imageUpload != null) {
                    if (medicamento.urlfoto != null) {
                        deleteImg(medicamento.urlfoto);
                    }

                    const imageUrll = await uploadFile();
                    setMedicamento((prevState) => ({
                        ...prevState,
                        urlfoto: imageUrll,
                    }));
                    medicamento.urlfoto = imageUrll;

                    await MedicamentosService.editMedicamentos(id, medicamento);
                    swal("Medicamento Editado!", {
                        icon: "success",
                    });
                }
                else {
                    await MedicamentosService.editMedicamentos(id, medicamento);
                    swal("Medicamento Editado!", {
                        icon: "success",
                    });
                }
                toggleModal22();
                window.location.reload();
                cleanExpediente();
            }
        } catch (error) {
            
        }
    };

    const toggleModal22 = () => {
        setIsModalOpen1(!isModalOpen1);
        setImageUpload(null);
        setImagePreview(null);
        setIsSubmitting2(false);
        //window.location.reload();
        cleanExpediente();
    };

    const validations = () => {
        const { nombre, categoria, stock, precio_unitario, via, dosis } = medicamento
        //Nombre validations
        if (nombre === null || nombre === '') {
            swal("Debe Agregarle un nombre al medicamento.", {
                icon: "warning",
            });
            return false
        } else if (!nombre.replace(/\s/g, '').length) {
            swal("El nombre no puede contener solo espacios.", {
                icon: "warning",
            });
            return false
        } else if (nombre.charAt(0) === ' ') {
            swal("El nombre no puede iniciar con un espacio.", {
                icon: "warning",
            });
            return false
        } else if (nombre.charAt(nombre.length - 1) === ' ') {
            swal("El nombre no puede terminar con un espacio.", {
                icon: "warning",
            });
            return false
        }
        //Categoria validations
        if (categoria === null || categoria === '') {
            swal("Debe agregar una categoria valida.", {
                icon: "warning",
            });
            return false;
        }
        //Stock validations
        if (stock === null || stock === '') {
            swal("Debe agregarle la cantidad de unidades al medicamento", {
                icon: "warning",
            });
            return false;
        } else if (!(/^\d+$/.test(stock))) {
            swal("Las unidades deben ser un numero entero.", {
                icon: "warning",
            });
            return false;
        }
        //Precio validations
        if (precio_unitario === null || precio_unitario === '') {
            swal("Debe agregarle un precio unitario al medicamento.", {
                icon: "warning",
            });
            return false;
        } else if (!(/^[0-9,.]*$/.test(parseFloat(precio_unitario)))) {
            swal("Ingrese un precio valido.", {
                icon: "warning",
            });
            return false;
        }
        //Via validations
        if (via === null || via === '') {
            swal("Ingrese una via para el medicamento.", {
                icon: "warning",
            });
            return false;
        }
        //Dosis validations
        if (dosis === null || dosis === '') {
            swal("Debe agregarle una dosis al medicamento.", {
                icon: "warning",
            });
            return false;
        } else if (!dosis.replace(/\s/g, '').length) {
            swal("La dosis no puede contener solo espacios.", {
                icon: "warning",
            });
            return false
        } else if (dosis.charAt(0) === ' ') {
            swal("La dosis no puede iniciar con un espacio.", {
                icon: "warning",
            });
            return false
        } else if (dosis.charAt(nombre.length - 1) === ' ') {
            swal("La dosis no puede terminar con un espacio.", {
                icon: "warning",
            });
            return false
        }

        if (imageUpload != null) {
            const file = imageUpload;
            if (validateImageFormat(file) == false) {
                swal("La imagen debe estar en formato JPG y no exceder 5mb de tamaño", {
                    icon: "warning",
                });
                return false;
            }
        }
        
        return true;
    }

    const validateImageFormat = (file) => {
        const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

        if (!allowedFormats.includes(file.type)) {
            
            return false;
        }

        if (file.size > maxSizeInBytes) {
            
            return false;
        }

        // Continue with further logic or actions if the image passes the format and size checks
        return true;
    };

    const cancelarFotoA = () => {
        setImageUpload(null);
        setImagePreview(null);
    };

    const cancelarFotoE = async () => {
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
                        setImageUpload(null);
                        setImagePreview(null);
                        deleteImg(medicamento.urlfoto);
                        medicamento.urlfoto = null;
                        await MedicamentosService.editMedicamentos(id, medicamento);
                        swal("Foto eliminada exitosamente!", {
                            icon: "success",
                        });
                    } catch (error) {
                        swal("Error al eliminar la foto. Por favor, inténtalo de nuevo más tarde.", {
                            icon: "error",
                        });
                    }
                } else {
                    swal("¡La foto no se ha borrado!");
                }
            });
    };

    const [medicamentoData, setMedicamentoss] = useState([]);

    useEffect(() => {
        if (isModalOpen1) {
            // Run your code here when isModalOpen is true
            setImagePreview(medicamento.urlfoto);
            
        }
    }, [isModalOpen1]);

    let buscaError = 0;
    useEffect(() => {
        // Validación login
        
        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            if (cont == 0) {
                swal("No Cuenta con el permiso de entrar a este apartado!", {
                    icon: "warning",
                });
                navigate("/expedientes"); // Redirige a la página de inicio de sesión
                cont++;
            }



        }

        const fetchAllMedicamentos = async () => {
            try {
                const medicamentosData = await MedicamentosService.getAllMedicamentos();
                //Actualizar lista de categorías
                const nombresCategorias = await CategoriasService.getAllCategories()
                

                if (cont == 0) {
                    listaCategoriaMedicamentos = nombresCategorias.map((nombresCategorias) => nombresCategorias.Nombre_Categoria);
                    idListaCategoriaMedicamentos = nombresCategorias.map((nombresCategorias) => nombresCategorias.id);
                    cont++;
                }

                


                
                


                const medicamentosWithId = medicamentosData.map((medicamento) => ({
                    ...medicamento,
                    medId: medicamento.idmed,
                }));
                setMedicamentos(medicamentosWithId);
            } catch (error) {
                // Handle error if any
                
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
                stock: isMobile ? false : true,
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

    const categoriaSelected = medicamento.Nombre_Categoria;
    const viaSelected = medicamento.via;



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
                                { field: 'Nombre_Categoria', headerName: 'Categoria', flex: 2, headerClassName: 'column-header' },
                                { field: 'stock', headerName: 'Inventario', flex: 1, headerClassName: 'column-header' },
                                { field: 'precio_unitario', headerName: 'Precio Unitario', flex: 1, headerClassName: 'column-header' },
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


                                            <IconButton onClick={() => handleDeleteMedicamentosClick(params.row, params.id)}>
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

                    <Modal open={isModalOpen} onClose={toggleModal} closeAfterTransition BackdropProps={{ onClick: () => { } }}>
                        <div className='modalContainer modalMedicamentos' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            <div style={{ marginTop: '20px' }}>
                                <h2 className="modalHeader">AGREGAR MEDICAMENTO</h2>
                                <button className="cancelButton" onClick={toggleModal}>
                                    <FontAwesomeIcon icon={faTimes} size="2x" />
                                </button>
                            </div>
                            <Box
                                component="form" //edit modal
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    width: '100%', // Added width property
                                    marginBottom: '20px', // Added margin bottom for spacing
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Grid container spacing={0} alignItems="center" justifyContent="center" style={{ height: '100%' }}>
                                    <Grid item xs={12} sm={6} >
                                        <div className='Div-imagen'>
                                            <div className='ImagenWrapper'>
                                                <img className='Imagen' src={imagePreview} alt="imgPreview" />

                                            </div>
                                        </div>
                                        <label htmlFor="urlfoto" className="customFileLabel"  >Seleccionar archivo</label>
                                        <input
                                            type="file"
                                            onChange={(event) => {
                                                setImageUpload(event.target.files[0]);
                                                setImagePreview(URL.createObjectURL(event.target.files[0]));
                                                
                                                
                                            }}
                                            name='urlfoto'
                                            id="urlfoto"
                                            className="customFileInput"
                                        />
                                        <label onClick={cancelarFotoA} className="customFileLabel" style={{ marginTop: '0.45rem' }}>Eliminar archivo</label>

                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField id="nombre" label="Nombre" variant="outlined" onChange={handleModalFieldChange} name='nombre' required style={{ marginBottom: '0.45rem' }} />
                                        <Autocomplete
                                            disablePortal
                                            id="categoria"
                                            required
                                            options={listaCategoriaMedicamentos}
                                            onChange={(event, newValue) =>
                                                setCategoriasID(newValue)
                                            }
                                            renderInput={(params) => <TextField {...params} label="Categoria" required style={{ marginBottom: '0.45rem' }} />}
                                        />
                                        <TextField id="stock" label="Unidades" variant="outlined" onChange={handleModalFieldChange} name='stock' required style={{ marginBottom: '0.45rem' }} />
                                        <TextField id="precio_unitario" label="Precio Unitario" variant="outlined" onChange={handleModalFieldChange} name='precio_unitario' required style={{ marginBottom: '0.45rem' }} />
                                        <Autocomplete
                                            disablePortal
                                            id="via"
                                            required
                                            options={listaVias}
                                            onChange={(event, newValue) =>
                                                setMedicamento({
                                                    ...medicamento,
                                                    via: newValue
                                                })
                                            }
                                            renderInput={(params) => <TextField {...params} label="Via" required style={{ marginBottom: '0.45rem' }} />}
                                        />
                                        <TextField id="dosis" label="Dosis" variant="outlined" onChange={handleModalFieldChange} name='dosis' required />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} alignItems="center" justifyContent="center">

                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            onClick={handleModalSubmit}
                                            variant="contained"
                                            className="modalButton"
                                            type="submit"
                                            id='crudButton'
                                        >
                                            Agregar Medicamento
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </Modal>


                    <Modal open={isModalOpen1} onClose={toggleModal22} closeAfterTransition BackdropProps={{ onClick: () => { } }}>

                        <div className='modalContainer modalMedicamentos' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            {medicamentoData.map((medicamento) => (
                                <div className='innerCard' key={medicamento.idmed}>

                                    <h2 className="modalHeader">EDITAR MEDICAMENTO</h2>
                                    <button className="cancelButton" onClick={toggleModal22}>
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

                                        <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ height: '100%' }}>
                                            <Grid item xs={12} sm={6}>
                                                <div className='Div-imagen'>
                                                    <div className='ImagenWrapper'>

                                                        <img className='Imagen' src={imagePreview} alt="imgPreview" />
                                                    </div>
                                                </div>
                                                <label htmlFor="urlfoto" className="customFileLabel"  >Seleccionar archivo</label>
                                                <input
                                                    type="file"
                                                    onChange={(event) => {
                                                        setImageUpload(event.target.files[0]);
                                                        setImagePreview(URL.createObjectURL(event.target.files[0]));
                                                    }}
                                                    name='urlfoto'
                                                    id="urlfoto"
                                                    className="customFileInput"
                                                />
                                                <label onClick={cancelarFotoE} className="customFileLabel" style={{ marginTop: '0.45rem' }}>Eliminar archivo</label>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="nombre" label="Nombre" defaultValue={medicamento.nombre} variant="outlined" onChange={handleModalFieldChange} name='nombre' required style={{ marginBottom: '0.45rem' }} />
                                                <Autocomplete
                                                    value={categoriaSelected}
                                                    disablePortal
                                                    id="categoria"


                                                    options={listaCategoriaMedicamentos}
                                                    onChange={(event, newValue) =>
                                                        setCategoriasID(newValue)
                                                    }
                                                    renderInput={(params) => <TextField {...params} label="Categoria" required style={{ marginBottom: '0.45rem' }} />}
                                                />
                                                <TextField id="stock" label="Unidades" variant="outlined" defaultValue={medicamento.stock} onChange={handleModalFieldChange} name='stock' style={{ marginBottom: '0.45rem' }} />
                                                <TextField id="precio_unitario" label="Precio Unitario" variant="outlined" defaultValue={medicamento.precio_unitario} onChange={handleModalFieldChange} name='precio_unitario' style={{ marginBottom: '0.45rem' }} />
                                                <Autocomplete
                                                    value={viaSelected}
                                                    disablePortal
                                                    id="via"
                                                    required
                                                    options={listaVias}
                                                    onChange={(event, newValue) =>
                                                        setMedicamento({
                                                            ...medicamento,
                                                            via: newValue
                                                        })

                                                    }
                                                    renderInput={(params) => <TextField {...params} label="Via" required style={{ marginBottom: '0.45rem' }} />}
                                                />
                                                <TextField id="dosis" label="Dosis" variant="outlined" defaultValue={medicamento.dosis} onChange={handleModalFieldChange} name='dosis' style={{ marginBottom: '0.45rem' }} />
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
                    setCategoriaF={id_categoria}
                    setPrecioUnitarioF={precioUnitario}
                    setStockF={stock}
                    setImagenF={imagen}
                    setViaF={via}
                />
            )}
            {selectedModal && (
                <Ficha_Agregar_Categorias
                    open={openCategories}
                    setOpenPopupC={setOpenCategories}

                />)}
        </div>
    );



}

export default Medicamentos 