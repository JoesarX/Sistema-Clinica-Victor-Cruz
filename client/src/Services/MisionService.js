import axios from 'axios';

const API_URL = 'http://localhost:8000';
//const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';




export const getMision = async () => {
    try {
        const res = await axios.get(`${API_URL}/mision`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch Mision');
    }
};


export const editMision = async (mision) => {
   
    try {
        await axios.put(`${API_URL}/mision/${'24'}`,mision);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit mision');
    }
};

const Services = {
    getMision,
    editMision

};

export default Services;