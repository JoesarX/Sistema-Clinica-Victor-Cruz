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
          <div className='expedienteCard' key={expediente.idpaciente}>
            <h2>{expediente.nombre}</h2>

            <p>
              <b>Edad:</b> {expediente.edad} años<br />
              <b>Fecha de Nacimiento:</b> {new Date(expediente.fecha_nacimiento).toLocaleDateString("en-US", { day: '2-digit', month: '2-digit', year: 'numeric' })}<br />
              <b>Sexo:</b> {expediente.sexo}<br />
              <b>Correo:</b> {expediente.correo}<br />
              <b>Telefono:</b> {expediente.telefono}<br />
              <b>Numero de Identidad:</b> {expediente.numid}<br />
              <b>Estado Civil:</b> {expediente.estado_civil}<br />
              <b>Padecimientos:</b> {expediente.padecimientos}<br />
              <b>Ocupacion:</b> {expediente.ocupacion}<br />
              <button onClick={() => handleEditExpedientesClick(expediente.idpaciente)}>Edit</button>
              <button onClick={() => handleDeleteExpedientesClick(expediente.idpaciente)}>Delete</button>

            </p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Expedientes