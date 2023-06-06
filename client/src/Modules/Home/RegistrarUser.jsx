import React from 'react'
import '../HojaDeEstilos/RegistrarUser.css';
import { useNavigate } from 'react-router-dom';
import UsuariosService from '../../Services/UsuariosService';
import Footer from './Footer';
import Topbar from './Topbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

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
    if (!validateCapital && !validateLength && !validateSpecial && !validateNumber) {
      return false;
    }

    return true
  }

  const validateLength = (password) => {
    return password.length >= 8;
  };

  // MAGIA DE REGEX WOWWWWWW
  const validateCapital = (password) => {
    return /[A-Z]/.test(password);
  };

  const validateNumber = (password) => {
    return /\d/.test(password);
  };

  const validateSpecial = (password) => {
    return /[!@#$%^&*_;':"|,.<>/?]/.test(password);
  };
  // FIN DE MAGIA DE REGEX WOWWW

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

  return (

    <div className="scrollable-page">
      <Topbar />
      <div className="register-form">
        <h2>Registrar usuario</h2>
        <form class='register-details'>
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico*</label>
            <input
              type="text"
              onChange={handleChange}
              name="correouser"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">Nombre Completo*</label>
            <input type="text" onChange={handleChange} name='nombre' />
          </div>
          <div className="form-group">
            <label htmlFor="edad">Edad*</label>
            <input
              type="number"
              id="edad"
              onChange={handleChange}
              name='edad'
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pregunta">Pregunta de Seguridad*</label>
            <select
              className='select select-normal-height'
              type="text"
              id="pregunta"
              onChange={handleChange}
              name='pregunta'
              required
            >
              <option value='Nombre Madre' className='select-normal-height option'>¿Cuál es el nombre de tu madre?</option>
              <option value='Nombre Padre' className='select-normal-height option'>¿Cuál es el nombre de tu padre?</option>
              <option value='Primera Mascota' className='select-normal-height option'>¿Cuál es el nombre de tu primera mascota?</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="respuesta">Respuesta* </label>
            <input
              type="text"
              id="respuesta"
              name='respuesta'
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña*</label>
            <input
              type="password"
              id="password"
              name='password'
              onChange={handleChange}
              required
            />
          </div>

          {/* FUNKY COSAS DE CONTRASEÑAS */}
          <div className="pw-validation-area">
            <div className="pw-item">
              <FontAwesomeIcon icon={validateLength(user.password) ? faCircleCheck : faCircleXmark}
                className={`icon ${validateLength(user.password) ? 'valid' : ''}`} />
              <div className="spacing" />
              Ocho (8) carácteres mínimo
            </div>
            <div className="pw-item">
              <FontAwesomeIcon icon={validateCapital(user.password) ? faCircleCheck : faCircleXmark}
                className={`icon ${validateCapital(user.password) ? 'valid' : ''}`} />
              <div className="spacing" />
              Una (1) MAYÚSCULA mínimo
            </div>
            <div className="pw-item">
              <FontAwesomeIcon icon={validateNumber(user.password) ? faCircleCheck : faCircleXmark}
                className={`icon ${validateNumber(user.password) ? 'valid' : ''}`} />
              <div className="spacing" />
              Un (1) carácter numérico mínimo
            </div>
            <div className="pw-item">
              <FontAwesomeIcon icon={validateSpecial(user.password) ? faCircleCheck : faCircleXmark}
                className={`icon ${validateSpecial(user.password) ? 'valid' : ''}`} />
              <div className="spacing" />
              Un (1) carácter especial (!, @, #, $, etc.)
            </div>
          </div>
          {/* FIN FUNKY COSAS DE CONTRASEÑAS */}

          <button type="submit" onClick={handleSubmit} >Registrarse</button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default RegistrarUser