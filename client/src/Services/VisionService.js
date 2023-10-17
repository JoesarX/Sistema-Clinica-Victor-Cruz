import axios from 'axios';

//const API_URL = 'http://localhost:8000';
const API_URL = 'https://DrVictorCruz.azurewebsites.net/usuarios';




export const getVision = async () => {
    try {
        const res = await axios.get(`${API_URL}/vision`);
        return res.data;

    } catch (error) {
        
        throw new Error('Failed to fetch vision');
    }
};


export const editVision = async (vision) => {
    try {
        console.log(vision)
        await axios.put(`${API_URL}/vision/${'34'}`, vision);
    } catch (error) {
        
        throw new Error('Failed to edit vision');
    }
};

const Services = {
    getVision,
    editVision

};

export default Services;