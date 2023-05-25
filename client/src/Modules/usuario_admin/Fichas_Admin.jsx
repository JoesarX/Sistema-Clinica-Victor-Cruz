
import React from 'react';
import { Dialog, DialogContent, DialogTitle,Box,Typography } from '@mui/material';
import {makeStyles} from '@mui/styles';
import{Person2, Person, CenterFocusStrong} from '@mui/icons-material';
const useStyles = makeStyles (theme =>({
    dialogWrapper:{
        padding : '16px',
        position: 'absolute',
        top: '40px',
    }
}))

const Popup = (props) => {
  const {  children, openPopup, setOpenPopup } = props;
  const classes = useStyles();
  return (
    <Dialog open={openPopup} onClose={() => setOpenPopup(false)} maxWidth="md" className={classes.dialogWrapper}>
      <DialogTitle sx={{ bgcolor: 'rgb(184,184,184)' }}>Información del colaborador</DialogTitle>
      <DialogContent sx={{ bgcolor: 'rgb(184,184,184)' }} style={{ display: 'flex', alignItems: 'center' }}>
  
        <Box style={{ display: 'flex', alignItems: 'center' }} bgcolor="white" p={7}>
          <Box sx={{ bgcolor: 'white', width: '200px', height: '200px', display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center' }}>
            <Person2 style={{ color: '#fff', backgroundColor: 'rgb(236,43,254)', borderRadius: '50%', fontSize: '800%' }}
           />
           <Typography variant="body2" color="primary" sx={{ mt: 2 }}>Editar</Typography>
          </Box>
          
          <Box sx={{ bgcolor: 'white', flex: 1 }} p={0}>
            <h2>Pedro Daniel Mendoza Amador</h2>
            <h2>Medico</h2>
            <h2>0601-2002-01315</h2>
            <h2>Pedro@pedro.com</h2>
            <h2>98967807</h2>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;