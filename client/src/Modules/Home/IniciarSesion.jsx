import React from 'react'
import '../HojaDeEstilos/IniciarSesion.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuariosService from '../../Services/UsuariosService';


const IniciarSesion = () => {
    
    const [rememberMe, setRememberMe] = useState(false);
    
    
    const navigate = useNavigate();
    
    
    
    const handleReturnClick = () => {
        navigate('/');
    };

    const handleRegisternClick = () => {
        navigate('/registrar-user');
    };

    const handleSubmit = async e => {
        e.preventDefault();
        
        
      
  }
  
    return (

        <div className="scrollable-page">
            <header className="header">
                <div className="logo">Logo</div>
                <nav>
                    <div className="buttons">
                        <button onClick={handleReturnClick}>Volver a Inicio</button>
                        <button onClick={handleRegisternClick}>Registrarse</button>
                    </div>
                </nav>
            </header>

            <div></div>

            <div className="login-form">
                <h2>Iniciar Sesion</h2>
                <form >
                    <div className="form-group">
                        <label htmlFor="email">Nombre de Usuario: </label>
                        <input
                            type="email"
                            id="email"
                            
                            name='correouser'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" >Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                           
                            name='password'
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit} >Iniciar Sesion</button>
                    
                    
                </form>
            </div>
        </div>


    )
}

export default IniciarSesion