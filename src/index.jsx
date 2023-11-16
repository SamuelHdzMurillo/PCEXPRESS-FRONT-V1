// App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios"; // Asegúrate de importar axios

import DataTable from "./components/Table"; // Ajusta la ruta según tu estructura de archivos
import Dashboard from "./components/Dashboard"; // Ajusta la ruta según tu estructura de archivos
import Login from "./NoAuth.jsx";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Efecto para verificar el token al cargar el componente
  useEffect(() => {
    const userData = localStorage.getItem("userData");

    // Verificar si existe userData y si tiene el formato esperado
    if (userData) {
      try {
        const { token } = JSON.parse(userData);
        if (token && typeof token === "string" && token.length > 0) {
          // Si el token es válido, establece loggedIn a true
          console.log("sc" + loggedIn);
          setLoggedIn(true);
          console.log("cc" + loggedIn);
        } else {
          // Si el token no es válido, establece loggedIn a false
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
        setLoggedIn(false); // Manejar error al parsear userData
      }
    } else {
      setLoggedIn(false); // Si no hay userData, establecer loggedIn a false
    }
  }, []);
  const handleDelete = (id) => {
    // Lógica para eliminar un registro
    console.log("Eliminar registro con ID:", id);
  };

  const handleAddUpdate = (record) => {
    console.log("Agregar/Actualizar registro:", record);
  };

  const handleEdit = (record) => {
    // Lógica para editar un registro
    console.log("Editar registro:", record);
  };

  const handleSMS = (record, key) => {
    // Lógica para enviar mensaje de texto
    console.log("Enviar mensaje de texto:", record, key);
  };

  return (
    <div className="App">
      {loggedIn ? (
        // Si el usuario está autenticado, muestra la tabla de usuarios
        <Dashboard>
          <DataTable
            onDelete={handleDelete}
            onEdit={handleEdit}
            onAddUpdate={handleAddUpdate}
            onSMS={handleSMS}
          />
        </Dashboard>
      ) : (
        // Si el usuario no está autenticado, muestra el componente de inicio de sesión
        <Login />
        // Puedes personalizar esto según tu flujo de autenticación (página de inicio de sesión, etc.)
      )}
    </div>
  );
};

export default App;
