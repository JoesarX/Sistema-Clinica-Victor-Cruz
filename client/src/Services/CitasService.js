import axios from 'axios';

//const API_URL = 'http://localhost:8000';
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

export const filterCita = async (estado) => {
    try {
        const res = await axios.get(`${API_URL}/citas/filtrarCitasTabla/${estado}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch cita');
    }
};


export const postCitas = async (cita) => {
    try {
        const res = await axios.post(`${API_URL}/citas`, cita);
        console.log("SUCCESS POSTING CITA");
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log('Error posting cita:', error);
        throw error;
    }
};

export const editCitas = async (id, cita) => {
    try {
        console.log("In Service Edit");
        await axios.put(`${API_URL}/citas/${id}`, cita);

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

export const getAvailableTimes = async (date, id = null) => {
    try {
        console.log("In Service getAvailableTimes");
        console.log(date);
        const url = id ? `${API_URL}/citas/availableTimes/${date}?id=${id}` : `${API_URL}/citas/availableTimes/${date}`;
        const res = await axios.get(url);
        console.log("SUCCESS FETCHING AVAILABLE TIMES");
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch Times');
    }
};

const Services = {
    getAllCitas,
    postCitas,
    getOneCita,
    deleteCitas,
    editCitas,
    getAvailableTimes,
    filterCita
    // Other functions
};

export default Services;