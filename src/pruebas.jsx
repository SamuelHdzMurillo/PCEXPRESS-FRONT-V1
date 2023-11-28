import React, { useState } from "react";
import EditOwnerModal from "./components/UpdateOwner.jsx"; // Asegúrate de tener la ruta correcta al componente

const Main = () => {
  const [isEditOwnerModalVisible, setIsEditOwnerModalVisible] = useState(false);
  const [selectedOwnerId, setSelectedOwnerId] = useState(null); // ID del propietario seleccionado

  const ownerId = 2;

  const handleOpenEditModal = (ownerId) => {
    setSelectedOwnerId(ownerId);
    setIsEditOwnerModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setIsEditOwnerModalVisible(false);
  };

  return (
    <div>
      <button onClick={() => handleOpenEditModal(ownerId)}>
        Abrir modal de edición
      </button>

      <EditOwnerModal
        isOpen={isEditOwnerModalVisible}
        setIsOpen={handleCloseEditModal}
        ownerId={selectedOwnerId}
      />
    </div>
  );
};

export default Main;
