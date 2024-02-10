import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';

const OffloadingForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const handlePO_status = (values) => {
    console.log(values);
  };

  return (
    <Box m='20px'>
      <Header title='OFFLOADING BAY' subtitle='Record new offload entry' />

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
                type='time'
                label='Time In'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.timeIn}
                name='timeIn'
                error={!!touched.timeIn && !!errors.timeIn}
                helperText={touched.timeIn && errors.timeIn}
                sx={{ gridColumn: 'span 2' }}
              />
              <FormControl sx={{ gridColumn: 'span 2' }}>
                <InputLabel id='hotOilSpurging'>Hot oil Spurging</InputLabel>
                <Select
                  label='Hot oil Spurging'
                  type='boolean'
                  name='cpoMelting'
                  value={values.cpoMelting}
                  onChange={handleChange}
                >
                  <MenuItem onClick={() => handlePO_status(true)}>Yes</MenuItem>
                  <MenuItem onClick={() => handlePO_status(false)}>no</MenuItem>
                </Select>
              </FormControl>
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
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Operator Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.operatorName}
                name='operatorName'
                error={!!touched.operatorName && !!errors.operatorName}
                helperText={touched.operatorName && errors.operatorName}
                sx={{ gridColumn: 'span 2', color: 'primary[400]' }}
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
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button
                type='submit'
                color='secondary'
                variant='contained'
                endIcon={<SendIcon />}
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

const checkoutSchema = yup.object().shape({
  timeIn: yup.string().required('required'),
  timeOut: yup.string().required('required'),
  cpoMelting: yup.string().required('required'),
  notes: yup.string().max(250, 'Maximum words exceeded!').required('required'),
  operatorName: yup
    .string()
    .max(250, 'Maximum words exceeded!')
    .required('required')
});
const initialValues = {
  timeIn: '',
  cpoMelting: '',
  notes: '',
  operatorName: '',
  timeOut: ''
};

export default OffloadingForm;
