import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import axios from "axios";

export default function UserRegistrationModal({ openButton }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [existingEmails, setExistingEmails] = useState([]);

  useEffect(() => {
    // Hacer la petición GET para obtener la lista de correos existentes
    const fetchExistingEmails = async () => {
      try {
        const response = await axios.get(
          "https://www.pcexpressbcs.com.mx/api/users"
        );
        const usersData = response.data;

        const emails = usersData.data.map((user) => user.email);
        setExistingEmails(emails);
      } catch (error) {
        console.error("Error fetching existing emails:", error);
      }
    };

    fetchExistingEmails();
  }, []);

  const validateForm = () => {
    if (!userName || !email || !password || !confirmPassword) {
      setRegisterError("Por favor, completa todos los campos.");
      return false;
    }

    if (password !== confirmPassword) {
      setRegisterError("Las contraseñas no coinciden");
      return false;
    }

    if (existingEmails.includes(email)) {
      setRegisterError(
        "Este correo ya está registrado. Por favor, utiliza otro."
      );
      return false;
    }

    // Limpiar el estado de error si se corrige la información
    setRegisterError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Enviar solicitud POST a la API
      const response = await axios.post(
        "https://www.pcexpressbcs.com.mx/api/users",
        {
          name: userName,
          email,
          password,
        }
      );

      if (response.status === 200 || 201) {
        // Registro exitoso
        setShowSuccessMessage(true);
      } else {
        setRegisterError("Ha ocurrido un error en el registro");
      }
    } catch (error) {
      setRegisterError("Ha ocurrido un error en la conexión");
      console.error("Error:", error);
    }
  };

  const handleCloseAlert = () => {
    setShowSuccessMessage(false);
    setRegisterError("");
    onClose(); // Cerrar el modal
  };

  const handleCloseModal = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowSuccessMessage(false);
    setRegisterError("");
    onClose();
  };

  return (
    <>
      {React.cloneElement(openButton, { onClick: onOpen })}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registro de Técnico</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {showSuccessMessage ? (
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  ¡Registro exitoso!
                </AlertTitle>
                <AlertDescription>
                  Clic en cerrar para continuar
                </AlertDescription>
                <Button mt={4} onClick={handleCloseAlert}>
                  Cerrar
                </Button>
              </Alert>
            ) : (
              <>
                <FormControl>
                  <FormLabel>Nombre del Técnico</FormLabel>
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Usuario"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo Electrónico"
                    type="email"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    type="password"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <Input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar Contraseña"
                    type="password"
                  />
                </FormControl>

                {registerError && (
                  <Alert status="error">
                    <AlertIcon />
                    {registerError}
                  </Alert>
                )}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            {!showSuccessMessage && (
              <>
                <Button variant="ghost" mr={3} onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button colorScheme="blue" onClick={handleSubmit}>
                  Enviar
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
