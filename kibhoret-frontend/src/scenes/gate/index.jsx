import React from 'react';
import { Box } from '@mui/material';
import CurrentTrucks from '../global/CurrentTrucks';

const TruckView = () => {
  return (
    <Box m='20px'>
      <CurrentTrucks endpoint='http://127.0.0.1:8000/api/trucks/' link='/gate/form' />
    </Box>
  );
};

export default TruckView;
