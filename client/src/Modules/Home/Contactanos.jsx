import React from 'react';
import '../HojaDeEstilos/Contactanos.css';
import { useState } from 'react';
import Topbar from './Topbar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faGoogle } from '@fortawesome/free-brands-svg-icons';


const Contactanos = () => {
    const openWhatsApp = () => {
        window.open('https://wa.me/+50433424985', '_blank');
    };

    const openEmail = () => {
        window.open('mailto:clinica.drvictorcruz@gmail.com', '_blank');
    };


    /* Para el Numero Telefoinico */
    const [phone, setPhone] = useState('+504 2230-3901');
    const [isEditing, setIsEditing] = useState(false);
    const [editedPhone, setEditedPhone] = useState('');

    const handleEditPhone = () => {
        setEditedPhone(phone); // Initialize the edited value with the current value
        setIsEditing(true);
    };

    const handleSavePhone = () => {
        setPhone(editedPhone); // Save the edited value
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };


    /* Para el numero Movil   */
    const [whatsapp, setWhatsapp] = useState('+504 3342-4985');
    const [isEditing1, setIsEditing1] = useState(false);
    const [editedWhatsapp, setEditedWhatsapp] = useState('');

    const handleEditWhatsapp = () => {
        setEditedWhatsapp(whatsapp); // Initialize the edited value with the current value
        setIsEditing1(true);
    };

    const handleSaveWhatsapp = () => {
        setWhatsapp(editedWhatsapp); // Save the edited value
        setIsEditing1(false);
    };

    const handleCancelEdit1 = () => {
        setIsEditing1(false);
    };



    /* Para el correo electronico */
    const [email, setEmail] = useState('clinica.drvictorcruz@gmail.com');
    const [isEditing2, setIsEditing2] = useState(false);
    const [editedEmail, setEditedEmail] = useState('');

    const handleEditEmail = () => {
        setEditedEmail(email); // Initialize the edited value with the current value
        setIsEditing2(true);
    };

    const handleSaveEmail = () => {
        setEmail(editedEmail); // Save the edited value
        setIsEditing2(false);
    };

    const handleCancelEdit2 = () => {
        setIsEditing2(false);
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
                                <button onClick={handleEditPhone} style={{ marginLeft: '5px' }}>
                                    <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                </button>
                            </>
                        )}
                    </div>
                    <div className="box" >
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
                                <span onClick={openWhatsApp} style={{ color: '#1E60A6', fontWeight: 'bold' }}>{whatsapp}</span>
                                <button onClick={handleEditWhatsapp} style={{ marginLeft: '5px' }}>
                                    <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                </button>
                            </>
                        )}
                    </div>
                    <div className="box" >
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
                                <span onClick={openEmail} style={{ color: '#1E60A6', fontWeight: 'bold' }}>{email}</span>
                                <button onClick={handleEditEmail} style={{ marginLeft: '5px' }}>
                                    <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                </button>
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
