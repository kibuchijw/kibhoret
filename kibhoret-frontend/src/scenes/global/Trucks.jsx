import React from 'react';
import { Typography } from '@mui/material';

const TruckDetails = ({ selectedTruck }) => {
  // Function to recursively flatten nested objects
  const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const propName = `${prefix}${key}`;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(acc, flattenObject(obj[key], `${propName}_`));
      } else {
        acc[propName] = obj[key];
      }
      return acc;
    }, {});
  };

  // Flatten the selectedTruck object and handle null values
  const flattenedTruck = flattenObject(selectedTruck);

  return (
    <div>
      {Object.entries(flattenedTruck).map(([key, value]) => (
        <Typography key={key}>
          <span style={{ fontWeight: 'bold', color: 'secondary[700]' }}>
            {key.replace(/_/g, ' ')}:
          </span>{' '}
          {value === null ? 'Not yet filled!' : value}
        </Typography>
      ))}
    </div>
  );
};

export default TruckDetails;
