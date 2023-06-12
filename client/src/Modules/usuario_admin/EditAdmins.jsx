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
        rol : setRol,
        password : setPassword,
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

        <Modal open={openEditAdmin} onClose={() => setEditAdmin(false)}>
            <div className="modalContainer">
                <h2 className="modalHeader">
                    EDITAR COLABORADOR
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
};

export default EditAdmins;