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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpedientesService from '../../Services/ExpedientesService';
import { Box, Button } from '@mui/material';

// STYLES


const AddExpedientesModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const listaEstadoCivil = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a'];
  const [fecha_nacimiento, setFechaNacimiento] = useState(null);
  const selectedDate = new Date(fecha_nacimiento);
  const currentDate = new Date();
  const [expediente, setExpediente] = useState({
    nombre: '',
    edad: '',
    fecha_nacimiento: null,
    sexo: null,
    correo: '',
    telefono: '',
    numid: null,
    estado_civil: '',
    padecimientos: '',
    ocupacion: '',
  });


  const handleModalFieldChange = (e) => {
    setExpediente((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

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

  const handleDateChange = (date) => {
    setFechaNacimiento(date);
    const formattedDate = date ? date.toISOString().slice(0, 10) : '';
    setExpediente((prevState) => ({ ...prevState, fecha_nacimiento: formattedDate }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const age = fecha_nacimiento ? calculateAge(fecha_nacimiento) : '';
    setExpediente((prevState) => ({ ...prevState, edad: age }));

    setIsSubmitting(true);

    if (validations()) {
      try {
        // Perform the form submission logic
        await ExpedientesService.postExpedientes(expediente);
        alert('Expediente Agregado');
        onClose();
        window.location.reload(); // Reload the page
      } catch (error) {
        // Handle error if any
        console.log('Error submitting expediente:', error);
      }
    }
  };


  const validations = () => {
    const { nombre, fecha_nacimiento, sexo, correo, telefono, numid, estado_civil, padecimientos, ocupacion } =
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

  useEffect(() => {
    const fetchAllExpedientes = async () => {
      try {
        const expedientesData = await ExpedientesService.getAllExpedientes();
        const expedientesWithId = expedientesData.map((expediente) => ({
          ...expediente,
          pacienteId: expediente.idpaciente,
        }));
        // setExpedientes((prevState) => [...prevState, expediente]);
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
    <Modal open={true} onClose={onClose}>
      <div className="modalContainer">
        <h2 className="modalHeader">NUEVO EXPEDIENTE</h2>
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
          <TextField id="nombre" label="Nombre Completo" variant="outlined" onChange={handleModalFieldChange} name="nombre" className="inputField" />
          <Box mt={.5}></Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="fecha_nacimiento"
                  label="Fecha de Nacimiento"
                  value={fecha_nacimiento || null}
                  onChange={handleDateChange}
                  name="fecha_nacimiento"
                  className="inputField"
                />
              </LocalizationProvider>
            </Grid>
            <Box mt={.5}></Box>
            <Grid item xs={12} sm={6}>
              <div className="radioGroupContainer">
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" className="sexoRadioGroup" id="sexo" onChange={handleModalFieldChange} name="sexo">
                  <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                  <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                </RadioGroup>
              </div>
            </Grid>
          </Grid>
          <Box mt={.5}></Box>
          <TextField id="ocupacion" label="Ocupación" variant="outlined" onChange={handleModalFieldChange} name="ocupacion" className="inputField" />
          <Box mt={.5}></Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField id="correo" label="Correo Electrónico" variant="outlined" type="email" onChange={handleModalFieldChange} name="correo" className="inputField" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="telefono" label="Teléfono" variant="outlined" onChange={handleModalFieldChange} name="telefono" className="inputField" />
            </Grid>
          </Grid>
          <Box mt={.5}></Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField id="numid" label="Número de Identificación" variant="outlined" onChange={handleModalFieldChange} name="numid" className="inputField" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="estado_civil"
                options={listaEstadoCivil}
                renderInput={(params) => <TextField {...params} label="Estado Civil" variant="outlined" required />}
                onChange={(e, value) =>
                  setExpediente((prevState) => ({
                    ...prevState,
                    estado_civil: value,
                  }))
                }
                name="estado_civil"
              />
            </Grid>
          </Grid>
          <Box mt={.5}></Box>
          {/* <TextField id="padecimientos" label="Padecimientos" variant="outlined" onChange={handleModalFieldChange} name="padecimientos"  className="inputField"/> */}
          <Button
            variant="contained"
            className="modalButton"
            type="submit"
            onClick={handleModalSubmit}
            id='crudButton'
          >
            Guardar Expediente
          </Button>

        </Box>
      </div>
    </Modal>
  );
};

export default AddExpedientesModal;