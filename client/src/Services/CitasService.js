import axios from 'axios';

// const API_URL = 'http://localhost:8000';
const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

export const getAllCitas = async () => {
    try {
        const res = await axios.get(`${API_URL}/citas`);
        console.log("SUCCESS FETCHING MEDICAMENTOS");
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch citas');
    }
};

export const getOneCita = async (id) => {
    console.log(id);
    try {
        const res = await axios.get(`${API_URL}/citas/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch cita');
    }
};

export const postCitas = async (cita) => {
    try {
        const res = await axios.post(`${API_URL}/citas`, cita);
        return res.data;
    } catch (error) {
        console.log('Error posting cita:', error);
        throw error; // Rethrow the original error instead of throwing a new one
    }
};

export const editCitas = async (id,cita) => {
    try {
        await axios.put(`${API_URL}/citas/${id}`,cita);
       
    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit cita');
    }
};

export const deleteCitas = async (id) => {
    try {
         await axios.delete(`${API_URL}/citas/${id}`);
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete cita');
    }
};

const Services ={
    getAllCitas,
    postCitas,
    getOneCita,
    deleteCitas,
    editCitas
    // Other functions
};

export default Services;