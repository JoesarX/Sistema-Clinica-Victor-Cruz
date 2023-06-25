import React, { useRef } from 'react'
import '../HojaDeEstilos/IniciarSesion.css';

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuariosService from '../../Services/UsuariosService';
import { loginAdmin, loginMaster } from '../../Services/AdministradoresService';
import { AuthContext } from '../AuthContext.js';
import { loginUsuarios } from '../../Services/UsuariosService';
import Footer from './Footer';
import Topbar from './Topbar'
import bcrypt from 'bcryptjs';

const IniciarSesion = () => {
    
    const yaEsta = localStorage.getItem("400");
    const { isLoggedIn, handleSignIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passie = useRef();
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
    });

    const handlePassword = (e) => {
        e.preventDefault();
        const passwordd = passie.current.value;
        const hashedPass = bcrypt.hashSync(passwordd, 10);
        console.log(hashedPass)
        console.log(passwordd)
        setPassword(hashedPass)

    };

    async function validateHash() {
        const passUser = await UsuariosService.loginUsuarios(email, password);
        console.log(passUser)
        var flag = false;
        bcrypt.compare(password, passUser, function (err, isMatch) {
            console.log("deberia entrar")
            if (err) {
                throw err
            } else if (!isMatch) {
                alert("Contraseña incorrecta")
                console.log("Contraseña incorrecta")
                flag = false;
                console.log(flag)
            } else {
                console.log("Contraseña correcta")
                flag = true;
                console.log(flag)
            }
        })

        console.log(flag)

        if (flag) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Este es el email: " + email);
        console.log("Esta es la clave: " + password);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var flag = false;
        if (emailRegex.test(email) != true) {
            alert('El correo ingresado no tiene un formato válido.')
        } else {
            const passUser = await loginUsuarios(email, password);
            console.log(passUser)
            var flag = false;
            localStorage.setItem("100", true);
            handleSignIn('normal');
            if (passUser === "") {
                console.log("Not found!")
                console.log(":()()()")
            } else {
                await new Promise((resolve, reject) => {
                    bcrypt.compare(password, passUser, function (err, isMatch) {
                        console.log("deberia entrar")
                        if (err) {
                            throw err
                        } else if (!isMatch) {
                            alert("Contraseña incorrecta")
                            console.log("Contraseña incorrecta")
                        } else {
                            flag = true;
                            console.log(flag)
                            localStorage.setItem("300", true);
                            localStorage.setItem("correo", email);
                            navigate("/userpage");
                            alert("Bienvenido!");
                            handleSignIn('normal');
                            resolve();
                        }
                    })
                    console.log(":(")
                });
            }
            console.log(flag)
            console.log(":)")
            if (!flag) {
                if (email === "" || password === "") {
                    alert("Debe Llenar todos los campos");
                } else if (await loginMaster(email, password) === true) {
                    alert("Bienvenido Doctor!");
                    localStorage.setItem("400", true);
                    localStorage.setItem("correo", email);
                    handleSignIn('master');
                    navigate("/expedientes");
                } else if (await loginAdmin(email, password) === true) {
                    alert("Bienvenido");
                    handleSignIn('administrador');
                    localStorage.setItem("300", true);
                    localStorage.setItem("correo", email);
                    navigate("/expedientes");
                } else {
                    alert("Email o contraseña incorrecta!");
                }
            }
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
                            ref={passie}

                            onChange={(e) => setPassword(e.target.value)}
                            required
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