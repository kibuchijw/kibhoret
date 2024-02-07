import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';

import Header from '../../components/Header';

import StatBox from '../../components/StatBox';
import { Link } from 'react-router-dom';

const WeighBridge = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m='20px'>
      {/* HEADER */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header
          title='WEIGHBRIDGE RECORDS'
          subtitle='Please select in or out'
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display='flex'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='140px'
        gap='20px'
      >
        {/* ROW 1 */}
        <Box
          gridColumn='span 2'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Link to='/weighbridge/in'>
            <StatBox
              title='IN'
              subtitle='Record new Truck entry'
              icon={
                <img
                  alt='truck icon'
                  width='50px'
                  height='50px'
                  display='flex'
                  src='/src/assets/truck-entry.svg'
                />
              }
            />
          </Link>
        </Box>
        <Box
          gridColumn='span 2'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Link to='/weighbridge/out'>
            <StatBox
              title='OUT'
              subtitle='Record new Truck exit'
              display='flex'
              icon={
                <img
                  alt='truck icon'
                  width='50px'
                  height='50px'
                  display='flex'
                  src='/src/assets/truck-exit.svg'
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

export default WeighBridge;
