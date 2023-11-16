import React, { useState, useEffect } from "react";
import { Button, Result } from "antd";

const AuthenticatedRoute = ({ children }) => {
  // Estado para verificar si el usuario está autenticado
  const [loggedIn, setLoggedIn] = useState(false);

  // Efecto para verificar el token al cargar el componente
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Verificar si existe userData y si tiene el formato esperado
    if (userData) {
      try {
        const { token } = JSON.parse(userData);
        if (token && typeof token === "string" && token.length > 0) {
          // Si el token es válido, establece loggedIn a true
          setLoggedIn(true);
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

  // Si el usuario no está autenticado, muestra la página de acceso no autorizado
  if (!loggedIn) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={handleBackToLogin}>
            Back to Login
          </Button>
        }
      />
    );
  }

  // Si el usuario está autenticado, muestra el contenido de la página protegida
  return children;
};

export default AuthenticatedRoute;
