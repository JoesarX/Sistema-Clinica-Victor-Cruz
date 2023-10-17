import axios from 'axios';


//const API_URL = 'http://localhost:8000';
const API_URL = 'https://DrVictorCruz.azurewebsites.net';

export const getAllMedicamentos = async () => {
    try {
        const res = await axios.get(`${API_URL}/medicamentos`);
        
        
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch medicamentos');
    }
};

export const getOneMedicamento = async (id) => {
    
    try {
        const res = await axios.get(`${API_URL}/medicamentos/${id}`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch medicamento');
    }
};

export const postMedicamentos = async (medicamento) => {
    try {
        const res = await axios.post(`${API_URL}/medicamentos`, medicamento);
        return res.data;
    } catch (error) {
        
        throw error; // Rethrow the original error instead of throwing a new one
    }
};

export const editMedicamentos = async (id, medicamento) => {
    try {
        await axios.put(`${API_URL}/medicamentos/${id}`, medicamento);

    } catch (error) {
        
        throw new Error('Failed to edit medicamento');
    }
};

export const deleteMedicamentos = async (id) => {
    try {
        await axios.delete(`${API_URL}/medicamentos/${id}`);

    } catch (error) {
        
        throw new Error('Failed to delete medicamento');
    }
};

const Services = {
    getAllMedicamentos,
    postMedicamentos,
    getOneMedicamento,
    deleteMedicamentos,
    editMedicamentos
    // Other functions
};

export default Services;