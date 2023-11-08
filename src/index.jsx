// App.jsx
import React from 'react';
import axios from 'axios'; // Asegúrate de importar axios

import DataTable from './components/Table'; // Ajusta la ruta según tu estructura de archivos
import Dashboard from './components/Dashboard'; // Ajusta la ruta según tu estructura de archivos

const App = () => {



  const handleDelete = (id) => {
    // Lógica para eliminar un registro
    console.log('Eliminar registro con ID:', id);
  };

  

  const handleAddUpdate = (record) => {
    console.log('Agregar/Actualizar registro:', record);
  };

  const handleEdit = (record) => {
    // Lógica para editar un registro
    console.log('Editar registro:', record);
  };

  const handleSMS = (record, key) => {
    // Lógica para enviar mensaje de texto
    console.log('Enviar mensaje de texto:', record, key);
  };

  return (
    <Dashboard>
      <DataTable
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAddUpdate={handleAddUpdate}
        onSMS={handleSMS}
        
      />
    </Dashboard>
  );
};

export default App;
