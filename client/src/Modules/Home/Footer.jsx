import 'bootstrap/dist/css/bootstrap.css';
import '../HojaDeEstilos/Footer.css'
import { useNavigate, } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faPhone, faEdit, faSave, faTimes, faGear } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext.js';
import text_Services from '../../Services/texto_cmdService';


const Topbar = () => {

    /* Funciones para toggle los botones de editar*/
    const [showButtons, setShowButtons] = useState(false);

    const handleToggleButtonClick = () => {
        setShowButtons((prevShowButtons) => !prevShowButtons);
    };

    const [direccionOBJ, setDireccionOBJ] = React.useState({
        Tipo: 'Footer_Dirección',
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


    const [copyOBJ, setcopyOBJ] = React.useState({
        Tipo: 'copyright',
        texto_campo: ''
    })





    const navigate = useNavigate();

    const { userType, isLoggedIn } = useContext(AuthContext);


    /* Para el La Direccion */
    const [address, setAddress] = useState('Colonia Kennedy, Tegucigalpa, M.D.C, Honduras');
    const [editedAddress, setEditedAddress] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleChangeAdress = (event) => {
        setEditedAddress(event.target.value);
        direccionOBJ.texto_campo = event.target.value;

    };

    const handleEditAddress = () => {
        setIsEditing(true);
        setEditedAddress(address);
    };


    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const isValidAddress = (address) => {
        // Basic validation: Check if the address contains at least three commas and ends with a country name
        const commaCount = (address.match(/,/g) || []).length;
        return commaCount >= 3 && address.trim().endsWith('Honduras');
    };

    const handleSaveAddress = async () => {
        if (isValidAddress(editedAddress)) {
            setIsEditing(false);
           await text_Services.editText(direccionOBJ);
            window.location.reload(true);
        } else {
            // Display an error message or handle the invalid address case
            alert('La dirección no es válida. Asegúrate de que contenga al menos tres comas (,) y termine con el nombre de un país (por ejemplo, "Honduras").');
        }
    };







    /* Para el correo electronico */

    const [email, setEmail] = useState('clinica.drvictorcruz@gmail.com');
    const [editedEmail, setEditedEmail] = useState('');
    const [isEditing1, setIsEditing1] = useState(false);




    const handleChangeEmail = (event) => {
        setEditedEmail(event.target.value);
        correoOBJ.texto_campo = event.target.value;
    };


    const handleEditEmail = () => {
        setIsEditing1(true);
        setEditedEmail(email);
    };

    const handleCancelEdit1 = () => {
        setIsEditing1(false);
    };

    const isValidEmail = (email) => {
        // Basic validation: Check if the email contains an @ symbol and meets general email format standards
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSaveEmail = async () => {
        if (isValidEmail(editedEmail)) {
            setIsEditing1(false);
           await text_Services.editText(correoOBJ);
            window.location.reload(true);
        } else {
            // Display an error message or handle the invalid email case
            alert('El correo electrónico no es válido. Asegúrate de que contenga un símbolo de arroba (@) y cumpla con los requisitos básicos de un correo electrónico válido.');
        }
    };

    /* Para el numero telefonico*/

    const [phone, setPhone] = useState('+504 2230-3901');
    const [editedPhone, setEditedPhone] = useState('');
    const [isEditing2, setIsEditing2] = useState(false);

    const handleChangePhone = (event) => {
        setEditedPhone(event.target.value);
        numOBJ.texto_campo = event.target.value;
    };

    const handleEditPhone = () => {
        setIsEditing2(true);
        setEditedPhone(phone);
    };

    const handleCancelEdit2 = () => {
        setIsEditing2(false);

    };

    const isValidPhone = (phone) => {
        // Regular expression to match the phone number pattern: +504, 4 digits, hyphen, 4 digits
        const phonePattern = /^\+504\s\d{4}-\d{4}$/;
        return phonePattern.test(phone);
    };

    const handleSavePhone = async () => {
        if (isValidPhone(editedPhone)) {
            setIsEditing2(false);
            await text_Services.editText(numOBJ);
            window.location.reload(true);
        } else {
            // Display an error message or handle the invalid phone number case
            alert('El número de teléfono no es válido. Asegúrate de que empiece con +504, tenga 8 dígitos y después de los primeros 4 dígitos vaya un guion y luego el resto de los dígitos.');
        }
    };


    /* para el copyright */

    const [year, setYear] = useState(String(new Date().getFullYear()));
    const [editedYear, setEditedYear] = useState('');
    const [isEditing3, setIsEditing3] = useState(false);




    const handleChangeYear = (event) => {
        setEditedYear(event.target.value);
        copyOBJ.texto_campo = event.target.value;

    };


    const handleEditYear = () => {
        setIsEditing3(true);
        setEditedYear(year);
    };

    const handleCancelEdit3 = () => {
        setIsEditing3(false);
    };

    const isValidYearFormat = (year) => {
        // Regular expression to match a valid year in four digits (1900 to 9999)
        const yearPattern = /^(19[0-9][0-9]|20[0-9][0-9]|9999)$/;
        return yearPattern.test(year);
    };

    const handleSaveYear = async() => {
        if (isValidYearFormat(editedYear)) {
            setIsEditing3(false);
           await text_Services.editText(copyOBJ);
            window.location.reload(true);
        } else {
            // Display an error message or handle the invalid year case
            alert('El año ingresado no es válido. Asegúrate de que sea un año válido en cuatro dígitos.');
        }
    };




    useEffect(() => {
        const fetchDireccion = async () => {
            try {
                const objectDireccion = ['Footer_Dirección'];
                var direccionData;
                direccionData = await text_Services.getOneText(objectDireccion);
                console.log("Cargar Direccion: " + direccionData[0].texto_campo);
                setAddress(direccionData[0].texto_campo);
                direccionOBJ.texto_campo = direccionData[0].texto_campo;
            } catch (error) {
                console.log("Error fetching Direccion:", error);
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


        const fetchNumTelefono = async () => {
            try {
                const objectNum = ['Footer_Telefono'];
                var numData;
                numData = await text_Services.getOneText(objectNum);
                console.log("Cargar Numero Telefonico: " + numData[0].texto_campo);
                setPhone(numData[0].texto_campo);
                numOBJ.texto_campo = numData[0].texto_campo;
            } catch (error) {
                console.log("Error fetching Numero de Telefono:", error);
            }
        };


        const fetchCopyright = async () => {
            try {
                const objectCopy = ['copyright'];
                var copyData;
                copyData = await text_Services.getOneText(objectCopy);
                console.log("Cargar Copyright: " + copyData[0].texto_campo);
                setYear(copyData[0].texto_campo);
                objectCopy.texto_campo = copyData[0].texto_campo;
            } catch (error) {
                console.log("Error fetching Copyright:", error);
            }
        };




        fetchDireccion();
        fetchCorreo();
        fetchNumTelefono();
        fetchCopyright();


    }, [isEditing, isEditing1, isEditing2, isEditing3]);


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
                                    onChange={handleChangeAdress}
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
                                {isLoggedIn && userType !== 'normal' && showButtons && (
                                    <button onClick={handleEditAddress}>
                                        <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                    </button>
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
                                    onChange={handleChangeEmail}
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
                                {isLoggedIn && userType !== 'normal' && showButtons && (
                                    <button onClick={handleEditEmail}>
                                        <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                    </button>
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
                                    onChange={handleChangePhone}
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
                                {isLoggedIn && userType !== 'normal' && showButtons && (
                                    <button onClick={handleEditPhone}>
                                        <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                                    </button>
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
                            onChange={handleChangeYear}
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
                        {isLoggedIn && userType !== 'normal' && showButtons && (
                            <button onClick={handleEditYear}>
                                <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                            </button>
                        )}
                    </>
                )}
            </div>
            <div className='button-gearCont'>
                <button className='buttonG' onClick={handleToggleButtonClick}>
                    <FontAwesomeIcon icon={faGear} />
                </button>
            </div>
        </footer>
    );

};

export default Topbar;