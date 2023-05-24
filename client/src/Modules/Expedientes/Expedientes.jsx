import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//GRID
import { Box, Button } from '@mui/material'
import { DataGrid, esES, GridActionsCellItem } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { PersonAdd, Edit, Delete, Person, Person2 } from '@mui/icons-material'
import { IconButton } from '@mui/material';

//ADD EXPEDIENTES MODAL
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


//STYLES
import ExpedientesService from '../../Services/ExpedientesService';
import './ExpedientesStyle.css';


const Expedientes = () => {
   //========================================================================================================================================================================================================================
   //LOGIN VALIDATION
   const isLoggedIn = localStorage.getItem("isLoggedIn");

   //========================================================================================================================================================================================================================
   //EXPEDIENTES GRID DATA
   const navigate = useNavigate();
   const [expedientes, setExpedientes] = useState([]);

   const handleAddExpedientesClick = () => {
      navigate('/expedientes/crear');
   };

   const handleEditExpedientesClick = (id) => {
      navigate(`/expedientes/${id}`);
   };

   const handleDeleteExpedientesClick = (id) => {
      const deleteExpediente = async () => {
         await ExpedientesService.deleteExpedientes(id);

      };
      deleteExpediente();
      window.location.reload();
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
      nombre: true,
      edad: true,
      fecha_nacimiento: false,
      sexo: true,
      correo: true,
      telefono: true,
      numid: true,
      estado_civil: false,
      padecimientos: false,
      ocupacion: false,
   });

   const CustomToolbar = () => {
      return (
         <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', height: '30px', marginTop: '15px', marginBottom: '10px' }}>
            <div>
               {/* <GridToolbarColumnsButton /> */}
               <GridToolbarFilterButton />
               <GridToolbarDensitySelector />
               <GridToolbarExport />
            </div>
            <div>
               <Button onClick={toggleModal} startIcon={<PersonAdd />} style={{ backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                  Agregar Expediente
               </Button>
            </div>
         </GridToolbarContainer>
      );
   };
   //==================================================================================================================================================================================

   //ADD EXPEDIENTES MODAL
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [expediente, setExpediente] = React.useState({
      nombre: '',
      edad: '',
      fecha_nacimiento: '',
      sexo: 'Masculino',
      correo: '',
      telefono: '',
      numid: null,
      estado_civil: '',
      padecimientos: '',
      ocupacion: ''
   })
   const [isSubmitting, setIsSubmitting] = useState(false);
   const listaEstadoCivil = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a']

   const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
      setIsSubmitting(false);
   };

   const handleModalFieldChange = (e) => {
      setExpediente((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
      console.log(expediente)
   }

   const handleModalSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      if (validations()) {
         try {
            // Perform the form submission logic
            await ExpedientesService.postExpedientes(expediente);
            alert('Expediente Agregado');
            toggleModal();
         } catch (error) {
            // Handle error if any
            console.log('Error submitting expediente:', error);
         }
      }
   };

   const validations = () => {
      const { nombre, edad, fecha_nacimiento, sexo, correo, telefono, numid, estado_civil, padecimientos, ocupacion } = expediente
      if (nombre === null || nombre === '') {
         alert('Nombre Completo es requerido')
         return false
      }
      if (edad === null || edad === '' || edad < 0) {
         alert('Una edad valida es requerida')
         return false
      }
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
      if (estado_civil === null || estado_civil === '') {
         alert('Estado Civil es requerido')
         return false
      }
      return true
   }

   useEffect(() => {
      //validación login
      if (!isLoggedIn) {
         // Redirigir si no se cumple la verificación
         navigate("/iniciarsesion"); // Redirige a la página de inicio de sesión
      }
      const fetchAllExpedientes = async () => {
         try {
            const expedientesData = await ExpedientesService.getAllExpedientes();
            const expedientesWithId = expedientesData.map((expediente) => ({
               ...expediente,
               pacienteId: expediente.idpaciente,
            }));
            setExpedientes(expedientesWithId);
         } catch (error) {
            // Handle error if any
            console.log('Error fetching expedientes:', error);
         }
      };
      fetchAllExpedientes();
      if (isSubmitting) {
         fetchAllExpedientes();
      }
   }, [isSubmitting]);


   return (
      <div className='expedientesGrid'>
         <div className='expedientesGridBox'>
            <ThemeProvider theme={theme}>
               <DataGrid
                  rows={expedientes}
                  getRowId={(row) => row.pacienteId}
                  columns={[
                     //{ field: 'idpaciente', headerName: 'ID', flex: 1 , headerClassName: 'column-header'},
                     {
                        field: 'nombre',
                        headerName: 'Nombre',
                        flex: 5,
                        headerClassName: 'column-header',
                        renderCell: (params) => (
                           <div style={{ display: 'flex', alignItems: 'center', color: params.field === 'nombre' ? 'black' : 'rgb(121,121,121)' }}>
                              {params.row.sexo === 'M' ? (
                                 <Person style={{ color: '#fff', backgroundColor: 'rgb(26,94,235)', borderRadius: '50%', marginRight: '5px', fontSize: '200%' }} />
                              ) : (
                                 <Person2 style={{ color: '#fff', backgroundColor: 'rgb(236,43,254)', borderRadius: '50%', marginRight: '5px', fontSize: '200%' }} />
                              )}
                              {params.value}
                           </div>
                        ),
                     },
                     { field: 'edad', headerName: 'Edad', flex: 1, headerClassName: 'column-header' },
                     //{ field: 'fecha_nacimiento', headerName: 'Fecha de Nacimiento', flex: 1 , headerClassName: 'column-header'},
                     { field: 'sexo', headerName: 'Sexo', flex: 1, headerClassName: 'column-header' },
                     {
                        field: 'correo',
                        headerName: 'Correo Electronico',
                        flex: 5,
                        headerClassName: 'column-header',
                        renderCell: (params) => (
                           <div style={{ display: 'flex', alignItems: 'center' }}>
                              {params.value && params.value.includes('@') ? (
                                 <div style={{ backgroundColor: 'rgb(200,213,255)', color: 'rgb(38,104,242)', padding: '4px 8px', borderRadius: '20px', marginRight: '5px' }}>
                                    {params.value}
                                 </div>
                              ) : (
                                 params.value
                              )}
                           </div>
                        ),
                     },
                     { field: 'telefono', headerName: 'Telefono Celular', flex: 3, headerClassName: 'column-header' },
                     { field: 'numid', headerName: 'Num. Identidad', flex: 4, headerClassName: 'column-header' },
                     //{ field: 'estado_civil', headerName: 'Estado Civil', flex: 1 },
                     //{ field: 'padecimientos', headerName: 'Padecimientos', flex: 1 },
                     //{ field: 'ocupacion', headerName: 'Ocupacion', flex: 1 },

                     {
                        field: 'actions',
                        headerName: '',
                        flex: 2,
                        renderCell: (params) => (
                           <div>
                              <IconButton onClick={() => handleEditExpedientesClick(params.id)}>
                                 <Edit />
                              </IconButton>
                              <IconButton onClick={() => handleDeleteExpedientesClick(params.id)}>
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
                  <h2 className="modalHeader">Agregar Expediente</h2>
                  <Box
                     component="form"
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <TextField id="nombre" label="Nombre Completo" variant="outlined" />
                     <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker id="fecha_nacimiento" label="Fecha de Nacimiento" />
                           </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" id='sexo'>
                              <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                              <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                           </RadioGroup>
                        </Grid>
                     </Grid>
                     <TextField id="ocupacion" label="Ocupación" variant="outlined" />
                     <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                           <TextField id="correo" label="Correo Electrónico" variant="outlined" type='email' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <TextField id="telefono" label="Teléfono" variant="outlined" />
                        </Grid>
                     </Grid>
                     <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                           <TextField id="numid" label="Número de Identidad" variant="outlined" type='number' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <Autocomplete
                              disablePortal
                              id="estado_civil"
                              options={listaEstadoCivil}
                              renderInput={(params) => <TextField {...params} label="Estado Civil" />}
                           />
                        </Grid>
                     </Grid>
                     <Button onClick={handleModalSubmit} variant="contained" style={{ backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        Agregar Expediente
                     </Button>
                  </Box>
               </div>
            </Modal>

         </div>
      </div>
   );



}

export default Expedientes 