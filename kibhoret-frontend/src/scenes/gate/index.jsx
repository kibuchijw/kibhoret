import React, { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import CurrentTrucks from '../global/CurrentTrucks';
import TruckForm from './TruckInstance';

const TruckView = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box m='20px'>
      <Box m='20px'>
        {/* Injected button */}
        <Button variant='contained' color='secondary' onClick={handleOpenModal}>
          Add New Truck
        </Button>
      </Box>
      <Box mt={2}>
        <CurrentTrucks endpoint='http://127.0.0.1:8000/api/trucks/' link='/gate/form' />
      </Box>

      {/* Modal for creating a new truck */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: 400,
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        >
          <TruckForm handleCloseModal={handleCloseModal} />
        </Box>
      </Modal>
    </Box>
  );
};

export default TruckView;
