import { useState } from "react";
import React from "react";
import { Button } from "antd";

import OwnerModal from "./components/OwnerModal.jsx"; // Asegúrate de que la ruta sea correcta

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <OwnerModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </header>
    </div>
  );
}

export default App;
