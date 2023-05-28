import React from 'react';
import '../HojaDeEstilos/Contactanos.css';
import Topbar from './Topbar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Contactanos = () => {
    const openWhatsApp = () => {
        window.open('https://wa.me/+50433424985', '_blank');
    };

    const openEmail = () => {
        window.open('mailto:clinica.drvictorcruz@gmail.com', '_blank');
    };

    return (
        <div >
            <Topbar />
            <section id="contact" class="d-flex flex-column justify-content-center align-items-center">
                <div class="container text-center text-md-left" data-aos="fade-up">
                    <h1>Contáctanos</h1>
                </div>
                <div class="container text-center text-md-left" data-aos="fade-up">
                    <h2>¿Tienes alguna duda? Puedes entrar en contacto con nosotros y con gusto te ayudamos.</h2>
                </div>
            </section>
            <h4 className='subtitle'>Puedes contactarte con nosostros por los siguientes medios.</h4>
            <section className="medios">
                <div className="cont">
                    <div className="box">
                        <h4>Llamada telefónica</h4>
                        <p>Puedes llamarnos al número</p>
                        <FontAwesomeIcon icon={faPhone} />
                        <span> +504 2230-3901</span>
                    </div>
                    <div className="box" onClick={openWhatsApp}>
                        <h4>WhastApp</h4>
                        <p>Puedes escribirnos al número</p>
                        <FontAwesomeIcon icon={faWhatsapp} />
                        <span> +504 3342-4985</span>
                    </div>
                    <div className="box" onClick={openEmail}>
                        <h4>Correo Electrónico</h4>
                        <p>Puedes escribirnos al correo</p>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span> clinica.drvictorcruz@gmail.com</span>
                    </div>
                </div>
            </section>
            <Footer />
        </div >
    );
};

export default Contactanos;
