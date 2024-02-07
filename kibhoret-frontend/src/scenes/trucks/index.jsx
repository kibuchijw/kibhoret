import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import axios from 'axios';

const Trucks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [trucks, setTrucks] = useState([]);
  const [totalTrucks, setTotalTrucks] = useState(0); // State to store the total count of trucks

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/trucks');
        console.log('Response data:', response.data);
        setTrucks(response.data.all_trucks); // Extract the "all_trucks" array
        setTotalTrucks(response.data.total_trucks); // Extract the total count of trucks
      } catch (error) {
        console.error('Error fetching trucks:', error);
      }
    };

    fetchTrucks();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 'auto' },
    {
      field: 'driver',
      headerName: 'Driver',
      headerAlign: 'left',
      align: 'left',
      flex: 'auto'
    }, {
      field: 'cab_plate',
      headerName: 'Cab Plate',
      headerAlign: 'left',
      align: 'left',
      flex: 'auto'
    }, {
      field: 'trailer_plate',
      headerName: 'Trailer Plate',
      headerAlign: 'left',
      align: 'left',
      flex: 'auto'
    }
  ];

  return (
    <Box m='20px'>
      <Header title='TRUCKS' subtitle={`Trucks within the Company (${totalTrucks})`} /> {/* Display total truck count */}
      <Box
        m='40px 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300]
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none'
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400]
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700]
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`
          }
        }}
      >
        <DataGrid checkboxSelection rows={trucks} columns={columns} />
      </Box>
    </Box>
  );
};

export default Trucks;
