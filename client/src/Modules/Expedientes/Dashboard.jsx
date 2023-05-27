import React, { useState } from 'react';
import '../HojaDeEstilos/Dashboard.css';

const Dashboard = () => {
    const [patient, setPatient] = useState({
        fullName: 'Pedro Daniel Mendoza Amador',
        profilePicture: 'ruta-de-la-imagen.jpg',
        dateOfBirth: '01/01/1990',
        age: 33,
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
        files: ['archivo1.pdf', 'archivo2.jpg'],
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
        
            <div className="dash">
                <div className='back'></div>
                {/* <div className="side">
                    <ul>
                        <li>Menu Item 1</li>
                        <li>Menu Item 2</li>
                        <li>Menu Item 3</li>
                    </ul>
                </div>
                <div className="head">
                    <h1>Welcome, {patient.fullName}</h1>
                </div> */}
                <div className="infoGeneral">
                    <div className='perfil'>
                        <img src={patient.profilePicture} alt="Foto de perfil" />
                    </div>
                    <div className='textoInfo'>
                        <h2 className="nombre">{patient.fullName}</h2>
                        <p>Fecha de Nacimiento: {patient.dateOfBirth}</p>
                        <p>Edad: {patient.age}</p>
                        <p>Ocupación: {patient.occupation}</p>
                        <p>Dirección: {patient.address}</p>
                        <p>Estado Civil: {patient.maritalStatus}</p>
                    </div>
                </div>
                <div className="medical-history">
                    <h3>Historial Médico</h3>
                    <hr className="divider" />
                    <div>
                        <div className="history-section">
                            <p className="section-label">Alergias:</p>
                            <p className="section-value">{patient.medicalHistory.allergies.join(', ')}</p>
                        </div>
                        <hr className="divider" />
                        <div className="history-section">
                            <p className="section-label">Enfermedades Básicas:</p>
                            <p className="section-value">{patient.medicalHistory.basicConditions.join(', ')}</p>
                        </div>
                        <hr className="divider" />
                    </div>
                </div>

                <div className="vitals">
                    <h3>Signos Vitales</h3>
                    <p className="vitals-item"><span className="vitals-label">Altura:</span> <span className="vitals-value">{patient.height}</span></p>
                    <p className="vitals-item"><span className="vitals-label">Peso:</span> <span className="vitals-value">{patient.weight}</span></p>
                    <p className="vitals-item"><span className="vitals-label">Temperatura:</span> <span className="vitals-value">{patient.temperature}</span></p>
                    <p className="vitals-item"><span className="vitals-label">Ritmo Cardiaco:</span> <span className="vitals-value">{patient.heartRate}</span></p>
                    <p className="vitals-item"><span className="vitals-label">Presión Arterial:</span> <span className="vitals-value">{patient.bloodPressure}</span></p>
                </div>
                <div className="files">
                    <h3>Archivos</h3>
                    <ul className="file-list">
                        {patient.files.map((file, index) => (
                            <div key={index}>
                                <li>{file}</li>
                                {index !== patient.files.length - 1 && <hr className="divider" />}
                            </div>
                        ))}
                    </ul>

                    <hr className="divider" />
                    <button className="upload-button">Subir Archivo</button>
                </div>

                <div className="citas">
                    <button>Agendar cita</button>
                    <h3>CITAS AGENDADAS</h3>
                    <ul>
                        {patient.appointments.map((appointment, index) => (
                            <li key={index}>
                                <p>Fecha: {appointment.date}</p>
                                <p>Hora: {appointment.time}</p>
                                <p>Descripción: {appointment.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    );
};

export default Dashboard;
