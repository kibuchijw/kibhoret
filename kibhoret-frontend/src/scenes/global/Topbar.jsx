import React, { useState, useContext } from 'react';
import {
  Box,
  IconButton,
  useTheme,
  Badge,
  Menu,
  MenuItem
} from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import NotificationIcon from '@mui/icons-material/Notifications';

const Topbar = ({ notifications }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null); // State for anchor element of menu
  const [logoutAnchorEl, setLogoutAnchorEl] = useState(null); // State for logout anchor element

  // Function to handle badge click and display notifications
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element for menu
  };

  // Function to close the notification menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle logout menu open
  const handleLogoutMenuOpen = (event) => {
    setLogoutAnchorEl(event.currentTarget); // Set anchor element for logout menu
  };

  // Function to handle logout menu close
  const handleLogoutMenuClose = () => {
    setLogoutAnchorEl(null);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <Box display='flex' justifyContent='space-between' p={2}>
      {/* SEARCH BAR */}
      <Box
        display='flex'
        backgroundColor={colors.primary[400]}
        borderRadius='3px'
      >
        <InputBase
          id='search-input'
          name='search'
          sx={{ ml: 2, flex: 1 }}
          placeholder='Search'
        />
        <IconButton type='button' sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display='flex'>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark'
            ? (
              <DarkModeOutlinedIcon />
              )
            : (
              <LightModeOutlinedIcon />
              )}
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
          {notifications.length > 0
            ? (
                notifications.map((notification, index) => (
                  <MenuItem key={index} onClick={handleClose}>
                    {notification}
                  </MenuItem>
                ))
              )
            : (
              <MenuItem disabled>
                So lonely here. There are no new updates ;-){' '}
              </MenuItem>
              )}
        </Menu>
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        {/* Logout button */}
        <IconButton onClick={handleLogoutMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>
        {/* Logout dropdown menu */}
        <Menu
          anchorEl={logoutAnchorEl}
          open={Boolean(logoutAnchorEl)}
          onClose={handleLogoutMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          {/* Logout option */}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
