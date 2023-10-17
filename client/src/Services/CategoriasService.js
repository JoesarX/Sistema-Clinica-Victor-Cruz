import axios from 'axios';
//const API_URL = 'http://localhost:8000';
const API_URL = 'https://clinicadrvictorcruz.azurewebsites.net';

//traer todas las categorías
export const getAllCategories = async () => {
    try {
        const res = await axios.get(`${API_URL}/categorias`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch categorias');
    }
};

//agregar Categoría
export const postCategories = async (categoriaValue) => {
    console.log(categoriaValue)
    try {
        const res = await axios.post(`${API_URL}/categorias`, categoriaValue);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to post categorias');
    }
};

export const editCategories = async (id, object) => {
    try {
        
        
        await axios.put(`${API_URL}/categorias/${id}`, object);

    } catch (error) {
        console.error('editCategories', error);
        throw new Error('Fallo al editar categorias');
    }
};

export const deleteCategories = async (id) => {
    try {
        
        await axios.delete(`${API_URL}/categorias/${id}`);
    } catch (error) {
        
        throw new Error('Failed to delete categorias');
    }
};
const Services = {
    getAllCategories,
    postCategories,
    editCategories,
    deleteCategories
    // Other functions
};

export default Services;