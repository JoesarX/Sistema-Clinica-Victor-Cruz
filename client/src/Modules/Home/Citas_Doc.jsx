import React, { useState } from 'react';
import '../HojaDeEstilos/Citas.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import NavBar from '../NavBar';


//GRID
import { Box, Button } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { PersonAdd, Delete, Edit, Medication } from '@mui/icons-material'
import { IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import swal from 'sweetalert';

//ADD MEDICAMENTOS MODAL
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';




const Citas_Doc = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toggleModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
    setIsSubmitting(false);

  };


  const hiddenDays = [1, 7];

  return (


    <div className="App">

      <NavBar />
      <Button
        onClick={toggleModal}
        startIcon={<PersonAdd />}
        style={{
          backgroundColor: 'rgb(27, 96, 241)',
          color: 'white',
          borderRadius: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        Agregar Cita
      </Button>
      <main>
        <div className="cal-container">
          <div className="cal">
            <FullCalendar
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              selectable={true}
              selectMirror={true}
              editable={true}
              dayMaxEvents={true}
              locale={esLocale}
            />
          </div>
        </div>
        <Modal open={isAddModalOpen} onClose={toggleModal} closeAfterTransition BackdropProps={{ onClick: () => { } }} >

          <div className='modalContainer modalMedicamentos'>

            <h2 className="modalHeader">AGREGAR MEDICAMENTO</h2>
            <button className="cancelButton" onClick={toggleModal}>
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
              <TextField id="nombre" label="Nombre" variant="outlined" onChange={handleModalFieldChange} name='nombre' required />
              <Autocomplete
                disablePortal
                id="categoria"
                required
                options={listaCategoriaMedicamentos}
                onChange={(event, newValue) =>
                  setMedicamento({
                    ...medicamento,
                    categoria: newValue
                  })

                }
                renderInput={(params) => <TextField {...params} label="Categoria" required />}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField id="stock" label="Unidades" variant="outlined" onChange={handleModalFieldChange} name='stock' required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="precio_unitario" label="Precio Unitario" variant="outlined" onChange={handleModalFieldChange} name='precio_unitario' required />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    disablePortal
                    id="via"
                    required
                    options={listaVias}
                    onChange={(event, newValue) =>
                      setMedicamento({
                        ...medicamento,
                        via: newValue
                      })

                    }
                    renderInput={(params) => <TextField {...params} label="Via" required />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="dosis" label="Dosis" variant="outlined" onChange={handleModalFieldChange} name='dosis' required />
                </Grid>
              </Grid>
              <Grid container spacing={2} >
                <Grid item xs={3} sm={1} >
                  <input
                    type="file"
                    onChange={(event) => {
                      setImageUpload(event.target.files[0]);
                      console.log(imageUpload);
                    }}
                    name='urlfoto'
                    id="urlfoto"
                  />
                </Grid>
              </Grid>

              <Button
                onClick={handleModalSubmit}
                variant="contained"
                className="modalButton"
                type="submit"
                id='crudButton'>
                Agregar Medicamento
              </Button>
            </Box>
          </div>
        </Modal>
      </main>

      <footer>

      </footer>
    </div>

  );

};

export default Citas_Doc;
