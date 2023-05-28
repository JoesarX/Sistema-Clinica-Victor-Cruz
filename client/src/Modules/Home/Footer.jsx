import 'bootstrap/dist/css/bootstrap.css';
import '../HojaDeEstilos/Footer.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';

const Topbar = () => {

    const navigate = useNavigate();

    const handleReturnClick = () => {
        navigate('/');
    };

    const handleIniciarClick = () => {
        navigate('/iniciarsesion');
    };

    // const handleCitaClick = () => {
    //     navigate('/citas');
    // };

    // const handleLabClick = () => {
    //     navigate('/laboratorio');
    // };

    const handleServicios = () => {
        navigate('/servicios');
    };

    const handleAcercade = () => {
        navigate('/acerca-de');
    };

    return (
        <footer class="text-center text-lg-start custom-colors custom-footer">
            <section class="d-flex justify-content-between py-2 px-0 border-bottom footer-info">
                <div class="row justify-content-md-center footer-info mb-2">
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto text-center">
                        <FontAwesomeIcon icon={faHome} />
                        <div class="spacing" />
                        Colonia Kennedy, Tegucigalpa, M.D.C, Honduras</div>
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto text-center">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <div class="spacing" />
                        clinica.drvictorcruz@gmail.com
                    </div>
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto text-center">
                        <FontAwesomeIcon icon={faPhone} />
                        <div class="spacing"/>
                        +504 2230-3901
                    </div>
                </div>
            </section>
            <div class="py-2 px-4 smalltext-copyright">
                © 2023 Clínica Dr. Víctor Cruz
            </div>
        </footer>
    );

};

export default Topbar;