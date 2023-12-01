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
    serial: "",
    owner_id: "",
    img: "",
  });

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
    axios
      .get(`https://www.pcexpressbcs.com.mx/api/devices/${deviceId}`)
      .then((response) => {
        const data = response.data;
        setDeviceData({
          state: data.state,
          device_type: data.device_type.toUpperCase(),
          brand: data.brand.toUpperCase(),
          damage: data.damage.toUpperCase(),
          accessories: data.accesories.toUpperCase(),
          technican: data.technican,
          owner_id: data.owner_id,
          model: data.model.toUpperCase(),
          serial: data.serial.toUpperCase(),
          observations: data.observations.toUpperCase(),
          img: data.imgUrl,
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
    const formData = new FormData();

    // Agregar los datos del formulario al objeto FormData
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    // Agregar la imagen al objeto FormData
    if (deviceData.img) {
      formData.append("img", dataURItoBlob(deviceData.img));
    }

    // Hacer la solicitud POST con axios utilizando FormData
    axios
      .post(
        `https://www.pcexpressbcs.com.mx/api/devices/${deviceId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
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

  // Función para convertir una URL de datos (data URL) a Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  }

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
            <Select.Option value="Entregado">Entregado</Select.Option>
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
        <Form.Item name="serial" label="Serial">
          <Input placeholder="serial" />
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
          <Form.Item
            label="Imagen"
            name="img"
            valuePropName="fileList"
            rules={[
              { required: false, message: "Por favor ingrese la imagen" },
            ]}
          >
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setDeviceData({ ...deviceData, img: reader.result });
                };
                if (file) {
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditDeviceModal;
