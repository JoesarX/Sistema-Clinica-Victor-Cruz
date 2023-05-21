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
      <div className='expedientesGrid'>
        <div className='expedientesGridBox'>
        <ThemeProvider theme={theme}>
                  <DataGrid
                     rows={expedientes}
                     getRowId={(row) => row.pacienteId}
                     columns={[
                        //{ field: 'idpaciente', headerName: 'ID', flex: 1 , headerClassName: 'column-header'},
                        { field: 'nombre', headerName: 'Nombre', flex: 5 , headerClassName: 'column-header', headerClassName: 'column-header'},
                        { field: 'edad', headerName: 'Edad', flex: 1 , headerClassName: 'column-header'},
                        //{ field: 'fecha_nacimiento', headerName: 'Fecha de Nacimiento', flex: 1 , headerClassName: 'column-header'},
                        { field: 'sexo', headerName: 'Sexo', flex: 1 , headerClassName: 'column-header'},
                        { field: 'correo', headerName: 'Correo', flex: 5 , headerClassName: 'column-header'},
                        { field: 'telefono', headerName: 'Telefono', flex: 3 , headerClassName: 'column-header'},
                        { field: 'numid', headerName: 'Numero de Identidad', flex: 4 , headerClassName: 'column-header'},
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
      </div>
    );
    


}

export default Expedientes