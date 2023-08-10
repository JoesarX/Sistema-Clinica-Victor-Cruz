import React from 'react';
import { Dialog } from '@mui/material';
import './Ficha.css'
const FichaMedicamentos = (props) => {
    const { open, setOpenPopup, setNombreF, setCategoriaF, setPrecioUnitarioF, setStockF, setImagenF, setViaF } = props;

    return (
        <Dialog open={open} onClose={() => setOpenPopup(false)}>
            <div className='Modal'>
            
                    <h1 className='Titulo' style={{ textAlign: 'center' }}>Descripción del Medicamento</h1>
               
                <div className='Principal'>
                
                    <div className='Div-imagen'>
                        <img className='Imagen' src={setImagenF} alt={setNombreF} style={{ marginLeft: 16, marginRight: 16, width: 200, height: 200 }} />
                    </div>
                    <div className='Contenido'>
                        <table className='tablaMed'>
                            <tr classname ="trFicha">
                                <th classname ="thFicha" className='topLeft'>Nombre</th>
                                <td className='topRight'>{setNombreF}</td>
                            </tr>
                            <tr classname ="trFicha">
                                <th classname ="thFicha">Categoría</th>
                                <td className='camposT'>{setCategoriaF}</td>
                            </tr>
                            <tr classname ="trFicha">
                                <th classname ="thFicha">Precio Unitario</th>
                                <td className='camposT'>{setPrecioUnitarioF}</td>
                            </tr>
                            <tr classname ="trFicha">
                                <th classname ="thFicha">Cantidad de stock</th>
                                <td className='camposT'>{setStockF}</td>
                            </tr>
                            <tr classname ="trFicha">
                                <th className='bottomLeft'>Vía</th>
                                <td className='bottomRight'>{setViaF}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default FichaMedicamentos;