import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text,
  Box,
} from '@chakra-ui/react';

const TimelineModal = ({ isOpen, onClose, deviceUpdates }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Historial de Actualizaciones</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {deviceUpdates.map((update) => (
              <Box
                key={update.id}
                p={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
              >
                <Text fontSize="lg">{update.description}</Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(update.created_at).toLocaleString()}
                </Text>
                <Box mt={2}>
                  {update.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://127.0.0.1:8000/storage/${image}`}
                      alt={`Image ${index}`}
                      style={{ maxWidth: '100%', marginBottom: '8px' }}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TimelineModal;
