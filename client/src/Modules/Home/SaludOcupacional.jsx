import React, { useState } from 'react';
import '../HojaDeEstilos/SaludOcupacional.css';
import { useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import Footer from './Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faHouseMedicalFlag } from '@fortawesome/free-solid-svg-icons';
import Services from '../../Services/texto_cmdService';

import { useEffect, useCallback } from 'react'
import DoctorImg from '../Imagenes/doctorPhoto.jpg'

const SaludOcupacional = () => {
    const [tituloSaludOcupacional, setTituloSaludOcupacional] = React.useState({
        Tipo: 'tituloSaludOcupacional',
        texto_campo: ''
    })
    const [textoQueEsSaludOcupacional, setTextoQueEsSaludOcupacional] = React.useState({
        Tipo: 'textoQueEsSaludOcupacional',
        texto_campo: ''
    })
    const [porqueImporta, setPorqueImporta] = React.useState({
        Tipo: 'porqueImporta',
        texto_campo: ''
    })

    const [textoPorqueImporta, setTextoPorqueImporta] = React.useState({
        Tipo: 'textoPorqueImporta',
        texto_campo: ''
    })

    const [subTituloSaludOcupacional, setSubTituloSaludOcupacional] = React.useState({
        Tipo: 'subTituloSaludOcupacional',
        texto_campo: ''
    })

    const [tituloItem1SaludOcupacional, setTituloItem1SaludOcupacional] = React.useState({
        Tipo: 'tituloItem1SaludOcupacional',
        texto_campo: ''
    })

    const [tituloItem2SaludOcupacional, setTituloItem2SaludOcupacional] = React.useState({
        Tipo: 'tituloItem2SaludOcupacional',
        texto_campo: ''
    })
    const [tituloItem3SaludOcupacional, setTituloItem3SaludOcupacional] = React.useState({
        Tipo: 'tituloItem3SaludOcupacional',
        texto_campo: ''
    })

    const [textoItem1SaludOcupacional, setTextoItem1SaludOcupacional] = React.useState({
        Tipo: 'textoItem1SaludOcupacional',
        texto_campo: ''
    })
    const [textoItem2SaludOcupacional, setTextoItem2SaludOcupacional] = React.useState({
        Tipo: 'textoItem2SaludOcupacional',
        texto_campo: ''
    })
    const [textoItem3SaludOcupacional, setTextoItem3SaludOcupacional] = React.useState({
        Tipo: 'textoItem3SaludOcupacional',
        texto_campo: ''
    })

    const [isFetching, setIsFetching] = useState(true);


    useEffect(() => {
        if (isFetching) {
            const FetchCargarInfo = async () => {
                try {
                    console.log("Hola");
                    var info = await Services.getSaludOcupacional();
                    setTituloSaludOcupacional({ ...tituloSaludOcupacional, texto_campo: info[0].texto_campo });
                    setTextoQueEsSaludOcupacional({ ...textoQueEsSaludOcupacional, texto_campo: info[1].texto_campo });
                    setPorqueImporta({ ...porqueImporta, texto_campo: info[2].texto_campo });
                    setTextoPorqueImporta({ ...textoPorqueImporta, texto_campo: info[3].texto_campo });
                    setSubTituloSaludOcupacional({ ...subTituloSaludOcupacional, texto_campo: info[4].texto_campo });
                    setTituloItem1SaludOcupacional({ ...tituloItem1SaludOcupacional, texto_campo: info[5].texto_campo });
                    setTituloItem2SaludOcupacional({ ...tituloItem2SaludOcupacional, texto_campo: info[6].texto_campo });
                    setTituloItem3SaludOcupacional({ ...tituloItem3SaludOcupacional, texto_campo: info[7].texto_campo });
                    setTextoItem1SaludOcupacional({ ...textoItem1SaludOcupacional, texto_campo: info[8].texto_campo });
                    setTextoItem2SaludOcupacional({ ...textoItem2SaludOcupacional, texto_campo: info[9].texto_campo });
                    setTextoItem3SaludOcupacional({ ...textoItem3SaludOcupacional, texto_campo: info[10].texto_campo });


                } catch (error) {
                    console.log("Error fetching info");
                }
            }
            FetchCargarInfo();
            setIsFetching(false);
        }
    }, []);
    return (
        <div className="scrollable-page2">
            <Topbar />
            <div className='header1'>
                SALUD OCUPACIONAL
            </div>
            <div className="empty-space-top1"></div>

            <div className="salud-container">
                <div className="salud_desc-container">
                    <h2>{tituloSaludOcupacional.texto_campo}</h2>
                    <p>{textoQueEsSaludOcupacional.texto_campo}</p>
                </div>
                <div className="salud-impor-container">
                    <h2>{porqueImporta.texto_campo}</h2>
                    <p>{textoPorqueImporta.texto_campo}</p>
                </div>
            </div>
            <div className='header2'>
                {subTituloSaludOcupacional.texto_campo}
            </div>


            <div class="container-wrapper">
                <div className='containerInfo'>
                    <div className='icon-container'>
                        <FontAwesomeIcon icon={faBriefcaseMedical} style={{ color: '#ffffff', fontSize: '80px' }} />
                    </div>
                    <h2>{tituloItem1SaludOcupacional.texto_campo}</h2>
                    <p>{textoItem1SaludOcupacional.texto_campo}</p>
                </div>

                <div className='containerInfo'>
                    <div className='icon-container'>
                        <FontAwesomeIcon icon={faCircleExclamation} style={{ color: '#ffffff', fontSize: '80px' }} />
                    </div>
                    <h2>{tituloItem2SaludOcupacional.texto_campo}</h2>
                    <p>{textoItem2SaludOcupacional.texto_campo}</p>
                </div>

                <div className='containerInfo'>
                    <div className='icon-container'>
                        <FontAwesomeIcon icon={faHouseMedicalFlag} style={{ color: '#ffffff', fontSize: '80px' }} />
                    </div>
                    <h2>{tituloItem3SaludOcupacional.texto_campo}</h2>
                    <p>{textoItem3SaludOcupacional.texto_campo}</p>
                </div>
            </div>







            <div className="empty-space-bottom1"></div>
            <Footer />
        </div>
    );
};

export default SaludOcupacional;
