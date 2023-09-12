import axios from 'axios';
//const API_URL = 'http://localhost:8000';
const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

//traer todas las categorías
export const getAllId_cmd = async () => {
    try {
        const res = await axios.get(`${API_URL}/id_cmd`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch id_cmd');
    }
};

//agregar Categoría
export const postId_cmd = async (categoriaValue) => {
    console.log(categoriaValue)
    try {
        const res = await axios.post(`${API_URL}/id_cmd`, categoriaValue);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to post id_cmd');
    }
};

export const editId_cmd = async (object) => {
    try {
        
        
         await axios.put(`${API_URL}/id_cmd/${object[0]}`, object);
        
    } catch (error) {
        console.error('editCategories', error);
        throw new Error('Fallo al editar id_cmd');
    }
};

export const deleteId_cmd = async (id) => {
    try {
        
        await axios.delete(`${API_URL}/id_cmd/${id}`);
    } catch (error) {
        
        throw new Error('Failed to delete id_cmd');
    }
};
const Services = {
    getAllId_cmd,
    postId_cmd,
    editId_cmd,
    deleteId_cmd
    // Other functions
};

export default Services;