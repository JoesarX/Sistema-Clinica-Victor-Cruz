import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './HistorialCita.css';
import CitasService from '../../Services/CitasService';

import swal from 'sweetalert';

function MedicamentoRow({ onDelete }) {
    return (
        <div className='Mediv'>
            <div className="row mb-3">
                <div className="col-md-3">
                    <h6 className='headers'>Medicamento</h6>
                    <input
                        className="input-bg"
                        type="text"
                        placeholder="Medicamento"
                    />
                </div>
                <div className="col-md-2">
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
                <div className="col-md-1 d-flex justify-content-center">
                    {onDelete && (
                        <button onClick={onDelete} className="delete-button">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
////////////////////////////////////////////////////////////////////////////

function HistorialCita() {

    const [showIncapacity, setShowIncapacity] = useState(false);
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
                console.log("RESPONSE:", response);
            } catch (error) {
                console.error('Error fetching paciente:', error);
            }
        };
        fetchPaciente();
    }, [id]);

    // useEffect(() => {
    //     console.log(paciente); // Log paciente when it changes
    // }, [paciente]);

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
            // window.location.reload();
        } catch (error) {
            console.log('Error submitting servicio:', error);
        }
    };
    /////////////////////////////////////////////////////////////////////
    //Este es el componente de Medicamento para agregar uno mas a la row 
    const [medicamentos, setMedicamentos] = useState([
        { id: 0, component: <MedicamentoRow onDelete={() => deleteMedicamento(0)} /> }
    ]);

    const addMedicamentoRow = () => {
        const newMedicamentoId = medicamentos.length;
        setMedicamentos(prevMedicamentos => [
            ...prevMedicamentos,
            {
                id: newMedicamentoId,
                component: <MedicamentoRow onDelete={() => deleteMedicamento(newMedicamentoId)} />
            }
        ]);
    };

    const deleteMedicamento = (id) => {
        setMedicamentos(prevMedicamentos => prevMedicamentos.filter(medicamento => medicamento.id !== id));
    };

    const formatDate = (date) => {
        var datePrefs = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("es-HN", datePrefs);
    }

    ////////////////////////////////////////////////////////////////////////////

    return (
        <div className='scrollable-page1'>
            <NavBar />
            <div className='main'>
                <div className="infoGeneral">
                    <div className='profile-picture-and-edit'>
                        <div className='perfil'>
                            <FontAwesomeIcon icon={faUser} className='iconoUser' />
                        </div>
                    </div>
                    <div className='patient-info-vert-align'>
                        <div class='appointment-details-container'>
                            <h2 className="nombre">
                                {paciente && paciente.nombre}
                            </h2>
                            <div className='appointment-reason-container'>
                                {paciente && paciente.nombre_persona}
                            </div>
                            <div className='appointment-reason-container date'>
                                {paciente && formatDate(paciente.fecha)}
                            </div>
                        </div>
                        <div className='space-between-text'>
                            <p className="smallText">
                                {paciente && paciente.numid}
                            </p>
                        </div>
                        <div className='space-between-text'>
                            <p className="smallText">
                                {paciente && formatDate(paciente.fecha_nacimiento)}
                            </p>
                            <p className="smallText">
                                {paciente && paciente.edad} años
                            </p>
                        </div>
                        <div className='space-between-text'>
                            <p className="smallText">
                                {paciente && (paciente.sexo === "M") ? 'Masculino' : 'Femenino'}
                            </p>
                            <div className='smallText'>
                                {paciente && paciente.correouser}
                            </div>
                        </div>
                    </div>
                    <button className='appointment-history-end-button' onClick={() => submitEdit()}>
                        Terminar Cita
                    </button>
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
                    <div className='contenedor'>
                        <div className="row mb-3">
                            <div className="col">
                                <h4 className='headers'>Altura</h4>
                                <input
                                    className="input-bg"
                                    type="text"
                                    value={paciente && paciente.altura}
                                    placeholder="Altura"
                                    onChange={(e) => setNewAltura(e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <h4 className='headers'>Peso</h4>
                                <input
                                    className="input-bg"
                                    type="text"
                                    value={paciente && paciente.peso}
                                    placeholder="Peso"
                                    onChange={(e) => setNewPeso(e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <h4 className='headers'>Temperatura</h4>
                                <input
                                    className="input-bg"
                                    type="text"
                                    value={paciente && paciente.temperatura}
                                    placeholder="Temperatura"
                                    onChange={(e) => setNewTemp(e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <h4 className='headers'>Ritmo Cardíaco</h4>
                                <input
                                    className="input-bg"
                                    type="text"
                                    value={paciente && paciente.ritmo_cardiaco}
                                    placeholder="Ritmo Cardíaco"
                                    onChange={(e) => setNewRitmo(e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <h4 className='headers'>Presión Arterial</h4>
                                <input
                                    className="input-bg"
                                    type="text"
                                    value={paciente && paciente.presion}
                                    placeholder="Presión Arterial"
                                    onChange={(e) => setNewPresion(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div class='diagnostic' id='diagnostico'>
                    <h3 className='appointment-section-header'>Diagnóstico y Tratamiento</h3>
                    <div className='contenedo'>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <h4 className='headers'>Diagnóstico</h4>
                                <div className='contenedor'>
                                    <input
                                        className="input-bg"
                                        type="text"
                                        placeholder="Nombre o Código"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h4 className='headers'>Estudios de Gabinete</h4>
                                <div className='contenedor'>
                                    <input
                                        className="input-bg"
                                        type="text"
                                        placeholder="Estudios de Laboratorio e Imagenología"
                                    />
                                </div>
                            </div>
                        </div>
                        <h4 className='headers'>Procedimientos</h4>
                        <div className="row mb-3">
                            <div className="col">
                                <div className='contenedor'>
                                    <input
                                        className="input-bg"
                                        type="text"
                                        placeholder="Procedimientos"
                                    />
                                </div>
                            </div>
                        </div>
                        <h4 className='headers'>Receta de Medicamentos</h4>
                        <div className='contenedor'>
                            <div className="row mb-3">
                                <div className="col-md-3">
                                    <input
                                        className="input-bg"
                                        type="text"
                                        placeholder="Buscar Medicamentos"
                                    />
                                </div>
                            </div>

                            {/* Visualizacion de medicamentos */}
                            <div>
                                {medicamentos.map(({ id, component }) => (
                                    <div key={id}>{component}</div>
                                ))}
                                <button onClick={addMedicamentoRow}><FontAwesomeIcon icon={faPlus} /></button>
                            </div>
                            {/* ///////////////////////////// */}
                        </div>
                        <div className="row mb-3">
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
                <div class='incapacity'>
                    <div class="d-inline-flex mb-3">
                        <label htmlFor="showIncapacity" id='incapacidad' class='appointment-section-header'>
                            Agregar Incapacidad
                        </label>
                        <input
                            type="checkbox"
                            id="showIncapacity"
                            checked={showIncapacity}
                            onChange={() => setShowIncapacity(!showIncapacity)}
                            style={{ transform: 'scale(1.5)', margin: '0 10px' }}
                        />

                    </div>
                    {showIncapacity && (
                        <div class='contenedor'>
                            <h4 class='headers'>Tipo</h4>
                            <div className="btn-group my-2" role="group">
                                <input type="radio" className="btn-check" name="btnradio" id="laboral" autoComplete="off" />
                                <label className="btn btn-outline-dark" htmlFor="laboral">Laboral</label>

                                <input type="radio" className="btn-check" name="btnradio" id="deportiva" autoComplete="off" />
                                <label className="btn btn-outline-dark" htmlFor="deportiva">Deportiva</label>

                                <input type="radio" className="btn-check" name="btnradio" id="transporte" autoComplete="off" />
                                <label className="btn btn-outline-dark" htmlFor="transporte">Transporte</label>

                                <input type="radio" className="btn-check" name="btnradio" id="otra" autoComplete="off" />
                                <label className="btn btn-outline-dark" htmlFor="otra">Otra</label>
                            </div>

                            <div class="row mb-3">
                                <div class="form-group col-md-6">
                                    <label htmlFor="fechaInicial" class="form-label">Fecha Inicial</label>
                                    <input type="date" class="form-control" id="fechaInicial" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label htmlFor="diasDescanso" class="form-label">Días de Descanso</label>
                                    <select class="form-select" id="diasDescanso">
                                        <option value="1">1 día</option>
                                        <option value="2">2 días</option>
                                        <option value="3">3 días</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="form-group col-md-12">
                                    <label htmlFor="comentarios" class="form-label">Comentarios</label>
                                    <textarea class="form-control" id="comentarios" rows="5" placeholder="Escriba aquí"></textarea>
                                </div>
                            </div>
                        </div>

                    )}
                </div>

            </div>
        </div>
    );
}

export default HistorialCita;