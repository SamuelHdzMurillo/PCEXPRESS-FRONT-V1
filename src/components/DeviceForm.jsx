import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message, Button } from "antd";
import axios from "axios";
import FormData from "form-data";

const DeviceForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [owners, setOwners] = useState([]);
  const [formLayout, setFormLayout] = useState("vertical");

  useEffect(() => {
    axios
      .get("http://143.198.148.125/api/catalog/owners")
      .then((response) => {
        setOwners(response.data.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de propietarios", error);
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    onClose();
  };

  const sendDeviceData = (values) => {
    const selectedOwner = owners.find(
      (owner) => owner.name === values.owner_name
    );
    if (selectedOwner) {
      const ownerId = selectedOwner.id;
      console.log("ID del propietario seleccionado:", ownerId);
    }

    const formData = new FormData();
    formData.append("state", values.state);
    formData.append("device_type", values.device_type);
    formData.append("brand", values.brand);
    formData.append("damage", values.damage);
    formData.append("accesories", values.accesories);
    formData.append("technican", values.technican);
    formData.append("owner_id", values.owner_id);
    formData.append("img", values.img[0]);

    return formData;
  };

  const onFinish = async (values) => {
    const formData = sendDeviceData(values);

    try {
      const response = await axios.post(
        "http://143.198.148.125/api/devices",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Dispositivo agregado exitosamente");
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      message.error("Error al agregar el dispositivo");
      console.error("Error al agregar el dispositivo", error);
    }

    setIsModalVisible(false);
    onClose();
  };

  return (
    <Modal
      title="Agregar Dispositivo"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        layout={formLayout}
        style={{ maxWidth: "600px" }}
        onFinish={onFinish}
        initialValues={{ layout: formLayout }}
        onValuesChange={({ layout }) => {
          setFormLayout(layout);
        }}
      >
        <Button type="primary" onClick={showModal}>
          Agregar Dispositivo
        </Button>
        <Modal
          title="Agregar Dispositivo"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form.Item
            label="Estado"
            name="state"
            rules={[
              { required: true, message: "Por favor seleccione el estado" },
            ]}
          >
            <Select>
              <Select.Option value="Recibido">Recibido</Select.Option>
              <Select.Option value="En Proceso">En Proceso</Select.Option>
              <Select.Option value="Terminado">Terminado</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Tipo de Dispositivo"
            name="device_type"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el tipo de dispositivo",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Marca"
            name="brand"
            rules={[{ required: true, message: "Por favor ingrese la marca" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Daño"
            name="damage"
            rules={[{ required: true, message: "Por favor ingrese el daño" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Accesorios"
            name="accesories"
            rules={[
              { required: true, message: "Por favor ingrese los accesorios" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Técnico"
            name="technican"
            rules={[
              { required: true, message: "Por favor ingrese el tecnico" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Propietario"
            name="owner_id"
            rules={[{ required: true, message: "Por favor ingrese el dueño" }]}
          >
            <Select>
              {owners.map((owner) => (
                <Select.Option key={owner.id} value={owner.id}>
                  {owner.name}-{owner.phone_number}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Imagen"
            name="img"
            valuePropName="fileList"
            rules={[{ required: true, message: "Por favor ingrese la marca" }]}
          >
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={(e) =>
                form.setFieldsValue({ img: [e.target.files[0]] })
              }
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            onClick={() => onFinish(form.getFieldsValue())}
          >
            Guardar
          </Button>
        </Modal>
      </Form>
    </Modal>
  );
};

export default DeviceForm;
