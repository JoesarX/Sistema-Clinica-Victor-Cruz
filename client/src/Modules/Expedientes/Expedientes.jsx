import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ExpedientesService from '../../Services/ExpedientesService';

const Expedientes = () => {
  const [expedientes, setExpedientes] = useState([]);



  const navigate = useNavigate();

  const handleAddExpedientesClick = () => {
    navigate('/expedientes/crear');
  };

  const handleEditExpedientesClick = (id) => {
    navigate(`/expedientes/${id}`);
  };

  const handleDeleteExpedientesClick = (id) => {
    
    const deleteExpediente = async () => {
      await ExpedientesService.deleteExpedientes(id);
      
    };
    deleteExpediente();
    window.location.reload();
  };



  useEffect(() => {
    const fetchAllExpedientes = async () => {
      const expedientesData = await ExpedientesService.getAllExpedientes();
      setExpedientes(expedientesData);
    };
    fetchAllExpedientes();
  }, []);




  return (
    <div>
      <h1>Expedientes</h1>
      <div className='expedientesDiv'>
        <button onClick={handleAddExpedientesClick}>Agregar Expediente</button>
        {expedientes.map((expediente) => (
          //maps must have a key if you decide to keey using them
          <div className='expedienteCard' key={expediente.id}>
            <h2>{expediente.nombre_completo}</h2>
            <p>
              <b>Estado Civil:</b> {expediente.estado_civil}<br />
              <b>Edad:</b> {expediente.edad} años<br />
              <b>Direccion:</b> {expediente.direccion}<br />
              <b>Telefono Celular:</b> {expediente.telefono}<br />
              <b>Correo Electronico:</b> {expediente.correo}<br />
              <b>Padecimientos y Alergias:</b> {expediente.padecimientos}<br />
              <b>Enfermedades:</b> {expediente.enfermedades}<br />
              <b>Medicamentos:</b> {expediente.medicamentos}<br />
              <b>Historial Medico:</b> {expediente.historial}<br />
              <button onClick={() => handleEditExpedientesClick(expediente.id)}>Edit</button>
              <button onClick={() => handleDeleteExpedientesClick(expediente.id)}>Delete</button>

            </p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Expedientes