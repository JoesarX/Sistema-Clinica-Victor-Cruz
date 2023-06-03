import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../HojaDeEstilos/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faRulerVertical } from '@fortawesome/free-solid-svg-icons';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const Dashboard = () => {
    const isLoggedIn = localStorage.getItem("AdminLoggedIn");
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        fullName: 'Pedro Daniel Mendoza Amador',
        numid: '0801-2000-26004',
        profilePicture: 'ruta-de-la-imagen.jpg',
        email: 'pedromendoza@gmail.com',
        dateOfBirth: '01/01/1990',
        age: '33 años',
        occupation: 'Ocupación del Paciente',
        address: 'Dirección del Paciente',
        maritalStatus: 'Estado Civil',
        medicalHistory: {
            allergies: ['Alergia 1', 'Alergia 2'],
            basicConditions: ['Enfermedad 1', 'Enfermedad 2'],
        },
        medications: ['Medicamento 1', 'Medicamento 2'],
        height: '170',
        weight: '70',
        temperature: '37.5',
        heartRate: '80',
        bloodPressure: '120/80',
        files: ['archivo1.pdf', 'archivo2.jpg', 'archivo3.pdf', 'archivo4.pdf', 'archivo5.pdf'],

        appointments: [
            {
                date: '01/06/2023',
                time: '10:00 AM',
                description: 'Descripción de la cita',
            },
            {
                date: '10/06/2023',
                time: '03:00 PM',
                description: 'Descripción de la cita',
            },
        ],
    });

    function Signout() {
        localStorage.clear();
        navigate('/');
    }

    useEffect(() => {
        //validación login
        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            navigate("/iniciarsesion"); // Redirige a la página de inicio de sesión
        }
    })

    const handleUploadFile = (event) => {
        const file = event.target.files[0];
        // Lógica para subir el archivo al servidor y actualizar el estado
        // de los archivos en el paciente
    };

    {/* Editar Button  */ }

    const [isEditingLabel, setIsEditingLabel] = useState(false);

    const handleLabelEdit = () => {
        setIsEditingLabel(true);
    };

    const handleLabelChange = (e) => {
        const { name, value } = e.target;
        setPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditingLabel(false);

    };


    return (
        <div className='contenido'>
            <div className='sidebar'>
                <div className='botones'>
                    <button className='sidebarBtn'>
                        <FontAwesomeIcon icon={faCalendarDays} style={{ color: '#CCCCCC', fontSize: '28px' }} />
                    </button>
                    <button className='sidebarBtn'>
                        <FontAwesomeIcon icon={faDollarSign} style={{ color: '#CCCCCC', fontSize: '32px' }} />
                    </button>
                    <button className='sidebarBtn'>
                        <FontAwesomeIcon icon={faUser} style={{ color: '#CCCCCC', fontSize: '28px' }} />
                    </button>
                    <button className='sidebarBtn'>
                        <FontAwesomeIcon icon={faAddressCard} style={{ color: '#CCCCCC', fontSize: '28px' }} />
                    </button>
                    <button className='sidebarBtn'>
                        <FontAwesomeIcon icon={faTable} style={{ color: '#CCCCCC', fontSize: '30px' }} />
                    </button>

                    <button class="sidebarBtn">
                        <FontAwesomeIcon icon={faGear} style={{ color: '#CCCCCC', fontSize: '30px' }} />
                    </button>
                </div>
            </div>
            <div className='topbar'>
                <div className='logo'></div>
                <div className='nomCli'>Clinica Victor Cruz</div>
                <div style={{ width: '680px' }}></div>
                <div className='line' style={{ marginRight: '18px' }}></div>
                <div className='foto' style={{ backgroundColor: '#1560F2', borderRadius: '60%', width: '42px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', top: '10px' }}>
                    <FontAwesomeIcon icon={faUser} style={{ color: '#F8F8F8', fontSize: '30px' }} />
                </div>
                <div className='doc' style={{ marginLeft: '6px' }}>Dr. Pedro Mendoza</div>
                <div className='icono'>
                    <div class="dropwdown">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">


                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" onClick={Signout}>Cerrar Sesión</a></li>

                        </ul>
                    </div>
                </div>
            </div>
            <div className='about'>
                <div className="infoGeneral">
                    <span>
                        <div className='perfil' style={{ backgroundColor: '#1560F2', borderRadius: '60%', width: '62px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-25px' }}>
                            <FontAwesomeIcon icon={faUser} style={{ color: '#F8F8F8', fontSize: '55px' }} />
                        </div>
                        <button onClick={handleLabelEdit} style={{ marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>Editar</button>
                    </span>

                    <div className='textoInfo'>
                        <div className='nombreC'>
                            <h2 className="nombre">
                                {isEditingLabel ? (
                                    <div className="inputContainer">
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={patient.fullName}
                                            onChange={handleLabelChange}
                                        />
                                    </div>
                                ) : (
                                    <p className="nombre">{patient.fullName}</p>
                                )}
                            </h2>
                        </div>
                        <div className='correo'>
                            <div className='ccon'>
                                <p className="correoText">
                                    {isEditingLabel ? (
                                        <div className="inputContainer1">
                                            <input
                                                type="text"
                                                name="email"
                                                value={patient.email}
                                                onChange={handleLabelChange}
                                            />
                                        </div>
                                    ) : (
                                        <p className="correoText">{patient.email}</p>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className='numid'>
                            <p className="smallText">
                                {isEditingLabel ? (
                                    <div className="inputContainer2">
                                        <input
                                            type="text"
                                            name="numid"
                                            value={patient.numid}
                                            onChange={handleLabelChange}
                                        />
                                    </div>
                                ) : (
                                    <p className="smallText">{patient.numid}</p>
                                )}
                            </p>
                        </div>
                        <div className='necon'>
                            <div className='nacio'>
                                <p className="smallText">{patient.dateOfBirth}</p>
                            </div>
                            <div className='edad'>
                                <p className="smallText">{patient.age}</p>
                            </div>
                        </div>
                        <div className='oecon'>
                            <div className='estado'>
                                <p className="smallText">{patient.maritalStatus}</p>
                            </div>
                            <div className='ocupacion'>
                                <p className="smallText">{patient.occupation}</p>
                            </div>

                        </div>
                        <div className='direccion'>
                            <p className="smallText">{patient.address}</p>
                        </div>
                    </div>
                </div>
                <div className="vitals">
                    <div className='titulo1'>
                        <h3 className='histmedtit'>Signos Vitales</h3>
                    </div>
                    <p style={{ color: '#75BD89' }} className="altura">
                        <span className="vitals-label">
                            <FontAwesomeIcon icon={faRulerVertical} style={{ color: '#75BD89', fontSize: '24px', marginRight: '22px' }} />
                            <span style={{ marginRight: '250px' }}>
                                Altura
                            </span>
                        </span>
                        <span className="vitals-value">
                            {isEditingLabel ? (
                                <div>
                                    <input
                                        type="text"
                                        name="height"
                                        style={{ width: '55px', display: 'inline-block'}}
                                        value={patient.height}
                                        onChange={handleLabelChange}
                                    />
                                </div>
                            ) : (
                                <span className="vitals-value">{patient.height}</span>
                            )}
                        </span> <span className="vitals-value">CM</span>
                    </p>
                    <p style={{ color: '#54648D' }} className="peso">
                        <span className="vitals-label">
                            <FontAwesomeIcon icon={faWeightScale} style={{ color: '#54648D', fontSize: '24px', marginRight: '10px' }} />
                            <span style={{ marginRight: '280px' }}>
                                Peso
                            </span>
                        </span>
                        <span className="vitals-value">
                            {isEditingLabel ? (
                                <div>
                                    <input
                                        type="text"
                                        name="weight"
                                        style={{ width: '50px', display: 'inline-block'}}
                                        value={patient.weight}
                                        onChange={handleLabelChange}
                                    />
                                </div>
                            ) : (
                                <span className="vitals-value">{patient.weight}</span>
                            )}
                        </span> <span className="vitals-value">KG</span>
                    </p>
                    <p style={{ color: '#916A9E' }} className="temperatura">
                        <span className="vitals-label">
                            <FontAwesomeIcon icon={faTemperatureLow} style={{ color: '#916A9E', fontSize: '24px', marginRight: '10px' }} />
                            <span style={{ marginRight: '190px' }}>
                                Temperatura
                            </span>
                        </span>
                        <span className="vitals-value">
                            {isEditingLabel ? (
                                <div>
                                    <input
                                        type="text"
                                        name="temperature"
                                        style={{ width: '55px', display: 'inline-block'}}
                                        value={patient.temperature}
                                        onChange={handleLabelChange}
                                    />
                                </div>
                            ) : (
                                <span className="vitals-value">{patient.temperature}</span>
                            )}
                        </span> <span className="vitals-value">°C</span>
                    </p>
                    <p style={{ color: '#AB2525' }} className="ritmo">
                        <span className="vitals-label">
                            <FontAwesomeIcon icon={faHeartPulse} style={{ color: '#AB2525', fontSize: '24px', marginRight: '10px' }} />
                            <span style={{ marginRight: '170px' }}>
                                Ritmo Cardiaco
                            </span>
                        </span>
                        <span className="vitals-value">
                            {isEditingLabel ? (
                                <div>
                                    <input
                                        type="text"
                                        name="heartRate"
                                        style={{ width: '50px', display: 'inline-block'}}
                                        value={patient.heartRate}
                                        onChange={handleLabelChange}
                                    />
                                </div>
                            ) : (
                                <span className="vitals-value">{patient.heartRate}</span>
                            )}
                        </span> <span className="vitals-value">bpm</span>
                    </p>
                    <p style={{ color: '#AB2525' }} className="presion">
                        <span className="vitals-label">
                            <FontAwesomeIcon icon={faHeartPulse} style={{ color: '#AB2525', fontSize: '24px', marginRight: '10px' }} />
                            <span style={{ width: '300px', marginRight: '10px' }}>
                                Presión Arterial
                            </span>
                        </span>
                        <span className="vitals-value">
                            {isEditingLabel ? (
                                <div>
                                    <input
                                        type="text"
                                        name="bloodPressure"
                                        style={{ width: '75px', display: 'inline-block'}}
                                        value={patient.bloodPressure}
                                        onChange={handleLabelChange}
                                    />
                                </div>
                            ) : (
                                <span className="vitals-value">{patient.bloodPressure}</span>
                            )}
                        </span> <span className="vitals-value">mmHg</span>
                    </p>
                </div>

                <div className="files">
                    <div className='titulo3'>
                        <h3 className='archivostit'>Archivos</h3>
                    </div>
                    <ul className="file-list">
                        {patient.files.map((file, index) => (
                            <div key={index}>
                                <li className='lifile' style={{ width: '380px' }}>{file}</li>
                                {index !== patient.files.length - 1 && <hr className='divider'></hr>}
                            </div>
                        ))}
                    </ul>
                    <div className='upload'>
                        <button className="upload-button">
                            <span>
                                <FontAwesomeIcon icon={faPlus} style={{ color: '#FFF', fontSize: '24px', marginRight: '20px' }} />
                                Subir Archivo
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="medical-history">

                <div className='medHis'>
                    <div className='titulo2'>
                        <h3 className='histmedtit'>Historial Médico</h3>
                    </div>
                    <div className="alergias">
                        <p className="section-label">Alergias:</p>
                        <ul className="section-value">
                            {patient.medicalHistory.allergies.map((allergy, index) => (
                                <li key={index}>{allergy}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="enfermedades">
                        <p className="section-label">Enfermedades Base:</p>
                        <ul className="section-value">
                            {patient.medicalHistory.basicConditions.map((condition, index) => (
                                <li key={index}>{condition}</li>
                            ))}
                        </ul>
                    </div>

                </div>
                <div className='medicamentos'>
                    <div className='titulo4'>
                        <h3 className='medtit'>Medicamentos actuales</h3>
                        <ul className="section-value">
                            {['Medicamento 1', 'Medicamento 2'].map((medication, index) => (
                                <li key={index}>{medication}</li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>



        </div >

    );
};

export default Dashboard;
