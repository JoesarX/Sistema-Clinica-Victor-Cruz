import axios from 'axios';

//const API_URL = 'http://localhost:8000';
const API_URL = 'https://clinicadrvictorcruz.azurewebsites.net';

//============================================== G E T S ==================================================================
export const getAllRecetas = async () => {
    try {
        const res = await axios.get(`${API_URL}/recetas`);
        
        
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch recetas');
    }
};

export const getOneReceta = async (id) => {
    
    try {
        const res = await axios.get(`${API_URL}/recetas/${id}`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch receta');
    }
};

export const getRecetasByCita = async (idcita) => {
    
    try {
        const res = await axios.get(`${API_URL}/recetas/cita/${idcita}`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch receta');
    }
};

//============================================== P O S T S ==================================================================
export const postRecetas = async (receta) => {
    try {
        const res = await axios.post(`${API_URL}/recetas`, receta);
        return res.data;
    } catch (error) {
        
        throw error;
    }
};

export const postRecetasByCita = async (idcita, recetasLista) => {
    try {
        console.log("In Service postRecetasByCita. Idcita: ", idcita)
        const res = await axios.post(`${API_URL}/recetas/cita/${idcita}`, recetasLista);
        
        

        return res.data;
    } catch (error) {
        
        throw error; 
    }
};

//============================================== P U T S ==================================================================
export const editRecetas = async (id, receta) => {
    try {
        await axios.put(`${API_URL}/recetas/${id}`, receta);
    } catch (error) {
        
        throw new Error('Failed to edit receta');
    }
};

export const editRecetasByCita = async (idcita, recetasLista) => {
    try {
        await axios.put(`${API_URL}/recetas/cita/${idcita}`, recetasLista);
    } catch (error) {
        
        throw new Error('Failed to edit receta');
    }
};

//============================================== D E L E T E S ==================================================================
export const deleteRecetas = async (id) => {
    try {
        await axios.delete(`${API_URL}/recetas/${id}`);
    } catch (error) {
        
        throw new Error('Failed to delete receta');
    }
};

export const deleteRecetasByCita = async (idcita) => {
    try {
        await axios.delete(`${API_URL}/recetas/cita/${idcita}`);
    } catch (error) {
        
        throw new Error('Failed to delete receta');
    }
};


const Services = {
    getAllRecetas,
    getOneReceta,
    getRecetasByCita,
    postRecetas,
    postRecetasByCita,
    editRecetas,
    editRecetasByCita,
    deleteRecetas,
    deleteRecetasByCita,
    
    // Other functions
};

export default Services;