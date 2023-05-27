import React, { useState } from 'react';
import { TextField, Button, Container, Stack, Dialog, DialogContent, DialogTitle, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from "react-router-dom"


const EditAdmins = (props) => {
    const [email, setEmail] = useState('')
    const [selectedOption, setSelectedOption] = useState('');
    const [password, setPassword] = useState('')
    let { setNombre, setRol, setId, setCorreo, setCelular, setSexo, openEditAdmin, setEditAdmin, setContraseña } = props;
    function handleSubmit(event) {
        event.preventDefault();


    }
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        //  setLabel(selectedValue); // Cambiar el label al valor seleccionado
    };

    return (
        <Dialog open={openEditAdmin} onClose={() => setEditAdmin(false)} maxWidth="md" >
            <DialogTitle sx={{ bgcolor: 'rgb(184,184,184)' }}>Información del colaborador</DialogTitle>
            <DialogContent sx={{ bgcolor: 'rgb(184,184,184)' }} style={{ display: 'flex', alignItems: 'center' }}>

                <Box style={{ display: 'flex', alignItems: 'center' }} bgcolor="white" p={11}>


                    <Box sx={{ bgcolor: 'white', flex: 1 }} p={11}>
                        <form onSubmit={handleSubmit} >
                            <Stack spacing={0} direction="row" sx={{ marginTop: 25 }}>
                                <div>
                                    <h3 ><u>Nombre Completo</u></h3>

                                </div>


                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginTop: 0 }}>

                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    value={setNombre}
                                    fullWidth
                                    required
                                    InputProps={{
                                        readOnly: false,
                                      }}
                                />

                            </Stack>

                            <Stack spacing={20} direction="row" sx={{ marginBottom: 1 }}>
                                <div>
                                    <h3  ><u>Identidad</u></h3>
                                </div>
                                <div>
                                    <h3 ><u>Correo Electrónico</u></h3>
                                </div>

                            </Stack>


                            <Stack spacing={2} direction="row" sx={{ marginBottom: 1 }}>


                                <TextField

                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    value={setId}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{ mb: 4 }}
                                />
                                <TextField
                                    type="Email"
                                    variant='outlined'
                                    color='secondary'
                                    value={setCorreo}
                                    required
                                    fullWidth
                                    sx={{ mb: 4 }}
                                />

                            </Stack>
                            <Stack spacing={25} direction="row" sx={{ marginBottom: 1 }}>
                                <div>
                                    <h3 style={{ marginBottom: '10px' }} ><u>Contraseña</u></h3>
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '10px' }}><u>Confirmar Contraseña</u></h3>
                                </div>

                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 1 }}>
                                <TextField

                                    type="password"
                                    variant='outlined'
                                    color='secondary'
                                    value={setContraseña}
                                    fullWidth
                                    sx={{ mb: 4 }}
                                />
                                <TextField
                                    type="password"
                                    variant='outlined'
                                    color='secondary'
                                    value={setContraseña}
                                    required
                                    fullWidth
                                    sx={{ mb: 4 }}
                                />

                            </Stack>

                            <Stack spacing={12} direction="row" sx={{ marginBottom: 1 }}>
                                <div>
                                    <h3 style={{ marginBottom: '10px' }} ><u>Numero de celular</u></h3>
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '10px' }}><u>Rol que desempeña</u></h3>
                                </div>

                            </Stack>

                            <Stack spacing={2} direction="row" sx={{ marginBottom: 1 }}>
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                    value={setCelular}
                                    InputProps={{
                                        readOnly: false,
                                    }}
                                    sx={{ mb: 4 }}
                                />
                                <FormControl variant="outlined" fullWidth>
                                    
                                    <Select
                                         
                                        Select value={selectedOption} onChange={handleSelectChange}

                                    >
                                        <MenuItem value="Option 1">Medico/a</MenuItem>
                                        <MenuItem value="Option 2">Secretario/a</MenuItem>
                                        <MenuItem value="Option 3">Servicio General</MenuItem>
                                    </Select>
                                </FormControl>

                            </Stack>

                            <Button variant="outlined" color="secondary" type="submit">Guardar Cambios</Button>
                        </form>

                    </Box>
                </Box>
            </DialogContent>
        </Dialog>






    );
};

export default EditAdmins;