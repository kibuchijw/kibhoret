import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Lab = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="LAB RESULTS" subtitle="Record new lab results" />

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
                label="IV Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ivType}
                name="ivType"
                error={!!touched.ivType && !!errors.ivType}
                helperText={touched.ivType && errors.ivType}
                sx={{ gridColumn: "span 1", color: "primary[400]" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Color_r"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.colorR}
                name="colorR"
                error={!!touched.colorR && !!errors.colorR}
                helperText={touched.colorR && errors.colorR}
                sx={{ gridColumn: "span 1", color: "primary[400]" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Color_y"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.colorY}
                name="colorY"
                error={!!touched.colorY && !!errors.colorY}
                helperText={touched.colorY && errors.colorY}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Color_b"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.colorB}
                name="colorB"
                error={!!touched.colorB && !!errors.colorB}
                helperText={touched.colorB && errors.colorB}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ffa"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ffa}
                name="ffa"
                error={!!touched.ffa && !!errors.ffa}
                helperText={touched.ffa && errors.ffa}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="miv"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.miv}
                name="miv"
                error={!!touched.miv && !!errors.miv}
                helperText={touched.miv && errors.miv}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="smp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.smp}
                name="smp"
                error={!!touched.smp && !!errors.smp}
                helperText={touched.smp && errors.smp}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="time"
                label="Results Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.resultsTime}
                name="resultsTime"
                error={!!touched.resultsTime && !!errors.resultsTime}
                helperText={touched.resultsTime && errors.resultsTime}
                sx={{ gridColumn: "span 1" }}
              />{" "}
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Chemist Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.chemistName}
                name="chemistName"
                error={!!touched.chemistName && !!errors.chemistName}
                helperText={touched.chemistName && errors.chemistName}
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
  ivType: yup.string().required("required"),
  colorR: yup.string().required("required"),
  colorY: yup.string().required("required"),
  colorB: yup.string().required("required"),
  ffa: yup.string().required("required"),
  miv: yup.string().required("required"),
  smp: yup.string().required("required"),
  resultsTime: yup.string().required("required"),
  notes: yup.string().max(250, "Maximum words exceeded!").required("required"),
  chemistName: yup
    .string()
    .max(100, "Maximum words exceeded!")
    .required("required"),
});
const initialValues = {
  ivType: "",
  colorR: "",
  colorY: "",
  colorB: "",
  ffa: "",
  miv: "",
  smp: "",
  resultsTime: "",
  notes: "",
  chemistName: "",
};

export default Lab;
