import React from "react";
import { Box } from "@mui/material";
import CurrentTrucks from "../global/CurrentTrucks";

const TruckView = () => {
  return (
    <Box m="20px">
      <CurrentTrucks
        endpoint="http://54.198.64.165:8000/api/tankfarm"
        link="/offloading/form"
      />
    </Box>
  );
};

export default TruckView;
