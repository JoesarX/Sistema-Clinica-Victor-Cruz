import { faTrash, faPlus , faDownload} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './HistorialCita.css';
import CitasService from '../../Services/CitasService';
import Services from '../../Services/RecetasService';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

import jsPDF from 'jspdf';
import 'jspdf-autotable';


function MedicamentoRow({ data, onDelete, onUpdate }) {
    const handleDataChange = (e, field) => {
        const updatedData = { ...data, [field]: e.target.value };
        onUpdate(updatedData);
    };

    return (
        <div className="Mediv">
            <div className="row mb-3">
                <div className="col-md-3">
                    <h6 className="headers">Medicamento</h6>
                    <input
                        className="input-bg"
                        type="text"
                        placeholder="Medicamento"
                        value={data.medicamento}
                        onChange={(e) => handleDataChange(e, 'medicamento')}
                    />
                </div>
                <div className="col-md-2">
                    <h6 className="headers">Cantidad</h6>
                    <input
                        className="input-bg"
                        type="text"
                        placeholder="Cantidad"
                        value={data.cantidad}
                        onChange={(e) => handleDataChange(e, 'cantidad')}
                    />
                </div>
                <div className="col-md-3">
                    <h6 className="headers">Frecuencia</h6>
                    <input
                        className="input-bg"
                        type="text"
                        placeholder="Frecuencia"
                        value={data.frecuencia}
                        onChange={(e) => handleDataChange(e, 'frecuencia')}
                    />
                </div>
                <div className="col-md-3">
                    <h6 className="headers">Duración</h6>
                    <input
                        className="input-bg"
                        type="text"
                        placeholder="Duración"
                        value={data.duracion}
                        onChange={(e) => handleDataChange(e, 'duracion')}
                    />
                </div>
                <div className='d-flex col-md-1 align-items-center'>
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
    const navigate = useNavigate();

    const [showIncapacity, setShowIncapacity] = useState(false);
    const { id } = useParams();
    const [paciente, setPaciente] = useState(null);

    const [peso, setNewPeso] = useState(null);
    const [altura, setNewAltura] = useState(null);
    const [temp, setNewTemp] = useState(null);
    const [ritmo, setNewRitmo] = useState(null);
    const [presion, setNewPresion] = useState(null);
    const [Diagnostico, setDiagnostico] = useState(null);
    const [Estudios, setEstudios] = useState(null);
    const [Procedimientos, setProcedimientos] = useState(null);
    const [Instrucciones, setInstrucciones] = useState(null);
    const [MedicamentosActuales, setMedicamentosActuales] = useState(null);

    const [Tipo_Incapacidad, setTipo_Incapacidad] = useState(null);
    const [FechaInicial, setFechaInicial] = useState(null);
    const [Dias, setDias] = useState(null);
    const [Comentarios, setComentarios] = useState(null);




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


    const validacionesSignos = () => {
        if (paciente.altura > 280) {
            swal({
                title: "Error al ingresar datos",
                text: "La altura ingresada no es válida",
                icon: "error"
            });
            return false;
        }
        if (paciente.peso > 250) {
            swal({
                title: "Error al ingresar datos",
                text: "El peso ingresado no es válido",
                icon: "error"
            });
            return false;
        }
        if (paciente.temperatura > 50 || paciente.temperatura < 31.2) {
            swal({
                title: "Error al ingresar datos",
                text: "La temperatura ingresada no es válida",
                icon: "error"
            });
            return false;
        }

        const regexFinal = /\b([1-9]\d{1,2})\/([1-9]\d{1,2})\b/g;

        if (!regexFinal.test(paciente.presion)) {
            swal({
                title: "Error al ingresar datos",
                text: "El ritmo cardíaco no es válido",
                icon: "error"
            });
            return false;
        }
        if (paciente.presion)
            return true;

    }

    const submitEdit = async () => {
        try {
            paciente.altura = altura;
            paciente.peso = peso;
            paciente.temperatura = temp;
            paciente.ritmo_cardiaco = ritmo;
            paciente.presion = presion;
            paciente.Diagnostico = Diagnostico;
            paciente.Estudios = Estudios;
            paciente.Procedimientos = Procedimientos;
            paciente.Instrucciones = Instrucciones;
            paciente.MedicamentosActuales = MedicamentosActuales;
            paciente.Tipo_Incapacidad = Tipo_Incapacidad;
            paciente.FechaInicial = FechaInicial;
            paciente.Dias = Dias;
            paciente.Comentarios = Comentarios;

            const recetas = medicamentosData.map((medicamento) => ({
                nombre_medicamento: medicamento.medicamento,
                cant_unidades: medicamento.cantidad,
                frecuencia_horas: medicamento.frecuencia,
                cant_dias: medicamento.duracion,
            }));

            // aqui agrego los medicamentos ????????????/

            console.log(recetas);

            const listaRecetas = {
                recetasLista: recetas,
            }
            console.log(listaRecetas);
            if (validacionesSignos()) {
                await CitasService.editCitas(id, paciente);
                let idcita = id;
                await Services.postRecetasByCita(idcita, listaRecetas);
                swal("Cita Editada", {
                    icon: "success",
                });
                //finaliza
                navigate("/citas_tabla");
            }





            // window.location.reload();
        } catch (error) {

            console.log('Error submitting servicio:', error);
        }
    };
    /////////////////////////////////////////////////////////////////////
    //Este es el componente de Medicamento para agregar uno mas a la row 
    const [medicamentosData, setMedicamentosData] = useState([
        {
            id: 0,
            medicamento: "",
            cantidad: "",
            frecuencia: "",
            duracion: "",
        },
    ]);

    const addMedicamentoRow = () => {
        const newMedicamentoId = medicamentosData.length;
        setMedicamentosData((prevData) => [
            ...prevData,
            {
                id: newMedicamentoId,
                medicamento: "",
                cantidad: "",
                frecuencia: "",
                duracion: "",
            },
        ]);
    };

    const deleteMedicamento = (id) => {
        setMedicamentosData((prevData) => prevData.filter((medicamento) => medicamento.id !== id));
    };
    const updateMedicamentoData = (updatedData, rowId) => {
        setMedicamentosData((prevData) =>
            prevData.map((medicamento) => (medicamento.id === rowId ? updatedData : medicamento))
        );
    };


    const formatDate = (date) => {
        var datePrefs = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("es-HN", datePrefs);

    }



    const generatePDF = (medicamentosData) => {
        const doc = new jsPDF();
        doc.setFontSize(18);

        // Title: "Dr. Victor Cruz"
        doc.text('Dr. Victor Cruz', 20, 20);

        // Subtitle: "Medicina Familiar"
        doc.setFontSize(14);
        doc.text('Medicina Familiar', 20, 30);

        // Separation Line
        doc.setLineWidth(0.5);
        doc.line(20, 40, 190, 40);

        // Patient Information
        doc.setFontSize(12);
        doc.text('Paciente:', 20, 50);
        doc.line(50, 50, 100, 50); // Line for patient name
        doc.text('Edad:', 120, 50);
        doc.line(140, 50, 160, 50); // Line for age
        doc.text('Diagnostico:', 20, 60);
        doc.line(50, 60, 160, 60); // Line for diagnosis
        doc.text('Fecha:', 20, 70);
        doc.line(50, 70, 100, 70); // Line for date

        // Table: Medication Data
        doc.autoTable({
            head: [['Medicamento', 'Cantidad', 'Frecuencia', 'Duracion']],
            body: medicamentosData.map((medication) => [
                medication.medicamento,
                medication.cantidad,
                medication.frecuencia,
                medication.duracion,
            ]),
            startY: 80, // Adjust the vertical position as needed
        });


        doc.setLineWidth(0.5);
        doc.line(20, doc.internal.pageSize.height - 20, 190, doc.internal.pageSize.height - 20);

        // Signature

        doc.setFontSize(12);
        doc.text('Firma Dr. Victor Cruz:', 20, 250);
        doc.line(65, 250, 120, 250); // Line for signature
        const signatureY = doc.line.previous + 10; // Adjust the vertical position as needed

        const textInFooter = 'Teléfono: +504 2230-3901';
        doc.setFontSize(10); // Adjust font size as needed
        const textWidth = doc.getStringUnitWidth(textInFooter) * 10; // Calculate text width
        const textX = (doc.internal.pageSize.width - textWidth) / 2; // Center text horizontally
        const textY = doc.internal.pageSize.height - 10; // Position text at the bottom
        doc.text(textInFooter, 20, textY);



        // Separation Line at the End

        // Save or download the PDF
        doc.save('medical_record.pdf');
    };

    const handleExportPDF = () => {
        generatePDF(medicamentosData);
    };


    ////////////////////////////////////////////////////////////////////////////

    return (
        <div className='scrollable-page1'>
            <NavBar />
            <div className='main'>
                <div className="appointment-patient-information">
                    <div className='profile-picture-and-edit'>
                        <div className='perfil'>
                            <FontAwesomeIcon icon={faUser} className='iconoUser' />
                        </div>
                    </div>
                    <div className='patient-info-vert-align'>
                        <div class='appointment-details-container'>
                            <h2 className="appointment-history-nombre">
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
                                    // value={paciente && paciente.altura}
                                    placeholder={paciente && paciente.altura}
                                    onChange={(e) => setNewAltura(e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <h4 className='headers'>Peso</h4>
                                <input
                                    className="input-bg"
                                    type="text"
                                    //value={paciente && paciente.peso}
                                    placeholder={paciente && paciente.peso}
                                    onChange={(e) => setNewPeso(e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <h4 className='headers'>Temperatura</h4>
                                <input
                                    className="input-bg"
                                    type="text"
                                    // value={paciente && paciente.temperatura}

                                    placeholder={paciente && paciente.temperatura}
                                    onChange={(e) => setNewTemp(e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <h4 className='headers'>Ritmo Cardíaco</h4>
                                <input
                                    className="input-bg"
                                    type="text"
                                    //value={paciente && paciente.ritmo_cardiaco}
                                    placeholder={paciente && paciente.ritmo_cardiaco}
                                    onChange={(e) => setNewRitmo(e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <h4 className='headers'>Presión Arterial</h4>
                                <input
                                    className="input-bg"
                                    type="text"
                                    //  value={paciente && paciente.presion}
                                    placeholder={paciente && paciente.presion}
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
                                        onChange={(e) => setDiagnostico(e.target.value)}
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
                                        onChange={(e) => setEstudios(e.target.value)}
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
                                        onChange={(e) => setProcedimientos(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div >
                            <h4 className='headers'>Receta de Medicamentos</h4>
                            <div className='contenedor' >


                                {/* Visualizacion de medicamentos */}
                                {medicamentosData.map((rowData) => (
                                    <div key={rowData.id}>
                                        <MedicamentoRow
                                            data={rowData}
                                            onDelete={() => deleteMedicamento(rowData.id)}
                                            onUpdate={(updatedData) => updateMedicamentoData(updatedData, rowData.id)}
                                        />
                                    </div>
                                ))}

                                <button onClick={addMedicamentoRow}><FontAwesomeIcon icon={faPlus} /></button>
                                <button onClick={handleExportPDF}><FontAwesomeIcon icon={faDownload} /></button>


                                {/* ///////////////////////////// */}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className='headers_TA'>
                                <h4 className='headers'>Instrucciones Médicas</h4>
                                <div className="form-group">
                                    <textarea
                                        className="form-control input-bg"
                                        rows="5"
                                        placeholder="Escriba aquí"
                                        onChange={(e) => setInstrucciones(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <h4 className='headers'>Historial de Medicamentos Actuales</h4>
                            <div className="form-group">
                                <textarea
                                    className="form-control input-bg"
                                    rows="5"
                                    placeholder="Escriba aquí"
                                    onChange={(e) => setMedicamentosActuales(e.target.value)}
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
                                <input type="radio" className="btn-check" name="btnradio" id="laboral" autoComplete="off"
                                    onChange={(e) => setTipo_Incapacidad("Laboral")} />
                                <label className="btn btn-outline-dark" htmlFor="laboral">Laboral</label>

                                <input type="radio" className="btn-check" name="btnradio" id="deportiva" autoComplete="off"
                                    onChange={(e) => setTipo_Incapacidad("Deportiva")} />
                                <label className="btn btn-outline-dark" htmlFor="deportiva">Deportiva</label>

                                <input type="radio" className="btn-check" name="btnradio" id="otra" autoComplete="off"
                                    onChange={(e) => setTipo_Incapacidad("Otra")} />
                                <label className="btn btn-outline-dark" htmlFor="otra">Otra</label>
                            </div>

                            <div class="row mb-3">
                                <div class="form-group col-md-6">
                                    <label htmlFor="fechaInicial" class="form-label">Fecha Inicial</label>
                                    <input type="date" class="form-control" id="fechaInicial" onChange={(e) => setFechaInicial(e.target.value)} />
                                </div>
                                <div class="form-group col-md-6">
                                    <label htmlFor="diasDescanso" class="form-label">Días de Descanso</label>
                                    <input class="input-bg" id="diasDescanso"
                                        type="number"
                                        placeholder="Días"
                                        onChange={(e) => setDias(e.target.value)} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="form-group col-md-12">
                                    <label htmlFor="comentarios" class="form-label">Comentarios</label>
                                    <textarea class="form-control" id="comentarios" rows="5" placeholder="Escriba aquí" onChange={(e) => setComentarios(e.target.value)}></textarea>
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