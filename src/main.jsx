import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Hola from "./holamundo.jsx";
import Login from "./login.jsx";
import Index from "./index.jsx";
import Pruebas from "./pruebas.jsx";
import DeviceDetail from "./DeviceDetail.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/hola" element={<Hola />} />
      <Route path="/" element={<App />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/adminDevices" element={<Index />} />
      <Route path="/prueba" element={<Pruebas />} />
      <Route path="/devices/:id" element={<DeviceDetail />} />
    </Routes>
  );
};

ReactDOM.render(
  <Router>
    <AppRoutes />
  </Router>,
  document.getElementById("root")
);
