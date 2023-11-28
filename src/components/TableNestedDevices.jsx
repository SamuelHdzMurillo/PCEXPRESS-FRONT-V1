import React, { useState, useEffect } from "react";
import { Badge, Table, Tag, Input, Button, Space } from "antd";
import { SearchOutlined, PlusCircleFilled } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import EditOwnerModal from "./UpdateOwner.jsx";

const App = () => {
  const [clientsData, setClientsData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [isEditOwnerModalVisible, setIsEditOwnerModalVisible] = useState(false);
  const [selectedOwnerId, setSelectedOwnerId] = useState(null);

  useEffect(() => {
    fetch("https://www.pcexpressbcs.com.mx/api/owners")
      .then((response) => response.json())
      .then((data) => setClientsData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  const handleOpenEditModal = (ownerId) => {
    setSelectedOwnerId(ownerId);
    setIsEditOwnerModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setIsEditOwnerModalVisible(false);
  };

  const expandedRowRender = (record) => {
    const deviceColumns = [
      {
        title: "Device Type",
        dataIndex: "device_type",
        key: "device_type",
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
            default:
              color = "default";
              break;
          }

          return <Tag color={color}>{record.state}</Tag>;
        },
      },
      ,
      {
        title: "Daño",
        dataIndex: "damage",
        key: "damage",
      },
      {
        title: "Model",
        dataIndex: "model",
        key: "model",
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
          <span>
            {moment(record.created_at).format("DD/MM/YYYY - HH:mm:ss")}
          </span>
        ),
      },
      // ...otros campos de dispositivos
    ];

    return (
      <Table
        columns={deviceColumns}
        dataSource={record.devices}
        pagination={false}
      />
    );
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
          placeholder={`Search ${dataIndex}`}
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
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      ...getColumnSearchProps("phone_number"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button
            style={{
              background: "#96be25",
              borderColor: "#96be25",
              color: "white",
            }}
            icon={<PlusCircleFilled />}
            onClick={() => handleOpenEditModal(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          onExpand: handleExpand,
          expandedRowKeys,
          rowExpandable: (record) => true,
        }}
        dataSource={clientsData.map((client, index) => ({
          ...client,
          key: index.toString(),
        }))}
      />

      <EditOwnerModal
        isOpen={isEditOwnerModalVisible}
        setIsOpen={handleCloseEditModal}
        ownerId={selectedOwnerId}
      />
    </div>
  );
};

export default App;
