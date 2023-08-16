import axios from 'axios';
 
const API_URL = 'http://localhost:8000';
//const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

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

export const getAllCitasFiltered = async (status) => {
    try {
        console.log("In Service getAllCitasFiltered")
        console.log("Url: " + `${API_URL}/citas/citasPasadas/${status}`)
        const res = await axios.get(`${API_URL}/citas/citasPasadas/${status}`);
        console.log("SUCCESS FETCHING FILTERED MEDICAMENTOS");
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
        
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch Times');
    }
};

export const getUserExpCitas = async (correouser) => {
    try {
        console.log("In Service get citas de expedientes linked a usuarios");
        console.log(correouser);
        const res = await axios.get(`${API_URL}/citas/citasexpedientes/${correouser}`);
        
        
        return res.data[0];
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch Times');
    }
};

export const getCheckAvailability = async (fecha, hora, idcita = null) => {
    try {
        const url = idcita
            ? `${API_URL}/citas/checkAvailability?fecha=${fecha}&hora=${hora}&idcita=${idcita}`
            : `${API_URL}/citas/checkAvailability?fecha=${fecha}&hora=${hora}`;

        console.log("In Service getCheckAvailability");
        console.log(url);

        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to check availability");
    }
};



const Services = {
    getAllCitas,
    getAllCitasFiltered,
    postCitas,
    getOneCita,
    deleteCitas,
    editCitas,
    getAvailableTimes,
    filterCita,
    getCheckAvailability,
    getUserExpCitas
    // Other functions
};

export default Services;