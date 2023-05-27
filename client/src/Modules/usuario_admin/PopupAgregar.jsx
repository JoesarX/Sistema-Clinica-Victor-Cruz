import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';

const PopupAgregar = () => {
  let { openPopupAgregar, setOpenPopupAgregar } = false;
  return (
    <div>
      <Dialog open={openPopupAgregar} onClose={() => setOpenPopupAgregar(false)} maxWidth="md" >
        <DialogTitle>Agregar Admin</DialogTitle>
        <DialogContent>
          <form>
            <TextField label="Name 1" fullWidth />
            <TextField label="Name 2" fullWidth />
            <TextField label="Name 3" fullWidth />
            {/* Add more TextField components for additional fields */}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupAgregar;