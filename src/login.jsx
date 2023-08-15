import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
// import logo from '../assets/logo.jpg'; // Asegúrate de tener la ruta correcta de tu logo

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
          Accept: 'application/json',
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
      flexDirection="column"
    >
      <Box
        as="form"
        className="login"
        width={['90%', '80%', '50%', '40%']}
        bg="white"
        boxShadow="lg"
        p="4"
        rounded="md"
        onSubmit={handleLogin}
      >
        {/* <img src={logo} alt="Logo" style={{ width: '100px', height: '100px', margin: '2rem auto 1rem', display: 'block' }} /> */}
        <h2>Sistema de Inventarios</h2>
        <p>Inicia sesión en tu cuenta</p>

        <Input name="email" placeholder="Email" mb="3" />
        <Input name="password" type="password" placeholder="Contraseña" mb="3" />
        <Button type="submit" colorScheme="blue" size="md">
          Iniciar sesión
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
