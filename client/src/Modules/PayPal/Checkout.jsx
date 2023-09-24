//import { CLIENT_ID } from '../../Config/config'
import React, { useState, useEffect, useContext } from "react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';
import PagosService from '../../Services/PagosService';
import FacturasService from '../../Services/FacturasService';
import KeysService from '../../Services/KeysService'; 
import { Box, Typography, Button } from '@mui/material';
import { AuthContext } from '../AuthContext.js';

const Checkout = () => {
    const [keys, setKeys] = useState({});
    const [factura, setFactura] = useState(null);
    const { id } = useParams();

    const { isLoggedIn } = useContext(AuthContext);
    useEffect(() => {
        const fetchFactura = async () => {
            try {
                if (localStorage.getItem('isLoggedIn') !== "true" || localStorage.getItem('isLoggedIn') === null) {
                    navigate("/iniciarsesion?returnUrl=/checkout/"+id);
                    return null;
                }
                const response = await FacturasService.getOneFacturaWithCita(id);
                setFactura(response);
                if (localStorage.getItem('correo') !== response.correo) {
                    navigate("/prohibido"); 
                    return null;
                }

                if (response.isPagada) {
                    swal({
                        title: 'Pago ya realizado',
                        text: 'El pago de esta factura ya ha sido procesado.',
                        icon: 'info',
                        buttons: {
                            ok: 'OK',
                        },
                    }).then(() => {
                        // Redirect to the landing page after clicking OK
                        navigate("/");
                    });
                }
            } catch (error) {
                console.error('Error fetching paciente:', error);
            }
        };
        const fetchPaypalKeys = async () => {
            try {
                const response = await KeysService.fetchKeys();
                setKeys(response);
            } catch (error) {
                console.error('Error fetching key:', error);
            }
        };
        
        fetchFactura();
        fetchPaypalKeys();
    }, [id]);
    
    useEffect(() => {
        console.log(localStorage.getItem('isLoggedIn'));
    }, [localStorage]);
    

    //const isLoggedIn = localStorage.getItem("100");

    const [show, setShow] = useState(true);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [price, setPrice] = useState(500);
    let OrderId = null
    let idcita = null
    let correouser = null
    const navigate = useNavigate();

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    //CAMBIAR DESCRIPTION Y VALUE POR LOS QUE SE NECESITEN
                    description: "PAGO DE CONSULTA EN LINEA",
                    amount: {
                        currency_code: "USD",
                        value: (Math.round(((factura.total * 1.035) * 0.041) * 100) / 100).toFixed(2),
                    },
                },
            ],
        }).then((orderID) => {
            OrderId = orderID;
            return orderID;
        });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function (details) {
            const { payer } = details;

            const { purchase_units } = details;
            const { email_address, payer_id, name } = payer;
            const { given_name, surname } = name;
            const { amount } = purchase_units[0];
            const { currency_code, value } = amount;

            //CAMBIAR VALUES POR LOS QUE SE NECESITEN Y TAL VEZ IMPLMENTARLO CON USESTATE
            idcita = factura.idCita;
            correouser = factura.correo;

            const dataPay = { "idpago": OrderId, "idpayer": payer_id, "idcita": idcita, "nombre": given_name, "apellido": surname, "correouser": correouser, "correopago": email_address, "country_code": currency_code, "monto_pagado": value }
            factura.isPagada = true;
            await PagosService.postPagos(dataPay);
            await FacturasService.editFactura(id, factura);
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
        swal("Hubo un error efecutando el pago.", {
            icon: "error",
        });
    };

    useEffect(() => {
        if (success) {
            swal("Su pago se efectuo con exito!.", {
                icon: "success",
            });
            

            //!CAMBIAR EN ALGUN PUNTO A LA PAGINA DEL DASHBOARD DE USUARIO
            navigate("/");
        }
    }, [success]);
    /*
    useEffect(() => {
        // Validación login
        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            swal("No cuenta con el permiso de entrar a este apartado.", {
                icon: "error",
            });
            navigate("/"); // Redirige a la página de inicio de sesión
        }
    }, [isLoggedIn]);
    */

    if (factura === null) {
        // Display a loading indicator or message while fetching data
        return (
            <div>Loading...</div>
        );
    }

    return (
        <Box sx={{ backgroundColor: '#1E60A6', height: '100%', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ margin: '25px auto', maxWidth: 600, textAlign: 'center', backgroundColor: ' #E4EBF9', borderRadius: 5, padding: 3 }}>
                <Typography variant="h5" sx={{ my: 2, fontWeight: 'bold' }}>
                    {/* Pago de Consulta en Linea */}
                    PAGO DE CONSULTA EN LINEA
                </Typography>
                <img
                    src="https://www.healthcarefinancenews.com/sites/healthcarefinancenews.com/files/styles/companion_top/public/patient-payment-stock-712_15.jpg?itok=o0QcaMhg"
                    alt="Product"
                    width="100%"
                    display="fixed"
                    border-radius="5px"
                />



                <Box sx={{ background: '#fff', p: 2 }}>
                    <Typography>
                        Pago de Consulta a nombre de {factura.nombre_paciente} para el dia {factura.fecha} a las {factura.hora}.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #ccc' }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>Lps. {(Math.round((factura.total) * 100) / 100).toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #ccc' }}>
                    <Typography>Tarifa pago en linea:</Typography>
                    <Typography>Lps. {(Math.round((factura.total * 0.035) * 100) / 100).toFixed(2)}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', p: 3 }}>
                    <Typography sx={{ fontWeight: 'bold', color: '#1E60A6', fontSize: "18px" }}>Total:</Typography>
                    <Typography sx={{ fontWeight: 'bold', fontSize: "18px" }}>Lps. {(Math.round((factura.total * 1.035) * 100) / 100).toFixed(2)}</Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', p: 3, paddingTop:1}}>
                    <Typography sx={{fontWeight: 'bold'}}>Total en Dolares:</Typography>
                    <Typography sx={{fontWeight: 'bold'}}>$ {(price * 1.035) / 25}</Typography>
                </Box> */}
                <PayPalScriptProvider options={{ "client-id": keys.clientID}}>
                    <div>
                        {show ? (
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={(err) => {
                                    swal("Hubo un error efectuando el pago.", {
                                        icon: "error",
                                    });
                                }}
                            />
                        ) : null}
                    </div>
                </PayPalScriptProvider>
            </Box>
        </Box>
    );
}

export default Checkout