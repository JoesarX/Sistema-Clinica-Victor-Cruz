
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './HistorialCita.css';
import CitasService from '../../Services/CitasService';

import swal from 'sweetalert';

function HistorialCita() {

    const { id } = useParams();
    const [paciente, setPaciente] = useState(null);
    const [peso, setNewPeso] = useState(null);
    const [altura, setNewAltura] = useState(null);
    const [temp, setNewTemp] = useState(null);
    const [ritmo, setNewRitmo] = useState(null);
    const [presion, setNewPresion] = useState(null);

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await CitasService.getOneCitaWithExpediente(id);
                setPaciente(response);
                console.log(response);
            } catch (error) {
                console.error('Error fetching paciente:', error);
            }
        };
        fetchPaciente();
    }, [id]);
    
    useEffect(() => {
        console.log(paciente); // Log paciente when it changes
    }, [paciente]);

    const submitEdit = async () => {
        try {
            paciente.altura = altura;
            paciente.peso = peso;
            paciente.temperatura = temp;
            paciente.ritmo_cardiaco = ritmo;
            paciente.presion = presion;
            await CitasService.editCitas(id, paciente);
            swal("Cita Editada", {
              icon: "success",
            });
          window.location.reload();
        } catch (error) {
          console.log('Error submitting servicio:', error);
        }
      };

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
                        <h2 className="nombre">{paciente && paciente.nombre_persona}</h2>
                        <div className='space-between-text'>
                            <div className='patient-email-container'>
                                {paciente && paciente.correouser}
                            </div>
                            <p className="smallText">{paciente && paciente.estado_civil}</p>
                        </div>
                        <div className='space-between-text'>
                            <p className="smallText">{paciente && paciente.numid}</p>
                            <p className="smallText">Dirección</p>
                        </div>
                        <div className='space-between-text'>
                            <p className="smallText">{paciente && paciente.fecha_nacimiento}</p>
                            <p className="smallText">{paciente && paciente.edad}</p>
                        </div>
                        <div className='space-between-text'>
                            <p className="smallText">{paciente && paciente.sexo}</p>
                            <p className="smallText">{paciente && paciente.ocupacion}</p>
                        </div>
                    </div>
                </div>
                {/* <div className="row align-items-center mb-4"> */}
                {/* </div> */}

                <div class='nav-button-container'>
                    <a href="#preclinica">Preclínica</a>
                    <a href="#diagnostico">Diágnostico y Tratamiento</a>
                    <a href="#incapacidad">Incapacidad</a>
                </div>

                <div class='preclinic' id='preclinica'>
                    <h3 className='appointment-section-header'>Preclínica</h3>
                    <div className="row mb-3">
                        <div className="col">
                            <h4 className='headers'>Altura</h4>
                            <input
                                className="input-bg"
                                type="text"
                                value = {paciente && paciente.altura}
                                placeholder="Altura"
                                onChange={(e) => setNewAltura(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <h4 className='headers'>Peso</h4>
                            <input
                                className="input-bg"
                                type="text"
                                value = {paciente && paciente.peso}
                                placeholder="Peso"
                                onChange={(e) => setNewPeso(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <h4 className='headers'>Temperatura</h4>
                            <input
                                className="input-bg"
                                type="text"
                                value = {paciente && paciente.temperatura}
                                placeholder="Temperatura"
                                onChange={(e) => setNewTemp(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <h4 className='headers'>Ritmo Cardíaco</h4>
                            <input
                                className="input-bg"
                                type="text"
                                value = {paciente && paciente.ritmo_cardiaco}
                                placeholder="Ritmo Cardíaco"
                                onChange={(e) => setNewRitmo(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <h4 className='headers'>Presión Arterial</h4>
                            <input
                                className="input-bg"
                                type="text"
                                value = {paciente && paciente.presion}
                                placeholder="Presión Arterial"
                                onChange={(e) => setNewPresion(e.target.value)}
                            />
                        </div>
                        <button className='buttonE' onClick={() => submitEdit()}>Editar Cita</button>
                    </div>
                </div>

                <div class='diagnostic' id='diagnostico'>
                    <h3 className='appointment-section-header'>Diagnóstico y Tratamiento</h3>
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

                <div class='incapacity' id='incapacidad'>
                    <h3 className='appointment-section-header'>Incapacidad</h3>
                    <h4 className='headers'>Tipo</h4>
                    <div class="btn-group my-2" role="group">
                        <input type="radio" class="btn-check" name="btnradio" id="laboral" autocomplete="off"/>
                        <label class="btn btn-outline-dark" for="laboral">Laboral</label>

                        <input type="radio" class="btn-check" name="btnradio" id="deportiva" autocomplete="off" />
                        <label class="btn btn-outline-dark" for="deportiva">Deportiva</label>

                        <input type="radio" class="btn-check" name="btnradio" id="transporte" autocomplete="off" />
                        <label class="btn btn-outline-dark" for="transporte">Transporte</label>

                        <input type="radio" class="btn-check" name="btnradio" id="otra" autocomplete="off" />
                        <label class="btn btn-outline-dark" for="otra">Otra</label>
                    </div>
                    <div className="row mb-3">
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
        </div>
    );
}

export default HistorialCita;