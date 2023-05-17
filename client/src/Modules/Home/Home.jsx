import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const handlePacientesClick = () => {
        navigate('/pacientes');
    };
    return (  
        <div>
            <h1>Home</h1>
            <button onClick={handlePacientesClick}>Pacientes </button>
            
        </div>
        
    )
}

export default Home