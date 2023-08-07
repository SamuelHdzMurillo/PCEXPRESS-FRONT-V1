import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
//import logo from '../assets/logo.jpg';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem('token', token);

        navigate('/hola');
      } else {
        console.error('Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column" // Alineación vertical de los elementos
    >
      <Box
        as="form"
        className="login"
        width={['90%', '80%', '50%', '40%']} // Establece diferentes anchos en diferentes tamaños de pantalla
        bg="white"
        boxShadow="lg"
        p="4"
        rounded="md"
        onSubmit={handleLogin}
      >
        <img
          src='../assets/logo.jpg' // Ruta de la imagen del logo
          alt="Logo"
          style={{
            width: '100px', // Ancho fijo para la imagen del logo
            height: '100px', // Altura fija para la imagen del logo
            margin: '2rem auto 1rem', // Espacio arriba para el logo y entre el logo y el formulario
            display: 'block', // Asegura que la imagen se muestre como bloque para centrarla horizontalmente
          }}
        />
        <Input type="text" name="email" placeholder="Email" mb="3" />
        <Input type="password" name="password" placeholder="Password" mb="3" />
        <Button type="submit" colorScheme="blue" size="md">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
