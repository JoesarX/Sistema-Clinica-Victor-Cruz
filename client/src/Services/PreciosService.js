import axios from 'axios';
const API_URL = 'http://localhost:8000';
//const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

//traer todas las categorías
export const getAllPrecios = async () => {
    try {
        const res = await axios.get(`${API_URL}/precios`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch precios');
    }
};

//agregar Categoría
export const postPrecios = async (precioValue) => {
    console.log(precioValue)
    try {
        const res = await axios.post(`${API_URL}/precios`, precioValue);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to post precios');
    }
};

export const editPrecios = async (object) => {
    try {
        console.log(object);
        console.log("Este es el id= " + object.id);
        await axios.put(`${API_URL}/precios/${object.id}`, object);

    } catch (error) {
        console.error('editPrecios', error);
        throw new Error('Fallo al editar Precios');
    }
};

export const deletePrecios = async (id) => {
    try {
        console.log("Este es el id: " + id);
        await axios.delete(`${API_URL}/precios/${id}`);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete categorias');
    }
};
const Services = {
    getAllPrecios,
    postPrecios,
    editPrecios,
    deletePrecios
    // Other functions
};

export default Services;