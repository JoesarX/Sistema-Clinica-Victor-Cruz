import 'bootstrap/dist/css/bootstrap.css';
import '../HojaDeEstilos/Topbar.css'
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../AuthContext.js';
import React, { useContext } from 'react';

const Topbar = () => {
    const nombre = localStorage.getItem("loggedInUserName");
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

    const handleLaboratorio = () => {
         navigate('/laboratorio');
    };

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
        localStorage.clear();
        navigate('/');
        handleSignOut();
    };
    const handleMedicamentos = () => {
        navigate('/medicamentos');
    };
    const handleExpedientes = () => {
        navigate('/expedientes');
    };
    const handleColaboradores = () => {
        navigate('/administrador');
    };

    const handleCitas = () => {
        navigate('/citas_tabla');
    };

    const handlePerfil = () => {
        navigate('/userpage');
    };
    const handleVerDashboard = () => {
        // navigate('/dashboard');
    };
    return (
        <nav class="navbar navbar-expand-lg custom-colors custom-navbar">
            <div class="navbar-brand custom-colors">LOGO</div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuInfo" aria-controls="menuInfo" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse custom-colors justify-content-between" id="menuInfo">
                <ul class="navbar-nav mr-auto custom-colors">
                    <li class="nav-item text">
                        <div class="nav-link" onClick={handleReturnClick}>INICIO</div>
                    </li>
                    <li class="nav-item dropdown">
                        <div class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ACERCA DE
                        </div>
                        <div class="dropdown-menu custom-colors">
                            <div class="dropdown-item" onClick={handleAcercade}>SOBRE NOSOTROS</div>
                            < div class="dropdown-item" onClick={handleContactanos}>CONTÁCTANOS</div>
                        </div>
                    </li>
                    
                    
                    <li class="nav-item dropdown">
                        <div class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            SERVICIOS
                        </div>
                        <div class="dropdown-menu custom-colors">
                            <div class="dropdown-item" onClick={handleServicios}>CLINICA</div>
                            < div class="dropdown-item" onClick={handleLaboratorio}>LABORATORIO</div>
                        </div>
                    </li>
                    
                    <li class="nav-item text" onClick={handleCitaClick}>
                        <div class="nav-link" >AGENDA TU CITA</div>
                    </li>
                </ul>
                <ul class="navbar-nav custom-colors mr-0">
                    {!isLoggedIn && (
                        <li className="nav-item text">
                            <div class="nav-link" onClick={handleIniciarClick}><FontAwesomeIcon icon={faUser} /> INICIAR SESIÓN</div>
                        </li>
                    )}
                    {isLoggedIn && (
                        <div>
                            {userType === 'normal' && (
                                // Content for normal user dropdown menu
                                <li className="nav-item dropdown" style={{ width: '160px' }}>
                                    <div className="d-flex justify-content-end">
                                        <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span style={{fontSize: '18px'}}>{nombre}</span>
                                        </div>
                                        <div className="dropdown-menu custom-colors" style={{ position: 'absolute' }}>
                                            <div className="dropdown-item" onClick={handlePerfil}>VER PERFIL</div>
                                            <div className="dropdown-item" onClick={handleSignOutClick}>CERRAR SESIÓN</div>
                                        </div>
                                    </div>
                                </li>


                            )}

                            {userType === 'administrador' && (
                                // Content for administrator dropdown menu
                                <li className="nav-item dropdown" style={{ width: '160px' }}>
                                    <div className="d-flex justify-content-end">
                                        <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span style={{fontSize: '18px'}}>{nombre}</span>
                                        </div>
                                        <div className="dropdown-menu custom-colors" style={{ position: 'absolute' }}>
                                            < div class="dropdown-item" onClick={handleVerDashboard}>VER DASHBOARD</div>
                                            <div class="dropdown-item" onClick={handleSignOutClick}>CERRAR SESIÓN</div>
                                        </div>
                                    </div>
                                </li>
                            )}
                            {userType === 'master' && (
                                // Content for master user dropdown menu
                                <li className="nav-item dropdown" style={{ width: '160px' }}>
                                    <div className="d-flex justify-content-end">
                                        <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span style={{fontSize: '18px'}}>{nombre}</span>
                                        </div>
                                        <div className="dropdown-menu custom-colors" style={{ position: 'absolute' }}>
                                            <div class="dropdown-item" onClick={handleMedicamentos}>MEDICAMENTOS</div>
                                            <div class="dropdown-item" onClick={handleExpedientes}>EXPEDIENTES</div>
                                            <div class="dropdown-item" onClick={handleColaboradores}>COLABORADORES</div>
                                            <div class="dropdown-item" onClick={handleCitas}>CITAS</div>
                                            <div class="dropdown-item" onClick={handleSignOutClick}>CERRAR SESIÓN</div>
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