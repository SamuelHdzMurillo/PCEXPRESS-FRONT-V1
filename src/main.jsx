import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import Hola from "./holamundo.jsx";
import Login from "./login.jsx";
import Index from "./index.jsx";
import Pruebas from "./pruebas.jsx";
import DeviceDetail from "./DeviceDetail.jsx";
import NoAuth from "./NoAuth.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/hola",
    element: <Hola></Hola>,
  },
  {
    path: "/noauth",
    element: <NoAuth></NoAuth>,
  },
  {
    path: "#/app",
    element: <App></App>,
  },
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "#/adminDevices",
    element: <Index></Index>,
  },
  {
    path: "/prueba",
    element: <Pruebas></Pruebas>,
  },
  {
    path: "#/devices/:id",
    element: <DeviceDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);
