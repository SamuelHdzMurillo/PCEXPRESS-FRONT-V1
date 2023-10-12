import React from 'react';
import { Card } from 'antd';
import LoginForm from './components/Login.jsx'; // Asegúrate de ajustar la ruta correcta

const Login = () => {
  const onFinish = (values) => {
    console.log('Valores del formulario:', values);
    // Agrega aquí la lógica para procesar el inicio de sesión.
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card title="Inicio de Sesión" style={{ width: '100%', maxWidth: '400px' }}>
        <LoginForm onFinish={onFinish} />
      </Card>
    </div>
  );
};

export default Login;
