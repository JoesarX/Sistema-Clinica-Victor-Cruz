import React from 'react';
import '../HojaDeEstilos/Contactanos.css';
import { useState, useContext, useEffect } from 'react';
import Topbar from './Topbar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faEdit, faSave, faTimes, faGear } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from '../AuthContext.js';
import text_Services from '../../Services/texto_cmdService';



const Contactanos = () => {
    /* Funciones para toggle los botones de editar*/
    const [showButtons, setShowButtons] = useState(false);

    const handleToggleButtonClick = () => {
        setShowButtons((prevShowButtons) => !prevShowButtons);
    };



    const openWhatsApp = () => {
        window.open('https://wa.me/+50433424985', '_blank');
    };

    const { userType, isLoggedIn } = useContext(AuthContext);

    const openEmail = () => {
        window.open('mailto:clinica.drvictorcruz@gmail.com', '_blank');
    };


    const [whaOBJ, setWhaOBJ] = React.useState({
        Tipo: 'WHA',
        texto_campo: ''
    })

    const [numOBJ, setNumOBJ] = React.useState({
        Tipo: 'Footer_Telefono',
        texto_campo: ''
    })

    const [correoOBJ, setCorreoOBJ] = React.useState({
        Tipo: 'Footer_Correo',
        texto_campo: ''
    })


    /* Para el Numero Telefoinico */
    const [isEditing, setIsEditing] = useState(false);
    const [phone, setPhone] = useState('+504 2230-3901');
    const [editedPhone, setEditedPhone] = useState('');

    const handleChangePhone = (event) => {
        setEditedPhone(event.target.value);
        numOBJ.texto_campo = event.target.value;
    };

    const handleEditPhone = () => {
        setIsEditing(true);
        setEditedPhone(phone);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const isValidPhone = (phone) => {
        // Regular expression to match the phone number pattern with a space after +504
        const phonePattern = /^\+504\s\d{4}-\d{4}$/;
        return phonePattern.test(phone);
    };

    const handleSavePhone = () => {
        if (isValidPhone(editedPhone)) {
            setIsEditing(false);
            text_Services.editText(numOBJ);
            window.location.reload(true);
        } else {
            // Display an error message or handle the invalid phone number case
            alert('El número telefonico no es válido. Asegúrate de que sea un número de 8 dígitos, empiece con +504, tenga un espacio después de los primeros 4 dígitos y un guión después del cuarto dígito.');
        }
    };



    /* Para el numero Movil   */
    const [isEditing1, setIsEditing1] = useState(false);
    const [whatsapp, setWhatsApp] = useState('+504 3342-4985');
    const [editedWhatsapp, setEditedWhatsapp] = useState('');


    const handleChangeWhatsapp = (event) => {
        setEditedWhatsapp(event.target.value);
        whaOBJ.texto_campo = event.target.value;
    };

    const handleEditWhatsapp = () => {
        setIsEditing1(true);
        setEditedWhatsapp(whatsapp);
    };

    const handleCancelEdit1 = () => {
        setIsEditing1(false);
    };

    const isValidWhatsApp = (whatsapp) => {
        // Regular expression to match the WhatsApp number pattern with a space after +504 and a hyphen after the first 4 digits
        const whatsappPattern = /^\+504\s\d{4}-\d{4}$/;
        return whatsappPattern.test(whatsapp);
    };

    const handleSaveWhatsapp = () => {
        if (isValidWhatsApp(editedWhatsapp)) {
            setIsEditing1(false);
            text_Services.editText(whaOBJ);
            window.location.reload(true);
        } else {
            // Display an error message or handle the invalid WhatsApp number case
            alert('El número de WhatsApp no es válido. Asegúrate de que sea un número de 8 dígitos, empiece con +504, tenga un espacio después de los primeros 4 dígitos y un guión después del cuarto dígito.');
        }
    };



    /* Para el correo electronico */
    const [isEditing2, setIsEditing2] = useState(false);
    const [email, setEmail] = useState('clinica.drvictorcruz@gmail.com');
    const [editedEmail, setEditedEmail] = useState('');


    const handleChangeEmail = (event) => {
        setEditedEmail(event.target.value);
        correoOBJ.texto_campo = event.target.value;

    };


    const handleEditEmail = () => {
        setIsEditing2(true);
        setEditedEmail(email);
    };

    const handleCancelEdit2 = () => {
        setIsEditing2(false);
    };

    const isValidEmail = (email) => {
        // Regular expression to match the email pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSaveEmail = () => {
        if (isValidEmail(editedEmail)) {
            setIsEditing2(false);
            text_Services.editText(correoOBJ);
            window.location.reload(true);
        } else {
            // Display an error message or handle the invalid email case
            alert('El correo electrónico no es válido. Asegúrate de que contenga un símbolo de arroba (@) y cumpla con los requisitos estándar de un correo electrónico válido(tener un punto al final).');
        }
    };

    /* Use Effect*/

    useEffect(() => {

        const fetchNumTelefono = async () => {
            try {
                const objectNum = ['Footer_Telefono'];
                var numData;
                numData = await text_Services.getOneText(objectNum);
                console.log("Cargar Mision: " + numData[0].texto_campo);
                setPhone(numData[0].texto_campo);
                numOBJ.texto_campo = numData[0].texto_campo;
            } catch (error) {
                console.log("Error fetching Numero de Telefono:", error);
            }
        };

        const fetchCorreo = async () => {
            try {
                const objectCorreo = ['Footer_Correo'];
                var correoData;
                correoData = await text_Services.getOneText(objectCorreo);
                console.log("Cargar Correo: " + correoData[0].texto_campo);
                setEmail(correoData[0].texto_campo);
                correoOBJ.texto_campo = correoData[0].texto_campo;
            } catch (error) {
                console.log("Error fetching Correo:", error);
            }
        };


        const fetchWhataspp = async () => {
            try {
                const objectWha = ['WHA'];
                var whaData;
                whaData = await text_Services.getOneText(objectWha);
                console.log("Cargar Whatsapp: " + whaData[0].texto_campo);
                setWhatsApp(whaData[0].texto_campo);
                whaOBJ.texto_campo = whaData[0].texto_campo;
            } catch (error) {
                console.log("Error fetching Correo:", error);
            }
        };


        fetchNumTelefono();
        fetchCorreo();
        fetchWhataspp();


    }, [isEditing, isEditing1, isEditing2]);


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
                                    onChange={handleChangePhone}
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
                                {isLoggedIn && userType !== 'normal' && showButtons && (
                                    <button onClick={handleEditPhone} style={{ marginLeft: '5px' }}>
                                        <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                    </button>
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
                                    onChange={handleChangeWhatsapp}
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
                                {isLoggedIn && userType !== 'normal' && showButtons && (
                                    <button onClick={handleEditWhatsapp} style={{ marginLeft: '5px' }}>
                                        <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                    </button>
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
                                    onChange={handleChangeEmail}
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
                                {isLoggedIn && userType !== 'normal' && showButtons && (
                                    <button onClick={handleEditEmail} style={{ marginLeft: '5px' }}>
                                        <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
            <div className='button-gearCont'>
                <button className='buttonG' onClick={handleToggleButtonClick}>
                    <FontAwesomeIcon icon={faGear} />
                </button>
            </div>
            <Footer />
        </div>
    );

};

export default Contactanos;
