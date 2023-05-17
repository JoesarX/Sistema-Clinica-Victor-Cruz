import React from 'react'
import '../HojaDeEstilos/Home.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';



const Home = () => {
    const navigate = useNavigate();
    const handleIniciarClick = () => {
        navigate('/iniciarsesion');
    };
    const handleLabClick = () => {
        navigate('/laboratorio');
    };
    return (
        <div className="scrollable-page">
            <header className="header">
                <div className="logo">Logo</div>
                <nav>
                    <div className="buttons">
                        <button >Inicio</button>
                        <button onClick={handleLabClick}>Laboratorio</button>
                        <button onClick={handleIniciarClick}>Iniciar Sesión</button>
                    </div>
                </nav>
            </header>



            <div className="container">
                <div class="background-div">
                    <div class="contentM">
                        <section className="vision-section">
                            <motion.h2
                                whileHover={{ scale: 1.1, color: 'light-grey' }}
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                Nuestra Vision
                            </motion.h2>
                            <motion.p
                                whileHover={{ scale: 1.1, color: 'light-grey' }}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 2, delay: 0.5 }}
                            >
                                Ser conocidos como la clínica médica y laboratorio de análisis clínicos que garantice
                                su excelencia en el servicio al paciente, la precisión de sus diagnósticos y la
                                atención personalizada de su personal de expertos altamente calificados.

                            </motion.p>
                        </section>
                    </div>
                    <div class="contentV">
                        <section className="mission-section">
                            <motion.h2
                                whileHover={{ scale: 1.1, color: 'light-grey' }}
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                Nuestra Mision
                            </motion.h2>
                            <motion.p
                                whileHover={{ scale: 1.1, color: 'light-grey' }}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                Nuestra misión en nuestra clínica médica y laboratorio de análisis clínicos es
                                proporcionar atención médica de alta calidad a nuestros pacientes, con énfasis en
                                la prevención, el diagnóstico y el tratamiento de enfermedades.
                            </motion.p>
                        </section>
                    </div>

                </div>
            </div>

            <div className="frame">
      <div className="biography-card">
        <div className="image-container">
          <div className="biography-container">
            <span>
              <h2>Dr. Victor Cruz</h2>
              <p>
                Especialista en Epidemiologia y Salud Ocupacional, con mas de 30 años como medico, tiene una larga experiencia sirviendo a la comunidad
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>

            <div>
                <h1>
                    Nuestra Ubicacion
                </h1>

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.2772379811036!2d-87.18158692600126!3d14.060799390066796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6fbd687c0d3b49%3A0xb5416f51d417978c!2sCl%C3%ADnica%20Dr.%20V%C3%ADctor%20Cruz%20Andino!5e0!3m2!1ses!2shn!4v1684216285312!5m2!1ses!2shn"
                    width="400"
                    height="300"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                ></iframe>
            </div>


            <div>
                <h1>
                    Agenda una Cita
                </h1>
            </div>

            <div>
                <h1>
                    Contactanos
                </h1>
            </div>



        </div>
    )
}

export default Home