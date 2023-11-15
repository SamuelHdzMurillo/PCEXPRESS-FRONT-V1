import React, { useState } from "react";
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
} from "@chakra-ui/react";

export default function UserRegistrationModal({ openButton }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async () => {
    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setRegisterError("Las contraseñas no coinciden");
      return;
    }

    // Aquí debes implementar la lógica para enviar la solicitud POST a la API
    // y manejar la respuesta para el registro del usuario
    try {
      const response = await fetch("http://143.198.148.125/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName, email, password }),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setRegisterError("");
        // Limpiar los campos después de un registro exitoso si es necesario
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        const data = await response.json();
        setRegisterError(data.message || "Ha ocurrido un error en el registro");
      }
    } catch (error) {
      setRegisterError("Ha ocurrido un error en la conexión");
      console.error("Error:", error);
    }
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
          <ModalHeader>User Registration</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {showSuccessMessage ? (
              <p style={{ color: "green", marginTop: "8px" }}>
                ¡Registro exitoso!
              </p>
            ) : (
              <>
                <FormControl>
                  <FormLabel>User Name</FormLabel>
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-email@example.com"
                    type="email"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    type="password"
                  />
                </FormControl>

                {registerError && (
                  <p style={{ color: "red", marginTop: "8px" }}>
                    {registerError}
                  </p>
                )}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            {!showSuccessMessage && (
              <>
                <Button variant="ghost" mr={3} onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={handleSubmit}>
                  Submit
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
