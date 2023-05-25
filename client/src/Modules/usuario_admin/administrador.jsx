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

import AdministradoresService from '../../Services/AdministradoresService';
import './administradorStyle.css';

const Administradores = () => {
   const [expedientes, setAdministradores] = useState([]);
   //esto es para el popup
   const [openPopup, setOpenPopup] = useState(false);
   const [selectedAdministradorId, setSelectedAdministradorId] = useState(null);

   const navigate = useNavigate();
   const isLoggedIn = localStorage.getItem("isLoggedIn");

  
   const handleEditAdministradoresClick = (id) => {
      navigate(`/usuarios_admin/${id}`);
      
   };
   //para el Popup
   const handleSelectedAdministradoresClick= (id)=>{
      setSelectedAdministradorId(id);
      setOpenPopup(true);
   }

   const handleDeleteAdministradoresClick = (id) => {

      const deleteAdministrador = async () => {
         await AdministradoresService.deleteAdministradores(id);

      };
      deleteAdministrador();
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
      correo: true,
      rol: true,
      password: false
   });

   function CustomToolbar() {
      const handleAgregarAdministradorClick = () => {
         navigate('/administrador/crear');
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
               <Button onClick={handleAgregarAdministradorClick} startIcon={<PersonAdd />} style={{ backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                  Agregar Administrador
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
      const fetchAllAdministradores = async () => {
         try {
            const administradoresData = await AdministradoresService.getAllAdministradores();
            const administradoresWithId = administradoresData.map((administrador) => ({
               ...administrador,
               adminId: administrador.id,
            }));
            setAdministradores(administradoresWithId);
         } catch (error) {
            // Handle error if any
            console.log('Error fetching administradores:', error);
         }
      };
      fetchAllAdministradores();
   }, []);

   return (
      <div className='administradoresGrid'>
         <div className='administradoresGridBox'>
            <ThemeProvider theme={theme}>
               <DataGrid onRowClick={(params) => handleSelectedAdministradoresClick(params.row.adminId)}
                  rows={expedientes}
                  getRowId={(row) => row.adminId}
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
                     //{ field: 'fecha_nacimiento', headerName: 'Fecha de Nacimiento', flex: 1 , headerClassName: 'column-header'},
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
                     { field: 'rol', headerName: 'Rol', flex: 3, headerClassName: 'column-header' },
                     //{ field: 'estado_civil', headerName: 'Estado Civil', flex: 1 },
                     //{ field: 'padecimientos', headerName: 'Padecimientos', flex: 1 },
                     //{ field: 'ocupacion', headerName: 'Ocupacion', flex: 1 },

                     {
                        field: 'actions',
                        headerName: '',
                        flex: 2,
                        renderCell: (params) => (
                           <div>
                              <IconButton onClick={() => handleEditAdministradoresClick(params.id)}>
                                 <Edit />
                              </IconButton>
                              <IconButton onClick={() => handleDeleteAdministradoresClick(params.id)}>
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
         {selectedAdministradorId && (
            <Popup
               openPopup={openPopup}
               setOpenPopup={setOpenPopup}
               onClick={() => setOpenPopup(true)}
            />
         )}
      </div>
   );



}

export default Administradores