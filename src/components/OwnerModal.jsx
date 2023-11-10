import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import axios from "axios";

const { Option } = Select;

const OwnerForm = ({ isModalVisible, setIsModalVisible }) => {
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const sendOwnerData = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone_number", values.phone_number);

    return formData;
  };

  const onFinish = async (values) => {
    const formData = sendOwnerData(values);

    try {
      const response = await axios.post(
        "http://143.198.148.125/api/owners",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Respuesta del servidor:", response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Abrir Modal
      </Button>
      <Modal
        title="Formulario"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="basic" onFinish={onFinish}>
          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              { required: true, message: "Por favor ingresa un nombre." },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Teléfono"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Por favor ingresa un número de teléfono.",
              },
              {
                pattern: /^(\+)?[0-9]+$/, // Permite un signo '+' al principio
                message: "Ingresa un número de teléfono válido.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Correo Electrónico"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingresa un correo electrónico.",
              },
              {
                type: "email",
                message: "Ingresa un correo electrónico válido.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OwnerForm;
