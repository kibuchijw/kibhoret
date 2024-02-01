import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Slider from "@mui/material/Slider";

const Sampling = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const marks = [
    {
      value: 0,
      label: "0°C",
    },
    {
      value: 25,
      label: "25°C",
    },
    {
      value: 50,
      label: "50°C",
    },
    {
      value: 75,
      label: "75°C",
    },
  ];

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <Box m="20px">
      <Header title="SAMPLE RECORDS" subtitle="Record new Sample" />

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
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sampler Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.samplerName}
                name="samplerName"
                error={!!touched.samplerName && !!errors.samplerName}
                helperText={touched.samplerName && errors.samplerName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sample Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sampleType}
                name="sampleType"
                error={!!touched.sampleType && !!errors.sampleType}
                helperText={touched.sampleType && errors.sampleType}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Samples Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.samplesNumber}
                name="samplesNumber"
                error={!!touched.samplesNumber && !!errors.samplesNumber}
                helperText={touched.samplesNumber && errors.samplesNumber}
                sx={{ gridColumn: "span 2", color: "primary[400]" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Inspector Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.inspectorName}
                name="inspectorName"
                error={!!touched.inspectorName && !!errors.inspectorName}
                helperText={touched.inspectorName && errors.inspectorName}
                sx={{ gridColumn: "span 2" }}
              />
              <Slider
                fullwidth
                aria-label="Custom marks"
                defaultValue={40}
                getAriaValueText={valuetext}
                step={5}
                valueLabelDisplay="on"
                marks={marks}
                display="flex"
                type="number"
                title="Temperature"
                onBlur={handleBlur}
                onChange={handleChange}
                valuetext={values.temperature}
                color="secondary"
                sx={{
                  gridColumn: "span 4",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Notes"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.notes}
                name="notes"
                error={!!touched.notes && !!errors.notes}
                helperText={touched.notes && errors.notes}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
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
  samplerName: yup
    .string()
    .max(100, "Maximum words exceeded!")
    .required("required"),
  sampleType: yup
    .string()
    .max(100, "Maximum words exceeded!")
    .required("required"),
  samplesNumber: yup.number().required("required"),
  inspectorName: yup
    .string()
    .max(100, "Maximum words exceeded!")
    .required("required"),
  notes: yup.string().max(250, "Maximum words exceeded!").required("required"),
});
const initialValues = {
  samplerName: "",
  sampleType: "",
  samplesNumber: "",
  inspectorName: "",
  notes: "",
};

export default Sampling;
