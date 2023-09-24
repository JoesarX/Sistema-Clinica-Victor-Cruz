import React, { useState, useEffect, useContext } from 'react';
import PermissionChecker from '../Home/PermissionChecker.jsx';
import { AuthContext } from '../AuthContext.js';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import './Factura.css';
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
import DeleteIcon from '@mui/icons-material/Delete';
import Services from '../../Services/FacturasService';
import { Payment, Payments } from '@mui/icons-material';

import swal from 'sweetalert';
function Factura() {
    const authContext = useContext(AuthContext);
    const allowSpecialPermission = false;

    const [value, setValue] = useState(0);
    const [selectedService, setSelectedService] = useState('Servicios Disponibles');
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
    const [total, setTotal] = useState(0);
    const [showUserSearch, setShowUserSearch] = useState(false);

    const [nombre, setNombre] = useState(null);
    const [correo, setCorreo] = useState(null);
    const [rtn, setRtn] = useState(null);

    const navigate = useNavigate();
    
    const [addServicio, setAddServicio] = useState({
        servicio: '',
        precio: '',
    });
    const { id } = useParams();

    useEffect( ()  => {
        const fetchData = async()=>{
            let data=await Services.getDataByCita(id);
            console.log(data);
            setNombre(data[0].nombre);
            setCorreo(data[0].correouser);
            console.log(data[0].nombre);
            console.log(data[0].correouser);
        }
        fetchData();
       
    }, []);

    
    
    const columns = [
        { id: 'servicio', label: 'Servicio', width: '60%' },
        { id: 'precio', label: 'Precio', width: '30%' },
    ];

    const rows = [];

    const calcularValores = () => {
        const total = serviciosSeleccionados.reduce((acc, service) => acc + parseFloat(service.precio || 0), 0);
        return { total };
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
    const factura = {
        nombre_paciente: "",
        idCita: id,
        isPagada: "",
        total: "",
        metodoPago: "",
        rtn: "",
        correo: ""
    };

    const validations = (factura_object, online) => {
        const errors = {};

        if (online) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(factura_object.correo)) {
                errors.correo = "Correo debe tener un formato válido";
            }
        }

        if (factura_object.nombre_paciente === null || factura_object.nombre_paciente.trim().length < 3) {
            errors.nombre_paciente = "Nombre debe tener al menos 3 caracteres";
        }

        const rtnRegex = /^[0-9]{14}$/;
        if (factura_object.rtn !== null && factura_object.rtn.trim() !== "" && !rtnRegex.test(factura_object.rtn)) {
            errors.rtn = "RTN debe contener exactamente 14 dígitos";
        }

        if (serviciosSeleccionados.length <= 0) {
            errors.cantidad_servicios = "Por favor agregar servicios a la factura.";
        }

        return errors;
    };

    const guardarFacturaPayPal = async () => {

        const facturaToSend = {
            ...factura,
            nombre_paciente: nombre,
            total: total,
            metodoPago: "paypal",
            correo: correo,
            rtn: rtn,
        }

        const errors = validations(facturaToSend, true);

        if (Object.keys(errors).length === 0) {
            await Services.postFactura(facturaToSend);
            swal({
                icon: 'success',
                title: 'Éxito',
                text: 'Factura creada exitosamente',
            });
            setNombre('');
            setRtn('');
            setServiciosSeleccionados([])
            setTotal(0);
            setCorreo('')
            navigate('/citas_tabla');
        } else {
            const errorMessage = Object.values(errors).join('\n');

            swal({
                icon: 'error',
                title: 'Error al ingresar datos',
                text: errorMessage,
            });
        }
    }

    const guardarFacturaEfectivo = async () => {

        const facturaToSend = {
            ...factura,
            nombre_paciente: nombre,
            total: total,
            metodoPago: "efectivo",
            correo: correo,
            rtn: rtn,
            isPagada: true,
        }

        const errors = validations(facturaToSend, false);

        if (Object.keys(errors).length === 0) {
            await Services.postFactura(facturaToSend);
            swal({
                icon: 'success',
                title: 'Éxito',
                text: 'Factura creada exitosamente',
            });
            setNombre('');
            setRtn('');
            setServiciosSeleccionados([])
            setTotal(0);
            setCorreo('')
            navigate('/citas_tabla');
        } else {
            const errorMessage = Object.values(errors).join('\n');

            swal({
                icon: 'error',
                title: 'Error al ingresar datos',
                text: errorMessage,
            });
        }
    }


    useEffect(() => {
        const { total } = calcularValores();
        setTotal(total);
    }, [serviciosSeleccionados]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleRTNInput = (inputElement) => {
        let inputValue = inputElement.value
        inputValue = inputValue.replace(/[^0-9]/g, '');

        if (inputValue.length > 14) {
            inputValue = inputValue.slice(0, 14);
        }

        inputElement.value = inputValue;
        setRtn(inputValue)
    }

    const handleNameInput = (inputElement) => {
        let inputValue = inputElement.value;

        if (/^[a-zA-ZÀ-ÿ\s]+$/.test(inputValue)) {
            setNombre(inputValue);
        } else {
            inputValue = inputValue.replace(/[^a-zA-ZÀ-ÿ\s]+/g, '');
            if (inputValue.length > 0 && !/^[a-zA-ZÀ-ÿ\s]+$/.test(inputValue.charAt(0))) {
                inputValue = inputValue.substring(1); // Elimina el primer carácter si no es una letra o espacio
            }
            inputElement.value = inputValue;
            setNombre(inputValue);
        }  
    };

   

    const eliminarServicio = (servicioAEliminar) => {
        const serviciosActualizados = serviciosSeleccionados.filter(servicio => servicio !== servicioAEliminar)
        setServiciosSeleccionados(serviciosActualizados)
    };

    const buttonStyle = {
        backgroundColor: '#062460',
    };

    return (
        <div className='scrollable-page'>
            <PermissionChecker
                userType={authContext.userType}
                requiredPermissions={['administrador', 'master']}
                allowSpecialPermission={allowSpecialPermission ? 'specialPermission' : null}
            >
                <NavBar />
                <div className='headerDiv'>
                    <h1>Agregar Factura</h1>
                </div>
                <Box className='main'>
                    <Box className='factura-container'>
                        <Box className='factura-leftContainer'>
                            <div className='addReceipt'>
                                <div className='factura-patientInfo'>
                                    <h3 className='factura-subtitle'>Información del Paciente</h3>
                                    <div className='factura-info'>
                                        <input
                                            className="input-field"
                                            type="text"
                                            placeholder="Nombre"
                                            required
                                            
                                            onChange={(e) => handleNameInput(e.target)}
                                            value={nombre}
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
                                                transition={{ duration: 0.6 }}
                                                className={`user-search ${showUserSearch ? 'show' : ''}`}>
                                                <TextField
                                                    sx={{ mr: 3, backgroundColor: '#fff' }}
                                                    placeholder="Correo del usuario"
                                                    onChange={(e) => setCorreo(e.target.value)}
                                                    value={correo}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <SearchIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <Button sx={{ fontSize: '13px', height: '46px' }} className='factura-button' variant="contained" startIcon={<AddIcon />} style={buttonStyle}>
                                                    Agregar Usuario
                                                </Button>
                                            </motion.div>
                                        </div>
                                    )}
                                    <input
                                        className="input-field"
                                        type="text"
                                        placeholder="RTN"
                                        onChange={(e) => handleRTNInput(e.target)}
                                        value={rtn}
                                    />
                                </div>
                                <h3 className='factura-smallText'>Seleccionar Servicio Brindado</h3>
                                <div className='factura-service'>
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
                                        sx={{ backgroundColor: '#F0F0F0', width: '68%' }}
                                    />
                                </div>

                                <h3 className='factura-smallText'>Precio del Servicio</h3>
                                <div className='factura-price'>
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
                                </div>
                                <Button variant="contained" startIcon={<AddCircleIcon />} className='factura-button' onClick={agregarServicio} style={buttonStyle}>
                                    Agregar
                                </Button>
                            </div>
                        </Box>
                        <Box className='factura-rightContainer'>
                            <div className='preFactura'>
                                <div className='factura-montos'>
                                    <div className="factura-total">Total: {new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(total)}</div>
                                </div>
                                <div className='table'>
                                    <TableContainer style={{ height: 300, border: "none" }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map(col => (
                                                        <TableCell align='center' sx={{ backgroundColor: "#C8DAFF", fontWeight: "bold" }} key={col.id} style={{ width: col.width, border: "none" }}>
                                                            {col.label}
                                                        </TableCell>
                                                    ))}
                                                    <TableCell align='center' sx={{ backgroundColor: "#C8DAFF", fontWeight: "bold", color: "#C8DAFF" }} style={{ border: "none" }}>
                                                        Eliminar
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {serviciosSeleccionados.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell style={{ border: "none" }}>{row.servicio}</TableCell>
                                                        <TableCell style={{ border: "none" }}>{row.precio}</TableCell>
                                                        <TableCell style={{ border: "none" }}>
                                                            <Button
                                                                startIcon={<DeleteIcon />}
                                                                style={{
                                                                    backgroundColor: "gray",
                                                                    color: "white",
                                                                    padding: "10px",
                                                                    paddingLeft: "5px",
                                                                }}
                                                                onClick={() => eliminarServicio(row)}
                                                            >

                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div class='factura-payment-button-container'>
                                    <Button variant="contained" startIcon={<Payment />} className='factura-button' onClick={guardarFacturaPayPal} style={buttonStyle}>
                                        Pago en Línea
                                    </Button>
                                    <Button variant="contained" startIcon={<Payments />} className='factura-button' onClick={guardarFacturaEfectivo} style={buttonStyle}>
                                        Pago en Efectivo
                                    </Button>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </PermissionChecker>
        </div >
    );
}

export default Factura;