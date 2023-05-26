
import React from 'react';
import { Dialog, DialogContent, DialogTitle,Box,Typography } from '@mui/material';

import{Person2, Person, CenterFocusStrong} from '@mui/icons-material';


const Popup = (props) => {
  let {  setNombre,setRol,setId,setCorreo, setCelular, openPopup, setOpenPopup } = props;
  console.log(props);
  return (
   
    <Dialog open={openPopup} onClose={() => setOpenPopup(false)} maxWidth="md" >
      <DialogTitle sx={{ bgcolor: 'rgb(184,184,184)' }}>Información del colaborador</DialogTitle>
      <DialogContent sx={{ bgcolor: 'rgb(184,184,184)' }} style={{ display: 'flex', alignItems: 'center' }}>
  
        <Box style={{ display: 'flex', alignItems: 'center' }} bgcolor="white" p={7}>
          <Box sx={{ bgcolor: 'white', width: '200px', height: '200px', display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center' }}>
            <Person2 style={{ color: '#fff', backgroundColor: 'rgb(236,43,254)', borderRadius: '50%', fontSize: '800%' }}
           />
           <Typography variant="body2" color="primary" sx={{ mt: 2 }}>Editar</Typography>
          </Box>
          
          <Box sx={{ bgcolor: 'white', flex: 1 }} p={0}>
            <h2>{setNombre}</h2>
            <h2>{setRol}</h2>
            <h2>{setId}</h2>
            <h2>{setCorreo}</h2>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const Popup2 = (props) => {
  let {  setNombre,setRol,setId,setCorreo, setCelular, openPopup2, setOpenPopup2 } = props;
  console.log(props);
  return (
   
    <Dialog open={openPopup2} onClose={() => setOpenPopup2(false)} maxWidth="md" >
      <DialogTitle sx={{ bgcolor: 'rgb(184,184,184)' }}>Agregar Administrador</DialogTitle>
      <DialogContent sx={{ bgcolor: 'rgb(184,184,184)' }} style={{ display: 'flex', alignItems: 'center' }}>
        
      </DialogContent>
    </Dialog>
  );
};

export default Popup;