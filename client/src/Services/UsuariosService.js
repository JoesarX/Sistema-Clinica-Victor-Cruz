import axios from 'axios';

//const API_URL = 'http://localhost:8000/usuarios';
const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net/usuarios';

export const getAllusuarios = async () => {
    try {
        const res = await axios.get(`${API_URL}/usuarios`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch usuarios');
    }
};

export const postUsuarios = async (usuario) => {
    try {
        const res = await axios.post(`${API_URL}/usuarios`, usuario);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to post usuario');
    }
};

export const editusuarios = async (id, usuario) => {
    try {
        await axios.put(`${API_URL}/usuarios/${id}`, usuario);

    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit usuario');
    }
};

export const deleteusuarios = async (id) => {
    try {
        await axios.delete(`${API_URL}/usuarios/${id}`);

    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete usuario');
    }
};
//Para iniciar sesión
export const loginUsuarios = async (uEmail, uPassword) => {
    try {
        const user = await axios.get(`${API_URL}/usuarios/`, uEmail);
        const PW = await axios.get(`${API_URL}/usuarios/`, uPassword);
        console.log(user)
        console.log(PW)
        const userInfo = user.data
        const passwordInfo = PW.data
        const emailEncontrado = userInfo.find(user => user.correouser === uEmail);
        if (emailEncontrado) {
            console.log(emailEncontrado.nombre)
            localStorage.setItem("loggedInUserName", emailEncontrado.nombre);
            console.log(emailEncontrado.password)
            return emailEncontrado.password;
        } else {
            return "";
        }

    } catch (error) {
        // console.log("Este es el Email: "+user+" Este es el PW: "+PW)
        console.log("Esto da: " + error)
    }
};

export const getOneUser = async (id) => {
    console.log(id);
    try {
        const res = await axios.get(`${API_URL}/usuarios/${id}`);
        return res.data;
        console.log(res.data);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch user');
    }
};

const Services = {
    getAllusuarios,
    postUsuarios,
    getOneUser,
    deleteusuarios,
    editusuarios,
    // Other functions
    loginUsuarios

};

export default Services;