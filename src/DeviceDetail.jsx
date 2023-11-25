import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DeviceCard from "./components/card"; // Importa tu componente de tarjeta de dispositivo
import TimelineModal from "./components/TimeLineModal.jsx";
import DeviceInfo from "./components/DeviceInfo.jsx";
import { Container, background } from "@chakra-ui/react";
import { message, Breadcrumb, Spin } from "antd";

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
        `https://www.pcexpressbcs.com.mx/api/devices/${deviceId}`
      );
      setSelectedDeviceUpdates(response.data.updates);
      setIsTimelineModalOpen(true);
    } catch (error) {
      console.error("Error fetching updates:", error);
      message.error("El dispositivo no existe");
    }
  };

  useEffect(() => {
    // Realiza una solicitud GET para obtener los datos del dispositivo según el ID
    axios
      .get(`https://www.pcexpressbcs.com.mx/api/devices/${id}`)
      .then((response) => {
        setDeviceData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Muestra una alerta cuando el componente se monta
    message.info(
      " El equipo puede estar maximo una semana despues de la reparacion"
    );
  }, [id]);

  if (!deviceData) {
    return (
      <div
        style={{
          backgroundColor: "#f5f4f4",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin tip="Loading..." />
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f5f4f4",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Encabezado */}
      <header
        style={{
          backgroundColor: "#001428",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white" }}>PC Express</h1>
        <nav>{/* Aquí puedes colocar tu breadcrumb */}</nav>
      </header>

      {/* Contenedor central */}
      <div
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxW="xl">
          <div
            style={{
              padding: "20px",
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              borderRadius: "8px",
              backgroundColor: "white",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            {/* Título */}
            <header>Dispositivo </header>

            <Breadcrumb
              items={[
                {
                  title: "Inicio",
                },
                {
                  title: "Cliente",
                },
                {
                  title: "Dispositivos",
                },
              ]}
            />
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
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DeviceDetails;
