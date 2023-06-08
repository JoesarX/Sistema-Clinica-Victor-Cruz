import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './Ficha.css'
const FichaMedicamentos = (props) => {
    const { open, setOpenPopup, setNombreF, setCategoriaF, setPrecioUnitarioF, setStockF, setImagenF, setViaF } = props;

    return (
        <Dialog open={open} onClose={() => setOpenPopup(false)}>
            <div className='Modal'>
                <div className="div-titulo" style={{ display: 'flex' }}>
                    <h1 className='Titulo' style={{ textAlign: 'center' }}>Descripción del Medicamento</h1>
                </div>
                <div className='Principal'>
                    <div className='Div-imagen'>
                        <img className='Imagen' src={setImagenF} alt={setNombreF} style={{ marginLeft: 16, marginRight: 16, width: 200, height: 200 }} />
                    </div>
                    <div className='Contenido'>
                        <table className='tablaMed'>
                            <tr>
                                <th className='topLeft'>Nombre</th>
                                <td className='topRight'>{setNombreF}</td>
                            </tr>
                            <tr>
                                <th>Categoría</th>
                                <td>{setCategoriaF}</td>
                            </tr>
                            <tr>
                                <th>Precio Unitario</th>
                                <td>{setPrecioUnitarioF}</td>
                            </tr>
                            <tr>
                                <th>Cantidad de stock</th>
                                <td>{setStockF}</td>
                            </tr>
                            <tr>
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