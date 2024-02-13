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
    if (id) {
      const apiUrl = `http://127.0.0.1:8000/api/truck/${id}/`;
      console.log('API URL:', apiUrl);
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        const existingData = response.data;

        const formattedValues = {
          ...values,
          time_in,
          time_out: new Date().toISOString()
        };

        const updatedData = {
          ...existingData,
          weighbridge_in: formattedValues
        };

        await axios.put(apiUrl, updatedData);
        setSubmissionMessage('Data submitted successfully!');
        window.history.back();
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
