import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Table,
  Button,
  Popconfirm,
  Space,
  Dropdown,
  Input,
  Tooltip,
  Modal,
  Menu,
  Tag,
  message,
  Select,
} from "antd";
import {
  PlusCircleFilled,
  PrinterFilled,
  DeleteFilled,
  EditFilled,
  MessageFilled,
} from "@ant-design/icons";

import DeviceForm from "./DeviceForm";
import DeviceUpdateForm from "./DeviceUpdateForm";
import EditDeviceModal from "./UpdateDeviceForm";
import axios from "axios";
import moment from "moment";
import "moment/locale/es"; // Importa la localización que desees, por ejemplo, español

const DataTable = ({ onEdit }) => {
  const { Search } = Input;
  const { Option } = Select;
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false); // Nuevo estado para el modal de actualización
  const [selectedDeviceId, setSelectedDeviceId] = useState(null); // Nuevo estado para almacenar el ID del dispositivo seleccionado
  const [selectedOption, setSelectedOption] = useState("");
  const openForm = () => {
    setIsFormVisible(true);
  };

  const openEditModal = (record) => {
    setSelectedDeviceId(record.id);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedDeviceId(null);
    setIsEditModalOpen(false);
    fetchData();
  };

  const closeForm = () => {
    setIsFormVisible(false);
    fetchData();
  };

  const showModal = () => {
    setIsModalVisible(true);
    fetchData();
  };

  const onDelete = async (deviceId) => {
    try {
      const response = await axios.delete(
        `https://www.pcexpressbcs.com.mx/api/devices/${deviceId}`
      );

      if (response.status === 200) {
        // Elimina el dispositivo de los datos
        setData((prevData) => prevData.filter((item) => item.id !== deviceId));
        message.success("Dispositivo eliminado exitosamente");
      } else {
        console.error("Error al eliminar el dispositivo");
        message.error("Error al eliminar el dispositivo");
      }
    } catch (error) {
      console.error("Error al eliminar el dispositivo:", error);
      message.error("Error al eliminar el dispositivo");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    fetchData();
  };

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetchData();
  }, [pagination]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://www.pcexpressbcs.com.mx/api/devices",
        {
          params: {
            page: pagination.current,
            per_page: pagination.pageSize,
          },
        }
      );

      // Define el orden de los estados
      const stateOrder = ["Recibido", "En Proceso", "Terminado", "Entregado"];

      // Ordena los datos en base al estado
      response.data.sort((a, b) => {
        return stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state);
      });

      // Actualiza los datos ordenados en el estado "data"
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener los datos de dispositivos:", error);
    }
  };

  const handleAddUpdate = (record) => {
    setSelectedDeviceId(record.id); // Almacena el ID del dispositivo seleccionado
    setIsUpdateModalVisible(true);
    fetchData(); // Abre el modal de actualización
  };

  const smsMenu = (record) => (
    <Menu>
      <Menu.Item key="en_proceso">
        <a onClick={() => handleStatusChange(record.id, "in-progress")}>
          En proceso
        </a>
      </Menu.Item>
      <Menu.Item key="recibido">
        <a onClick={() => handleStatusChange(record.id, "received")}>
          Recibido
        </a>
      </Menu.Item>
      <Menu.Item key="terminado">
        <a onClick={() => handleStatusChange(record.id, "completed")}>
          Terminado
        </a>
      </Menu.Item>
    </Menu>
  );
  const handleStatusChange = async (deviceId, status) => {
    try {
      // Define la URL según el estado seleccionado
      const url = `https://www.pcexpressbcs.com.mx/api/devices/${deviceId}/${status}`;

      // Realiza la solicitud HTTP
      const response = await axios.get(url);

      if (response.status === 200) {
        // Actualiza la lista de dispositivos después de cambiar el estado

        fetchData();
        message.success("Mensaje enviado con éxito");
      } else {
        console.error("Error al cambiar el estado del dispositivo");
        message.error("Error al enviar mensaje , Contacta soporte!");
      }
    } catch (error) {
      console.error("Error al cambiar el estado del dispositivo:", error);
    }
  };

  const columns = [
    {
      title: "Orden",
      dataIndex: "id",
      key: "name",
      render: (text, record) => (
        <span>
          <Link to={`/devices/${record.id}`}>{record.id}</Link>
        </span>
      ),
    },
    {
      title: "Cliente",
      dataIndex: "owner.name",
      key: "name",
      render: (text, record) => <span>{record.owner.name}</span>,
    },
    {
      title: "Estado",
      dataIndex: "state",
      key: "state",
      render: (text, record) => {
        let color;
        switch (record.state) {
          case "Recibido":
            color = "red";
            break;
          case "En Proceso":
            color = "yellow";
            break;
          case "Terminado":
            color = "green";
            break;
          case "Entregado":
            color = "blue";
            break;
          default:
            color = "default";
            break;
        }

        return <Tag color={color}>{record.state}</Tag>;
      },
    },
    {
      title: "Tipo de dispositivo",
      dataIndex: "device_type",
      key: "device_type",
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Daño",
      dataIndex: "damage",
      key: "damage",
    },
    {
      title: "Accesorios",
      dataIndex: "accesories",
      key: "accesories",
    },
    {
      title: "Fecha",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => (
        <span>{moment(record.created_at).format("DD/MM/YYYY - HH:mm:ss")}</span>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<PrinterFilled />}
            onClick={() => handlePrint(record)}
          />

          <Dropdown overlay={smsMenu(record)}>
            <Button icon={<MessageFilled />}></Button>
          </Dropdown>
          <Tooltip title="Agregar Actualizacion">
            <Button
              style={{
                background: "#96be25",
                borderColor: "#96be25",
                color: "white",
              }}
              icon={<PlusCircleFilled />}
              onClick={() => handleAddUpdate(record)}
            />
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              icon={<EditFilled />}
              type="primary"
              onClick={() => openEditModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="¿Estás seguro de eliminar este registro?"
            onConfirm={() => onDelete(record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button icon={<DeleteFilled />} type="primary" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  const handleSelectChange = (value) => {
    setSelectedOption(value); // Actualiza el estado con el valor seleccionado del Select
  };
  const handleAddDevice = (record) => {
    console.log("ID DEL DISPOSITIVO:", record.id);
  };
  const handleSearch = (value) => {
    setSearchQuery(value);
  };
  const handlePrintLastDeviceTicket = async () => {
    const lastDeviceId = await handlePrintLastData();
    const lastDevice = data.find((device) => device.id === lastDeviceId);

    if (lastDevice) {
      handlePrint(lastDevice);
    } else {
      console.error("No se encontró el dispositivo más reciente.");
    }
  };
  const handlePrintLastData = async () => {
    try {
      if (data.length > 0) {
        // Encuentra el registro con el ID más grande
        const lastRecord = data.reduce((prev, current) =>
          prev.id > current.id ? prev : current
        );

        return lastRecord.id; // Devuelve el número del último registro
      } else {
        console.error("No hay datos para imprimir");
        return null; // Si no hay datos, devuelve null o algún valor indicativo
      }
    } catch (error) {
      console.error("Error al obtener el último registro:", error);
      return null; // Manejo de errores: devuelve null o algún valor indicativo
    }
  };

  const handlePrint = async (record) => {
    try {
      console.log("ID DEL DISPOSITIVO:", record.id);
      // Realiza una solicitud HTTP al endpoint con el ID del registro seleccionado
      const response = await axios({
        method: "GET",
        url: `https://www.pcexpressbcs.com.mx/api/devices/${record.id}/ticket`,
        responseType: "arraybuffer", // Importante: solicitar una respuesta en formato de array de bytes (binario)
      });

      // Verificar que la solicitud fue exitosa
      if (response.status === 200) {
        // Crear un Blob a partir de los datos del PDF
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        // Crear un objeto de ventana para cargar el PDF
        const pdfWindow = window.open(url);

        // Esperar a que se cargue el PDF antes de imprimirlo
        pdfWindow.onload = () => {
          pdfWindow.print(); // Imprimir el PDF
        };

        // Limpiar después de imprimir
        pdfWindow.onafterprint = () => {
          window.URL.revokeObjectURL(url);
        };
      } else {
        console.error("Error al imprimir: No se pudo obtener el PDF");
      }
    } catch (error) {
      console.error("Error al imprimir:", error);
    }
  };

  const filteredData = data.filter((item) => {
    // Filtra en base a la búsqueda y al valor seleccionado del Select
    return (
      (selectedOption === "" || item.state === selectedOption) &&
      (item.owner.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Considera el campo "Cliente" en la búsqueda
        Object.values(item).some((property) => {
          if (typeof property === "string" && property !== item.owner.name) {
            // Asegúrate de no repetir la búsqueda para el campo "Cliente"
            return property.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        }))
    );
  });

  return (
    <div>
      <Select
        placeholder="Filtrar por Estado"
        style={{ width: 200, marginBottom: 16, marginLeft: 8 }}
        onChange={handleSelectChange}
        value={selectedOption}
      >
        <Option value="Recibido">Recibido</Option>
        <Option value="Terminado">Terminado</Option>
        <Option value="En Proceso">En Proceso</Option>
        <Option value="Entregado">Entregado</Option>
        <Option value="">-----SIN CATEGORIA----</Option>
      </Select>
      <Search
        placeholder="Buscar en la tabla"
        style={{ width: 300, marginBottom: 16 }}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Tooltip title="Agregar Dispositivo">
        <Button
          type="primary"
          onClick={openForm}
          icon={<PlusCircleFilled />}
        ></Button>
      </Tooltip>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <Modal
        title="Agregar Actualización"
        visible={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        footer={null}
      />
      <DeviceUpdateForm
        deviceId={selectedDeviceId} // Pasa el ID del dispositivo al componente DeviceUpdateForm
        modalVisible={isUpdateModalVisible}
        setModalVisible={setIsUpdateModalVisible}
      />
      {isEditModalOpen && (
        <EditDeviceModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          deviceId={selectedDeviceId}
        />
      )}

      {isFormVisible && <DeviceForm onClose={closeForm} />}
    </div>
  );
};

export default DataTable;
