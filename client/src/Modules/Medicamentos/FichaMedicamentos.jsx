import React from 'react';
import { Dialog } from '@mui/material';
import './Ficha.css'
const FichaMedicamentos = (props) => {
    const { open, setOpenPopup, setNombreF, setCategoriaF, setPrecioUnitarioF, setStockF, setImagenF,setViaF } = props;

    return (
        <Dialog open={open} onClose={() => setOpenPopup(false)}>
            <div className='Modal' style={{ backgroundColor: '#f2f2f2' }}>
                <div className="div-titulo"style={{ display: 'flex' }}>
                    <h1 className='Titulo' style={{ textAlign: 'center' }}>Descripción del Medicamento</h1>
                </div>
                <div className='Principal'>
                    <div className='Div-imagen'>
                        <img class='Imagen'src={setImagenF} alt={setNombreF} style={{marginLeft: 16, marginRight: 16, width: 200, height: 200 }} />

                    </div>
                    <div className='Contenido'>
                            <h4 className='NombreMed'>{setNombreF}</h4>
                            <h5 className='contenido-labels'>Categoría: {setCategoriaF}</h5>
                            <h5 className='contenido-labels'>Precio Unitario: {setPrecioUnitarioF}</h5>
                            <h5 className='contenido-labels'>Cantidad de stock: {setStockF}</h5>
                            <h5 className='contenido-labels'>Via: {setViaF}</h5>
                       
                    </div>


                </div>


            </div>
        </Dialog>
    );
};

export default FichaMedicamentos;
