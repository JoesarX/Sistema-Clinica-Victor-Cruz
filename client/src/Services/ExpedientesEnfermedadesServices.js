import axios from 'axios';

//const API_URL = 'http://localhost:8000';
const API_URL = 'https://DrVictorCruz.azurewebsites.net';

//============================================== G E T S ==================================================================
export const getAllEnfermedades = async (idpaciente) => {
    try {
        const res = await axios.get(`${API_URL}/expedientes_enfermadad/${idpaciente}`);
        
        
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch expedientes_alergia');
    }
};



//============================================== P O S T S ==================================================================
export const postOneEnfermedades= async (enfermedad) => {
    try {
        const res = await axios.post(`${API_URL}/expedientes_enfermadad`, enfermedad);
        return res.data;
    } catch (error) {
        
        throw error;
    }
};

export const postEnfermedadesList = async (idpaciente, enfermedadesLista) => {
    try {
        console.log("In Service ENFERMEDADES. IDEXPEDIENTE: ", idpaciente, enfermedadesLista)
        const res = await axios.post(`${API_URL}/expedientes_enfermadad/expedientes_enfermadadList/${idpaciente}`, enfermedadesLista);
        
        return res.data;
    } catch (error) {
        
        throw error; 
    }
};

//============================================== P U T S ==================================================================
export const editOneEnfermedad = async (id, enfermedad) => {
    try {
        await axios.put(`${API_URL}/expedientes_enfermadad/${id}`, enfermedad);
    } catch (error) {
        
        throw new Error('Failed to edit enfermedad');
    }
};

export const editEnfermedadList = async (id, enfermedad) => {
    try {
        await axios.put(`${API_URL}/expedientes_enfermadad/expedientes_enfermadad_list/${id}`, enfermedad);
    } catch (error) {
        
        throw new Error('Failed to edit enfermedad');
    }
};

//============================================== D E L E T E S ==================================================================
export const deleteOneEnfermedad = async (id) => {
    try {
        await axios.delete(`${API_URL}/expedientes_enfermadad/expedientes_enfermadad_delete/${id}`);
    } catch (error) {
        
        throw new Error('Failed to delete med');
    }
};

export const deleteAllEnfermedades = async (idpaciente) => {
    try {
        await axios.delete(`${API_URL}/expedientes_enfermadad/expedientes_enfermadad_deleteAll/${idpaciente}`);
    } catch (error) {
        
        throw new Error('Failed to delete alergias');
    }
};


const Services = {
    getAllEnfermedades,
    postOneEnfermedades,
    postEnfermedadesList,
    editOneEnfermedad,
    editEnfermedadList,
    deleteOneEnfermedad,
    deleteAllEnfermedades
    
    
    // Other functions
};

export default Services;