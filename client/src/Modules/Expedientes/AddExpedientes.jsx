import React from 'react'
import { useNavigate } from 'react-router-dom';
import ExpedientesService from '../../Services/ExpedientesService';

const AddExpedientes = () => {
    {/* req.body.nombre,
        req.body.edad,
        req.body.fecha_nacimiento,
        req.body.sexo,
        req.body.correo,
        req.body.telefono,
        req.body.numid,
        req.body.estado_civil,
        req.body.padecimientos,
        req.body.ocupacion */}
    const [expediente, setExpediente] = React.useState({
        nombre: '',
        edad: '',
        fecha_nacimiento: '',
        sexo: 'Masculino',
        correo: '',
        telefono: '',
        numid: null,
        estado_civil: '',
        padecimientos: '',
        ocupacion: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        setExpediente((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
        console.log(expediente)
    }
    // console.log(expedientes)
    const handleSubmit = async e => {
        e.preventDefault();
        if (validations()) {
            e.preventDefault()
            await ExpedientesService.postExpedientes(expediente);
            alert('Expediente Agregado')
            navigate('/expedientes')
        }   
    }

    const validations = () => {
        const {  nombre, edad, fecha_nacimiento, sexo, correo, telefono, numid, estado_civil, padecimientos, ocupacion } = expediente
        if (nombre === null || nombre === '') {
            alert('Nombre Completo es requerido')
            return false
        }
        if (edad === null || edad === '' || edad < 0) {
            alert('Una edad valida es requerida')
            return false
        }
        const selectedDate = new Date(fecha_nacimiento);
        const currentDate = new Date();
        if (isNaN(selectedDate.getTime())) {
            alert('Una Fecha valida de Nacimiento es requerida');
            return false;
        }
        if( selectedDate > currentDate){
            alert('La Fecha de Nacimiento no puede ser mayor a la fecha actual');
            return false;
        }
        if(sexo === null || sexo === ''){
            alert('Sexo es requerido')
            return false
        }
        if (estado_civil === null || estado_civil === '') {
            alert('Estado Civil es requerido')
            return false
        }
        return true
    }
console.log("hola");
    return (
        <div>
            <h1>Agregar un Expediente</h1>
            <form>
                <input type="text" placeholder="Nombre Completo"  onChange={handleChange} name='nombre' />
                <input type="number" placeholder="Edad"  onChange={handleChange} name='edad' />
                <input type="date" placeholder="Fecha de Nacimiento"  onChange={handleChange} name='fecha_nacimiento' />
                <select onChange={handleChange} name='sexo'>
                    <option value='Masculino'>Masculino</option>
                    <option value='Femenino'>Femenino</option>
                    <option value='Otro'>Otro</option>
                </select>
                
                <input type="email" placeholder="Correo"  onChange={handleChange} name='correo' />
                <input type="text" placeholder="Telefono"  onChange={handleChange} name='telefono' />
                <input type="number" placeholder="Numero de Identidad"  onChange={handleChange} name='numid' />
                <input type="text" placeholder="Estado Civil"  onChange={handleChange} name='estado_civil' />
                <input type="text" placeholder="Padecimientos"  onChange={handleChange} name='padecimientos' />
                <input type="text" placeholder="Ocupacion"  onChange={handleChange} name='ocupacion' />
                <button type="submit" onClick={handleSubmit}>Agregar Expediente</button>
            </form>
        </div>
    )
}

export default AddExpedientes