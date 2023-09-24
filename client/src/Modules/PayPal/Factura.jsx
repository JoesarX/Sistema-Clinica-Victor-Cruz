import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import { faTrash, faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import Services from '../../Services/FacturasService';
import { Payment, Payments } from '@mui/icons-material';
import swal from 'sweetalert';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Factura() {

    const [value, setValue] = useState(0);
    const [aplicarISV, setAplicarISV] = useState(true);
    const [selectedService, setSelectedService] = useState('Servicios Disponibles');
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [isv, setIsv] = useState(0);
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
            setSubtotal(0);
            setIsv(0);
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
            setSubtotal(0);
            setIsv(0);
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
            inputElement.value = inputValue;
        }
    };

    const generatePDF = (fecha) => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: [11, 8.5]
        });
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Clínica Medica Dr. Victor Cruz Andino", 0.5, 0.75,);
        doc.setFontSize(15)
        doc.setTextColor(169, 169, 169)
        doc.text(7, 0.6, "FACTURA");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0)
        doc.setFont("helvetica", "normal")
        doc.text("Colonia Kennedy al final de la Calle Comercial, contiguo a BANRURAL", 0.5, 1);
        doc.setFont("helvetica", "bold");
        doc.text("FECHA: ", 5.75, 1);
        doc.setFont("helvetica", "normal")
        doc.text(fecha, 6.35, 1);
        doc.setFont("helvetica", "bold");
        doc.text("No. DE FACTURA: ", 5.75, 1.25);
        doc.setFont("helvetica", "normal")
        doc.text("Tegucigalpa, 11101", 0.5, 1.25);
        doc.text("Teléfono: 2230-3901, Celular: 9689-4453", 0.5, 1.5);
        doc.setFont("helvetica", "bold");
        doc.text("FACTURAR A: ", 0.5, 1.90);
        doc.setFont("helvetica", "normal")
        doc.text(nombre, 0.5, 2.05);
        doc.text("Clínica Medica Dr. Victor Cruz Andino", 0.5, 2.20);
        doc.text("Colonia Kennedy al final de la Calle Comercial, contiguo a BANRURAL", 0.5, 2.35);
        doc.text("Tegucigalpa, 11101", 0.5, 2.5);
        doc.text("Teléfono: 2230-3901, Celular: 9689-4453", 0.5, 2.65);
        const serviceCounts = {};
        serviciosSeleccionados.forEach((service) => {
            const serviceName = service.servicio;
            if (!serviceCounts[serviceName]) {
                // If the service name doesn't exist, initialize it with a count of 0 and an empty array for prices
                serviceCounts[serviceName] = {
                    quantity: 0,
                    prices: [],
                };
            }
            // Increment the quantity count
            serviceCounts[serviceName].quantity++;
            // Add the price to the prices array
            serviceCounts[serviceName].prices = service.precio;

            // serviceCounts[serviceName].prices.push(service.precio);
        });
        const resultArray = Object.keys(serviceCounts).map((serviceName) => ({
            name: serviceName,
            quantity: serviceCounts[serviceName].quantity,
            prices: serviceCounts[serviceName].prices,
        }));
        console.log(resultArray);
        doc.autoTable({
            head: [['DESCRIPCIÓN', 'CANT', 'PRECIO UNITARIO', 'MONTO'],],
            body: resultArray.map((service) => [
                service.name,
                service.quantity,
                "L. " + service.prices + ".00",
                "L. " + service.prices * service.quantity + ".00"
            ]),
            styles: {
                fontSize: 9,
                halign: 'center',

            },
            columnStyles: {
                0: { cellWidth: 4.2, halign: 'left' },
                1: { cellWidth: 1, halign: 'center' },
                2: { cellWidth: 1.31, halign: 'right' },
                3: { cellWidth: 1, halign: 'right' },

            },
            startY: 2.9,
            margin: { left: 0.5 },
            theme: 'striped'
        });
        const tableEndY = doc.autoTable.previous.finalY;

        let subtotal = 0;

        for(let i = 0 ; i <serviciosSeleccionados.length; i++){
            subtotal += parseFloat(serviciosSeleccionados[i].precio);
        }
        console.log(serviciosSeleccionados)
        console.log(subtotal);

         doc.autoTable({
            theme: 'striped',
            
             body:  [
                ["SUBTOTAL","L. " + subtotal + ".00"],
                 ["TASA DE IMPUESTO","15%"],
                 ["ISV","L. " + (subtotal * 0.15) + ".00"],
                 ["TOTAL","L. " + (subtotal + (subtotal * 0.15)) + ".00"]
                ],
             
 
             styles: {
                 fontSize: 9,
                 halign: 'left',
                 border: 0.1,
                
             },
             
            columnStyles: {
                 0: { cellWidth: 1.51, halign: 'left' },
                 1: { cellWidth: 1, halign: 'right' },
             },
 
             startY: tableEndY,
             margin: { left: 5.5 },
             
         });
         doc.setFont("helvetica", "bold");
      
         doc.text("GRACIAS POR SU CONFIANZA",8.5/2,10, {align: "center"})

       
          
        doc.save('Factura_' + nombre + '_' + fecha + '.pdf');
    };


    const fechaInicio = new Date();

    const formatDate = (date) => {
        console.log(date)
        var datePrefs = { year: 'numeric', month: 'long', day: 'numeric' };
        console.log(new Date(date).toLocaleDateString("es-HN", datePrefs))
        return new Date(date).toLocaleDateString("es-HN", datePrefs);

    }


    const handleExportPDF = () => {
        // console.log(paciente.fecha)
        // console.log(formatDate(paciente.fecha))
        generatePDF(formatDate(fechaInicio));
    };



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
                                        onChange={(e) => handleRTNInput(e.target)}
                                        value={rtn}
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
                                <div className='factura-montos'>
                                    <div className="factura-subtotal">Subtotal: {new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(subtotal)}</div>
                                    <div className="factura-iva">ISV: {new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(isv)}</div>
                                    <div className="factura-total">Total: {new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(total)}</div>
                                </div>
                                <div className='factura-applyISV'>
                                    <input
                                        type="checkbox"
                                        checked={aplicarISV}
                                        onChange={(e) => setAplicarISV(e.target.checked)}
                                    />
                                    Aplicar ISV
                                </div>
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
                                <div class='factura-payment-button-container'>
                                    <Button variant="contained" startIcon={<Payment />} className='button' onClick={guardarFacturaPayPal}>
                                        Pago en Línea
                                    </Button>
                                    <Button variant="contained" startIcon={<Payments />} className='button' onClick={guardarFacturaEfectivo}>
                                        Pago en Efectivo
                                    </Button>
                                    <Button variant="contained" className='button' onClick={handleExportPDF}>
                                        <FontAwesomeIcon icon={faDownload} />
                                        Descargar Factura
                                    </Button>
                                </div>
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