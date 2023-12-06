import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message, Button, Switch } from "antd";
import axios from "axios";
import FormData from "form-data";
import OwnerModal from "./OwnerModal.jsx";

const DeviceForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [owners, setOwners] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [formLayout] = useState("vertical");
  const [isClient, setIsClient] = useState(false);
  const options = owners.map((owner) => ({
    value: `${owner.id}`,
    label: `${owner.name}-${owner.phone_number}`,
  }));

  const handleSelection = (value) => {
    handleOwnerChange(value);
  };

  const refreshOwnersAndTechnicians = () => {
    // Obtener la lista de propietarios
    axios
      .get("https://www.pcexpressbcs.com.mx/api/catalog/owners")
      .then((response) => {
        setOwners(response.data.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de propietarios", error);
      });

    // Obtener la lista de técnicos
    axios
      .get("https://www.pcexpressbcs.com.mx/api/catalog/users")
      .then((response) => {
        setTechnicians(response.data.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de técnicos", error);
      });
  };

  useEffect(() => {
    refreshOwnersAndTechnicians();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    refreshOwnersAndTechnicians();
  };

  const handleOwnerChange = (value) => {
    refreshOwnersAndTechnicians(); // Vuelve a obtener los catálogos al cambiar la opción del Select
    // Otras acciones que desees realizar al cambiar la opción del Select
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    refreshOwnersAndTechnicians(); // Actualiza los catálogos al cerrar el modal
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
    formData.append("state", "Recibido");
    formData.append("device_type", values.device_type.toUpperCase());
    formData.append("brand", values.brand.toUpperCase());
    formData.append("damage", values.damage.toUpperCase());
    formData.append("accesories", values.accesories.toUpperCase());
    formData.append("technican", values.technican);
    formData.append("owner_id", values.owner_id);
    formData.append("model", values.model.toUpperCase());
    formData.append("observations", values.observations.toUpperCase());
    formData.append("serial", values.serial.toUpperCase());
    formData.append("img", values.img[0]);

    return formData;
  };

  const onFinish = async (values) => {
    const formData = sendDeviceData(values);

    try {
      const response = await axios.post(
        "https://www.pcexpressbcs.com.mx/api/devices",
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
    refreshOwnersAndTechnicians(); // Actualiza los catálogos al cerrar el modal
    onClose();
  };

  return (
    <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <OwnerModal isModalVisible={isClient} setIsModalVisible={setIsClient} />
      <Form
        form={form}
        layout={formLayout}
        style={{ maxWidth: "600px" }}
        onFinish={onFinish}
      >
        <Button onClick={showModal}></Button>
        <Modal
          title="Agregar Dispositivo"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
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
            <Select>
              <Select.Option value="Laptop">Laptop</Select.Option>
              <Select.Option value="PC">PC</Select.Option>
              <Select.Option value="Impresoras">Impresoras</Select.Option>
              <Select.Option value="Celulares">Celulares</Select.Option>
              <Select.Option value="Otros...">Otros...</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Marca"
            name="brand"
            rules={[{ required: true, message: "Por favor ingrese la marca" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Modelo"
            name="model"
            rules={[{ required: true, message: "Por favor ingrese El modelo" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Observaciones"
            name="observations"
            initialValue="No especificado"
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
            label="Serial"
            name="serial"
            rules={[
              { required: true, message: "Por favor ingrese el serial " },
            ]}
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
              { required: true, message: "Por favor seleccione el técnico" },
            ]}
          >
            <Select>
              {technicians.map((technician) => (
                <Select.Option key={technician.id} value={technician.name}>
                  {technician.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="¿Nuevo Cliente?" name="isClient">
            <Switch
              checked={isClient}
              onChange={(checked) => setIsClient(checked)}
            />
          </Form.Item>

          <Form.Item
            label="Propietario"
            name="owner_id"
            rules={[
              {
                required: isClient,
                message: "Por favor ingrese el dueño",
              },
            ]}
          >
            <Select
              onClick={handleOwnerChange}
              showSearch
              style={{
                width: 350,
              }}
              placeholder="Buscar propietario"
              optionFilterProp="label"
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                optionA.label
                  .toLowerCase()
                  .localeCompare(optionB.label.toLowerCase())
              }
              onChange={handleSelection}
              options={options}
            />
          </Form.Item>

          <Form.Item
            label="Imagen"
            name="img"
            valuePropName="fileList"
            rules={[{ required: true, message: "Por favor ingrese la marca" }]}
          >
            <input
              type="file"
              accept=".jpg, .png, .jpeg , .bmp , .tiff , .tif"
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
