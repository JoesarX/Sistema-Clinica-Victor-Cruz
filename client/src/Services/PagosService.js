import axios from 'axios';

//const API_URL = 'http://localhost:8000';
 const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

//============================================== G E T S ==================================================================
export const getAllPagos = async () => {
    try {
        const res = await axios.get(`${API_URL}/pagos`);
        console.log("SUCCESS FETCHING MEDICAMENTOS");
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch pagos');
    }
};

export const getOnePago = async (id) => {
    console.log(id);
    try {
        const res = await axios.get(`${API_URL}/pagos/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch pago');
    }
};

export const getPagosByUsuario = async (correouser) => {
    console.log(correouser);
    try {
        const res = await axios.get(`${API_URL}/usuario/cita/${correouser}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch pago');
    }
};

//============================================== P O S T S ==================================================================
export const postPagos = async (pago) => {
    try {
        console.log("In Service postPagos. Pago: ", pago)
        const res = await axios.post(`${API_URL}/pagos`, pago);
        return res.data;
    } catch (error) {
        console.log('Error posting pago:', error);
        throw error;
    }
};


//============================================== P U T S ==================================================================
export const editPagos = async (id, pago) => {
    try {
        await axios.put(`${API_URL}/pagos/${id}`, pago);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit pago');
    }
};


//============================================== D E L E T E S ==================================================================
export const deletePagos = async (id) => {
    try {
        await axios.delete(`${API_URL}/pagos/${id}`);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete pago');
    }
};


const Services = {
    getAllPagos,
    getOnePago,
    getPagosByUsuario,
    postPagos,
    editPagos,
    deletePagos,
    
    // Other functions
};

export default Services;