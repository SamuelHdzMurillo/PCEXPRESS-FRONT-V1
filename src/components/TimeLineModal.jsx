import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Button,
  Image,
} from "@chakra-ui/react";
import { Timeline } from "antd"; // Importa el componente de Timeline de Ant Design

const TimelineModal = ({ isOpen, onClose, deviceUpdates }) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setImageModalOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Historial de Actualizaciones</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Timeline mode="left">
            {deviceUpdates.map((update) => (
              <Timeline.Item key={update.id}>
                <Box
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                >
                  <p>
                    <strong>{update.title}</strong>
                  </p>
                  <p>{update.description}</p>
                  <p>{new Date(update.created_at).toLocaleString()}</p>
                  {update.images && (
                    <Button onClick={() => openImageModal(update.imgurl)}>
                      Ver Imagen
                    </Button>
                  )}
                </Box>
              </Timeline.Item>
            ))}
          </Timeline>
        </ModalBody>
      </ModalContent>
      {selectedImage && (
        <Modal isOpen={imageModalOpen} onClose={closeImageModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Imagen</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={selectedImage} alt="Imagen" />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Modal>
  );
};

export default TimelineModal;
