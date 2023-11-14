import React, { useState } from "react";
import { Layout, Menu, theme, Breadcrumb, Divider } from "antd";
import { Heading } from "@chakra-ui/react";
import UserTable from "./TableNestedDevices.jsx"; // Tabla de usuarios
import DeviceTable from "./Table.jsx"; // Tabla de dispositivos
import { UserOutlined, ToolOutlined, HomeOutlined } from "@ant-design/icons";

const { Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState("devices"); // Estado para la pestaña activa

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleItemClick = (key) => {
    if (key === "1") {
      window.location.href = "/";
    } else if (key === "2") {
      setActiveTab("users"); // Cambiar a la pestaña de usuarios
    } else if (key === "3") {
      setActiveTab("devices"); // Cambiar a la pestaña de dispositivos
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["3"]}
          onClick={({ key }) => handleItemClick(key)}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Inicio",
              link: "/",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "Usuarios",
            },
            {
              key: "3",
              icon: <ToolOutlined />,
              label: "Dispositivos",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Heading mb={2} as="h1" size="xl">
            {activeTab === "users"
              ? "Tabla de Clientes"
              : "Tabla de Dispositivos"}
          </Heading>
          <Breadcrumb
            items={[
              {
                title: "Inicio",
              },
              {
                title: "Admin",
              },
              {
                title: activeTab === "users" ? "Clientes" : "Dispositivos",
              },
            ]}
          />
          <Divider />
          {/* Condición para mostrar la tabla adecuada según la pestaña */}
          {activeTab === "users" ? <UserTable /> : <DeviceTable />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
