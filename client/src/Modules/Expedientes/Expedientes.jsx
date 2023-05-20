import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { PersonAdd, Edit, Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material';

import ExpedientesService from '../../Services/ExpedientesService';
import './ExpedientesStyle.css';

const Expedientes = () => {
   const [expedientes, setExpedientes] = useState([]);


   const navigate = useNavigate();

   // const handleAddExpedientesClick = () => {
   //    navigate('/expedientes/crear');
   // };

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
         <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
               {/* <GridToolbarColumnsButton /> */}
               <GridToolbarFilterButton />
               <GridToolbarDensitySelector />
               <GridToolbarExport />
            </div>
            <div>
               <Button onClick={handleAgregarExpedienteClick} startIcon={<PersonAdd />}>
                  Agregar Expediente
               </Button>
            </div>
         </GridToolbarContainer>
      );
   }

   useEffect(() => {
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
      <div style={{ backgroundColor: 'rgb(227, 235, 248)' }}>
         <h1>Expedientes</h1>
         <div
            className='expedientesGrid'
            style={{
               height: '90vh',
               width: '100%',
               display: 'flex',
               justifyContent: 'center',
               border: 'none',
            }}
         >
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  border: 'none',
                  width: '100%',
                  marginLeft: '15px',
                  marginRight: '15px',
               }}
            >
               <ThemeProvider theme={theme}>
                  <DataGrid
                     rows={expedientes}
                     getRowId={(row) => row.pacienteId}
                     columns={[
                        //{ field: 'idpaciente', headerName: 'ID', flex: 1 },
                        { field: 'nombre', headerName: 'Nombre', flex: 5 },
                        { field: 'edad', headerName: 'Edad', flex: 1 },
                        //{ field: 'fecha_nacimiento', headerName: 'Fecha de Nacimiento', flex: 1 },
                        { field: 'sexo', headerName: 'Sexo', flex: 1 },
                        { field: 'correo', headerName: 'Correo', flex: 5 },
                        { field: 'telefono', headerName: 'Telefono', flex: 3 },
                        { field: 'numid', headerName: 'Numero de Identidad', flex: 4 },
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
                     sx={{
                        '& .MuiDataGrid-root': {
                           border: 'none !important', // Remove the outside border
                           borderRadius: '0',
                           borderLeft: '0px solid rgb(227, 235, 248)',
                           borderColor: 'rgb(227, 235, 248)',
                           backgroundColor: 'rgb(227, 235, 248)',
                           boxShadow: 'none', // Remove the shadow
                        },
                        '& .MuiDataGrid-window': {
                           border: 'none', // Remove the border between rows and header/footer
                        },
                        '& .MuiDataGrid-row': {
                           marginBottom: '8px', // Add separation between rows
                           borderRadius: 4,
                           backgroundColor: '#FFFFFF',
                           '&:last-child': {
                              marginBottom: '0', // Remove margin bottom for the last row
                           },
                        },
                        '& .MuiDataGrid-cell': {
                           borderBottom: 'none',
                           fontSize: '20px',
                        },
                        '& .MuiDataGrid-colCellTitle': {
                           fontSize: '18px',
                           fontWeight: 'bold !important',
                           color: '#1976d2 !important',
                         },
                     }}
                     columnVisibilityModel={columnVisibilityModel}
                     onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                  />
               </ThemeProvider>
            </Box>
         </div>
      </div>
   );


}

export default Expedientes