import axios from 'axios';

const API_URL = 'http://localhost:8000';
//const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

export const getAllServicios = async () => {
    try {
        const res = await axios.get(`${API_URL}/servicios`);
        console.log("SUCCESS FETCHING SERVICIOS");
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch servicios');
    }
};

export const getOneServicio = async (id) => {
    console.log(id);
    try {
        const res = await axios.get(`${API_URL}/servicios/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch servicio');
    }
};

export const postServicios = async (servicio) => {
    try {
        const res = await axios.post(`${API_URL}/servicios`, servicio);
        return res.data;
    } catch (error) {
        console.log('Error posting servicio:', error);
        throw error; // Rethrow the original error instead of throwing a new one
    }
};

export const editServicios = async (id,servicio) => {
    try {
        await axios.put(`${API_URL}/servicios/${id}`,servicio);
       
    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit servicio');
    }
};

export const deleteServicios = async (id) => {
    try {
         await axios.delete(`${API_URL}/servicios/${id}`);
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete servicio');
    }
};

const Services ={
    getAllServicios,
    postServicios,
    getOneServicio,
    deleteServicios,
    editServicios
    // Other functions
};

export default Services;