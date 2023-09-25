import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';


import PermissionChecker from '../Home/PermissionChecker.jsx';
import { AuthContext } from '../AuthContext.js';

//GRID
import { Button } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbar } from '@mui/x-data-grid';
import { Dashboard } from '@mui/icons-material'
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

//STYLES
import AdminDashboardService from '../../Services/AdminDashboardService';
import '../HojaDeEstilos/CrudStyles.css';
import NavBar from '../NavBar.jsx';


const Facturas = () => {
    //========================================================================================================================================================================================================================
    //LOGIN VALIDATION
    const authContext = useContext(AuthContext);
    const allowSpecialPermission = false;
    let cont = 0;

    //========================================================================================================================================================================================================================
    //VALUES AND CONSTANTS

    const navigate = useNavigate();
    const [facturas, setFacturas] = useState([]);
    const [radioChoice, setRadioChoice] = useState(1);
    const [columns, setColumns] = useState([
        { field: 'idFactura', headerName: 'ID Factura', flex: 2, headerClassName: 'column-header' },
        { field: 'nombre_paciente', headerName: 'Nombre Paciente', flex: 3, headerClassName: 'column-header' },
        { field: 'idCita', headerName: 'ID Cita', flex: 1, headerClassName: 'column-header' },
        { field: 'isPagada', headerName: 'Pagada', flex: 2, headerClassName: 'column-header' },
        { field: 'total', headerName: 'Total', flex: 2, headerClassName: 'column-header' },
        { field: 'metodoPago', headerName: 'Metodo de Pago', flex: 2, headerClassName: 'column-header' },
        { field: 'rtn', headerName: 'RTN', flex: 3, headerClassName: 'column-header' },
        { field: 'correo', headerName: 'Correo', flex: 3, headerClassName: 'column-header' },
        { field: 'fecha', headerName: 'Fecha', flex: 2, headerClassName: 'column-header' },
        {
            field: 'actions',
            headerName: '',
            flex: 1,
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => handleMoreInfo(params.row)}>
                        <InfoIcon />
                    </IconButton>
                </div>
            ),
        },
    ]);



    //========================================================================================================================================================================================================================
    //DATA GRID SETUP AND FUNCTIONS

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        idFactura: false,
        nombre_paciente: true,
        idCita: true,
        isPagada: true,
        total: true,
        metodoPago: true,
        rtn: true,
        correo: false,
        fecha: true,
    });

    const handleMoreInfo = (row) => {
        console.log(row);
        console.log(row.idFactura);
        console.log("More info")
        //agregar modal open
    }

    const updateColumns = (choice) => {
        switch (choice) {
            case '1':
                // Individual payments columns
                setColumns([
                    { field: 'idFactura', headerName: 'ID Factura', flex: 2, headerClassName: 'column-header' },
                    { field: 'nombre_paciente', headerName: 'Nombre Paciente', flex: 3, headerClassName: 'column-header' },
                    { field: 'idCita', headerName: 'ID Cita', flex: 1, headerClassName: 'column-header' },
                    { field: 'isPagada', headerName: 'Pagada', flex: 2, headerClassName: 'column-header' },
                    { field: 'total', headerName: 'Total', flex: 2, headerClassName: 'column-header' },
                    { field: 'metodoPago', headerName: 'Metodo de Pago', flex: 2, headerClassName: 'column-header' },
                    { field: 'rtn', headerName: 'RTN', flex: 3, headerClassName: 'column-header' },
                    { field: 'correo', headerName: 'Correo', flex: 3, headerClassName: 'column-header' },
                    { field: 'fecha', headerName: 'Fecha', flex: 2, headerClassName: 'column-header' },
                    {
                        field: 'actions',
                        headerName: '',
                        flex: 1,
                        renderCell: (params) => (
                            <div>
                                <IconButton onClick={() => handleMoreInfo(params.row)}>
                                    <InfoIcon />
                                </IconButton>
                            </div>
                        ),
                    },
                ]);
                break;
            case '2':
                // Por Mes columns
                setColumns([
                    { field: 'Mes', headerName: 'Mes', flex: 1, headerClassName: 'column-header' },
                    { field: 'Año', headerName: 'Año', flex: 1, headerClassName: 'column-header' },
                    { field: 'PagosConPaypal', headerName: 'Pagos Con Paypal', flex: 2, headerClassName: 'column-header' },
                    { field: 'PagosEnEfectivo', headerName: 'Pagos en Efectivo', flex: 2, headerClassName: 'column-header' },
                    { field: 'TotalLempiras', headerName: 'Total Lempiras', flex: 2, headerClassName: 'column-header' },
                ]);
                break;
            case '3':
                // Por Año columns
                setColumns([
                    { field: 'Año', headerName: 'Año', flex: 1, headerClassName: 'column-header' },
                    { field: 'PagosConPaypal', headerName: 'Pagos Con Paypal', flex: 2, headerClassName: 'column-header' },
                    { field: 'PagosEnEfectivo', headerName: 'Pagos en Efectivo', flex: 2, headerClassName: 'column-header' },
                    { field: 'TotalLempiras', headerName: 'Total Lempiras', flex: 2, headerClassName: 'column-header' },
                ]);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        updateColumns(radioChoice);
    }, [radioChoice]);

    const fetchDataForIndividualPayments = async () => {
        try {
            console.log("Called fetchDataForIndividualPayments");
            const data = await AdminDashboardService.getFacturas();
            setFacturas(data);
        } catch (error) {
            // Handle error if any
        }
    };

    const fetchDataPorMes = async () => {
        try {
            console.log("Called fetchDataPorMes");
            const data = await AdminDashboardService.getFacturasMes();
            setFacturas(data);
        } catch (error) {
            // Handle error if any
        }
    };

    const fetchDataPorAno = async () => {
        try {
            console.log("Called fetchDataPorAno");
            const data = await AdminDashboardService.getFacturasAno();
            setFacturas(data);
        } catch (error) {
            // Handle error if any
        }
    };


    const handleOnClickDashboard = () => {
        navigate("/finanzas")
    };



    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976d2' },
            },
        },
        esES,
    );

    useEffect(() => {
        console.log("Called useEffect facturaData");
        // Validación login

        const fetchInitialData = async () => {
            switch (radioChoice) {
                case '1':
                    fetchDataForIndividualPayments();
                    break;
                case '2':
                    fetchDataPorMes();
                    break;
                case '3':
                    fetchDataPorAno();
                    break;
                default:
                    fetchDataForIndividualPayments();
                    break;
            }
        };

        // Update tabla
        fetchInitialData();
    }, [navigate, cont, radioChoice]);

    return (
        <div className='crudGrid'>
            <PermissionChecker
                userType={authContext.userType}
                requiredPermissions={['administrador', 'master']}
                allowSpecialPermission={allowSpecialPermission ? 'specialPermission' : null}
            >
                <NavBar />
                <div style={{ height: '100vh' }}>
                    <div className='headerDiv'>
                        <h1 style={{ width: '200px' }}>Finanzas</h1>

                        <Button
                            onClick={handleOnClickDashboard}
                            startIcon={<Dashboard />}
                            style={{
                                backgroundColor: 'rgb(27, 96, 241)',
                                color: 'white',
                                borderRadius: '10px',
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                position: 'absolute',
                                top: '75px',
                                right: '10px',
                                marginRight: "480px",
                            }}
                        >
                            Ver Dashboard
                        </Button>
                        <RadioGroup
                            name="timeInterval"
                            value={radioChoice}
                            onChange={(event) => setRadioChoice(event.target.value)}
                            row // Display radio buttons horizontally
                            style={{ position: 'absolute', top: '75px', right: '20px', marginRight: '5%', marginLeft: '10px' }}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Individuales" />
                            <FormControlLabel value="2" control={<Radio />} label="Por Mes" />
                            <FormControlLabel value="3" control={<Radio />} label="Por Año" />
                        </RadioGroup>

                    </div>
                    <div className='dataGridBox'>
                        <ThemeProvider theme={theme}>
                            <DataGrid
                                rows={facturas}
                                getRowId={(row) => row.idFactura}
                                columns={columns}
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                                columnVisibilityModel={columnVisibilityModel}
                                onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                            />
                        </ThemeProvider>
                    </div>
                </div>
            </PermissionChecker>
        </div>
    );



}

export default Facturas 