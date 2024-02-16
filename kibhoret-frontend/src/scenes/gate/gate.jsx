import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import useFormData from '../../components/UseFormData';

const validationSchema = Yup.object().shape({
  delivery_number: Yup.string().required('Delivery number is required'),
  loading_date: Yup.string().required('Loading date is required'),
  fuel_gauge: Yup.string().required('Fuel gauge is required'),
  water_reservoir: Yup.string().required('Water reservoir is required'),
  number_of_seals: Yup.number()
    .required('Number of seals is required')
    .positive('Number of seals must be positive')
    .integer('Number of seals must be an integer'),
  seals_condition: Yup.string().required('Seals condition is required'),
  sealing_condition: Yup.string().required('Sealing condition is required'),
  seals_identification: Yup.string().required(
    'Seals identification is required'
  ),
  officer_name: Yup.string().required('Officer name is required')
});

const GateForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const {
    id,
    setId,
    submissionMessage,
    setSubmissionMessage,
    time_in,
    setTimeIn,
    time_out,
    setTimeOut,
    loading,
    setLoading,
    handleFormSubmit
  } = useFormData();

  const formik = useFormik({
    initialValues: {
      delivery_number: '',
      loading_date: '',
      fuel_gauge: '',
      water_reservoir: '',
      number_of_seals: '',
      seals_condition: '',
      sealing_condition: '',
      seals_identification: '',
      officer_name: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await handleFormSubmit(values);
        setSubmissionMessage('Data submitted successfully!');
        console.log('Data submitted successfully!');
      } catch (error) {
        setSubmissionMessage('An error occurred while submitting data.');
        console.error('Error submitting data:', error);
      }
    }
  });

  return (
    <Box m='20px'>
      <Header title='MAKE ENTRY' subtitle='Record a new delivery' />
      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        display='grid'
        gap='30px'
        gridTemplateColumns='repeat(4, minmax(0, 1fr))'
        sx={{
          '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
        }}
      >
        <TextField
          variant='filled'
          type='text'
          label='Delivery Number'
          name='delivery_number'
          value={formik.values.delivery_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.delivery_number &&
            Boolean(formik.errors.delivery_number)
          }
          helperText={
            formik.touched.delivery_number && formik.errors.delivery_number
          }
          placeholder='Delivery Number'
          fullWidth
          margin='normal'
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='date'
          label='Loading Date'
          name='loading_date'
          value={formik.values.loading_date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.loading_date && Boolean(formik.errors.loading_date)
          }
          helperText={formik.touched.loading_date && formik.errors.loading_date}
          placeholder='Loading Date'
          fullWidth
          margin='normal'
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <FormControl variant='filled' fullWidth margin='normal' sx={{ gridColumn: 'span 2', color: 'primary[400]' }}>
          <InputLabel>Fuel Gauge</InputLabel>
          <Select
            label='Fuel Gauge'
            name='fuel_gauge'
            value={formik.values.fuel_gauge}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.fuel_gauge && Boolean(formik.errors.fuel_gauge)
            }

          >
            <MenuItem value=''>
              <em>Select Fuel Gauge</em>
            </MenuItem>
            <MenuItem value='empty'>Empty</MenuItem>
            <MenuItem value='half'>Half</MenuItem>
            <MenuItem value='full'>Full</MenuItem>
          </Select>
          {formik.touched.fuel_gauge && formik.errors.fuel_gauge && (
            <Alert severity='error'>{formik.errors.fuel_gauge}</Alert>
          )}
        </FormControl>
        <FormControl variant='filled' fullWidth margin='normal' sx={{ gridColumn: 'span 2', color: 'primary[400]' }}>
          <InputLabel>Water Reservoir</InputLabel>
          <Select
            label='Water Reservoir'
            name='water_reservoir'
            value={formik.values.water_reservoir}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.water_reservoir &&
              Boolean(formik.errors.water_reservoir)
            }
          >
            <MenuItem value=''>
              <em>Select Water Reservoir</em>
            </MenuItem>
            <MenuItem value='empty'>Empty</MenuItem>
            <MenuItem value='half'>Half</MenuItem>
            <MenuItem value='full'>Full</MenuItem>
          </Select>
          {formik.touched.water_reservoir && formik.errors.water_reservoir && (
            <Alert severity='error'>{formik.errors.water_reservoir}</Alert>
          )}
        </FormControl>
        <TextField
          variant='filled'
          type='number'
          label='Number of Seals'
          name='number_of_seals'
          value={formik.values.number_of_seals}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.number_of_seals &&
            Boolean(formik.errors.number_of_seals)
          }
          helperText={
            formik.touched.number_of_seals && formik.errors.number_of_seals
          }
          placeholder='Number of Seals'
          fullWidth
          margin='normal'
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='text'
          label='Seals Condition'
          name='seals_condition'
          value={formik.values.seals_condition}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.seals_condition &&
            Boolean(formik.errors.seals_condition)
          }
          helperText={
            formik.touched.seals_condition && formik.errors.seals_condition
          }
          placeholder='Seals Condition'
          fullWidth
          margin='normal'
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='text'
          label='Seals Identification'
          name='seals_identification'
          value={formik.values.seals_identification}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.seals_identification &&
            Boolean(formik.errors.seals_identification)
          }
          helperText={
            formik.touched.seals_identification &&
            formik.errors.seals_identification
          }
          placeholder='Seals Identification'
          fullWidth
          multiline
          rows={3}
          margin='normal'
          sx={{ gridColumn: 'span 4', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='text'
          label='Sealing Condition'
          name='sealing_condition'
          value={formik.values.sealing_condition}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.sealing_condition &&
            Boolean(formik.errors.sealing_condition)
          }
          helperText={
            formik.touched.sealing_condition && formik.errors.sealing_condition
          }
          placeholder='Sealing Condition'
          fullWidth
          margin='normal'
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />

        <TextField
          variant='filled'
          type='text'
          label='Officer Name'
          name='officer_name'
          value={formik.values.officer_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.officer_name && Boolean(formik.errors.officer_name)
          }
          helperText={formik.touched.officer_name && formik.errors.officer_name}
          placeholder='Officer Name'
          fullWidth
          margin='normal'
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />

        <Box display='flex' mt='20px' sx={{ gridColumn: 'span 2', mb: 2 }}>
          <LoadingButton
            type='submit'
            color='secondary'
            variant='contained'
            loading={loading}
            disabled={loading || !formik.isValid} // Disable button during loading or if form is invalid
            loadingPosition='start'
            startIcon={<SendIcon />}
          >
            <span>Create New Entry</span>
          </LoadingButton>
        </Box>
        {/* Display success or error message */}
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
      </Box>
    </Box>
  );
};

export default GateForm;
