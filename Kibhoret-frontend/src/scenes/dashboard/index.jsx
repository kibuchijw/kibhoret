import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import Header from "../../components/Header";

import StatBox from "../../components/StatBox";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link to="/trucks">
            <StatBox
              subtitle="View All Trucks"
              icon={
                <img
                  alt="truck icon"
                  width="50px"
                  height="50px"
                  display="flex"
                  src={`/src/assets/truck.png`}
                />
              }
            />
          </Link>
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="2"
            subtitle="Trucks in Process"
            icon={
              <img
                alt="truck icon"
                width="50px"
                height="50px"
                display="flex"
                src={`src/assets/gate.svg`}
                color="colors.greenAccent[600]"
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="2"
            subtitle="Trucks in Process"
            icon={
              <img
                alt="truck icon"
                width="50px"
                height="50px"
                display="flex"
                src={`src/assets/balance-scale.svg`}
                color="colors.greenAccent[600]"
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="2"
            subtitle="Trucks in Process"
            icon={
              <img
                title="Lab"
                alt="lab icon"
                width="50px"
                height="50px"
                display="flex"
                src={`src/assets/sampling.svg`}
                color="colors.greenAccent[600]"
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="2"
            subtitle="Trucks in Process"
            icon={
              <img
                title="Lab"
                alt="lab icon"
                width="50px"
                height="50px"
                display="flex"
                src={`src/assets/lab.svg`}
                color="colors.greenAccent[600]"
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="2"
            subtitle="Trucks in Process"
            icon={
              <img
                alt="truck icon"
                width="50px"
                height="50px"
                display="flex"
                src={`src/assets/tanker.svg`}
                color="colors.greenAccent[600]"
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
