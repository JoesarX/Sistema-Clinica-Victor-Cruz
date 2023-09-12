import React from 'react';
import { Dialog } from '@mui/material';
import './Ficha_Categorias.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CategoriasService from "../../Services/CategoriasService";

import { Button, TextField } from '@mui/material'
import {
    DataGrid, esES, GridCellEditStopReasons, gridColumnsTotalWidthSelector, useGridApiRef
} from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { Delete, Medication, SaveOutlined, CheckCircleOutline, ConstructionOutlined, Check, Cancel, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import swal from 'sweetalert';


const Ficha_Agregar_Categorias = (props) => {

    const { open, setOpenPopupC } = props;
    const isLoggedIn = localStorage.getItem("400");
    let cont = 0;

    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [selectedRow, setSelectedRow] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoria, setCategoria] = useState({
        id: '',
        Nombre_Categoria: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [categoryRow, setCategoryRow] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            try {
                await fetchAllCategories();
            } catch (error) {
                console.log('Error fetching categories:', error);
            }
        };

        if (open) {
            fetchData();
        }

    }, [open]);

    useEffect(() => {

        if (!isLoggedIn) {
            if (cont == 0) {
                swal("No cuenta con el permiso de entrar a este apartado.", {
                    icon: "error",
                });
                navigate("/expedientes");
                cont++;
            }
        }

        // Update tabla
        fetchAllCategories();
        if (isSubmitting) {
            fetchAllCategories();
        }

        const handleResize = () => {
            const isMobile = window.innerWidth < 600; // Define the screen width threshold for mobile devices

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

    function handleDeleteCategoriesClick(id) {
        console.log(id);
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
                        fetchAllCategories();
                    } catch (error) {
                        swal("Error al eliminar la categoría. Por favor, inténtalo de nuevo más tarde.\n".concat(error.message), {
                            icon: "error",
                        });
                    }
                } else {
                    swal("¡Tu información no se ha borrado!");
                }
            });
    }

    const AgregarCateogia = async () => {
        var trust = true;
        try {
            var categoriaInput = document.getElementById("categoriaInput");
            var categoriaValue = categoriaInput.value;
            console.log("Verificando string: " + categoriaValue);

            if ((categoriaValue == "") || (categoriaValue == " ") || (categoriaValue == "   ")) {
                swal({
                    title: "Error al agregar categoría",
                    text: "No puede agregar una categoría Vacía",
                    icon: "error"
                });
                trust = false;

            }
            var regex = /^[\sA-Za-záéíóúñÁÉÍÓÚÑüÜ]+$/u;

            if (!regex.test(categoriaValue)) {
                swal({
                    title: "Error al agregar categoría",
                    text: "La categoría no puede tener números",
                    icon: "error"
                });
                trust = false;
            }
            const verificacion = await CategoriasService.getAllCategories();
            console.log(verificacion.Nombre_Categoria);
            const existe = verificacion.some((verificacion) => verificacion.Nombre_Categoria === categoriaValue)
            console.log(existe);
            if (existe) {
                swal({
                    title: "Error al agregar categoría",
                    text: "La categoría escrita ya existe",
                    icon: "error"
                });
                trust = false;
            }
            console.log(categoriaValue);
            if (trust) {
                var nuevaCategoria = [categoriaValue];
                const res = await CategoriasService.postCategories(nuevaCategoria)

                console.log(res);
                swal({
                    title: "Categoria Agregada",
                    text: "Categoria Agregada exitosamente",
                    icon: "success"
                });
                fetchAllCategories();
            }
        } catch (error) {
            swal({
                title: "Error al agregar categoría",
                text: "Reportar este error: ".concat(error),
                icon: "error",
            });
            console.log(error);
        }

    }
    const handleEditCategoryName = async (editedValue, rowId) => {
        console.log('handle eddit caterogy name: ', editedValue);
        console.log('handle eddit caterogy id : ', rowId);
        const object = [editedValue, rowId]
        try {
            await CategoriasService.editCategories(rowId, object)
            swal({
                title: "Editado con éxito",
                text: "Categoría editada exitosamente",
                icon: "success",
            });



            fetchAllCategories();
        } catch (error) {
            swal({
                title: "Error al editar categoría",
                text: "Reportar este error: ".concat(error),
                icon: "error",
            });
        }
    };

    const fetchAllCategories = async () => {
        try {
            const categoriesData = await CategoriasService.getAllCategories();
            const CategoriesWithId = categoriesData.map((categoria) => ({
                ...categoria,
                id: categoria.id,
            }));
            setCategorias(CategoriesWithId);
        } catch (error) {
            console.log("Error fetching Categorias:", error);
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

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        id: false,
        Nombre_Categoria: true,
    });

    const handleModalClose = () => {
        setOpenPopupC(false);
        setCategorias([]);
        window.location.reload()
    };

    const getRowById = (apiRef, rowId) => {
        if (apiRef && apiRef.current) {
            const row = apiRef.current.getRow(rowId);
            if (row) {
                console.log('row found', row);
            } else {
                console.log('Row not found');
            }
            return row;
        }
        else {
            console.log('Esperando APIREF')
        }
    };

    const getRowId = (row) => {
        return row.id;
    };

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
                    <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        //value={admin.nombre}
                        fullWidth
                        required
                        //onChange={handleChange}
                        name="Agregar_Categoria"
                        id="categoriaInput"
                        label="Ingrese nueva Categoría"
                        style={{ width: '220px', marginRight: '10px', backgroundColor: "white" }}
                    />
                    <Button
                        onClick={AgregarCateogia}
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

    const CategoriesDataGrid = () => {
        const [editMode, setEditMode] = useState(null);
        const [editedValue, setEditedValue] = useState('');
        const [rows, setRows] = useState(categorias);
        const inputRef = useRef(null);



        useEffect(() => {
            if (editMode !== null && inputRef.current) {
                inputRef.current.focus();
            }
        }, [editMode]);

        const handleEditClick = (id, value) => {
            setEditMode(id);
            setEditedValue(value);
        };

        const handleCancelClick = () => {
            setEditMode(null);
            setEditedValue('');
        };

        const handleSaveClick = (editedValue, Row) => {
            saveChanges(editedValue, Row);
        };

        const handleInputChange = (event) => {
            const updatedRow = { id: editMode, Nombre_Categoria: event.target.value };
            setEditedValue(event.target.value);

        };

        const saveChanges = async (editedvalue, Row) => {
            console.log("Esta es la row: " + editedvalue + " " + Row.id);
            console.log("Esta es la row: " + Row.id);
            if (editedvalue) {

                await handleEditCategoryName(editedvalue, Row.id);

                console.log('Edited Row:', editedvalue);

                const updatedRows = rows.map((row) =>
                    row.id === Row.id ? { ...row, Nombre_Categoria: Row.Nombre_Categoria } : row
                );

                setRows(updatedRows);
                setEditMode(null);
                setEditedValue('');
            } else {
                console.log("No entré JAJAJAJA");
            }
        };

        return (
            <DataGrid
                rows={categorias}
                getRowId={getRowId}
                columns={[
                    {
                        field: 'Nombre_Categoria',
                        headerName: 'Categoría',
                        flex: 5,
                        headerClassName: 'column-header',
                        renderCell: (params) => {
                            const { id, value } = params;
                            if (editMode === id) {
                                return (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <TextField
                                            value={editedValue}
                                            onChange={handleInputChange}
                                            inputRef={inputRef}
                                            autoFocus
                                            fullWidth
                                        />
                                        <IconButton onClick={() => handleSaveClick(editedValue, params.row)}>
                                            <Check />
                                        </IconButton>
                                        <IconButton onClick={handleCancelClick}>
                                            <Cancel />
                                        </IconButton>
                                    </div>
                                );
                            }

                            return (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>{value}</div>
                                    <IconButton onClick={() => handleEditClick(id, value)}>
                                        <Edit />
                                    </IconButton>
                                </div>
                            );
                        },
                    },
                    {
                        field: 'status',
                        headerName: '',
                        flex: 1,
                        renderCell: (params) => (
                            <IconButton style={{ justifySelf: 'right' }} onClick={() => handleDeleteCategoriesClick(params.id)}>
                                <Delete />
                            </IconButton>
                        ),
                    },
                ]}
                components={{
                    Toolbar: CustomToolbar,
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                disableColumnVirtualization
                onCellEditStop={(params, event) => {
                    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                        event.defaultMuiPrevented = true;
                    }
                }}
            />
        );
    };


    //----------FichaMedicamentos Modal------------------------------------------------------

    return (
        <Dialog open={open} closeAfterTransition BackdropProps={{ onClick: () => { } }}>
            <div className='Modal-FichaCategorias'>
                <div className='crudGrid rb'>
                    <div>
                        <div className='headerDiv'>
                            <h1>Categorías</h1>
                        </div>
                        <button className="cancelButton" onClick={handleModalClose}>
                            <FontAwesomeIcon icon={faTimes} size="2x" />
                        </button>
                        <div className='dataGridBox'>
                            <ThemeProvider theme={theme}>
                                {categorias.length > 0 ? (
                                    <CategoriesDataGrid />
                                ) : (
                                    <p>Cargando categorías...</p>
                                )}
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
            </div >
        </Dialog >
    );
};

export default Ficha_Agregar_Categorias;