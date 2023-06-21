import axios from 'axios';
 const API_URL = 'http://localhost:8000';
//const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

//traer todas las categorías
export const getAllCategories = async () => {
    try {
        const res = await axios.get(`${API_URL}/categories`);
        console.log("Sirvo si señor");
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch categorias');
    }
};

//agregar Categoría
export const postCategories = async (categories) => {
    console.log(categories)
    try {
        const res = await axios.post(`${API_URL}/categories`, categories);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to post categorias');
    }
};

export const editCategories = async (id, categories) => {
    try {
        await axios.put(`${API_URL}/categories/${id}`, categories);
        console.log("hola mundo soy yo dio");
    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit categorias');
    }
};

export const deleteCategories = async (id) => {
    try {
        console.log("Este es el id: "+id);
        await axios.delete(`${API_URL}/categories/${id}`);

    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete categorias');
    }
};
const Services ={
    getAllCategories,
    postCategories,
    editCategories,
    deleteCategories
    // Other functions
};

export default Services;