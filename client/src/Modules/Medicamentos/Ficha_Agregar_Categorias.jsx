import React from 'react';
import { Dialog } from '@mui/material';
import './Ficha_Categorias.css';
import { Await, useAsyncError, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CategoriasService from "../../Services/CategoriasService";

//GRID
import { Box, Button } from '@mui/material'
import {
    DataGrid, esES, GridCellEditStopParams,
    GridCellEditStopReasons, useGridApiRef
} from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { PersonAdd, Delete, Edit, Medication, Category, Save, ConstructionOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import swal from 'sweetalert';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
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

//comienzo del modal
const Ficha_Agregar_Categorias = (props) => {

    const { open, setOpenPopupC } = props;
    /* console.log("Entré");
     console.log(open);
     console.log(setOpenPopupC);*/
    const isLoggedIn = localStorage.getItem("400");
    let cont = 0;

    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);

    const handleDeleteCategoriesClick = (id) => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez borrado, no podrás recuperar esta categoria.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    try {
                        await CategoriasService.deleteCategories(id);
                        swal("Categoría eliminada exitosamente!", {
                            icon: "success",
                        });
                    } catch (error) {
                        swal("Error al eliminar la categoría. Por favor, inténtalo de nuevo más tarde.", {
                            icon: "error",
                        });
                    }
                } else {
                    swal("¡Tu información no se ha borrado!");
                }
            });
    };

    const handleEditCategoryName = async (newValue) => {
        console.log('editar')
        console.log(newValue.Nombre_Categoria);
        console.log(newValue.id);
        try {
            const res = await CategoriasService.editCategories(newValue);
            console.log(res);
            swal({
                title: "Categoria editada",
                text: "Categoria editada exitosamente",
                icon: "success"
            });
            console.log('swal de exito ddespues')
        } catch (error) {
            swal({
                title: "Error al editar categoría",
                text: "Reportar este error: ".concat(error),
                icon: "error",
            });
            console.log(error);
        }
    };

    const apiRef = useGridApiRef();

    const storage = getStorage();
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
        id: false,
        Nombre_Categoria: true,
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
                </div>
                <div>
                    <Button
                        // onClick={toggleModal}
                        startIcon={<Medication />}
                        style={{
                            backgroundColor: 'rgb(27, 96, 241)',
                            color: 'white',
                            borderRadius: '10px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                        }}
                    >
                        Agregar Categoría
                    </Button>
                </div>
            </GridToolbarContainer>
        );
    };
    //==================================================================================================================================================================================

    //ADD MEDICAMENTOS MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [categoria, setCategoria] = useState({
        id: '',
        Nombre_Categoria: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    //console.log(isSubmitting2)

    //-----------------Ficha Agregar Categoría---------//
    const [openCategories, setOpenCategories] = useState(false);
    let [selectedModal, setSelectedModal] = useState(null);

    const toggleModalCategory = () => {
        setOpenCategories(true);
        setSelectedModal(true);
    }

    const handleModalFieldChange = (e) => {
        setCategoria((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    //----------FichaMedicamentos Modal------------------------------------------------------

    useEffect(() => {

        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            if (cont == 0) {
                alert("No Cuenta con el permiso de entrar a este apartado")
                navigate("/expedientes"); // Redirige a la página de inicio de sesión
                cont++;
            }
        }

        const fetchAllCategories = async () => {
            try {
                const categoriesData = await CategoriasService.getAllCategories();
                const CategoriesWithId = categoriesData.map((categoria) => ({
                    ...categoria,
                    id: categoria.id,
                }));
                setCategorias(CategoriesWithId);
            } catch (error) {
                // Handle error if any
                console.log("Error fetching Categorias:", error);
            }
        };

        // Update tabla
        fetchAllCategories();
        if (isSubmitting) {
            fetchAllCategories();
        }

        const handleResize = () => {
            const isMobile = window.innerWidth < 600; // Define the screen width threshold for mobile devices

            // Update the column visibility based on the screen width
            setColumnVisibilityModel((prevVisibility) => ({
                ...prevVisibility,
                id: true,
                Nombre_Categoria: true
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

    const [editedData, setEditedData] = useState([]);

    return (
        <Dialog open={open} closeAfterTransition BackdropProps={{ onClick: () => { } }}>

            <div className='Modal-FichaCategorias'>
                <div className='crudGrid'>
                    <div style={{ height: '80vh' }}>
                        <div className='headerDiv'>
                            <h1>Categorías</h1>
                        </div>
                        <button className="cancelButton" onClick={() => setOpenPopupC(false)}>
                            <FontAwesomeIcon icon={faTimes} size="2x" />
                        </button>
                        <div className='dataGridBox'>
                            <ThemeProvider theme={theme}>
                                <DataGrid
                                    rows={categorias}
                                    getRowId={(row) => row.id}
                                    // apiRef={apiRef}
                                    columns={[
                                        // { field: 'id', headerName: 'ID Categoría', flex: 1, headerClassName: 'column-header' },
                                        {
                                            field: 'Nombre_Categoria', headerName: 'Categoría', flex: 5, headerClassName: 'column-header', editable: true
                                        },
                                        {
                                            field: 'actions',
                                            headerName: '',
                                            flex: 1,
                                            renderCell: (params) => (
                                                <div>
                                                    <IconButton onClick={() => handleEditCategoryName(params.row)}>
                                                        <Save />
                                                    </IconButton>
                                                    <IconButton style={{ justifySelf: 'right' }} onClick={() => handleDeleteCategoriesClick(params.id)}>
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

                                    onCellEditStop={(params, event) => {
                                        if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                                            event.defaultMuiPrevented = true;
                                        }
                                    }}

                                // processRowUpdate={ (updatedRow, originalRow) => {
                                //     if(originalRow.Nombre_Categoria !== updatedRow.Nombre_Categoria) {
                                //         handleEditCategoryName(updatedRow)
                                //     }
                                // }}

                                // onProcessRowUpdateError={handleProcessRowUpdateError}

                                />
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default Ficha_Agregar_Categorias;