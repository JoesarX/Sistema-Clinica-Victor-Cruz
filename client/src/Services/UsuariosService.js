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
        const res = await axios.post(`${API_URL}`, usuario);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to post usuario');
    }
};

export const deleteusuarios = async (email) => {
    try {
        const res = await axios.delete(`${API_URL}/usuarios/${email}`);
        return res.data;
    } catch (error) {
        throw error;
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

export const editusuarios = async (email, editedUser) => {
    try {
        const res = await axios.put(`${API_URL}/usuarios/${email}`, editedUser);
        return res.data;
    } catch (error) {
        throw new Error('Error al editar usuario');
    }
};

export const getOneUser = async (email) => {
    try {
        const user = await axios.get(`${API_URL}/usuarios/`, email);
        const userInfo = user.data
        const emailEncontrado = userInfo.find(user => user.correouser === email);
        if (emailEncontrado) {
            const values = [
                emailEncontrado.correouser,
                emailEncontrado.nombre,
                emailEncontrado.edad,
                emailEncontrado.pregunta,
                emailEncontrado.respuesta,
                emailEncontrado.password,
            ];
            return values;
        } else {
            return "";
        }
    } catch (error) {
        console.log("Esto da: " + error)
    }
}

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