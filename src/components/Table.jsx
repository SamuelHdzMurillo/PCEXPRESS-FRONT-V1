import React from 'react';
import { Button, TableContainer, Table, TableCaption, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const DeviceTable = ({ devices, onDelete, onEdit }) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Device Type</Th>
            <Th>Brand</Th>
            <Th>Damage</Th>
            <Th>Accessories</Th>
            <Th>Technician</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {devices.map(device => (
            <Tr key={device.id}>
              <Td>{device.device_type}</Td>
              <Td>{device.brand}</Td>
              <Td>{device.damage}</Td>
              <Td>{device.accesories}</Td>
              <Td>{device.technican}</Td>
              <Td>
                <Button onClick={() => onEdit(device)}>Edit</Button>
                <Button onClick={() => onDelete(device.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DeviceTable;
