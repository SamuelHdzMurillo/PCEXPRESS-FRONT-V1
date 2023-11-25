import React, { useState } from "react";
import {
  ChakraProvider,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";
import { Navigate } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

export default function UseClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };

    const loginUrl = "https://www.pcexpressbcs.com.mx/api/login";

    axios
      .post(loginUrl, userData)
      .then((response) => {
        localStorage.setItem("userData", JSON.stringify(response.data));
        setRedirectToAdmin(true);
      })
      .catch((error) => {
        console.error("Error de inicio de sesión:", error);
        setShowErrorAlert(true);
      });
  };

  const closeErrorAlert = () => {
    setShowErrorAlert(false);
  };

  return (
    <ChakraProvider>
      {redirectToAdmin && <Navigate to="/adminDevices" />}
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Iniciar Sesión</Heading>
            <FormControl id="email">
              <FormLabel>Correo electrónico</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                colorScheme={"blue"}
                variant={"solid"}
                onClick={handleLogin}
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
            }
          />
        </Flex>
      </Stack>
      {showErrorAlert && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          alignItems="center"
          justifyContent="center"
          zIndex="9999"
        >
          {
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              textAlign="center"
              width="100%"
              maxW="400px"
            >
              <AlertIcon boxSize="40px" mx="auto" mb={4} />
              <AlertTitle>Error de inicio de sesión</AlertTitle>
              <AlertDescription>
                El correo electrónico o la contraseña son incorrectos. Por
                favor, inténtalo de nuevo.
              </AlertDescription>
              <CloseButton mt={4} onClick={closeErrorAlert} />
            </Alert>
          }
        </Flex>
      )}
    </ChakraProvider>
  );
}
