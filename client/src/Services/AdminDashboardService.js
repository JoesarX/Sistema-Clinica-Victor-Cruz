import axios from 'axios';

const API_URL = 'http://localhost:8000';
//const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

//============================================== G E T S ==================================================================

export const getAll = async (months) => {
    
    try {
        const res = await axios.get(`${API_URL}/adminDashboard/getAll/${months}}`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch adminDashboard');
    }
};

export const getCountMetodoPago = async () => {
    
    try {
        const res = await axios.get(`${API_URL}/adminDashboard/metodoPago`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch adminDashboard');
    }
};

export const getProfitByMonth = async () => {
    
    try {
        const res = await axios.get(`${API_URL}/adminDashboard/paymentsByMonth`);
        return res.data;
    } catch (error) {
        throw new Error('Failed to fetch adminDashboard');
    }
};

export const getUserCount = async () => {
    
    try {
        const res = await axios.get(`${API_URL}/adminDashboard/userCount`);
        return res.data;
    } catch (error) {
        throw new Error('Failed to fetch adminDashboard');
    }
};

export const getPopularDays = async () => {
    try {
        const res = await axios.get(`${API_URL}/adminDashboard/popularDays`);
        return res.data;
    } catch (error) {
        throw new Error('Failed to fetch adminDashboard');
    }
};

export const getPopularTimes = async () => {
    try {
        const res = await axios.get(`${API_URL}/adminDashboard/popularTimes`);
        return res.data;
    } catch (error) {
        throw new Error('Failed to fetch adminDashboard');
    }
};


const Services = {
    getCountMetodoPago,
    getProfitByMonth,
    getUserCount,
    getPopularDays,
    getPopularTimes,
    getAll
    
};

export default Services;