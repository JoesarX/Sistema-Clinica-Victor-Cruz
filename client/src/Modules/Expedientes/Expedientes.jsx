import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddExpedientesModal from './AddExpedientesModal.jsx';

//GRID
import { Box, Button } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { PersonAdd, Delete, Person, Person2, Visibility, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import swal from 'sweetalert';
import moment from 'moment';
import dayjs from 'dayjs';


//modal
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';




//STYLES
import ExpedientesService from '../../Services/ExpedientesService';
import './ExpedientesStyle.css';
import '../HojaDeEstilos/CrudStyles.css';

import NavBar from '../NavBar';


const Expedientes = () => {
   //========================================================================================================================================================================================================================
   //LOGIN VALIDATION
   const AdminIsLoggedIng = localStorage.getItem("300");
   const UserIsLoggedIng = localStorage.getItem("100");
   const MasterIsLoggedIng = localStorage.getItem("400");
   let isLoggedIn = false;

   //========================================================================================================================================================================================================================
   //EXPEDIENTES GRID DATA
   const navigate = useNavigate();
   const [expedientes, setExpedientes] = useState([]);
   const [selectedExpediente, setSelectedExpediente] = useState(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);


   const [isModalOpen1, setIsModalOpen1] = useState(false);

   const toggleModal22 = () => {


      setIsModalOpen1(!isModalOpen1);
      setIsSubmitting2(false);
   };

   const [expedienteData, setExpedientess] = useState([]);



   const theme = createTheme(
      {
         palette: {
            primary: { main: '#1976d2' },
         },
      },
      esES,
   );

   const modifiedExpediente = {
      selectedExpediente,
      id: '1' // Replace 'unique-id' with a unique identifier for the expediente
   };

   // Function to open the add modal

   const openAddModal = () => {
      setIsAddModalOpen(true);
   };
   const handleOpenModal = () => {
      openAddModal(); // Call the openAddModal function to open the modal
   };
   const closeAddModal = () => {
      setIsAddModalOpen(false);
   };


   // Funcion para cerrar el edit modal
   const handleOpenEditModal = (expediente) => {
      setSelectedExpediente(expediente);
      setIsEditModalOpen(true);
   };

   // Function to handle closing the edit modal
   const handleCloseEditModal = () => {
      setSelectedExpediente(null);
      setIsEditModalOpen(false);
   };

   const handleViewExpedientesClick = (id) => {
      navigate(`/expedientes/dashboard/${id}`);
   };

   const handleDeleteExpedientesClick = (id) => {
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
                  await ExpedientesService.deleteExpedientes(id);
                  swal("Colaborador eliminado exitosamente!", {
                     icon: "success",
                  });
                  window.location.reload();
               } catch (error) {
                  swal("Error al eliminar el colaborador. Por favor, inténtalo de nuevo más tarde.", {
                     icon: "error",
                  });
               }
            } else {
               swal("¡Tu información no se ha borrado!");
            }
         });
   };

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
   const handleModalFieldChange = (e) => {
      setExpediente((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

   }
   const [isSubmitting2, setIsSubmitting2] = useState(false);
   const handleDateChange = (date) => {

      console.log(date)
      setFechaNacimiento(date);
      const formattedDate = date ? date.toISOString().slice(0, 10) : '';
      console.log(formattedDate)
      setExpediente((prevState) => ({ ...prevState, fecha_nacimiento: formattedDate }))
      console.log(fecha_nacimiento)
      const age = formattedDate ? calculateAge(formattedDate) : '';
      console.log(age)
      setExpediente((prevState) => ({ ...prevState, edad: age }))

   };

   const [expediente, setExpediente] = React.useState({
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

   const listaEstadoCivil = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a']



   const [fecha_nacimiento, setFechaNacimiento] = useState(null);

   const defaultValue = expediente.sexo;
   const selectedValue2 = expediente.estado_civil;

   const [id, setID] = useState(null);

   const fetchAllExpedientes2 = async () => {
      try {
         const expedientesData = await ExpedientesService.getAllExpedientes();
         const expedientesWithId = expedientesData.map((expediente) => ({
            ...expediente,
            pacienteId: expediente.idpaciente,
         }));
         setExpedientes(expedientesWithId);
      } catch (error) {
         // Handle error if any
         console.log("Error fetching expedientes:", error);
      }
   };
   const validations = () => {
      const { nombre, fecha_nacimiento, sexo, correo, telefono, numid, estado_civil, ocupacion } =
         expediente;
      //Nombre validation
      if (nombre === null || nombre === '') {
         alert('Nombre Completo es requerido');
         return false;
      } else if (!nombre.replace(/\s/g, '').length) {
         alert('El nombre no puede contener solo espacios.');
         return false
      } else if (nombre.charAt(0) === ' ') {
         alert('El nombre no puede iniciar con un espacio.');
         return false
      } else if (nombre.charAt(nombre.length - 1) === ' ') {
         alert('El nombre no puede terminar con un espacio.');
         return false
      }
      //Fecha de Nacimiento validation
      const selectedDate = new Date(fecha_nacimiento);
      const currentDate = new Date();
      if (isNaN(selectedDate.getTime()) || fecha_nacimiento === null || fecha_nacimiento === '') {
         alert('Una Fecha valida de Nacimiento es requerida');
         return false;
      }
      if (selectedDate > currentDate) {
         alert('La Fecha de Nacimiento no puede ser mayor a la fecha actual');
         return false;
      }
      //Sexo validation
      if (sexo === null || sexo === '') {
         alert('Sexo es requerido');
         return false;
      }
      //Ocupacion validation
      if (!(ocupacion === null || ocupacion === '')) {
         if (!ocupacion.replace(/\s/g, '').length) {
            alert('La ocupación no puede contener solo espacios.');
            return false
         } else if (ocupacion.charAt(0) === ' ') {
            alert('La ocupación no puede iniciar con un espacio.');
            return false
         } else if (ocupacion.charAt(ocupacion.length - 1) === ' ') {
            alert('La ocupación no puede terminar con un espacio.');
            return false
         }
      }
      //Correo validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!(correo === null || correo === '')) {
         if (!correo.replace(/\s/g, '').length) {
            alert('El correo no puede contener solo espacios.');
            return false
         } else if (emailRegex.test(correo) != true) {
            alert('El correo ingresado no tiene un formato válido.')
            return false
         } else if (correo.charAt(0) === ' ') {
            alert('El correo no puede iniciar con un espacio.');
            return false
         } else if (correo.charAt(correo.length - 1) === ' ') {
            alert('El correo no puede terminar con un espacio.');
            return false
         }
      }
      //Telefono validation
      if (!(telefono === null || telefono === '')) {
         if (!telefono.replace(/\s/g, '').length) {
            alert('El numero de Telefono no puede contener solo espacios.');
            return false
         } else if (telefono.charAt(0) === ' ') {
            alert('El numero de Telefono no puede iniciar con un espacio.');
            return false
         } else if (telefono.charAt(telefono.length - 1) === ' ') {
            alert('El numero de Telefono no puede terminar con un espacio.');
            return false
         }
      }
      //Numid validation
      if (!(numid === null || numid === '')) {
         if (!numid.replace(/\s/g, '').length) {
            alert('El numero de Identidad no puede contener solo espacios.');
            return false
         } else if (numid.charAt(0) === ' ') {
            alert('El numero de Identidad no puede iniciar con un espacio.');
            return false
         } else if (numid.charAt(numid.length - 1) === ' ') {
            alert('El numero de Identidad no puede terminar con un espacio.');
            return false
         }
      }
      //Estado Civil validation
      if (estado_civil === null || estado_civil === '') {
         alert('Estado Civil es requerido');
         return false;
      }
      return true;
   };

   const EditHandler = () => {
      const editExpediente = async () => {
         if (validations()) {
            console.log(':)')
            await ExpedientesService.editExpedientes(id, expediente);
            alert('Expediente Editado');
            toggleModal22();
            window.location.reload();
         }

      };
      console.log(expediente)
      editExpediente();


      navigate('/expedientes')
      fetchAllExpedientes2();
      // window.location.reload();
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
               <Button
                  onClick={handleOpenModal}
                  startIcon={<PersonAdd />}
                  style={{
                     backgroundColor: 'rgb(27, 96, 241)',
                     color: 'white',
                     borderRadius: '10px',
                     paddingLeft: '10px',
                     paddingRight: '10px',
                  }}
               >
                  Agregar Expediente
               </Button>
               {/* AddExpedientesModal */}
               {isAddModalOpen && <AddExpedientesModal onClose={closeAddModal} />}
            </div>

         </GridToolbarContainer>
      );
   };

   const toggleModal2 = async (id) => {
      setID(id)
      console.log(id)
      try {
         const expedienteData = await ExpedientesService.getOneExpediente(id);
         console.log(expedienteData)
         setExpedientess([expedienteData]);
         setExpediente(expedienteData);
         console.log(expedienteData)
      } catch (error) {
         console.log(error);
      }

      setIsModalOpen1(!isModalOpen1);
      setIsSubmitting2(false);
   };
   //==================================================================================================================================================================================



   //==================================================================================================================================================================================

   let buscaError = 0;

   useEffect(() => {
      // Validación login
      console.log("Este es el error: " + (buscaError++));
      if (!AdminIsLoggedIng && !UserIsLoggedIng && !MasterIsLoggedIng) {

         navigate("/iniciarsesion");
      } else {
         isLoggedIn = true;
         console.log(':)')
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
            console.log("Error fetching expedientes:", error);
         }
      };

      // Update tabla
      fetchAllExpedientes();
      if (isSubmitting) {
         fetchAllExpedientes();
      }

      const handleResize = () => {
         const isMobile = window.innerWidth < 600; // Define the screen width threshold for mobile devices

         // Update the column visibility based on the screen width
         setColumnVisibilityModel((prevVisibility) => ({
            ...prevVisibility,
            idpaciente: isMobile ? false : true,
            nombre: true,
            edad: isMobile ? false : true,
            sexo: isMobile ? false : true,
            correo: isMobile ? false : true,
            telefono: isMobile ? false : true,
            numid: isMobile ? false : true,

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
               <h1>Expedientes</h1>
            </div>
            <div className='dataGridBox'>
               <ThemeProvider theme={theme}>
                  <DataGrid
                     rows={expedientes}
                     getRowId={(row) => row.pacienteId}
                     columns={[
                        { field: 'idpaciente', headerName: 'ID', flex: 1.5 , headerClassName: 'column-header'},
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
                        { field: 'fecha_nacimiento', headerName: 'Fecha de Nacimiento', flex: 3, headerClassName: 'column-header' },
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
                        { field: 'estado_civil', headerName: 'Estado Civil', flex: 4 },
                        { field: 'padecimientos', headerName: 'Padecimientos', flex: 4 },
                        { field: 'ocupacion', headerName: 'Ocupacion', flex: 3 },

                        {
                           field: 'actions',
                           headerName: '',
                           flex: 3,
                           renderCell: (params) => (
                              <div>
                                 <IconButton onClick={() => handleViewExpedientesClick(params.id)}>
                                    <Visibility />
                                 </IconButton>

                                 <IconButton onClick={() => toggleModal2(params.id)}  >
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
               <Modal open={isModalOpen1} onClose={toggleModal22} className='customModal' closeAfterTransition BackdropProps={{ onClick: () => { } }}>

                  <div className='modalContainer'>
                     {expedienteData.map((expediente) => (
                        <div className='innerCard' key={expediente.idpaciente} onClick={(e) => e.stopPropagation()}>

                           <h2 className="modalHeader">EDITAR EXPEDIENTE</h2>
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

                              <TextField id="nombre" label="Nombre Completo" defaultValue={expediente.nombre} variant="outlined" onChange={handleModalFieldChange} name='nombre' required />
                              <Box mt={.5}></Box>
                              <Grid container spacing={2}>
                                 <Grid item xs={12} sm={6}>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                       <MobileDatePicker
                                          id="fecha_nacimiento"
                                          defaultValue={dayjs(expediente.fecha_nacimiento)}
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
                              <Box mt={.5}></Box>
                              <TextField id="ocupacion" label="Ocupación" variant="outlined" defaultValue={expediente.ocupacion} onChange={handleModalFieldChange} name='ocupacion' required />
                              <Box mt={.5}></Box>
                              <Grid container spacing={2}>
                                 <Grid item xs={12} sm={6}>
                                    <TextField id="correo" label="Correo Electrónico" defaultValue={expediente.correo} variant="outlined" type='email' onChange={handleModalFieldChange} name='correo' />
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <TextField id="telefono" label="Teléfono" variant="outlined" defaultValue={expediente.telefono} onChange={handleModalFieldChange} name='telefono' />
                                 </Grid>
                              </Grid>
                              <Box mt={.5}></Box>
                              <Grid container spacing={2}>
                                 <Grid item xs={12} sm={6}>
                                    <TextField id="numid" label="Número de Identidad" variant="outlined" defaultValue={expediente.numid} onChange={handleModalFieldChange} name='numid' />
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <Autocomplete
                                       value={selectedValue2}
                                       disablePortal
                                       id="estado_civil"
                                       required
                                       options={listaEstadoCivil}
                                       onChange={(event, newValue) =>
                                          setExpediente({
                                             ...expediente,
                                             estado_civil: newValue
                                          })
                                       }
                                       renderInput={(params) => <TextField {...params} label="Estado Civil" required />}

                                    />
                                 </Grid>
                              </Grid>
                              <Button onClick={EditHandler} variant="contained" style={{
                                 backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px',
                                 paddingLeft: '10px', paddingRight: '10px', marginTop: '14px', width: '270px', fontSize: '18px', alignSelf: 'center'
                              }}>
                                 Editar Expediente
                              </Button>
                           </Box>
                        </div>
                     ))}
                  </div>
               </Modal>

            </div >
         </div >
      </div >

   );



}

export default Expedientes 