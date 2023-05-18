
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ExpedientesService from '../../Services/ExpedientesService';
import { useEffect } from 'react'
import { useState } from 'react'


const EditExpedientes = () => {
  
  useEffect(() => {

    const fetchExpediente = async () => {
      try {
        const expedienteData = await ExpedientesService.getOneExpediente(id);
        
        setExpedientess([expedienteData]);
        setExpediente(expedienteData); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchExpediente();
  },);

  const [expediente, setExpediente] = React.useState({
    nombre_completo: '',
    estado_civil: '',
    edad: '',
    direccion: '',
    telefono: '',
    correo: '',
    padecimientos: '',
    enfermedades: '',
    medicamentos: ''
  })
  const navigate = useNavigate();

  const [expedienteData, setExpedientess] = useState([]);

  const EditHandler = () => {

    const editExpediente = async () => {
      await ExpedientesService.editExpedientes(id, expediente);

    };
    console.log(expediente)
    editExpediente();

    navigate('/expedientes')
  };

  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);
  

  const handleChange = (e) => {
    setExpediente((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    
  };
  // console.log(expedientes)


  
  return (
    <div>

      <div className='expedientesDiv'>
        {expedienteData.map((expediente) => (
          //maps must have a key if you decide to keey using them
          <div className='expedienteCard' key={expediente.id}>
            <h1>Editar Expediente</h1>
            <h2>{expediente.nombre_completo}</h2>
         
              <form >
             
                <input type="text" defaultValue={expediente.nombre_completo}  onChange={handleChange} name='nombre_completo' />
               <input type="text" placeholder="Estado Civil" defaultValue={expediente.estado_civil}  onChange={handleChange} name='estado_civil' />
                <input type="number" placeholder="Edad" defaultValue={expediente.edad}  onChange={handleChange} name='edad' />
                <input type="text" placeholder="Direccion" defaultValue={expediente.direccion}  onChange={handleChange} name='direccion' />
                <input type="number" placeholder="Telefono Celular" defaultValue={expediente.telefono}  onChange={handleChange} name='telefono' />
                <input type="text" placeholder="Correo Electronico" defaultValue={expediente.correo}  onChange={handleChange} name='correo' />
                <input type="text" placeholder="Padecimientos y Alergias" defaultValue={expediente.padecimientos}  onChange={handleChange} name='padecimientos' />
                <input type="text" placeholder="Enfermedades" defaultValue={expediente.enfermedades}  onChange={handleChange} name='enfermedades' />
                <input type="text" placeholder="Medicamentos" defaultValue={expediente.medicamentos}  onChange={handleChange} name='medicamentos' />
                <input type="text" placeholder="Historial Medico" defaultValue={expediente.historial} onChange={handleChange} name='historial' />
                <input type="text" placeholder="Historial Familiar" defaultValue={expediente.historial_familiar}  onChange={handleChange} name='historial_familiar' />
                <button type="submit" onClick={() => EditHandler()}>Editar Expediente</button>
              </form>
          
          </div>
        ))}

      </div>
    </div>


  )

}


export default EditExpedientes