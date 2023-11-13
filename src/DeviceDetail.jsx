// DeviceDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DeviceDetails = () => {
  const { id } = useParams();
  const [deviceData, setDeviceData] = useState(null);

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

  return (
    <div>
      <h1>Detalles del Dispositivo</h1>
      <p>ID: {deviceData.id}</p>
      <p>Estado: {deviceData.state}</p>
      <p>Tipo de dispositivo: {deviceData.device_type}</p>
      {/* Mostrar otros detalles del dispositivo según sea necesario */}
    </div>
  );
};

export default DeviceDetails;
