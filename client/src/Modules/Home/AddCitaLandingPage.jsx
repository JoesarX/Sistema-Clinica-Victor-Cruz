import React, { useState, useEffect, forwardRef } from 'react';
import { Modal, Box, TextField, Autocomplete, Button } from '@mui/material'; // Import the necessary Material-UI components

import ExpedientesService from '../../Services/ExpedientesService';
import UsuariosService from '../../Services/UsuariosService';

import swal from 'sweetalert';
import CitasService from '../../Services/CitasService';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';



function AddCitaLandingPage({ isModalOpen, toggleModal, id, fromCalendar = false, date, time}) {
  // Your component code goes here, make sure to replace all instances of 'cita' with your props and state as needed
  const isLoggedIn = localStorage.getItem("100");
  const correo = localStorage.getItem("correo");
  const [fecha, setFecha] = useState(dayjs());

  const [perfil, setPerfil] = useState({});
  const [availableTimes, setAvailableTimes] = useState([]);
  const [hora, setHora] = useState(null);
  const [Expedientes, setExpedientes] = useState([]);

  const [isSubmitting2, setIsSubmitting2] = useState(false);

  useEffect(() => {
    console.log("ESTOY EN EL USE EFFECT LANDING PAGE")
    const fetchExpedientes = async () => {
      try {
        const expedientesData = await ExpedientesService.getUserExpedients(correo);
        console.log(expedientesData)
        const expedientesFormatted = expedientesData.map((expediente) => ({
          idpaciente: expediente.idpaciente,
          nombre: expediente.nombre,
          edad: expediente.edad, // Assuming 'age' property exists in 'expediente' object
          // Add other relevant properties from the 'Expedientes' table
        }));
        console.log("estoy tratando de hacer cositas")
        console.log(expedientesFormatted)
        const usuariosData = await UsuariosService.getAllusuarios();
        const usuariosFormatted = usuariosData.map((usuario) => {
          return {
            correouser: usuario.correouser,
            // Add other relevant properties from the 'Usuario' table
          };
        });

        setExpedientes(expedientesFormatted);
        // setUsuarios(usuariosFormatted);

      } catch (error) {
        console.log(error + "FUCK");
      }
    }
    fetchExpedientes();

    let cont = 0;
    if (isSubmitting2) {
      fetchExpedientes();
    }

  }, [isSubmitting2]);


  const [cita, setCita] = useState({
    idcita: '',
    nombre_persona: '',
    estado: '',
    idpaciente: '',
    correouser: '',
    nombre: '',
    altura: null,
    peso: null,
    temperatura: null,
    ritmo_cardiaco: null,
    presion: null,

  });

  const [Expedientess, setExpedientess] = useState({
    idpaciente: '',
    nombre: '',
    edad: '',
  });

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      cita.estado = "Pendiente";
      cita.correouser = perfil.correo;
      if (validations()) {
        // console.log("Entra a agregar despues de validaciones");
        // console.log("Fecha: " + cita.fecha + " Hora: " + cita.hora)
        const availableResponse = await CitasService.getCheckAvailability(cita.fecha, cita.hora);;
        const isAvailable = availableResponse.available;
        // console.log("isAvailable: " , isAvailable);

        if (!isAvailable) {
          swal("La hora que ha seleccionado ya ha sido ocupada.", {
            icon: "error",
          });
          setHora(null);
          const formattedDate = cita.fecha ? dayjs(cita.fecha).format('YYYY-MM-DD') : ''
          const times = await CitasService.getAvailableTimes(formattedDate);
          setAvailableTimes(times);
        } else {
          submitCita();
          console.log(cita)
        }
      }
      
    } catch (error) {
      // Handle error if any
      // console.log('Error submitting cita:', error);
    }
  };

  const validations = () => {
    const { nombre_persona, estado } = cita
    var lettersRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    //Nombre validations
    if (nombre_persona === null || nombre_persona === '') {
      swal("Debe Agregarle un nombre a la Cita!", {
        icon: "error",
      });
      return false
    } else if (!nombre_persona.replace(/\s/g, '').length) {
      swal("El nombre no puede contener solo espacios.", {
        icon: "error",
      });
      return false
    } else if (nombre_persona.charAt(0) === ' ') {

      swal("El nombre no puede iniciar con un espacio.", {
        icon: "error",
      });
      return false
    } else if (nombre_persona.charAt(nombre_persona.length - 1) === ' ') {
      swal("El nombre no puede terminar con un espacio", {
        icon: "error",
      });
      return false
    } else if (!lettersRegex.test(nombre_persona)) {
      swal("Nombre invalido, no puede tener numeros ni caracteres especiales como @#$%.", {
        icon: "error",
      });
      return false;
    }

    if (estado === null || estado === '') {
      swal("Debe agregar un estado valido.", {
        icon: "error",
      });
      return false;
    }

    if (fecha === null || fecha === '') {
      swal("Debe Agregar una fecha valida", {
        icon: "error",
      });
      if(!fecha) return false;
    } else if (fecha.format('YYYY-MM-DD') < dayjs().format('YYYY-MM-DD')) {
      swal("La fecha no puede ser menor a la fecha actual", {
        icon: "error",
      });
      if(!fecha) return false;
    } else {
      cita.fecha = fecha.format('YYYY-MM-DD');
    }

    if (hora === null || hora === '') {
      swal("Debe agregar una hora valida", {
        icon: "warning",
      });
      if(!time) return false;
    } else {
      const timeString = cita.hora;
      const [time, meridiem] = timeString.split(" ");
      const [hourString, minuteString] = time.split(":");
      const hour = parseInt(hourString, 10);
      const minute = parseInt(minuteString, 10);
      let hour24 = hour;
      // console.log(hour24)
      // console.log(meridiem)
      if (meridiem === "PM" && hour != 12) {
        hour24 += 12;
      }
      cita.hora = hour24 + ":" + minuteString + ":00";
    }

    if (fecha.format('YYYY-MM-DD') == dayjs().format('YYYY-MM-DD') && cita.hora < dayjs().format('HH:mm:ss')) {
      swal("La hora que ha seleccionado para hoy ya ha pasado.", {
        icon: "error",
      });
      return false;
    }
    return true;
  }
  const submitCita = async () => {
    // console.log("doneee");

    // console.log("Entra a agregar despues de validaciones");
    try {

      if(time && date) {
        cita.hora = time;
        cita.fecha = date;
      }

      await CitasService.postCitas(cita);
      //
      console.log(cita)
      swal("Cita Agregada.", {
        icon: "success",
      });
      toggleModal();
      window.location.reload();
    } catch (error) {
      // Handle error if any
      // console.log('Error submitting cita:', error);
    }
  };

  const handleModalFieldChange = (e) => {
    setCita((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    console.log(cita)
  }
  const handleDateChange = async (date) => {
    setFecha(date);
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''; // Format date using dayjs
    setAvailableTimes([]); // Clear availableTimes when date changes
    setHora(null); // Clear selected hora when date changes
    setCita((prevCita) => ({ ...prevCita, fecha: formattedDate }));
    const times = await CitasService.getAvailableTimes(formattedDate);
    setAvailableTimes(times);
  };
  const isWeekday = (date) => {
    const day = date.day();
    return day == 0 || day == 6; // 0 is Sunday, 6 is Saturday
  };

  function formatAppointmentDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
      return "DIA NO VALIDO";
    }

    const formattedDate = date.toLocaleDateString("es-HN", options);

    return formattedDate;
  }

  const formatAppointmentTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date(0, 0, 0, hours, minutes);

    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <Modal open={isModalOpen} onClose={toggleModal} closeAfterTransition BackdropProps={{ onClick: () => { } }}>
      <div className='modalContainer modalCitas'>
        <h2 className="modalHeader">AGENDAR CITA</h2>
        <button className="cancelButton" onClick={toggleModal}>
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </button>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="nombre_persona" label="Nombre de la Cita" variant="outlined" onChange={handleModalFieldChange} name='nombre_persona' required />
          <Autocomplete
            value={Expedientess}
            disablePortal
            id="idpaciente"
            options={Expedientes}
            getOptionLabel={(expediente) => `${expediente.nombre} (${expediente.edad} años)`}
            onChange={(event, newValue) => {
              cita.idpaciente = newValue?.idpaciente;
            }}
            renderInput={(params) => (
              <TextField {...params} label="ID Paciente" />
            )}
            ListboxProps={
              {
                style: {
                  maxHeight: '220px',
                  border: '1px solid BLACK'
                }
              }
            }
          />
          {fromCalendar ?
            <div class='schedule-appointment-label'>
              {formatAppointmentDate(date)} <br/>
              a la(s)
            </div>
            :
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                id="fecha"
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                shouldDisableDate={isWeekday}
                label="Fecha"
                name='fecha'
                value={fecha}
              />
            </LocalizationProvider>
          }
          {fromCalendar ?
            <div class='schedule-appointment-label'>
              {formatAppointmentTime(time)}
            </div>
            :
            <Autocomplete
              disablePortal
              id="hora"
              required
              options={availableTimes}
              value={hora}
              onChange={(event, newValue) => {
                setHora(newValue);
                setCita((prevCita) => ({ ...prevCita, hora: newValue }));
              }}
              renderInput={(params) => <TextField {...params} label="Hora" required style={{ marginBottom: '0.45rem' }} />}
              ListboxProps={
                {
                  style: {
                    maxHeight: '300px',
                    border: '1px solid BLACK'
                  }
                }
              }
            />
          }

          <Button onClick={handleModalSubmit} variant="contained" style={{
            backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px',
            paddingLeft: '10px', paddingRight: '10px', width: '270px', fontSize: '18px', alignSelf: 'center'
          }}>
            Agendar Cita
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default AddCitaLandingPage;