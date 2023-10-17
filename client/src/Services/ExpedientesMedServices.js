import axios from 'axios';

//const API_URL = 'http://localhost:8000';
const API_URL = 'https://clinicadrvictorcruz.azurewebsites.net';

//============================================== G E T S ==================================================================
export const getAllMeds = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/expediente_med/${id}`);
        
        
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch expediente_med');
    }
};



//============================================== P O S T S ==================================================================
export const postOneMed = async (med) => {
    try {
        const res = await axios.post(`${API_URL}/expediente_med`, med);
        return res.data;
    } catch (error) {
        
        throw error;
    }
};

export const postMedList = async (idpaciente, medLista) => {
    try {
        console.log("In Service postRecetasByCita. Idcita: ", idpaciente)
        const res = await axios.post(`${API_URL}/expediente_med/expediente_med_list/${idpaciente}`, medLista);
        
        

        return res.data;
    } catch (error) {
        
        throw error; 
    }
};

//============================================== P U T S ==================================================================
export const editOneMed = async (id, med) => {
    try {
        await axios.put(`${API_URL}/expediente_med/${id}`, med);
    } catch (error) {
        
        throw new Error('Failed to edit med');
    }
};

export const editMedList = async (id, med) => {
    try {
        await axios.put(`${API_URL}/expediente_med/put_expediente_med_list/${id}`, med);
    } catch (error) {
        
        throw new Error('Failed to edit meds');
    }
};

//============================================== D E L E T E S ==================================================================
export const deleteOneMed = async (id) => {
    try {
        await axios.delete(`${API_URL}/expediente_med/med_paciente_delete/${id}`);
    } catch (error) {
        
        throw new Error('Failed to delete med');
    }
};

export const deleteAllMeds = async (idpaciente) => {
    try {
        await axios.delete(`${API_URL}/expediente_med/med_paciente_deleteAll/${idpaciente}`);
    } catch (error) {
        
        throw new Error('Failed to delete factura');
    }
};


const Services = {
    getAllMeds,
    postOneMed,
    postMedList,
    editOneMed,
    editMedList,
    deleteOneMed,
    deleteAllMeds
    
    
    // Other functions
};

export default Services;