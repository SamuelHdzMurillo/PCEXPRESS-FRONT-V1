import React, { useState } from 'react';
import { Button, Alert, AlertIcon } from '@chakra-ui/react';
import OwnerModal from './components/OwnerModal.jsx'; // Asegúrate de que la ruta sea correcta

const OwnerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(null); // Limpiar cualquier error previo al cerrar el modal
  };

  const handleSubmit = async (formData) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await fetch('http://127.0.0.1:8000/api/owners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de que el tipo de contenido sea correcto
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Lógica para manejar una respuesta exitosa de la API
        console.log('Propietario agregado con éxito');
        handleCloseModal();
      } else {
        // Lógica para manejar errores de la API
        const errorData = await response.json();
        setError(errorData.message || 'Error al agregar el propietario');
      }
    } catch (error) {
      // Manejar errores de red u otros errores inesperados
      setError('Error de red o servidor');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Lista de Propietarios</h1>
      <Button colorScheme="blue" onClick={handleOpenModal}>
        Agregar Propietario
      </Button>
      <OwnerModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
      {/* Mostrar una alerta de error si existe */}
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      {/* Resto de tu página */}
    </div>
  );
};

export default OwnerPage;
