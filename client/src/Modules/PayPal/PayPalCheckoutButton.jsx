import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const PayPalCheckoutButton = (props) => {
    const { product } = props;
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderId) => {
        // Call backend function to fulfill order

        // if response is success
        setPaidFor(true);
        // Refresh user's account or subscription status

        // if response is error
        // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
    }

    if (paidFor) {
        // Display success message, modal or redirect user to success page
        swal("Su pago se efectuo con exito!.", {
            icon: "success",
        });
    }

    if (error) {
        // Display error message, modal or redirect user to error page
        swal("Ha habido un error procesando su pago.", {
            icon: "error",
        });
    }


    return (
        // <script src="https://www.paypal.com/sdk/js?client-id=AeLQpEh9ZdoDDPYOptHxp0rnt5_dqCL9M-xtggZjfWEIKtTZngqwhEEJBG_hNQElI5diC-YKQ4IHi6ME">
        <PayPalButtons
            style={{
                color: "silver",
                layout: "horizontal",
                height: 48,
                tagline: false,
                shape: "pill"
            }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: product.description,
                            amount: {
                                value: product.price
                            }
                        }
                    ]
                });
            }}
            onClick={(data, actions) => {
                // Validate on button click, client or server side
                const hasAlreadyBoughtCourse = false;

                if (hasAlreadyBoughtCourse) {
                    setError(
                        "Usted ya a efectuado el pago de la consulta."
                    );

                    return actions.reject();
                } else {
                    return actions.resolve();
                }
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log("order", order);

                handleApprove(data.orderID);
            }}
            onError={(err) => {
                setError(err);
                console.error("PayPal Checkout onError", err);
            }}
            onCancel={() => {
                // Display cancel message, modal or redirect user to cancel page or back to cart
                // useNavigate().goBack();
            }}
        />
        // </script>
    );
}

export default PayPalCheckoutButton;