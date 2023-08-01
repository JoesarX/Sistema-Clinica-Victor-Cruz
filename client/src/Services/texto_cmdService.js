import axios from 'axios';
//const API_URL = 'http://localhost:8000';
const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';
//traer todos los textos
export const getAll_Text = async () => {
    try {
        const res = await axios.get(`${API_URL}/texto_cmd`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch texto_cmd');
    }
};
//traer un texto
export const getOneText = async (object) => {
    console.log(object);
    try {
        const res = await axios.get(`${API_URL}/texto_cmd/textos/${object}`);
        return res.data;
    } catch (error) {
        console.log(error);
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
        console.log(error);
        throw new Error('Failed to post textos_cmd');
    }
};

export const editText = async (object) => {
    try {
        console.log(object);
        console.log("Este es el id= "+object[0]+" y este es el nombre: "+object[1]);
         await axios.put(`${API_URL}/texto_cmd/${object[0]}`, object);
        
    } catch (error) {
        console.error('editTextos', error);
        throw new Error('Fallo al editar textos_cmd');
    }
};

export const deleteText = async (id) => {
    try {
        console.log("Este es el id: " + id);
        await axios.delete(`${API_URL}/texto_cmd/${id}`);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete textos_cmd');
    }
};
const text_Services = {
    getAll_Text,
    getOneText,
    postText,
    editText,
    deleteText
    // Other functions
};

export default text_Services;