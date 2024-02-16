import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import axios from 'axios';
import TruckDetails from '../global/Trucks';

const Trucks = () => {
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
        const response = await axios.get('http://127.0.0.1:8000/api/trucks');
        setTrucks(response.data.all_trucks);
        setTotalTrucks(response.data.total_trucks);
      } catch (error) {
        setError('Error fetching trucks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrucks();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 'auto' },
    {
      field: 'actions',
      headerName: 'Actions',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button color='secondary' variant='outlined' onClick={() => handleViewClick(params.row)}>View</Button>
      )
    },
    { field: 'cab_plate', headerName: 'Cab Plate', headerAlign: 'left', align: 'left', flex: 'auto' },
    { field: 'trailer_plate', headerName: 'Trailer Plate', headerAlign: 'left', align: 'left', flex: 'auto' },
    { field: 'driver', headerName: 'Driver', headerAlign: 'left', align: 'left', flex: 'auto' }

  ];

  const handleViewClick = (truckId) => {
    setSelectedTruck(truckId);
    setOpenDialog(true);
    localStorage.setItem('selectedTruckId', truckId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box m='20px'>
      <Header title='TRUCKS' subtitle={`All trucks ever served (${totalTrucks})`} />
      <Box
        m='40px 0 0 0'
        height='75vh'
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
          {selectedTruck && <TruckDetails selectedTruck={selectedTruck} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Trucks;
