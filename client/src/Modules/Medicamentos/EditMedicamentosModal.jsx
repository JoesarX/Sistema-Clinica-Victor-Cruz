import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material'

//STYLES
import MedicamentosService from '../../Services/MedicamentosService';
import '../HojaDeEstilos/CrudStyles.css';


import './Medicamentos.css';


const EditMedicamentosModal = ({ open, onClose }) => {
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        idmed: false,
        nombre: true,
        id_categoria: true,
        stock: true,
        precio_unitario: true,
        via: true,
        dosis: true,
    });
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const [medicamentos, setMedicamentos] = useState([]);
    const navigate = useNavigate();
    const [id, setID] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [medicamento, setMedicamento] = React.useState({
        nombre: '',
        stock: '',
        precio_unitario: '',
        via: '',
        dosis: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitting2, setIsSubmitting2] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setIsSubmitting(false);
    };

    const toggleModal2 = async (id) => {
        setID(id)
        console.log(id)
        try {
            const medicamentoData = await MedicamentosService.getOneMedicamento(id);
            console.log(medicamentoData)
            setMedicamentoss([medicamentoData]);
            setMedicamento(medicamentoData);
            console.log(medicamentoData)
        } catch (error) {
            console.log(error);
        }

        setIsModalOpen1(!isModalOpen1);
        setIsSubmitting2(false);
    };

    const toggleModal22 = () => {


        setIsModalOpen1(!isModalOpen1);
        setIsSubmitting2(false);
    };

    const handleModalFieldChange = (e) => {
        setMedicamento((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

    }
    const EditHandler = () => {


        const editMedicamento = async () => {
            await MedicamentosService.editMedicamentos(id, medicamento);
            alert('Medicamento Editado');
            toggleModal22();
        };
        console.log(medicamento)
        editMedicamento();

        navigate('/medicamentos')
        window.location.reload();

    };

    const [medicamentoData, setMedicamentoss] = useState([]);

    const fetchMedicamento = async (id) => {
        console.log(id)
        try {
            const medicamentoData = await MedicamentosService.getOneMedicamento(id);
            console.log(medicamentoData)
            setMedicamentoss([medicamentoData]);
            //setMedicamento(medicamentoData);
            console.log(medicamentoData)
        } catch (error) {
            console.log(error);
        }
    };

    const defaultValue = medicamento.sexo;
    const selectedValue2 = medicamento.estado_civil;


    useEffect(() => {
        // Validación login
        if (!isLoggedIn) {
            // Redirigir si no se cumple la verificación
            navigate("/iniciarsesion"); // Redirige a la página de inicio de sesión
        }

        const fetchAllMedicamentos = async () => {
            try {
                const medicamentosData = await MedicamentosService.getAllMedicamentos();
                const medicamentosWithId = medicamentosData.map((medicamento) => ({
                    ...medicamento,
                    medId: medicamento.idmed,
                }));
                setMedicamentos(medicamentosWithId);
            } catch (error) {
                // Handle error if any
                console.log("Error fetching medicamentos:", error);
            }
        };

        // Update tabla
        fetchAllMedicamentos();
        if (isSubmitting) {
            fetchAllMedicamentos();
        }

        const handleResize = () => {
            const isMobile = window.innerWidth < 600; // Define the screen width threshold for mobile devices

            // Update the column visibility based on the screen width
            setColumnVisibilityModel((prevVisibility) => ({
                ...prevVisibility,
                idmed: false,
                nombre: true,
                id_categoria: isMobile ? false : true,
                stock: true,
                precio_unitario: isMobile ? false : true,
                via: isMobile ? false : true,
                dosis: isMobile ? false : true,

            }));
        };

        // Call the handleResize function initially and on window resize
        handleResize();
        window.addEventListener("resize", handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isLoggedIn, navigate, isSubmitting]);

    const [selectedDate, setSelectedDate] = useState(null);
    const handleInputFocus = (event) => {
        event.target.blur(); // Remove focus from the input field
    };

    const [isModalOpen1, setIsModalOpen1] = useState(false);

    return (
        <Modal open={open} onClose={onClose} className='customModal' >


            <div className='modalContainer'>
                {medicamentoData.map((medicamento) => (
                    <div className='medicamentoCard' key={medicamento.idpaciente}>

                        <h2 className="modalHeader">EDITAR MEDICAMENTO</h2>

                        <Box
                            component="form"//edit modal
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                width: '100%', // Added width property
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="nombre" label="Nombre" defaultValue={medicamento.nombre} variant="outlined" onChange={handleModalFieldChange} name='nombre' required />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="stock" label="Unidades" variant="outlined" defaultValue={medicamento.stock} onChange={handleModalFieldChange} name='unidades' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="precio_unitario" label="Precio Unitario" variant="outlined" defaultValue={medicamento.precio_unitario} onChange={handleModalFieldChange} name='precio_unitario' />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="via" label="Via" variant="outlined" defaultValue={medicamento.via} onChange={handleModalFieldChange} name='via' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="dosis" label="Dosis" variant="outlined" defaultValue={medicamento.dosis} onChange={handleModalFieldChange} name='dosis' />
                                </Grid>
                            </Grid>

                            <Button onClick={EditHandler} variant="contained" style={{
                                backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px',
                                paddingLeft: '10px', paddingRight: '10px', width: '270px', fontSize: '18px', alignSelf: 'center'
                            }}>
                                Editar Medicamento
                            </Button>
                        </Box>
                    </div>
                ))}
            </div>
        </Modal>
      );
};

export default EditMedicamentosModal;