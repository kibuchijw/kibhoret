import { Box, Button, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Header from '../../components/Header';
import StatBox from '../../components/StatBox';
import { Link } from 'react-router-dom';
import getTruckCountByStage from './truckCount';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [inCount, setInCount] = useState(0);
  const [outCount, setOutCount] = useState(0);
  const [qcCount, setQcCount] = useState(0);
  const [tankFarmCount, setTankFarmCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const inCount = await getTruckCountByStage('weighbridge/in');
      setInCount(inCount);

      const outCount = await getTruckCountByStage('weighbridge/out');
      setOutCount(outCount);

      const qcCount = await getTruckCountByStage('qualitycontrol');
      setQcCount(qcCount);
      console.log(qcCount);

      const tankFarmCount = await getTruckCountByStage('tankfarm');
      setTankFarmCount(tankFarmCount);
    };

    fetchCounts();
  }, []);

  return (
    <Box m='20px'>
      {/* HEADER */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='DASHBOARD' subtitle='Welcome to your dashboard' />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px'
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: '10px' }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gridAutoRows='140px' gap='20px'>
        {/* ROW 1 */}
        <Box
          gridColumn='span 4'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
          width='100%' // Set the width to 100% to maintain original size
        >
          <Link to='/trucks' style={{ display: 'contents' }}>
            <StatBox
              subtitle='View All Trucks'
              icon={
                <img
                  alt='truck icon'
                  width='50px'
                  height='50px'
                  display='flex'
                  src='/src/assets/truck.png'
                />
              }
            />
          </Link>
        </Box>
        <Box
          gridColumn='span 4'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Link to='/gate' style={{ display: 'contents' }}>
            <StatBox
              subtitle='Gate'
              icon={
                <img
                  alt='truck icon'
                  width='50px'
                  height='50px'
                  display='flex'
                  src='src/assets/gate.svg'
                  color='colors.greenAccent[600]'
                />
              }
            />
          </Link>
        </Box>
        <Box
          gridColumn='span 4'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Link to='/weighbridge' style={{ display: 'contents' }}>
            <StatBox
              title={inCount}
              subtitle='IN'
              icon={
                <img
                  alt='truck icon'
                  width='50px'
                  height='50px'
                  display='flex'
                  src='src/assets/balance-scale.svg'
                  color='colors.greenAccent[600]'
                />
              }
            />
          </Link>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn='span 4'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Link to='/lab' style={{ display: 'contents' }}>
            <StatBox
              title={qcCount}
              subtitle='QC'
              icon={
                <img
                  title='Lab'
                  alt='lab icon'
                  width='50px'
                  height='50px'
                  display='flex'
                  src='src/assets/lab.svg'
                  color='colors.greenAccent[600]'
                />
              }
            />
          </Link>
        </Box>
        <Box
          gridColumn='span 4'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Link to='/offloading' style={{ display: 'contents' }}>
            <StatBox
              title={tankFarmCount}
              subtitle='Offloading'
              icon={
                <img
                  alt='truck icon'
                  width='50px'
                  height='50px'
                  display='flex'
                  src='src/assets/tanker.svg'
                  color='colors.greenAccent[600]'
                />
              }
            />
          </Link>
        </Box>
        <Box
          gridColumn='span 4'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Link to='/weighbridge' style={{ display: 'contents' }}>
            <StatBox
              title={outCount}
              subtitle='OUT'
              icon={
                <img
                  alt='truck icon'
                  width='50px'
                  height='50px'
                  display='flex'
                  src='src/assets/balance-scale.svg'
                  color='colors.greenAccent[600]'
                />
              }
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
