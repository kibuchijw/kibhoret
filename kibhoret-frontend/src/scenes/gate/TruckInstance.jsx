import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const TruckForm = ({ handleCloseModal }) => {
  const [cabPlate, setCabPlate] = useState('');
  const [tankerPlate, setTankerPlate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        driver: '',
        cab_plate: cabPlate,
        trailer_plate: tankerPlate,
        general_info: null,
        weighbridge_in: null,
        quality_control: null,
        tankfarm: null,
        weighbridge_out: null
      };

      const response = await axios.post('http://127.0.0.1:8000/api/trucks/', data);
      console.log('New truck instance created:', response.data);
      // Close the modal after successfully creating the truck instance
      handleCloseModal();
    } catch (error) {
      console.error('Error creating truck instance:', error);
      // Handle error here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Cab Plate'
        variant='outlined'
        value={cabPlate}
        onChange={(e) => setCabPlate(e.target.value)}
        fullWidth
        margin='normal'
        required
      />
      <TextField
        label='Tanker Plate'
        variant='outlined'
        value={tankerPlate}
        onChange={(e) => setTankerPlate(e.target.value)}
        fullWidth
        margin='normal'
        required
      />
      <Button type='submit' variant='contained' color='primary'>
        Create Truck
      </Button>
    </form>
  );
};

export default TruckForm;
