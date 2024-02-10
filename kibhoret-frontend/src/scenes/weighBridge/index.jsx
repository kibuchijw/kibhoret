import React from 'react';
import { Box } from '@mui/material';
import CurrentTrucks from '../global/CurrentTrucks';
import Header from '../../components/Header';

const TruckView = () => {
  return (
    <Box>
      <CurrentTrucks endpoint='http://127.0.0.1:8000/api/weighbridge/in/' link='/weighbridge/in' />
      <CurrentTrucks endpoint='http://127.0.0.1:8000/api/weighbridge/out/' link='/weighbridge/out' />
    </Box>
  );
};

export default TruckView;
