import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../theme';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FenceIcon from '@mui/icons-material/Fence';
import ScaleIcon from '@mui/icons-material/Scale';
import BiotechIcon from '@mui/icons-material/Biotech';
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100]
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important'
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important'
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important'
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important'
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100]
            }}
          >
            {!isCollapsed && (
              <Box display='flex' justifyContent='space-between' alignItems='center' ml='15px'>
                <Typography variant='h3' color={colors.grey[100]}>
                  DEPARTMENTS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <img
                  alt='profile-user'
                  width='100px'
                  height='100px'
                  src='/src/assets/user.svg'
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign='center'>
                <Typography
                  variant='h2'
                  color={colors.grey[100]}
                  fontWeight='bold'
                  sx={{ m: '10px 0 0 0' }}
                >
                  USER
                </Typography>
                <Typography variant='h5' color={colors.greenAccent[500]}>
                  Role
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/'
              icon={<HomeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='All Trucks'
              to='/trucks'
              icon={<LocalShippingIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Gate'
              to='/gate'
              icon={<FenceIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Weighbridge'
              to='/weighbridge'
              icon={<ScaleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Quality Control'
              to='/lab'
              icon={<BiotechIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Truck Offloading'
              to='/offloading'
              icon={<Battery0BarIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Metrics'
              // to='/metrics'
              icon={<QueryStatsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
