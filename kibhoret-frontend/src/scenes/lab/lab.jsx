import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import useFormData from '../../components/UseFormData';

const validationSchema = Yup.object().shape({
  sample_type: Yup.string().required('Sample type is required'),
  sample_temperature: Yup.number().required('Sample temperature is required'),
  notes: Yup.string(),
  inspector_name: Yup.string().required('Inspector name is required'),
  sampler_name: Yup.string(),
  sampling_time: Yup.string().required('Sampling time is required'),
  chemist_name: Yup.string().required('Chemist name is required'),
  sample_number: Yup.string().required('Sample number is required'),
  result_time: Yup.string().required('Result time is required'),
  SMP: Yup.number().required('SMP is required'),
  MIV: Yup.number().required('MIV is required'),
  FFA: Yup.number().required('FFA is required'),
  COLOR_B: Yup.number().required('Color B is required'),
  COLOR_Y: Yup.number().required('Color Y is required'),
  COLOR_R: Yup.number().required('Color R is required'),
  IV: Yup.number().required('IV is required')
});

const LabForm = () => {
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
      sample_type: '',
      sample_temperature: '',
      notes: '',
      inspector_name: '',
      sampler_name: '',
      sampling_time: '',
      chemist_name: '',
      sample_number: '',
      result_time: '',
      SMP: '',
      MIV: '',
      FFA: '',
      COLOR_B: '',
      COLOR_Y: '',
      COLOR_R: '',
      IV: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await handleFormSubmit(values);
        formik.resetForm();
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
      <Header title='Lab Form' subtitle='Record lab data' />
      {submissionMessage && (
        <Box mt={2}>
          {submissionMessage.startsWith('Data submitted successfully') && (
            <Alert severity='success'>{submissionMessage}</Alert>
          )}
          {submissionMessage.startsWith('An error') && (
            <Alert severity='error'>{submissionMessage}</Alert>
          )}
        </Box>
      )}
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
        <FormControl variant='filled' fullWidth margin='normal' sx={{ gridColumn: 'span 2', color: 'primary[400]' }}>
          <InputLabel>Sample Type</InputLabel>
          <Select
            label='Sample Type'
            name='sample_type'
            value={formik.values.sample_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.sample_type && Boolean(formik.errors.sample_type)}
          >
            <MenuItem value=''>
              <em>Select Sample Type</em>
            </MenuItem>
            <MenuItem value='CPO'>CPO</MenuItem>
            <MenuItem value='CPKO'>CPKO</MenuItem>
            <MenuItem value='stearin'>Stearin</MenuItem>
            <MenuItem value='water'>Water</MenuItem>
            <MenuItem value='sludge'>Sludge</MenuItem>
            <MenuItem value='caustic'>Caustic</MenuItem>
          </Select>
          {formik.touched.sample_type && formik.errors.sample_type && (
            <Alert severity='error'>{formik.errors.sample_type}</Alert>
          )}
        </FormControl>
        <TextField
          variant='filled'
          type='number'
          label='Sample Temperature'
          name='sample_temperature'
          value={formik.values.sample_temperature}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.sample_temperature && Boolean(formik.errors.sample_temperature)}
          helperText={formik.touched.sample_temperature && formik.errors.sample_temperature}
          placeholder='Sample Temperature'
          fullWidth
          margin='normal'
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='text'
          label='Notes'
          name='notes'
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.notes && Boolean(formik.errors.notes)}
          helperText={formik.touched.notes && formik.errors.notes}
          placeholder='Notes'
          fullWidth
          multiline
          rows={3}
          margin='normal'
          sx={{ gridColumn: 'span 4', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='text'
          label='Inspector Name'
          name='inspector_name'
          value={formik.values.inspector_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.inspector_name && Boolean(formik.errors.inspector_name)}
          helperText={formik.touched.inspector_name && formik.errors.inspector_name}
          fullWidth
          margin='normal'
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='text'
          label='Sampler Name'
          name='sampler_name'
          value={formik.values.sampler_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.sampler_name && Boolean(formik.errors.sampler_name)}
          helperText={formik.touched.sampler_name && formik.errors.sampler_name}
          placeholder='Sampler Name'
          fullWidth
          margin='normal'
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='datetime-local'
          label='Sampling time'
          name='sampling_time'
          value={formik.values.sampling_time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.sampling_time && Boolean(formik.errors.sampling_time)}
          helperText={formik.touched.sampling_time && formik.errors.sampling_time}
          fullWidth
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />

        <TextField
          variant='filled'
          type='text'
          label='Sample Number'
          name='sample_number'
          value={formik.values.sample_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.sample_number && Boolean(formik.errors.sample_number)}
          helperText={formik.touched.sample_number && formik.errors.sample_number}
          placeholder='Sample Number'
          fullWidth
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='datetime-local'
          label='Result Time'
          name='result_time'
          value={formik.values.result_time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.result_time && Boolean(formik.errors.result_time)}
          helperText={formik.touched.result_time && formik.errors.result_time}
          fullWidth
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='number'
          label='SMP'
          name='SMP'
          value={formik.values.SMP}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.SMP && Boolean(formik.errors.SMP)}
          helperText={formik.touched.SMP && formik.errors.SMP}
          placeholder='SMP'
          fullWidth
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='number'
          label='MIV'
          name='MIV'
          value={formik.values.MIV}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.MIV && Boolean(formik.errors.MIV)}
          helperText={formik.touched.MIV && formik.errors.MIV}
          placeholder='MIV'
          fullWidth
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='number'
          label='FFA'
          name='FFA'
          value={formik.values.FFA}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.FFA && Boolean(formik.errors.FFA)}
          helperText={formik.touched.FFA && formik.errors.FFA}
          placeholder='FFA'
          fullWidth
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='number'
          label='COLOR_B'
          name='COLOR_B'
          value={formik.values.COLOR_B}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.COLOR_B && Boolean(formik.errors.COLOR_B)}
          helperText={formik.touched.COLOR_B && formik.errors.COLOR_B}
          placeholder='COLOR_B'
          fullWidth
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='number'
          label='COLOR_Y'
          name='COLOR_Y'
          value={formik.values.COLOR_Y}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.COLOR_Y && Boolean(formik.errors.COLOR_Y)}
          helperText={formik.touched.COLOR_Y && formik.errors.COLOR_Y}
          placeholder='COLOR_Y'
          fullWidth
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='number'
          label='COLOR_R'
          name='COLOR_R'
          value={formik.values.COLOR_R}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.COLOR_R && Boolean(formik.errors.COLOR_R)}
          helperText={formik.touched.COLOR_R && formik.errors.COLOR_R}
          placeholder='COLOR_R'
          fullWidth
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='number'
          label='IV'
          name='IV'
          value={formik.values.IV}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.IV && Boolean(formik.errors.IV)}
          helperText={formik.touched.IV && formik.errors.IV}
          placeholder='IV'
          fullWidth
          sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
        />
        <TextField
          variant='filled'
          type='text'
          label='Chemist Name'
          name='chemist_name'
          value={formik.values.chemist_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.chemist_name && Boolean(formik.errors.chemist_name)}
          helperText={formik.touched.chemist_name && formik.errors.chemist_name}
          placeholder='Chemist Name'
          fullWidth
          sx={{ gridColumn: 'span 4', color: 'primary[400]' }}
        />

        <Box display='flex' mt='20px' sx={{ gridColumn: 'span 2', mb: 2 }}>
          <LoadingButton
            type='submit'
            color='secondary'
            variant='contained'
            loading={loading}
            disabled={loading || !formik.isValid}
            loadingPosition='start'
            startIcon={<SendIcon />}
          >
            <span>Make New Entry</span>
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default LabForm;
