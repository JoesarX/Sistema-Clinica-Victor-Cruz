import React, { PureComponent } from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

import {
    PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip, AreaChart, Area,
    XAxis, YAxis, ZAxis, CartesianGrid, BarChart, Bar, LineChart, Line, ScatterChart, Scatter, LabelList
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
    class CustomizedLabel extends PureComponent {
        render() {
            const { x, y, stroke, value } = this.props;

            return (
                <text x={x} y={y - 10} dy={-4} fill={stroke} fontSize={15} textAnchor="middle">
                    {value}
                </text>
            );
        }
    }

    class CustomizedAxisTick extends PureComponent {
        render() {
            const { x, y, stroke, payload } = this.props;

            return (
                <g transform={`translate(${x},${y})`}>
                    <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                        {payload.value}
                    </text>
                </g>
            );
        }
    }

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
                const metodoPago = await AdminDashboardService.getCountMetodoPago()
                setMetodoPagoData(metodoPago);

                const gananciasMes = await AdminDashboardService.getProfitByMonth();
                setGananciasMesData(gananciasMes);

                const userCount = await AdminDashboardService.getUserCount();
                setUserCountData(userCount);

                const popularDay = await AdminDashboardService.getPopularDays();
                setPopularDayData(popularDay);

                const popularTime = await AdminDashboardService.getPopularTimes();
                setPopularTimeData(popularTime);

            } catch (error) {
                console.log(error)
            }
        };
        fetchAllValues();


    }, [isLoggedIn, navigate, cont]);

    return (

        <div className='crudGrid'>
            <NavBar />
            <div style={{ height: '100vh' }}>
                <div className='headerDiv' style={{ }}>
                    <h1>Finanzas</h1>
                </div>
                <div className='dataGridBox' style={{ paddingTop: "10px", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: "45vh", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                        <div style={{ backgroundColor: "white", height: "95%", width: "69%", display: "flex", flexDirection: "column", alignSelf: "center", padding: "10px", borderRadius: "20px", margin: "5px" }}>
                            <h2 style={{ alignSelf: "center", textAlign: "center" }}>Ganancias por Mes</h2>
                            {/* <ResponsiveContainer width="100%" height="80%" debounce="1" background="#f5f5f5">
                                <AreaChart
                                    // width={500}
                                    // height={400}
                                    data={gananciasMesData}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="Mes" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="Ganancias" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                            </ResponsiveContainer> */}
                            {/* <ResponsiveContainer width="100%" height="100%" debounce="1">
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={gananciasMesData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 10,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="Mes" height={60} tick={<CustomizedAxisTick />} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Ganancias" stroke="#8884d8" label={<CustomizedLabel />} />
                                </LineChart>
                            </ResponsiveContainer> */}
                            <ResponsiveContainer width="100%" height="80%" debounce="1">
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
                                        fill="#8884d8"
                                        line={{ type: "linear", strokeWidth: 2, stroke: "#8884d8" }} // Line configuration
                                    >
                                        <LabelList dataKey="Ganancias" dx={5} dy={-15} style={{ fontSize: '16px', fontWeight: 'bold' }}/>
                                    </Scatter>
                                </ScatterChart>
                            </ResponsiveContainer>

                        </div>
                        <div style={{ backgroundColor: "white", height: "95%", width: "29%", display: "flex", flexDirection: "column", alignSelf: "center", padding: "10px", borderRadius: "20px", margin: "5px" }}>
                            <h2 style={{ alignSelf: "center", textAlign: "center" }}>Pagos por cada Medio</h2>
                            <ResponsiveContainer width="100%" height="80%" debounce="1">
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
                        <div style={{ backgroundColor: "white", height: "95%", width: "22%", display: "flex", flexDirection: "column", justifyContent: "space-around", alignSelf: "center", padding: "10px", borderRadius: "20px", margin: "5px" }}>
                            <h2 style={{ display: "flex", alignSelf: "center", textAlign: "center" }}>Usuarios Totales</h2>
                            <h1 style={{ display: "flex", alignSelf: "center", textAlign: "center", fontSize: "120px" }}>{userCountData.TotalUsers}</h1>
                            <h3 style={{ display: "flex", alignSelf: "center", textAlign: "center", color: "green", fontSize: "25px" }}>{userCountData.NewUsers} Usuarios Nuevos este Mes</h3>
                        </div>
                        <div style={{ backgroundColor: "white", height: "95%", width: "32%", display: "flex", flexDirection: "column", alignSelf: "center", padding: "10px", borderRadius: "20px", margin: "5px" }}>
                            <h2 style={{ alignSelf: "center", textAlign: "center" }}>Citas por Dia</h2>
                            <ResponsiveContainer width="100%" height="100%" debounce="1">
                                <BarChart
                                    width={500}
                                    height={300}
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
                                    <Legend />
                                    <Bar dataKey="Citas_Totales" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ backgroundColor: "white", height: "95%", width: "52%", display: "flex", flexDirection: "column", alignSelf: "center", padding: "10px", borderRadius: "20px", margin: "5px" }}>
                            <h2 style={{ alignSelf: "center", textAlign: "center" }}>Citas por Hora</h2>
                            <ResponsiveContainer width="100%" height="100%" debounce="1">
                                <BarChart
                                    data={popularTimeData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="Horario" />
                                    <YAxis />
                                    <Tooltip />
                                    {/* <Legend /> */}
                                    <Bar dataKey="Citas_Totales" fill="#8884d8" />
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