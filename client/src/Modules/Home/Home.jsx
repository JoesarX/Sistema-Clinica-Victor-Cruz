import React from 'react'
import '../HojaDeEstilos/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="scrollable-page">
            <header className="header">
                <div className="logo">Your Logo</div>
                <nav>
                    <div className="buttons">
                        <button>Inicio</button>
                        <button>Laboratorio</button>
                        <button>Iniciar Sesión</button>
                    </div>
                </nav>
            </header>
            <div className="background-div">
                Mision
            </div>
        </div>
    )
}

export default Home