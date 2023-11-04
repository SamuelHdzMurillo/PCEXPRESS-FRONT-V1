import React from 'react';
import './App.jsx';
import DataTable from './components/Table.jsx';
import Dashboard from './components/Dashboard.jsx'; // Importa tu componente Dashboard

const App = () => {
  const handleDelete = (id) => {
    // Lógica para eliminar un registro
    console.log('Eliminar registro con ID:', id);
  };

  const handleEdit = (record) => {
    // Lógica para editar un registro
    console.log('Editar registro:', record);
  };

  return (
    
      <Dashboard>
        {/* Incrusta tu componente DataTable dentro de Dashboard */}
        <DataTable onDelete={handleDelete} onEdit={handleEdit} />
      </Dashboard>
    
  );
};

export default App;
