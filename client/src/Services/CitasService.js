import axios from 'axios';

const API_URL = 'https://DrVictorCruz.azurewebsites.net';

// const API_URL = 'http://localhost:8000';


export const getAllCitas = async () => {
    try {
        const res = await axios.get(`${API_URL}/citas`);
        
        
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch citas');
    }
};

export const getAllCitasFiltered = async (status) => {
    try {
        console.log("In Service getAllCitasFiltered")
        console.log("Url: ", `${API_URL}/citas/citasPasadas/${status}`)
        const res = await axios.get(`${API_URL}/citas/citasPasadas/${status}`);
        
        
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch citas');
    }
};

export const getOneCita = async (id) => {
    
    try {
        const res = await axios.get(`${API_URL}/citas/${id}`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch cita');
    }
};

export const getOneCitaWithExpediente = async (id) => {
    
    try {
        const res = await axios.get(`${API_URL}/citas/citas-with-expedientes/${id}`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch cita');
    }
};

export const filterCita = async (estado) => {
    try {
        const res = await axios.get(`${API_URL}/citas/filtrarCitasTabla/${estado}`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch cita');
    }
};


export const postCitas = async (cita) => {
    try {
        const res = await axios.post(`${API_URL}/citas`, cita);
        
        
        return res.data;
    } catch (error) {
        
        throw error;
    }
};
//editCitaPreclinica
//export const editCitaPreclinica
export const editCitasUser = async (id, cita) => {
    try {
        
        await axios.put(`${API_URL}/citas/user/${id}`, cita);

    } catch (error) {
        
        throw new Error('Failed to edit cita');
    }
};
export const editCitas = async (id, cita) => {
    try {
        
        await axios.put(`${API_URL}/citas/${id}`, cita);

    } catch (error) {
        
        throw new Error('Failed to edit cita');
    }
};

export const deleteCitas = async (id) => {
    try {
        await axios.delete(`${API_URL}/citas/${id}`);

    } catch (error) {
        
        throw new Error('Failed to delete cita');
    }
};

export const getAvailableTimes = async (date, id = null) => {
    try {
        
        
        const url = id ? `${API_URL}/citas/availableTimes/${date}?id=${id}` : `${API_URL}/citas/availableTimes/${date}`;
        const res = await axios.get(url);

        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch Times');
    }
};

export const getAvailableTimesTwoWeeks = async (option) => {
    try {
        
        
        const url = `${API_URL}/citas/availableTimesRange/${option}`;
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch Times');
    }
};

export const getUserExpCitas = async (correouser) => {
    try {
        
        
        const res = await axios.get(`${API_URL}/citas/citasexpedientes/${correouser}`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch Times');
    }
};


export const getCheckAvailability = async (fecha, hora, idcita = null) => {
    try {
        const url = idcita
            ? `${API_URL}/citas/checkAvailability?fecha=${fecha}&hora=${hora}&idcita=${idcita}`
            : `${API_URL}/citas/checkAvailability?fecha=${fecha}&hora=${hora}`;

        
        

        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        
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
    getUserExpCitas,
    getAvailableTimesTwoWeeks,
    editCitasUser,
    getOneCitaWithExpediente
    // Other functions
};

export default Services;