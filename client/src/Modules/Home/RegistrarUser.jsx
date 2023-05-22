import React from 'react'
import '../HojaDeEstilos/RegistrarUser.css';
import { useNavigate } from 'react-router-dom';
import UsuariosService from '../../Services/UsuariosService';


const RegistrarUser = () => {
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
          await UsuariosService.postUsuarios(user);
          alert('User Agregado')
          navigate('/iniciarsesion');
      
  }

    const handleReturnClick = () => {
      navigate('/');

    };

    return (

      <div className="scrollable-page">
        <header className="header">
          <div className="logo">Logo</div>
          <nav>
            <div className="buttons">
              <button onClick={handleReturnClick}>Volver a Inicio</button>

            </div>
          </nav>
        </header>


        <div className="register-form">
          <h2>Registrar Usuario </h2>
          <form>
            <div className="form-group">
              <label htmlFor="correo">Correo: </label>
              <input
                type="text"
               
               
                onChange={handleChange}
                name = "correouser"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">Nombre Completo:</label>
              <input type="text"  onChange={handleChange} name='nombre' />
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
                type="respuesta"
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

      </div>


    )
  
}

export default RegistrarUser