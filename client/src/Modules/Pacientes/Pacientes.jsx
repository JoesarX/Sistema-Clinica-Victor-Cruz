import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PacientesService from '../../Services/PacientesService';

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  const handleAddPacientesClick = () => {
    navigate('/pacientes/crear');
  };

  const handleEditPacientesClick = (id) => {
    navigate(`/pacientes/${id}`);
  };

  const handleDeletePacientesClick = (id) => {
    console.log("delete call works, id: " + id);
    //llamar a la funcion de delete de services
  };

  useEffect(() => {
    const fetchAllPacientes = async () => {
      const pacientesData = await PacientesService.getAllPacientes();
      setPacientes(pacientesData);
    };
    fetchAllPacientes();
  }, []);


  return (
    <div>
      <h1>Pacientes</h1>
      <div className='pacientesDiv'>
        <button onClick={handleAddPacientesClick}>Agregar Paciente</button>
        {pacientes.map((paciente) => (
          //maps must have a key if you decide to keey using them
          <div className='pacienteCard' key={paciente.id}>
            <h2>{paciente.nombre_completo}</h2>
            <p>
              <b>Estado Civil:</b> {paciente.estado_civil}<br />
              <b>Edad:</b> {paciente.edad} años<br />
              <b>Direccion:</b> {paciente.direccion}<br />
              <b>Telefono Celular:</b> {paciente.telefono}<br />
              <b>Correo Electronico:</b> {paciente.correo}<br />
              <b>Padecimientos y Alergias:</b> {paciente.padecimientos}<br />
              <b>Enfermedades:</b> {paciente.enfermedades}<br />
              <b>Medicamentos:</b> {paciente.medicamentos}<br />
              <b>Historial Medico:</b> {paciente.historial}<br />
              <button onClick={() => handleEditPacientesClick(paciente.id)}>Edit</button>
              <button onClick={() => handleDeletePacientesClick(paciente.id)}>Delete</button>

            </p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Pacientes