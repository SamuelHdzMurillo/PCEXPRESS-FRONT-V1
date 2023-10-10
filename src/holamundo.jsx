import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import DeviceModal from './components/DeviceModal.jsx'; // Asegúrate de que la ruta sea correcta

const DevicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario y la imagen
      const response = await fetch('http://127.0.0.1:8000/api/devices', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Lógica para manejar una respuesta exitosa de la API
        console.log('Dispositivo agregado con éxito');
        handleCloseModal();
      } else {
        // Lógica para manejar errores de la API
        console.error('Error al agregar el dispositivo');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Lista de Dispositivos</h1>
      <Button colorScheme="blue" onClick={handleOpenModal}>
        Agregar Dispositivo
      </Button>
      <DeviceModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
      {/* Resto de tu página */}
    </div>
  );
};

export default DevicePage;
