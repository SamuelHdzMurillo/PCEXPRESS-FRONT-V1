import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login.jsx'; // Asegúrate de importar el componente desde la ubicación correcta

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Login />
      </div>
    </ChakraProvider>
  );
}

export default App;
