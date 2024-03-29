import React, { useState, useContext, useRef, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { TextField, Grid, Button, Box, TextareaAutosize } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faGear } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../AuthContext.js';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Topbar from './Topbar';
import Footer from './Footer';
import '../HojaDeEstilos/Servicios.css';

import { storage } from '../../firebase';
import 'firebase/compat/storage';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
} from "firebase/storage";
import { v4 } from "uuid";
import swal from 'sweetalert';

import ServiciosService from '../../Services/ServiciosService.js';

const Servicios = () => {
  const { isLoggedIn, userType } = useContext(AuthContext);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [servicio, setServicio] = useState({
    url: '',
    title: '',
    description: '',
    orden: '',
    visibility: '',
    id: ''
  });

  const [serviceData, setServiceData] = useState([]);
  const [serviceDataFlagged, setServiceDataFlagged] = useState([]);
  const [visibilityFlag, setVisibilityFlag] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedService, setEditedService] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [imageEdit, setImageEdit] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);


  const [isSubmitting, setIsSubmitting] = useState(true);
  const [isSubmitting2, setIsSubmitting2] = useState(false);
  const [isSubmitting3, setIsSubmitting3] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(true);



  const handleModalOpen = () => {
    //Validar que no este en el maximo de servicios
    
    if (serviceData.length < 10) {
      setImagePreview(null);
      setModalOpen(true);
    }
    else {
      alert('Ha llegado al maximo de servicios, porfavor eliminar un servicio si desea agregar uno nuevo');
    }
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
  };

  //HANDLE DRAG AND DROP==============================================
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [updatedOrdenArray, setUpdatedOrdenArray] = useState(null);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (index !== draggedIndex) {
      setServiceData((prevData) => {
        const newData = [...prevData];
        const [movedService] = newData.splice(draggedIndex, 1);
        newData.splice(index, 0, movedService);
        // Calculate the updatedOrder using newData
        const updatedOrder = newData.map((service, newIndex) => ({
          ...service,
          orden: newIndex,
        }));
        setUpdatedOrdenArray(updatedOrder);
        setDraggedIndex(index);
        // Return the new data to update serviceData
        return newData;
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
  };

  const descartarCambios = () => {
    swal({
      title: "¿Descartar cambios?",
      text: "Si descartas los cambios, se perderán sin posibilidad de recuperación.",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancelar",
          value: null,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Confirmar",
          value: true,
          visible: true,
          closeModal: true,
        },
      },
    }).then((confirmed) => {
      if (confirmed) {
        setUpdatedOrdenArray(null);
        fetchAllServicios();
        
      }
    });
  };
  

  const updateServiceOrderInDatabase = async () => {
    if (!updatedOrdenArray) {
      
      return;
    }
  
    swal({
      title: "¿Guardar cambios?",
      text: "¿Estás seguro de que deseas guardar los cambios que has hecho?",
      icon: "info",
      buttons: {
        cancel: {
          text: "Cancelar",
          value: null,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Guardar",
          value: true,
          visible: true,
          closeModal: true,
        },
      },
    }).then(async (confirmed) => {
      if (confirmed) {
        try {
          await Promise.all(
            updatedOrdenArray.map(async (service) => {
              const changedService = compareArrays(serviceData, updatedOrdenArray, service.id);
  
              if (changedService) {
                
                
                changedService.orden = changedService.copyOrden;
                //const updatedData = { orden: changedService.copyOrden }; // Prepare the updated data object
  
                await ServiciosService.editServicios(changedService.id, changedService); // Pass the updated data object
              }
            })
          );
  
          swal({
            title: 'Orden de Servicios Editado',
            text: 'Los cambios se han guardado exitosamente.',
            icon: 'success',
          }).then(() => {
            window.location.reload(); 
          });
        } catch (error) {
          
          swal({
            title: 'Error',
            text: 'Ha ocurrido un error al intentar guardar los cambios.',
            icon: 'error',
          });
        }
      }
    });
  };
  


  function compareArrays(originalArray, copyArray, serviceId) {
    const originalObj = originalArray.find((obj) => obj.id === serviceId);
    const copyObj = copyArray.find((obj) => obj.id === serviceId);

    if (originalObj && copyObj && originalObj.orden !== copyObj.orden) {
      return {
        ...originalObj,
        originalOrden: originalObj.orden,
        copyOrden: copyObj.orden,
      };
    }

    return null;
  }


  //Aqui iria la funcion para poder cambiar la visibilidad de los servicios
  const toggleEye = (arrayServicio) => {
    
    toggleServiceVisibility(arrayServicio);
  };

  const toggleServiceVisibility = async (service) => {
    const updatedService = { ...service, visibility: !service.visibility };
  
    try {
      await ServiciosService.editServicios(updatedService.id, updatedService);
      swal("Visibilidad Editada", {
        icon: "success",
      });
  
      // Update the service data in your component's state
      const updatedServiceData = serviceData.map(item =>
        item.id === updatedService.id ? updatedService : item
      );
      setServiceData(updatedServiceData);
  
      // Toggle the eye icon state based on the updated visibility
      setIsEyeOpen(!updatedService.visibility);
      window.location.reload();
  
    } catch (error) {
      
    }
  };
  




  //IMAGENES CODE --------------------------------------------------->

  async function uploadFile() {

    return new Promise((resolve, reject) => {
      if (imageUpload === null || imageUpload === "") {
        return null;
      }

      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          resolve(url);
        })
        .catch((error) => reject(error));
    });
  };

  //CODE IMAGEN FINAL ---------------------------------------------------------------->



  const fetchAllServicios = async () => {
    try {
      const servicioData = await ServiciosService.getAllServicios();
      const serviciosWithId = servicioData.map((servicio) => ({
        ...servicio,
      }));
      /*
      
      serviciosWithId.forEach((servicio) => {
        
      });
      */
      setServiceData(serviciosWithId);
      
      const filteredServicios = serviciosWithId.filter(servicio => servicio.visibility === 1);
      setServiceDataFlagged(filteredServicios);
      const countVisible = serviciosWithId.filter(item => item.visibility === 1).length;
      
      if (countVisible < 5) {
        setVisibilityFlag(true);
      }
      else {
        setVisibilityFlag(false);
      }
    } catch (error) {
      // Handle error if any
      
    }
  };

  // Update tabla
  useEffect(() => {
    fetchAllServicios();
    if (isSubmitting) {
      fetchAllServicios();
    }
  }, [isSubmitting]);

  const handleAddNewService = async (event) => {
    event.preventDefault();
    try {
      
      submitServicio();
    } catch (error) {
      // Handle error if any
      
    }
  }

  useEffect(() => {
    if (isSubmitting2) {
      
      submitServicio();
    }
  }, [isSubmitting2]);

  const submitServicio = async (event) => {

    // Validate and add the new service
    if (!newTitle || !newDescription || !imageUpload) {
      swal("Porfavor ingrese titulo, descripcion e imagen", {
        icon: "warning",
      });
      return;
    }
    const titleRegex = /^(?! )(?!.* {2})(.{5,35})$/;
    if (!titleRegex.test(newTitle)) {
      setTitleError(true);
      swal("El título debe tener entre 5 y 35 caracteres, no puede comenzar ni terminar con un espacio y las palabras solo pueden estar separadas por un espacio", {
        icon: "warning",
      });
      return;
    }

    // Validate description
    const descriptionRegex = /^(?! )(?!.* {2})(.{35,200})$/;
    let cleanedDescription = newDescription.trim().replace(/ +$/, ' ');

    if (!descriptionRegex.test(cleanedDescription)) {
      setDescriptionError(true);
      alert('La descripción debe tener entre 35 y 200 caracteres y las palabras solo pueden estar separadas por un espacio.');
      return;
    }

    if (imageUpload != null) {
      const file = imageUpload;
      if (validateImageFormat(file) === false) {
        alert('La imagen debe estar en formato JPG y no exceder 5mb de tamaño')
        return;
      }
    }

    
    try {
      if (imageUpload != null) {
        const imageUrll = await uploadFile();
        setServicio(() => ({
          url: imageUrll,
          title: newTitle,
          description: newDescription,
          orden: serviceData.length,
          visibility: true,
        }));
        servicio.title = newTitle;
        servicio.description = newDescription;
        servicio.url = imageUrll;
        servicio.orden = serviceData.length;
        servicio.visibility = visibilityFlag;
      }
      
      await ServiciosService.postServicios(servicio);
      alert('Servicio Agregado');
      handleModalClose();
      setImagePreview(null);
      window.location.reload();
    } catch (error) {
      // Handle error if any
      
    }
  };

  const validateImageFormat = (file) => {
    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (!allowedFormats.includes(file.type)) {
      
      return false;
    }

    if (file.size > maxSizeInBytes) {
      
      return false;
    }
    return true;
  };

  const handleDeleteService = (id, url, orden) => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez borrado, no podrás recuperar esta información.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          try {
            
            
            
            await ServiciosService.deleteServicios(id, orden);
            if (url != null) {
              
              deleteImg(url);
            }
            swal("Servicio eliminado exitosamente!", {
              icon: "success",
            });
            window.location.reload();
          } catch (error) {
            swal("Error al eliminar el servicio. Por favor, inténtalo de nuevo más tarde.", {
              icon: "error",
            });
          }
        } else {
          swal("¡Tu información no se ha borrado!");
        }
      });
  };
  const storage = getStorage();
  const deleteImg = (refUrl) => {
    const imageRef = ref(storage, refUrl)
    deleteObject(imageRef)
      .catch((error) => {
        console.log("Failed to delete image: ", error)
      })
    //window.location.reload();
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      submitEditServicio();
    } catch (error) {
      // Handle error if any
      
    }
  };

  useEffect(() => {
    if (isSubmitting3) {
      submitEditServicio();
    }
  }, [isSubmitting3]);

  const submitEditServicio = async () => {
    
    try {
      const titleRegex = /^(?! )(?!.* {2})(.{5,35})$/;
      if (!titleRegex.test(editedService.title)) {
        setTitleError(true);
        swal("El título debe tener entre 5 y 35 caracteres, no puede comenzar ni terminar con un espacio y las palabras solo pueden estar separadas por un espacio.", {
          icon: "warning",
        });
        return;
      }

      // Validate description
      const descriptionRegex = /^(?! )(?!.* {2})(.{35,200})$/;
      if (!descriptionRegex.test(editedService.description)) {
        setDescriptionError(true);
        swal("La descripción debe tener entre 35 y 200 caracteres y las palabras solo pueden estar separadas por un espacio.", {
          icon: "warning",
        });
        return;
      }
      if (imageUpload != null) {
        const file = imageUpload;
        if (validateImageFormat(file) == false) {
          swal("La imagen debe estar en formato JPG y no exceder 5mb de tamaño", {
            icon: "warning",
          });
          return;
        }
      }
      if (imageUpload != null && imageUpload !== "") {
        if (imageUpload != null) {
          deleteImg(imageEdit);
          
        }
        
        const imageUrll = await uploadFile();
        editedService.url = imageUrll;

        await ServiciosService.editServicios(editedService.id, editedService);
        swal("Servicio Editado", {
          icon: "success",
        });
      } else {
        
        await ServiciosService.editServicios(editedService.id, editedService);
        swal("Servicio Editado", {
          icon: "success",
        });
      }
      window.location.reload();
    } catch (error) {
      
    }
  };

  const handleEditService = (service) => {
    
    setImageEdit(service.url);
    setEditedService(service);
    setImagePreview(service.url);
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
        {showButtons
          ? serviceData.map((service, index) => (
            <div
              className={`services ${showButtons ? 'draggable' : ''}`}
              id={service.hooverComponent}
              key={service.id}
              draggable={showButtons}
              data-index={index}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={handleDrop}
              style={{ transform: draggedIndex === index ? 'translateY(-10px)' : '' }}
            >
              <img src={service.url} alt={service.title} />
              <div className="overlay">
              <Button
                style={{ position: 'absolute', bottom: '85%', left: '85%' }}
                onClick={() => toggleEye(service)}
              >
                {service.visibility === 1 ? <Visibility /> : <VisibilityOff />}
              </Button>
                <h2>{service.title}</h2>
                <p className='desc'>{service.description}</p>
                {isLoggedIn && userType !== 'normal' && showButtons && (
                  <>
                    <div className='buttonCont'>
                      <button className='buttonE' onClick={() => handleEditService(service)}>Editar Servicio</button>
                      <button className='buttonE' onClick={() => handleDeleteService(service.id, service.url, service.orden)}>Borrar Servicio</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
          : serviceDataFlagged.map((service, index) => (
            <div
              className={`services ${showButtons ? 'draggable' : ''}`}
              id={service.hooverComponent}
              key={service.id}
              draggable={showButtons}
              data-index={index}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={handleDrop}
              style={{ transform: draggedIndex === index ? 'translateY(-10px)' : '' }}
            >
              <img src={service.url} alt={service.title} />
              <div className="overlay">
                <h2>{service.title}</h2>
                <p className='desc'>{service.description}</p>
                {isLoggedIn && userType !== 'normal' && showButtons && (
                  <>
                    <div className='buttonCont'>
                      <button className='buttonE' onClick={() => handleEditService(service)}>Editar Servicio</button>
                      <button className='buttonE' onClick={() => handleDeleteService(service.id, service.url, service.orden)}>Borrar Servicio</button>
                    </div>
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
                      className="customFileInput"
                    />
                    <label onClick={cancelarFotoA} className="cFL" style={{ marginTop: '0.45rem' }}>Eliminar Imagen</label>
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
            <div className='button-addSCont'>
              <button className='buttonE button-addS' onClick={handleModalOpen}>Agregar Nuevo Servicio</button>
              <button className='buttonE button-addS' onClick={updateServiceOrderInDatabase}>Guardar Cambios</button>
              <button className='buttonE button-addS' onClick={descartarCambios}>Descartar Cambios</button>
            </div>
          )}
          <div className='button-gearCont'>
            <button className='buttonG' onClick={() => setShowButtons((prevShowButtons) => !prevShowButtons)}><FontAwesomeIcon icon={faGear} /></button>
          </div>
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
                      <img className='imgC' src={imagePreview} alt={editedService.title} />
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
                    className="customFileInput"
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