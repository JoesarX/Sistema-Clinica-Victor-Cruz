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




const Dashboard = () => {
    const isLoggedIn = localStorage.getItem("AdminLoggedIn");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [expedientes, setExpedientes] = useState([]);
   const [selectedExpediente, setSelectedExpediente] = useState(null);
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


    const [medications, setMedications] = useState(['Medicamento 1', 'Medicamento 2','Medicamento 1', 'Medicamento 2','Medicamento 1', 'Medicamento 2','Medicamento 1', 'Medicamento 2','Medicamento 1', 'Medicamento 2','Medicamento 1', 'Medicamento 2']);
    const [alergias, setAlergias] = useState(['Alergia 1', 'Alergia 2','Alergia 3', 'Alergia 4','Alergia 5', 'Alergia 6','Alergia 7', 'Alergia 8','Alergia 9', 'Alergia 10','Alergia 11', 'Alergia 12','Alergia 13', 'Alergia 14']);
    const [enfermedades, setEnfermadades] = useState(['Enfermedad 1', 'Enfermedad 2','Enfermedad 1', 'Enfermedad 2','Enfermedad 1', 'Enfermedad 2','Enfermedad 1', 'Enfermedad 2','Enfermedad 1', 'Enfermedad 2','Enfermedad 1', 'Enfermedad 2']);

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
    })

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
                    <button className='sidebarBtn' title="Gestionar Colaborades" onClick={enviar_A_Crud}>
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
                        <button onClick={handleOpenEditModal} style={{ marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold' }}>Editar</button>
                        {isEditModalOpen && (
                                 <EditExpedienteDashboardModal
                                 onClose={handleCloseEditModal}
                               />
                              )}
                    </span>

                    <div className='textoInfo'>
                        <div className='nombreC'>
                            <h2 className="nombre"> {patient.fullName}</h2>
                        </div>
                        <div className='correo'>
                            <div className='ccon'>
                                <p className="correoText">{patient.email}</p>
                            </div>
                        </div>
                        <div className='numid'>
                            <p className="smallText">{patient.numid}</p>
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
                        <h3 className='histmedtit'>Signos Vitales
                            <span>
                                {isEditingLabel ? (<>
                                    <button onClick={handleSaveChanges} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                        Guardar cambios
                                    </button>
                                    <button onClick={() => setIsEditingLabel(false)} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                        Cancelar
                                    </button>
                                </>
                                ) : (
                                    <button onClick={handleLabelEdit} style={{ fontSize: '15px', marginLeft: '13px', border: 'none', background: 'none', padding: '0', cursor: 'pointer', color: '#1560F2', fontWeight: 'bold', }}>
                                        Editar
                                    </button>
                                )}
                            </span>
                        </h3>
                    </div>
                    <p style={{ color: '#75BD89' }} className="altura">
                        <span className="vitals-label">
                            <FontAwesomeIcon icon={faRulerVertical} style={{ color: '#75BD89', fontSize: '24px', marginRight: '22px' }} />
                            <span 
                            // style={{ marginRight: '220px' }}
                            >
                                Altura
                            </span>
                        </span>
                        <span className="vitals-value">
                            {isEditingLabel ? (
                                <div >
                                    <input
                                        type="text"
                                        name="height"
                                        style={{width:'50px',position: 'absolute',left:'435px',top:'397px'}}
                                        value={patient.height}
                                        onChange={handleLabelChange}
                                    />
                                </div>
                            ) : (
                                <span className="vitals-value" style={{position: 'absolute',left:'460px',top:'417px'}}>{patient.height}</span>
                            )}
                        </span> <span className="vitals-value" style={{position: 'absolute',left:'490px',top:'417px'}}>CM</span>
                    </p>
                    <p style={{ color: '#54648D' }} className="peso">
                        <span className="vitals-label">
                            <FontAwesomeIcon icon={faWeightScale} style={{ color: '#54648D', fontSize: '24px', marginRight: '10px' }} />
                            <span 
                            // style={{ marginRight: '280px' }}
                            >
                                Peso
                            </span>
                        </span>
                        <span className="vitals-value">
                            {isEditingLabel ? (
                                <div >
                                    <input
                                        type="text"
                                        name="weight"
                                        style={{width:'50px',position: 'absolute',left:'435px',top:'457px'}}
                                        value={patient.weight}
                                        onChange={handleLabelChange}
                                    />
                                </div>
                            ) : (
                                <span className="vitals-value" style={{position: 'absolute',left:'465px',top:'477px'}}>{patient.weight}</span>
                            )}
                        </span> <span className="vitals-value" style={{position: 'absolute',left:'490px',top:'477px'}}>KG</span>
                    </p>
                    <p style={{ color: '#916A9E' }} className="temperatura">
                        <span className="vitals-label">
                            <FontAwesomeIcon icon={faTemperatureLow} style={{ color: '#916A9E', fontSize: '24px', marginRight: '10px' }} />
                            <span 
                            // style={{ marginRight: '150px' }}
                            >
                                Temperatura
                            </span>
                        </span>
                        <span className="vitals-value">
                            {isEditingLabel ? (
                                <div > 
                                    <input
                                        type="text"
                                        name="temperature"
                                        style={{width:'60px',position: 'absolute',left:'425px',top:'517px'}}
                                        value={patient.temperature}
                                        onChange={handleLabelChange}
                                    />
                                </div>
                            ) : (
                                <span className="vitals-value" style={{position: 'absolute',left:'455px',top:'537px'}}>{patient.temperature}</span>
                            )}
                        </span> <span className="vitals-value" style={{position: 'absolute',left:'490px',top:'537px'}}>°C</span>
                    </p>
                    <p style={{ color: '#AB2525' }} className="ritmo">
                        <span className="vitals-label">
                            <FontAwesomeIcon icon={faHeartPulse} style={{ color: '#AB2525', fontSize: '24px', marginRight: '10px' }} />
                            <span 
                            // style={{ marginRight: '170px' }}
                            >
                                Ritmo Cardiaco
                            </span>
                        </span>
                        <span className="vitals-value">
                            {isEditingLabel ? (
                                <div>
                                    <input
                                        type="text"
                                        name="heartRate"
                                        style={{width:'60px',position: 'absolute',left:'420px',top:'577px'}}
                                        value={patient.heartRate}
                                        onChange={handleLabelChange}
                                    />
                                </div>
                            ) : (
                                <span className="vitals-value" style={{position: 'absolute',left:'455px',top:'597px'}}>{patient.heartRate}</span>
                            )}
                        </span> <span className="vitals-value"style={{position: 'absolute',left:'485px',top:'597px'}}>bpm</span>
                    </p>
                    <p style={{ color: '#AB2525' }} className="presion">
                        <span className="vitals-label">
                            <FontAwesomeIcon icon={faHeartPulse} style={{ color: '#AB2525', fontSize: '24px', marginRight: '10px' }} />
                            <span 
                            // style={{ width: '300px', marginRight: '10px' }}
                            >
                                Presión Arterial
                            </span>
                        </span>
                        <span className="vitals-value">
                            {isEditingLabel ? (
                                <div >
                                    <input
                                        type="text"
                                        name="bloodPressure"
                                        style={{width:'75px',position: 'absolute',left:'395px',top:'637px'}}
                                        value={patient.bloodPressure}
                                        onChange={handleLabelChange}
                                    />
                                </div>
                            ) : (
                                <span className="vitals-value" style={{position: 'absolute',left:'420px',top:'657px'}}>{patient.bloodPressure}</span>
                            )}
                        </span> <span className="vitals-value" style={{position: 'absolute',left:'475px',top:'657px'}}>mmHg</span>
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
                                            type="text"
                                            value={alergias}
                                            style={{width: '98%'}}
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
                                            type="text"
                                            value={enfermedades}
                                            style={{width: '98%'}}
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
                    <div className='titulo4'>
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
                        <ul className="section-value">
                            {medications.map((medication, index) => (
                                <li key={index}>
                                    {isEditingLabel3 ? (
                                        <input
                                            type="text"
                                            value={medication}
                                            style={{width: '99%'}}
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
            </div>



        </div >

    );
};

export default Dashboard;
