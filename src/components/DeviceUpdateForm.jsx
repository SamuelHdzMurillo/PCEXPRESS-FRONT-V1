import React, { useState } from "react";
import { Form, Input, Upload, Button, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const DeviceUpdateForm = ({ deviceId, modalVisible, setModalVisible }) => {
  const [form] = Form.useForm();

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onFinish = async (values) => {
    const { title, description, images } = values;
    const imagesFormData = new FormData();

    if (images) {
      images.forEach((image, index) => {
        imagesFormData.append(`images[${index}]`, image.originFileObj);
      });
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("device_id", deviceId);
      if (images) {
        formData.append("images", imagesFormData);
      }

      const response = await axios.post(
        "http://143.198.148.125/api/updates",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        message.success("Datos enviados exitosamente");
        form.resetFields(); // Limpia el formulario después de enviar los datos.
        setModalVisible(false); // Cierra el modal después de enviar los datos con éxito.
      } else {
        console.error("Error al enviar los datos");
        message.error("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      message.error("Error al enviar los datos");
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const props = {
    name: "images",
    multiple: true,
    action: "URL_DE_TU_SERVIDOR", // Reemplaza con la URL real de tu servidor.
    onChange(info) {
      // No necesitas guardar la lista de archivos en este caso.
    },
  };

  return (
    <div>
      <Button onClick={showModal}></Button>
      <Modal
        title="Formulario"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="device_update_form" onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Por favor ingresa el título" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Por favor ingresa la descripción" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Images (OPCIONAL)"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Seleccionar Imágenes</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="device_id" hidden initialValue={deviceId}>
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

export default DeviceUpdateForm;
