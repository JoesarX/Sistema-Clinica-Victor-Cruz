import PaypalCheckoutButton from "./PayPalCheckoutButton"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const Checkout = () => {
    const product = {
        description: "Pago de Cita",
        price: 0.1
    };

    return (
        <div>

            <h1>PayPal CheckOut</h1>
            <div className="paypal-button-container" >
                <PaypalCheckoutButton product={product} />
            </div >
        </div >
    );
};

export default Checkout;