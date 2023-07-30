import 'bootstrap/dist/css/bootstrap.css';
import '../HojaDeEstilos/Footer.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faPhone, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext.js';



const Topbar = () => {

    const navigate = useNavigate();

    const { userType, isLoggedIn } = useContext(AuthContext);


    /* Para el La Direccion */
    const [address, setAddress] = useState('Colonia Kennedy, Tegucigalpa, M.D.C, Honduras');
    const [editedAddress, setEditedAddress] = useState('Colonia Kennedy, Tegucigalpa, M.D.C, Honduras');
    const [isEditing, setIsEditing] = useState(false);

    const handleEditAddress = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedAddress(address);
    };

    const isValidAddress = (address) => {
        // Basic validation: Check if the address contains at least three commas and ends with a country name
        const commaCount = (address.match(/,/g) || []).length;
        return commaCount >= 3 && address.trim().endsWith('Honduras');
    };

    const handleSaveAddress = () => {
        if (isValidAddress(editedAddress)) {
            setAddress(editedAddress);
            setIsEditing(false);
        } else {
            // Display an error message or handle the invalid address case
            alert('La dirección no es válida. Asegúrate de que contenga al menos tres comas (,) y termine con el nombre de un país (por ejemplo, "Honduras").');
        }
    };

    /* Para el correo electronico */

    const [email, setEmail] = useState('clinica.drvictorcruz@gmail.com');
    const [editedEmail, setEditedEmail] = useState('clinica.drvictorcruz@gmail.com');
    const [isEditing1, setIsEditing1] = useState(false);

    const handleEditEmail = () => {
        setIsEditing1(true);
    };

    const handleCancelEdit1 = () => {
        setIsEditing1(false);
        setEditedEmail(email);
    };

    const isValidEmail = (email) => {
        // Basic validation: Check if the email contains an @ symbol and meets general email format standards
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSaveEmail = () => {
        if (isValidEmail(editedEmail)) {
            setEmail(editedEmail);
            setIsEditing1(false);
        } else {
            // Display an error message or handle the invalid email case
            alert('El correo electrónico no es válido. Asegúrate de que contenga un símbolo de arroba (@) y cumpla con los requisitos básicos de un correo electrónico válido.');
        }
    };

    /* Para el numero telefonico*/

    const [phone, setPhone] = useState('+504 2230-3901');
    const [editedPhone, setEditedPhone] = useState('+504 2230-3901');
    const [isEditing2, setIsEditing2] = useState(false);

    const handleEditPhone = () => {
        setIsEditing2(true);
    };

    const handleCancelEdit2 = () => {
        setIsEditing2(false);
        setEditedPhone(phone);
    };

    const isValidPhone = (phone) => {
        // Regular expression to match the phone number pattern: +504, 4 digits, hyphen, 4 digits
        const phonePattern = /^\+504\s\d{4}-\d{4}$/;
        return phonePattern.test(phone);
    };

    const handleSavePhone = () => {
        if (isValidPhone(editedPhone)) {
            setPhone(editedPhone);
            setIsEditing2(false);
        } else {
            // Display an error message or handle the invalid phone number case
            alert('El número de teléfono no es válido. Asegúrate de que empiece con +504, tenga 8 dígitos y después de los primeros 4 dígitos vaya un guion y luego el resto de los dígitos.');
        }
    };


    /* para el copyright */

    const [year, setYear] = useState(String(new Date().getFullYear()));
    const [editedYear, setEditedYear] = useState(String(new Date().getFullYear()));
    const [isEditing3, setIsEditing3] = useState(false);

    const handleEditYear = () => {
        setIsEditing3(true);
    };

    const handleCancelEdit3 = () => {
        setIsEditing3(false);
        setEditedYear(year);
    };

    const isValidYearFormat = (year) => {
        // Regular expression to match a valid year in four digits (1900 to 9999)
        const yearPattern = /^(19[0-9][0-9]|20[0-9][0-9]|9999)$/;
        return yearPattern.test(year);
    };

    const handleSaveYear = () => {
        if (isValidYearFormat(editedYear)) {
            setYear(editedYear);
            setIsEditing3(false);
        } else {
            // Display an error message or handle the invalid year case
            alert('El año ingresado no es válido. Asegúrate de que sea un año válido en cuatro dígitos.');
        }
    };




    return (
        <footer class="text-center text-lg-start custom-colors custom-footer">
            <section class="d-flex justify-content-between py-2 px-0 border-bottom footer-info">
                <div class="row justify-content-md-center footer-info mb-2">
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto text-center">
                        <FontAwesomeIcon icon={faHome} />
                        <div className="spacing" />
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    value={editedAddress}
                                    onChange={(e) => setEditedAddress(e.target.value)}
                                    style={{ color: '#1E60A6', fontWeight: 'bold' }}
                                />
                                <button onClick={handleSaveAddress}>
                                    <FontAwesomeIcon icon={faSave} style={{ color: '#1E60A6' }} />
                                </button>
                                <button onClick={handleCancelEdit}>
                                    <FontAwesomeIcon icon={faTimes} style={{ color: '#1E60A6' }} />
                                </button>
                            </>
                        ) : (
                            <>
                                <div>{address}</div>
                                {isLoggedIn && userType !== 'normal' && (
                                    <div>
                                        <button onClick={handleEditAddress}>
                                            <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto text-center">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <div className="spacing" />
                        {isEditing1 ? (
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
                                <button onClick={handleCancelEdit1}>
                                    <FontAwesomeIcon icon={faTimes} style={{ color: '#1E60A6' }} />
                                </button>
                            </>
                        ) : (
                            <>
                                <div>{email}</div>
                                {isLoggedIn && userType !== 'normal' && (
                                    <div>
                                        <button onClick={handleEditEmail}>
                                            <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto text-center">
                        <FontAwesomeIcon icon={faPhone} />
                        <div className="spacing" />
                        {isEditing2 ? (
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
                                <button onClick={handleCancelEdit2}>
                                    <FontAwesomeIcon icon={faTimes} style={{ color: '#1E60A6' }} />
                                </button>
                            </>
                        ) : (
                            <>
                                <div>{phone}</div>
                                {isLoggedIn && userType !== 'normal' && (
                                    <div>
                                        <button onClick={handleEditPhone}>
                                            <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
            <div className="py-2 px-4 smalltext-copyright">
                {isEditing3 ? (
                    <>
                        <input
                            type="text"
                            value={editedYear}
                            onChange={(e) => setEditedYear(e.target.value)}
                            style={{ color: '#1E60A6', fontWeight: 'bold' }}
                        />
                        <button onClick={handleSaveYear}>
                            <FontAwesomeIcon icon={faSave} style={{ color: '#1E60A6' }} />
                        </button>
                        <button onClick={handleCancelEdit3}>
                            <FontAwesomeIcon icon={faTimes} style={{ color: '#1E60A6' }} />
                        </button>
                    </>
                ) : (
                    <>
                        <span onClick={handleEditYear} style={{ cursor: 'pointer' }}>
                            © {year} Clínica Dr. Víctor Cruz
                        </span>
                        {isLoggedIn && userType !== 'normal' && (
                            <div>
                                <button onClick={handleEditYear}>
                                    <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </footer>
    );

};

export default Topbar;