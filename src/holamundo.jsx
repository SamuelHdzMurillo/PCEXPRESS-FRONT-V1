import React, { useState, useEffect } from 'react';
import TimelineModal from './components/TimeLineModal'; // Ajusta la ruta según la ubicación de tu componente
import { Button } from '@chakra-ui/react';

const DeviceDetails = () => {
  const [device, setDevice] = useState(null);
  const [timelineModalOpen, setTimelineModalOpen] = useState(false);

  useEffect(() => {
    // Aquí deberías realizar la llamada a la API para obtener los detalles del dispositivo con el id especificado
    // Ejemplo ficticio
    const fetchDeviceDetails = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/devices/1');
      const data = await response.json();
      setDevice(data);
    };

    fetchDeviceDetails();
  }, []);

  const openTimelineModal = () => {
    setTimelineModalOpen(true);
  };

  const closeTimelineModal = () => {
    setTimelineModalOpen(false);
  };

  return (
    <div>
      {/* Renderiza la información del dispositivo aquí */}
      <Button onClick={openTimelineModal}>Ver Historial de Actualizaciones</Button>
      <TimelineModal
        isOpen={timelineModalOpen}
        onClose={closeTimelineModal}
        deviceUpdates={device ? device.updates : []}
      />
    </div>
  );
};

export default DeviceDetails;
