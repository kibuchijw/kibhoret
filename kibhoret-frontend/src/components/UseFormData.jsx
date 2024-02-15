import { useState, useEffect } from 'react';
import axios from 'axios';

const useFormData = () => {
  const [id, setId] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [time_in, setTimeIn] = useState(new Date().toISOString());
  const [time_out, setTimeOut] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedTruckId = localStorage.getItem('selectedTruckId');
    console.log('Stored Truck ID:', storedTruckId);
    if (storedTruckId) {
      setId(storedTruckId);
    }
  }, []);

  const handleFormSubmit = async (values) => {
    console.log('Starting form submission...');
    if (id) {
      const apiUrl = `http://127.0.0.1:8000/api/truck/${id}/`;
      console.log('API URL:', apiUrl);
      try {
        console.log('Submitting data...');
        setLoading(true);
        const response = await axios.get(apiUrl);
        console.log('Response:', response);
        const existingData = response.data;

        let fieldNameToUpdate = '';

        // Loop through the keys in existingData to find the first null field
        for (const key in existingData) {
          if (existingData[key] === null) {
            fieldNameToUpdate = key;
            break; // Found the first null field, break out of the loop
          }
        }

        if (fieldNameToUpdate === '') {
          console.error('No null field found in existing data.');
          return;
        }

        const formattedValues = {
          ...values,
          time_in,
          time_out: new Date().toISOString()
        };

        const updatedData = {
          ...existingData,
          [fieldNameToUpdate]: formattedValues
        };

        await axios.put(apiUrl, updatedData);
        setSubmissionMessage('Data submitted successfully!');
        // Introduce a delay before redirecting
        setTimeout(() => {
          window.history.back();
        }, 8000);
      } catch (error) {
        console.error('An error occurred while submitting data:', error);
        setSubmissionMessage(
          'An error occurred while submitting data, Please try again.'
        );
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Truck ID not available.');
    }
  };

  return {
    id,
    setId,
    submissionMessage,
    setSubmissionMessage,
    time_in,
    setTimeIn,
    time_out,
    setTimeOut,
    loading,
    setLoading,
    handleFormSubmit
  };
};

export default useFormData;
