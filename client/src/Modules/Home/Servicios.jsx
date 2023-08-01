import React, { useState, useContext, useRef } from 'react';
import Modal from '@mui/material/Modal';
import { TextField, Grid, Button, Box, TextareaAutosize } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faGear } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../AuthContext.js';
import Topbar from './Topbar';
import Footer from './Footer';
import '../HojaDeEstilos/Servicios.css';

const Servicios = () => {
  const { isLoggedIn, userType } = useContext(AuthContext);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const [serviceData, setServiceData] = useState([
    {
      id: 1,
      imageSrc: 'https://www.medigreen.com.ec/wp-content/uploads/2021/08/95368dbecc661caf7efebdb9c43364817e936d45.jpg',
      title: 'Salud Ocupacional',
      description: 'Se enfoca en prevenir enfermedades y lesiones laborales, mejorar las condiciones de trabajo y promover el bienestar general de los empleados.',
      hooverComponent: '1'
    },
    {
      id: 2,
      imageSrc: 'https://static.emol.cl/emol50/Fotos/2020/03/24/file_20200324095443.jpg',
      title: 'Salubrista',
      description: 'Profesional que se dedica a mejorar la salud de las personas a través de diversas acciones y colaboraciones interdisciplinarias.',
      hooverComponent: '2'
    },
    {
      id: 3,
      imageSrc: 'https://static.emisorasunidas.com/uploads/2020/09/dia-salubrista.jpg',
      title: 'Epidemiología',
      description: 'Estudio de los patrones, las causas y el control de las enfermedades en los grupos de personas.',
      hooverComponent: '3'
    },
    {
      id: 4,
      imageSrc: 'https://www.clinicapremium.com/wp-content/uploads/2022/09/medicina-general-en-clinica-premium-marbella.jpg',
      title: 'Atencion Primaria',
      description: 'Se centra en la prevención, el diagnóstico y el tratamiento de enfermedades comunes, así como en promover la salud general de las personas.',
      hooverComponent: '4'
    },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedService, setEditedService] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const newServiceImageRef = useRef(null);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setImageUpload(null);
    setImagePreview(null);
  };

  const cancelarFotoA = () => {
    setImageUpload(null);
    setImagePreview(null);
    newServiceImageRef.current.value = null;
  };

  const handleAddNewService = (event) => {
    event.preventDefault();
    // Validate and add the new service
    if (!newTitle || !newDescription || !imageUpload) {
      alert('Porfavor ingrese titulo, descripcion e imagen');
      return;
    }
    const titleRegex = /^(?! )(?!.* {2})(.{5,35})$/;
    if (!titleRegex.test(newTitle)) {
      setTitleError(true);
      alert('El título debe tener entre 5 y 35 caracteres, no puede comenzar ni terminar con un espacio y las palabras solo pueden estar separadas por un espacio.');
      return;
    }

    // Validate description
    const descriptionRegex = /^(?! )(?!.* {2})(.{35,200})$/;
    if (!descriptionRegex.test(newDescription)) {
      setDescriptionError(true);
      alert('La descripción debe tener entre 35 y 200 caracteres y las palabras solo pueden estar separadas por un espacio.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const newService = {
        id: serviceData.length + 1,
        imageSrc: reader.result,
        title: newTitle,
        description: newDescription,
        hooverComponent: `${serviceData.length + 1}`,
      };
      setServiceData([...serviceData, newService]);
      alert('Service added successfully!');
      handleModalClose();
    };
    reader.readAsDataURL(imageUpload);
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();
    const titleRegex = /^(?! )(?!.* {2})(.{5,35})$/;
    if (!titleRegex.test(editedService.title)) {
      setTitleError(true);
      alert('El título debe tener entre 5 y 35 caracteres, no puede comenzar ni terminar con un espacio y las palabras solo pueden estar separadas por un espacio.');
      return;
    }

    // Validate description
    const descriptionRegex = /^(?! )(?!.* {2})(.{35,200})$/;
    if (!descriptionRegex.test(editedService.description)) {
      setDescriptionError(true);
      alert('La descripción debe tener entre 35 y 200 caracteres y las palabras solo pueden estar separadas por un espacio.');
      return;
    }
    const updatedServiceData = serviceData.map((item) =>
      item.id === editedService.id ? { ...editedService } : item
    );

    setServiceData(updatedServiceData);
    setEditedService(null);
  };

  const handleEditService = (service) => {
    setEditedService(service);
  };

  const handleDeleteService = (serviceId) => {
    const updatedServiceData = serviceData.filter((service) => service.id !== serviceId);
    setServiceData(updatedServiceData);
  };

  return (
    <div className='scrollable-page'>
      <Topbar />

      <div className='header'>
        NUESTROS SERVICIOS
      </div>

      <div className='info'>
        Los servicios que la clínica Víctor Cruz tiene a disposición para los clientes son varios, incluyendo:
      </div>

      <div>
        {serviceData.map((service) => (
          <div className='services' id={service.hooverComponent} key={service.id}>
            <img src={service.imageSrc} alt={service.title} />
            <div className="overlay">
              <h2>{service.title}</h2>
              <p className='desc'>{service.description}</p>
              {isLoggedIn && userType !== 'normal' && showButtons && (
                <>
                  <button onClick={() => handleEditService(service)}>Editar Servicio</button>
                  <button onClick={() => handleDeleteService(service.id)}>Borrar Servicio</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>


      {isLoggedIn && userType !== 'normal' && (
        <div>
          <Modal className='mC' open={isModalOpen} onClose={handleModalClose} closeAfterTransition BackdropProps={{ onClick: () => { } }}>
            <div className='modal-container modalServicios' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              <div style={{ marginTop: '20px' }}>
                <h2 className="mHeader">AGREGAR SERVICIO</h2>
                <button className="cButton" onClick={handleModalClose}>
                  <FontAwesomeIcon icon={faTimes} size="2x" />
                </button>
              </div>
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  width: '100%',
                  marginBottom: '20px',
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleAddNewService}
              >
                <Grid container spacing={0} alignItems="center" justifyContent="center" style={{ height: '100%' }}>
                  <Grid item xs={12} sm={6}>
                    <div className='DImg'>
                      <div className='imgWrap'>
                        <img className='imgC' src={imagePreview} alt="imgPreview" />
                      </div>
                    </div>
                    <label htmlFor="urlfoto" className="cFL">Seleccionar archivo</label>
                    <input
                      type="file"
                      onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                        setImagePreview(URL.createObjectURL(event.target.files[0]));
                      }}
                      name='urlfoto'
                      id="urlfoto"
                      className="cFI"
                      ref={newServiceImageRef}
                    />
                    <label onClick={cancelarFotoA} className="cFL" style={{ marginTop: '0.45rem' }}>Eliminar archivo</label>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField id="titulo" label="Titulo" variant="outlined" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} name='nombre' required style={{ marginBottom: '0.45rem', width: '90%' }} />
                    <TextareaAutosize
                      id="descripcion"
                      aria-label="Descripcion"
                      placeholder="Descripcion *"
                      minRows={3}
                      maxRows={5}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      style={{ marginBottom: '0.45rem', width: '90%', height: '260px', padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </Grid>

                </Grid>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      className="mB"
                      type="submit"
                      id='crudButton'
                    >
                      Agregar Servicio
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Modal>
          {isLoggedIn && userType !== 'normal' && showButtons && (
            <div>
              <button onClick={handleModalOpen}>Agregar Nuevo Servicio</button>
            </div>
          )}
          <button onClick={() => setShowButtons((prevShowButtons) => !prevShowButtons)}><FontAwesomeIcon icon={faGear} /></button>
        </div>
      )}

      <Modal open={Boolean(editedService)} onClose={() => setEditedService(null)} closeAfterTransition BackdropProps={{ onClick: () => { } }}>
        <div className='modal-container modalServicios' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {editedService && (
            <div style={{ marginTop: '20px' }}>
              <h2 className="mHeader">EDITAR SERVICIO</h2>
              <button className="cButton" onClick={() => setEditedService(null)}>
                <FontAwesomeIcon icon={faTimes} size="2x" />
              </button>
            </div>
          )}
          {editedService && (
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '100%',
                marginBottom: '20px',
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSaveEdit}
            >
              <Grid container spacing={0} alignItems="center" justifyContent="center" style={{ height: '100%' }}>
                <Grid item xs={12} sm={6}>
                  <div className='DImg'>
                    <div className='imgWrap'>
                      <img className='imgC' src={editedService.imageSrc} alt={editedService.title} />
                    </div>
                  </div>
                  <label htmlFor="urlfoto" className="cFL">Seleccionar archivo</label>
                  <input
                    type="file"
                    onChange={(event) => {
                      setEditedService({ ...editedService, imageSrc: URL.createObjectURL(event.target.files[0]) });
                    }}
                    name='urlfoto'
                    id="urlfoto"
                    className="cFI"
                    ref={newServiceImageRef}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="titulo"
                    label="Titulo"
                    variant="outlined"
                    value={editedService.title}
                    onChange={(e) => setEditedService({ ...editedService, title: e.target.value })}
                    name='nombre'
                    required
                    style={{ marginBottom: '0.45rem', width: '90%' }}
                  />
                  <TextareaAutosize
                    id="descripcion"
                    aria-label="Descripcion"
                    placeholder="Descripcion"
                    minRows={3}
                    maxRows={5}
                    value={editedService.description}
                    onChange={(e) => setEditedService({ ...editedService, description: e.target.value })}
                    style={{
                      marginBottom: '0.45rem',
                      width: '90%',
                      height: '260px',
                      padding: '6px 12px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    className="mB"
                    type="submit"
                    id='crudButton'
                  >
                    Guardar Cambios
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default Servicios;
