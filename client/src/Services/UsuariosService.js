import axios from 'axios';

const API_URL = 'http://localhost:8000/usuarios';

export const getAllusuarios = async () => {
    try {
        const res = await axios.get(`${API_URL}/usuarios`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch usuarios');
    }
};



export const postUsuarios = async (usuario) => {
    try {
        const res = await axios.post(`${API_URL}/usuarios`, usuario);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to post usuario');
    }
};

export const editusuarios = async (id,usuario) => {
    try {
        await axios.put(`${API_URL}/usuarios/${id}`,usuario);
       
    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit usuario');
    }
};

export const deleteusuarios = async (id) => {
    try {
         await axios.delete(`${API_URL}/usuarios/${id}`);
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete usuario');
    }
};

const Services ={
    getAllusuarios,
    postUsuarios,
   
    deleteusuarios,
    editusuarios
    // Other functions
};

export default Services;