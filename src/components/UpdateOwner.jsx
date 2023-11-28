import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import axios from "axios";

const EditOwnerModal = ({ isOpen, setIsOpen, ownerId }) => {
  const [form] = Form.useForm();
  const [ownerData, setOwnerData] = useState({});
  const [devices, setDevices] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://www.pcexpressbcs.com.mx/api/owners/${ownerId}`
      );
      const ownerInfo = response.data;
      setOwnerData(ownerInfo);
      setDevices(ownerInfo.devices || []);
      form.setFieldsValue({
        name: ownerInfo.name,
        phone_number: ownerInfo.phone_number,
        email: ownerInfo.email,
      });
    } catch (error) {
      console.error("Error fetching owner data:", error);
      message.error("Error al cargar la información del propietario");
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      const updatedOwnerData = { ...ownerData, ...values };
      await axios.post(
        `https://www.pcexpressbcs.com.mx/api/owners/${ownerId}`,
        updatedOwnerData
      );
      message.success("Datos del propietario actualizados correctamente");
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating owner data:", error);
      message.error("Error al actualizar la información del propietario");
    }
  };

  return (
    <Modal
      visible={isOpen}
      onCancel={handleCancel}
      title="Editar Propietario"
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Teléfono"
          name="phone_number"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Correo Electrónico"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Guardar Cambios
        </Button>
      </Form>
    </Modal>
  );
};

export default EditOwnerModal;
