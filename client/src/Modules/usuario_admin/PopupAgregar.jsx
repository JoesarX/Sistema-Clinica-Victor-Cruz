import React, { useState } from 'react';
import { TextField, Button,  Stack, Dialog, DialogContent, DialogTitle, Box,  FormControl,  Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdministradoresService from '../../Services/AdministradoresService';


const AddAdmin = (props) => {
    let { openAddAdmin, setAddAdmin } = props;
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [admin, setAdmin] = React.useState({
        nombre: '',
        correo: '',
        rol : '',
        password : '',
        telefono: '',
        sexo: '',
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
        const {  nombre,  correo, rol, password, telefono, sexo, id  } = admin
        if (nombre === null || nombre === '') {
            alert('Nombre Completo es requerido')
            return false
        }
        if(correo === null || correo === ''){
            alert('Correo es requerido')
            return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(correo) != true){
            alert('El correo ingresado no tiene un formato válido.')
            return false
        }

        if (password === null || password === '') {
            alert('Password es requerido')
            return false
        }
        if (password !== inputValue) {
            alert('Contraseñas deben coincidir')
            return false
        }
        if (telefono === null || telefono === '') {
            alert('Telefono es requerido')
            return false
        }
        if (id === null || id === '') {
            alert('Identidad es requerido')
            return false
        }
        return true
    }

    return (
        <Dialog open={openAddAdmin} onClose={() => setAddAdmin(false)} maxWidth="md" >
            <DialogTitle sx={{ bgcolor: 'rgb(227,235,248)' }} style={{ textAlign: 'center' }}><u>AGREGAR COLABORADOR</u></DialogTitle>
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
                                    <h3  ><u>Identidad</u></h3>
                                </div>
                                <div>
                                    <h3 ><u>Correo Electrónico</u></h3>
                                </div>
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 0 }}>
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    value={admin.id}
                                    fullWidth
                                    onChange={handleChange}
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
                                        <MenuItem value="Option 1">Medico/a</MenuItem>
                                        <MenuItem value="Option 2">Secretario/a</MenuItem>
                                        <MenuItem value="Option 3">Servicio General</MenuItem>
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
                                                <MenuItem value="Option 1">Masculino</MenuItem>
                                                <MenuItem value="Option 2">Femenino</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            <Button variant="outlined" color="secondary" type="submit" onClick={handleSubmit} >Agregar Admin</Button>
                        </form>

                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AddAdmin;