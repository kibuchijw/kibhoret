import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import useFormData from '../../components/UseFormData'; // Importing the useFormData hook
import axios from 'axios';

const WeighBridgeIn = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const {
    id,
    time_out,
    setTimeOut,
    handleFormSubmit,
    loading, // Destructuring setLoading from useFormData hook
    setLoading // Destructuring setLoading from useFormData hook
  } = useFormData(); // Destructure required values from useFormData hook
  const [fetchingFirstWeight, setFetchingFirstWeight] = useState(true);
  const [weightDifference, setWeightDifference] = useState('');

  const checkoutSchema = yup.object().shape({
    time: yup.string().required('required'),
    last_weight: yup.number().required('required'),
    operator_name: yup
      .string()
      .max(100, 'Maximum words exceeded!')
      .required('required'),
    officer_name: yup
      .string()
      .max(100, 'Maximum words exceeded!')
      .required('required')
  });

  const initialValues = {
    time: time_out,
    last_weight: '',
    operator_name: '',
    officer_name: '',
    weight_difference: weightDifference
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true); // Set loading to true before making the API call

      // Fetch truck data
      const response = await axios.get(`http://127.0.0.1:8000/api/truck/${id}`);
      const truckData = response.data;

      // Extract first weight from weighbridge_in object
      const firstWeight = parseFloat(truckData.weighbridge_in.first_weight);

      // Calculate weight difference
      const weightDifference = firstWeight - parseFloat(values.last_weight);

      // Do whatever you want with weight difference
      console.log('Weight Difference:', weightDifference);

      // Submit form data
      handleFormSubmit(values);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Set loading back to false after API call completes
    }
  };

  return (
    <Box m='20px'>
      <Link to='/weighbridge'>
        <Header
          title='WEIGHBRIDGE RECORDS'
          subtitle='Record a new truck exit'
        />
      </Link>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
              }}
            >
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Truck Weight'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_weight}
                name='last_weight'
                error={!!touched.last_weight && !!errors.last_weight}
                helperText={touched.last_weight && errors.last_weight}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Operator Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.operator_name}
                name='operator_name'
                error={!!touched.operator_name && !!errors.operator_name}
                helperText={touched.operator_name && errors.operator_name}
                sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Officer Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name='officer_name'
                error={!!touched.officer_name && !!errors.officer_name}
                helperText={touched.officer_name && errors.officer_name}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='datetime-local'
                label='Time Out'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.time}
                name='time'
                error={!!touched.time && !!errors.time}
                helperText={touched.time && errors.time}
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button
                type='submit'
                color='secondary'
                variant='contained'
                endIcon={<SendIcon />}
                disabled={loading} // Disable button when loading
              >
                Create New Entry
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default WeighBridgeIn;
