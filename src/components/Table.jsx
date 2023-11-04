import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Space, Menu, Dropdown, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';

const DataTable = ({ onDelete, onEdit }) => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetchData();
  }, [pagination]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://143.198.148.125/api/devices', {
        params: {
          page: pagination.current,
          per_page: pagination.pageSize,
        },
      });
      setData(response.data);
      setPagination({
        ...pagination,
        total: response.headers['x-total-count'],
      });
    } catch (error) {
      console.error('Error al obtener los datos de dispositivos:', error);
    }
  };

  const smsMenu = (record) => (
    <Menu onClick={(e) => handleSMS(record, e.key)}>
      <Menu.Item key="recibido">Recibido</Menu.Item>
      <Menu.Item key="en_proceso">En proceso</Menu.Item>
      <Menu.Item key="completado">Completado</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Cliente',
      dataIndex: 'owner.name',
      key: 'name',
    render: (text, record) => (
      <span>{record.owner.name}</span>
    )
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Tipo de dispositivo',
      dataIndex: 'device_type',
      key: 'device_type',
    },
    {
      title: 'Marca',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Daño',
      dataIndex: 'damage',
      key: 'damage',
    },
    {
      title: 'Accesorios',
      dataIndex: 'accesories',
      key: 'accesories',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Dropdown overlay={smsMenu(record)} trigger={['click']}>
            <Button>
              SMS <DownOutlined />
            </Button>
          </Dropdown>
          <Button onClick={() => handlePrint(record)}>Imprimir</Button>
          <Button onClick={() => handleAddUpdate(record)}>Agregar Actualización</Button>
          <Button type="primary" onClick={() => onEdit(record)}>
            Editar
          </Button>
          <Popconfirm
            title="¿Estás seguro de eliminar este registro?"
            onConfirm={() => onDelete(record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button type="primary" danger>Eliminar</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredData = data.filter((item) => {
    // Filtra en base a la búsqueda en todas las propiedades del objeto
    return Object.values(item).some((property) => {
      if (typeof property === 'string') {
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
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default DataTable;
