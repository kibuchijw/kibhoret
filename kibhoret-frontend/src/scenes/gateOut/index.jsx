import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';

const GateOut = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m='20px'>
      <Header title='MAKE ENTRY' subtitle='Record a new truck exit' />

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
                label='Truck Plate'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name='truckPlate'
                error={!!touched.truckPlate && !!errors.truckPlate}
                helperText={touched.truckPlate && errors.truckPlate}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Tanker Plate'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tankerPlate}
                name='tankerPlate'
                error={!!touched.tankerPlate && !!errors.tankerPlate}
                helperText={touched.tankerPlate && errors.tankerPlate}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='time'
                label='Time Out'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.timeIn}
                name='timeIn'
                error={!!touched.timeIn && !!errors.timeIn}
                helperText={touched.timeIn && errors.timeIn}
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
                name='officerName'
                error={!!touched.officerName && !!errors.officerName}
                helperText={touched.officerName && errors.officerName}
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
// Regexes to handle truck & tanker plates
const truckPlateRegExp = /^[A-Z]{3} \d{3}[A-Z]$/;
const tankerNumberRegExp = /^[A-Z]{2} \d{4}$/;

const checkoutSchema = yup.object().shape({
  truckPlate: yup
    .string()
    .matches(truckPlateRegExp, 'Truck number plate is not valid')
    .required('required'),
  tankerPlate: yup
    .string()
    .matches(tankerNumberRegExp, 'Tanker number plate is not valid')
    .required('required'),
  timeOut: yup.string().required('required'),
  officerName: yup
    .string()
    .max(100, 'Maximum words exceeded!')
    .required('required')
});
const initialValues = {
  truckPlate: '',
  tankerPlate: '',
  timeOut: '',
  officerName: ''
};

export default GateOut;
