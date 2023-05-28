
import React from 'react';
import { Dialog, DialogContent, DialogTitle, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Person2, Person, CenterFocusStrong } from '@mui/icons-material';
import EditAdmins from './EditAdmins';

const Popup = (props) => {
  let { setNombre, setRol, setId, setCorreo, setTelefono, setSexo,setPassword, openPopup, setOpenPopup } = props;
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

    <Dialog open={openPopup} onClose={() => setOpenPopup(false)} maxWidth="md" >
      <DialogTitle sx={{ bgcolor: 'rgb(184,184,184)' }}>Información del colaborador</DialogTitle>
      <DialogContent sx={{ bgcolor: 'rgb(184,184,184)' }} style={{ display: 'flex', alignItems: 'center' }}>

        <Box style={{ display: 'flex', alignItems: 'center' }} bgcolor="white" p={7}>
          <Box sx={{ bgcolor: 'white', width: '200px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {IconoComponent && (
              <IconoComponent style={{ color: '#fff', backgroundColor: color, borderRadius: '50%', fontSize: '800%' }} />
            )}

            <Typography onClick={handleEditClick} variant="body2" color="primary" sx={{ mt: 2 }}>Editar</Typography>
          </Box>

          <Box sx={{ bgcolor: 'white', flex: 1 }} p={0}>
            <h2>{setNombre}</h2>
            <h2>{setRol}</h2>
            <h2>{setId}</h2>
            <h2>{setCorreo}</h2>
            <h2>{setTelefono}</h2>

          </Box>
        </Box>
      </DialogContent>
      {openEditAdmin && (
    <EditAdmins
    openEditAdmin={openEditAdmin}
    setEditAdmin={setEditAdmin}
    setNombre={setNombre}
    setRol={setRol}
    setId={setId}
    setCorreo={setCorreo}
    setTelefono={setTelefono}
    setPassword={setPassword}
    setSexo={setSexo}
    />
    
  )}
      
    </Dialog>
    
  );
  
};

export default Popup;