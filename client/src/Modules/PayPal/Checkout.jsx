import { CLIENT_ID } from '../../Config/config'
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import PagosService from '../../Services/PagosService';
import { Box, Typography, Button } from '@mui/material';

const Checkout = () => {
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
                    description: "Sunflower",
                    amount: {
                        currency_code: "USD",
                        value: (price * 1.035) / 25,
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
            idcita = 45
            correouser = "correo@gmail.com"

            const dataPay = { "idpago": OrderId, "idpayer": payer_id, "idcita": idcita, "nombre": given_name, "apellido": surname, "correouser": correouser, "correopago": email_address, "country_code": currency_code, "monto_pagado": value }

            await PagosService.postPagos(dataPay)

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
            console.log('Order successful . Your order id is--', OrderId);

            //!CAMBIAR EN ALGUN PUNTO A LA PAGINA DEL DASHBOARD DE USUARIO
            navigate("/");
        }
    }, [success]);

    return (
        <Box sx={{ backgroundColor: '#1E60A6', height: '100%', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ margin: '50px auto', maxWidth: 600, textAlign: 'center', backgroundColor: 'lightgrey', borderRadius: 5,padding: 3 }}>

                <img
                    src="https://www.healthcarefinancenews.com/sites/healthcarefinancenews.com/files/styles/companion_top/public/patient-payment-stock-712_15.jpg?itok=o0QcaMhg"
                    alt="Product"
                    width="100%"
                    display="block"
                />

                <Typography variant="h5" sx={{ my: 2 }}>
                    PAGO DE CONSULTA EN LINEA
                </Typography>

                <Box sx={{ background: '#eee', p: 2 }}>
                    <Typography>
                        Pago de Consulta para el dia 12/12/2021 a las 12:00
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #ccc' }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>Lps.{price}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #ccc' }}>
                    <Typography>Tarifa pago en linea:</Typography>
                    <Typography>Lps.{price * 0.035}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', p: 2 }}>
                    <Typography>Total:</Typography>
                    <Typography>Lps.{price * 1.035}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', p: 2, paddingTop:1}}>
                    <Typography>Total en Dolares:</Typography>
                    <Typography>$ {(price * 1.035) / 25}</Typography>
                </Box>
                <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
                    <div>

                        {show ? (
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={(err) => {
                                    swal("SHubo un error efectuando el pago.", {
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