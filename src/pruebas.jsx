import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import EditDeviceModal from "./components/UpdateDeviceForm"; // Asegúrate de que la ruta sea correcta

function App() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const deviceId = 12;

  // Función para abrir el modal de edición
  const openEditModal = (deviceId) => {
    setSelectedDeviceId(deviceId);
    setIsEditModalOpen(true);
  };

  // Función para cerrar el modal de edición
  const closeEditModal = () => {
    setSelectedDeviceId(null);
    setIsEditModalOpen(false);
  };

  return (
    <div>
      {/* Botón o elemento que abre el modal de edición */}
      <Button onClick={() => openEditModal(deviceId)}>
        Editar Dispositivo
      </Button>

      {/* Renderiza el modal de edición si está abierto */}
      {isEditModalOpen && (
        <EditDeviceModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          deviceId={selectedDeviceId}
        />
      )}

      {/* Otras partes de tu aplicación */}
    </div>
  );
}

export default App;
