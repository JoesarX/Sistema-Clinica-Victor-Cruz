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
        <div>
            <Topbar />
            <section id="contact" className="d-flex flex-column justify-content-center align-items-center">
                <div className="container text-center text-md-left" data-aos="fade-up">
                    <h1>Contáctanos</h1>
                </div>
                <div className="container text-center text-md-left" data-aos="fade-up">
                    <h2>¿Tienes alguna duda? Puedes entrar en contacto con nosotros y con gusto te ayudamos.</h2>
                </div>
            </section>
            <h4 className="subtitle">Puedes contactarte con nosotros por los siguientes medios.</h4>
            <section className="medios">
                <div className="cont">
                    <div className="box">
                        <h4 style={{ color: '#1E60A6' }}>Llamada telefónica</h4>
                        <p style={{ color: '#1E60A6' }}>Puedes llamarnos al número</p>
                        <FontAwesomeIcon icon={faPhone} style={{ color: '#1560F2' }} />
                        <span style={{ color: '#1E60A6', fontWeight: 'bold' }}> +504 2230-3901</span>
                    </div>
                    <div className="box" onClick={openWhatsApp}>
                        <h4 style={{ color: '#1E60A6' }}>WhatsApp</h4>
                        <p style={{ color: '#1E60A6' }}>Puedes escribirnos al número</p>
                        <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '19px', color: '#1560F2' }} />
                        <span style={{ color: '#1E60A6', fontWeight: 'bold' }}> +504 3342-4985</span>
                    </div>
                    <div className="box" onClick={openEmail}>
                        <h4 style={{ color: '#1E60A6' }}>Correo Electrónico</h4>
                        <p style={{ color: '#1E60A6' }}>Puedes escribirnos al correo</p>
                        <FontAwesomeIcon icon={faEnvelope} style={{ color: '#1560F2' }} />
                        <span style={{ color: '#1E60A6', fontWeight: 'bold' }}> clinica.drvictorcruz@gmail.com</span>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Contactanos;
