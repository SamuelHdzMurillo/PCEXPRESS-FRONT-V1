import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Card, Timeline, Space, Button, Modal } from "antd";
import moment from "moment";

const { Title, Text } = Typography;

const cardStyle = {
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const textBlockStyle = {
  background: "#f7f7f7",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
};

const DeviceDetails = () => {
  const { id } = useParams();
  const [deviceData, setDeviceData] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

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
  }, [id]);

  if (!deviceData) {
    return <p>Cargando...</p>;
  }

  const openImageModal = () => {
    setImageModalVisible(true);
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
  };

  return (
    <Card style={cardStyle}>
      <div style={textBlockStyle}>
        <Title level={2}>Detalles del Dispositivo</Title>
        <Space direction="vertical" size="20">
          <div>
            <Text strong>ID:</Text> {deviceData.id}
          </div>
          <div>
            <Text strong>Estado:</Text> {deviceData.state}
          </div>
          <div>
            <Text strong>Tipo de dispositivo:</Text> {deviceData.device_type}
          </div>
          <div>
            <Text strong>Marca:</Text> {deviceData.brand}
          </div>
          <div>
            <Text strong>Daño:</Text> {deviceData.damage}
          </div>
          <div>
            <Text strong>Accesorios:</Text> {deviceData.accesories}
          </div>
          <div>
            <Text strong>Técnico:</Text> {deviceData.technican}
          </div>
          <div>
            <Text strong>Fecha de creación:</Text>{" "}
            {moment(deviceData.created_at).format("DD-MM-YYYY HH:mm:ss")}
          </div>
          <div>
            <Text strong>Última actualización:</Text>{" "}
            {moment(deviceData.updated_at).format("DD-MM-YYYY HH:mm:ss")}
          </div>
        </Space>
      </div>
      <Button onClick={openImageModal}>Ver Imagen</Button>
      <Modal
        title="Imagen del Dispositivo"
        visible={imageModalVisible}
        onCancel={closeImageModal}
        footer={null}
      >
        <img
          src={deviceData.imageUrl}
          alt="Imagen del dispositivo"
          style={{ display: "block", margin: "0 auto", maxWidth: "100%" }}
        />
      </Modal>
      <div style={textBlockStyle}>
        <Title level={5}>Propietario</Title>
        <Space direction="vertical" size="20">
          <div>
            <Text strong>ID del propietario:</Text> {deviceData.owner.id}
          </div>
          <div>
            <Text strong>Nombre del propietario:</Text> {deviceData.owner.name}
          </div>
          <div>
            <Text strong>Número de teléfono:</Text>{" "}
            {deviceData.owner.phone_number}
          </div>
          <div>
            <Text strong>Correo electrónico:</Text> {deviceData.owner.email}
          </div>
          <div>
            <Text strong>Fecha de creación del propietario:</Text>{" "}
            {moment(deviceData.owner.created_at).format("DD-MM-YYYY HH:mm:ss")}
          </div>
          <div>
            <Text strong>Última actualización del propietario:</Text>{" "}
            {moment(deviceData.owner.updated_at).format("DD-MM-YYYY HH:mm:ss")}
          </div>
        </Space>
      </div>
      <div style={textBlockStyle}>
        <Title level={5}>Actualizaciones</Title>
        <Timeline>
          {deviceData.updates.map((update) => (
            <Timeline.Item key={update.id}>
              <div style={textBlockStyle}>
                <Space direction="vertical" size="20">
                  <div>
                    <Text strong>Título:</Text> {update.Title}
                  </div>
                  <div>
                    <Text strong>Descripción:</Text> {update.description}
                  </div>
                  <div>
                    <Text strong>Fecha de Creación:</Text>{" "}
                    {moment(update.created_at).format("DD-MM-YYYY HH:mm:ss")}
                  </div>
                </Space>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </Card>
  );
};

export default DeviceDetails;
