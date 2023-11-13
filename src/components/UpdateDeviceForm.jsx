import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import axios from "axios";

const EditDeviceModal = ({ isOpen, onClose, deviceId }) => {
  const [form] = Form.useForm();

  const [deviceData, setDeviceData] = useState({
    state: "",
    device_type: "",
    brand: "",
    damage: "",
    accessories: "",
    technican: "",
    owner_id: "",
  });

  useEffect(() => {
    axios
      .get(`http://143.198.148.125/api/devices/${deviceId}`)
      .then((response) => {
        const data = response.data;
        setDeviceData({
          state: data.state,
          device_type: data.device_type,
          brand: data.brand,
          damage: data.damage,
          accessories: data.accesories,
          technican: data.technican,
          owner_id: data.owner_id,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [deviceId]);

  useEffect(() => {
    // Después de obtener los datos del dispositivo, establece los valores iniciales del formulario.
    form.setFieldsValue(deviceData);
  }, [deviceData, form]);

  const handleFormSubmit = (values) => {
    // Hacer una solicitud PUT para actualizar los datos del dispositivo con los valores del formulario.
    axios
      .put(`http://143.198.148.125/api/devices/${deviceId}`, values)
      .then((response) => {
        console.log("Dispositivo actualizado con éxito");
        message.success("Datos enviados exitosamente");
        onClose();
      })
      .catch((error) => {
        console.error(error);
        message.error("Error al enviar los datos");
      });
  };

  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      title="Editar Dispositivo"
      footer={null}
    >
      <Form form={form} onFinish={handleFormSubmit}>
        <Form.Item name="state" label="Estado">
          <Input placeholder="Estado" />
        </Form.Item>
        <Form.Item name="device_type" label="Tipo de Dispositivo">
          <Input placeholder="Tipo de dispositivo" />
        </Form.Item>
        <Form.Item name="brand" label="Marca">
          <Input placeholder="Marca" />
        </Form.Item>
        <Form.Item name="damage" label="Daño">
          <Input placeholder="Daño" />
        </Form.Item>
        <Form.Item name="accessories" label="Accesorios">
          <Input placeholder="Accesorios" />
        </Form.Item>
        <Form.Item name="technican" label="Técnico">
          <Input placeholder="Técnico" />
        </Form.Item>
        <Form.Item name="owner_id" label="Cliente">
          <Input placeholder="Cliente" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditDeviceModal;
