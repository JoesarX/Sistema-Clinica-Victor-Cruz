import React, { useState } from 'react';
import { TextField, Button, Stack, Dialog, DialogContent, DialogTitle, Box, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import AdministradoresService from '../../Services/AdministradoresService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';

import '../HojaDeEstilos/CrudStyles.css';


const AddAdmin = (props) => {
    let { openAddAdmin, setAddAdmin } = props;
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [admin, setAdmin] = React.useState({
        nombre: '',
        correo: '',
        rol: null,
        password: '',
        telefono: '',
        sexo: null,
        id: ''
    })

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        console.log(inputValue)
    }

    const handleChange = (e) => {
        setAdmin((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
        console.log(admin)
    }

    React.useEffect(() => {
        
    }, [admin]);

    const handleSubmit = async e => {
        console.log(admin.id)

        e.preventDefault();
        if (validations()) {
            e.preventDefault()
            await AdministradoresService.postAdministradores(admin);
            swal("Admin Agregado!", {
                icon: "success",
              });
            navigate('/administrador')
            window.location.reload();
        }

    }
    const validations = () => {
        const { nombre, correo, rol, password, telefono, sexo, id } = admin
        //Validaciones Nombre
        if (nombre === null || nombre === '') {
            swal("Nombre Completo es requerido", {
                icon: "warning",
              });
            return false
        } else if (!nombre.replace(/\s/g, '').length) {
            swal("El nombre no puede contener solo espacios.", {
                icon: "warning",
              });
            return false
        } else if (nombre.charAt(0) === ' ') {
            swal("El nombre no puede iniciar con un espacio.", {
                icon: "warning",
              });
            return false
        } else if (nombre.charAt(nombre.length - 1) === ' ') {
            swal("El nombre no puede terminar con un espacio.", {
                icon: "warning",
              });
            return false
        }
        //Validaciones Identidad
        if (id === null || id === '') {
            swal("Un numero de Identidad es requerido", {
                icon: "warning",
              });
            return false
        } else if (!id.replace(/\s/g, '').length) {
            swal("El numero de identidad no puede contener solo espacios.", {
                icon: "warning",
              });
            return false
        } else if (id.charAt(0) === ' ') {
            swal("El numero de identidad no puede iniciar con un espacio.", {
                icon: "warning",
              });
            return false
        } else if (id.charAt(id.length - 1) === ' ') {
            swal("El numero de identidad no puede terminar con un espacio.", {
                icon: "warning",
              });
            return false
        }
        //Validaciones Correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo === null || correo === '') {
            swal("Correo es requerido", {
                icon: "warning",
              });
            return false
        } else if (emailRegex.test(correo) != true) {
            swal("El correo ingresado no tiene un formato válido.", {
                icon: "warning",
              });
            return false
        } else if (!nombre.replace(/\s/g, '').length) {
            swal("El correo no puede contener solo espacios.", {
                icon: "warning",
              });
            return false
        } else if (nombre.charAt(0) === ' ') {
            swal("El correo no puede iniciar con un espacio.", {
                icon: "warning",
              });
            return false
        } else if (nombre.charAt(nombre.length - 1) === ' ') {
            swal("El correo no puede terminar con un espacio.", {
                icon: "warning",
              });
            return false
        }
        //Validaciones Contraseña
        if (password === null || password === '') {
            swal("Contraseña es requerida", {
                icon: "warning",
              });
            return false
        } else if (password.charAt(0) === ' ') {
            swal("La contraseña no puede iniciar con un espacio.", {
                icon: "warning",
              });
            return false
        } else if (password.charAt(password.length - 1) === ' ') {
            swal("La contraseña no puede terminar con un espacio.", {
                icon: "warning",
              });
            return false
        } else if (password.length < 8) {
            swal("La contraseña debe tener al menos 8 caracteres.", {
                icon: "warning",
              });
            return false
        } else if (!/[A-Z]/.test(password)) {
            swal("La contraseña debe tener al menos una letra mayúscula.", {
                icon: "warning",
              });
            return false
        } else if (!/\d/.test(password)) {
            swal("La contraseña debe tener al menos un número.", {
                icon: "warning",
              });
            return false
        } else if (!/[!@#$%^&*_;':"|,.<>/?]/.test(password)) {
            swal("La contraseña debe tener al menos un caracter especial.", {
                icon: "warning",
              });
            return false
        }
        //Validaciones Confirmar Contraseña
        if (password !== inputValue) {
            swal("Contraseñas deben coincidir", {
                icon: "warning",
              });
            return false
        }
        //Validaciones Telefono
        if (telefono === null || telefono === '') {
            swal("Numero de celular es requerido", {
                icon: "warning",
              });
            return false
        } else if (!telefono.replace(/\s/g, '').length) {
            swal("El numero de telefono no puede contener solo espacios.", {
                icon: "warning",
              });
            return false
        } else if (telefono.charAt(0) === ' ') {
            swal("El numero de telefono no puede iniciar con un espacio.", {
                icon: "warning",
              });
            return false
        } else if (telefono.charAt(telefono.length - 1) === ' ') {
            swal("El numero de telefono no puede terminar con un espacio.", {
                icon: "warning",
              });
            return false
        }
        //Validaciones Rol
        if (rol === null || rol === '') {
            swal("Rol es requerido", {
                icon: "warning",
              });
            return false
        }
        //Validaciones Sexo
        if (sexo === null || sexo === '') {
            swal("Sexo es requerido", {
                icon: "warning",
              });
            return false
        }
        return true
    }

    return (
        <Modal open={openAddAdmin} onClose={() => setAddAdmin(false)} closeAfterTransition BackdropProps={{ onClick: () => { } }}>
            <div className="modalContainer">
                <h2 className="modalHeader">
                    AGREGAR COLABORADOR
                </h2>
                <button className="cancelButton" onClick={() => setAddAdmin(false)}>
                    <FontAwesomeIcon icon={faTimes} size="2x" />
                </button>
                <form onSubmit={handleSubmit} className="modalForm">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                variant="outlined"
                                color="secondary"
                                value={admin.nombre}
                                fullWidth
                                required
                                onChange={handleChange}
                                name="nombre"
                                label="Nombre Completo"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="text"
                                variant="outlined"
                                color="secondary"
                                value={admin.id}
                                fullWidth
                                onChange={handleChange}
                                name="id"
                                label="Identidad"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="email"
                                variant="outlined"
                                color="secondary"
                                value={admin.correo}
                                required
                                fullWidth
                                onChange={handleChange}
                                name="correo"
                                label="Correo Electrónico"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="password"
                                variant="outlined"
                                color="secondary"
                                value={admin.password}
                                fullWidth
                                onChange={handleChange}
                                name="password"
                                label="Contraseña"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="password"
                                variant="outlined"
                                color="secondary"
                                value={inputValue}
                                required
                                fullWidth
                                onChange={handleInputChange}
                                name="verificarpass"
                                label="Confirmar Contraseña"

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="text"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                value={admin.telefono}
                                onChange={handleChange}
                                name="telefono"
                                label="Número de celular"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="rol-label">Rol que desempeña *</InputLabel>
                                <Select
                                    labelId="rol-label"
                                    id="rol"
                                    className='dropDown'
                                    value={selectedOption}
                                    onChange={(event) => {
                                        const newValue = event.target.value;
                                        setSelectedOption(newValue);
                                        setAdmin((prevAdmin) => ({
                                            ...prevAdmin,
                                            rol: newValue
                                        }));
                                    }}
                                    label="Rol que desempeña"
                                    required
                                    sx={{ height: '47px' }}
                                >
                                    <MenuItem value="Medico/a">Medico/a</MenuItem>
                                    <MenuItem value="Secretario/a">Secretario/a</MenuItem>
                                    <MenuItem value="Servicio General">Servicio General</MenuItem>
                                    <MenuItem value="Administrador">Administrador</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="sexo-label">Sexo *</InputLabel>
                                <Select
                                    required
                                    labelId="sexo-label"
                                    id="sexo"
                                    onChange={(event) => {
                                        const newValue = event.target.value;
                                        setSelectedOption(newValue);
                                        setAdmin((prevAdmin) => ({
                                            ...prevAdmin,
                                            sexo: newValue
                                        }));
                                    }}
                                    label="Sexo"
                                    sx={{ height: '47px' }}
                                >
                                    <MenuItem value="M">Masculino</MenuItem>
                                    <MenuItem value="F">Femenino</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                        onClick={handleSubmit}
                        className="crudButton"
                        id='crudButton'
                    >
                        Agregar Colaborador
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

export default AddAdmin;