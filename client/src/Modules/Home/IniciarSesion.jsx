import React from 'react'
import '../HojaDeEstilos/IniciarSesion.css';
import { useState ,useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import UsuariosService from '../../Services/UsuariosService';
import { loginAdmin,loginMaster } from '../../Services/AdministradoresService';
import { AuthContext } from '../AuthContext.js';

import Footer from './Footer';
import Topbar from './Topbar';

const IniciarSesion = () => {
    const yaEsta = localStorage.getItem("400");
    const { isLoggedIn, handleSignIn } = useContext(AuthContext);
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
    useEffect(() => {
        // Validación login
        if (yaEsta) {
           // Redirigir si no se cumple la verificación
           navigate("/expedientes"); // Redirige a la página de inicio de sesión
        }
     } );
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Este es el email: " + email);
        console.log("Esta es la clave: " + password);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email) != true) {
            alert('El correo ingresado no tiene un formato válido.')
            
        }else{
            if (email === "" || password === "") {
                alert("Debe Llenar todos los campos");
            } else if (await UsuariosService.loginUsuarios(email, password)) {
                    localStorage.setItem("100", true);
                    alert("Bienvenido!");
                    navigate("/expedientes");
                    handleSignIn();
                } else if (await loginMaster(email, password)===true) {
                    alert("Bienvenido Doctor!");
                    localStorage.setItem("400", true);
                    navigate("/expedientes");
                    handleSignIn();
                } else if (await loginAdmin(email, password)===true){
                    alert("Bienvenido");
                    localStorage.setItem("300", true);
                    navigate("/expedientes");
                    handleSignIn();
                }else {
                    alert("Email o contraseña incorrecta!");
                }
        }
        

    };

    return (

        <div className="scrollable-page">
            <Topbar  />
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
                        <label  htmlFor="password">Contraseña</label>
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