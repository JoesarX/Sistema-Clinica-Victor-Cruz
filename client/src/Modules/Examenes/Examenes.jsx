import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

import FichaExamenes from './FichaExamenes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    getStorage,

} from "firebase/storage";
import { v4 } from "uuid";

//GRID
import { Box, Button } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { Delete, Edit, Biotech } from '@mui/icons-material'
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import swal from 'sweetalert';

//MODAL
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

//STYLES
import ExamenesService from '../../Services/ExamenesService';
import '../HojaDeEstilos/CrudStyles.css';
import NavBar from '../NavBar';


const Examenes = () => {
    //========================================================================================================================================================================================================================
    //LOGIN VALIDATION
    const isLoggedIn = localStorage.getItem("400");
    let cont = 0;

    //========================================================================================================================================================================================================================
    //VALUES AND CONSTANTS

    const navigate = useNavigate();
    const [examenes, setExamenes] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddSubmitting, setIsAddSubmitting] = useState(false);
    const [isEditSubmitting, setIsEditSubmitting] = useState(false);
    const [examen, setExamen] = useState({
        titulo: '',
        precio: '',
        descripcion: '',
        urlfoto: ''
    });

    const [imageUpload, setImageUpload] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const storage = getStorage();

    //==================================================================================================================================================================================
    //TEXTS AND IMAGES VALIDATIONS

    const validateImageFormat = useCallback((file) => {
        console.log("Called validateImageFormat")
        const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

        if (!allowedFormats.includes(file.type)) {;
            return false;
        }
        if (file.size > maxSizeInBytes) {
            return false;
        }
        // Continue with further logic or actions if the image passes the format and size checks
        return true;
    },[]);

    const validations = useCallback(() => {
        console.log("Called validations")
        const { titulo, precio, descripcion } = examen
        //Titulo validations
        if (titulo === null || titulo === '') {
            swal("Debe agregarle titulo al examen.", {
                icon: "error",
            });
            return false
        } else if (!titulo.replace(/\s/g, '').length) {
            swal("El titulo no puede contener solo espacios", {
                icon: "error",
            });
            
            return false
        } else if (titulo.charAt(0) === ' ') {
            swal("El titulo no puede iniciar con un espacio.", {
                icon: "error",
            });
            return false
        } else if (titulo.charAt(titulo.length - 1) === ' ') { 
            swal("El titulo no puede terminar con un espacio.", {
                icon: "error",
            });  
            return false
        }
        //Precio validations
        console.log("Precio:"+precio)
        if (precio === null || precio === '') {
            swal("Debe agregarle un precio al examen.", {
                icon: "error",
            });
            return false;
        } else if (!(/^\$?(?!0.00)(([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?|[0-9]+(?:\.[0-9]{2})?))$/.test(precio))) {
            swal("Ingrese un precio valido.", {
                icon: "error",
            });
            return false;
        }
        //Precio validations
        if (descripcion === null || descripcion === '') {
            swal("Debe Agregarle una Descripcion del Examen.", {
                icon: "error",
            });
            return false
        } else if (!descripcion.replace(/\s/g, '').length) {
            swal("La descripcion no puede contener solo espacios.", {
                icon: "error",
            });
            return false
        } else if (descripcion.charAt(0) === ' ') {
            swal("La Descripcion no puede iniciar con un espacio.", {
                icon: "error",
            });
            return false
        } else if (descripcion.charAt(descripcion.length - 1) === ' ') {  
            swal("La Descripcion no puede terminar con un espacio.", {
                icon: "error",
            }); 
            return false
        }

        if (imageUpload != null) {
            const file = imageUpload;
            if (validateImageFormat(file) === false) {
                swal("La imagen debe estar en formato JPG y no exceder 5mb de tamaño.", {
                    icon: "error",
                });
                return false;
            }
        }

        return true;
    }, [examen, imageUpload, validateImageFormat])

    


    //==================================================================================================================================================================================
    //IMAGE FUNCTIONS

    const uploadFile = useCallback(async () => {
        console.log("Called uploadFile")
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
                })
                .catch((error) => reject(error));
        });
    },[imageUpload, storage]);

    const cancelarFotoA = () => {
        console.log("Called cancelarFotoA")
        setImageUpload(null);
        setImagePreview(null);
    };

    const cancelarFotoE = async () => {
        console.log("Called cancelarFotoE")
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
                        deleteImg(examen.urlfoto);
                        examen.urlfoto = null;
                        await ExamenesService.editExamenes(id, examen);
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

    //========================================================================================================================================================================================================================
    //DATA GRID SETUP AND FUNCTIONS

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        idexamen: false,
        titulo: true,
        precio: true,
        descripcion: true,
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
                        onClick={toggleAddModal}
                        startIcon={<Biotech />}
                        style={{
                            backgroundColor: 'rgb(27, 96, 241)',
                            color: 'white',
                            borderRadius: '10px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                        }}
                    >
                        Agregar Examen
                    </Button>
                </div>

            </GridToolbarContainer>
        );
    };


    const handleDeleteExamenesClick = (row, id) => {
        console.log("Called handleDeleteExamenesClick")
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
                        await ExamenesService.deleteExamenes(id);
                        if (!(url === null || url === undefined || url === "")) {
                            deleteImg(url);
                        }
                        else {
                            window.location.reload();
                        }
                        swal("Examen eliminado exitosamente!", {
                            icon: "success",
                        });
                        window.location.reload();
                    } catch (error) {
                        swal("Error al eliminar el examen. Por favor, inténtalo de nuevo más tarde.", {
                            icon: "error",
                        });
                    }
                } else {
                    swal("¡Tu información no se ha borrado!");
                }
            });
    };
    
    const deleteImg = useCallback((refUrl) => {
        console.log("Called deleteImg")
        const imageRef = ref(storage, refUrl)
        deleteObject(imageRef)
            .catch((error) => {
            })
    },[storage])

    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976d2' },
            },
        },
        esES,
    );


    //==================================================================================================================================================================================
    //MODALS SETUP AND FUNCTIONS

    const cleanExamen = useCallback(() => {
        console.log("Called cleanExamen")
        examen.titulo = null;
        examen.precio = null;
        examen.descripcion = null;
        examen.urlfoto = null;
    }, [examen]);

    const handleModalFieldChange = (e) => {
        console.log("Called handleModalFieldChange")
        setExamen((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }


    //ADD EXAMENS MODAL

    const toggleAddModal = useCallback(() => {
        console.log("Called toggleAddModal")
        setIsAddModalOpen(!isAddModalOpen);
        setIsAddSubmitting(false);
        setImagePreview(null);
        cleanExamen();
    }, [setIsAddModalOpen, isAddModalOpen, setIsAddSubmitting, setImagePreview, cleanExamen]);

    const submitAddExamen = useCallback(async () => {
        console.log("Called submitAddExamen")
        if (validations()) {
            try {
                if (imageUpload != null) {
                    const imageUrll = await uploadFile();
                    setExamen((prevState) => ({
                        ...prevState,
                        urlfoto: imageUrll,
                    }));
                    examen.urlfoto = imageUrll;
                }
                await ExamenesService.postExamenes(examen);
                swal("Examen Agregado.", {
                    icon: "success",
                });
                toggleAddModal();
                setImagePreview(null);
                window.location.reload();
            } catch (error) {
                // Handle error if any
            }
        }
    }, [validations, uploadFile, setExamen, toggleAddModal, setImagePreview, examen, imageUpload]);

    const handleAddModalSubmit = async (e) => {
        console.log("Called handleAddModalSubmit")
        e.preventDefault();
        try {
            submitAddExamen();
        } catch (error) {
            // Handle error if any
        }
    };


    //EDIT EXAMENS MODAL

    const [id, setID] = useState(null);
    const openEditModal = async (id) => {
        console.log("Called openEditModal")
        setID(id)
        try {
            const examenData = await ExamenesService.getOneExamen(id);
            setExameness([examenData]);
            setExamen(examenData);
        } catch (error) {
            console.log(error);
        }
        setIsEditModalOpen(!isEditModalOpen);
        setIsEditSubmitting(false);
        console.log(isEditSubmitting);
    };

    useEffect(() => {
        console.log("Called useEffect isEditModalOpen, examen.urlfoto, setImagePreview")
        if (isEditModalOpen) {
            // Run your code here when isAddModalOpen is true
            setImagePreview(examen.urlfoto);
        }
    }, [isEditModalOpen, examen.urlfoto, setImagePreview]);

    const closeEditModal = useCallback(() => {
        console.log("Called closeEditModal")
        setIsEditModalOpen(!isEditModalOpen);
        setImageUpload(null);
        setImagePreview(null);
        setIsEditSubmitting(false);
        cleanExamen();
    },[setIsEditModalOpen, isEditModalOpen, setImageUpload, setImagePreview, setIsEditSubmitting, cleanExamen]);

    const submitEditExamen = useCallback(async () => {
        console.log("Called submitEditExamen")
        try {
            if (validations()) {
                if (imageUpload != null) {
                    if (examen.urlfoto != null) {
                        deleteImg(examen.urlfoto);
                    }
                    const imageUrll = await uploadFile();
                    setExamen((prevState) => ({
                        ...prevState,
                        urlfoto: imageUrll,
                    }));
                    examen.urlfoto = imageUrll;
                    await ExamenesService.editExamenes(id, examen);
                    swal("Examen Editado.", {
                        icon: "success",
                    });
                }
                else {
                    await ExamenesService.editExamenes(id, examen);
                    swal("Examen Editado.", {
                        icon: "success",
                    });
                }
                closeEditModal();
                window.location.reload();
                cleanExamen();
            }
        } catch (error) {
            console.log('Error submitting examen:', error);
        }
    }, [validations, uploadFile, examen, id, closeEditModal, cleanExamen, deleteImg, imageUpload]);

    const handleEditModalSubmit = async (e) => {
        console.log("Called handleEditModalSubmit")
        e.preventDefault();
        try {
            submitEditExamen();
        } catch (error) {
            // Handle error if any
            console.log('Error submitting examen:', error);
        }
    };


    //MODAL FICHA

    const [titulo, setTitulo] = useState(false);
    const [precio, setPrecio] = useState(false);
    const [descripcion, setdescripcion] = useState(false);
    const [openFicha, setOpenFicha] = useState(false);
    const [imagen, setImagen] = useState(false);
    let [selectedRow, setSelectedRow] = useState(null);

    const handleSelectedFicha = (row) => {
        console.log("Called handleSelectedFicha")
        setOpenFicha(true);
        setTitulo(row.titulo);
        setPrecio(row.precio);
        setdescripcion(row.descripcion);
        setSelectedRow(true);
        setImagen(row.urlfoto);
    }

    const [examenData, setExameness] = useState([]);

    useEffect(() => {
        console.log("Called useEffect examenData")
        // Validación login
        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            if (cont === 0) {
                swal("No Cuenta con el permiso de entrar a este apartado.", {
                    icon: "error",
                });
                navigate("/expedientes"); // Redirige a la página de inicio de sesión
                cont++;
            }
        }

        const fetchAllExamenes = async () => {
            try {
                const examenesData = await ExamenesService.getAllExamenes()
                const examenesWithId = examenesData.map((examen) => ({
                    ...examen,
                    idexamen: examen.idexamen,
                }));
                setExamenes(examenesWithId);
            } catch (error) {
                // Handle error if any
                console.log("Error fetching examenes:", error);
            }
        };

        // Update tabla
        fetchAllExamenes();
        if (isAddSubmitting) {
            fetchAllExamenes();
        }

        const handleResize = () => {
            const isMobile = window.innerWidth < 600; // Define the screen width threshold for mobile devices

            // Update the column visibility based on the screen width
            setColumnVisibilityModel((prevVisibility) => ({
                ...prevVisibility,
                idexamen: false,
                titulo: true,
                precio: isMobile ? false : true,
                descripcion: isMobile ? false : true,
            }));
        };


        // Call the handleResize function initially and on window resize
        handleResize();
        window.addEventListener("resize", handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isLoggedIn, navigate, isAddSubmitting, cont]);

    return (

        <div className='crudGrid'>
            <NavBar />
            <div style={{ height: '100vh' }}>
                <div className='headerDiv'>
                    <h1>Examenes</h1>
                </div>
                <div className='dataGridBox'>
                    <ThemeProvider theme={theme}>
                        <DataGrid
                            rows={examenes}
                            getRowId={(row) => row.idexamen}
                            columns={[
                                { field: 'titulo', headerName: 'Titulo Examen', flex: 4, headerClassName: 'column-header' },
                                { field: 'precio', headerName: 'Precio', flex: 2, headerClassName: 'column-header' },
                                { field: 'descripcion', headerName: 'Descripcion del Examen', flex: 12, headerClassName: 'column-header' },
                                {
                                    field: 'actions',
                                    headerName: '',
                                    flex: 2,
                                    renderCell: (params) => (

                                        <div>
                                            <IconButton onClick={() => openEditModal(params.id)} >
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteExamenesClick(params.row, params.id)}>
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

                    <Modal open={isAddModalOpen} onClose={toggleAddModal} closeAfterTransition BackdropProps={{ onClick: () => { } }}>
                        <div className='modalContainer modalExamenes' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            <div style={{ marginTop: '20px' }}>
                                <h2 className="modalHeader">AGREGAR EXAMEN</h2>
                                <button className="cancelButton" onClick={toggleAddModal}>
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
                                        <TextField id="titulo" label="Titulo" variant="outlined" onChange={handleModalFieldChange} name='titulo' required style={{ marginBottom: '0.45rem' }} />
                                        <TextField id="precio" label="Precio del Examen" variant="outlined" onChange={handleModalFieldChange} name='precio' required style={{ marginBottom: '0.45rem' }} />
                                        <TextField id="descripcion" label="Descripcion" variant="outlined" onChange={handleModalFieldChange} name='descripcion' required multiline maxRows={5} style={{ marginBottom: '0.45rem' }} />                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} alignItems="center" justifyContent="center">

                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            onClick={handleAddModalSubmit}
                                            variant="contained"
                                            className="modalButton"
                                            type="submit"
                                            id='crudButton'
                                        >
                                            Agregar Examen
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </Modal>


                    <Modal open={isEditModalOpen} onClose={closeEditModal} closeAfterTransition BackdropProps={{ onClick: () => { } }}>

                        <div className='modalContainer modalExamenes' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            {examenData.map((examen) => (
                                <div className='innerCard' key={examen.idexamen}>

                                    <h2 className="modalHeader">EDITAR EXAMEN</h2>
                                    <button className="cancelButton" onClick={closeEditModal}>
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
                                                <TextField id="titulo" label="Titulo" defaultValue={examen.titulo} variant="outlined" onChange={handleModalFieldChange} name='titulo' required style={{ marginBottom: '0.45rem' }} />
                                                <TextField id="precio" label="Precio del Examen" variant="outlined" defaultValue={examen.precio} onChange={handleModalFieldChange} name='precio' style={{ marginBottom: '0.45rem' }} />
                                                <TextField id="descripcion" label="Descripcion" variant="outlined" defaultValue={examen.descripcion} onChange={handleModalFieldChange} name='descripcion' multiline maxRows={5} style={{ marginBottom: '0.45rem' }} />                                            </Grid>
                                        </Grid>

                                        <Button onClick={handleEditModalSubmit} variant="contained" style={{
                                            backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px',
                                            paddingLeft: '10px', paddingRight: '10px', width: '270px', fontSize: '18px', alignSelf: 'center'
                                        }}>
                                            Editar Examen
                                        </Button>
                                    </Box>
                                </div>
                            ))}
                        </div>
                    </Modal>


                </div>

            </div>
            {selectedRow && (
                <FichaExamenes
                    open={openFicha}
                    setOpenPopup={setOpenFicha}
                    setTituloF={titulo}
                    setdescripcionF={descripcion}
                    setPrecioF={precio}
                    setImagenF={imagen}
                />
            )}
        </div>
    );



}

export default Examenes 