import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import axios from 'axios';

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

  const handleViewClick = (truck) => {
    setSelectedTruck(truck);
    setOpenDialog(true);
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
        <DialogTitle><b>Truck Details</b></DialogTitle>
        <DialogContent>
          {selectedTruck && (
            <Box>
              <Typography><b>Driver:</b> {selectedTruck.driver || 'Not yet filled!'}</Typography>
              <Typography><b>Cab Plate:</b> {selectedTruck.cab_plate || 'Not yet filled!'}</Typography>
              <Typography><b>Trailer Plate:</b> {selectedTruck.trailer_plate || 'Not yet filled!'}</Typography>
              <Typography><b>Delivery Number:</b> {selectedTruck.general_info?.delivery_number || 'Not yet filled!'}</Typography>
              <Typography><b>Loading Date:</b> {selectedTruck.general_info?.loading_date || 'Not yet filled!'}</Typography>
              <Typography><b>Fuel Gauge:</b> {selectedTruck.general_info?.fuel_gauge || 'Not yet filled!'}</Typography>
              <Typography><b>Water Reservoir:</b> {selectedTruck.general_info?.water_reservoir || 'Not yet filled!'}</Typography>
              <Typography><b>Number of Seals:</b> {selectedTruck.general_info?.number_of_seals || 'Not yet filled!'}</Typography>
              <Typography><b>Seals Condition:</b> {selectedTruck.general_info?.seals_condition || 'Not yet filled!'}</Typography>
              <Typography><b>Sealing Condition:</b> {selectedTruck.general_info?.sealing_condition || 'Not yet filled!'}</Typography>
              <Typography><b>Seals Identification:</b> {selectedTruck.general_info?.seals_identification || 'Not yet filled!'}</Typography>
              <Typography><b>Time In:</b> {selectedTruck.general_info?.time_in || 'Not yet filled!'}</Typography>
              <Typography><b>Time Out:</b> {selectedTruck.general_info?.time_out || 'Not yet filled!'}</Typography>
              <Typography><b>Officer Name:</b> {selectedTruck.general_info?.officer_name || 'Not yet filled!'}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Trucks;
