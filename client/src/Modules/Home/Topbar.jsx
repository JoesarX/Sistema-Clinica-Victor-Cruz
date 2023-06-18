import 'bootstrap/dist/css/bootstrap.css';
import '../HojaDeEstilos/Topbar.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../AuthContext.js';
import React, { useContext, useState } from 'react';

const Topbar = () => {
    const { isLoggedIn, userType, handleSignOut } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleReturnClick = () => {
        navigate('/');
    };

    const handleIniciarClick = () => {
        navigate('/iniciarsesion');
    };

    const handleCitaClick = () => {
        navigate('/citas');
    };

    // const handleLabClick = () => {
    //     navigate('/laboratorio');
    // };

    const handleServicios = () => {
        navigate('/servicios');
    };

    const handleContactanos = () => {
        navigate('/contactanos');
    };

    const handleAcercade = () => {
        navigate('/acerca-de');
    };
//====Funciones para los dropdown menus ===============================================================
    const handleSignOutClick = () => {
        handleSignOut();
    }
    const handleMedicamentos = () => {
        navigate('/medicamentos');
    };
    const handleExpedientes = () => {
        navigate('/expedientes');
    };
    const handleColaboradores = () => {
        navigate('/colaboradores');
    };
    const handlePerfil = () => {
        // navigate('/dashboard');
    };
    const handleVerDashboard = () => {
        // navigate('/dashboard');
    };
    return (
        <nav class="navbar navbar-expand-lg custom-colors custom-navbar">
            <a class="navbar-brand custom-colors">LOGO</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuInfo" aria-controls="menuInfo" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse custom-colors justify-content-between" id="menuInfo">
                <ul class="navbar-nav mr-auto custom-colors">
                    <li class="nav-item text">
                        <a class="nav-link" onClick={handleReturnClick}>INICIO</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ACERCA DE
                        </a>
                        <div class="dropdown-menu custom-colors">
                            <a class="dropdown-item" onClick={handleAcercade}>SOBRE NOSOTROS</a>
                            <a class="dropdown-item" onClick={handleContactanos}>CONTÁCTANOS</a>
                        </div>
                    </li>
                    <li class="nav-item text" onClick={handleServicios}>
                        <a class="nav-link" >SERVICIOS</a>
                    </li>
                    <li class="nav-item text" onClick={handleCitaClick}>
                        <a class="nav-link" >AGENDA TU CITA</a>
                    </li>
                </ul>
                <ul class="navbar-nav custom-colors mr-0">
                    {!isLoggedIn && (
                        <li className="nav-item text">
                            <a class="nav-link" onClick={handleIniciarClick}><FontAwesomeIcon icon={faUser} /> INICIAR SESIÓN</a>
                        </li>
                    )}
                    {isLoggedIn && (
                        <div>
                            {userType === 'normal' && (
                                // Content for normal user dropdown menu
                                <li className="nav-item dropdown" style={{ width: '160px' }}>
                                    <div className="d-flex justify-content-end">
                                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        </a>
                                        <div className="dropdown-menu custom-colors" style={{ position: 'absolute' }}>
                                            <a className="dropdown-item" onClick={handlePerfil}>VER PERFIL</a>
                                            <a className="dropdown-item" onClick={handleSignOutClick}>CERRAR SESIÓN</a>
                                        </div>
                                    </div>
                                </li>


                            )}

                            {userType === 'administrador' && (
                                // Content for administrator dropdown menu
                                <li className="nav-item dropdown" style={{ width: '160px' }}>
                                    <div className="d-flex justify-content-end">
                                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        </a>
                                        <div className="dropdown-menu custom-colors" style={{ position: 'absolute' }}>
                                            <a class="dropdown-item" onClick={handleVerDashboard}>VER DASHBOARD</a>
                                            <a class="dropdown-item" onClick={handleSignOutClick}>CERRAR SESIÓN</a>
                                        </div>
                                    </div>
                                </li>
                            )}
                            {userType === 'master' && (
                                // Content for master user dropdown menu
                                <li className="nav-item dropdown" style={{ width: '160px' }}>
                                    <div className="d-flex justify-content-end">
                                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        </a>
                                        <div className="dropdown-menu custom-colors" style={{ position: 'absolute' }}>
                                            <a class="dropdown-item" onClick={handleMedicamentos}>MEDICAMENTOS</a>
                                            <a class="dropdown-item" onClick={handleExpedientes}>EXPEDIENTES</a>
                                            <a class="dropdown-item" onClick={handleColaboradores}>COLABORADORES</a>
                                            <a class="dropdown-item" onClick={handleSignOutClick}>CERRAR SESIÓN</a>
                                        </div>
                                    </div>
                                </li>
                            )}
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    );

};

export default Topbar;