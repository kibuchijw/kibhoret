import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
const WeighBridgeIn = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Link to="/weighbridge">
        <Header
          title="WEIGHBRIDGE RECORDS"
          subtitle="Record a new truck entry"
        />
      </Link>
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
                type="time"
                label="Time In"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.timeIn}
                name="timeIn"
                error={!!touched.timeIn && !!errors.timeIn}
                helperText={touched.timeIn && errors.timeIn}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Truck Weight"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.truckWeight}
                name="truckWeight"
                error={!!touched.truckWeight && !!errors.truckWeight}
                helperText={touched.truckWeight && errors.truckWeight}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Operator Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.operatorName}
                name="operatorName"
                error={!!touched.operatorName && !!errors.operatorName}
                helperText={touched.operatorName && errors.operatorName}
                sx={{ gridColumn: "span 2", color: "primary[400]" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Officer Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="officerName"
                error={!!touched.officerName && !!errors.officerName}
                helperText={touched.officerName && errors.officerName}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
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
  timeIn: yup.string().required("required"),
  truckWeight: yup.number().required("required"),
  operatorName: yup
    .string()
    .max(100, "Maximum words exceeded!")
    .required("required"),
  officerName: yup
    .string()
    .max(100, "Maximum words exceeded!")
    .required("required"),
});
const initialValues = {
  timeIn: "",
  truckWeight: "",
  operatorName: "",
  officerName: "",
};

export default WeighBridgeIn;
