import axios from 'axios';

//const API_URL = 'http://localhost:8000';
const API_URL = 'https://DrVictorCruz.azurewebsites.net';

export const getPicsCarrusel = async () => {
    try {
        const res = await axios.get(`${API_URL}/carrusel`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch Carrusel Pictures');
    }
};


export const editMision = async (mision) => {

    try {
        await axios.put(`${API_URL}/mision/${'24'}`, mision);
    } catch (error) {
        
        throw new Error('Failed to edit mision');
    }
};

export const postPicture = async (carrusel) => {
    try {
        const res = await axios.post(`${API_URL}/carrusel`, carrusel);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to post picture');
    }
};

export const editCarrusel = async (id,carrusel) => {
    try {
        await axios.put(`${API_URL}/carrusel/${id}`,carrusel);
       
    } catch (error) {
        
        throw new Error('Failed to edit picture');
    }
};


export const deletePicture = async (id, orden) => {
    try {
         //await axios.delete(`${API_URL}/servicios/${id}`);
         await axios.delete(`${API_URL}/carrusel/${id}`, { data: { orden } });
        
    } catch (error) {
        
        throw new Error('Failed to delete imagen');
    }
};


const Services = {
    getPicsCarrusel,
    editMision,
    postPicture,
    deletePicture,
    editCarrusel

};

export default Services;