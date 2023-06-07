import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material'
import { DataGrid, esES, GridActionsCellItem } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { PersonAdd, Edit, Delete, Person, Person2 } from '@mui/icons-material'
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';
import Popup from '../usuario_admin/Fichas_Admin';
import EditAdmins from './EditAdmins';
import PopupAgregar from '../usuario_admin/PopupAgregar';
import swal from 'sweetalert';

import AdministradoresService from '../../Services/AdministradoresService';

import '../HojaDeEstilos/CrudStyles.css';
import NavBar from '../NavBar';

const Administradores = () => {
   const [usuarios_admin, setAdministradores] = useState([]);
   //esto es para el popup
   const [openPopup, setOpenPopup] = useState(false);
   let [openAddAdmin, setAddAdmin] = useState(false);
   let [nombre, setNombre] = useState('5');
   let [rol, setRol] = useState('');
   let [id, setId] = useState('');
   let [email, setEmail] = useState('');
   let [cel, setCel] = useState('');
   let [sexo, setSexo] = useState('');
   let [contraseña, setPassword] = useState('');
   let [selectedAdministradorId, setSelectedAdministradorId] = useState(null);
   let [openEditAdmin, setEditAdmin] = useState(false);

   const navigate = useNavigate();
   const isLoggedIn = localStorage.getItem("AdminLoggedIn");

   const handleEditAdministradoresClick = (row) => {

      setEditAdmin(true);
      setNombre(row.nombre);
      setRol(row.rol);
      setId(row.id);
      setEmail(row.correo);
      setCel(row.telefono);
      setSexo(row.sexo);
      setPassword(row.password);
   };

   //para el Popup
   const handleSelectedAdministradoresClick = (row) => {
      setOpenPopup(true);
      setNombre(row.nombre);
      setRol(row.rol);
      setId(row.id);
      setEmail(row.correo);
      setCel(row.telefono);
      setSexo(row.sexo);
      setPassword(row.password);

      setSelectedAdministradorId(row.id);
   }

   const handleDeleteAdministradoresClick = (id) => {

      swal({
         title: "¿Estas seguro?",
         text: "Una vez borrado, no podrás recuperar esta información.",
         icon: "warning",
         buttons: true,
         dangerMode: true,
      })
         .then((willDelete) => {
            if (willDelete) {
               const deleteAdministrador = async () => {
                  await AdministradoresService.deleteAdministradores(id);

               };
               deleteAdministrador();

               swal("Colaborador eliminado exitosamente!", {
                  icon: "success",
               });
               window.location.reload();
            } else {
               swal("¡Tu información no se ha borrado!");
            }
         });

   };

   const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
      nombre: true,
      correo: true,
      rol: true,
      password: false
   });

   function CustomToolbar() {
      const handleAgregarAdministradorClick = () => {
         setAddAdmin(true);
         setEditAdmin = { setEditAdmin }
         setNombre('');
         setRol('');
         setId('');
         setEmail('');
         setCel('');
         setSexo('');
         setPassword('');
         console.log("test boton agregar");
      };

      return (



         <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', height: '30px', marginTop: '15px', marginBottom: '10px' }}>

            <div>

               <Typography variant='h6' component='h2' style={{ textAlign: 'right', marginBottom: '-10px', marginLeft: '500px' }}>
                  Lista de colaboradores
               </Typography>


               {/* <GridToolbarColumnsButton /> */}
               <GridToolbarFilterButton />
               <GridToolbarDensitySelector />
               <GridToolbarExport />
            </div>
            <div>

               <Button onClick={handleAgregarAdministradorClick} style={{ backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                  Agregar Administrador
               </Button>
            </div>

         </GridToolbarContainer>


      );
   }

   const theme = createTheme(
      {
         palette: {
            primary: { main: '#1976d2' },
         },
      },
      esES,
   );

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



      <div className='crudGrid'>
         <NavBar />
         <div style={{ height: '100vh' }}>
            <div className='headerDiv'>
               <h1>Colaboradores</h1>
            </div>
            <div className='dataGridBox'>

               <ThemeProvider theme={theme}>

                  <DataGrid

                     rows={usuarios_admin}
                     getRowId={(row) => row.adminId}
                     columns={[
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
                        { field: 'id', headerName: 'Num. ID', flex: 3, headerClassName: 'column-header' },
                        //{ field: 'estado_civil', headerName: 'Estado Civil', flex: 1 },
                        //{ field: 'padecimientos', headerName: 'Padecimientos', flex: 1 },
                        //{ field: 'ocupacion', headerName: 'Ocupacion', flex: 1 },

                        {
                           field: 'actions',
                           headerName: '',
                           flex: 2,
                           renderCell: (params) => (
                              <div>
                                 <IconButton onClick={() => handleEditAdministradoresClick(params.row)}>
                                    <Edit />
                                 </IconButton>
                                 <IconButton onClick={() => handleDeleteAdministradoresClick(params.id)}>
                                    <Delete />


                                 </IconButton>
                                 <IconButton onClick={() => handleSelectedAdministradoresClick(params.row)}>
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
            </div>
            {selectedAdministradorId && (
               <Popup
                  openPopup={openPopup}
                  setOpenPopup={setOpenPopup}
                  setNombre={nombre}
                  setRol={rol}
                  setId={id}
                  setCorreo={email}
                  setTelefono={cel}
                  setSexo={sexo}
                  setPassword={contraseña}
               />
            )}
            {openAddAdmin && (
               <PopupAgregar
                  openAddAdmin={openAddAdmin}
                  setAddAdmin={setAddAdmin}
                  setNombre={''}
                  setRol={''}
                  setId={''}
                  setCorreo={''}
                  setTelefono={''}
                  setPassword={''}
               />

            )}
            {openEditAdmin && (
               <EditAdmins
                  openEditAdmin={openEditAdmin}
                  setEditAdmin={setEditAdmin}
                  setNombre={nombre}
                  setRol={rol}
                  setId={id}
                  setCorreo={email}
                  setTelefono={cel}
                  setPassword={contraseña}
                  setSexo={sexo}
               />)}

         </div>

      </div>);



}

export default Administradores;