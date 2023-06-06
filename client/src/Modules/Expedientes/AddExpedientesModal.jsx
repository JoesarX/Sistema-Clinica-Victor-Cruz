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
import './ModalStyle.css';

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
    fecha_nacimiento: '',
    sexo: 'Masculino',
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
      } catch (error) {
        // Handle error if any
        console.log('Error submitting expediente:', error);
      }
    }
  };

  const validations = () => {
    const { nombre, edad, fecha_nacimiento, sexo, correo, telefono, numid, estado_civil, padecimientos, ocupacion } =
      expediente;
    if (nombre === null || nombre === '') {
      alert('Nombre Completo es requerido');
      return false;
    }
    // if (edad === null || edad === '' || edad < 0) {
    //   alert('Una edad valida es requerida');
    //   return false;
    // }
    if (isNaN(selectedDate.getTime())) {
      alert('Una Fecha valida de Nacimiento es requerida');
      return false;
    }
    if (selectedDate > currentDate) {
      alert('La Fecha de Nacimiento no puede ser mayor a la fecha actual');
      return false;
    }
    if (sexo === null || sexo === '') {
      alert('Sexo es requerido');
      return false;
    }
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
                renderInput={(params) => <TextField {...params} label="Estado Civil" variant="outlined" />}
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
          <TextField id="padecimientos" label="Padecimientos" variant="outlined" onChange={handleModalFieldChange} name="padecimientos"  className="inputField"/>
          <Button
            variant="contained"
            className="modalButton"
            type="submit"
            onClick={handleModalSubmit}
          >
            Guardar Expediente
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default AddExpedientesModal;