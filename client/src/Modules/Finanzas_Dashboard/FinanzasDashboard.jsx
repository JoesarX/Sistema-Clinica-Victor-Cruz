import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import NavBar from '../NavBar';

import {
    PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip,
    XAxis, YAxis, CartesianGrid, BarChart, Bar, ScatterChart, Scatter, LabelList
} from 'recharts';
import swal from 'sweetalert';


import AdminDashboardService from '../../Services/AdminDashboardService';

const Finanzas = () => {
    //========================================================================================================================================================================================================================
    //* VARIABLES
    //Login
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("400");
    let cont = 0;

    //========================================================================================================================================================================================================================
    //* ALL CHARTS
    const [timeInterval, setTimeInterval] = useState(6);
    const [fillShade, setFillShade] = useState(2);

    // a list of 5 shades of blue for the charts equally distributed starting with the lightest '#0070BD' to the darkest '#082464'
    const blueShades = ['#0070BD', '#0059A6', '#00457C', '#00325A', '#082464'];

    const handleIntervalChange = async (event) => {
        setTimeInterval(event.target.value);

        // const setVal = event.target.value;
        // const allDatas = await AdminDashboardService.getAll(setVal);
        // setGananciasMesData(allDatas[0]);
        // setMetodoPagoData(allDatas[1]);
        // setUserCountData(allDatas[2]);
        // setPopularDayData(allDatas[3]);
        // setPopularTimeData(allDatas[4]);
    };

    //========================================================================================================================================================================================================================
    //* METODO PAGO PIE CHART
    const [metodoPagoData, setMetodoPagoData] = useState([]);


    const COLORS = ['#02a183', '#00457C', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        const nameX = cx + (outerRadius + 15) * Math.cos(-midAngle * RADIAN);
        const nameY = cy + (outerRadius + 15) * Math.sin(-midAngle * RADIAN);
        return (
            <>
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                <text x={nameX} y={nameY} dy={8} textAnchor={x > cx ? 'start' : 'end'} fill="#333">
                    {`${metodoPagoData[index].value} pagos`}
                </text>
            </>
        );
    };

    //========================================================================================================================================================================================================================
    //* GANANCIAS POR MES CHART
    const [gananciasMesData, setGananciasMesData] = useState([]);

    //========================================================================================================================================================================================================================
    //* CUENTA DE USUARIOS CHART
    const [userCountData, setUserCountData] = useState([]);

    //========================================================================================================================================================================================================================
    //* DIA MAS POPULAR CHART
    const [popularDayData, setPopularDayData] = useState([]);

    //========================================================================================================================================================================================================================
    //* HORA MAS POPULAR CHART
    const [popularTimeData, setPopularTimeData] = useState([]);

    useEffect(() => {
        // Validación login
        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            if (cont === 0) {
                swal("No Cuenta con el permiso de entrar a este apartado.", {
                    icon: "error",
                });
                navigate("/"); // Redirige a la página de inicio de sesión
                cont++;
            }
        }

        //Obtener Data
        const fetchAllValues = async () => {
            try {
                // const metodoPago = await AdminDashboardService.getCountMetodoPago()
                // setMetodoPagoData(metodoPago);

                // const gananciasMes = await AdminDashboardService.getProfitByMonth();
                // setGananciasMesData(gananciasMes);

                // const userCount = await AdminDashboardService.getUserCount();
                // setUserCountData(userCount);

                // const popularDay = await AdminDashboardService.getPopularDays();
                // setPopularDayData(popularDay);

                // const popularTime = await AdminDashboardService.getPopularTimes();
                // setPopularTimeData(popularTime);

                const allDatas = await AdminDashboardService.getAll(timeInterval);
                setGananciasMesData(allDatas[0]);
                setMetodoPagoData(allDatas[1]);
                setUserCountData(allDatas[2]);
                setPopularDayData(allDatas[3]);
                setPopularTimeData(allDatas[4]);

                switch (timeInterval) {
                    case "1":
                        setFillShade(0);
                        break;
                    case "3":
                        setFillShade(1);
                        break;
                    case "6":
                        setFillShade(2);
                        break;
                    case "12":
                        setFillShade(3);
                        break;
                    case "999":
                        setFillShade(4);
                        break;
                    default:
                        setFillShade(2);
                        break;
                }

            } catch (error) {
                console.log(error)
            }
        };
        fetchAllValues();


    }, [isLoggedIn, navigate, cont, timeInterval]);

    return (
        <div className='crudGrid'>
            <NavBar />
            <div style={{ height: '100vh', overflow: 'auto' }}>
                <div className='headerDiv' style={{ position: 'fixed', width: '100%', zIndex: 1 }}>
                    <h1>Finanzas</h1>
                    <RadioGroup
                        name="timeInterval"
                        value={timeInterval}
                        onChange={handleIntervalChange}
                        row // Display radio buttons horizontally
                        style={{ position: 'absolute', top: '10px', right: '20px', marginRight: "2%" }}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="1 Mes" />
                        <FormControlLabel value="3" control={<Radio />} label="3 Meses" />
                        <FormControlLabel value="6" control={<Radio />} label="6 Meses" />
                        <FormControlLabel value="12" control={<Radio />} label="1 Año" />
                        <FormControlLabel value="999" control={<Radio />} label="Todos los Tiempos" />
                    </RadioGroup>
                </div>
                <div className='dataGridBox' style={{ marginTop: '60px', paddingTop: "10px", display: "flex", flexDirection: "column", width: "95%", marginLeft: "2.5%", marginRight: "2.5%" }}>
                    <div style={{ height: "45vh", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: "0", padding: "0" }}>
                        <div style={{ backgroundColor: "white", height: "97%", width: "69%", display: "flex", flexDirection: "column", alignSelf: "center", padding: "10px", borderRadius: "20px", margin: "5px", marginTop: "0" }}>
                            <h2 style={{ alignSelf: "center", textAlign: "center", fontSize:"25px" }}>Ganancias por Mes</h2>
                            <ResponsiveContainer width="100%" height="90%" debounce="1">
                                <ScatterChart
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                >
                                    <CartesianGrid />
                                    <XAxis dataKey="Mes" name="Mes" />
                                    <YAxis dataKey="Ganancias" name="Ganancias" unit="Lmp" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter
                                        name="A school"
                                        data={gananciasMesData}
                                        fill= {blueShades[fillShade]}
                                        line={{ type: "linear", strokeWidth: 2, stroke: blueShades[fillShade] }} // Line configuration
                                    >
                                        <LabelList dataKey="Ganancias" dx={5} dy={-15} style={{ fontSize: '16px', fontWeight: 'bold' }} />
                                    </Scatter>
                                </ScatterChart>
                            </ResponsiveContainer>

                        </div>
                        <div style={{ backgroundColor: "white", height: "97%", width: "29%", display: "flex", flexDirection: "column", alignSelf: "center", padding: "10px", borderRadius: "20px", margin: "5px", marginTop: "0" }}>
                            <h2 style={{ alignSelf: "center", textAlign: "center", fontSize:"25px" }}>Pagos por cada Medio</h2>
                            <ResponsiveContainer width="100%" height="90%" debounce="1">
                                <PieChart height={200} width={100}>
                                    <Pie
                                        data={metodoPagoData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={"70%"}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {metodoPagoData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div style={{ height: "45vh", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                        <div style={{ backgroundColor: "white", height: "97%", width: "25%", display: "flex", flexDirection: "column", justifyContent: "space-around", alignSelf: "center", padding: "10px", borderRadius: "20px", margin: "5px", marginTop: "0" }}>
                            <h2 style={{ display: "flex", alignSelf: "center", textAlign: "center", fontSize:"25px" }}>Usuarios Totales</h2>
                            <h1 style={{ display: "flex", alignSelf: "center", textAlign: "center", fontSize: "110px" }}>{userCountData.TotalUsers}</h1>
                            <h3 style={{ display: "flex", alignSelf: "center", textAlign: "center", color: "green", fontSize: "21px" }}>
                                {userCountData.NewUsers} Usuarios Nuevos en {timeInterval} {timeInterval === 1 ? 'Mes' : 'Meses'}
                            </h3>
                        </div>
                        <div style={{ backgroundColor: "white", height: "97%", width: "30%", display: "flex", flexDirection: "column", alignSelf: "center", padding: "10px", borderRadius: "20px", margin: "5px", marginTop: "0" }}>
                            <h2 style={{ alignSelf: "center", textAlign: "center", fontSize:"25px" }}>Citas por Dia</h2>
                            <ResponsiveContainer width="100%" height="90%" debounce="1">
                                <BarChart

                                    data={popularDayData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="Dia" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="Citas_Totales" fill={blueShades[fillShade]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ backgroundColor: "white", height: "97%", width: "45%", display: "flex", flexDirection: "column", alignSelf: "center", padding: "10px", borderRadius: "20px", margin: "5px", marginTop: "0" }}>
                            <h2 style={{ alignSelf: "center", textAlign: "center", fontSize:"25px" }}>Citas por Hora</h2>
                            <ResponsiveContainer width="100%" height="90%" debounce="1">
                                <BarChart
                                    data={popularTimeData}

                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="Horario" />
                                    <YAxis />
                                    <Tooltip />
                                    {/* <Legend /> */}
                                    <Bar dataKey="Citas_Totales" fill={blueShades[fillShade]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Finanzas 