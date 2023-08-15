import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react';
import App from './App'
import Hola from './holamundo.jsx'
import Login from './login.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './styles/index.css'

const router = createBrowserRouter([
  {
    path: "/hola",
    element: <Hola></Hola>,
  },
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/Login",
    element: <Login></Login>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <RouterProvider router={router} />
    </ChakraProvider>,
)
