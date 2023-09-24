import axios from 'axios';

//const API_URL = 'http://localhost:8000';
const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

export const getArchivos = async (id) => {
    
    try {
        const res = await axios.get(`${API_URL}/archivos/${id}`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch archivos');
    }
};

export const postArchivos = async (archivo) => {
    try {
        const res = await axios.post(`${API_URL}/archivos`, archivo);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to post archivo');
    }
};


export const deleteArchivos = async (id) => {
    try {
        await axios.delete(`${API_URL}/archivos/${id}`);

    } catch (error) {
        
        throw new Error('Failed to delete archivos');
    }
};


const Services = {
    getArchivos,
    postArchivos,
    deleteArchivos
};

export default Services;