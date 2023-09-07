import React, { useState, useEffect, useContext } from 'react';
import '../HojaDeEstilos/SaludOcupacional.css';
import { useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import Footer from './Footer';
import { AuthContext } from '../AuthContext.js';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faHouseMedicalFlag } from '@fortawesome/free-solid-svg-icons';
import Services from '../../Services/texto_cmdService';


import { faEdit, faSave, faTimes, faGear, faCog } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';



const SaludOcupacional = () => {

    const [showButtons, setShowButtons] = useState(false);

    const handleToggleButtonClick = () => {
        setShowButtons((prevShowButtons) => !prevShowButtons);
    };

    const { userType, isLoggedIn } = useContext(AuthContext);


    const [tituloSaludOcupacional, setTituloSaludOcupacional] = React.useState({
        Tipo: 'tituloSaludOcupacional',
        texto_campo: ''
    })
    const [textoQueEsSaludOcupacional, setTextoQueEsSaludOcupacional] = React.useState({
        Tipo: 'textoQueEsSaludOcupacional',
        texto_campo: ''
    })
    const [porqueImporta, setPorqueImporta] = React.useState({
        Tipo: 'porqueImporta',
        texto_campo: ''
    })

    const [textoPorqueImporta, setTextoPorqueImporta] = React.useState({
        Tipo: 'textoPorqueImporta',
        texto_campo: ''
    })

    const [subTituloSaludOcupacional, setSubTituloSaludOcupacional] = React.useState({
        Tipo: 'subTituloSaludOcupacional',
        texto_campo: ''
    })

    const [tituloItem1SaludOcupacional, setTituloItem1SaludOcupacional] = React.useState({
        Tipo: 'tituloItem1SaludOcupacional',
        texto_campo: ''
    })

    const [tituloItem2SaludOcupacional, setTituloItem2SaludOcupacional] = React.useState({
        Tipo: 'tituloItem2SaludOcupacional',
        texto_campo: ''
    })
    const [tituloItem3SaludOcupacional, setTituloItem3SaludOcupacional] = React.useState({
        Tipo: 'tituloItem3SaludOcupacional',
        texto_campo: ''
    })

    const [textoItem1SaludOcupacional, setTextoItem1SaludOcupacional] = React.useState({
        Tipo: 'textoItem1SaludOcupacional',
        texto_campo: ''
    })
    const [textoItem2SaludOcupacional, setTextoItem2SaludOcupacional] = React.useState({
        Tipo: 'textoItem2SaludOcupacional',
        texto_campo: ''
    })
    const [textoItem3SaludOcupacional, setTextoItem3SaludOcupacional] = React.useState({
        Tipo: 'textoItem3SaludOcupacional',
        texto_campo: ''
    })

    const [isFetching, setIsFetching] = useState(true);



    const navigate = useNavigate();


    const handleContactUsClick = () => {
        navigate('/contactanos');
    };




    useEffect(() => {
        if (isFetching) {
            const FetchCargarInfo = async () => {
                try {
                    console.log("Hola");
                    var info = await Services.getSaludOcupacional();     
                    setSubTituloSaludOcupacional({ ...subTituloSaludOcupacional, texto_campo: info[4].texto_campo });
                } catch (error) {
                    console.log("Error fetching info");
                }
            }
            FetchCargarInfo();
            setIsFetching(false);
        }
    }, []);



    /*  Todo para editar Salud Ocupacional */



    const [editAll, setEditAll] = useState(false);
    const [editAll2, setEditAll2] = useState(false);

    /* P*/

    const Parte1Component = ({ title, description, isEditMode, TipoTitulo, TipoDesc }) => {
        const [editable, setEditable] = useState(false);
        const [editedTitle, setEditedTitle] = useState(title);
        const [editedDescription, setEditedDescription] = useState(description);
        const MAX_TITLE_LENGTH = 25;
        const MAX_DESC_LENGTH = 400;

        const handleEditToggle = () => {
            setEditable(!editable);
        };

        const handleSave = async () => {
            // Remove extra spaces at the end of title and description
            const TituloOriginal = TipoTitulo.texto_campo;
            const trimmedTitle = editedTitle.trim();
            const trimmedDescription = editedDescription.trim();

           // Validaciones
           if (trimmedTitle === "") {
            swal("¡Error! El título no puede quedar en blanco.", {
                icon: "error",
            });
            return;
        }

        if (trimmedDescription === "") {
            swal("¡Error! La descripcion no puede quedar en blanco.", {
                icon: "error",
            });
            return;
        }


        // Check if the description ends with a period
        if (trimmedDescription.charAt(trimmedDescription.length - 1) !== ".") {
            swal("¡Error! La descripción debe terminar con un punto.", {
                icon: "error",
            });
            return;
        }

        // Check if title starts with an uppercase letter and is within 25 characters
        if (
            trimmedTitle.length > 35
        ) {

            swal("Asegúrate de que el título inicie con mayúscula y que no exceda los 35 caracteres.", {
                icon: "error",
            });
            return;
        }

        // Check if there are more than one consecutive spaces in title or description
        if (/\s{2,}/.test(trimmedTitle) || /\s{2,}/.test(trimmedDescription)) {

            swal("Error, No se permiten más de un espacio consecutivo en el texto.", {
                icon: "error",
            });
            return;
        }

        // Check if the description has more than 80 characters
        if (trimmedDescription.length > 350) {
            swal("Error, La descripción no puede exceder los 350 caracteres.", {
                icon: "error",
            });
            return;
        }
           
            console.log("Este es el titulo:" + TipoTitulo.texto_campo);

            TipoTitulo.texto_campo = trimmedTitle;

            console.log("Este es el titulo original:" + TituloOriginal);
            await Services.editText(TipoTitulo);
            TipoDesc.texto_campo = trimmedDescription;
            await Services.editText(TipoDesc);

            setEditable(false);
            setEditedTitle(trimmedTitle);
            setEditedDescription(trimmedDescription);
        };

        const handleCancel = () => {
            setEditable(false);
            setEditedTitle(title);
            setEditedDescription(description);
        };

        const handleTitleChange = (e) => {
            // Capitalize the first letter of the title
            const value = e.target.value;

            // Validación de longitud máxima del título
            if (value.length > MAX_TITLE_LENGTH) {
                return; // No se permite escribir más allá de la longitud máxima
            }
        
            // Capitalize la primera letra de la palabra
            if (value.length === 0) {
                setEditedTitle(value);
            } else {
                setEditedTitle(value.charAt(0).toUpperCase() + value.slice(1));
            }

        };

        const handleDescriptionChange = (e) => {
            // Capitalize the first letter of the description
            const value = e.target.value;
            
            if (value.length > MAX_DESC_LENGTH) {
                return; // No se permite escribir más allá de la longitud máxima
            }
            
            if (value.length === 0) {
                setEditedDescription(value);
            } else {
                setEditedDescription(value.charAt(0).toUpperCase() + value.slice(1));
            }
        };

        useEffect(() => {
            if (isFetching) {
                const FetchCargarInfo = async () => {
                    try {
                        console.log("Hola");
                        var info = await Services.getSaludOcupacional();
                        setTituloSaludOcupacional({ ...tituloSaludOcupacional, texto_campo: info[0].texto_campo });
                        setTextoQueEsSaludOcupacional({ ...textoQueEsSaludOcupacional, texto_campo: info[1].texto_campo });
                        setPorqueImporta({ ...porqueImporta, texto_campo: info[2].texto_campo });
                        setTextoPorqueImporta({ ...textoPorqueImporta, texto_campo: info[3].texto_campo });
                    } catch (error) {
                        console.log("Error fetching info");
                    }
                }
                FetchCargarInfo();
                setIsFetching(false);
            }
        }, []);


        return (
            <div className="salud_desc-container">
                <h2 className="salud-container h2">
                    {editable ? (
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={handleTitleChange}
                            style={{
                                width: 'auto',
                                padding: '10px', maxWidth: '100%',
                            }}
                        />
                    ) : (
                        editedTitle
                    )}
                </h2>
                <p className="salud-container p">
                    {editable ? (
                        <textarea
                            value={editedDescription}
                            onChange={handleDescriptionChange}
                            rows={8}
                            cols={45}
                            style={{ width: 'auto' }}
                        />
                    ) : (
                        editedDescription
                    )}
                </p>
                {isEditMode && (
                    <div >
                        {editable ? (
                            <div >
                                <button onClick={handleSave}>
                                    <FontAwesomeIcon icon={faSave} style={{ color: '#1E60A6' }} />
                                </button>
                                <button onClick={handleCancel}>
                                    <FontAwesomeIcon icon={faTimes} style={{ color: '#1E60A6' }} />
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleEditToggle}>
                                <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    };

    /* Para la segunda parte*/


    const servicesData = [
        {
            id: 1,
            icon: faBriefcaseMedical
        },
        {
            id: 2,
            icon: faCircleExclamation
        },
        {
            id: 3,
            icon: faHouseMedicalFlag
        }
    ];

    const Parte2Component = ({ title, description, icon, isEditMode, TipoTitulo, TipoDesc }) => {
        const [editable, setEditable] = useState(false);
        const [editedTitle, setEditedTitle] = useState(title);
        const [editedDescription, setEditedDescription] = useState(description);
        const MAX_TITLE_LENGTH = 25;
        const MAX_DESC_LENGTH = 400;

        const handleEditToggle = () => {
            setEditable(!editable);
        };

        const handleSave = async () => {
            // Remove extra spaces at the end of title and description
            const TituloOriginal = TipoTitulo.texto_campo;
            const trimmedTitle = editedTitle.trim();
            const trimmedDescription = editedDescription.trim();
        
            // Validaciones
            if (trimmedTitle === "") {
                swal("¡Error! El título no puede quedar en blanco.", {
                    icon: "error",
                });
                return;
            }

            if (trimmedDescription === "") {
                swal("¡Error! La descripcion no puede quedar en blanco.", {
                    icon: "error",
                });
                return;
            }


            // Check if the description ends with a period
            if (trimmedDescription.charAt(trimmedDescription.length - 1) !== ".") {
                swal("¡Error! La descripción debe terminar con un punto.", {
                    icon: "error",
                });
                return;
            }

            // Check if title starts with an uppercase letter and is within 25 characters
            if (
                !/^[A-Z]/.test(trimmedTitle) ||
                trimmedTitle.length > 25
            ) {

                swal("Asegúrate de que el título inicie con mayúscula y que no exceda los 25 caracteres.", {
                    icon: "error",
                });
                return;
            }

            // Check if there are more than one consecutive spaces in title or description
            if (/\s{2,}/.test(trimmedTitle) || /\s{2,}/.test(trimmedDescription)) {

                swal("Error, No se permiten más de un espacio consecutivo en el texto.", {
                    icon: "error",
                });
                return;
            }

            // Check if the description has more than 80 characters
            if (trimmedDescription.length > 400) {
                swal("Error, La descripción no puede exceder los 400 caracteres.", {
                    icon: "error",
                });
                return;
            }
        
            console.log("Este es el titulo:" + TipoTitulo.texto_campo);
        
            TipoTitulo.texto_campo = trimmedTitle;
        
            console.log("Este es el titulo original:" + TituloOriginal);
            await Services.editText(TipoTitulo);
            TipoDesc.texto_campo = trimmedDescription;
            await Services.editText(TipoDesc);
        
            setEditable(false);
            setEditedTitle(trimmedTitle);
            setEditedDescription(trimmedDescription);
        };
        
        const handleCancel = () => {
            setEditable(false);
            setEditedTitle(title);
            setEditedDescription(description);
        };
        
        const handleTitleChange = (e) => {
            const value = e.target.value;

            // Validación de longitud máxima del título
            if (value.length > MAX_TITLE_LENGTH) {
                return; // No se permite escribir más allá de la longitud máxima
            }
        
            // Capitalize la primera letra de la palabra
            if (value.length === 0) {
                setEditedTitle(value);
            } else {
                setEditedTitle(value.charAt(0).toUpperCase() + value.slice(1));
            }
        };
        
        const handleDescriptionChange = (e) => {
            // Capitalize the first letter of the description
            const value = e.target.value;
            
            if (value.length > MAX_DESC_LENGTH) {
                return; // No se permite escribir más allá de la longitud máxima
            }

            if (value.length === 0) {
                setEditedDescription(value);
            } else {
                setEditedDescription(value.charAt(0).toUpperCase() + value.slice(1));
            }
        };
        
        

        useEffect(() => {
            if (isFetching) {
                const FetchCargarInfo = async () => {
                    try {
                        console.log("Hola");
                        var info = await Services.getSaludOcupacional();
                        setTituloItem1SaludOcupacional({ ...tituloItem1SaludOcupacional, texto_campo: info[5].texto_campo });
                        setTituloItem2SaludOcupacional({ ...tituloItem2SaludOcupacional, texto_campo: info[6].texto_campo });
                        setTituloItem3SaludOcupacional({ ...tituloItem3SaludOcupacional, texto_campo: info[7].texto_campo });
                        setTextoItem1SaludOcupacional({ ...textoItem1SaludOcupacional, texto_campo: info[8].texto_campo });
                        setTextoItem2SaludOcupacional({ ...textoItem2SaludOcupacional, texto_campo: info[9].texto_campo });
                        setTextoItem3SaludOcupacional({ ...textoItem3SaludOcupacional, texto_campo: info[10].texto_campo });
                    } catch (error) {
                        console.log("Error fetching info");
                    }
                }
                FetchCargarInfo();
                setIsFetching(false);
            }
        }, []);


        return (
            <div className="containerInfo">
                <div className='icon-container'>
                    <FontAwesomeIcon icon={icon} style={{ color: '#ffffff', fontSize: '80px' }} />
                </div>
                <h2 >
                    {editable ? (
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={handleTitleChange}
                            style={{
                                width: '130%',
                                padding: '10px', maxWidth: '100%',
                            }}
                        />
                    ) : (
                        editedTitle
                    )}
                </h2>
                <p>
                    {editable ? (
                        <textarea
                            value={editedDescription}
                            onChange={handleDescriptionChange}
                            rows={8}
                            cols={45}
                            style={{ width: '100%' }}
                        />
                    ) : (
                        editedDescription
                    )}
                </p>
                {isEditMode && (
                    <div >
                        {editable ? (
                            <div >
                                <button onClick={handleSave}>
                                    <FontAwesomeIcon icon={faSave} style={{ color: '#1E60A6' }} />
                                </button>
                                <button onClick={handleCancel}>
                                    <FontAwesomeIcon icon={faTimes} style={{ color: '#1E60A6' }} />
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleEditToggle}>
                                <FontAwesomeIcon icon={faEdit} style={{ color: '#1E60A6' }} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    };

    // Variables de estado para el título y la descripción



    return (
        <div className="scrollable-page2">
            <Topbar />
            <div className='header1'>
                SALUD OCUPACIONAL
            </div>
            <div className="empty-space-top1"></div>

            <div className="salud-container">

                <Parte1Component
                    title={tituloSaludOcupacional.texto_campo}
                    description={textoQueEsSaludOcupacional.texto_campo}
                    isEditMode={editAll}
                    TipoTitulo={tituloSaludOcupacional}
                    TipoDesc={textoQueEsSaludOcupacional}
                />
                <Parte1Component
                    title={porqueImporta.texto_campo}
                    description={textoPorqueImporta.texto_campo}
                    isEditMode={editAll}
                    TipoTitulo={porqueImporta}
                    TipoDesc={textoPorqueImporta}
                />
            </div>
            {isLoggedIn && userType !== 'normal' && (
                <button
                    onClick={() => setEditAll(!editAll)}
                    style={{
                        width: '50px', height: '50px', top: '20px', marginleft: '5%', backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
                    }}>
                    <FontAwesomeIcon icon={faCog} style={{ fontSize: '35px', padding: '5px', color: '#1E60A6' }} />
                </button>
            )}

            <div className='header2'>
                {subTituloSaludOcupacional.texto_campo}
            </div>


            <div class="container-wrapper">

                <Parte2Component
                    title={tituloItem1SaludOcupacional.texto_campo}
                    description={textoItem1SaludOcupacional.texto_campo}
                    icon={servicesData[0].icon}
                    isEditMode={editAll2}
                    TipoTitulo={tituloItem1SaludOcupacional}
                    TipoDesc={textoItem1SaludOcupacional}
                />

                <Parte2Component
                    title={tituloItem2SaludOcupacional.texto_campo}
                    description={textoItem2SaludOcupacional.texto_campo}
                    icon={servicesData[1].icon}
                    isEditMode={editAll2}
                    TipoTitulo={tituloItem2SaludOcupacional}
                    TipoDesc={textoItem2SaludOcupacional}
                />

                <Parte2Component
                    title={tituloItem3SaludOcupacional.texto_campo}
                    description={textoItem3SaludOcupacional.texto_campo}
                    icon={servicesData[2].icon}
                    isEditMode={editAll2}
                    TipoTitulo={tituloItem3SaludOcupacional}
                    TipoDesc={textoItem3SaludOcupacional}
                />

            </div>

            {isLoggedIn && userType !== 'normal' && (
                <button
                    onClick={() => setEditAll2(!editAll2)}
                    style={{
                        width: '50px', height: '50px', top: '20px', marginleft: '5%', backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
                    }}>
                    <FontAwesomeIcon icon={faCog} style={{ fontSize: '35px', padding: '5px', color: '#1E60A6' }} />
                </button>
            )}


            <div class="contact-button-container">
                <button class="contact-button" onClick={handleContactUsClick}>Contáctanos Aqui!</button>
            </div>
            <div className="empty-space-bottom1"></div>
            <Footer />
        </div>
    );
};

export default SaludOcupacional;
