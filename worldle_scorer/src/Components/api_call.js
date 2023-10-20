import axios from 'axios';

const InitApiCall = async() => {
    try {
        const response = await axios.get('http://localhost:4000/api/today');
        
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }

}
export default InitApiCall;