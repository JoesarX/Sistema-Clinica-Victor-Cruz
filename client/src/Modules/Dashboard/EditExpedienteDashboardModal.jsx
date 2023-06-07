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

import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ExpedientesService from '../../Services/ExpedientesService';
import { Box, Button } from '@mui/material'

//STYLES

import '../Expedientes/ModalStyle.css';


const EditExpedienteDashboardModal = ({setExpedientes, onClose}) => {

    // const navigate = useNavigate();
    // const [expediente, setExpediente] = useState({
    //     nombre: '',
    //     edad: '',
    //     fecha_nacimiento: '',
    //     correo:  '',
    //     telefono: '',
    //     numid:null,
    //     estado_civil: '',
    //     ocupacion:  '',
    //     direccion: '',
    //   });
    // const [isSubmitting, setIsSubmitting] = useState(false);
    const listaEstadoCivil = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a'];


    // const handleModalFieldChange = (e) => {
    //     setExpediente((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    // };

    // const calculateAge = (dob) => {
    //     const birthDate = new Date(dob);
    //     const today = new Date();
    //     let age = today.getFullYear() - birthDate.getFullYear();
    //     const monthDiff = today.getMonth() - birthDate.getMonth();
    //     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    //         age--;
    //     }
    //     return age;
    // };

    // const handleDateChange = (date) => {
    //     setFechaNacimiento(date);
    //     const formattedDate = date ? date.toISOString().slice(0, 10) : '';
    //     setExpediente((prevState) => ({ ...prevState, fecha_nacimiento: formattedDate }));
    // };

    // const [fecha_nacimiento, setFechaNacimiento] = useState(null);

    // const handleModalSubmit = async (e) => {
    //     e.preventDefault();
    //     const age = fecha_nacimiento ? calculateAge(fecha_nacimiento) : '';
    //     setExpediente((prevState) => ({ ...prevState, edad: age }));
      
    //     setIsSubmitting(true);
      
    //     if (validations()) {
    //       try {
    //         await ExpedientesService.updateExpediente({
    //           ...expediente // Include updated expediente data
    //         });
    //         alert('Expediente Modificado');
    //         onClose();
    //       } catch (error) {
    //         console.log('Error updating expediente:', error);
    //       }
    //     }
    //   };

    const [estado_civil, setSelectedOption] = useState(null);

    // const validations = () => {
    //     const { nombre, edad, fecha_nacimiento, sexo, correo, telefono, numid, estado_civil, padecimientos, ocupacion } = expediente;
    //     if (nombre === null || nombre === '') {
    //         alert('Nombre Completo es requerido');
    //         return false;
    //     }
    //     if (edad === null || edad === '' || edad < 0) {
    //         alert('Una edad valida es requerida');
    //         return false;
    //     }
    //     const selectedDate = new Date(fecha_nacimiento);
    //     const currentDate = new Date();
    //     if (isNaN(selectedDate.getTime())) {
    //         alert('Una Fecha valida de Nacimiento es requerida');
    //         return false;
    //     }
    //     if (selectedDate > currentDate) {
    //         alert('La Fecha de Nacimiento no puede ser mayor a la fecha actual');
    //         return false;
    //     }
    //     if (sexo === null || sexo === '') {
    //         alert('Sexo es requerido');
    //         return false;
    //     }
    //     if (estado_civil === null || estado_civil === '') {
    //         alert('Estado Civil es requerido');
    //         return false;
    //     }
    //     return true;
    // };

    // useEffect(() => {

    //     const fetchAllExpedientes = async () => {
    //         try {
    //             const expedientesData = await ExpedientesService.getAllExpedientes();
    //             const expedientesWithId = expedientesData.map((expediente) => ({
    //                 ...expediente,
    //                 pacienteId: expediente.idpaciente,
    //             }));
    //             setExpedientes((prevState) => [...prevState, expediente]);
    //         } catch (error) {
    //             // Handle error if any
    //             console.log('Error fetching expedientes:', error);
    //         }
    //     };
    //     fetchAllExpedientes();
    //     if (isSubmitting) {
    //         fetchAllExpedientes();
    //     }
    // }, [isSubmitting]);

    return (
        <Modal open={true} onClose={onClose}>
            <div className='modalContainer'>
                <h2 className="modalHeader">EDITAR EXPEDIENTE</h2>
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
                    <TextField id="nombre" label="Nombre Completo" variant="outlined" className="inputField"
                    // value={expediente.nombre} 
                    // onChange={handleModalFieldChange} 
                    name='nombre' />
                    <Box mt={.5}></Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker id="fecha_nacimiento" label="Fecha de Nacimiento" className="inputField"
                                // value={fecha_nacimiento || null} onChange={handleDateChange} 
                                name='fecha_nacimiento' />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className='radioGroupContainer'>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" className='sexoRadioGroup' id='sexo' 
                                // onChange={handleModalFieldChange} 
                                name="sexo" 
                                >
                                    <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                                    <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                                </RadioGroup>
                            </div>
                        </Grid>
                    </Grid>
                    <Box mt={.5}></Box>
                    <TextField id="ocupacion" label="Ocupación" variant="outlined" className="inputField"
                    // onChange={handleModalFieldChange} 
                    name='ocupacion' />
                    <Box mt={.5}></Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField id="correo" label="Correo Electrónico" variant="outlined" type='email' className="inputField"
                            // onChange={handleModalFieldChange} 
                            name='correo' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="telefono" label="Teléfono" variant="outlined" className="inputField"
                            // onChange={handleModalFieldChange} 
                            name='telefono' />
                        </Grid>
                    </Grid>
                    <Box mt={.5}></Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField id="numid" label="Número de Identidad" variant="outlined" className="inputField"
                            // onChange={handleModalFieldChange} 
                            name='numid' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                disablePortal
                                id="estado_civil"
                                options={listaEstadoCivil}
                                // onChange={(event, newValue) =>
                                //     setExpediente({
                                //         ...expediente,
                                //         estado_civil: newValue
                                //     })
                                // }
                                renderInput={(params) => <TextField {...params} label="Estado Civil" />}
                            />
                        </Grid>
                    </Grid>
                    <Box mt={.5}></Box>
                    <TextField id="direccion" label="Dirección" variant="outlined" className="inputField"
                    // onChange={handleModalFieldChange} 
                    name='direccion' />
                    <Button 
                    // onClick={handleModalSubmit}
                     variant="contained" style={{ backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px', width: '300px', fontSize: '18px', alignSelf: 'center' }}>
                        Editar Expediente
                    </Button>
                </Box>
            </div>
        </Modal>
    );
};

export default EditExpedienteDashboardModal;