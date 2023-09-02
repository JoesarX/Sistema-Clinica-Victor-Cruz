import { CLIENT_ID } from '../../Config/config'
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import PagosService from '../../Services/PagosService';

const Checkout = () => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    let OrderId= null
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
                        value: 0.01,
                    },
                },
            ],
        }).then((orderID) => {
            OrderId=orderID;
            return orderID;
        });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function (details) {
            const { payer } = details;

            const {purchase_units} = details;
            const { email_address, payer_id, name } = payer;
            const { given_name, surname } = name;
            const { amount } = purchase_units[0];
            const { currency_code, value } = amount;

            //CAMBIAR VALUES POR LOS QUE SE NECESITEN Y TAL VEZ IMPLMENTARLO CON USESTATE
            idcita = 45
            correouser = "correo@gmail.com"

            const dataPay = {"idpago": OrderId, "idpayer": payer_id, "idcita": idcita, "nombre": given_name, "apellido": surname, "correouser": correouser, "correopago": email_address, "country_code": currency_code, "monto_pagado": value}

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
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div>
                <div className="wrapper">
                    <div className="product-info">
                        <div className="product-text">
                            <h1>Sunflower</h1>
                        </div>
                        <div className="product-price-btn">
                            <p>$0.01</p>
                            <br></br>
                            <button className='buy-btn' type="submit" onClick={() => setShow(true)}>
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>
                <br></br>
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
    );
}

export default Checkout