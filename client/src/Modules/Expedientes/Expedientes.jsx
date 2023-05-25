import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material'
import { DataGrid, esES, GridActionsCellItem } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { PersonAdd, Edit, Delete, Person, Person2 } from '@mui/icons-material'
import { IconButton } from '@mui/material';
import Popup from '../usuario_admin/Fichas_Admin';

import ExpedientesService from '../../Services/ExpedientesService';
import './ExpedientesStyle.css';

const Expedientes = () => {
   const [expedientes, setExpedientes] = useState([]);
   //esto es para el popup
   const [openPopup, setOpenPopup] = useState(false);
   const [selectedExpedienteId, setSelectedExpedienteId] = useState(null);

   const navigate = useNavigate();
   const isLoggedIn = localStorage.getItem("isLoggedIn");

   // const handleAddExpedientesClick = () => {
   //    navigate('/expedientes/crear');
   // };

  
   const handleEditExpedientesClick = (id) => {
      navigate(`/expedientes/${id}`);
      
   };
   //para el Popup
   const handleSelectedExpedientesClick= (id)=>{
      setSelectedExpedienteId(id);
      setOpenPopup(true);
   }

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

   function CustomToolbar() {
      const handleAgregarExpedienteClick = () => {
         navigate('/expedientes/crear');
      };

      return (
         <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', height: '30px', marginTop: '15px', marginBottom: '10px' }}>
            <div>
               {/* <GridToolbarColumnsButton /> */}
               <GridToolbarFilterButton />
               <GridToolbarDensitySelector />
               <GridToolbarExport />
            </div>
            <div>
               <Button onClick={handleAgregarExpedienteClick} startIcon={<PersonAdd />} style={{ backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                  Agregar Expediente
               </Button>
            </div>
         </GridToolbarContainer>
      );
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
   }, []);





   return (
      <div className='expedientesGrid'>
         <div className='expedientesGridBox'>
            <ThemeProvider theme={theme}>
               <DataGrid onRowClick={(params) => handleSelectedExpedientesClick(params.row.pacienteId)}
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
         </div>
         {selectedExpedienteId && (
            <Popup
               openPopup={openPopup}
               setOpenPopup={setOpenPopup}
               onClick={() => setOpenPopup(true)}
            />
         )}
      </div>
   );



}

export default Expedientes 