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
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import React from 'react'

import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'

//STYLES

import '../Expedientes/ModalStyle.css';

import ExpedientesService from '../../Services/ExpedientesService';


const EditExpedienteDashboardModal = ({ expedientess, onClose }) => {
    const navigate = useNavigate();
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

    const [estado_civil, setSelectedOption] = useState(null);
    const [expedienteData, setExpedientess] = useState([]);


    useEffect(() => {

        setExpedientess([expedientess]);

    }, [expedientess]);

    const handleModalFieldChange = (e) => {
        if (e.target.name === "sexo") {
            setExpediente((prevState) => ({
                ...prevState,
                sexo: e.target.value
            }));
        } else {
            setExpediente((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }

    }
    const [expediente, setExpediente] = React.useState({
        nombre: expedientess.nombre,
        edad: expedientess.edad,
        fecha_nacimiento: expedientess.fecha_nacimiento,
        sexo: expedientess.sexo,
        correo: expedientess.correo,
        telefono: expedientess.telefono,
        numid: expedientess.numid,
        estado_civil: expedientess.estado_civil,
        padecimientos: '',
        ocupacion: ''
    })

    const handleDateChange = (date) => {

        console.log(date)
        setFechaNacimiento(date);
        const formattedDate = date ? date.toISOString().slice(0, 10) : '';
        console.log(formattedDate)
        setExpediente((prevState) => ({ ...prevState, fecha_nacimiento: formattedDate }))
        console.log(fecha_nacimiento)
        const age = formattedDate ? calculateAge(formattedDate) : '';
        console.log(age)
        setExpediente((prevState) => ({ ...prevState, edad: age }))

    };
    const [fecha_nacimiento, setFechaNacimiento] = useState(null);
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

    const validations = () => {
        const { nombre, edad, fecha_nacimiento, sexo, correo, telefono, numid, estado_civil, padecimientos, ocupacion } =
           expediente;
        if (nombre === null || nombre === '') {
           alert('Nombre Completo es requerido');
           return false;
        }
         if (edad === null || edad === '' || edad < 0) {
           alert('Una edad valida es requerida');
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
        if (correo === null || correo === '') {
           alert('Correo es requerido');
           return false;
        }
        if (telefono === null || telefono === '') {
           alert('Telefono es requerido');
           return false;
        }
        if (numid === null || numid === '') {
           alert('Numero de Identidad es requerido');
           return false;
        }
  
        return true;
     };

    const EditHandler = () => {
        console.log(expedientess.idpaciente)
        console.log(expediente)
        const editExpediente = async () => {
            if(validations()){
                console.log(':)')
                await ExpedientesService.editExpedientes(expedientess.idpaciente, expediente);
                alert('Expediente Editado');
                onClose();
            }
            
           
        };
        console.log(expediente)
        editExpediente();



    };
    const defaulttValue = expediente.sexo;
    const defaultValue2 = expediente.estado_civil;
    console.log(expedienteData)
    console.log(expediente)
    console.log(expedientess)
    return (
        <Modal open={true} onClose={onClose}>
            <div className='modalContainer'>
                {expedienteData.map((expediente) => (
                    <div className='expedienteCard' key={expediente.idpaciente}>
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
                            <TextField id="nombre" defaultValue={expediente.nombre} label="Nombre Completo" variant="outlined" className="inputField"
                                // value={expediente.nombre} 
                                onChange={handleModalFieldChange}
                                name='nombre' />
                            <Box mt={.5}></Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDatePicker
                                            id="fecha_nacimiento"
                                            defaultValue={dayjs(expediente.fecha_nacimiento)}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                            name='fecha_nacimiento'
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div className='radioGroupContainer'>
                                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" className='sexoRadioGroup' id='sexo'
                                            onChange={handleModalFieldChange}
                                            name="sexo"
                                            value={defaulttValue}
                                        >
                                            <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                                            <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                                        </RadioGroup>
                                    </div>
                                </Grid>
                            </Grid>
                            <Box mt={.5}></Box>
                            <TextField id="ocupacion" label="Ocupación" defaultValue={expediente.ocupacion} variant="outlined" className="inputField"
                                onChange={handleModalFieldChange}
                                name='ocupacion' />
                            <Box mt={.5}></Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="correo" label="Correo Electrónico" variant="outlined" defaultValue={expediente.correo} type='email' className="inputField"
                                        onChange={handleModalFieldChange}
                                        name='correo' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="telefono" label="Teléfono" defaultValue={expediente.telefono} variant="outlined" className="inputField"
                                        onChange={handleModalFieldChange}
                                        name='telefono' />
                                </Grid>
                            </Grid>
                            <Box mt={.5}></Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="numid" label="Número de Identidad" variant="outlined" defaultValue={expediente.numid} className="inputField"
                                        onChange={handleModalFieldChange}
                                        name='numid' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Autocomplete
                                        disablePortal
                                        value={defaultValue2}
                                        id="estado_civil"

                                        options={listaEstadoCivil}
                                        onChange={(event, newValue) =>
                                            setExpediente({
                                                ...expediente,
                                                estado_civil: newValue
                                            })
                                        }
                                        renderInput={(params) => <TextField {...params} label="Estado Civil" />}
                                    />
                                </Grid>
                            </Grid>
                            <Box mt={.5}></Box>
                            {/* <TextField id="direccion" label="Dirección" variant="outlined" className="inputField"
                                // onChange={handleModalFieldChange} 
                        name='direccion' />*/}
                            <Button
                                onClick={EditHandler}
                                variant="contained" style={{ backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px', width: '300px', fontSize: '18px', alignSelf: 'center' }}>
                                Editar Expediente
                            </Button>
                        </Box>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default EditExpedienteDashboardModal;