import axios from 'axios';

//const API_URL = 'http://localhost:8000';
const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

//============================================== G E T S ==================================================================
export const getAllFacturas = async () => {
    try {
        const res = await axios.get(`${API_URL}/facturas`);
        console.log("SUCCESS FETCHING FACTURAS");
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch facturas');
    }
};

export const getOneFactura = async (id) => {
    console.log(id);
    try {
        const res = await axios.get(`${API_URL}/facturas/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch factura');
    }
};

export const getFacturaByCita = async (idCita) => {
    console.log(idCita);
    try {
        const res = await axios.get(`${API_URL}/facturas/cita/${idCita}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch factura');
    }
};

export const getOneFacturaWithCita = async (id) => {
    console.log(id);
    try {
        const res = await axios.get(`${API_URL}/facturas/facturas-with-cita/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch factura');
    }
};

//============================================== P O S T S ==================================================================
export const postFactura = async (factura) => {
    try {
        const res = await axios.post(`${API_URL}/facturas`, factura);
        return res.data;
    } catch (error) {
        console.log('Error posting factura:', error);
        throw error;
    }
};


//============================================== P U T S ==================================================================
export const editFactura = async (id, factura) => {
    try {
        await axios.put(`${API_URL}/facturas/${id}`, factura);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit factura');
    }
};

export const editFacturaByCita = async (idCita, factura) => {
    try {
        await axios.put(`${API_URL}/facturas/cita/${idCita}`, factura);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit factura by Cita');
    }
};

//============================================== D E L E T E S ==================================================================
export const deleteFactura = async (id) => {
    try {
        await axios.delete(`${API_URL}/facturas/${id}`);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete factura');
    }
};

export const deleteFacturaByCita = async (idCita) => {
    try {
        await axios.delete(`${API_URL}/facturas/cita/${idCita}`);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete factura');
    }
};


const Services = {
    getAllFacturas,
    getOneFactura,
    getFacturaByCita,
    postFactura,
    editFactura,
    editFacturaByCita,
    deleteFactura,
    deleteFacturaByCita,
    getOneFacturaWithCita,
    
    // Other functions
};

export default Services;