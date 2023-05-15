import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Pacientes = () => {
  const [pacientes, setPacientes] = React.useState([])

  React.useEffect(() => {
    const fetchAllPacientes = async () => {
      try {
        const res = await axios.get('http://localhost:8000/pacientes')
        //console.log(res.data)
        setPacientes(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllPacientes()
  }, [])


  return (
    <div>
      <h1>Pacientes</h1>
      <div className='pacientesDiv'>
        {pacientes.map((paciente) => (
          //maps must have a key if you decide to keey using them
          <div className='pacienteCard' key={paciente.id}>
            <h2>{paciente.nombre_completo}</h2>
            <p>
              <b>Estado Civil:</b> {paciente.estado_civil}<br/>
              <b>Edad:</b> {paciente.edad} años<br/>
              <b>Direccion:</b> {paciente.direccion}<br/>
              <b>Telefono Celular:</b> {paciente.telefono}<br/>
              <b>Correo Electronico:</b> {paciente.correo}<br/>
            </p>
          </div>
        ))}
          
      </div>
    </div>
  )
}

export default Pacientes