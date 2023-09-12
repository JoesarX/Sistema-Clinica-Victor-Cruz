import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert'; // SweetAlert
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListSquares, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Box, Button } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import '../HojaDeEstilos/RegistrarUser.css';
import UsuariosService from '../../Services/UsuariosService';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import bcrypt from 'bcryptjs';
import { useRef } from 'react';

const EditUserInfo = ({ profile, onClose }) => {
    const [perfil, setPerfil] = useState([]);
    const [passChange, setPassChange] = useState(false);
    useEffect(() => {
        setPerfil([profile]);
    }, [profile]);

    const [user, setUser] = useState({
        nombre: profile.nombre,
        edad: profile.edad,
        correo: profile.correo,
        preguntaSeguridad: profile.preguntaSeguridad,
        respuestaSeguridad: profile.respuestaSeguridad,
        oldPassword: profile.password,
        newPassword: '',
        confirmNewPassword: '',
    });

    const handlePasswordChange = (e) => {
        setPassChange(true);

        const { name, value } = e.target;
        setUser((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleModalFieldChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };


    const handleEdit = async () => {
        console.log(user)
        console.log(perfil)
        
        if (!validations()) {
            swal('Error', 'Por favor completa todos los campos requeridos y cumple con las validaciones.', 'error');
            return;
        }
        const { oldPassword, newPassword } = user;
        if (newPassword) {
            const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
            user.newPassword = hashedNewPassword;
        }

        if (passChange) {
            const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
            const editedUser = {
                nombre: user.nombre,
                edad: parseInt(user.edad),
                pregunta: user.preguntaSeguridad,
                respuesta: user.respuestaSeguridad,
                oldPassword,
                newPassword: hashedNewPassword,
            };
            
            console.log('hellooooo 1')
            console.log(editedUser)
            try {
                console.log("CORREO EN EDIT: " + user.correo);
                await UsuariosService.editusuarios(user.correo, editedUser);
                swal('Éxito', 'Usuario editado exitosamente', 'success');
                onClose();
            } catch (error) {
                swal('Error', 'Hubo un problema al editar el usuario', 'error');
                console.error(error);
            }
        } else {
            const editedUser = {
                nombre: user.nombre,
                edad: parseInt(user.edad),
                pregunta: user.preguntaSeguridad,
                respuesta: user.respuestaSeguridad,
                oldPassword: user.oldPassword,
                newPassword:user.oldPassword
            };
            console.log('hellooooo')
            console.log(editedUser)
            try {
                console.log("CORREO EN EDIT: " + user.correo);
                
                await UsuariosService.editusuarios(user.correo, editedUser);
                swal('Éxito', 'Usuario editado exitosamente', 'success');
                onClose();
            } catch (error) {
                swal('Error', 'Hubo un problema al editar el usuario', 'error');
                console.error(error);
            }
        }


          
    };


    const validations = () => {
        const { correouser, nombre, edad, pregunta, respuesta, password } = user
        if (correouser === null || correouser === '') {
            alert('Correo es requerido')
            return false
        }
        if (nombre === null || nombre === '') {
            alert('Nombre Completo es requerido')
            return false
        }
        if (edad === null || edad === '' || edad < 0) {
            alert('Una edad valida es requerida')
            return false
        }

        if (pregunta === null || pregunta === '') {
            alert('La pregunta es requerido')
            return false
        }
        if (respuesta === null || respuesta === '') {
            alert('La respuesta es requerido')
            return false
        }
        if (password === null || password === '') {
            alert('La password es requerida')
            return false
        }
        if (!validateCapital && !validateLength && !validateSpecial && !validateNumber) {
            return false;
        }

        return true
    }
    const [password, setPassword] = useState('');

    const validateLength = (password) => {
        return password.length >= 8;
    };

    // MAGIA DE REGEX WOWWWWWW
    const validateCapital = (password) => {
        return /[A-Z]/.test(password);
    };

    const validateNumber = (password) => {
        return /\d/.test(password);
    };

    const validateSpecial = (password) => {
        return /[!@#$%^&*_;':"|,.<>/?]/.test(password);
    };

    return (
        <Modal open={true} onClose={onClose} closeAfterTransition BackdropProps={{ onClick: () => { } }}>
            <div className='modalContainer' style={{ maxHeight: '100vh', overflowY: 'auto', height: '95%' }}>
                <h2 className="modalHeader">EDITAR INFORMACIÓN DE PERFIL</h2>
                <button className="cancelButton" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} size="2x" />
                </button>
                <TextField
                    label="Nombre Completo"
                    variant="outlined"
                    className="inputField"
                    name="nombre"
                    required
                    value={user.nombre}
                    onChange={handleModalFieldChange}
                    sx={{ width: '100%', backgroundColor: '#F0F0F0', marginBottom: '16px' }}
                />
                <TextField
                    label="Edad"
                    variant="outlined"
                    className="inputField"
                    name="edad"
                    required
                    value={user.edad}
                    onChange={handleModalFieldChange}
                    sx={{ width: '100%', backgroundColor: '#F0F0F0', marginBottom: '16px' }}
                />
                <Autocomplete
                    options={['¿Cuál es el nombre de tu madre?', '¿Cuál es el nombre de tu padre?', '¿Cuál es el nombre de tu primera mascota?']}
                    renderInput={(params) => <TextField {...params} label="Pregunta de Seguridad" variant="outlined" />}
                    value={user.pregunta}
                    required
                    onChange={(event, newValue) => {
                        setUser((prevUserData) => ({
                            ...prevUserData,
                            pregunta: newValue
                        }));
                    }}
                    sx={{ width: '100%', backgroundColor: '#F0F0F0', marginBottom: '16px' }}
                />
                <TextField
                    label="Respuesta"
                    variant="outlined"
                    className="inputField"
                    name="respuesta"
                    required
                    value={user.respuestaSeguridad}
                    onChange={handleModalFieldChange}
                    sx={{ width: '100%', backgroundColor: '#F0F0F0', marginBottom: '16px' }}
                />
                <TextField
                    type="password"
                    label="Contraseña Actual"
                    variant="outlined"
                    className="inputField"
                    name="oldPassword"
                    required
                    onChange={handlePasswordChange}
                   
                    sx={{ width: '100%', backgroundColor: '#F0F0F0', marginBottom: '16px' }}
                />
                <TextField
                    type="password"
                    label="Contraseña Nueva"
                    variant="outlined"
                    className="inputField"
                    name="newPassword"
                    required
                    onChange={(e) => {
                        handlePasswordChange(e);
                        setPassword(e.target.value);
                    }}
                    value={password}
                    sx={{ width: '100%', backgroundColor: '#F0F0F0', marginBottom: '16px' }}
                />
                <div className="pw-validation-area">
                    <div className="pw-item">
                        <FontAwesomeIcon icon={validateLength(password) ? faCircleCheck : faCircleXmark}
                            className={`icon ${validateLength(password) ? 'valid' : ''}`} />
                        <div className="spacing" />
                        Ocho (8) carácteres mínimo
                    </div>
                    <div className="pw-item">
                        <FontAwesomeIcon icon={validateCapital(password) ? faCircleCheck : faCircleXmark}
                            className={`icon ${validateCapital(password) ? 'valid' : ''}`} />
                        <div className="spacing" />
                        Una (1) MAYÚSCULA mínimo
                    </div>
                    <div className="pw-item">
                        <FontAwesomeIcon icon={validateNumber(password) ? faCircleCheck : faCircleXmark}
                            className={`icon ${validateNumber(password) ? 'valid' : ''}`} />
                        <div className="spacing" />
                        Un (1) carácter numérico mínimo
                    </div>
                    <div className="pw-item">
                        <FontAwesomeIcon icon={validateSpecial(password) ? faCircleCheck : faCircleXmark}
                            className={`icon ${validateSpecial(password) ? 'valid' : ''}`} />
                        <div className="spacing" />
                        Un (1) carácter especial (!, @, #, $, etc.)
                    </div>
                </div>
                <TextField
                    type="password"
                    label="Confirmar Nueva Contraseña"
                    variant="outlined"
                    className="inputField"
                    required
                    name="confirmNewPassword"
                    onChange={handlePasswordChange}
                    value={user.confirmNewPassword}
                    sx={{ width: '100%', backgroundColor: '#F0F0F0', marginBottom: '16px' }}
                />
                {user.newPassword !== user.confirmNewPassword && (
                    <div className="password-mismatch">
                        <FontAwesomeIcon icon={faTimes} className="icon" />
                        <span>Las contraseñas no coinciden</span>
                    </div>
                )}
                <Button
                    onClick={handleEdit}
                    disabled={user.newPassword !== user.confirmNewPassword}
                    variant="contained" style={{ backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px', width: '300px', fontSize: '18px', alignSelf: 'center' }}>
                    Editar Información
                </Button>
            </div>
        </Modal>
    );

};

export default EditUserInfo;
