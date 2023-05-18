import React from 'react'
import '../HojaDeEstilos/IniciarSesion.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const IniciarSesion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleReturnClick = () => {
        navigate('/');
    };

    const handleRegisternClick = () => {
        navigate('/registrar-user');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

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
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Nombre de Usuario: </label>
                        <input
                            type="email"
                            id="email"

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"

                        />
                    </div>
                    

                    <button type="submit">Iniciar Sesion</button>
                </form>
            </div>
        </div>


    )
}

export default IniciarSesion