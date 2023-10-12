import React, { useState, useEffect } from 'react';
import { VStack, Spinner, Box, SimpleGrid, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import Card from './components/card.jsx';
import TimelineModal from './components/TimelineModal.jsx';
import DeviceInfo from './components/DeviceInfo.jsx';
import axios from 'axios';
import './styles/style.css';

const DeviceList = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [selectedDeviceUpdates, setSelectedDeviceUpdates] = useState([]);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
const [selectedDeviceId, setSelectedDeviceId] = useState(null);

const openDeviceModal = (deviceId) => {
  setSelectedDeviceId(deviceId);
  setIsDeviceModalOpen(true);
};

const closeDeviceModal = () => {
  setIsDeviceModalOpen(false);
};

 
  
  const openTimelineModal = async (deviceId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/devices/${deviceId}`);
      setSelectedDeviceUpdates(response.data.updates);
      setIsTimelineModalOpen(true);
    } catch (error) {
      console.error('Error fetching updates:', error);
    }
  };

  const closeTimelineModal = () => {
    setIsTimelineModalOpen(false);
  };
  
  
  


  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/devices');
        setDevices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setSelectedDeviceUpdates([]); // Resetear las actualizaciones cuando se cambia la búsqueda
  };
  

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh" width="100vh">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  // Filter the devices based on the search query
  const filteredDevices = devices.filter((device) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      device.brand.toLowerCase().includes(lowerCaseQuery) ||
      device.damage.toLowerCase().includes(lowerCaseQuery) ||
      device.state.toLowerCase().includes(lowerCaseQuery) ||
      device.device_type.toLowerCase().includes(lowerCaseQuery) ||
      device.accesories.toLowerCase().includes(lowerCaseQuery) ||
      device.technican.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div>
      <div className="navbar">
        <div className="logo">PC-EXPRESS</div>
        <button className="menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-links ${showMenu ? 'show' : ''}`}>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="https://www.facebook.com/profile.php?id=100076056407761">Contacto</a></li>
          <li><a href="/Login"><button className="btn-iniciar-sesion">Iniciar Sesión</button></a></li>
        </ul>
      </div>

      <Box mt="70" mx="8">
        <InputGroup>
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <InputRightElement pointerEvents="none">
            {/* You can add an icon here if you want */}
          </InputRightElement>
        </InputGroup>
      </Box>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing="4" mx="8">
        {filteredDevices.map((device) => (
          <Card key={device.id} 
          data={device} 
          openTimelineModal={() => openTimelineModal(device.id)} 
          openDeviceModal={() => openDeviceModal(device.id)}/>

          
        ))}
      </SimpleGrid>
      <TimelineModal
        isOpen={isTimelineModalOpen}
        onClose={closeTimelineModal}
        deviceUpdates={selectedDeviceUpdates}
      />
      <DeviceInfo
  isOpen={isDeviceModalOpen}
  onClose={closeDeviceModal}
  deviceId={selectedDeviceId}
/>
    </div>
  );
};

export default DeviceList;
