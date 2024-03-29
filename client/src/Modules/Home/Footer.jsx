import 'bootstrap/dist/css/bootstrap.css';
import '../HojaDeEstilos/Footer.css'
import { useNavigate, } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faPhone, faEdit, faSave, faTimes, faGear } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext.js';
import text_Services from '../../Services/texto_cmdService';


import swal from 'sweetalert';

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
            swal('La dirección no es válida. Asegúrate de que contenga al menos tres comas (,) y termine con el nombre de un país (por ejemplo, "Honduras").', {
                icon: "error",
            });
           
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
            swal('El correo electrónico no es válido. Asegúrate de que contenga un símbolo de arroba (@) y cumpla con los requisitos estándar de un correo electrónico válido(tener un punto al final).', {
                icon: "error",
            });
            
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
            swal('El número de teléfono no es válido. Asegúrate de que empiece con +504, tenga 8 dígitos y después de los primeros 4 dígitos vaya un guion y luego el resto de los dígitos.'    , {
                icon: "error",
            });
           
        }
    };


    /* para el copyright */

    const [year, setYear] = useState('© 2023 Clínica Dr. Víctor Cruz');
    const [editedText, setEditedText] = useState('');
    const [isEditing3, setIsEditing3] = useState(false);

    const handleChangeText = (event) => {
        setEditedText(event.target.value);
        copyOBJ.texto_campo = event.target.value;

    };

    const handleEditYear = () => {
        setIsEditing3(true);
        setEditedText(year); // Set the current selected text as the initial value for editing
    };

    const handleCancelEdit3 = () => {
        setIsEditing3(false);
    };

    const handleSaveText = async () => {
        if (!editedText.trim()) {
            swal("Error, el texto no puede estar en blanco", {
                icon: "error",
            });
            return; // Exit the function if text is blank
        }
        
        setIsEditing3(false);
        setYear(editedText); // Update the selected text after saving
        await text_Services.editText(copyOBJ);
        window.location.reload(true);
    };



    useEffect(() => {
        const fetchFooter = async () => {
            try {
                var footer= await text_Services.getFooter();
                setAddress(footer[0].texto_campo);
                direccionOBJ.texto_campo=footer[0].texto_campo;
               

                setEmail(footer[1].texto_campo);
                correoOBJ.texto_campo = footer[1].texto_campo;
               
                setPhone(footer[2].texto_campo);
                numOBJ.texto_campo = footer[2].texto_campo;
               
                setYear(footer[3].texto_campo);
                copyOBJ.texto_campo = footer[3].texto_campo;

                // var direccionData;
                // direccionData = await text_Services.getOneText(objectDireccion);
                // 
                // setAddress(direccionData[0].texto_campo);
                // direccionOBJ.texto_campo = direccionData[0].texto_campo;
            } catch (error) {
                
            }
        };

        // const fetchCorreo = async () => {
        //     try {
        //         const objectCorreo = ['Footer_Correo'];
        //         var correoData;
        //         correoData = await text_Services.getOneText(objectCorreo);
        //         
        //         setEmail(correoData[0].texto_campo);
        //         correoOBJ.texto_campo = correoData[0].texto_campo;
        //     } catch (error) {
        //         
        //     }
        // };


        // const fetchNumTelefono = async () => {
        //     try {
        //         const objectNum = ['Footer_Telefono'];
        //         var numData;
        //         numData = await text_Services.getOneText(objectNum);
        //         
        //         setPhone(numData[0].texto_campo);
        //         numOBJ.texto_campo = numData[0].texto_campo;
        //     } catch (error) {
        //         
        //     }
        // };


        // const fetchCopyright = async () => {
        //     try {
        //         const objectCopy = ['copyright'];
        //         var copyData;
        //         copyData = await text_Services.getOneText(objectCopy);
        //         
        //         setYear(copyData[0].texto_campo);
        //         copyOBJ.texto_campo = copyData[0].texto_campo;
        //     } catch (error) {
        //         
        //     }
        // };




        fetchFooter();
        // fetchCorreo();
        // fetchNumTelefono();
        // fetchCopyright();


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
                        <FontAwesomeIcon icon={faPhone} />
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
                        <FontAwesomeIcon icon={faEnvelope} />
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
                            value={editedText}
                            onChange={handleChangeText}
                            style={{ color: '#1E60A6', fontWeight: 'bold' }}
                        />
                        <button onClick={handleSaveText}>
                            <FontAwesomeIcon icon={faSave} style={{ color: '#1E60A6' }} />
                        </button>
                        <button onClick={handleCancelEdit3}>
                            <FontAwesomeIcon icon={faTimes} style={{ color: '#1E60A6' }} />
                        </button>
                    </>
                ) : (
                    <>
                        <span onClick={handleEditYear} style={{ cursor: 'pointer' }}>
                            {year}
                        </span>
                        {isLoggedIn && userType !== 'normal' && showButtons && (
                            <button onClick={handleEditYear}>
                                <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                            </button>
                        )}
                    </>
                )}
            </div>
            {isLoggedIn && userType !== 'normal' && (
                <button className='buttonG' onClick={handleToggleButtonClick}>
                <FontAwesomeIcon icon={faGear} />
            </button>
            )}
        </footer>
    );

};

export default Topbar;