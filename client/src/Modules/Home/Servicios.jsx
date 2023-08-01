import '../HojaDeEstilos/Servicios.css';
import Topbar from './Topbar';
import Footer from './Footer';
import { AuthContext } from '../AuthContext.js';
import React, { useState, useContext } from 'react';
import Modal from '@mui/material/Modal';

const Servicios = () => {
  const { isLoggedIn, userType } = useContext(AuthContext);
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
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewImageFile(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    setNewImageFile(file);
  };

  const handleAddNewService = () => {
    if (!newTitle || !newDescription || !newImageFile) {
      // If any of the required fields is missing, display an alert and return.
      alert('Please enter title, description, and select an image.');
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
    reader.readAsDataURL(newImageFile);
  };

  const ServiceComponent = ({ service }) => {
    const [isEditMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(service.title);
    const [editedDescription, setEditedDescription] = useState(service.description);
    const [editedImageSrc, setEditedImageSrc] = useState(service.imageSrc);
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);

    const handleEditClick = () => {
      setEditMode(true);
    };

    const handleSaveClick = () => {
      setEditMode(false);
      // Update the service data with the edited values
      setServiceData((prevServiceData) =>
        prevServiceData.map((prevService) => {
          if (prevService.id === service.id) {
            return {
              ...prevService,
              title: editedTitle,
              description: editedDescription,
              imageSrc: editedImageSrc,
            };
          }
          return prevService;
        })
      );
    };

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditedImageSrc(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    const handleMouseEnter = () => {
      setDescriptionVisible(true);
    };

    const handleMouseLeave = () => {
      setDescriptionVisible(false);
    };

    return (
      <div className='services' id={service.hooverComponent} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img src={isEditMode ? editedImageSrc : service.imageSrc} alt={isEditMode ? editedTitle : service.title} />
        <div className="overlay">
          {isEditMode ? (
            <>
              <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
              <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              {isLoggedIn && userType !== 'normal' && <button onClick={handleEditClick}>Edit</button>}
            </>
          )}
        </div>
      </div>
    );
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
          <ServiceComponent key={service.id} service={service} />
        ))}
      </div>

      {isLoggedIn && userType !== 'normal' && (
        <div>
          <button onClick={handleModalOpen}>Add New Service</button>
        </div>
      )}

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <div className='modal-container'>
          <h2>Add New Service</h2>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" />
          <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Description" />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleModalClose}>Cancel</button>
          <button onClick={handleAddNewService}>Add</button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default Servicios;
