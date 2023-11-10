import React, { useState, useEffect } from "react";
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
} from "antd";
import {
  PlusCircleFilled,
  PrinterFilled,
  DeleteFilled,
  EditFilled,
  MessageFilled,
} from "@ant-design/icons";
import DeviceForm from "./DeviceForm";
import axios from "axios";

const DataTable = ({ onDelete, onEdit }) => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      const response = await axios.get("http://143.198.148.125/api/devices", {
        params: {
          page: pagination.current,
          per_page: pagination.pageSize,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener los datos de dispositivos:", error);
    }
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
      const url = `http://143.198.148.125/api/devices/${deviceId}/${status}`;

      // Realiza la solicitud HTTP
      const response = await axios.get(url);

      if (response.status === 200) {
        // Actualiza la lista de dispositivos después de cambiar el estado
        fetchData();
      } else {
        console.error("Error al cambiar el estado del dispositivo");
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
      render: (text, record) => <span>{record.id}</span>,
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
              onClick={() => onEdit(record)}
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
  const handleAddDevice = (record) => {
    console.log("ID DEL DISPOSITIVO:", record.id);
  };
  const handleSearch = (value) => {
    setSearchQuery(value);
  };
  const handlePrint = async (record) => {
    try {
      console.log("ID DEL DISPOSITIVO:", record.id);
      // Realiza una solicitud HTTP al endpoint con el ID del registro seleccionado
      const response = await axios({
        method: "GET",
        url: `http://www.pcexpressbcs.com.mx/api/devices/${record.id}/ticket`,
        responseType: "arraybuffer", // Importante: solicitar una respuesta en formato de array de bytes (binario)
      });

      // Verificar que la solicitud fue exitosa
      if (response.status === 200) {
        // Crear un Blob a partir de los datos del PDF
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace de descarga
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `ticket_${record.id}.pdf`; // Nombre del archivo para la descarga
        document.body.appendChild(a);

        // Simular un clic en el enlace para iniciar la descarga
        a.click();

        // Limpiar después de la descarga
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error("Error al imprimir: No se pudo obtener el PDF");
      }
    } catch (error) {
      console.error("Error al imprimir:", error);
    }
  };

  const filteredData = data.filter((item) => {
    // Filtra en base a la búsqueda en todas las propiedades del objeto
    return Object.values(item).some((property) => {
      if (typeof property === "string") {
        return property.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
  });

  return (
    <div>
      <Search
        placeholder="Buscar en la tabla"
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
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

      {isFormVisible && <DeviceForm onClose={closeForm} />}
    </div>
  );
};

export default DataTable;
