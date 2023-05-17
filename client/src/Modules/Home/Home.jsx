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
        <div>
            <h1>Home</h1>
            <button onClick={handlePacientesClick}>Pacientes </button>
        </div>
    )
}

export default Home