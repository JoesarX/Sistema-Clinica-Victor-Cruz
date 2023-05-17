import React from 'react'
import '../HojaDeEstilos/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="scrollable-page">
            <header className="header">
                <div className="logo">Logo</div>
                <nav>
                    <div className="buttons">
                        <button>Inicio</button>
                        <button>Laboratorio</button>
                        <button>Iniciar Sesión</button>
                    </div>
                </nav>
            </header>
            <div class="background-div">
                <div class="contentM">
                    <h1>Mision</h1>
                    <p>Contenido</p>
                </div>
                <div class="contentV">
                    <h1>Vision</h1>
                    <p>Contenido</p>
                </div>
            </div>
            <div className="biography-card">
                <div className="image-container">
                </div>
                <div className="biography-container">
                    <h2>John Doe</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus massa a turpis
                        sollicitudin, eget molestie mi gravida. Nulla facilisi. Quisque a neque eu nibh feugiat
                        viverra vitae in justo. Nunc efficitur lacus nec diam tempus, vel fringilla velit cursus.
                        Integer ac leo nunc. Sed luctus neque in lacus semper efficitur. Donec efficitur erat id
                        semper ullamcorper.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home