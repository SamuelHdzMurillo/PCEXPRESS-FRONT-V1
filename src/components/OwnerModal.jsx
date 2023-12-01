import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message, Alert } from "antd";
import axios from "axios";

const { Option } = Select;

const OwnerForm = ({ isModalVisible, setIsModalVisible }) => {
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAlertVisible(false); // Ocultar la alerta al cerrar el modal
    form.resetFields();
  };

  const sendOwnerData = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone_number", values.phone_number);

    return formData;
  };

  const onFinish = async () => {
    try {
      const response = await axios.get(
        "https://www.pcexpressbcs.com.mx/api/owners"
      );
      const ownersData = response.data; // Datos de propietarios obtenidos

      const validatedValues = await form.validateFields();
      const isDuplicateEmail = ownersData.some(
        (owner) => owner.email === validatedValues.email
      );
      const isDuplicatePhoneNumber = ownersData.some(
        (owner) => owner.phone_number === validatedValues.phone_number
      );

      if (isDuplicateEmail && isDuplicatePhoneNumber) {
        message.warning(
          "El propietario ya existe con este correo y número de teléfono. No se pueden duplicar datos."
        );
        return;
      } else if (isDuplicateEmail) {
        message.warning(
          "El propietario ya existe con este correo. No se pueden duplicar datos. Por favor, cambia el correo."
        );
        return;
      } else if (isDuplicatePhoneNumber) {
        message.warning(
          "El propietario ya existe con este número de teléfono. No se pueden duplicar datos. Por favor, cambia el número de teléfono."
        );
        return;
      }

      // Si no hay duplicados, proceder con el envío de datos
      const formData = sendOwnerData(validatedValues);
      const postResponse = await axios.post(
        "https://www.pcexpressbcs.com.mx/api/owners",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Mostrar mensaje de éxito y ocultar el modal si los datos se envían correctamente
      console.log("Respuesta del servidor:", postResponse.data);
      message.success("Datos enviados correctamente");
      setIsModalVisible(false);
    } catch (error) {
      // Manejo de errores
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(
            `Error ${error.response.status}: ${error.response.data}`
          );
        } else if (error.request) {
          console.error(
            "Error de conexión: No se pudo establecer comunicación con el servidor"
          );
        } else {
          console.error("Error:", error.message);
        }
        message.error(
          "Ocurrió un error al enviar los datos. Por favor, inténtalo de nuevo más tarde."
        );
      } else {
        console.error("Error:", error);
      }
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
            style={{ zIndex: 9999 }}
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
                message:
                  "Ingresa un número de teléfono válido o Activa el Teclado Numerico",
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
                required: false,
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
