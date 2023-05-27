import React, { useState } from 'react';
import '../HojaDeEstilos/Dashboard.css';


const Dashboard = () => {
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
        height: '170 cm',
        weight: '70 kg',
        temperature: '37.5 °C',
        heartRate: '80 bpm',
        bloodPressure: '120/80 mmHg',
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
    
    
    const handleUploadFile = (event) => {
        const file = event.target.files[0];
        // Lógica para subir el archivo al servidor y actualizar el estado
        // de los archivos en el paciente
    };

    return (
        <div className='contenido'>
            <div className='sidebar'>
                <div className='botones'>
                    <button className='sidebarBtn'>Icon1</button>
                    <button className='sidebarBtn'>Icon 2</button>
                    <button className='sidebarBtn'>Icon 3</button>
                    <button className='sidebarBtn'>Icon 4</button>
                    <button className='sidebarBtn'>Icon 5</button>
                    <button className='sidebarBtn'>Icon 6</button>
                </div>
            </div>
            <div className='topbar'>
                <div className='logo'>logo</div>
                <div className='nomCli'>Clinica Victor Cruz</div>
                <div style={{width: '800px'}}></div>
                <div className='line'></div>
                <div className='foto'>foto</div>
                <div className='doc'>Dr. Pedro Mendoza</div>
                <div className='icono'>icono</div>
            </div>
            <div className='about'>
                <div className="infoGeneral">
                    <div className='perfil'>
                        <img src={patient.profilePicture} alt="Foto de perfil" />
                        <button>Editar</button>
                    </div>
                    <div className='textoInfo'>
                        <div className='nombreC'>
                            <h2 className="nombre">{patient.fullName}</h2>
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
                        <h3 className='histmedtit'>Signos Vitales</h3>
                    </div>
                    <p style={{ color: '#75BD89' }} className="altura"><span className="vitals-label">Altura:</span> <span className="vitals-value">{patient.height}</span></p>
                    <p style={{ color: '#54648D' }} className="peso"><span className="vitals-label">Peso:</span> <span className="vitals-value">{patient.weight}</span></p>
                    <p style={{ color: '#916A9E' }} className="temperatura"><span className="vitals-label">Temperatura:</span> <span className="vitals-value">{patient.temperature}</span></p>
                    <p style={{ color: '#AB2525' }} className="ritmo"><span className="vitals-label">Ritmo Cardiaco:</span> <span className="vitals-value">{patient.heartRate}</span></p>
                    <p style={{ color: '#AB2525' }} className="presion"><span className="vitals-label">Presión Arterial:</span> <span className="vitals-value">{patient.bloodPressure}</span></p>
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
                        <button className="upload-button">Subir Archivo</button>
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
