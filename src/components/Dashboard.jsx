import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  ToolOutlined ,
  HomeOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme ,Breadcrumb, Divider } from 'antd';
import { Heading }  from '@chakra-ui/react';
import DataTable from './Table.jsx';

const handleDelete = (id) => {
  // Lógica para eliminar un registro
  console.log('Eliminar registro con ID:', id);
};
const handleItemClick = (key) => {
  if (key === '1') {
    // Si el elemento es 'Inicio', redirige a la ruta '/'
    window.location.href = '/';
  }
};

const handleEdit = (record) => {
  // Lógica para editar un registro
  console.log('Editar registro:', record);
};
const { Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />dicen 
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['3']}
          onClick={({ key }) => handleItemClick(key)}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Inicio',
              link: '/',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Usuarios',
            },
            {
              key: '3',
              icon: <ToolOutlined />,
              label: 'Dispositivos',
            },
          ]}
        />
      </Sider>
      <Layout>
        
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}>
           <Heading   mb={2} as='h1' size='xl' >Tabla de Dispositivos</Heading>
              <Breadcrumb>
            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Dispositivos</Breadcrumb.Item>
            
      </Breadcrumb>
      <Divider />
          <DataTable onDelete={handleDelete} onEdit={handleEdit} />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;