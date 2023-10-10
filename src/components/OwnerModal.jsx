import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const OwnerModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmission = () => {
    // Validar que el nombre no contenga números
    if (/\d/.test(name)) {
      setError('El nombre no puede contener números.');
      return;
    }

    // Validar que el número de teléfono no contenga letras
    if (/[a-zA-Z]/.test(phoneNumber)) {
      setError('El número de teléfono no puede contener letras.');
      return;
    }

    // Validar que el correo sea un correo electrónico válido
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError('El correo no es válido.');
      return;
    }

    // Si todas las validaciones pasan, limpiar cualquier mensaje de error previo
    setError(null);

    const formData = {
      name,
      phone_number: phoneNumber,
      email,
    };

    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Propietario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Mostrar mensaje de error en el modal si existe */}
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}

          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              placeholder="Nombre"
              onChange={(e) => setName(e.target.value)}
              value={name}
              isInvalid={/\d/.test(name)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Número de Teléfono</FormLabel>
            <Input
              placeholder="Número de Teléfono"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              isInvalid={/[a-zA-Z]/.test(phoneNumber)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              placeholder="Correo Electrónico"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              isInvalid={!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmission}>
            Guardar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OwnerModal;
