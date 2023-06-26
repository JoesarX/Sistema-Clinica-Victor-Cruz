import axios from 'axios';

// const API_URL = 'http://localhost:8000';
const API_URL = 'https://clinicavictorcruzserver.azurewebsites.net';

export const getAllAdministradores = async () => {
    try {
        const res = await axios.get(`${API_URL}/usuarios_admin`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch admin');
    }
};

export const getOneAdministrador = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/usuarios_admin/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch admin');
    }
};

export const postAdministradores = async (administrador) => {
    console.log(administrador)
    try {
        const res = await axios.post(`${API_URL}/usuarios_admin`, administrador);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to post admin');
    }
};

export const editAdministradores = async (id, administrador) => {
    try {
        await axios.put(`${API_URL}/usuarios_admin/${id}`, administrador);

    } catch (error) {
        console.log(error);
        throw new Error('Failed to edit admin');
    }
};

export const deleteAdministradores = async (id) => {
    try {
        await axios.delete(`${API_URL}/usuarios_admin/${id}`);

    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete admin');
    }
};

export const loginAdmin = async (uEmail, uPassword) => {
    try {
        console.log("Este es el Email: " + uEmail + " Este es el PW: " + uPassword)
        const Adminuser = await axios.get(`${API_URL}/usuarios_admin/`, uEmail);
        const Admininfo = Adminuser.data
        console.log(Adminuser.data)
        console.log("Este es el Email DB: " + Admininfo.correo + " Este es el PW DB: " + Admininfo.password)
        const emailEncontrado2 = Admininfo.find(Adminuser => (Adminuser.rol === 'Medico/a' || Adminuser.rol === 'Secretario/a' || Adminuser.rol === 'Servicio General') && Adminuser.correo === uEmail && Adminuser.password === uPassword);
        if (emailEncontrado2) {
            console.log("Estoy en caso que si aceptó la credencial: ");
            localStorage.setItem("loggedInUserName", emailEncontrado2.nombre);
            return true;
        } else {
            console.log("Estoy en caso que no aceptó la credencial: ");
            return false;
        }

    } catch (error) {

        console.log("Esto da: " + error)
        console.log("PTM esto es el login admin")
    }
}
export const loginMaster = async (uEmail, uPassword) => {
    try {
        console.log("Este es el Email: " + uEmail + " Este es el PW: " + uPassword)
        const Adminuser = await axios.get(`${API_URL}/usuarios_admin/`, uEmail);
        const Admininfo = Adminuser.data
        console.log(Adminuser.data)
        console.log("Este es el Email DB: " + Admininfo.correo + " Este es el PW DB: " + Admininfo.password)
        const emailEncontrado3 = Admininfo.find(Adminuser => Adminuser.rol === 'Administrador' && Adminuser.correo === uEmail && Adminuser.password === uPassword);
        if (emailEncontrado3) {
            console.log("Estoy en caso que si aceptó la credencial: ");
            localStorage.setItem("loggedInUserName", emailEncontrado3.nombre);
            return true;
        } else {
            console.log("Estoy en caso que no aceptó la credencial: ");
            return false;
        }

    } catch (error) {

        console.log("Esto da: " + error)
        console.log("PTM esto es el login master")
    }

};
const Services = {
    getAllAdministradores,
    postAdministradores,
    getOneAdministrador,
    deleteAdministradores,
    editAdministradores,
    loginMaster,
    loginAdmin
    // Other functions
};

export default Services;