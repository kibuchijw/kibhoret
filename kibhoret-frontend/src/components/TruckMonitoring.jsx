import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TruckMonitoringService = ({ onNotification }) => {
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/trucks');
        setTrucks(response.data.all_trucks);
        checkNotifications(response.data.all_trucks);
      } catch (error) {
        console.error('Error fetching trucks:', error);
      }
    };

    const interval = setInterval(fetchTrucks, 600000); // Fetch every 10 min

    return () => clearInterval(interval);
  }, []);

  const checkNotifications = (trucks) => {
    trucks.forEach((truck) => {
      if (truck.general_info && !truck.weighbridge_in) {
        onNotification('Truck headed to weighbridge in.');
      }
      if (truck.weighbridge_in && !truck.quality_control) {
        onNotification('Truck at weighbridge in. Proceed to quality control.');
      }
      if (truck.quality_control && !truck.tankfarm) {
        onNotification('Truck passed quality control. Proceed to offloading.');
      }
      if (truck.tankfarm && !truck.weighbridge_out) {
        onNotification('Truck at offloading. Head to weighbridge out for second weighing.');
      }
      if (truck.weighbridge_out) {
        onNotification('Truck ready to exit. Proceed to the gate.');
      }
    });
  };

  return null;
};

export default TruckMonitoringService;
