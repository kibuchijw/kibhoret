import React, { useState } from 'react';
import { Box, TextField, Slider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import Alert from '@mui/material/Alert';

const LabForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleFormSubmit = async (values) => {
    console.log('Form submitted!'); // Add this line for debugging
    setLoading(true);
    try {
      // Set current datetime for resultTime field
      values.resultTime = new Date().toISOString();
      // Send POST request to the API endpoint
      const response = await fetch('http://127.0.0.1:8000/api/truck/5', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      console.log(response);
      // Simulate submission delay with setTimeout
      setTimeout(() => {
        setLoading(false);
        setAlertOpen(true);
        setAlertSeverity('success');
        setAlertMessage('Data submitted successfully!');
        // Reset the form after submission
        resetForm();
      }, 1000);
    } catch (error) {
      console.error('Error:', error.message);
      setAlertOpen(true);
      setAlertSeverity('error');
      setAlertMessage('An error occurred while submitting data.');
    }
  };
  const resetForm = (initialValues) => {
    return (formikProps) => {
      formikProps.resetForm({ values: initialValues });
    };
  };

  const marks = [
    { value: 0, label: '0°C' },
    { value: 25, label: '25°C' },
    { value: 50, label: '50°C' },
    { value: 75, label: '75°C' }
  ];

  function valuetext (value) {
    return `${value}°C`;
  }

  return (
    <Box m='20px'>
      <Header title='LAB RESULTS' subtitle='Record new lab results' />

      <Formik
        onSubmit={handleFormSubmit}
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
                label='Sampler Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.samplerName}
                name='samplerName'
                error={!!touched.samplerName && !!errors.samplerName}
                helperText={touched.samplerName && errors.samplerName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Sample Type'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sampleType}
                name='sampleType'
                error={!!touched.sampleType && !!errors.sampleType}
                helperText={touched.sampleType && errors.sampleType}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='Samples Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.samplesNumber}
                name='samplesNumber'
                error={!!touched.samplesNumber && !!errors.samplesNumber}
                helperText={touched.samplesNumber && errors.samplesNumber}
                sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Inspector Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.inspectorName}
                name='inspectorName'
                error={!!touched.inspectorName && !!errors.inspectorName}
                helperText={touched.inspectorName && errors.inspectorName}
                sx={{ gridColumn: 'span 2' }}
              />
              <Slider
                fullwidth='true'
                aria-label='Custom marks'
                defaultValue={40}
                getAriaValueText={valuetext}
                step={5}
                valueLabelDisplay='on'
                marks={marks}
                display='flex'
                type='number'
                title='Temperature'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sample_temperature}
                name='sample_temperature'
                color='secondary'
                sx={{
                  gridColumn: 'span 4'
                }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Notes'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.notes}
                name='notes'
                error={!!touched.notes && !!errors.notes}
                helperText={touched.notes && errors.notes}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='IV Type'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ivType}
                name='ivType'
                error={!!touched.ivType && !!errors.ivType}
                helperText={touched.ivType && errors.ivType}
                sx={{ gridColumn: 'span 1', color: 'primary[400]' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='COLOR_R'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.COLOR_R}
                name='COLOR_R'
                error={!!touched.COLOR_R && !!errors.COLOR_R}
                helperText={touched.COLOR_R && errors.COLOR_R}
                sx={{ gridColumn: 'span 1', color: 'primary[400]' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='COLOR_Y'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.COLOR_Y}
                name='COLOR_Y'
                error={!!touched.COLOR_Y && !!errors.COLOR_Y}
                helperText={touched.COLOR_Y && errors.COLOR_Y}
                sx={{ gridColumn: 'span 1' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='COLOR_B'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.COLOR_B}
                name='COLOR_B'
                error={!!touched.COLOR_B && !!errors.COLOR_B}
                helperText={touched.COLOR_B && errors.COLOR_B}
                sx={{ gridColumn: 'span 1' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='FFA'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.FFA}
                name='FFA'
                error={!!touched.FFA && !!errors.FFA}
                helperText={touched.FFA && errors.FFA}
                sx={{ gridColumn: 'span 1' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='MIV'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.MIV}
                name='MIV'
                error={!!touched.MIV && !!errors.MIV}
                helperText={touched.MIV && errors.MIV}
                sx={{ gridColumn: 'span 1' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='SMP'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.SMP}
                name='SMP'
                error={!!touched.SMP && !!errors.SMP}
                helperText={touched.SMP && errors.SMP}
                sx={{ gridColumn: 'span 1' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Lab Notes'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.labNotes}
                name='labNotes'
                error={!!touched.labNotes && !!errors.labNotes}
                helperText={touched.labNotes && errors.labNotes}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Chemist Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.chemistName}
                name='chemistName'
                error={!!touched.chemistName && !!errors.chemistName}
                helperText={touched.chemistName && errors.chemistName}
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>
            {alertOpen && (
              <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)}>
                {alertMessage}
              </Alert>
            )}
            <Box display='flex' justifyContent='end' mt='20px'>
              <LoadingButton
                onClick={handleSubmit}
                loading={loading}
                disabled={loading} // Disable button during loading
                loadingPosition='start'
                type='submit'
                color='secondary'
                variant='contained'
                endIcon={<SendIcon />}
              >
                Create New Entry
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  samplerName: yup.string().max(100, 'Maximum words exceeded!').required('Required'),
  sampleType: yup.string().max(10, 'Maximum words exceeded!').required('Required'),
  samplesNumber: yup.number().required('Required'),
  inspectorName: yup.string().max(100, 'Maximum words exceeded!').required('Required'),
  notes: yup.string().max(100, 'Maximum words exceeded!').required('Required'),
  ivType: yup.string().required('Required'),
  COLOR_R: yup.number().required('Required'),
  COLOR_Y: yup.number().required('Required'),
  COLOR_B: yup.number().required('Required'),
  FFA: yup.number().required('Required'),
  MIV: yup.number().required('Required'),
  SMP: yup.number().required('Required'),
  resultTime: yup.date().required('Required'),
  labNotes: yup.string().max(100, 'Maximum words exceeded!').required('Required'),
  chemistName: yup.string().max(100, 'Maximum words exceeded!').required('Required')
});

const initialValues = {
  samplerName: '',
  sampleType: '',
  samplesNumber: '',
  inspectorName: '',
  notes: '',
  ivType: '',
  COLOR_R: '',
  COLOR_Y: '',
  COLOR_B: '',
  FFA: '',
  MIV: '',
  SMP: '',
  resultTime: '', // Will be set automatically on submission
  labNotes: '',
  chemistName: ''
};

export default LabForm;
