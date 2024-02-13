import React from 'react';
import { Box, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import useFormData from '../../components/UseFormData';
import Alert from '@mui/material/Alert';

const WeighBridgeIn = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const {
    id,
    setId,
    submissionMessage,
    setSubmissionMessage,
    time_in,
    setTimein,
    time_out,
    setTimeOut,
    loading,
    setLoading,
    handleFormSubmit
  } = useFormData();

  return (
    <Box m='20px'>
      <Link to='/weighbridge'>
        <Header
          title='WEIGHBRIDGE RECORDS'
          subtitle='Record a new truck entry'
        />
      </Link>
      {submissionMessage && (
        <Box mt={2}>
          {submissionMessage.startsWith('An error')
            ? (
              <Alert severity='error'>{submissionMessage}</Alert>
              )
            : (
              <Alert severity='success'>{submissionMessage}</Alert>
              )}
        </Box>
      )}
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
                label='Delivery Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.delivery_number}
                name='delivery_number'
                error={!!touched.delivery_number && !!errors.delivery_number}
                helperText={touched.delivery_number && errors.delivery_number}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='First Weight'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_weight}
                name='first_weight'
                error={!!touched.first_weight && !!errors.first_weight}
                helperText={touched.first_weight && errors.first_weight}
                sx={{ gridColumn: 'span 2' }}
              />
              {/* <TextField
                fullWidth
                variant='filled'
                type='datetime-local'
                label='Time In'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.time_in}
                name='time_in'
                error={!!touched.time_in && !!errors.time_in}
                helperText={touched.time_in && errors.time_in}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='datetime-local'
                label='Time Out'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.time_out}
                name='time_out'
                error={!!touched.time_out && !!errors.time_out}
                helperText={touched.time_out && errors.time_out}
                sx={{ gridColumn: 'span 2' }}
              /> */}
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
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Officer Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.officer_name}
                name='officer_name'
                error={!!touched.officer_name && !!errors.officer_name}
                helperText={touched.officer_name && errors.officer_name}
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <LoadingButton
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                color='secondary'
                loading={loading}
                loadingPosition='start'
                startIcon={<SendIcon />}
              >
                <span>Create New entry</span>
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  delivery_number: yup.string().required('Delivery Number is required'),
  first_weight: yup.number().required('First Weight is required'),
  // timeIn: yup.string().required('Time In is required'),
  // timeOut: yup.string().required('Time Out is required'),
  operator_name: yup.string().required('Operator Name is required'),
  officer_name: yup.string().required('Officer Name is required')
});

const initialValues = {
  delivery_number: '',
  first_weight: '',
  // time_in: '',
  // time_out: '',
  operator_name: '',
  officer_name: ''
};

export default WeighBridgeIn;
