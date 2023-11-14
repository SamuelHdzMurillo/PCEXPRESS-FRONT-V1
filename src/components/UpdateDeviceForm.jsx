import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, message, Select } from "antd";
import axios from "axios";

const EditDeviceModal = ({ isOpen, onClose, deviceId }) => {
  const [form] = Form.useForm();
  const [owners, setOwners] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const [deviceData, setDeviceData] = useState({
    state: "",
    device_type: "",
    brand: "",
    damage: "",
    accessories: "",
    technican: "",
    owner_id: "",
  });

  const refreshOwnersAndTechnicians = () => {
    // Obtener la lista de propietarios
    axios
      .get("http://143.198.148.125/api/catalog/owners")
      .then((response) => {
        setOwners(response.data.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de propietarios", error);
      });

    // Obtener la lista de técnicos
    axios
      .get("http://143.198.148.125/api/catalog/users")
      .then((response) => {
        setTechnicians(response.data.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de técnicos", error);
      });
  };

  useEffect(() => {
    refreshOwnersAndTechnicians();
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
          model: data.model,
          observations: data.observations,
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
          <Select>
            <Select.Option value="Recibido">Recibido</Select.Option>
            <Select.Option value="En Proceso">En Proceso</Select.Option>
            <Select.Option value="Terminado">Terminado</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="device_type" label="Tipo de Dispositivo">
          <Select>
            <Select.Option value="Laptop">Laptop</Select.Option>
            <Select.Option value="PC">PC</Select.Option>
            <Select.Option value="Impresoras">Impresoras</Select.Option>
            <Select.Option value="Celulares">Celulares</Select.Option>
            <Select.Option value="Otros...">Otros...</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="brand" label="Marca">
          <Input placeholder="Marca" />
        </Form.Item>
        <Form.Item name="damage" label="Daño">
          <Input placeholder="Daño" />
        </Form.Item>
        <Form.Item name="model" label="Modelo">
          <Input placeholder="model" />
        </Form.Item>
        <Form.Item name="observations" label="Observaciones">
          <Input placeholder="Observaciones" />
        </Form.Item>
        <Form.Item name="accessories" label="Accesorios">
          <Input placeholder="Accesorios" />
        </Form.Item>
        <Form.Item name="technican" label="Técnico">
          <Select>
            {technicians.map((technician) => (
              <Select.Option key={technician.id} value={technician.name}>
                {technician.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="owner_id" label="Cliente">
          <Select>
            {owners.map((owner) => (
              <Select.Option key={owner.id} value={owner.id}>
                {owner.name}-{owner.phone_number}
              </Select.Option>
            ))}
          </Select>
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
