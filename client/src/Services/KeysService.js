import axios from 'axios';

const API_URL = 'http://localhost:8000';
//const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

//============================================== G E T S ==================================================================
export const fetchKeys = async () => {
    try {
        const res = await axios.get(`${API_URL}/keys`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch keys');
    }
};


const Services = {
    fetchKeys,
    // Other functions
};

export default Services;