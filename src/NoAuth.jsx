import { useState, useEffect } from "react";
import { Button, Result } from "antd";
const App = () => (
  useEffect(() => {
    // Obtener y mostrar el contenido del localStorage al cargar el componente
    const localStorageData = JSON.parse(localStorage.getItem("userData"));
    console.log("Contenido de localStorage:", localStorageData);
  }, []),
  (
    <Result
      status="403"
      title="403"
      subTitle="Perdon, No estas autorizado para estar en este Sitio."
      extra={
        <Button href="/" type="primary">
          Iniciar Sesion
        </Button>
      }
    />
  )
);
export default App;
