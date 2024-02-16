import axios from 'axios';

const getTruckCountByStage = async (stageKey) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/${stageKey}`);
    // const trucks = response.data.all_trucks;

    // Extract the total_trucks value from the response data
    const truckCount = response.data.total_trucks;

    return truckCount;
  } catch (error) {
    console.error('Error retrieving truck data:', error);
    return null;
  }
};

export default getTruckCountByStage;
