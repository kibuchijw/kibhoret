import React, { useState, useContext } from 'react';
import { Box, IconButton, useTheme, Badge } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import NotificationIcon from '@mui/icons-material/Notifications'; // Import the notification icon

const Topbar = ({ notification }) => { // Pass notification as props
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // State to manage notifications
  const [notificationsCount, setNotificationsCount] = useState(0); // Use state for notification count

  // Function to handle badge click and display notifications
  const handleNotificationClick = () => {
    // Logic to display notifications, e.g., open a dialog or show a list of notifications
    console.log('Notification clicked. Notifications:', notification);
    // Reset notification count
    setNotificationsCount(0);
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
        {/* Notification component to display notifications */}
        <IconButton onClick={handleNotificationClick}>
          <Badge badgeContent={notificationsCount} color='secondary'>
            <NotificationIcon color='action' />
          </Badge>
        </IconButton>
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
