import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const DeviceForm = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [owners, setOwners] = useState([]);
  const [formLayout, setFormLayout] = useState('vertical');

  useEffect(() => {
    axios
      .get('http://143.198.148.125/api/catalog/owners')
      .then((response) => {
        setOwners(response.data.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de propietarios', error);
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const sendDeviceData = (values) => {
    const selectedOwner = owners.find((owner) => owner.name === values.owner_name);
    if (selectedOwner) {
      const ownerId = selectedOwner.id;
      console.log('ID del propietario seleccionado:', ownerId);
    }

    const deviceData = {
      state: values.state,
      device_type: values.device_type,
      brand: values.brand,
      damage: values.damage,
      accesories: values.accesories,
      technican: values.technican,
      owner_id: values.owner_id,
      img: values.img,
    };

    return deviceData;
  };

  const onFinish = (values) => {
    const deviceData = sendDeviceData(values);

    axios
      .post('http://143.198.148.125/api/devices', deviceData)
      .then((response) => {
        message.success('Dispositivo agregado exitosamente');
        console.log('Respuesta del servidor:', response.data);
      })
      .catch((error) => {
        message.error('Error al agregar el dispositivo');
        console.error('Error al agregar el dispositivo', error);
      });

    setIsModalVisible(false);
  };

  return (
    <Form
      form={form}
      layout={formLayout}
      style={{ maxWidth: '600px' }}
      onFinish={onFinish}
      initialValues={{ layout: formLayout }}
      onValuesChange={({ layout }) => {
        setFormLayout(layout);
      }}
    >
      <Button type="primary" onClick={showModal}>
        Agregar Dispositivo
      </Button>
      <Modal title="Agregar Dispositivo" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form.Item label="Estado" name="state" rules={[{ required: true, message: 'Por favor seleccione el estado' }]}>
          <Select>
            <Select.Option value="Recibido">Recibido</Select.Option>
            <Select.Option value="En Proceso">En Proceso</Select.Option>
            <Select.Option value="Terminado">Terminado</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Tipo de Dispositivo" name="device_type" rules={[{ required: true, message: 'Por favor ingrese el tipo de dispositivo' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Marca" name="brand" rules={[{ required: true, message: 'Por favor ingrese la marca' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Daño" name="damage">
          <Input />
        </Form.Item>

        <Form.Item label="Accesorios" name="accesories">
          <Input />
        </Form.Item>

        <Form.Item label="Técnico" name="technican">
          <Input />
        </Form.Item>

        <Form.Item label="Propietario" name="owner_name">
          <Select>
            {owners.map((owner) => (
              <Select.Option key={owner.id} value={owner.id}>
                {owner.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Imagen" name="img">
  <Upload
    beforeUpload={() => false} // Prevent default behavior to open the file dialog
  >
    <Button icon={<UploadOutlined />}>Seleccionar Archivo</Button>
  </Upload>
</Form.Item>

        <Button type="primary" htmlType="submit" onClick={() => onFinish(form.getFieldsValue())}>
          Guardar
        </Button>
      </Modal>
    </Form>
  );
};

export default DeviceForm;
