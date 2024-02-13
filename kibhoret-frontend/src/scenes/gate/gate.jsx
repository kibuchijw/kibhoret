import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';

const GateForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [loading, setLoading] = useState(false);
  const [timeIn, setTimeIn] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const storedTruckId = localStorage.getItem('selectedTruckId');
    console.log('Stored Truck ID:', storedTruckId); // Log stored truck ID
    if (storedTruckId) {
      setId(storedTruckId);
    }
  }, []);

  useEffect(() => {
    const currentTime = new Date().toISOString().slice(11, 16);
    setTimeIn(currentTime);
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Form submitted'); // Log that the form is being submitted

    setLoading(true);

    // Set Time Out to current time before sending form data
    values.time_out = new Date().toISOString().slice(0, 16);

    console.log('Form values:', values); // Log the form values to check for any issues

    const formattedData = {
      general_info: {
        delivery_number: values.deliveryNumber,
        loading_date: values.loadingDate,
        fuel_gauge: values.fuelGauge,
        water_reservoir: values.waterReservoir,
        number_of_seals: values.numberOfSeals,
        seals_condition: values.sealCondition,
        sealing_condition: values.sealingCondition,
        seals_identification: values.sealsIdentification,
        time_in: values.timeIn,
        time_out: values.time_out,
        officer_name: values.officerName
      }
    };

    console.log('Formatted data:', formattedData); // Log the formatted data to ensure it's correct

    // Check if the ID is available
    if (id) {
      const apiUrl = `http://127.0.0.1:8000/api/truck/${id}/`;
      console.log('API URL:', apiUrl); // Log the API URL to the console for debugging

      try {
        // Make the API call to submit the form
        const response = await axios.put(apiUrl, formattedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Truck data updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating truck data:', error);
      }
    } else {
      console.error('Truck ID not available.');
    }

    setLoading(false);
    setSubmitting(false);
  };

  return (
    <Box m='20px'>
      <Header title='MAKE ENTRY' subtitle='Record a new delivery' />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                label='Delivery Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.deliveryNumber}
                name='deliveryNumber'
                error={!!touched.deliveryNumber && !!errors.deliveryNumber}
                helperText={touched.deliveryNumber && errors.deliveryNumber}
              />

              <TextField
                fullWidth
                variant='filled'
                type='date'
                label='Loading Date'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.loadingDate}
                name='loadingDate'
                error={!!touched.loadingDate && !!errors.loadingDate}
                helperText={touched.loadingDate && errors.loadingDate}
              />

              <FormControl sx={{ gridColumn: 'span 2' }}>
                <InputLabel id='fuelGauge'>Fuel Gauge</InputLabel>
                <Select
                  label='Fuel Gauge'
                  type='string'
                  name='fuelGauge'
                  value={values.fuelGauge}
                  onChange={handleChange}
                >
                  <MenuItem value='empty'>Empty</MenuItem>
                  <MenuItem value='half'>Half</MenuItem>
                  <MenuItem value='full'>Full</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ gridColumn: 'span 2' }}>
                <InputLabel id='waterReservoir'>Water Reservoir</InputLabel>
                <Select
                  label='Water Reservoir'
                  type='string'
                  name='waterReservoir'
                  value={values.waterReservoir}
                  onChange={handleChange}
                >
                  <MenuItem value='empty'>Empty</MenuItem>
                  <MenuItem value='half'>Half</MenuItem>
                  <MenuItem value='full'>Full</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ gridColumn: 'span 2' }}>
                <InputLabel id='numberOfSeals'>Number of Seals</InputLabel>
                <Select
                  label='Number of Seals'
                  type='number'
                  name='numberOfSeals'
                  value={values.numberOfSeals}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                  <MenuItem value={4}>Four</MenuItem>
                  <MenuItem value={5}>Five</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ gridColumn: 'span 2' }}>
                <InputLabel id='sealCondition'>Seal Condition</InputLabel>
                <Select
                  label='Seal Condition'
                  type='string'
                  name='sealCondition'
                  value={values.sealCondition}
                  onChange={handleChange}
                >
                  <MenuItem value='Intact'>Intact</MenuItem>
                  <MenuItem value='Tampered'>Tampered</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Sealing Condition'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sealingCondition}
                name='sealingCondition'
                error={!!touched.sealingCondition && !!errors.sealingCondition}
                helperText={touched.sealingCondition && errors.sealingCondition}
              />

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Seals Identification'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sealsIdentification}
                name='sealsIdentification'
                error={!!touched.sealsIdentification && !!errors.sealsIdentification}
                helperText={touched.sealsIdentification && errors.sealsIdentification}
              />

              <TextField
                fullWidth
                variant='filled'
                type='time'
                label='Time In'
                value={timeIn}
                onChange={(event) => setTimeIn(event.target.value)}
                name='timeIn'
              />

              <TextField
                fullWidth
                variant='filled'
                type='time'
                label='Time Out'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.timeOut}
                name='timeOut'
                error={!!touched.timeOut && !!errors.timeOut}
                helperText={touched.timeOut && errors.timeOut}
              />

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Officer Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.officerName}
                name='officerName'
                error={!!touched.officerName && !!errors.officerName}
                helperText={touched.officerName && errors.officerName}
              />

            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <LoadingButton
                type='submit'
                color='secondary'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
                loadingPosition='start'
                startIcon={<SendIcon />}
              >
                <span>Create New Entry</span>
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  timeIn: yup.string().required('Time In is required'),
  // timeOut: yup.string().required('Time Out is required'),
  loadingDate: yup.string().required('Loading Date is required'),
  deliveryNumber: yup.string().required('Delivery Number is required'),
  // cleanliness: yup.string().required('Cleanliness is required'),
  numberOfSeals: yup.number().required('Number of Seals is required'),
  sealCondition: yup.string().required('Seal Condition is required'),
  sealingCondition: yup.string().required('Sealing Condition is required'),
  sealsIdentification: yup.string().required('Seals Identification is required'),
  leakages: yup.string().required('Leakages is required'),
  fuelGauge: yup.string().required('Fuel Gauge is required'),
  waterReservoir: yup.string().required('Water Reservoir is required'),
  officerName: yup.string().required('Officer Name is required')
});

// Adjust the initial values to match the fields in GeneralInfo
const initialValues = {
  deliveryNumber: '',
  loadingDate: '',
  fuelGauge: '',
  waterReservoir: '',
  numberOfSeals: '',
  sealCondition: '',
  sealingCondition: '',
  sealsIdentification: '',
  timeIn: '',
  timeOut: '',
  officerName: ''
};

export default GateForm;
