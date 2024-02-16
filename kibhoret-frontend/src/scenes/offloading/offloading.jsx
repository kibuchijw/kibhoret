import { Box, TextField, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import useFormData from '../../components/UseFormData';

const OffloadingForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const {
    submissionMessage,
    setSubmissionMessage,
    time_in,
    setTimeIn,
    time_out,
    setTimeOut,
    loading,
    handleFormSubmit
  } = useFormData();

  const validationSchema = yup.object().shape({
    time_in: yup.string().required('Time In is required'),
    time_out: yup.string().required('Time Out is required'),
    notes: yup.string().max(250, 'Maximum words exceeded!').required('Notes is required'),
    operator_name: yup.string().max(250, 'Maximum words exceeded!').required('Operator Name is required')
  });

  return (
    <Box m='20px'>
      <Header title='OFFLOADING BAY' subtitle='Record new offload entry' />
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
      <Formik
        initialValues={{
          time_in: '',
          time_out: '',
          notes: '',
          operator_name: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid
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
                type='datetime-local'
                label='Time In'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.time_in}
                name='time_in'
                error={touched.time_in && !!errors.time_in}
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
                error={touched.time_out && !!errors.time_out}
                helperText={touched.time_out && errors.time_out}
                sx={{ gridColumn: 'span 2' }}
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
                error={touched.notes && !!errors.notes}
                helperText={touched.notes && errors.notes}
                sx={{ gridColumn: 'span 4' }}
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
                error={touched.operator_name && !!errors.operator_name}
                helperText={touched.operator_name && errors.operator_name}
                sx={{ gridColumn: 'span 4', color: 'primary[400]' }}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px' mb='20px'>
              <LoadingButton
                type='submit'
                color='secondary'
                variant='contained'
                loading={loading}
                disabled={loading || !isValid}
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

export default OffloadingForm;
