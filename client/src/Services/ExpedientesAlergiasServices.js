import axios from 'axios';

const API_URL = 'http://localhost:8000';
//const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

//============================================== G E T S ==================================================================
export const getAllAlergias = async (idpaciente) => {
    try {
        const res = await axios.get(`${API_URL}/expedientes_alergia/${idpaciente}`);
        
        
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch expedientes_alergia');
    }
};



//============================================== P O S T S ==================================================================
export const postOneAlergia = async (alergia) => {
    try {
        const res = await axios.post(`${API_URL}/expedientes_alergia`, med);
        return res.data;
    } catch (error) {
        
        throw error;
    }
};

export const postAlergiaList = async (idpaciente, alergiaLista) => {
    try {
        console.log("In Service postRecetasByCita. Idcita: ", idpaciente)
        const res = await axios.post(`${API_URL}/expedientes_alergia/expedientes_alergiaList/${idpaciente}`, alergiaLista);
        
        return res.data;
    } catch (error) {
        
        throw error; 
    }
};

//============================================== P U T S ==================================================================
export const editOneAlergia = async (id, alergia) => {
    try {
        await axios.put(`${API_URL}/expedientes_alergia/${id}`, alergia);
    } catch (error) {
        
        throw new Error('Failed to edit alergia');
    }
};

export const editAlergiaList = async (id, alergia) => {
    try {
        await axios.put(`${API_URL}/expedientes_alergia/put_expedientes_alergia_list/${id}`, alergia);
    } catch (error) {
        
        throw new Error('Failed to edit alergia');
    }
};

//============================================== D E L E T E S ==================================================================
export const deleteOneAlergia = async (id) => {
    try {
        await axios.delete(`${API_URL}/expedientes_alergia/expedientes_alergia_delete/${id}`);
    } catch (error) {
        
        throw new Error('Failed to delete med');
    }
};

export const deleteAllAlergias = async (idpaciente) => {
    try {
        await axios.delete(`${API_URL}/expedientes_alergia/expedientes_alergia_deleteList/${idpaciente},`);
    } catch (error) {
        
        throw new Error('Failed to delete alergias');
    }
};


const Services = {
    getAllAlergias,
    postOneAlergia,
    postAlergiaList,
    editOneAlergia,
    editAlergiaList,
    deleteOneAlergia,
    deleteAllAlergias
    
    
    // Other functions
};

export default Services;