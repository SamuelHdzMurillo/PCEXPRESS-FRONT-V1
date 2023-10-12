import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Grid,
  Text,
} from "@chakra-ui/react";
import axios from 'axios';

const DeviceModal = ({ isOpen, onClose, deviceId }) => {
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/devices/${deviceId}`);
      setDeviceData(response.data);
    } catch (error) {
      console.error('Error al obtener los datos del dispositivo:', error);
    }
    setLoading(false);
  };

  // Llama a fetchData cuando se abre el modal
  React.useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, deviceId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
  <ModalHeader>
    <Text as="span" borderBottom="2px solid blue" color="blue.500">
      Detalles del Dispositivo
    </Text>
  </ModalHeader>
  <ModalCloseButton />
  <ModalBody>
    {loading && <Text>Cargando datos...</Text>}
    {deviceData && (
      <Grid gridTemplateColumns="repeat(2, 1fr)" gap={2}>
        <Box p={2} bg="blue.100">
          <Text fontWeight="bold">Estado:</Text>
        </Box>
        <Box p={2} bg="gray.100" display="flex" justifyContent="center">
          <Text>{deviceData.state}</Text>
        </Box>

        <Box p={2} bg="blue.100">
          <Text fontWeight="bold">Tipo de dispositivo:</Text>
        </Box>
        <Box p={2} bg="gray.100" display="flex" justifyContent="center">
          <Text>{deviceData.device_type}</Text>
        </Box>

        <Box p={2} bg="blue.100">
          <Text fontWeight="bold">Marca:</Text>
        </Box>
        <Box p={2} bg="gray.100" display="flex" justifyContent="center">
          <Text>{deviceData.brand}</Text>
        </Box>

        <Box p={2} bg="blue.100">
          <Text fontWeight="bold">Daño:</Text>
        </Box>
        <Box p={2} bg="gray.100" display="flex" justifyContent="center">
          <Text>{deviceData.damage}</Text>
        </Box>

        <Box p={2} bg="blue.100">
          <Text fontWeight="bold">Accesorios:</Text>
        </Box>
        <Box p={2} bg="gray.100" display="flex" justifyContent="center">
          <Text>{deviceData.accesories}</Text>
        </Box>

        <Box p={2} bg="blue.100">
          <Text fontWeight="bold">Técnico:</Text>
        </Box>
        <Box p={2} bg="gray.100" display="flex" justifyContent="center">
          <Text>{deviceData.technican}</Text>
        </Box>

        <Box p={2} bg="blue.100">
          <Text fontWeight="bold">Propietario:</Text>
        </Box>
        <Box p={2} bg="gray.100" display="flex" justifyContent="center">
          <Text>
            {deviceData.owner ? deviceData.owner.name : 'Sin propietario'}
          </Text>
        </Box>
      </Grid>
    )}
  </ModalBody>
  <ModalFooter>
    <Button colorScheme="blue" onClick={onClose}>
      Cerrar
    </Button>
  </ModalFooter>
</ModalContent>

    </Modal>
  );
};

export default DeviceModal;
