import React from 'react';
import '../HojaDeEstilos/Acercade.css';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const Acercade = () => {


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
  const handleLabClick = () => {
      navigate('/laboratorio');
  };


  const handleServicios = () => {
      navigate('/servicios');
  };

  const handleAcercade = () => {
      navigate('/acerca-de');
  };

  function mostrarBotones1() {
    var boton1 = document.getElementById('bt1');
    var boton2 = document.getElementById('bt2');
    var div1 = document.getElementById('m1');
    var div2 = document.getElementById('mi1');
    div1.style.display = 'block';
    div2.style.display = 'block';
    boton1.style.visibility = 'visible';
    boton1.style.top = '30px';
    boton2.style.visibility = 'visible';
    boton2.style.top = '60px';
}

function ocultarBotones1() {
    var boton1 = document.getElementById('bt1');
    var boton2 = document.getElementById('bt2');
    var div2 = document.getElementById('mi1');
    div2.style.display = 'none';
    boton1.style.visibility = 'hidden';
    boton2.style.visibility = 'hidden';
}

function mostrarBotones2() {
    var boton1 = document.getElementById('bt3');
    var boton2 = document.getElementById('bt4');
    var div1 = document.getElementById('m2');
    var div2 = document.getElementById('mi2');
    div1.style.display = 'block';
    div2.style.display = 'block';
    boton1.style.visibility = 'visible';
    boton1.style.top = '30px';
    boton2.style.visibility = 'visible';
    boton2.style.top = '60px';
}

function ocultarBotones2() {
    var boton1 = document.getElementById('bt3');
    var boton2 = document.getElementById('bt4');
    var div2 = document.getElementById('mi2');
    div2.style.display = 'none';
    boton1.style.visibility = 'hidden';
    boton2.style.visibility = 'hidden';
}

window.onload = function () {
    ocultarBotones1();
    ocultarBotones2();
    var botonPrincipal = document.getElementById('btp1');
    var botonPrincipal2 = document.getElementById('btp2');
    botonPrincipal.addEventListener('mouseenter', mostrarBotones1);
    botonPrincipal.addEventListener('mouseleave', ocultarBotones1);
    botonPrincipal2.addEventListener('mouseenter', mostrarBotones2);
    botonPrincipal2.addEventListener('mouseleave', ocultarBotones2);
};


  const properties = {
      duration: 3000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      arrows: true
  };




  const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
  };



  return (
        <div className="scrollable-page">
            <header className="headerT">
                <button className="bt" style={{ fontSize: '18px' }} onClick={handleReturnClick}>INICIO</button>
                <button className="bt" style={{ fontSize: '18px' }} onClick={handleLabClick}>LABORATORIO</button>
                <button className="bt" style={{ fontSize: '18px' }} onClick={handleIniciarClick}>INICIAR SESIÓN</button>
                <button className="bt1" style={{ fontSize: '18px' }} id="btp1" onMouseEnter={mostrarBotones1}
                    onMouseLeave={ocultarBotones1}>ACERCA DE
                    <div className="menu_desplegable" id='m1'>
                        <div className="menu_item" id='mi1'>
                            <button className='bt_menu' id='bt1' onClick={handleAcercade}>Sobre Nosotros</button>
                            <button className='bt_menu' id='bt2' onClick={handleAcercade}>Contáctanos</button>
                        </div>
                    </div>
                </button>
                <button className="bt2" style={{ fontSize: '18px' }} id="btp2" onMouseEnter={mostrarBotones2}
                    onMouseLeave={ocultarBotones2}>SERVICIOS
                    <div className="menu_desplegable" id='m2'>
                        <div className="menu_item" id='mi2'>
                            <button className='bt_menu' id='bt3' onClick={handleServicios}>Servicios</button>
                            <button className='bt_menu' id='bt4' onClick={handleServicios}>Otros Servicios</button>
                        </div>
                    </div>
                </button>
            </header>
            
        </div>
  );
};

export default Acercade;