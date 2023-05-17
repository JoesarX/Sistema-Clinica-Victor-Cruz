import React from 'react'
import { useNavigate } from 'react-router-dom';
import PacientesService from '../../Services/PacientesService';

const AddPacientes = () => {
    const [paciente, setPaciente] = React.useState({
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

    const handleChange = (e) => {
        setPaciente((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    // console.log(pacientes)
    const handleSubmit = async e => {
        if (validations()) {
            e.preventDefault()
            await PacientesService.postPaciente(paciente);
            alert('Paciente Agregado')
            navigate('/pacientes')
        }   
    }

    const validations = () => {
        const { nombre_completo, estado_civil, edad, direccion, telefono } = paciente
        if (nombre_completo === null || nombre_completo === '') {
            alert('Nombre Completo es requerido')
            return false
        }
        if (estado_civil === null || estado_civil === '') {
            alert('Estado Civil es requerido')
            return false
        }
        if (edad === null || edad === '') {
            alert('Edad es requerido')
            return false
        }
        if (direccion === null || direccion === '') {
            alert('Direccion es requerido')
            return false
        }
        if (telefono === null || telefono === '') {
            alert('Telefono es requerido')
            return false
        }
        return true
    }

    return (
        <div>
            <h1>Agregar un Paciente</h1>
            <form>
                <input type="text" placeholder="Nombre Completo" onChange={handleChange} name='nombre_completo' />
                <input type="text" placeholder="Estado Civil" onChange={handleChange} name='estado_civil' />
                <input type="number" placeholder="Edad" onChange={handleChange} name='edad' />
                <input type="text" placeholder="Direccion" onChange={handleChange} name='direccion' />
                <input type="text" placeholder="Telefono Celular" onChange={handleChange} name='telefono' />
                <input type="text" placeholder="Correo Electronico" onChange={handleChange} name='correo' />
                <input type="text" placeholder="Padecimientos y Alergias" onChange={handleChange} name='padecimientos' />
                <input type="text" placeholder="Enfermedades" onChange={handleChange} name='enfermedades' />
                <input type="text" placeholder="Medicamentos" onChange={handleChange} name='medicamentos' />
                <button type="submit" onClick={handleSubmit}>Agregar Paciente</button>
            </form>
        </div>
    )
}

export default AddPacientes