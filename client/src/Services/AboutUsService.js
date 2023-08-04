import axios from 'axios';

const API_URL = 'http://localhost:8000';
//const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

export const getPicsDoctoryDesc = async () => {
    try {
        const res = await axios.get(`${API_URL}/aboutus`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch Pictures');
    }
};


export const editImagen = async (id,url) => {
    try {
        await axios.put(`${API_URL}/aboutus/${id}`,url);
       
    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit imagen');
    }
};

const Services = {
    getPicsDoctoryDesc,
    editImagen

};

export default Services;