
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ExpedientesService from '../../Services/ExpedientesService';
import { useEffect } from 'react'
import { useState } from 'react'
import moment from 'moment';


const EditExpedientes = () => {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);
  console.log(id)
 
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
  },[id]);

  const [expediente, setExpediente] = React.useState({
    nombre: '',
    edad: '',
    fecha_nacimiento: '',
    sexo: '',
    correo: '',
    telefono: '',
    numid: null,
    estado_civil: '',
    padecimientos: '',
    ocupacion: ''
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
  const defaultValue = expediente.sexo;
  console.log(defaultValue)
 

  const handleChange = (e) => {
    setExpediente((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

  };
   console.log(expediente)
   console.log(expedienteData)



  return (
    <div>

      <div className='expedientesDiv'>
        {expedienteData.map((expediente) => (
          //maps must have a key if you decide to keey using them
          <div className='expedienteCard' key={expediente.idpaciente}>
            <h1>Editar Expediente</h1>
            <h2>{expediente.nombre_completo}</h2>

            <form >

              <input type="text" placeholder = "Nombre" defaultValue={expediente.nombre} onChange={handleChange} name='nombre' />
              <input type="number" placeholder="Edad" defaultValue={expediente.edad} onChange={handleChange} name='edad' />
              <input type="date" placeholder="Fecha Nacimiento" value={moment(expediente.fecha_nacimiento).format("YYYY-MM-DD")} onChange={handleChange} name='fecha_nacimiento' />
              <select onChange={handleChange}  defaultValue={defaultValue} name='sexo'>
                    <option value='M'>Masculino</option>
                    <option value='F'>Femenino</option>
                    <option value='O'>Otro</option>
                </select>
              <input type="email" placeholder="Correo" defaultValue={expediente.correo} onChange={handleChange} name='correo' />
              <input type="text" placeholder="Telefono" defaultValue={expediente.telefono} onChange={handleChange} name='telefono' />
              <input type="text" placeholder="Numero de Identidad" defaultValue={expediente.numid} onChange={handleChange} name='numid' />
              <input type="text" placeholder="Estado Civil" defaultValue={expediente.estado_civil} onChange={handleChange} name='estado_civil' />
              <input type="text" placeholder="Padecimientos" defaultValue={expediente.padecimientos} onChange={handleChange} name='padecimientos' />
              <input type="text" placeholder="Ocupacion" defaultValue={expediente.ocupacion} onChange={handleChange} name='ocupacion' />
              
              <button type="submit" onClick={() => EditHandler()}>Editar Expediente</button>
            </form>

          </div>
        ))}

      </div>
    </div>


  )

}


export default EditExpedientes;