import React from 'react'
import '../HojaDeEstilos/IniciarSesion.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuariosService from '../../Services/UsuariosService';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(await UsuariosService.loginUsuarios(email,password)){
         localStorage.setItem("isLoggedIn", true);
         alert("Bienvenido!");
         navigate("/expedientes"); 
        }else if(await UsuariosService.loginAdmin(email,password)){
            alert("Bienvenido admin!");
            localStorage.setItem("AdminLoggedIn", true);
            navigate("/Administrador"); 
        }else{
            alert("Email o contraseña incorrecta!");
        }

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
                            value={email}
                            onChange= {(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange= {(e) => setPassword(e.target.value)}
                        />
                    </div>
                    

                    <button type="submit" onClick={handleSubmit}>Iniciar Sesion</button>
                </form>
            </div>
        </div>


    )
}

export default IniciarSesion