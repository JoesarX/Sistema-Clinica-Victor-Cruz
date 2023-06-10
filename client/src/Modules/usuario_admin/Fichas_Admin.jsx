import React from 'react';
import { Dialog } from '@mui/material';
import { useState } from 'react';
import { Person2, Person } from '@mui/icons-material';
import "./FichaColab.css"

const Popup = (props) => {
  const { open, setOpenPopup, setNombre, setRol, setId, setCorreo, setTelefono, setSexo } = props;
  const [openEditAdmin, setEditAdmin] = useState(false);
  console.log(props);
  let IconoComponent = null;
  let color = null;

  if (setSexo == 'F') {
    IconoComponent = Person2;
    color = 'rgb(236,43,254)';
  }
  if (setSexo == 'M') {
    IconoComponent = Person;
    color = 'rgb(26,94,235)';
  }
  const handleEditClick = () => {
    setEditAdmin(true);
    console.log("Estoy entrando a edit");
    console.log(openEditAdmin);
  };

  return (
    <Dialog open={open} onClose={() => setOpenPopup(false)}>
      <div className='Modal'>
        <div className="div-titulo" style={{ display: 'flex' }}>
          <h1 className='Titulo' style={{ textAlign: 'center' }}>Información Personal del Colaborador</h1>
        </div>
        <div className='Principal'>
          <div className='Div-imagen'>
            {IconoComponent && (
              <IconoComponent className='Imagen' style={{ color: '#fff', backgroundColor: color, borderRadius: '50%', fontSize: '800%' }} />
            )}
          </div>
          <div className='Contenido'>
            <table className='tablaColab'>
              <tr>
                <th className='topLeft'>Nombre</th>
                <td className='topRight'>{setNombre}</td>
              </tr>
              <tr>
                <th>Rol</th>
                <td className='camposT'>{setRol}</td>
              </tr>
              <tr>
                <th>ID</th>
                <td className='camposT'>{setId}</td>
              </tr>
              <tr>
                <th>Correo</th>
                <td className='camposT'>{setCorreo}</td>
              </tr>
              <tr>
                <th className='bottomLeft'>Teléfono</th>
                <td className='bottomRight'>{setTelefono}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Popup;