import React, { useState } from 'react';
import { TextField, Button, Stack, Dialog, DialogContent, DialogTitle, Grid, Modal, Box, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdministradoresService from '../../Services/AdministradoresService';
import { WindowSharp } from '@mui/icons-material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const EditAdmins = (props) => {
    let { setNombre, setRol, setId, setCorreo, setTelefono, setSexo, openEditAdmin, setEditAdmin, setPassword } = props;
    const [selectedOption, setSelectedOption] = useState(setRol);
    const [selectedOption2, setSelectedOption2] = useState(setSexo);
    const navigate = useNavigate();
    const [id, setId2] = useState(setId);
    const [inputValue, setInputValue] = useState(setPassword);
    const [admin, setAdmin] = React.useState({
        id: setId,
        nombre: setNombre,
        correo: setCorreo,
        rol: setRol,
        password: setPassword,
        telefono: setTelefono,
        sexo: setSexo,
    })

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        console.log(inputValue)
    }

    const handleChange = (e) => {
        setAdmin((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
        console.log(admin)
    }
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        switch (selectedValue) {
            case "Medico/a":
                setAdmin((prevState) => ({
                    ...prevState,
                    rol: 'Medico/a',
                }));
                break;
            case "Secretario/a":
                setAdmin((prevState) => ({
                    ...prevState,
                    rol: 'Secretario/a',
                }));
                break;
            default:
                setAdmin((prevState) => ({
                    ...prevState,
                    rol: 'Servicio General',
                }));
                break;
        }
    };

    React.useEffect(() => {
        console.log(admin);
    }, [admin]);

    const handleSelectChange2 = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption2(selectedValue);
        if (selectedValue === "M") {
            setAdmin((prevState) => ({
                ...prevState,
                sexo: 'M',
            }));
        } else {
            setAdmin((prevState) => ({
                ...prevState,
                sexo: 'F',
            }));
        }
    };

    const handleSubmit = async (e) => {
        console.log(admin.id)
        e.preventDefault();
        if (validations()) {
            e.preventDefault();

            const editExpediente = async () => {
                await AdministradoresService.editAdministradores(id, admin);
               
               
            };
            console.log(admin);
            editExpediente();
            alert('Admin Modificado');
            window.location.reload();
            navigate('/administrador');

        }

    };

    const validations = () => {
        const { nombre, correo, rol, password, telefono, sexo, id } = admin
        //Validaciones Nombre
        if (nombre === null || nombre === '') {
            alert('Nombre Completo es requerido')
            return false
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
        //Validaciones Identidad
        console.log(id)
        if (id === null || id === '') {
            alert('Un numero de Identidad es requerido')
            return false
        } else if (!id.replace(/\s/g, '').length) {
            alert('El numero de identidad no puede contener solo espacios.');
            return false
        } else if (id.charAt(0) === ' ') {
            alert('El numero de identidad no puede iniciar con un espacio.');
            return false
        } else if (id.charAt(id.length - 1) === ' ') {
            alert('El numero de identidad no puede terminar con un espacio.');
            return false
        }
        //Validaciones Correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo === null || correo === '') {
            alert('Correo es requerido')
            return false
        } else if (emailRegex.test(correo) != true) {
            alert('El correo ingresado no tiene un formato válido.')
            return false
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
        //Validaciones Contraseña
        if (password === null || password === '') {
            alert('Contraseña es requerida')
            return false
        } else if (password.charAt(0) === ' ') {
            alert('La contraseña no puede iniciar con un espacio.');
            return false
        } else if (password.charAt(password.length - 1) === ' ') {
            alert('La contraseña no puede terminar con un espacio.');
            return false
        }else if (password.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres.')
            return false
        } else if (!/[A-Z]/.test(password)) {
            alert('La contraseña debe tener al menos una letra mayúscula.')
            return false
        } else if (!/\d/.test(password)) {
            alert('La contraseña debe tener al menos un número.')
            return false
        } else if (!/[!@#$%^&*_;':"|,.<>/?]/.test(password)) {
            alert('La contraseña debe tener al menos un caracter especial.')
            return false
        }
        //Validaciones Confirmar Contraseña
        if (password !== inputValue) {
            alert('Contraseñas deben coincidir')
            return false
        }
        //Validaciones Telefono
        if (telefono === null || telefono === '') {
            alert('Numero de celular es requerido')
            return false
        } else if (!telefono.replace(/\s/g, '').length) {
            alert('El numero de telefono no puede contener solo espacios.');
            return false
        } else if (telefono.charAt(0) === ' ') {
            alert('El numero de telefono no puede iniciar con un espacio.');
            return false
        } else if (telefono.charAt(telefono.length - 1) === ' ') {
            alert('El numero de telefono no puede terminar con un espacio.');
            return false
        }
        //Validaciones Rol
        if (rol === null || rol === '') {
            alert('Rol es requerido')
            return false
        }
        //Validaciones Sexo
        if (sexo === null || sexo === '') {
            alert('Sexo es requerido')
            return false
        }
        return true
    }

    return (

        <Modal open={openEditAdmin} onClose={() => setEditAdmin(false)} closeAfterTransition BackdropProps={{ onClick: () => {} }}>
            <div className="modalContainer">
                <h2 className="modalHeader">
                    EDITAR COLABORADOR
                </h2>
                <button className="cancelButton"  onClick={() => setEditAdmin(false)}>
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
                                    value={selectedOption2}
                                    onChange={(event) => {
                                        const newValue = event.target.value;
                                        setSelectedOption2(newValue);
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
                        Editar Colaborador
                    </Button>
                </form>
            </div>
        </Modal>
    );
}

export default EditAdmins;
