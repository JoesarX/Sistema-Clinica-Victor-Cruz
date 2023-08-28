
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './HistorialCita.css';
import ExpedientesService from '../../Services/ExpedientesService';

function HistorialCita() {
    /*const [paciente, setPaciente] = useState(null);
    const { idPaciente } = useParams();
    console.log("ID RECIBIDA: " + idPaciente);
    useEffect(() => {
        const fetchPaciente = async () => {
            const response = await ExpedientesService.getOneExpediente(idPaciente);
            setPaciente(response.data);
        }
        fetchPaciente();
    }, []);*/

    return (
        <div className='scrollable-page'>
            <NavBar />
            <div className='main'>
                <div className="infoGeneral">
                    <div className='profile-picture-and-edit'>
                        <div className='perfil'>
                            <FontAwesomeIcon icon={faUser} className='iconoUser' />
                        </div>
                    </div>
                    <div className='patient-info-vert-align'>
                        <h2 className="nombre"> Nombre del paciente</h2>
                        <div className='space-between-text'>
                            <div className='patient-email-container'>
                                Correo
                            </div>
                            <p className="smallText">Estado Civil</p>
                        </div>
                        <div className='space-between-text'>
                            <p className="smallText">Identidad</p>
                            <p className="smallText">Dirección</p>
                        </div>
                        <div className='space-between-text'>
                            <p className="smallText">Fecha de Nacimiento</p>
                            <p className="smallText">Edad</p>
                        </div>
                        <div className='space-between-text'>
                            <p className="smallText">Genero</p>
                            <p className="smallText">Ocupacion</p>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center mb-4">
                </div>
                
                <div className="row mb-3">
                    <div className="col-md-6">
                        <h4 className='headers'>Diagnóstico</h4>
                        <input
                            className="input-bg"
                            type="text"
                            placeholder="Nombre o Código"
                        />
                    </div>
                    <div className="col-md-6">
                        <h4 className='headers'>Estudios de Gabinete</h4>
                        <input
                            className="input-bg"
                            type="text"
                            placeholder="Estudios de Laboratorio e Imagenología"
                        />
                    </div>
                </div>
                <h4 className='headers'>Procedimientos</h4>
                <div className="row mb-3">
                    <div className="col">
                        <input
                            className="input-bg"
                            type="text"
                            placeholder="Procedimientos"
                        />
                    </div>
                </div>
                <h4 className='headers'>Receta de Medicamentos</h4>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <input
                            className="input-bg"
                            type="text"
                            placeholder="Buscar Medicamentos"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <h6 className='headers'>Medicamento</h6>
                        <input
                            className="input-bg"
                            type="text"
                            placeholder="Medicamento"
                        />
                    </div>
                    <div className="col-md-3">
                        <h6 className='headers'>Cantidad</h6>
                        <input
                            className="input-bg"
                            type="text"
                            placeholder="Cantidad"
                        />
                    </div>
                    <div className="col-md-3">
                        <h6 className='headers'>Frecuencia</h6>
                        <input
                            className="input-bg"
                            type="text"
                            placeholder="Frecuencia"
                        />
                    </div>
                    <div className="col-md-3">
                        <h6 className='headers'>Duración</h6>
                        <input
                            className="input-bg"
                            type="text"
                            placeholder="Duración"
                        />
                    </div>
                    <div className='headers_TA'>
                        <h4 className='headers'>Instrucciones Médicas</h4>
                        <div className="form-group">
                            <textarea
                                className="form-control input-bg"
                                rows="5"
                                placeholder="Escriba aquí"
                            ></textarea>
                        </div>
                    </div>
                    <h4 className='headers'>Historial de Medicamentos Actuales</h4>
                    <div className="form-group">
                        <textarea
                            className="form-control input-bg"
                            rows="5"
                            placeholder="Escriba aquí"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HistorialCita;