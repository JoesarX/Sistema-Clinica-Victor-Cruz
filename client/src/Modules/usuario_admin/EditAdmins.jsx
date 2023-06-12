import React, { useState } from 'react';
import { TextField, Button, Stack, Dialog, DialogContent, DialogTitle, Box, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdministradoresService from '../../Services/AdministradoresService';

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
        if (validations()) {
            e.preventDefault();

            const editExpediente = async () => {
                await AdministradoresService.editAdministradores(id, admin);
            };
            console.log(admin)
            editExpediente();
            alert('Admin Modificado')
            navigate('/Administrador')
        }

    };

    const validations = () => {
        const { nombre, correo, rol, password, telefono, sexo, id } = admin;
        if (nombre === null || nombre === '') {
            alert('Nombre Completo es requerido');
            return false;
        }
        if (correo === null || correo === '') {
            alert('Correo es requerido');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(correo) !== true) {
            alert('Correo inválido');
            return false;
        }
        if (rol === null || rol === '') {
            alert('Rol es requerido');
            return false;
        }
        if (password === null || password === '') {
            alert('Contraseña es requerida');
            return false;
        }
        if (telefono === null || telefono === '') {
            alert('Teléfono es requerido');
            return false;
        }
        if (sexo === null || sexo === '') {
            alert('Sexo es requerido');
            return false;
        }
        if (id === null || id === '') {
            alert('ID es requerido');
            return false;
        }
        return true;
    };

    return (
        <Dialog open={openEditAdmin} onClose={() => setEditAdmin(false)}>
            <DialogTitle>Editar Administrador</DialogTitle>
            <DialogContent>
                <Box sx={{ width: 400 }}>
                    <Stack spacing={2}>
                        <TextField label="Nombre Completo" name="nombre" value={admin.nombre} onChange={handleChange} />
                        <TextField label="Correo Electrónico" name="correo" value={admin.correo} onChange={handleChange} />
                        <FormControl>
                            <InputLabel>Rol</InputLabel>
                            <Select value={selectedOption} onChange={handleSelectChange} label="Rol" name="rol">
                                <MenuItem value="Medico/a">Medico/a</MenuItem>
                                <MenuItem value="Secretario/a">Secretario/a</MenuItem>
                                <MenuItem value="Servicio General">Servicio General</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="Contraseña" name="password" type="password" value={admin.password} onChange={handleInputChange} />
                        <TextField label="Teléfono" name="telefono" value={admin.telefono} onChange={handleChange} />
                        <FormControl>
                            <InputLabel>Sexo</InputLabel>
                            <Select value={selectedOption2} onChange={handleSelectChange2} label="Sexo" name="sexo">
                                <MenuItem value="M">Masculino</MenuItem>
                                <MenuItem value="F">Femenino</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={handleSubmit}>Guardar Cambios</Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default EditAdmins;
