import React from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const DeviceUpdateForm = ({ deviceId }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { title, description, images } = values;

    // Si no se proporcionaron imágenes, establece `images` como `null`
    const imagesFormData = images ? new FormData() : null;

    if (images) {
      images.forEach((image, index) => {
        imagesFormData.append(`images[${index}]`, image.originFileObj);
      });
    }

    try {
      const response = await axios.post("http://143.198.148.125/api/updates", {
        title,
        description,
        device_id: deviceId,
        images: images ? imagesFormData : null,
      });

      if (response.status === 200) {
        message.success("Datos enviados exitosamente");
        form.resetFields(); // Limpia el formulario después de enviar los datos.
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
        label="Images"
        name="images"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select Images</Button>
        </Upload>
      </Form.Item>

      <Form.Item name="device_id" hidden initialValue={deviceId}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeviceUpdateForm;
