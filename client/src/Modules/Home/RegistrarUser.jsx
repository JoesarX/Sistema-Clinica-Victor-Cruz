import React from 'react'
import '../HojaDeEstilos/RegistrarUser.css';
import { useNavigate } from 'react-router-dom';
import UsuariosService from '../../Services/UsuariosService';
import Footer from './Footer';



const RegistrarUser = () => {
  const validations = () => {
    const { correouser, nombre, edad, pregunta, respuesta, password } = user
    if (correouser === null || correouser === '') {
      alert('Correo es requerido')
      return false
    }
    if (nombre === null || nombre === '') {
      alert('Nombre Completo es requerido')
      return false
    }
    if (edad === null || edad === '' || edad < 0) {
      alert('Una edad valida es requerida')
      return false
    }


    if (pregunta === null || pregunta === '') {
      alert('La pregunta es requerido')
      return false
    }
    if (respuesta === null || respuesta === '') {
      alert('La respuesta es requerido')
      return false
    }
    if (password === null || password === '') {
      alert('La password es requerida')
      return false
    }
    return true
  }
  const [user, setUser] = React.useState({
    correouser: '',
    nombre: '',
    edad: '',
    pregunta: '',
    respuesta: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    console.log(user)
  };

  const handleSubmit = async e => {
    console.log(user)

    e.preventDefault();
    if (validations()) {
      e.preventDefault()
      await UsuariosService.postUsuarios(user);
      alert('User Agregado')
      navigate('/iniciarsesion');
    }


  }

  const handleReturnClick = () => {
    navigate('/');

  };



  return (

    <div className="scrollable-page">
      {/* <header className="headerT">
        <nav>
          <button className="bt" style={{ fontSize: '18px' }} onClick={handleReturnClick}>Volver a Inicio</button>
        </nav>
  </header> */}

      <Topbar />


      <div className="register-form">
        <h2>Registrar Usuario </h2>
        <form>
          <div className="form-group">
            <label htmlFor="correo">Correo: </label>
            <input
              type="text"


              onChange={handleChange}
              name="correouser"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">Nombre Completo:</label>
            <input type="text" onChange={handleChange} name='nombre' />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Edad:</label>
            <input
              type="number"
              id="edad"

              onChange={handleChange}
              name='edad'
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pregunta">Pregunta:</label>
            <select
              type="text"
              id="pregunta"

              onChange={handleChange}
              name='pregunta'
              required
            >
              <option value='Primera Mascota'>Nombre Primera Mascota</option>
              <option value='Nombre Madre'>Nombre de madre</option>
              <option value='Nombre Padre'>Nombre de padre</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="respuesta">Respuesta: </label>
            <input
              type="text"
              id="respuesta"
              name='respuesta'
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Constraseña: </label>
            <input
              type="password"
              id="password"
              name='password'
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" onClick={handleSubmit} >Registrar Usuario: </button>
        </form>
      </div>

      <Footer />

    </div>


  )

}

export default RegistrarUser