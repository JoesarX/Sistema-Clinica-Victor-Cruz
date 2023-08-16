import React from 'react'
import '../HojaDeEstilos/Laboratorio.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Topbar from './Topbar';
import Footer from './Footer';


const Laboratorio = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedExams, setSelectedExams] = useState([]);

    const navigate = useNavigate();
    const handleCotizarClick = () => {
        navigate('laboratorio/cotizacion-examen');
    };

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

    const handleTransaction = () => {
        // Handle the transaction logic here
        // You can access the selected exams from the 'selectedExams' state array
        console.log('Transaction completed:', selectedExams);
    };

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

    const toggleSelection = (examId) => {
        setSelectedExams((prevSelectedExams) => {
            if (prevSelectedExams.includes(examId)) {
                return prevSelectedExams.filter((id) => id !== examId);
            } else {
                return [...prevSelectedExams, examId];
            }
        });
    };

    return (
        <div className="scrollable-page">


            <Topbar />

            <div className='header'>
                CATALAGO DE EXAMENES
            </div>
            <div className="catalog-container">
                {exams.map((exam) => (
                    <div className="exam-card" key={exam.id}>
                        <div className="selection">
                            <input
                                type="checkbox"
                                id={`checkbox-${exam.id}`}
                                checked={selectedExams.includes(exam.id)}
                                onChange={() => toggleSelection(exam.id)}
                                className="custom-checkbox"
                            />
                            <label htmlFor={`checkbox-${exam.id}`} className="checkbox-label"></label>
                        </div>

                        <h2>{exam.name}</h2>
                        <p>{exam.description}</p>
                        <div className="price">{`Price: $${exam.price}`}</div>
                        <div className="quantity">
                            <span>Unidad: </span>
                            <button onClick={() => decreaseQuantity(exam)}>-</button>
                            <span>{cartItems.find((item) => item.id === exam.id)?.quantity || 0}</span>
                            <button onClick={() => addToCart(exam)}>+</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedExams.length > 0 && (
                <div className="transaction-container">
                    <button className="transaction-button" onClick={handleTransaction}>
                        Complete Transaction
                    </button>
                </div>
            )}

            <Footer />
        </div>
    );
};




export default Laboratorio;


