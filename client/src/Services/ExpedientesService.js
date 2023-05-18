import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getAllExpedientes = async () => {
    try {
        const res = await axios.get(`${API_URL}/expedientes`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch expedientes');
    }
};

export const postExpedientes = async (expediente) => {
    try {
        const res = await axios.post(`${API_URL}/expedientes`, expediente);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to post expediente');
    }
};

const Services ={
    getAllExpedientes,
    postExpedientes,
    // Other functions
};

export default Services;