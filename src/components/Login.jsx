import React from 'react';
import { Form, Input, Button } from 'antd';

const LoginForm = ({ onFinish }) => {
  return (
    <Form
      name="login-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      style={{ width: '100%', maxWidth: '400px' }}
    >
      <h2 style={{ textAlign: 'center' }}>Inicio de Sesión</h2>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Por favor ingresa tu correo electrónico',
          },
          {
            type: 'email',
            message: 'Ingresa un correo electrónico válido',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[
          {
            required: true,
            message: 'Por favor ingresa tu contraseña',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
