import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import './Factura.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import { motion } from "framer-motion";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SaveIcon from '@mui/icons-material/Save';

function Factura() {

    const [value, setValue] = useState(0);
    const [aplicarISV, setAplicarISV] = useState(true);
    const [selectedService, setSelectedService] = useState('Servicios Disponibles');
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [isv, setIsv] = useState(0);
    const [total, setTotal] = useState(0);
    const [showUserSearch, setShowUserSearch] = useState(false);
    const [addServicio, setAddServicio] = useState({
        servicio: '',
        precio: '',
    });

    const columns = [
        { id: 'servicio', label: 'Servicio', width: '60%' },
        { id: 'precio', label: 'Precio', width: '30%' },
    ];

    const rows = [];

    const calcularValores = () => {
        const subtotal = serviciosSeleccionados.reduce((acc, service) => acc + parseFloat(service.precio || 0), 0);
        const isv = aplicarISV ? subtotal * 0.15 : 0;
        const total = subtotal + isv;
        return { subtotal, isv, total };
    };

    const agregarServicio = () => {
        if (addServicio.servicio && addServicio.precio) {
            setServiciosSeleccionados([...serviciosSeleccionados, addServicio]);
            setAddServicio({
                servicio: '',
                precio: '',
            });
            setSelectedService('Servicios Disponibles');
        }
    };

    useEffect(() => {
        const { subtotal, isv, total } = calcularValores();
        setSubtotal(subtotal);
        setIsv(isv);
        setTotal(total);
    }, [serviciosSeleccionados, aplicarISV]);

    useEffect(() => {
        const { subtotal, isv, total } = calcularValores();
        setSubtotal(subtotal);
        setIsv(isv);
        setTotal(total);
    }, [aplicarISV]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div className='scrollable-page'>
            <NavBar />
            <Box className='main'>
                <Tabs value={value} onChange={handleChange}>
                    <Tab icon={<PostAddIcon />} label="Agregar Factura" className='tabs' />
                    <Tab icon={<PointOfSaleIcon />} label="Procesar Factura" className='tabs' />
                </Tabs>
                <Box className='factura-container'>
                    <Box className='factura-leftContainer'>
                        {value === 0 &&
                            <div className='addReceipt'>
                                <h3 className='factura-titulo'>Factura</h3>
                                <div className='factura-patientInfo'>
                                    <h3 className='factura-subtitle'>Información del Paciente</h3>
                                    <div className='factura-info'>
                                        <input
                                            className="input-field"
                                            type="text"
                                            placeholder="Nombre"
                                            required
                                        />
                                        <Button onClick={() => setShowUserSearch(!showUserSearch)} variant="text" startIcon={<LinkIcon />}>
                                            Vincular Usuario
                                        </Button>
                                    </div>
                                    {showUserSearch && (
                                        <div className='factura-email'>
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                                                className={`user-search ${showUserSearch ? 'show' : ''}`}>
                                                <TextField
                                                    sx={{ mr: 3 }}
                                                    placeholder="Correo del usuario"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <SearchIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <Button sx={{ fontSize: '13px', height: '46px' }} className='searchButton' variant="contained" startIcon={<AddIcon />}>
                                                    Agregar Usuario
                                                </Button>
                                            </motion.div>
                                        </div>
                                    )}
                                    <input
                                        className="input-field"
                                        type="text"
                                        placeholder="RTN"
                                    />
                                </div>
                                <h3 className='factura-smallText'>Seleccionar Servicio Brindado</h3>
                                <Autocomplete
                                    class='factura-input-bg'
                                    value={selectedService}
                                    options={['Consulta General', 'Cirugía Menor', 'Salud Ocupacional', 'Atención Primaria', 'Salubrista', 'Epidemiología']}
                                    onChange={(event, newValue) => {
                                        setSelectedService(newValue)
                                        setAddServicio({
                                            ...addServicio,
                                            servicio: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    sx={{ backgroundColor: '#F0F0F0', width: '90%' }}
                                />
                                <h3 className='factura-smallText'>Precio del Servicio</h3>
                                <input
                                    className="factura-input-bg"
                                    type="text"
                                    placeholder="L."
                                    value={addServicio.precio}
                                    onChange={(event) => {
                                        setAddServicio({
                                            ...addServicio,
                                            precio: event.target.value,
                                        });
                                    }}
                                    required
                                />
                                <h3 className='factura-smallText'></h3>
                                <Button variant="contained" startIcon={<AddCircleIcon />} className='button' onClick={agregarServicio}>
                                    Agregar
                                </Button>
                            </div>
                        }
                        {value === 1 &&
                            <div>Contenido de Procesar Factura</div>
                        }
                    </Box>
                    <Box className='factura-rightContainer'>
                        {value === 0 &&
                            <div className='preFactura'>
                                <div className='table'>
                                    <TableContainer style={{ height: 166 }}>
                                        <Table stickyHeader >
                                            <TableHead >
                                                <TableRow class='factura-table-header'>
                                                    {columns.map(col => (
                                                        <TableCell align='center' sx={{ backgroundColor: "#C8DAFF", fontWeight: "bold" }} key={col.id} style={{ width: col.width }}>
                                                            {col.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {serviciosSeleccionados.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{row.servicio}</TableCell>
                                                        <TableCell>{row.precio}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div className="total">
                                    <div className="money">Subtotal: {subtotal}</div>
                                    <div className="isv-options">
                                        <div>
                                            <label className='radio'>
                                                <input
                                                    type="radio"
                                                    name="isv"
                                                    value={true}
                                                    checked={aplicarISV}
                                                    onChange={() => setAplicarISV(true)}
                                                />
                                                Aplicar ISV
                                            </label>
                                            <label className='radio'>
                                                <input
                                                    type="radio"
                                                    name="isv"
                                                    value={false}
                                                    checked={!aplicarISV}
                                                    onChange={() => setAplicarISV(false)}
                                                />
                                                No aplicar ISV
                                            </label>
                                            <label className='radioISV'>
                                                <div className="money">ISV: {isv}</div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="money">Total: {total}</div>
                                </div>
                                <Button variant="contained" startIcon={<SaveIcon />} className='button'>
                                    Guardar Factura
                                </Button>
                            </div>
                        }
                        {value === 1 &&
                            <div>Contenido de Procesar Factura</div>
                        }
                    </Box>
                </Box>
            </Box>
        </div >
    );
}

export default Factura;