import React, { useState, useContext } from 'react';
import { Box, IconButton, useTheme, Badge, Menu, MenuItem } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import NotificationIcon from '@mui/icons-material/Notifications';

const Topbar = ({ notifications }) => {
  console.log('Notifications type:', typeof notifications);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState(null); // State for anchor element of menu

  // Function to handle badge click and display notifications
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element for menu
  };

  // Function to close the notification menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display='flex' justifyContent='space-between' p={2}>
      {/* SEARCH BAR */}
      <Box display='flex' backgroundColor={colors.primary[400]} borderRadius='3px'>
        <InputBase id='search-input' name='search' sx={{ ml: 2, flex: 1 }} placeholder='Search' />
        <IconButton type='button' sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display='flex'>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        {/* Notification menu */}
        <IconButton onClick={handleNotificationClick}>
          <Badge badgeContent={notifications.length} color='secondary'>
            <NotificationIcon color='action' />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          {notifications.map((notification, index) => (
            <MenuItem key={index} onClick={handleClose}>{notification}</MenuItem>
          ))}
        </Menu>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
