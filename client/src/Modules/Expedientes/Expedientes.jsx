import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddExpedientesModal from './AddExpedientesModal.jsx';
import EditExpedientesModal from './EditExpedientesModal.jsx';

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

//ADD EXPEDIENTES MODAL
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
   //esto es para el popup
   const [openPopup, setOpenPopup] = useState(false);
   const [selectedExpedienteId, setSelectedExpedienteId] = useState(null);

   // const handleAddExpedientesClick = () => {
   //    navigate('/expedientes/crear');
   // };

   /*const handleEditExpedientesClick = (id) => {
      navigate(`/expedientes/${id}`);
      
   };*/

   const [isModalOpen1, setIsModalOpen1] = useState(false);

   const handleEditExpedientesClick = () => {
      setIsModalOpen1(true);
      <EditExpedientesModal />
   };


   //para el Popup
   const handleSelectedExpedientesClick = (id) => {
      setSelectedExpedienteId(id);
      setOpenPopup(true);
   }

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

   const [selectedExpediente, setSelectedExpediente] = useState(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitting2, setIsSubmitting2] = useState(false);
   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const listaEstadoCivil = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a'];
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

   const handleDeleteExpedientesClick = (id) => {
      swal({
         title: "¿Estas seguro?",
         text: "Una vez borrado, no podrás recuperar este expediente.",
         icon: "warning",
         buttons: true,
         dangerMode: true,
      })
         .then((willDelete) => {
            if (willDelete) {
               const deleteExpediente = async () => {
                  await ExpedientesService.deleteExpedientes(id);

               };
               deleteExpediente();

               swal("¡Expediente eliminado exitosamente!", {
                  icon: "success",
               });
               window.location.reload();
            } else {
               swal("¡Tu expediente no se ha borrado!");
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
   //==================================================================================================================================================================================


   useEffect(() => {
      // Validación login
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
                        flex: 2,
                        renderCell: (params) => (
                           <div>
                              <IconButton onClick={() => handleOpenEditModal(params.row)}>
                                 <Edit />
                              </IconButton>
                              {isEditModalOpen && (
                                 <EditExpedientesModal
                                 setExpedientes={setExpedientes}
                                 onClose={handleCloseEditModal}
                                 expedienteData={modifiedExpediente} 
                               />
                              )}
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
            

         </div>
      </div>
   );



}

export default Expedientes 