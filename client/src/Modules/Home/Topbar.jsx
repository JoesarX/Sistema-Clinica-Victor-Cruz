import 'bootstrap/dist/css/bootstrap.css';
import '../HojaDeEstilos/Topbar.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Topbar = () => {

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

    return (
        <nav class="navbar navbar-expand-md custom-colors custom-navbar">
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
                    <li class="nav-item text">
                        <a class="nav-link" onClick={handleIniciarClick}><FontAwesomeIcon icon={faUser} /> INICIAR SESIÓN</a>
                    </li>
                </ul>
            </div>
        </nav>
    );

};

export default Topbar;