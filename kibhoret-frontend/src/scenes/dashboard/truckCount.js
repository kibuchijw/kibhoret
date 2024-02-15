import axios from 'axios';

const getTruckCountByStage = async (stageKey) => {
  try {
    // Convert stageKey to match endpoint format
    const convertedStageKey = stageKey.replace('/', '_');
    const response = await axios.get(`http://127.0.0.1:8000/api/${stageKey}`);
    const trucks = response.data.all_trucks;

    let truckCount = 0;

    for (const truck of trucks) {
      if (truck[convertedStageKey] === null) {
        truckCount++;
      }
    }

    return truckCount;
  } catch (error) {
    console.error('Error retrieving truck data:', error);
    return null;
  }
};

export default getTruckCountByStage;
