import React from 'react'
import '../HojaDeEstilos/IniciarSesion.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuariosService from '../../Services/UsuariosService';
import Footer from './Footer';
import Topbar from './Topbar'

const IniciarSesion = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const Master='vcruza23@yahoo.com';
    const Mpassword='clinic-master@vc@2023';
    const handleReturnClick = () => {
        navigate('/');
    };

    const handleRegisternClick = () => {
        navigate('/registrar-user');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Este es el email: " + email);
        console.log("Esta es la clave: " + password);

       
        if(await UsuariosService.loginUsuarios(email,password)){
         localStorage.setItem("isLoggedIn", true);
         alert("Bienvenido!");
         navigate("/expedientes"); 
        }else if(email==Master && Mpassword==password){
            alert("Bienvenido Doctor!");
            localStorage.setItem("AdminLoggedIn", true);
            navigate("/Administrador"); 
        }else{
            alert("Email o contraseña incorrecta!");
        }

    };

    return (

        <div className="scrollable-page">
            <Topbar />
            <div></div>
            <div className="login-form">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} class='login-details'>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit}>Iniciar Sesión</button>
                    <a onClick={handleRegisternClick}>Crear mi cuenta</a>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default IniciarSesion