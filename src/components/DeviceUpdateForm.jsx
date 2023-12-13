import React from "react";
import { Form, Input, Button, Modal, message } from "antd";
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

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("device_id", deviceId);
      formData.append("images", images[0]); // Accede a la imagen desde el campo 'img'

      const response = await axios.post(
        "https://www.pcexpressbcs.com.mx/api/updates",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        message.success("Datos enviados exitosamente");
        form.resetFields();
        setModalVisible(false);
      } else {
        console.error("Error al enviar los datos");
        message.error("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      message.error("Error al enviar los datos");
    }
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
            label="Imagen"
            name="images"
            valuePropName="fileList"
            rules={[{ required: true, message: "Por favor ingrese la imagen" }]}
          >
            <input
              type="file"
              accept=".jpg, .png, .jpeg , .bmp , .tiff , .tif"
              onChange={(e) =>
                form.setFieldsValue({ images: [e.target.files[0]] })
              }
            />
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
