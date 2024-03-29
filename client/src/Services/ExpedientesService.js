import axios from 'axios';


//const API_URL = 'http://localhost:8000';
const API_URL = 'https://DrVictorCruz.azurewebsites.net';

export const getAllExpedientes = async () => {
    try {
        const res = await axios.get(`${API_URL}/expedientes`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch expedientes');
    }
};

export const getOneExpediente = async (id) => {
    
    try {
        const res = await axios.get(`${API_URL}/expedientes/${id}`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch expediente');
    }
};


export const getUserExpedients = async (mail) => {
    console.log(mail)
    try {
        const res = await axios.get(`${API_URL}/expedientes/UserExpedients/${mail}`);
        console.log("GG")
        console.log(res.data)
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch expediente');
    }
};
export const getOneUser = async (email) => {
    
    
};

export const getExpedientes = async (email) => {

    try {
        const expedientes = await axios.get(`${API_URL}/expedientes/userpage/${email}`);
        
        return expedientes.data;
    } catch (error) {
        
        throw new Error('Failed to fetch landing page');
    }
};

export const getOneExpedienteDashboard = async (id) => {
    
    try {
        const res = await axios.get(`${API_URL}/expedientes/dashboard/${id}`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch expediente');
    }
};
export const getCitasOneExpediente = async (id) => {
    
    try {
        const res = await axios.get(`${API_URL}/expedientes/dashboard/cita/${id}`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch citas from expediente');
    }
};

export const editExpedientesDashboard = async (id, expediente) => {
    try {
        
        
        
        await axios.put(`${API_URL}/expedientes/dashboard/${id}`, expediente);

    } catch (error) {
        
        throw new Error('Failed to edit expediente');
    }
};

export const postExpedientes = async (expediente) => {
    try {
        const res = await axios.post(`${API_URL}/expedientes`, expediente);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to post expediente');
    }
};

export const editExpedientes = async (id, expediente) => {
    try {
        
        
        
        await axios.put(`${API_URL}/expedientes/${id}`, expediente);

    } catch (error) {
        
        throw new Error('Failed to edit expediente');
    }
};

export const deleteExpedientes = async (id) => {
    try {
        await axios.delete(`${API_URL}/expedientes/${id}`);

    } catch (error) {
        
        throw new Error('Failed to delete expediente');
    }
};

const Services = {
    getAllExpedientes,
    postExpedientes,
    getOneExpediente,
    getOneExpedienteDashboard,
    deleteExpedientes,
    editExpedientes,
    editExpedientesDashboard,
    getOneUser,
    getCitasOneExpediente,
    getUserExpedients,
    getExpedientes,
    getCitasOneExpediente

    // Other functions
};

export default Services;