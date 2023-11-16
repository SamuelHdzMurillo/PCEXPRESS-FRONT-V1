import React, { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm, Input } from "antd";
import {
  SearchOutlined,
  DeleteFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import UserRegistrationModal from "./RegisterUser.jsx"; // Ajusta la ruta según la ubicación del archivo UserRegistrationModal.js

import moment from "moment";

const UsersTable = () => {
  const [userData, setUserData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  useEffect(() => {
    fetch("http://143.198.148.125/api/users")
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result.data)) {
          setUserData(result.data);
        } else if (result.data && typeof result.data === "object") {
          setUserData([result.data]);
        }
      })
      .catch((error) => {
        console.error("Ha ocurrido un error al obtener los datos:", error);
      });
  }, []);

  const handleDelete = (userId) => {
    // ... código existente para eliminar usuario
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Buscar
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reiniciar
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Fecha de Creación",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Última Actualización",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Acciones",
      dataIndex: "id",
      key: "actions",
      render: (userId) => (
        <Popconfirm
          title="¿Estás seguro de eliminar este usuario?"
          onConfirm={() => handleDelete(userId)}
          okText="Sí"
          cancelText="No"
        >
          <Button icon={<DeleteFilled />} type="primary" danger />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <UserRegistrationModal
        openButton={
          <Button
            icon={<PlusCircleFilled />}
            type="primary"
            onClick={() => setShowRegistrationModal(true)}
          />
        }
      />
      {/* Puedes personalizar el botón de apertura según tus necesidades */}
      <Table dataSource={userData} columns={columns} rowKey="id" />
    </div>
  );
};

export default UsersTable;
