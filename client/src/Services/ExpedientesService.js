import axios from 'axios';

 const API_URL = 'http://localhost:8000';
//const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

export const getAllExpedientes = async () => {
    try {
        const res = await axios.get(`${API_URL}/expedientes`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch expedientes');
    }
};

export const getOneExpediente = async (id) => {
    console.log(id);
    try {
        const res = await axios.get(`${API_URL}/expedientes/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch expediente');
    }
};

export const getUserExpedients = async (mail) => {
    console.log(mail)
    try {
        const res = await axios.get(`${API_URL}/expedientes/UserExpedients/${mail}`);
        console.log("GG")
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch expediente');
    }
};
export const getOneUser = async (email) => {
    console.log("este es el email en landing page " + email[0]);
    console.log("este es el mensaje en landing page " + email[1]);
    try {
        const expedientes = await axios.get(`${API_URL}/expedientes/userpage/`, { params: { email } });
        const expedientesInfo = expedientes.data[0];
        console.log("Este es nombre : " + expedientesInfo.nombre);
        console.log("Este es correo: " + expedientesInfo.correo);
        console.log("Este es sexo : " + expedientesInfo.sexo);
        console.log("Este es tel : " + expedientesInfo.telefono);

        console.log("Esta es la data de expedientes " + expedientesInfo);
        return expedientes.data[0];
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch landing page');
    }
};

export const getOneExpedienteDashboard = async (id) => {
    console.log(id);
    try {
        const res = await axios.get(`${API_URL}/expedientes/dashboard/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch expediente');
    }
};
export const getCitasOneExpediente = async (id) => {
    console.log(id);
    try {
        const res = await axios.get(`${API_URL}/expedientes/dashboard/cita/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch citas from expediente');
    }
};

export const editExpedientesDashboard = async (id, expediente) => {
    try {
        console.log("editExpedientes Service");
        console.log(id);
        console.log(expediente);
        await axios.put(`${API_URL}/expedientes/dashboard/${id}`, expediente);

    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit expediente');
    }
};

export const postExpedientes = async (expediente) => {
    try {
        const res = await axios.post(`${API_URL}/expedientes`, expediente);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to post expediente');
    }
};

export const editExpedientes = async (id, expediente) => {
    try {
        console.log("editExpedientes Service");
        console.log(id);
        console.log(expediente);
        await axios.put(`${API_URL}/expedientes/${id}`, expediente);

    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit expediente');
    }
};

export const deleteExpedientes = async (id) => {
    try {
        await axios.delete(`${API_URL}/expedientes/${id}`);

    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete expediente');
    }
};

const Services = {
    getAllExpedientes,
    postExpedientes,
    getOneExpediente,
    getOneExpedienteDashboard,
    deleteExpedientes,
    editExpedientes,
    editExpedientesDashboard,
    getOneUser,
    getCitasOneExpediente,
    getUserExpedients
    // Other functions
};

export default Services;