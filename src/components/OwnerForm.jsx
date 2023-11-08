// OwnerForm.js
import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const OwnerForm = ({ isModalVisible, setIsModalVisible }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    // Envía los datos del propietario al servidor
    console.log(values);
    // Cerrar el modal
    setIsModalVisible(false);
  };

  return (
    <Modal title="Agregar Propietario" visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <Form form={form} name="owner_form" onFinish={onFinish}>
        {/* Campos del formulario del propietario */}
        <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Teléfono" name="phone_number">
          <Input />
        </Form.Item>
        <Form.Item label="Correo Electrónico" name="email">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OwnerForm;
