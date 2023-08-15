import React from 'react';
// Asegúrate de tener un archivo de estilos para tu barra lateral

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>My Sidebar</h2>
      </div>
      <ul className="sidebar-menu">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Perfil</a></li>
        <li><a href="#">Configuración</a></li>
        {/* Agrega más elementos del menú aquí */}
      </ul>
    </div>
  );
};

export default Sidebar;
