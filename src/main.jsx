import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import Hola from "./holamundo.jsx";
import Login from "./login.jsx";
import Index from "./index.jsx";
import Pruebas from "./pruebas.jsx";
import DeviceDetail from "./DeviceDetail.jsx";
import NoAuth from "./NoAuth.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <ChakraProvider>
    <HashRouter>
      <Routes>
        <Route path="/hola" component={Hola} />
        <Route path="/noauth" component={NoAuth} />
        <Route path="/app" component={App} />
        <Route path="/" exact component={Login} />
        <Route path="/adminDevices" component={Index} />
        <Route path="/prueba" component={Pruebas} />
        <Route path="/devices/:id" component={DeviceDetail} />
      </Routes>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
