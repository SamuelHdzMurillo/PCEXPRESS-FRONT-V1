import React, { useState } from "react";
import { Layout, Menu, theme, Breadcrumb, Divider } from "antd";
import { Heading } from "@chakra-ui/react";
import UserTable from "./TableNestedDevices.jsx"; // Tabla de usuarios
import DeviceTable from "./Table.jsx"; // Tabla de dispositivos
import TechTable from "./TableUser.jsx"; // Tabla de técnicos

import {
  UserOutlined,
  ToolOutlined,
  HomeOutlined,
  SettingFilled,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState("devices"); // Estado para la pestaña activa

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    // Limpiar el token del localStorage al cerrar sesión
    localStorage.removeItem("userData");
    // Redirigir a la página de inicio de sesión
    window.location.href = "#/";
  };

  const handleItemClick = (key) => {
    if (key === "1") {
      window.location.href = "#/app";
    } else if (key === "2") {
      setActiveTab("users"); // Cambiar a la pestaña de usuarios
    } else if (key === "3") {
      setActiveTab("devices"); // Cambiar a la pestaña de dispositivos
    } else if (key === "4") {
      setActiveTab("tecnicos"); // Cambiar a la pestaña de técnicos
    } else if (key === "5") {
      handleLogout(); // Cerrar sesión al hacer clic en el botón "Cerrar Sesión"
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          onClick={({ key }) => handleItemClick(key)}
          items={[
            {
              key: "5",
              icon: <LogoutOutlined />,
              label: "Cerrar sesion",
            },
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Inicio",
              link: "/app",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "Clientes",
            },
            {
              key: "3",
              icon: <ToolOutlined />,
              label: "Dispositivos",
            },
            {
              key: "4",
              icon: <SettingFilled />,
              label: "Técnicos",
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
              : activeTab === "devices"
              ? "Tabla de Dispositivos"
              : "Tabla de Técnicos"}
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
                title:
                  activeTab === "users"
                    ? "Clientes"
                    : activeTab === "devices"
                    ? "Dispositivos"
                    : "Técnicos",
              },
            ]}
          />
          <Divider />
          {/* Condición para mostrar la tabla adecuada según la pestaña */}
          {activeTab === "users" ? (
            <UserTable />
          ) : activeTab === "devices" ? (
            <DeviceTable />
          ) : (
            <TechTable />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
