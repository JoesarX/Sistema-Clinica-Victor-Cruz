import React, { useState } from 'react';
import '../HojaDeEstilos/Laboratorio.css';
import { useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import Footer from './Footer';

import { useEffect, useCallback } from 'react'


import ExamenesService from '../../Services/ExamenesService';

const Laboratorio = () => {

    const [cartItems, setCartItems] = useState([]);
    const [quotingEnabled, setQuotingEnabled] = useState(false);

    const navigate = useNavigate();

    const handleVolverClick = () => {
        navigate('/');
    };

    const [examenData, setExameness] = useState([]);
    const [examenes, setExamenes] = useState([]);
    const [isAddSubmitting, setIsAddSubmitting] = useState(false);
    const isLoggedIn = localStorage.getItem("400");

    useEffect(() => {
        console.log("Called useEffect examenData")

        const fetchAllExamenes = async () => {
            try {
                const examenesData = await ExamenesService.getAllExamenes()
                const examenesWithId = examenesData.map((examen) => ({
                    ...examen,
                    idexamen: examen.idexamen,
                }));
                setExamenes(examenesWithId);
            } catch (error) {
                // Handle error if any
                console.log("Error fetching examenes:", error);
            }
        };

        // Update tabla
        fetchAllExamenes();
        if (isAddSubmitting) {
            fetchAllExamenes();
        }
        console.log(examenes + "examenes")


    }, [isLoggedIn, navigate]);

    const addToCart = (exam) => {
        const existingItem = cartItems.find((item) => item.idexamen === exam.idexamen);

        if (existingItem) {
            const updatedItems = cartItems.map((item) =>
                item.idexamen === exam.idexamen ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedItems);
        } else {
            setCartItems([...cartItems, { ...exam, quantity: 1 }]);
        }
    };

    const decreaseQuantity = (exam) => {
        const updatedItems = cartItems.map((item) =>
            item.idexamen === exam.idexamen ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedItems.filter((item) => item.quantity > 0));
    };

    const handleToggleQuoting = () => {
        if (quotingEnabled) {
            setCartItems([]);
        }
        setQuotingEnabled(!quotingEnabled);
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);



    return (
        <div className="scrollable-page1">
            <Topbar />
            <div className='header'>
                CATALOGO DE EXAMENES
            </div>
            <div className="empty-space-top"></div>
            <div className="catalog-container">
                {examenes.map((exam) => (
                    <div className="exam-card" key={exam.idexamen}>
                        <h2>{exam.titulo}</h2>
                        <p className="description">{exam.descripcion}</p>
                        <div className="price">{`Precio: Lps.${exam.precio}`}</div>
                        <div className="quantity">
                            <span>Unidades: </span>
                            <button onClick={() => decreaseQuantity(exam)}>-</button>
                            <span>{cartItems.find((item) => item.idexamen === exam.idexamen)?.quantity || 0}</span>
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
                    {cartItems.map((item, index) => (
                        <div key={item.id} className="quoting-item">
                            <span className="quoting-item-name">{item.titulo}</span>
                            <span className="quoting-item-quantity"><span className ="palabra_value">Cantidad: </span>{`${item.quantity}`}</span>
                            <span className="quoting-item-total"><span className ="palabra_value1">Total: </span>
                                {`Lps. ${(
                                    item.precio * item.quantity
                                ).toLocaleString('es-HN', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}`}
                            </span>
                            {index !== cartItems.length - 1 && <hr className="quoting-item-separator" />}
                        </div>
                    ))}
                    <div className="total-amount">{`Total: Lps. ${totalAmount.toLocaleString('es-HN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`}</div>
                </div>
            )}
            <div className="empty-space-bottom"></div>
            <Footer />
        </div>
    );
};

export default Laboratorio;
