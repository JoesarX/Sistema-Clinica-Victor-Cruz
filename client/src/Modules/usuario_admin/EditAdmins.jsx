import React, { useState } from 'react';
import { TextField, Button, Stack, Dialog, DialogContent, DialogTitle, Box, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdministradoresService from '../../Services/AdministradoresService';

import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';

import '../HojaDeEstilos/CrudStyles.css';

const EditAdmins = (props) => {
    let { setNombre, setRol, setId, setCorreo, setTelefono, setSexo, openEditAdmin, setEditAdmin, setPassword } = props;
    const [selectedOption, setSelectedOption] = useState(setRol);
    const [selectedOption2, setSelectedOption2] = useState(setSexo);

    const navigate = useNavigate();
    const [id, setId2] = useState(setId);
    const [inputValue, setInputValue] = useState(setPassword);
    const [admin, setAdmin] = React.useState({
        nombre: setNombre,
        correo: setCorreo,
        rol: setRol,
        password: setPassword,
        telefono: setTelefono,
        sexo: setSexo,
        id: setId,
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
        console.log(admin);
    }, [admin]);

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(admin.id)
        if (validations()) {

            const editExpediente = async () => {
                await AdministradoresService.editAdministradores(id, admin);
            };
            console.log(admin)
            editExpediente();
            alert('Admin Modificado')
            // navigate('/Administrador')
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
        <Dialog open={openEditAdmin} onClose={() => setEditAdmin(false)} maxWidth="md" >
            <DialogTitle sx={{ bgcolor: 'rgb(227,235,248)' }} style={{ textAlign: 'center' }}><u>MODIFICAR COLABORADOR</u></DialogTitle>
            <DialogContent sx={{ bgcolor: 'rgb(227,235,248)' }} style={{ display: 'flex', alignItems: 'center' }}>
                <Box style={{ display: 'flex', alignItems: 'center' }} bgcolor="white" p={11}>
                    <Box sx={{ bgcolor: 'white', flex: 1 }} p={11}>
                        <form onSubmit={handleSubmit} >
                            <Stack spacing={0} direction="row" sx={{ marginTop: 20 }}>
                                <div>
                                    <h3 ><u>Nombre Completo</u></h3>
                                </div>
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginTop: 0 }}>
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    value={admin.nombre}
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    name='nombre'
                                />
                            </Stack>
                            <Stack spacing={20} direction="row" sx={{ marginBottom: 0 }}>
                                <div>
                                    <h3><u>Identidad</u></h3>
                                </div>
                                <div>
                                    <h3><u>Correo Electrónico</u></h3>
                                </div>
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 0 }}>
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    value={setId}
                                    fullWidth
                                    name='id'
                                    sx={{ mb: 0 }}
                                />
                                <TextField
                                    type="Email"
                                    variant='outlined'
                                    color='secondary'
                                    value={admin.correo}
                                    required
                                    fullWidth
                                    onChange={handleChange}
                                    name='correo'
                                    sx={{ mb: 0 }}
                                />
                            </Stack>
                            <Stack spacing={18.25} direction="row" sx={{ marginBottom: 0 }}>
                                <div>
                                    <h3 style={{ marginBottom: '10px' }} ><u>Contraseña</u></h3>
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '10px' }}><u>Confirmar Contraseña</u></h3>
                                </div>
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 0 }}>
                                <TextField
                                    type="password"
                                    variant='outlined'
                                    color='secondary'
                                    value={admin.password}
                                    fullWidth
                                    onChange={handleChange}
                                    name='password'
                                    sx={{ mb: 0 }}
                                />
                                <TextField
                                    type="password"
                                    variant='outlined'
                                    color='secondary'
                                    value={inputValue}
                                    required
                                    fullWidth
                                    onChange={handleInputChange}
                                    name='verificarpass'
                                    sx={{ mb: 0 }}
                                />
                            </Stack>
                            <Stack spacing={10.25} direction="row" sx={{ marginBottom: 0 }}>
                                <div>
                                    <h3 style={{ marginBottom: '10px' }} ><u>Numero de celular</u></h3>
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '10px' }}><u>Rol que desempeña</u></h3>
                                </div>
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 0 }}>
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                    value={admin.telefono}
                                    onChange={handleChange}
                                    name='telefono'
                                    sx={{ mb: 0 }}
                                />
                                <FormControl variant="outlined" fullWidth>
                                    
                                    <Select Select value={selectedOption} onChange={handleSelectChange}>
                                        <MenuItem value="Medico/a">Medico/a</MenuItem>
                                        <MenuItem value="Secretario/a">Secretario/a</MenuItem>
                                        <MenuItem value="Servicio General">Servicio General</MenuItem>
                                    </Select>
                                    
                                </FormControl>
                                </Stack>
                                <Stack spacing={5} direction="row" sx={{ marginBottom: 0 }}>
                                    <div>
                                        <h3 style={{ marginBottom: '10px' }}><u>Sexo</u></h3>
                                    </div>
                                </Stack>
                                <Stack spacing={2} direction="row" sx={{ marginBottom: 5 }}>
                                    <FormControl variant="outlined" fullWidth>
                                        <Select Select value={selectedOption2} onChange={handleSelectChange2}>
                                                <MenuItem value="M">Masculino</MenuItem>
                                                <MenuItem value="F">Femenino</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            <Button variant="outlined" color="secondary" type="submit" onClick={handleSubmit} >Modificar Admin</Button>
                        </form>

                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default EditAdmins;