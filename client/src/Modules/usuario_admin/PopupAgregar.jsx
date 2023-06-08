import React, { useState } from 'react';
import { TextField, Button, Container, Stack, Dialog, DialogContent, DialogTitle, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import AdministradoresService from '../../Services/AdministradoresService';

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
        id: null
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
            case "Option 1":
                setAdmin((prevState) => ({
                    ...prevState,
                    rol: 'Medico/a',
                }));
                break;
            case "Option 2":
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
        if (selectedValue === "Option 1") {
            setAdmin((prevState) => ({
                ...prevState,
                sexo: 'M',
            }));
        }
        else {
            setAdmin((prevState) => ({
                ...prevState,
                sexo: 'F',
            }));
        }
    };
    const handleSubmit = async e => {
        console.log(admin.id)

        e.preventDefault();
        if (validations()) {
            e.preventDefault()
            await AdministradoresService.postAdministradores(admin);
            alert('Admin Agregado')
            navigate('/Administrador')
            window.location.reload();
        }

    }
    const validations = () => {
        const { nombre, correo, rol, password, telefono, sexo, id } = admin
        if (nombre === null || nombre === '') {
            alert('Nombre Completo es requerido')
            return false
        }
        if (id === null || id === '') {
            alert('Un numero de Identidad es requerido')
            return false
        }
        if (correo === null || correo === '') {
            alert('Correo es requerido')
            return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(correo) != true) {
            alert('El correo ingresado no tiene un formato válido.')
            return false
        }

        if (password === null || password === '') {
            alert('Contraseña es requerida')
            return false
        }
        if (password !== inputValue) {
            alert('Contraseñas deben coincidir')
            return false
        }
        if (telefono === null || telefono === '') {
            alert('Numero de celular es requerido')
            return false
        }
        if (rol === null || rol === '') {
            alert('Rol es requerido')
            return false
        }
        if (sexo === null || sexo === '') {
            alert('Sexo es requerido')
            return false
        }
        
        return true
    }

    return (
        <Modal open={openAddAdmin} onClose={() => setAddAdmin(false)}>
            <div className="modalContainer">
                <h2 className="modalHeader">
                    AGREGAR COLABORADOR
                </h2>
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
                                    onChange={handleSelectChange}
                                    label="Rol que desempeña"
                                    required
                                    sx={{ height: '47px' }} 
                                >
                                    <MenuItem value="Option 1">Medico/a</MenuItem>
                                    <MenuItem value="Option 2">Secretario/a</MenuItem>
                                    <MenuItem value="Option 3">Servicio General</MenuItem>
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
                                    onChange={handleSelectChange2}
                                    label="Sexo"
                                >
                                    <MenuItem value="Option 1">Masculino</MenuItem>
                                    <MenuItem value="Option 2">Femenino</MenuItem>
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