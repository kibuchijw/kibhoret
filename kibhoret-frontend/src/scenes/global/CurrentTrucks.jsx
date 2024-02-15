import React, { useEffect, useState } from 'react';
import { Box, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TruckDetails from './Trucks';

const CurrentTrucks = ({ endpoint, link }) => { // Pass the endpoint and link as props
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [trucks, setTrucks] = useState([]);
  const [totalTrucks, setTotalTrucks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await axios.get(endpoint); // Use the passed endpoint
        setTrucks(response.data.all_trucks);
        setTotalTrucks(response.data.total_trucks);
      } catch (error) {
        setError('Error fetching trucks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrucks();
  }, [endpoint]); // Update useEffect dependency to include endpoint

  // Function to retrieve header name dynamically
  const extractNameFromEndpoint = (endpoint) => {
    endpoint = endpoint.replace(/\/+$/, '');
    const segments = endpoint.split('/');
    let name = '';

    // Loop through the segments from the end
    for (let i = segments.length - 1; i >= 0; i--) {
      if (segments[i].toLowerCase() === 'api') {
        for (let j = i + 1; j < segments.length; j++) {
          name += segments[j] + ' ';
        }
        name = name.trim();
        break;
      }
    }
    name = name.toUpperCase();
    return name;
  };

  const name = extractNameFromEndpoint(endpoint);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 'auto' },
    {
      field: 'view', // New column for "View" button
      headerName: 'View',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button color='secondary' variant='outlined' onClick={() => handleViewClick(params.row)}>View</Button>
      )
    },
    {
      field: 'edit', // New column for "Edit" button
      headerName: 'Edit',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Link to={`${link}`} style={{ textDecoration: 'none' }}>
          <Button color='secondary' variant='outlined' onClick={() => handleViewClick(params.row.id)}>Edit</Button>
        </Link>
      )
    },
    { field: 'cab_plate', headerName: 'Cab Plate', headerAlign: 'left', align: 'left', flex: 'auto' },
    { field: 'trailer_plate', headerName: 'Trailer Plate', headerAlign: 'left', align: 'left', flex: 'auto' },
    { field: 'driver', headerName: 'Driver', headerAlign: 'left', align: 'left', flex: 'auto' }


  ];

  const handleViewClick = (truckId) => {
    setSelectedTruck(truckId);
    setOpenDialog(true);
    // Store the ID of the selected truck in local storage
    localStorage.setItem('selectedTruckId', truckId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box m='20px'>
      <Header title={name} subtitle={`Trucks at this stage (${totalTrucks})`} />
      <Box
        m='40px 0 0 0'
        sx={{
          '& .MuiDataGrid-root': { border: 'none' },
          '& .MuiDataGrid-cell': { borderBottom: 'none' },
          '& .name-column--cell': { color: colors.greenAccent[300] },
          '& .MuiDataGrid-columnHeaders': { backgroundColor: colors.blueAccent[700], borderBottom: 'none' },
          '& .MuiDataGrid-virtualScroller': { backgroundColor: colors.primary[400] },
          '& .MuiDataGrid-footerContainer': { borderTop: 'none', backgroundColor: colors.blueAccent[700] },
          '& .MuiCheckbox-root': { color: `${colors.greenAccent[200]} !important` }
        }}
      >
        <DataGrid checkboxSelection rows={trucks} columns={columns} />
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Truck Details</DialogTitle>
        <DialogContent>
          {selectedTruck && <TruckDetails selectedTruck={selectedTruck} />} {/* Use TruckDetails component */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CurrentTrucks;
