import React, { useState } from 'react';
import '../HojaDeEstilos/Laboratorio.css';
import { useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import Footer from './Footer';

const Laboratorio = () => {
    
    const [cartItems, setCartItems] = useState([]);
    const [quotingEnabled, setQuotingEnabled] = useState(false);

    const navigate = useNavigate();

    const handleVolverClick = () => {
        navigate('/');
    };

    const addToCart = (exam) => {
        const existingItem = cartItems.find((item) => item.id === exam.id);

        if (existingItem) {
            const updatedItems = cartItems.map((item) =>
                item.id === exam.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedItems);
        } else {
            setCartItems([...cartItems, { ...exam, quantity: 1 }]);
        }
    };

    const decreaseQuantity = (exam) => {
        const updatedItems = cartItems.map((item) =>
            item.id === exam.id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedItems.filter((item) => item.quantity > 0));
    };

    const handleToggleQuoting = () => {
        if (quotingEnabled) {
            setCartItems([]);
        }
        setQuotingEnabled(!quotingEnabled);
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const exams = [
        {
            id: 1,
            name: 'Blood Test',
            price: 50,
            description: 'A comprehensive blood test for various health indicators.',
            //image: 'blood-test.jpg',
        },
        {
            id: 2,
            name: 'Urine Analysis',
            price: 30,
            description: 'Analysis of urine sample to detect any abnormalities.',
            //image: 'urine-analysis.jpg',
        },

        {
            id: 3,
            name: 'Blood Test',
            price: 50,
            description: 'A comprehensive blood test for various health indicators.',
            //image: 'blood-test.jpg',
        },
        {
            id: 4,
            name: 'Urine Analysis',
            price: 30,
            description: 'Analysis of urine sample to detect any abnormalities.',
            //image: 'urine-analysis.jpg',
        },

        {
            id: 5,
            name: 'Blood Test',
            price: 50,
            description: 'A comprehensive blood test for various health indicators.',
            //image: 'blood-test.jpg',
        },
        {
            id: 6,
            name: 'Urine Analysis',
            price: 30,
            description: 'Analysis of urine sample to detect any abnormalities.',
            //image: 'urine-analysis.jpg',
        },
        // Add more lab exams here
    ];

    return (
        <div className="scrollable-page1">
            <Topbar />
            <div className='header'>
                CATALOGO DE EXAMENES
            </div>
            <div className="empty-space-top"></div>
            <div className="catalog-container">
                {exams.map((exam) => (
                    <div className="exam-card" key={exam.id}>
                        <h2>{exam.name}</h2>
                        <p className="description">{exam.description}</p>
                        <div className="price">{`Precio: Lps.${exam.price}`}</div>
                        <div className="quantity">
                            <span>Unidades: </span>
                            <button onClick={() => decreaseQuantity(exam)}>-</button>
                            <span>{cartItems.find((item) => item.id === exam.id)?.quantity || 0}</span>
                            <button onClick={() => addToCart(exam)}>+</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="transaction-container">
                <button className="transaction-button" onClick={handleToggleQuoting}>
                    {quotingEnabled ? "Cancelar Cotización" : "Cotizar Exámenes"}
                </button>
            </div>
            {quotingEnabled && (
                <div className="quoting-container">
                    <h3>Cotización</h3>
                    {cartItems.map((item) => (
                        <div key={item.id} className="quoting-item">
                            <span className="quoting-item-name">{item.name}</span>
                            <span className="quoting-item-price">{`Precio: Lps.${item.price * item.quantity}`}</span>
                        </div>
                    ))}
                    <div className="total-amount">{`Total: Lps.${totalAmount}`}</div>
                </div>
            )}
            <div className="empty-space-bottom"></div>
            <Footer />
        </div>
    );
};

export default Laboratorio;
