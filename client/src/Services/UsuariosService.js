import axios from 'axios';

const API_URL = 'http://localhost:8000/usuarios';
// const API_URL = 'https://serverclinicavictorcruz.azurewebsites.net/usuarios';

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

export const editusuarios = async (id,usuario) => {
    try {
        await axios.put(`${API_URL}/usuarios/${id}`,usuario);
       
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
export const loginUsuarios= async(uEmail, uPassword)=>{
    try{
        const user = await axios.get(`${API_URL}/usuarios/`,uEmail);
        const PW = await axios.get(`${API_URL}/usuarios/`,uPassword);
        const userInfo= user.data
        const passwordInfo=PW.data
        const emailEncontrado= userInfo.find(user => user.correouser === uEmail && user.password === uPassword);
        if(emailEncontrado){
            return true;
    
        }else{
            return false;
        }
       
    }catch (error){
       // console.log("Este es el Email: "+user+" Este es el PW: "+PW)
       console.log("Esto da: "+error)
    }

};
export const loginAdmin= async(uEmail, uPassword)=>{
    try{
        console.log("Este es el Email: "+uEmail+" Este es el PW: "+uPassword)
        const Adminuser = await axios.get(`${API_URL}/usuarios_admin/`,uEmail);
        
        const Admininfo= Adminuser.data
        console.log( Adminuser.data)
     
        console.log("Este es el Email DB: "+Admininfo.id+" Este es el PW DB: "+Admininfo.password)
        const emailEncontrado= Admininfo.find(Adminuser => Adminuser.correo === uEmail && Adminuser.password === uPassword);
        if(emailEncontrado){
            return true;
    
        }else{
            return false;
        }
       
    }catch (error){
        
       console.log("Esto da: "+error)
       console.log("PTM esto es el login admin")
    }

};
    

const Services ={
    getAllusuarios,
    postUsuarios,
   
    deleteusuarios,
    editusuarios,
    // Other functions
    loginUsuarios,
    loginAdmin
};

export default Services;