import React, { useState, useEffect } from "react";
import UsersTable from "./components/TableUser"; // Asegúrate de tener la ruta correcta hacia el componente
import Login from "./NoAuth.jsx"; // Importa tu componente de inicio de sesión

function App() {
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

  // Función para manejar el botón de regreso al inicio de sesión
  const handleBackToLogin = () => {
    // Aquí podrías redirigir a la página de inicio de sesión o realizar acciones necesarias
    // Por ejemplo, limpiar el token del localStorage y actualizar el estado de autenticación
    localStorage.removeItem("userdata");
    setLoggedIn(false);
  };

  return (
    <div className="App">
      {loggedIn ? (
        // Si el usuario está autenticado, muestra la tabla de usuarios
        <UsersTable />
      ) : (
        // Si el usuario no está autenticado, muestra el componente de inicio de sesión
        <Login />
        // Puedes personalizar esto según tu flujo de autenticación (página de inicio de sesión, etc.)
      )}
    </div>
  );
}

export default App;
