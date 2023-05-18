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

export const getOneExpediente = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/expedientes/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch expediente');
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

export const editExpedientes = async (id,expediente) => {
    try {
        await axios.put(`${API_URL}/expedientes/${id}`,expediente);
       
    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit expediente');
    }
};

export const deleteExpedientes = async (id) => {
    try {
         await axios.delete(`${API_URL}/expedientes/${id}`);
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete expediente');
    }
};

const Services ={
    getAllExpedientes,
    postExpedientes,
    getOneExpediente,
    deleteExpedientes,
    editExpedientes
    // Other functions
};

export default Services;