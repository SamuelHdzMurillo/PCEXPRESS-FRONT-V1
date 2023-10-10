import React from 'react';
import { Layout, Menu } from 'antd';
 // Importa tu archivo de estilos personalizados

const { Header, Sider, Content } = Layout;

const Dashboard = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark" style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']}>
          {/* Agrega elementos de menú del Sider aquí */}
          <Menu.Item key="1">Opción 1</Menu.Item>
          <Menu.Item key="2">Opción 2</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {/* Agrega elementos del Header aquí */}
          <h1>Encabezado</h1>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {/* Aquí se incrustará tu DataTable */}
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
