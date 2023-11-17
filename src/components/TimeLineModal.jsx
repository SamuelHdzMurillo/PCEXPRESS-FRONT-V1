import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
} from "@chakra-ui/react";
import { Timeline } from "antd"; // Importa el componente de Timeline de Ant Design

const TimelineModal = ({ isOpen, onClose, deviceUpdates }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Historial de Actualizaciones</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Timeline mode="left">
            {" "}
            {/* Utiliza el componente Timeline de Ant Design */}
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
                </Box>
              </Timeline.Item>
            ))}
          </Timeline>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TimelineModal;
