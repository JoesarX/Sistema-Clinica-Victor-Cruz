import React from 'react';
import '../HojaDeEstilos/Contactanos.css';
import { useState, useContext } from 'react';
import Topbar from './Topbar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from '../AuthContext.js';



const Contactanos = () => {
    const openWhatsApp = () => {
        window.open('https://wa.me/+50433424985', '_blank');
    };

    const { userType, isLoggedIn } = useContext(AuthContext);

    const openEmail = () => {
        window.open('mailto:clinica.drvictorcruz@gmail.com', '_blank');
    };


    /* Para el Numero Telefoinico */
    const [isEditing, setIsEditing] = useState(false);
    const [phone, setPhone] = useState('+504 2230-3901');
    const [editedPhone, setEditedPhone] = useState('+504 2230-3901');

    const handleEditPhone = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedPhone(phone);
    };

    const isValidPhone = (phone) => {
        // Regular expression to match the phone number pattern with a space after +504
        const phonePattern = /^\+504\s\d{4}-\d{4}$/;
        return phonePattern.test(phone);
    };

    const handleSavePhone = () => {
        if (isValidPhone(editedPhone)) {
            setPhone(editedPhone);
            setIsEditing(false);
        } else {
            // Display an error message or handle the invalid phone number case
            alert('El número telefonico no es válido. Asegúrate de que sea un número de 8 dígitos, empiece con +504, tenga un espacio después de los primeros 4 dígitos y un guión después del cuarto dígito.');
        }
    };

    /* Para el numero Movil   */
    const [isEditing1, setIsEditing1] = useState(false);
    const [whatsapp, setWhatsApp] = useState('+504 3342-4985');
    const [editedWhatsapp, setEditedWhatsapp] = useState('+504 3342-4985');

    const handleEditWhatsapp = () => {
        setIsEditing1(true);
    };

    const handleCancelEdit1 = () => {
        setIsEditing1(false);
        setEditedWhatsapp(whatsapp);
    };

    const isValidWhatsApp = (whatsapp) => {
        // Regular expression to match the WhatsApp number pattern with a space after +504 and a hyphen after the first 4 digits
        const whatsappPattern = /^\+504\s\d{4}-\d{4}$/;
        return whatsappPattern.test(whatsapp);
    };

    const handleSaveWhatsapp = () => {
        if (isValidWhatsApp(editedWhatsapp)) {
            setWhatsApp(editedWhatsapp);
            setIsEditing1(false);
        } else {
            // Display an error message or handle the invalid WhatsApp number case
            alert('El número de WhatsApp no es válido. Asegúrate de que sea un número de 8 dígitos, empiece con +504, tenga un espacio después de los primeros 4 dígitos y un guión después del cuarto dígito.');
        }
    };



    /* Para el correo electronico */
    const [isEditing2, setIsEditing2] = useState(false);
    const [email, setEmail] = useState('clinica.drvictorcruz@gmail.com');
    const [editedEmail, setEditedEmail] = useState('clinica.drvictorcruz@gmail.com');

    const handleEditEmail = () => {
        setIsEditing2(true);
    };

    const handleCancelEdit2 = () => {
        setIsEditing2(false);
        setEditedEmail(email);
    };

    const isValidEmail = (email) => {
        // Regular expression to match the email pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSaveEmail = () => {
        if (isValidEmail(editedEmail)) {
            setEmail(editedEmail);
            setIsEditing2(false);
        } else {
            // Display an error message or handle the invalid email case
            alert('El correo electrónico no es válido. Asegúrate de que contenga un símbolo de arroba (@) y cumpla con los requisitos estándar de un correo electrónico válido(tener un punto al final).');
        }
    };

    return (
        <div>
            <Topbar />
            <section id="contact" className="d-flex flex-column justify-content-center align-items-center">
                <div className="container text-center text-md-left" data-aos="fade-up">
                    <h1>Contáctanos</h1>
                </div>
                <div className="container text-center text-md-left" data-aos="fade-up">
                    <h2>¿Tienes alguna duda? Puedes entrar en contacto con nosotros y con gusto te ayudamos.</h2>
                </div>
            </section>
            <h4 className="subtitle">Puedes contactarte con nosotros por los siguientes medios.</h4>
            <section className="medios">
                <div className="cont">
                    <div className="box">
                        <h4 style={{ color: '#1E60A6' }}>Llamada telefónica</h4>
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    value={editedPhone}
                                    onChange={(e) => setEditedPhone(e.target.value)}
                                    style={{ color: '#1E60A6', fontWeight: 'bold' }}
                                />
                                <button onClick={handleSavePhone}>
                                    <FontAwesomeIcon icon={faSave} style={{ color: '#1E60A6' }} />
                                </button>
                                <button onClick={handleCancelEdit}>
                                    <FontAwesomeIcon icon={faTimes} style={{ color: '#1E60A6' }} />
                                </button>
                            </>
                        ) : (
                            <>
                                <p style={{ color: '#1E60A6' }}>Puedes llamarnos al número</p>
                                <FontAwesomeIcon icon={faPhone} style={{ color: '#1560F2' }} />
                                <span style={{ color: '#1E60A6', fontWeight: 'bold' }}>{phone}</span>
                                {isLoggedIn && userType !== 'normal' && (
                                    <div>
                                        <button onClick={handleEditPhone} style={{ marginLeft: '5px' }}>
                                            <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="box">
                        <h4 style={{ color: '#1E60A6' }}>WhatsApp</h4>
                        {isEditing1 ? (
                            <>
                                <input
                                    type="text"
                                    value={editedWhatsapp}
                                    onChange={(e) => setEditedWhatsapp(e.target.value)}
                                    style={{ color: '#1E60A6', fontWeight: 'bold' }}
                                />
                                <button onClick={handleSaveWhatsapp}>
                                    <FontAwesomeIcon icon={faSave} style={{ color: '#1E60A6' }} />
                                </button>
                                <button onClick={handleCancelEdit1}>
                                    <FontAwesomeIcon icon={faTimes} style={{ color: '#1E60A6' }} />
                                </button>
                            </>
                        ) : (
                            <>
                                <p style={{ color: '#1E60A6' }}>Puedes escribirnos al número</p>
                                <FontAwesomeIcon icon={faWhatsapp} style={{ color: '#1560F2' }} />
                                <span onClick={openWhatsApp} style={{ color: '#1E60A6', fontWeight: 'bold', cursor: 'pointer' }}>
                                    {whatsapp}
                                </span>
                                {isLoggedIn && userType !== 'normal' && (
                                    <div>
                                        <button onClick={handleEditWhatsapp} style={{ marginLeft: '5px' }}>
                                            <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="box">
                        <h4 style={{ color: '#1E60A6' }}>Correo Electrónico</h4>
                        {isEditing2 ? (
                            <>
                                <input
                                    type="text"
                                    value={editedEmail}
                                    onChange={(e) => setEditedEmail(e.target.value)}
                                    style={{ color: '#1E60A6', fontWeight: 'bold' }}
                                />
                                <button onClick={handleSaveEmail}>
                                    <FontAwesomeIcon icon={faSave} style={{ color: '#1E60A6' }} />
                                </button>
                                <button onClick={handleCancelEdit2}>
                                    <FontAwesomeIcon icon={faTimes} style={{ color: '#1E60A6' }} />
                                </button>
                            </>
                        ) : (
                            <>
                                <p style={{ color: '#1E60A6' }}>Puedes escribirnos al correo</p>
                                <FontAwesomeIcon icon={faEnvelope} style={{ color: '#1560F2' }} />
                                <span onClick={openEmail} style={{ color: '#1E60A6', fontWeight: 'bold', cursor: 'pointer' }}>
                                    {email}
                                </span>
                                {isLoggedIn && userType !== 'normal' && (
                                    <div>
                                        <button onClick={handleEditEmail} style={{ marginLeft: '5px' }}>
                                            <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Contactanos;
