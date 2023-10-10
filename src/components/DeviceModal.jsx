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
  Select,
} from '@chakra-ui/react';

const OwnerModal = ({ isOpen, onClose, onSubmit, isExistingCustomer }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(''); // Para clientes existentes
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

    if (isExistingCustomer) {
      // Si es un cliente existente, enviar el cliente seleccionado
      const formData = {
        selectedCustomer,
      };
      onSubmit(formData);
    } else {
      // Si es un cliente nuevo, enviar los datos del nuevo cliente
      const formData = {
        name,
        phone_number: phoneNumber,
        email,
      };
      onSubmit(formData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isExistingCustomer ? 'Seleccionar Cliente Existente' : 'Agregar Propietario'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Mostrar mensaje de error en el modal si existe */}
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}

          {isExistingCustomer ? (
            <FormControl>
              <FormLabel>Cliente Existente</FormLabel>
              <Select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                <option value="cliente1">Cliente 1</option>
                <option value="cliente2">Cliente 2</option>
                {/* Agrega más opciones de clientes aquí */}
              </Select>
            </FormControl>
          ) : (
            <>
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
            </>
          )}
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
