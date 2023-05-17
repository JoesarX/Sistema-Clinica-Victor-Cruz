import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getAllPacientes = async () => {
    try {
        const res = await axios.get(`${API_URL}/pacientes`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch pacientes');
    }
};

export const postPaciente = async (paciente) => {
    try {
        const res = await axios.post(`${API_URL}/pacientes`, paciente);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to post paciente');
    }
};

const Services ={
    getAllPacientes,
    postPaciente,
    // Other functions
};

export default Services;