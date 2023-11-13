import React, { useState } from "react";
import DeviceUpdateForm from "./components/DeviceUpdateForm"; // Asegúrate de importar el componente correctamente

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  return (
    <div>
      <h1>Mi Aplicación</h1>
      <DeviceUpdateForm
        deviceId={9} // Pasa el valor correcto para deviceId
        modalVisible={isModalVisible} // Pasa el estado para controlar la visibilidad del modal
        setModalVisible={setIsModalVisible} // Pasa la función para actualizar el estado del modal
        openButtonLabel="Abrir Formulario" // Puedes personalizar la etiqueta del botón de apertura
      />
    </div>
  );
}

export default App;
