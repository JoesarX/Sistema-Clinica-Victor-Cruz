import axios from 'axios';
//const API_URL = 'http://localhost:8000';
const API_URL = 'https://DrVictorCruz.azurewebsites.net';
//traer todos los textos
export const getAll_Text = async () => {
    try {
        const res = await axios.get(`${API_URL}/texto_cmd`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch texto_cmd');
    }
};
//traer todo  de un solo

export const getHome = async()=>{
    try {
        const res = await axios.get(`${API_URL}/texto_cmd/home`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch home');
    } 
}
//traer todo salud ocupacional
export const getSaludOcupacional = async()=>{
    try {
        const res = await axios.get(`${API_URL}/texto_cmd/saludOcupacional`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch home');
    } 
}
//tr
export const getFooter = async()=>{
    try {
        const res = await axios.get(`${API_URL}/texto_cmd/footer`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch footer');
    } 
}
//traer un texto
export const getOneText = async (object) => {
    
    try {
        const res = await axios.get(`${API_URL}/texto_cmd/textos/${object}`);
        
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch textos_cmd');
    }
};


//agregar Texto
export const postText = async (object) => {
    console.log(object)
    try {
        const res = await axios.post(`${API_URL}/texto_cmd`, object);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to post textos_cmd');
    }
};

export const editText = async (object) => {
    try {
        
        
         await axios.put(`${API_URL}/texto_cmd/${object.Tipo}`, object);
        
    } catch (error) {
        console.error('editTextos', error);
        throw new Error('Fallo al editar textos_cmd');
    }
};

export const deleteText = async (id) => {
    try {
        
        await axios.delete(`${API_URL}/texto_cmd/${id}`);
    } catch (error) {
        
        throw new Error('Failed to delete textos_cmd');
    }
};
const text_Services = {
    getAll_Text,
    getOneText,
    getFooter,
    postText,
    editText,
    deleteText,
    getHome,
    getSaludOcupacional
    // Other functions
};

export default text_Services;