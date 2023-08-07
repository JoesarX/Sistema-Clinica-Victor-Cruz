import axios from 'axios';

//const API_URL = 'http://localhost:8000';
const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

export const getPicsCarrusel = async () => {
    try {
        const res = await axios.get(`${API_URL}/carrusel`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch Carrusel Pictures');
    }
};


export const editMision = async (mision) => {

    try {
        await axios.put(`${API_URL}/mision/${'24'}`, mision);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit mision');
    }
};

export const postPicture = async (carrusel) => {
    try {
        const res = await axios.post(`${API_URL}/carrusel`, carrusel);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to post picture');
    }
};


export const deletePicture = async (id) => {
    try {
        await axios.delete(`${API_URL}/carrusel/${id}`);

    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete picture');
    }
};


const Services = {
    getPicsCarrusel,
    editMision,
    postPicture,
    deletePicture

};

export default Services;