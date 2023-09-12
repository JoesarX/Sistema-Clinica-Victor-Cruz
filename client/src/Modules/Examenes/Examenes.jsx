import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

//GRID
import { Box, Button } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { Delete, Edit, Biotech } from '@mui/icons-material'
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
        descripcion: ''
    });


    //==================================================================================================================================================================================
    //TEXTS VALIDATIONS

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
        } else if (titulo.length > 50) {

            swal("El titulo no puede contener mas de 50 caracteres.", {
                icon: "warning",
            });
            return false
        } else if (titulo.length < 3) {
            swal("El titulo no puede contener menos de 3 caracteres.", {
                icon: "warning",
            });
            return false
        }
        //Precio validations
        console.log("Precio:" + precio)
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
        } else if (descripcion.length > 250) {
            swal("La Descripcion no puede contener mas de 250 caracteres.", {
                icon: "error",
            });
            return false
        } else if (descripcion.length < 25) {
            swal("La Descripcion no puede contener menos de 25 caracteres.", {
                icon: "error",
            });
            return false
        }

        return true;
    }, [examen])


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
                        await ExamenesService.deleteExamenes(id);
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
        cleanExamen();
    }, [setIsAddModalOpen, isAddModalOpen, setIsAddSubmitting, cleanExamen]);

    const submitAddExamen = useCallback(async () => {
        console.log("Called submitAddExamen")
        if (validations()) {
            try {
                await ExamenesService.postExamenes(examen);
                swal("Examen Agregado.", {
                    icon: "success",
                });
                toggleAddModal();
                window.location.reload();
            } catch (error) {
                // Handle error if any
            }
        }
    }, [validations, toggleAddModal, examen]);

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

    const closeEditModal = useCallback(() => {
        console.log("Called closeEditModal")
        setIsEditModalOpen(!isEditModalOpen);
        setIsEditSubmitting(false);
        cleanExamen();
    }, [setIsEditModalOpen, isEditModalOpen, setIsEditSubmitting, cleanExamen]);

    const submitEditExamen = useCallback(async () => {
        console.log("Called submitEditExamen")
        try {
            if (validations()) {
                await ExamenesService.editExamenes(id, examen);
                swal("Examen Editado.", {
                    icon: "success",
                });
                closeEditModal();
                window.location.reload();
                cleanExamen();
            }
        } catch (error) {
            console.log('Error submitting examen:', error);
        }
    }, [validations, examen, id, closeEditModal, cleanExamen]);

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
                                { field: 'titulo', headerName: 'Titulo Examen', flex: 5, headerClassName: 'column-header' },
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

                                <Grid item xs={12} sm={6}>
                                    <TextField id="titulo" label="Titulo" variant="outlined" onChange={handleModalFieldChange} name='titulo' required style={{ marginBottom: '0.8rem', marginLeft: '10%', marginRight: '10%', width: '80%' }} />
                                    <TextField id="precio" label="Precio del Examen" variant="outlined" onChange={handleModalFieldChange} name='precio' required style={{ marginBottom: '0.8rem', marginLeft: '10%', marginRight: '10%', width: '80%' }} />
                                    <TextField id="descripcion" label="Descripcion" variant="outlined" onChange={handleModalFieldChange} name='descripcion' required multiline maxRows={5} style={{ marginBottom: '1.4rem', marginLeft: '10%', marginRight: '10%', width: '80%' }} />
                                </Grid>



                                <Button
                                    onClick={handleAddModalSubmit}
                                    variant="contained" style={{
                                        backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px',
                                        paddingLeft: '10px', paddingRight: '10px', width: '270px', fontSize: '18px', alignSelf: 'center'
                                    }}>
                                    Agregar Examen
                                </Button>

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
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="titulo" label="Titulo" defaultValue={examen.titulo} variant="outlined" onChange={handleModalFieldChange} name='titulo' required style={{ marginBottom: '0.8rem', marginLeft: '10%', marginRight: '10%', width: '80%' }} />
                                            <TextField id="precio" label="Precio del Examen" variant="outlined" defaultValue={examen.precio} onChange={handleModalFieldChange} name='precio' style={{ marginBottom: '0.8rem', marginLeft: '10%', marginRight: '10%', width: '80%' }} />
                                            <TextField id="descripcion" label="Descripcion" variant="outlined" defaultValue={examen.descripcion} onChange={handleModalFieldChange} name='descripcion' multiline maxRows={5} style={{ marginBottom: '1.4rem', marginLeft: '10%', marginRight: '10%', width: '80%' }} />
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
        </div>
    );



}

export default Examenes 