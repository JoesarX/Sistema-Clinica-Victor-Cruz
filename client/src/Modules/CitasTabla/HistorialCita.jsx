import { faTrash, faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './HistorialCita.css';
import CitasService from '../../Services/CitasService';
import Services from '../../Services/RecetasService';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import PermissionChecker from '../Home/PermissionChecker.jsx';
import { AuthContext } from '../AuthContext.js';

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
                    <h6 className="headers">Dosis</h6>
                    <input
                        className="input-bg"
                        type="text"
                        placeholder="Dosis"
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
                <div className='d-flex col-md-1 align-items-center mobile-align'>
                    {onDelete && (
                        <button onClick={onDelete} class="delete-button">
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

        const processAppointmentData = (paciente) => {
            setNewTemp(paciente.temperatura);
            setNewRitmo(paciente.ritmo_cardiaco);
            setNewPeso(paciente.peso);
            setNewPresion(paciente.presion)
            setNewAltura(paciente.altura);

            setMedicamentosActuales(paciente.MedicamentosActuales)
            setInstrucciones(paciente.Instrucciones);
            setProcedimientos(paciente.Procedimientos);
            setTipo_Incapacidad(paciente.Tipo_Incapacidad);
            setFechaInicial(paciente.FechaInicial);
            setDiagnostico(paciente.Diagnostico);
            setComentarios(paciente.Comentarios);
            setDias(paciente.Dias);
            setEstudios(paciente.Estudios);
        }

        const fetchPaciente = async () => {
            try {
                const response = await CitasService.getOneCitaWithExpediente(id);
                if (response.Tipo_Incapacidad || response.FechaInicial) {
                    setShowIncapacity(true);
                }
                console.log("resp", response);
                setPaciente(response);
                if (response) {
                    processAppointmentData(response);
                }
            } catch (error) {
                swal({
                    title: "Error al obtener datos del paciente",
                    text: "Error",
                    icon: "error"
                });
            }
        };
        const fetchReceta = async () => {
            try {
                const recetaPaciente = await Services.getRecetasByCita(id);

                const medicamentos = recetaPaciente.map((medicamento, index) => ({
                    id: index,
                    medicamento: medicamento.nombre_medicamento,
                    cantidad: medicamento.cant_unidades,
                    frecuencia: medicamento.frecuencia_horas,
                    duracion: medicamento.cant_dias,
                }));

                setMedicamentosData(medicamentos);
            } catch (error) {
                swal({
                    title: "Error al obtener receta del paciente",
                    text: "Reportar este error: ", error,
                    icon: "error"
                });
            }
        }
        fetchPaciente();
        fetchReceta();
    }, [id]);

    // useEffect(() => {
    //      // Log paciente when it changes
    // }, [paciente]);


    const validacionesSignos = () => {
        if (paciente.altura === null || paciente.altura === "") {
            swal({
                title: "Error al ingresar datos",
                text: "La altura ingresada no es válida",
                icon: "error"
            });
            return false;
        }

        if (isNaN(paciente.altura)) {
            swal({
                title: "Error al ingresar datos",
                text: "La altura ingresada no es válida",
                icon: "error"
            });
            return false;
        }
        if (paciente.altura > 280) {
            swal({
                title: "Error al ingresar datos",
                text: "La altura ingresada no es válida",
                icon: "error"
            });
            return false;
        }
        if (paciente.peso === null || paciente.peso === "") {
            swal({
                title: "Error al ingresar datos",
                text: "El peso ingresado no es válido",
                icon: "error"
            });
            return false;
        }

        if (isNaN(paciente.peso)) {
            swal({
                title: "Error al ingresar datos",
                text: "El peso ingresado no es válido",
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
        if (paciente.temperatura === null || paciente.temperatura === "") {
            swal({
                title: "Error al ingresar datos",
                text: "La temperatura ingresada no es válida",
                icon: "error"
            });
            return false;
        }

        if (isNaN(paciente.temperatura)) {
            swal({
                title: "Error al ingresar datos",
                text: "La temperatura ingresada no es válida",
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
        if (paciente.ritmo_cardiaco === null || paciente.ritmo_cardiaco === "") {
            swal({
                title: "Error al ingresar datos",
                text: "EL ritmo cardiaco ingresado no es válida",
                icon: "error"
            });
            return false;
        }

        if (isNaN(paciente.ritmo_cardiaco)) {
            swal({
                title: "Error al ingresar datos",
                text: "EL ritmo cardiaco ingresado no es válida",
                icon: "error"
            });
            return false;
        }
        if (paciente.ritmo_cardiaco < 40 || paciente.ritmo_cardiaco > 140) {
            swal({
                title: "Error al ingresar datos",
                text: "EL ritmo cardiaco ingresado no es válida",
                icon: "error"
            });
            return false;
        }

        const regexFinal = /\b([1-9]\d{1,2})\/([1-9]\d{1,2})\b/g;

        if (!regexFinal.test(paciente.presion)) {
            swal({
                title: "Error al ingresar datos",
                text: "La presion arterial no es válida",
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
            paciente.Tipo_Incapacidad = null;
            paciente.FechaInicial = null;
            paciente.Dias = null;
            paciente.Comentarios = null;
            if (showIncapacity) {
                paciente.Tipo_Incapacidad = Tipo_Incapacidad;
                paciente.FechaInicial = FechaInicial;
                paciente.Dias = Dias;
                paciente.Comentarios = Comentarios;
            }
            paciente.estado = "Terminada";

            const recetas = medicamentosData.map((medicamento) => ({
                nombre_medicamento: medicamento.medicamento,
                cant_unidades: medicamento.cantidad,
                frecuencia_horas: medicamento.frecuencia,
                cant_dias: medicamento.duracion,
            }));

            const listaRecetas = {
                recetasLista: recetas,
            }

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
        const dateObj = new Date(date);
        dateObj.setDate(dateObj.getDate() + 1);
        const datePrefs = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString("es-HN", datePrefs);
    };

    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month as it's zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const generatePDF = (medicamentosData, paciente, edad, fecha) => {
        const imageURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABHwAAAR8CAMAAADYVnMdAAAAw1BMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8RrBEsnQEUAAAAQHRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlZW6RQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAIABJREFUeJzsnQl3KU3XhiVBEPMUYyMiOGYiiLD8/191IkJ066Gqurp6uq9nrW+93wk1NHWr2rWHwB4AAGwgYPcAAAD+BOIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8AwBYgPgAAW4D4AABsAeIDALAFiA8A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8EF58c7SI+1BIFSED8qLu7UvaQ8CoSJ8UN4+5XxQHuGD8s7a4XOhPQiEivBBeUvt8HnWHgRCRfigvJ+tVk17DAgW4YPyolprXXsMCBbhgyHstua1h4BgET4Ywj67K1Aa4YMhHLSutIeAYBE+GMYh5eNRFuGDYaxpDwDhInwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqCB8AKggfACoIHwAqPgPlK9W/FDp9TUAAAAASUVORK5CYII=";;
        const imageULR2 = "data:image/png;base64,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"
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [5.5, 4.25]
        });
        doc.addImage(imageURL, "JPEG", 0.15, 0.15, 1, 1);

        doc.addImage(imageULR2, "JPEG", 2.5, 2.5, 1.5, 1.5);


        // Define the title with a special font
        doc.setTextColor(2, 48, 32)
        doc.setFont("times");
        doc.setFontSize(16);
        doc.text("Dr. Victor Manuel Cruz Andino", 5.5 / 2, 0.5, { align: "center" });

        // Text "ESPECIALISTA SALUD OCUPACIONAL" in bold and a different font
        doc.setFont("helvetica", "bold");
        doc.setFontSize(6);
        doc.text("ESPECIALISTA SALUD OCUPACIONAL", 5.5 / 2, 0.75, { align: "center" });

        // Text "Medico Cirujano" in bold
        doc.text("Médico Cirujano", 5.5 / 2, 0.9, { align: "center" });

        // Text "Epidemiologo * Salubrista" in bold
        doc.text("Epidemiologo * Salubrista", 5.5 / 2, 1.05, { align: "center" });

        // Text "Colonia Kennedy al final de la Calle Comercial, contiguo a BANRURAL"
        doc.setFont("times", "normal");
        doc.setFontSize(6);
        doc.text("Colonia Kennedy al final de la Calle Comercial, contiguo a BANRURAL", 5.5 / 2, 1.20, { align: "center" });

        // Text "Telefono: 2230-3901, Celular: 9689-4453"
        doc.text("Teléfono: 2230-3901, Celular: 9689-4453", 5.5 / 2, 1.35, { align: "center" });

        doc.setFont("times");
        doc.setFontSize(6);
        doc.text("Nombre:", 1.20, 1.60);
        doc.text([paciente], 2.30, 1.58);
        doc.text("Edad:", 4.25, 1.60);
        doc.text([edad] + "", 4.62, 1.57);
        doc.text("Fecha:", 1.2, 1.90);
        doc.text([fecha], 2.30, 1.85);

        doc.text("Medicina General", 0.15, 1.5);
        doc.text("Control de Embarazo", 0.15, 2);
        doc.text("Control Niño Sano", 0.15, 2.5);
        doc.text("Nebulización", 0.15, 3);
        doc.text("Cirugía Menor", 0.15, 3.5);
        doc.text("Oxigenoterapia", 0.15, 4);

        doc.setLineWidth(0.01);
        doc.line(1.6, 1.60, 4.20, 1.60); // Line for Name
        doc.line(4.5, 1.60, 4.9, 1.60); // Line for Age
        doc.line(1.6, 1.90, 4.20, 1.90); // Line for Date



        doc.text("Horario:", 5, 0.5, { align: "right" });
        doc.text("Lunes a Viernes", 5, 0.65, { align: "right" });
        doc.text("de 8:00 a.m. a 6:00 p.m.", 5, 0.80, { align: "right" });
        doc.text("EMERGENCIAS.", 5, 1.1, { align: "right" });


        const XX = (5.5 - 3.6) / 2;

        const fontie = 6;
        //x1,y1  x2,y2
        doc.autoTable({
            head: [['Medicamento', 'Cantidad', 'Dosis', 'Duracion']],
            body: medicamentosData.map((medication) => [
                medication.medicamento,
                medication.cantidad,
                medication.frecuencia,
                medication.duracion,
            ]),
            styles: {
                fontSize: fontie,
                //  fillColor: [53, 94, 59],
                // textColor: [255,255,255],
            },
            //  autoSize: true,
            columnStyles: {
                0: { cellWidth: 2 },
                1: { cellWidth: 0.5 },
                2: { cellWidth: 0.6 },
                3: { cellWidth: 0.5 },

            },

            startY: 2.05, // Adjust the vertical position as needed

            margin: { left: XX },
            theme: 'plain'


        });

        // Line at the bottom middle
        doc.setLineWidth(0.01);
        doc.line(1.5, 3.9, 4, 3.9);

        // Text "Firma y Sello del Medico" at the bottom middle
        doc.setFontSize(10);
        doc.text("Firma y Sello del Médico", 5.5 / 2, 4.1, { align: "center" });




        // Separation Line at the End

        // Save or download the PDF
        doc.save('Receta_' + paciente + '_' + fecha + '.pdf');
    };

    const handleExportPDF = () => {
        generatePDF(medicamentosData, paciente.nombre, paciente.edad, formatDate(paciente.fecha));
    };

    const handleProfileClick = () => {
        navigate(`/expedientes/dashboard/${paciente.idpaciente}`)
    }

    ////////////////////////////////////////////////////////////////////////////

    const authContext = useContext(AuthContext);
    const allowSpecialPermission = false;

    return (
        <div className='scrollable-pageee'>
            <PermissionChecker
                userType={authContext.userType}
                requiredPermissions={['master']}
                allowSpecialPermission={allowSpecialPermission ? 'specialPermission' : null}
            >
                <NavBar />
                <div className='maine'>
                    <div className="appointment-patient-information">
                        <div className='profile-picture-and-edit'>
                            <div className='perfil' onClick={handleProfileClick}>
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
                                    <div class="input-group">
                                        <input
                                            className="form-control input-bg"
                                            type="text"
                                            // value={paciente && paciente.altura}
                                            value={paciente && paciente.altura}
                                            onChange={(e) => setNewAltura(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <span class="input-group-text preclinic-labels">cm</span>
                                        </div>
                                    </div>
                                </div>



                                <div className="col">
                                    <h4 className='headers'>Peso</h4>
                                    <div class="input-group">
                                        <input
                                            className="form-control input-bg"
                                            type="text"
                                            value={paciente && paciente.peso}
                                            onChange={(e) => setNewPeso(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <span class="input-group-text preclinic-labels">kg</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <h4 className='headers'>Temperatura</h4>
                                    <div class="input-group">
                                        <input
                                            className="form-control input-bg"
                                            type="text"
                                            value={paciente && paciente.temperatura}
                                            onChange={(e) => setNewTemp(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <span class="input-group-text preclinic-labels">ºC</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <h4 className='headers'>Ritmo Cardíaco</h4>
                                    <div class="input-group">
                                        <input
                                            className="form-control input-bg"
                                            type="text"
                                            value={paciente && paciente.ritmo_cardiaco}
                                            onChange={(e) => setNewRitmo(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <span class="input-group-text preclinic-labels">ppm</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <h4 className='headers'>Presión Arterial</h4>
                                    <div class="input-group">
                                        <input
                                            className="form-control input-bg"
                                            type="text"
                                            value={paciente && paciente.presion}
                                            onChange={(e) => setNewPresion(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <span class="input-group-text preclinic-labels">mmHg</span>
                                        </div>
                                    </div>
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
                                            value={paciente && paciente.Diagnostico}
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
                                            value={paciente && paciente.Estudios}
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
                                            value={paciente && paciente.Procedimientos}
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

                                    <div class="file-interaction-container medicine-interaction">
                                        <button class='file-interaction-button medicine-interaction' onClick={addMedicamentoRow}><FontAwesomeIcon icon={faPlus} /></button>
                                        <button class='file-interaction-button medicine-interaction' onClick={handleExportPDF}><FontAwesomeIcon icon={faDownload} /></button>
                                    </div>


                                    {/* ///////////////////////////// */}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className='headers_TA'>
                                    <h4 className='headers'>Instrucciones Médicas</h4>
                                    <div className="form-group">
                                        <textarea
                                            className="input-bg"
                                            rows="5"
                                            placeholder="Escriba aquí"
                                            value={paciente && paciente.Instrucciones}
                                            onChange={(e) => setInstrucciones(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <h4 className='headers'>Historial de Medicamentos Actuales</h4>
                                <div className="form-group">
                                    <textarea
                                        className="input-bg"
                                        rows="5"
                                        placeholder="Escriba aquí"
                                        value={paciente && paciente.MedicamentosActuales}
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
                                <h4 class='headers'>Tipo de Ausencia</h4>
                                <div className="btn-group my-2" role="group">
                                    <input defaultChecked type="radio" className="btn-check" name="btnradio" id="laboral" autoComplete="off"
                                        onChange={(e) => setTipo_Incapacidad("Laboral")} />
                                    <label className="btn btn-outline-dark" htmlFor="laboral">Laboral</label>

                                    <input type="radio" className="btn-check" name="btnradio" id="deportiva" autoComplete="off"
                                        onChange={(e) => setTipo_Incapacidad("Deportiva")} />
                                    <label className="btn btn-outline-dark" htmlFor="deportiva">Deportiva</label>

                                    <input type="radio" className="btn-check" name="btnradio" id="academica" autoComplete="off"
                                        onChange={(e) => setTipo_Incapacidad("Academica")} />
                                    <label className="btn btn-outline-dark" htmlFor="academica">Academica</label>

                                    <input type="radio" className="btn-check" name="btnradio" id="otra" autoComplete="off"
                                        onChange={(e) => setTipo_Incapacidad("Otra")} />
                                    <label className="btn btn-outline-dark" htmlFor="otra">Otra</label>
                                </div>

                                <div class="row mb-3">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="fechaInicial" className="form-label">Fecha Inicial</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="fechaInicial"
                                            onChange={(e) => setFechaInicial(e.target.value)}
                                            value={paciente !== null ? paciente.FechaInicial : getCurrentDate()} // Set the default value to the current date
                                        />
                                    </div>

                                    <div class="form-group col-md-3">
                                        <label htmlFor="diasDescanso" class="form-label">Cantidad de Dias</label>
                                        <input class="input-bg" id="diasDescanso"
                                            type="number"
                                            placeholder="1"
                                            value={paciente && paciente.Dias}
                                            onChange={(e) => setDias(e.target.value)} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="form-group col-md-12">
                                        <label htmlFor="comentarios" class="form-label">Comentarios</label>
                                        <textarea class="form-control" id="comentarios" rows="5" placeholder="Escriba aquí"
                                            value={paciente && paciente.Comentarios} onChange={(e) => setComentarios(e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>

                </div>
            </PermissionChecker>
        </div>
    );
}

export default HistorialCita;