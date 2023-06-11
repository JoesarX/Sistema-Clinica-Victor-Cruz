import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../HojaDeEstilos/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faRulerVertical } from '@fortawesome/free-solid-svg-icons';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EditExpedienteDashboardModal from './EditExpedienteDashboardModal.jsx';
import NavBar from '../NavBar';

import ExpedientesService from '../../Services/ExpedientesService';


const Dashboard = () => {
    const isLoggedIn = localStorage.getItem("AdminLoggedIn");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [expedientes, setExpedientes] = useState([]);
    const [selectedExpediente, setSelectedExpediente] = useState(null);
    const navigate = useNavigate();

    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);

    const [patient, setPatient] = useState({
        nombre: '',
        edad: '',
        fecha_nacimiento: '',
        sexo: '',
        correo: '',
        telefono: '',
        numid: '',
        estado_civil: '',
        padecimientos: '',
        ocupacion: '',
        address: '',

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

    const [medications, setMedications] = useState(['Medicamento 1', 'Medicamento 2', 'Medicamento 3', 'Medicamento 4', 'Medicamento 5', 'Medicamento 6', 'Medicamento 7', 'Medicamento 8', 'Medicamento 9', 'Medicamento 10', 'Medicamento 11', 'Medicamento 12']);
    const [alergias, setAlergias] = useState(['Alergia 1', 'Alergia 2', 'Alergia 3', 'Alergia 4', 'Alergia 5', 'Alergia 6', 'Alergia 7', 'Alergia 8', 'Alergia 9', 'Alergia 10', 'Alergia 11', 'Alergia 12', 'Alergia 13', 'Alergia 14']);
    const [enfermedades, setEnfermadades] = useState(['Enfermedad 1', 'Enfermedad 2', 'Enfermedad 1', 'Enfermedad 2', 'Enfermedad 1', 'Enfermedad 2', 'Enfermedad 1', 'Enfermedad 2', 'Enfermedad 1', 'Enfermedad 2', 'Enfermedad 1', 'Enfermedad 2']);

    function Signout() {
        localStorage.clear();
        navigate('/');
    }

    function enviar_A_Crud() {
        navigate('/administrador');
    }

    useEffect(() => {
        //validación login
        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            navigate("/iniciarsesion"); // Redirige a la página de inicio de sesión
        }

        const fetchExpediente = async () => {
            try {
                const expedienteData = await ExpedientesService.getOneExpedienteDashboard(id);
                console.log(expedienteData);

                setPatient(prevPatient => ({
                    ...prevPatient,
                    nombre: expedienteData.nombre,
                    edad: expedienteData.edad,
                    fecha_nacimiento: expedienteData.fecha_nacimiento,
                    sexo: expedienteData.sexo === 'M' ? 'Masculino' : 'Femenino',
                    correo: expedienteData.correo,
                    telefono: expedienteData.telefono,
                    numid: expedienteData.numid,
                    estado_civil: expedienteData.estado_civil,
                    padecimientos: expedienteData.padecimientos,
                    ocupacion: expedienteData.ocupacion,
                    direccion: expedienteData.direccion
                }));
            } catch (error) {
                console.log(error);
            }
        };

        fetchExpediente();
    }, [id]);

    const handleUploadFile = (event) => {
        const file = event.target.files[0];
        // Lógica para subir el archivo al servidor y actualizar el estado
        // de los archivos en el paciente
    };

    {/* Editar Button  */ }

    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [isChangesSaved, setIsChangesSaved] = useState(false);

    const [isEditingLabel2, setIsEditingLabel2] = useState(false);
    const [isChangesSaved2, setIsChangesSaved2] = useState(false);

    const [isEditingLabel3, setIsEditingLabel3] = useState(false);
    const [isChangesSaved3, setIsChangesSaved3] = useState(false);


    const handleLabelEdit = () => {
        setIsEditingLabel(true);
        setIsChangesSaved(false);
    };

    const handleLabelEdit2 = () => {
        setIsEditingLabel2(true);
        setIsChangesSaved2(false);
    };

    const handleLabelEdit3 = () => {
        setIsEditingLabel3(true);
        setIsChangesSaved3(false);
    };

    const handleSaveChanges = () => {
        setIsEditingLabel(false);
        setIsChangesSaved(true);
    };

    const handleSaveChanges2 = () => {
        setIsEditingLabel2(false);
        setIsChangesSaved2(true);
    };

    const handleSaveChanges3 = () => {
        setIsEditingLabel3(false);
        setIsChangesSaved3(true);
    };

    const handleLabelChange = (e) => {
        const { name, value } = e.target;
        setPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
        }));
    };

    const handleMedicationChange = (index, newValue) => {
        const updatedMedications = [...medications];
        updatedMedications[index] = newValue;
        setMedications(updatedMedications);
    };

    const handleAlergiasChange = (index, newValue) => {
        const updatedAlergias = [...alergias];
        updatedAlergias[index] = newValue;
        setAlergias(updatedAlergias);
    };

    const handleEnfermedadesChange = (index, newValue) => {
        const updatedEnfermedades = [...enfermedades];
        updatedEnfermedades[index] = newValue;
        setEnfermadades(updatedEnfermedades);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditingLabel(false);
    };

    const handleOpenEditModal = (expediente) => {
        setSelectedExpediente(expediente);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setSelectedExpediente(null);
        setIsEditModalOpen(false);
    };

    return (
        <div className='scrollable-page'>
            <NavBar />
            <div className='contenido'>
                <div className='patient-section'>

                    <div className="infoGeneral">
                        <span>
                            <div className='perfil' style={{ backgroundColor: '#1560F2', borderRadius: '60%', width: '62px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-25px' }}>
                                <FontAwesomeIcon icon={faUser} style={{ color: '#F8F8F8', fontSize: '55px' }} />
                            </div>
                            <button onClick={handleOpenEditModal} style={{ marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>Editar</button>
                            {isEditModalOpen && (
                                <EditExpedienteDashboardModal
                                    onClose={handleCloseEditModal}
                                />
                            )}
                        </span>

                        <div className='textoInfo'>
                            <div className='nombreC'>
                                <h2 className="nombre"> {patient.nombre}</h2>
                            </div>
                            <div className='correo'>
                                <div className='ccon'>
                                    <p className="correoText">{patient.correo}</p>
                                </div>
                            </div>
                            <div className='numid'>
                                <p className="smallText">{patient.numid}</p>
                            </div>
                            <div className='necon'>
                                <div className='nacio'>
                                    <p className="smallText">{patient.fecha_nacimiento}</p>
                                </div>
                                <div className='edad'>
                                    <p className="smallText">{patient.edad} años</p>
                                </div>
                            </div>
                            <div className='oecon'>
                                <div className='estado'>
                                    <p className="smallText">{patient.estado_civil}</p>
                                </div>
                                <div className='ocupacion'>
                                    <p className="smallText">{patient.ocupacion}</p>
                                </div>

                            </div>
                            <div className='direccion'>
                                <p className="smallText">{patient.address}</p>
                            </div>
                        </div>
                    </div>

                    <div className="vitals">
                        <div className='box-title'>
                            <h3 className='histmedtit'>Signos Vitales
                                <span>
                                    {isEditingLabel ? (<>
                                        <button onClick={handleSaveChanges} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                            Guardar cambios
                                        </button>
                                        <button onClick={() => setIsEditingLabel(false)} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                            Cancelar
                                        </button>
                                    </>
                                    ) : (
                                        <button onClick={handleLabelEdit} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>
                                            Editar
                                        </button>
                                    )}
                                </span>
                            </h3>
                        </div>
                        <p style={{ color: '#75BD89' }} className="vital-sign-content">
                            <span className="vitals-label">
                                <FontAwesomeIcon icon={faRulerVertical} style={{ color: '#75BD89', fontSize: '24px', marginRight: '22px' }} />
                                <span
                                // style={{ marginRight: '220px' }}
                                >
                                    Altura
                                </span>
                            </span>
                            <span className='vital-sign-value-align'>
                                <span className="vitals-value">
                                    {isEditingLabel ? (
                                        <div >
                                            <input
                                                type="text"
                                                className="edit-text-box"
                                                name="height"
                                                style={{ width: '65px' }}
                                                value={patient.height}
                                                onChange={handleLabelChange}
                                            />
                                        </div>
                                    ) : (
                                        <span className="vitals-value">{patient.height}</span>
                                    )}
                                </span>
                                <span className="vitals-value">CM</span>
                            </span>
                        </p>
                        <p style={{ color: '#54648D' }} className="vital-sign-content">
                            <span className="vitals-label">
                                <FontAwesomeIcon icon={faWeightScale} style={{ color: '#54648D', fontSize: '24px', marginRight: '10px' }} />
                                <span
                                // style={{ marginRight: '280px' }}
                                >
                                    Peso
                                </span>
                            </span>
                            <span className='vital-sign-value-align'>
                                <span className="vitals-value">
                                    {isEditingLabel ? (
                                        <div >
                                            <input
                                                type="text"
                                                className="edit-text-box"
                                                name="weight"
                                                style={{ width: '55px' }}
                                                value={patient.weight}
                                                onChange={handleLabelChange}
                                            />
                                        </div>
                                    ) : (
                                        <span className="vitals-value">{patient.weight}</span>
                                    )}
                                </span>
                                <span className="vitals-value">KG</span>
                            </span>
                        </p>
                        <p style={{ color: '#916A9E' }} className="vital-sign-content">
                            <span className="vitals-label">
                                <FontAwesomeIcon icon={faTemperatureLow} style={{ color: '#916A9E', fontSize: '24px', marginRight: '10px' }} />
                                <span
                                // style={{ marginRight: '150px' }}
                                >
                                    Temperatura
                                </span>
                            </span>
                            <span className='vital-sign-value-align'>
                                <span className="vitals-value">
                                    {isEditingLabel ? (
                                        <div >
                                            <input
                                                type="text"
                                                className="edit-text-box"
                                                name="temperature"
                                                style={{ width: '65px' }}
                                                value={patient.temperature}
                                                onChange={handleLabelChange}
                                            />
                                        </div>
                                    ) : (
                                        <span className="vitals-value">{patient.temperature}</span>
                                    )}
                                </span>
                                <span className="vitals-value">ºC</span>
                            </span>
                        </p>
                        <p style={{ color: '#AB2525' }} className="vital-sign-content">
                            <span className="vitals-label">
                                <FontAwesomeIcon icon={faHeartPulse} style={{ color: '#AB2525', fontSize: '24px', marginRight: '10px' }} />
                                <span
                                // style={{ marginRight: '170px' }}
                                >
                                    Ritmo Cardiaco
                                </span>
                            </span>
                            <span className='vital-sign-value-align'>
                                <span className="vitals-value">
                                    {isEditingLabel ? (
                                        <div >
                                            <input
                                                className="edit-text-box"
                                                type="text"
                                                name="heartRate"
                                                style={{ width: '60px' }}
                                                value={patient.heartRate}
                                                onChange={handleLabelChange}
                                            />
                                        </div>
                                    ) : (
                                        <span className="vitals-value">{patient.heartRate}</span>
                                    )}
                                </span>
                                <span className="vitals-value">ppm</span>
                            </span>
                        </p>
                        <p style={{ color: '#AB2525' }} className="vital-sign-content">
                            <span className="vitals-label">
                                <FontAwesomeIcon icon={faHeartPulse} style={{ color: '#AB2525', fontSize: '24px', marginRight: '10px' }} />
                                <span
                                // style={{ width: '300px', marginRight: '10px' }}
                                >
                                    Presión Arterial
                                </span>
                            </span>
                            <span className='vital-sign-value-align'>
                                <span className="vitals-value">
                                    {isEditingLabel ? (
                                        <div>
                                            <input
                                                type="text"
                                                className="edit-text-box"
                                                name="bloodPressure"
                                                style={{ width: '80px' }}
                                                value={patient.bloodPressure}
                                                onChange={handleLabelChange}
                                            />
                                        </div>
                                    ) : (
                                        <span className="vitals-value">{patient.bloodPressure}</span>
                                    )}
                                </span>
                                <span className="vitals-value">mmHg</span>
                            </span>
                        </p>
                    </div>

                    <div className="files">
                        <div className='box-title'>
                            <h3 className='archivostit'>Archivos</h3>
                        </div>
                        <ul className="file-list">
                            {patient.files.map((file, index) => (
                                <div key={index} className='file-item-line'>
                                    <li className='lifile'>{file}</li>
                                    {index !== patient.files.length - 1 && <hr className='divider'></hr>}
                                </div>
                            ))}
                        </ul>
                        <button className="upload-button">
                            <span>
                                <FontAwesomeIcon icon={faPlus} style={{ color: '#FFF', fontSize: '24px', marginRight: '20px' }} />
                                Subir Archivo
                            </span>
                        </button>
                    </div>

                </div>

                <div className="patient-section">

                    <div className='medHis'>
                        
                        <div className='box-title'>
                            <h3 className='histmedtit'>Historial Médico
                                <span>
                                    {isEditingLabel2 ? (<>
                                        <button onClick={handleSaveChanges2} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                            Guardar cambios
                                        </button>
                                        <button onClick={() => setIsEditingLabel2(false)} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                            Cancelar
                                        </button>
                                    </>
                                    ) : (
                                        <button onClick={handleLabelEdit2} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                            Editar
                                        </button>
                                    )}
                                </span>
                            </h3>
                        </div>

                        <div className="alergias">
                            <p className="section-label">Alergias:</p>
                            <ul className="section-value">
                                {alergias.map((alergias, index) => (
                                    <li key={index}>
                                        {isEditingLabel2 ? (
                                            <input
                                                className="edit-text-box small"
                                                type="text"
                                                value={alergias}
                                                style={{ width: '98%' }}
                                                onChange={(e) => handleAlergiasChange(index, e.target.value)}
                                            />
                                        ) : (
                                            alergias
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="enfermedades">
                            <p className="section-label">Enfermedades Base:</p>
                            <ul className="section-value">
                                {enfermedades.map((enfermedades, index) => (
                                    <li key={index}>
                                        {isEditingLabel2 ? (
                                            <input
                                                className="edit-text-box small"
                                                type="text"
                                                value={enfermedades}
                                                style={{ width: '98%' }}
                                                onChange={(e) => handleEnfermedadesChange(index, e.target.value)}
                                            />
                                        ) : (
                                            enfermedades
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div className='medicamentos'>
                        <div className='box-title'>
                            <h3 className='medtit'>Medicamentos
                                <span>
                                    {isEditingLabel3 ? (<>
                                        <button onClick={handleSaveChanges3} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                            Guardar cambios
                                        </button>
                                        <button onClick={() => setIsEditingLabel3(false)} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                            Cancelar
                                        </button>
                                    </>
                                    ) : (
                                        <button onClick={handleLabelEdit3} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                            Editar
                                        </button>
                                    )}
                                </span>
                            </h3>
                        </div>
                        <ul className="section-value">
                            {medications.map((medication, index) => (
                                <li key={index}>
                                    {isEditingLabel3 ? (
                                        <input
                                            className="edit-text-box small"
                                            type="text"
                                            value={medication}
                                            style={{ width: '98%' }}
                                            onChange={(e) => handleMedicationChange(index, e.target.value)}
                                        />
                                    ) : (
                                        medication
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            </div >
        </div>

    );
};

export default Dashboard;