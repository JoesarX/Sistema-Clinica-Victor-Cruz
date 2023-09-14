import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import swal from 'sweetalert';


import FacturasService from '../../Services/FacturasService';

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
                const metodoPago = await FacturasService.getCountMetodoPago()
                setMetodoPagoData(metodoPago);

                const gananciasMes = await FacturasService.getProfitByMonth();
                setGananciasMesData(gananciasMes);

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
                <div className='headerDiv'>
                    <h1>Finanzas</h1>
                </div>
                <div className='dataGridBox' style={{ paddingTop: "10px", display:"flex", flexDirection:"column"}}>
                    <div style={{ height: "45vh", width: "100%", display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                        <div style={{ backgroundColor: "white", height: "95%", width:"69%", display:"flex", flexDirection:"column", alignSelf: "center", padding: "10px", borderRadius: "20px", margin: "5px" }}>
                            <h2 style={{ alignSelf: "center" }}>Ganancias por Mes</h2>
                            <ResponsiveContainer width="100%" height="80%" debounce="1" background="#f5f5f5">
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
                            </ResponsiveContainer>
                        </div>
                        <div style={{ backgroundColor: "white", height: "95%", width:"29%", display:"flex", flexDirection:"column", alignSelf: "center", padding: "10px", borderRadius: "20px", margin: "5px" }}>
                            <h2 style={{ alignSelf: "center"}}>Pagos por cada Medio</h2>
                            <ResponsiveContainer width="100%" height="80%" debounce="1">
                                <PieChart height={200}>
                                    <Pie
                                        data={metodoPagoData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={100}
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
                    <div style={{ height: "45vh", width: "100%", display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                        
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Finanzas 