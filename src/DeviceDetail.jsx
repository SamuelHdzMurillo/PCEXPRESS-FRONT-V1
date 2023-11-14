import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DeviceCard from "./components/card"; // Importa tu componente de tarjeta de dispositivo
import TimelineModal from "./components/TimelineModal.jsx";
import DeviceInfo from "./components/DeviceInfo.jsx";
import { Container, background } from "@chakra-ui/react";

const DeviceDetails = () => {
  const { id } = useParams();
  const [deviceData, setDeviceData] = useState(null);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [selectedDeviceUpdates, setSelectedDeviceUpdates] = useState([]);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const openDeviceModal = (deviceId) => {
    setSelectedDeviceId(deviceId);
    setIsDeviceModalOpen(true);
  };

  const closeDeviceModal = () => {
    setIsDeviceModalOpen(false);
  };
  const closeTimelineModal = () => {
    setIsTimelineModalOpen(false);
  };
  const openTimelineModal = async (deviceId) => {
    try {
      const response = await axios.get(
        `http://143.198.148.125/api/devices/${deviceId}`
      );
      setSelectedDeviceUpdates(response.data.updates);
      setIsTimelineModalOpen(true);
    } catch (error) {
      console.error("Error fetching updates:", error);
    }
  };

  useEffect(() => {
    // Realiza una solicitud GET para obtener los datos del dispositivo según el ID
    axios
      .get(`http://143.198.148.125/api/devices/${id}`)
      .then((response) => {
        setDeviceData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Muestra una alerta cuando el componente se monta
    alert(
      "El dispositivo máximo puede durar una semana después de la reparación."
    );
  }, [id]);

  if (!deviceData) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      {/* Renderiza el componente de tarjeta de dispositivo con los detalles */}
      <Container maxW="2xl" centerContent>
        <DeviceCard
          data={deviceData}
          openTimelineModal={() => openTimelineModal(deviceData.id)}
          openDeviceModal={() => openDeviceModal(deviceData.id)}
        />
        <TimelineModal
          isOpen={isTimelineModalOpen}
          onClose={closeTimelineModal}
          deviceUpdates={selectedDeviceUpdates}
        />
        <DeviceInfo
          isOpen={isDeviceModalOpen}
          onClose={closeDeviceModal}
          deviceId={selectedDeviceId}
        />
      </Container>
    </div>
  );
};

export default DeviceDetails;
