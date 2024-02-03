import {
  Box,
  Button,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const GateIn = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const handlePO_status = (values) => {
    console.log(values);
  };

  const marks = [
    {
      value: 0,
      label: "Dirty",
    },
    {
      value: 25,
      label: "Not so Dirty",
    },
    {
      value: 50,
      label: "Clean",
    },
    {
      value: 80,
      label: "Very clean",
    },
  ];

  function valuetext(value) {
    return `${value}% clean`;
  }

  return (
    <Box m="20px">
      <Header title="MAKE ENTRY" subtitle="Record a new delivery" />

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
                sx={{ gridColumn: "span 2", color: "primary[400]" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Loading Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.loadingDate}
                name="loadingDate"
                error={!!touched.loadingDate && !!errors.loadingDate}
                helperText={touched.loadingDate && errors.loadingDate}
                sx={{ gridColumn: "span 2", color: "primary[400]" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Delivery Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.deliveryNumber}
                name="deliveryNumber"
                error={!!touched.deliveryNumber && !!errors.deliveryNumber}
                helperText={touched.deliveryNumber && errors.deliveryNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <Slider
                fullwidth
                display="flex"
                type="number"
                title="Cleanliness"
                defaultValue={50}
                getAriaValueText={valuetext}
                step={5}
                marks={marks}
                valueLabelDisplay="on"
                onBlur={handleBlur}
                onChange={handleChange}
                valuetext={values.cleanliness}
                color="secondary"
                sx={{
                  gridColumn: "span 4",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Truck Plate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="truckPlate"
                error={!!touched.truckPlate && !!errors.truckPlate}
                helperText={touched.truckPlate && errors.truckPlate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tanker Plate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tankerPlate}
                name="tankerPlate"
                error={!!touched.tankerPlate && !!errors.tankerPlate}
                helperText={touched.tankerPlate && errors.tankerPlate}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="noOfSeals">Number of Seals</InputLabel>
                <Select
                  label="Number of Seals"
                  type="string"
                  name="numberOfSeals"
                  value={values.seals}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                  <MenuItem value={4}>Four</MenuItem>
                  <MenuItem value={5}>Five</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="sealCondition">Seal Condition</InputLabel>
                <Select
                  label="Seal Condition"
                  type="boolean"
                  name="sealCondition"
                  value={values.sealCondition}
                  onChange={handleChange}
                >
                  <MenuItem onClick={() => handlePO_status(true)}>
                    Intact
                  </MenuItem>
                  <MenuItem onClick={() => handlePO_status(false)}>
                    Tampered
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sealing Condition"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sealingCondition}
                name="sealingCondition"
                error={!!touched.sealingCondition && !!errors.sealingCondition}
                helperText={touched.sealingCondition && errors.sealingCondition}
                sx={{ gridColumn: "span 2" }}
              />{" "}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Leakages"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.leakages}
                name="leakages"
                error={!!touched.leakages && !!errors.leakages}
                helperText={touched.leakages && errors.leakages}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="waterReservoir">Water Reservoir</InputLabel>
                <Select
                  label="Water Reservoir"
                  type="boolean"
                  name="waterReservoir"
                  value={values.waterReservoir}
                  onChange={handleChange}
                >
                  <MenuItem onClick={() => handlePO_status(true)}>
                    Empty
                  </MenuItem>
                  <MenuItem onClick={() => handlePO_status(false)}>
                    Full
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="fuelGauge">Fuel Gauge</InputLabel>
                <Select
                  label="Fuel Gauge"
                  type="string"
                  name="fuelGauge"
                  value={values.fuelGauge}
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Empty</MenuItem>
                  <MenuItem value={25}>Quarter Full</MenuItem>
                  <MenuItem value={50}>Half Full</MenuItem>
                  <MenuItem value={75}>Three Quarters Full</MenuItem>
                  <MenuItem value={100}>Full</MenuItem>
                </Select>
              </FormControl>
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
                sx={{ gridColumn: "span 4" }}
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

// Regexes to handle delivery number, truck & tanker plates
const deliveryNumberRegExp = /^[a-zA-Z0-9]{12}$/;
const truckPlateRegExp = /^[A-Z]{3} \d{3}[A-Z]$/;
const tankerNumberRegExp = /^[A-Z]{2} \d{4}$/;

const checkoutSchema = yup.object().shape({
  timeIn: yup.string().required("required"),
  loadingDate: yup.string().required("required"),
  cleanliness: yup.string().required("required"),
  deliveryNumber: yup
    .string()
    .matches(deliveryNumberRegExp, "Delivery number is not valid")
    .required("required"),
  truckPlate: yup
    .string()
    .matches(truckPlateRegExp, "Truck number plate is not valid")
    .required("required"),
  tankerPlate: yup
    .string()
    .matches(tankerNumberRegExp, "Tanker number plate is not valid")
    .required("required"),
  sealingCondition: yup
    .string()
    .max(100, "Maximum words exceeded!")
    .required("required"),
  leakages: yup
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
  loadingDate: "",
  deliveryNumber: "",
  cleanliness: "",
  truckPlate: "",
  tankerPlate: "",
  seals: "",
  sealCondition: "",
  sealingCondition: "",
  leakages: "",
  fuelGauge: "",
  officerName: "",
};

export default GateIn;
