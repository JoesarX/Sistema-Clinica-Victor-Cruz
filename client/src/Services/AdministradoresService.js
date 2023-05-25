import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getAllAdministradores = async () => {
    try {
        const res = await axios.get(`${API_URL}/usuarios_admin`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch admin');
    }
};

export const getOneAdministrador = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/usuarios_admin/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch admin');
    }
};

export const postAdministradores = async (administrador) => {
    try {
        const res = await axios.post(`${API_URL}/usuarios_admin`, administrador);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to post admin');
    }
};

export const editAdministradores = async (id,administrador) => {
    try {
        await axios.put(`${API_URL}/usuarios_admin/${id}`,administrador);
       
    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit admin');
    }
};

export const deleteAdministradores = async (id) => {
    try {
         await axios.delete(`${API_URL}/usuarios_admin/${id}`);
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete admin');
    }
};

const Services ={
    getAllAdministradores,
    postAdministradores,
    getOneAdministrador,
    deleteAdministradores,
    editAdministradores
    // Other functions
};

export default Services;